"use client";
import { useApp } from '@/context/AppContext';
import styles from './page.module.css';

export default function VisitsPage() {
    const { visits, addVisit: addVisitContext } = useApp();

    const addCheckIn = () => {
        const visitor = window.prompt("Who is visiting?") || "Me";
        const note = window.prompt("How was the visit? (Notes)") || "Routine check-in";
        const moodInput = window.prompt("Mood? (Happy, Tired, Neutral)") || "Neutral";

        let moodColor = 'var(--text-secondary)';
        if (moodInput.toLowerCase().includes('happy')) moodColor = 'var(--success)';
        if (moodInput.toLowerCase().includes('tired')) moodColor = 'var(--warning)';
        if (moodInput.toLowerCase().includes('neutral')) moodColor = 'var(--accent-primary)';

        const newVisit = {
            id: Date.now(),
            date: 'Just Now',
            visitor,
            mood: moodInput,
            moodColor,
            note
        };

        addVisitContext(newVisit);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className="gradient-text">Visit Log</h1>
                    <p className={styles.subtitle}>Track check-ins, mood, and daily observations.</p>
                </div>
                <button className="btn btn-primary" onClick={addCheckIn}>
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
