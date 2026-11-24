// Modified by Rajesh (2026): Delhi NCR text changed to Bengaluru, Hindi replaced by Kannada (kn),
// and the visible name "JalMarg" changed to "Monsoon Mind and Waterlogging".
// Original project: JalMarg by Vijendra Pratap (Apache License 2.0). Credit kept.
import { Link } from 'react-router-dom'
import { useLang } from '../i18n'

const STEPS = {
  en: [
    ['📷', 'Citizen Hazard Reporting', 'Commuters encountering a flooded road capture a photo in seconds. GPS coordinates are automatically recorded with manual fine-tuning available.'],
    ['🤖', 'AI Vision Depth Estimation', 'A vision model on Amazon Bedrock analyzes tyre submergence, kerb heights, and pedestrian cues to estimate water depth and vehicle passability.'],
    ['🗺️', 'Alternative Route Intelligence', 'Hazard spots go live immediately on the map, trigger localized alerts, and evaluate alternative road routes to help commuters avoid deep waterlogging.'],
    ['🏛️', 'Civic Evidence for Municipalities', 'Recurrent flooding spots are consolidated into municipal hotspots with one-click official complaint PDFs for BBMP, BWSSB, BDA, and NHAI.']
  ],
  kn: [
    ['📷', 'ನಾಗರಿಕ ನೀರು ನಿಂತಿರುವ ವರದಿ', 'ರಸ್ತೆಯಲ್ಲಿ ನೀರು ನಿಂತಿರುವುದನ್ನು ಕಂಡಾಗ ನಾಗರಿಕರು ಕೆಲವೇ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಫೋಟೋ ತೆಗೆಯುತ್ತಾರೆ. GPS ಸ್ಥಳ ತಾನಾಗಿಯೇ ದಾಖಲಾಗುತ್ತದೆ, ಅದನ್ನು ನಕ್ಷೆಯಲ್ಲಿ ಕೈಯಿಂದ ಸರಿಪಡಿಸಲೂ ಬಹುದು.'],
    ['🤖', 'AI ವಿಷನ್ ಆಳ ಅಂದಾಜು', 'Amazon Bedrock ನಲ್ಲಿರುವ ವಿಷನ್ ಮಾದರಿಯು ವಾಹನದ ಟೈರ್‌ಗಳು ಮುಳುಗಿರುವ ಮಟ್ಟ, ಕಾಲುದಾರಿಯ ಎತ್ತರ ಮತ್ತು ಸುತ್ತಮುತ್ತಲಿನ ಸಂದರ್ಭದಿಂದ ನೀರಿನ ಆಳ ಹಾಗೂ ವಾಹನ ಸಂಚಾರದ ಸುರಕ್ಷತೆಯನ್ನು ಅಂದಾಜಿಸುತ್ತದೆ.'],
    ['🗺️', 'ಪರ್ಯಾಯ ಮಾರ್ಗ ಮತ್ತು ಎಚ್ಚರಿಕೆ', 'ನೀರು ನಿಂತಿರುವ ಸ್ಥಳಗಳು ತಕ್ಷಣ ಲೈವ್ ನಕ್ಷೆಯಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ, ಹತ್ತಿರದವರಿಗೆ ಎಚ್ಚರಿಕೆ ಹೋಗುತ್ತದೆ ಮತ್ತು ಸುರಕ್ಷಿತ ಪರ್ಯಾಯ ಮಾರ್ಗಗಳನ್ನು ಸೂಚಿಸಲಾಗುತ್ತದೆ.'],
    ['🏛️', 'ಪಾಲಿಕೆಗಳಿಗೆ ಅಧಿಕೃತ ಸಾಕ್ಷ್ಯ', 'ಪದೇ ಪದೇ ನೀರು ನಿಲ್ಲುವ ಸ್ಥಳಗಳ ಡೇಟಾವನ್ನು ಒಟ್ಟುಗೂಡಿಸಿ BBMP, BWSSB, BDA ಮತ್ತು NHAI ಗಾಗಿ ಒಂದೇ ಕ್ಲಿಕ್‌ನಲ್ಲಿ ದೂರು PDF ಸಿದ್ಧವಾಗುತ್ತದೆ.']
  ]
}

