"use client";
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import styles from './page.module.css';
import Modal from '@/components/Modal';

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const { events, addEvent } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('15');
    const [eventType, setEventType] = useState('social');
    const [eventTime, setEventTime] = useState('12:00 PM');

    // Calendar Logic (Simplified for demo)
    const daysInMonth = 31;
    const startDay = 3; // Wednesday

    const days = [];
    for (let i = 0; i < startDay; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const getEventsForDay = (day) => events.filter(e => e.date === day);

    const handleAddEvent = (e) => {
        e.preventDefault();
        if (!eventTitle) return;

        const newEvent = {
            id: Date.now(),
            title: eventTitle,
            date: parseInt(eventDate),
            type: eventType,
            time: eventTime
        };

        addEvent(newEvent);
        setIsModalOpen(false);
        setEventTitle('');
        setEventDate('15');
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className="gradient-text">Shared Calendar</h1>
                    <p className={styles.subtitle}>Coordinate appointments and family events.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                    + Add Event
                </button>
            </header>

            <div className={styles.calendarLayout}>
                <div className={`glass ${styles.mainCalendar}`}>
                    <div className={styles.monthHeader}>
                        <button className={styles.navBtn}>&lt;</button>
                        <h2>October 2024</h2>
                        <button className={styles.navBtn}>&gt;</button>
                    </div>

                    <div className={styles.weekDays}>
                        <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                    </div>

                    <div className={styles.daysGrid}>
                        {days.map((day, index) => (
                            <div key={index} className={`${styles.dayCell} ${day ? styles.activeDay : styles.emptyDay} ${day === 15 ? styles.today : ''}`}>
                                <span className={styles.dayNumber}>{day}</span>
                                {day && (
                                    <div className={styles.dayEvents}>
                                        {getEventsForDay(day).map(ev => (
                                            <div key={ev.id} className={`${styles.eventDot} ${styles[ev.type]}`} title={ev.title}></div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.sidePanel}>
                    <div className={`card ${styles.upcomingCard}`}>
                        <h3>Upcoming</h3>
                        <div className={styles.eventList}>
                            {events.sort((a, b) => a.date - b.date).map(ev => (
                                <div key={ev.id} className={styles.eventItem}>
                                    <div className={styles.eventDate}>
                                        <span className={styles.dateNum}>{ev.date}</span>
                                        <span className={styles.dateMon}>OCT</span>
                                    </div>
                                    <div className={styles.eventInfo}>
                                        <h4>{ev.title}</h4>
                                        <p>{ev.time} • {ev.type}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Event">
                <form onSubmit={handleAddEvent} className="modal-form">
                    <div className="form-group">
                        <label>Event Title</label>
                        <input
                            type="text"
                            placeholder="e.g., Cardiologist Apt"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            className="input-glass"
                            autoFocus
                        />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                            <label>Date (Oct)</label>
                            <input
                                type="number"
                                min="1" max="31"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                className="input-glass"
                            />
                        </div>
                        <div className="form-group">
                            <label>Time</label>
                            <input
                                type="text"
                                placeholder="2:00 PM"
                                value={eventTime}
                                onChange={(e) => setEventTime(e.target.value)}
                                className="input-glass"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Type</label>
                        <select
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                            className="input-glass"
                        >
                            <option value="social">Social</option>
                            <option value="medical">Medical</option>
                            <option value="task">Task</option>
                        </select>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn glass" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Event</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
