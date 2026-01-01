"use client";
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import styles from './page.module.css';
import Modal from '@/components/Modal';

export default function VisitsPage() {
    const { visits, addVisit } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [visitorName, setVisitorName] = useState('Jane');
    const [mood, setMood] = useState('Neutral');
    const [visitNote, setVisitNote] = useState('');

    const handleAddCheckIn = (e) => {
        e.preventDefault();
        if (!visitorName) return;

        let moodColor = 'var(--text-secondary)';
        if (mood.toLowerCase().includes('happy')) moodColor = 'var(--success)';
        if (mood.toLowerCase().includes('tired')) moodColor = 'var(--warning)';
        if (mood.toLowerCase().includes('neutral')) moodColor = 'var(--accent-primary)';

        const newVisit = {
            id: Date.now(),
            date: 'Just Now',
            visitor: visitorName,
            mood,
            moodColor,
            note: visitNote || 'Routine check-in'
        };

        addVisit(newVisit);
        setIsModalOpen(false);
        setVisitNote('');
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className="gradient-text">Visit Log</h1>
                    <p className={styles.subtitle}>Track check-ins, mood, and daily observations.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
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

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Check-in">
                <form onSubmit={handleAddCheckIn} className="modal-form">
                    <div className="form-group">
                        <label>Visitor</label>
                        <input
                            type="text"
                            placeholder="Who is here?"
                            value={visitorName}
                            onChange={(e) => setVisitorName(e.target.value)}
                            className="input-glass"
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <label>Observed Mood</label>
                        <select
                            value={mood}
                            onChange={(e) => setMood(e.target.value)}
                            className="input-glass"
                        >
                            <option value="Happy">Happy</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Tired">Tired/Lethargic</option>
                            <option value="Agitated">Agitated</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Notes</label>
                        <textarea
                            rows="3"
                            placeholder="How did it go?"
                            value={visitNote}
                            onChange={(e) => setVisitNote(e.target.value)}
                            className="input-glass"
                            style={{ fontFamily: 'inherit' }}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn glass" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Check In</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
