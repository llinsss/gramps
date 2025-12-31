import styles from './page.module.css';

export default function VisitsPage() {
    const visits = [
        { id: 1, date: 'Today, 10:30 AM', visitor: 'Jane (You)', mood: 'Happy', moodColor: 'var(--success)', note: 'Brought groceries. Dad was in good spirits, watched the game together.' },
        { id: 2, date: 'Yesterday, 5:00 PM', visitor: 'Mark (Brother)', mood: 'Tired', moodColor: 'var(--warning)', note: 'Stopped by after work. He seemed a bit lethargic, check BP tomorrow.' },
        { id: 3, date: 'Oct 28, 2:00 PM', visitor: 'Dr. Smith', mood: 'Neutral', moodColor: 'var(--accent-primary)', note: 'Routine checkup. Everything looks stable.' },
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className="gradient-text">Visit Log</h1>
                    <p className={styles.subtitle}>Track check-ins, mood, and daily observations.</p>
                </div>
                <button className="btn btn-primary">
                    + New Check-in
                </button>
            </header>

            <div className={styles.timeline}>
                {visits.map((visit) => (
                    <div key={visit.id} className={styles.timelineItem}>
                        <div className={styles.timelineMarker}>
                            <div className={styles.markerDot} style={{ borderColor: visit.moodColor }}></div>
                            <div className={styles.markerLine}></div>
                        </div>

                        <div className={`glass ${styles.visitCard}`}>
                            <div className={styles.visitHeader}>
                                <div className={styles.visitorInfo}>
                                    <span className={styles.visitorName}>{visit.visitor}</span>
                                    <span className={styles.visitDate}>{visit.date}</span>
                                </div>
                                <span className={styles.moodBadge} style={{ color: visit.moodColor, background: `${visit.moodColor}20` }}>
                                    {visit.mood}
                                </span>
                            </div>
                            <p className={styles.visitNote}>{visit.note}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
