import styles from './page.module.css';

export default function DocumentsPage() {
    const categories = [
        { name: 'Medical', count: 4, icon: '🏥', color: 'var(--accent-primary)' },
        { name: 'Legal', count: 2, icon: '⚖️', color: 'var(--warning)' },
        { name: 'Financial', count: 5, icon: '💰', color: 'var(--success)' },
        { name: 'IDs', count: 3, icon: '🪪', color: 'var(--accent-secondary)' },
    ];

    const recentDocs = [
        { title: 'Medicare Card.pdf', category: 'IDs', date: 'Oct 24, 2024', size: '1.2 MB' },
        { title: 'DNR Order.pdf', category: 'Legal', date: 'Sep 12, 2024', size: '2.4 MB' },
        { title: 'Prescription List.jpg', category: 'Medical', date: 'Dec 01, 2024', size: '800 KB' },
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className="gradient-text">The Vault</h1>
                    <p className={styles.subtitle}>Secure storage for critical family documents.</p>
                </div>
                <button className="btn btn-primary">
                    + Upload Document
                </button>
            </header>

            {/* Categories */}
            <div className={styles.categoryGrid}>
                {categories.map((cat) => (
                    <div key={cat.name} className={`card ${styles.categoryCard}`}>
                        <div className={styles.catIcon} style={{ background: `${cat.color}20`, color: cat.color }}>
                            {cat.icon}
                        </div>
                        <div className={styles.catInfo}>
                            <h3>{cat.name}</h3>
                            <p>{cat.count} documents</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Files */}
            <h2 className={styles.sectionTitle}>Recent Files</h2>
            <div className={styles.docList}>
                {recentDocs.map((doc, index) => (
                    <div key={index} className={`glass ${styles.docRow}`}>
                        <div className={styles.docIcon}>📄</div>
                        <div className={styles.docDetails}>
                            <h4>{doc.title}</h4>
                            <p>{doc.category} • {doc.date} • {doc.size}</p>
                        </div>
                        <button className={styles.actionBtn}>⋮</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