const AWS_SERVICES = [
  ['Amazon Bedrock (Nova Vision)', 'Multimodal AI vision model for estimating water depth from citizen photos'],
  ['Amazon Corretto 21', 'Production Java runtime for Spring Boot backend services'],
  ['AWS App Runner / EC2', 'Scalable containerized hosting for backend APIs and routing logic'],
  ['Amazon S3', 'Secure object storage for citizen-uploaded waterlogging photos'],
  ['Amazon RDS (MySQL)', 'Relational database for incident reports, recurrent hotspots, and subscriptions'],
  ['Amazon SNS', 'Automated email alerts with per-user geo-radius filter policies'],
  ['Amazon EventBridge Scheduler', 'Scheduled hourly precipitation checks and flood monitoring tasks'],
  ['AWS Amplify Hosting', 'Fast, secure hosting for the progressive web application (PWA)'],
  ['Amazon CloudWatch', 'Centralized monitoring, error tracking, and health metrics']
]

export default function AboutPage() {
  const { lang } = useLang()
  const isKn = lang === 'kn'

  return (
    <div className="page narrow about">
      <p className="eyebrow">AWS Environmental Hackathon · Heat and Water Track</p>
      <h1 className="hero-title">
        {isKn
          ? 'ಪ್ರತಿ ಮಳೆಗಾಲದಲ್ಲಿ ರಸ್ತೆಗಳು ಮುಳುಗುತ್ತವೆ. ಇನ್ನು ಯಾರೂ ಕತ್ತಲಲ್ಲಿ ಅಂದಾಜು ಮಾಡಬೇಕಾಗಿಲ್ಲ.'
          : 'Every monsoon, urban roads drown. Nobody should have to navigate in the dark.'}
      </h1>

      <p className="lead">
        {isKn
          ? 'ಅಂಡರ್‌ಪಾಸ್‌ನಲ್ಲಿ ನೀರು ಎಷ್ಟು ಆಳವಿದೆ ಎಂದು ವಾಹನ ನಿಂತ ಮೇಲೆಯೇ ಗೊತ್ತಾಗುತ್ತದೆ. Monsoon Mind and Waterlogging ನಾಗರಿಕರ ವರದಿ ಮತ್ತು AI ವಿಷನ್ ಮೂಲಕ ಮುಳುಗಿದ ರಸ್ತೆಗಳನ್ನು ಲೈವ್ ನಕ್ಷೆಯಲ್ಲಿ ತೋರಿಸುತ್ತದೆ, ನೀರು ನಿಂತಿರುವುದನ್ನು ತಪ್ಪಿಸುವ ಪರ್ಯಾಯ ಮಾರ್ಗಗಳನ್ನು ಸೂಚಿಸುತ್ತದೆ ಮತ್ತು ಶಾಶ್ವತ ಪರಿಹಾರಕ್ಕಾಗಿ ನಗರ ಪಾಲಿಕೆಗಳಿಗೆ ಅಧಿಕೃತ ಸಾಕ್ಷ್ಯ ಒದಗಿಸುತ್ತದೆ.'
          : 'In Bengaluru and major urban centers, drivers often discover underpass water depth only when their vehicle stalls. Monsoon Mind and Waterlogging turns citizen photos into live, AI-assisted flood reports, ranks routes by reported hazard exposure, and equips municipal authorities with the evidence needed for permanent drainage fixes.'}
      </p>

      <div className="row gap wrap" style={{ margin: '20px 0 30px' }}>
        <Link to="/report" className="btn primary">
          📷 {isKn ? 'ನೀರು ನಿಂತಿರುವುದನ್ನು ವರದಿ ಮಾಡಿ' : 'Report Waterlogging'}
        </Link>
        <Link to="/" className="btn ghost">
          🗺️ {isKn ? 'ಲೈವ್ ನಕ್ಷೆ ನೋಡಿ' : 'View Live Map'}
        </Link>
        <Link to="/route" className="btn ghost">
          🧭 {isKn ? 'ಪರ್ಯಾಯ ಮಾರ್ಗ ಹುಡುಕಿ' : 'Alternative Routes'}
        </Link>
      </div>

      <h2>{isKn ? 'ವ್ಯವಸ್ಥೆ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ' : 'How Monsoon Mind and Waterlogging Works'}</h2>
      <ol className="how">
        {STEPS[lang].map(([icon, title, body]) => (
          <li key={title}>
            <span className="how-ico" aria-hidden>{icon}</span>
            <div>
              <b>{title}</b>
              <p>{body}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2>{isKn ? 'AWS ಕ್ಲೌಡ್ ಆರ್ಕಿಟೆಕ್ಚರ್' : 'Built on AWS Cloud Architecture'}</h2>
      <div className="aws-grid">
        {AWS_SERVICES.map(([name, what]) => (
          <div key={name} className="aws-item">
            <b>{name}</b>
            <span>{what}</span>
          </div>
        ))}
      </div>

      <h2>{isKn ? 'ಸುರಕ್ಷತೆ ಮತ್ತು ವಾಹನ ನಿಯಮಗಳು' : 'Hazard Thresholds & Vehicle Guidance'}</h2>
      <ul className="rules">
        <li>
          🛵 <b>{isKn ? 'ದ್ವಿಚಕ್ರ ವಾಹನಗಳು (> 0.5 ಅಡಿ):' : 'Two-Wheelers (> 0.5 ft):'}</b> {isKn ? 'ಸೈಲೆನ್ಸರ್/ಎಂಜಿನ್‌ಗೆ ನೀರು ಹೋಗುವ ಗಂಭೀರ ಅಪಾಯ. ಆ ಮಾರ್ಗವನ್ನು ತಪ್ಪಿಸಿ.' : 'High risk of exhaust water intake & engine failure. Avoid flooded stretch.'}
        </li>
        <li>
          🚗 <b>{isKn ? 'ನಾಲ್ಕು ಚಕ್ರ ವಾಹನಗಳು (> 0.8 ಅಡಿ):' : 'Four-Wheelers (> 0.8 ft):'}</b> {isKn ? 'ಎಂಜಿನ್‌ಗೆ ನೀರು ಹೋಗುವ ಮತ್ತು ವಾಹನ ಜಾರುವ ಅಪಾಯ. ನಿಧಾನವಾಗಿ ಚಲಿಸಿ ಅಥವಾ ಪರ್ಯಾಯ ಮಾರ್ಗ ಆರಿಸಿ.' : 'Risk of hydroplaning and electronic failure. Choose alternative route.'}
        </li>
        <li>
          🚶 <b>{isKn ? 'ಪಾದಚಾರಿಗಳು (> 1.5 ಅಡಿ):' : 'Pedestrians (> 1.5 ft):'}</b> {isKn ? 'ತೆರೆದ ಚರಂಡಿಗಳು ಮತ್ತು ಗುಂಡಿಗಳು ನೀರಿನಲ್ಲಿ ಮರೆಯಾಗುತ್ತವೆ. ನೀರಿನಲ್ಲಿ ಇಳಿಯಲೇ ಬೇಡಿ.' : 'Open manholes and road craters become invisible. Avoid wading into floodwaters.'}
        </li>
      </ul>

      <div className="banner info small" style={{ marginTop: 20 }}>
        ℹ️ {isKn
          ? 'ಪ್ರಮುಖ ಸೂಚನೆ: ಚಿತ್ರಗಳಿಂದ ಪಡೆದ ಆಳದ ಅಂದಾಜುಗಳು ದೃಶ್ಯ ಆಧಾರಿತ ಅಂದಾಜುಗಳು ಮಾತ್ರ. "ಡೆಮೊ ಮಾದರಿ" ಎಂದು ಗುರುತಿಸಿದ ವರದಿಗಳು ಮಳೆಯಿಲ್ಲದ ಅವಧಿಯಲ್ಲಿ ಪರಿಶೀಲನೆಗಾಗಿ ಬಳಸುವ ಉದಾಹರಣೆ ದಾಖಲೆಗಳು.'
          : 'Important Note: Depth estimates derived from images are visual approximations. Reports tagged "Demo Sample" represent illustrative records for validation during non-monsoon periods.'}
      </div>
    </div>
  )
}
