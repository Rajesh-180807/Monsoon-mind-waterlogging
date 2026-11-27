// Modified by Rajesh (2026)
package org.growforge.jalmarg.service;

import org.growforge.jalmarg.model.Enums.DepthSource;
import org.growforge.jalmarg.model.Enums.ReportStatus;
import org.growforge.jalmarg.model.Hotspot;
import org.growforge.jalmarg.model.Report;
import org.growforge.jalmarg.repo.HotspotRepository;
import org.growforge.jalmarg.repo.ReportRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Demo data so the map and dashboard are not empty on first run.
 * Locations are commonly reported recurring waterlogging spots in Bengaluru (coordinates approximate, for demo only).
 * Report counts and depths are ILLUSTRATIVE, generated for the demo, and every seeded
 * report is tagged DepthSource.DEMO so the UI can label it.
 */
@Service
public class SeedService implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(SeedService.class);
    private static final ZoneId IST = ZoneId.of("Asia/Kolkata");

    /** name, area, lat, lng, how flood-prone (1..5) */
    private record Spot(String name, String area, double lat, double lng, int proneness) {}

    private static final List<Spot> SPOTS = List.of(
            new Spot("KR Circle underpass", "Bengaluru Central", 12.9763, 77.5929, 5),
            new Spot("Silk Board junction", "Bengaluru South", 12.9177, 77.6233, 5),
            new Spot("Kundalahalli underpass", "Bengaluru East", 12.9698, 77.7140, 4),
            new Spot("Bellandur junction, Outer Ring Road", "Bengaluru East", 12.9260, 77.6762, 5),
            new Spot("Hebbal flyover", "Bengaluru North", 13.0358, 77.5970, 4),
            new Spot("Agara junction, HSR Layout", "Bengaluru South", 12.9215, 77.6480, 4),
            new Spot("Marathahalli bridge", "Bengaluru East", 12.9569, 77.7011, 4),
            new Spot("Mekhri Circle underpass", "Bengaluru North", 13.0140, 77.5800, 3),
            new Spot("Kodigehalli gate", "Bengaluru North", 13.0583, 77.5864, 3),
            new Spot("Anand Rao Circle underpass", "Bengaluru Central", 12.9784, 77.5726, 4),
            new Spot("Tin Factory junction, KR Puram", "Bengaluru East", 13.0026, 77.6695, 3),
            new Spot("Kogilu Cross, Yelahanka", "Bengaluru North", 13.1017, 77.6049, 3),
            new Spot("Parangi Palya, HSR Layout", "Bengaluru South", 12.9144, 77.6390, 3),
            new Spot("Iblur junction, Sarjapur Road", "Bengaluru East", 12.9230, 77.6640, 3),
            new Spot("Nayandahalli junction, Mysore Road", "Bengaluru West", 12.9418, 77.5228, 3),
            new Spot("Vijayanagar, Magadi Road", "Bengaluru West", 12.9719, 77.5300, 3),
            new Spot("South End Circle, Jayanagar", "Bengaluru South", 12.9387, 77.5834, 3),
            new Spot("Windsor Manor underpass", "Bengaluru Central", 12.9890, 77.5810, 4),
            new Spot("Yeshwanthpur circle", "Bengaluru West", 13.0285, 77.5400, 3),
            new Spot("Dairy Circle, Bannerghatta Road", "Bengaluru South", 12.9387, 77.6011, 3)
    );

    /** Spots that are shown as "flooded right now" in the demo, with depth in feet. */
    private static final double[][] LIVE_DEMO = {
            // index into SPOTS, depth ft
            {0, 2.2}, {1, 1.6}, {3, 1.9}, {2, 0.7}, {4, 1.1}, {6, 0.6}
    };

    private final HotspotRepository hotspots;
    private final ReportRepository reports;
    private final boolean enabled;

    public SeedService(HotspotRepository hotspots, ReportRepository reports,
                       @Value("${jalmarg.seed.enabled}") boolean enabled) {
        this.hotspots = hotspots;
        this.reports = reports;
        this.enabled = enabled;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (!enabled || hotspots.count() > 0) return;
        Random rnd = new Random(42);
        List<Hotspot> created = new ArrayList<>();
        List<Report> rs = new ArrayList<>();

        // Historical reports across this monsoon (1 Jul - 25 Sep), more for flood-prone spots
        LocalDate start = LocalDate.of(LocalDate.now(IST).getYear(), 7, 1);
        int seasonDays = 86;
        for (Spot s : SPOTS) {
            Hotspot h = new Hotspot(s.name(), s.area(), s.lat(), s.lng());
            int n = 2 + s.proneness() * 2 + rnd.nextInt(3);
            Instant first = null, last = null;
            for (int i = 0; i < n; i++) {
                LocalDateTime t = start.plusDays(rnd.nextInt(seasonDays))
                        .atTime(6 + rnd.nextInt(16), rnd.nextInt(60));
                Instant at = t.atZone(IST).toInstant();
                double depth = Math.round((0.3 + rnd.nextDouble() * (0.4 + s.proneness() * 0.45)) * 10) / 10.0;
                Report r = demoReport(s, depth, at, ReportStatus.EXPIRED, rnd);
                r.setHotspot(h);
                rs.add(r);
                if (first == null || at.isBefore(first)) first = at;
                if (last == null || at.isAfter(last)) last = at;
            }
            h.setTotalReports(n);
            h.setFirstSeen(first);
            h.setLastSeen(last);
            created.add(h);
        }
        hotspots.saveAll(created);
        reports.saveAll(rs);
        refreshLiveDemo();
        log.info("Seeded {} demo hotspots and {} demo reports", created.size(), rs.size() + LIVE_DEMO.length);
    }

    /** Puts a handful of "live" demo reports on the map (used on first start and by /api/admin/demo-refresh). */
    @Transactional
    public int refreshLiveDemo() {
        // close any older live demo reports
        List<Report> oldLive = reports.findByStatusOrderByCreatedAtDesc(ReportStatus.ACTIVE).stream()
                .filter(r -> r.getDepthSource() == DepthSource.DEMO).toList();
        oldLive.forEach(r -> r.setStatus(ReportStatus.EXPIRED));
        reports.saveAll(oldLive);

        Random rnd = new Random();
        List<Hotspot> all = hotspots.findAll();
        int added = 0;
        for (double[] live : LIVE_DEMO) {
            Spot s = SPOTS.get((int) live[0]);
            Hotspot h = all.stream().filter(x -> x.getName().equals(s.name())).findFirst().orElse(null);
            if (h == null) continue;
            Instant at = Instant.now().minus(Duration.ofMinutes(10 + rnd.nextInt(80)));
            Report r = demoReport(s, live[1], at, ReportStatus.ACTIVE, rnd);
            r.setHotspot(h);
            r.setConfirmations(rnd.nextInt(6));
            h.setTotalReports(h.getTotalReports() + 1);
            h.setLastSeen(at);
            hotspots.save(h);
            reports.save(r);
            added++;
        }
        return added;
    }

    private static Report demoReport(Spot s, double depth, Instant at, ReportStatus status, Random rnd) {
        Report r = new Report();
        // jitter within ~40 m so markers don't sit exactly on top of each other
        r.setLatitude(s.lat() + (rnd.nextDouble() - 0.5) * 0.0007);
        r.setLongitude(s.lng() + (rnd.nextDouble() - 0.5) * 0.0007);
        r.setLocationName(s.name());
        r.setDepthFt(depth);
        r.setDepthSource(DepthSource.DEMO);
        r.setCreatedAt(at);
        r.setLastConfirmedAt(at);
        r.setStatus(status);
        r.setNote("Demo data");
        SafetyRules.apply(r);
        return r;
    }
}
