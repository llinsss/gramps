import Link from 'next/link';
import Image from 'next/image';
import styles from './landing.module.css';

export default function LandingPage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className="gradient-text">Dignity for them.</span><br />
            Peace of mind for you.
          </h1>
          <p className={styles.heroSubtitle}>
            GrampsCare brings your family together to manage elderly care with transparency, security, and love—powered by blockchain technology.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/dashboard" className="btn btn-primary" style={{ fontSize: '18px', padding: '16px 32px' }}>
              Get Started
            </Link>
            <a href="#features" className="btn glass" style={{ fontSize: '18px', padding: '16px 32px' }}>
              Learn More
            </a>
          </div>
          <div className={styles.badge}>
            <span>⚡</span> Powered by Base L2
          </div>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/hero-care.png"
            alt="Care Network"
            width={600}
            height={600}
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <h2 className={styles.sectionTitle}>Everything your family needs</h2>
        <div className={styles.featureGrid}>
          <div className={`card ${styles.featureCard}`}>
            <div className={styles.featureIcon}>💰</div>
            <h3>Care Fund</h3>
            <p>Pool family resources in a shared wallet. Every deposit and expense is transparent and recorded on the blockchain.</p>
          </div>
          <div className={`card ${styles.featureCard}`}>
            <div className={styles.featureIcon}>🏥</div>
            <h3>The Vault</h3>
            <p>Register critical documents (Wills, DNRs, Insurance) on-chain. Proof-of-existence without exposing private data.</p>
          </div>
          <div className={`card ${styles.featureCard}`}>
            <div className={styles.featureIcon}>✅</div>
            <h3>Task Tracking</h3>
            <p>Coordinate care duties across family members. Never miss a med refill, bill payment, or doctor appointment.</p>
          </div>
          <div className={`card ${styles.featureCard}`}>
            <div className={styles.featureIcon}>📊</div>
            <h3>Visit Log</h3>
            <p>Track visits and mood. Know who saw Dad last and how he's doing—all the family stays informed.</p>
          </div>
          <div className={`card ${styles.featureCard}`}>
            <div className={styles.featureIcon}>❤️</div>
            <h3>Health Monitoring</h3>
            <p>Real-time vitals dashboard. Heart rate, sleep, steps—everything you need to ensure well-being.</p>
          </div>
          <div className={`card ${styles.featureCard}`}>
            <div className={styles.featureIcon}>🔐</div>
            <h3>Zero Trust</h3>
            <p>Decentralized, immutable records. No single point of failure. Your family's data is protected forever.</p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className={styles.trust}>
        <h2 className={styles.sectionTitle}>Built on the future</h2>
        <p className={styles.trustSubtitle}>
          GrampsCare uses Ethereum smart contracts deployed on Base (Coinbase L2) for lightning-fast, low-cost transactions while maintaining the security of decentralized ledger technology.
        </p>
        <div className={styles.techBadges}>
          <div className={styles.techBadge}>
            <span>⚙️</span> Solidity Smart Contracts
          </div>
          <div className={styles.techBadge}>
            <span>🔗</span> Base Network (L2)
          </div>
          <div className={styles.techBadge}>
            <span>🦊</span> MetaMask Compatible
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className={styles.cta}>
        <h2>Ready to bring your family together?</h2>
        <Link href="/dashboard" className="btn btn-primary" style={{ fontSize: '20px', padding: '18px 36px', marginTop: '24px' }}>
          Launch App
        </Link>
      </section>
    </div>
  );
}
