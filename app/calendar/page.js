"use client";
import { useState } from 'react';
import styles from './page.module.css';

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Mock events
    const events = [
        { id: 1, title: 'Cardiologist', date: 15, type: 'medical', time: '2:00 PM' },
        { id: 2, title: 'Family Dinner', date: 15, type: 'social', time: '6:00 PM' },
        { id: 3, title: 'Grocery Run', date: 18, type: 'task', time: '10:00 AM' },
        { id: 4, title: 'PT Session', date: 22, type: 'medical', time: '11:00 AM' },
    ];

    // Calendar Logic (Simplified for demo)
    const daysInMonth = 31; // assuming current month has 31 days
    const startDay = 3; // Wednesday (0=Sun, 1=Mon, 2=Tue, 3=Wed)

    const days = [];
    for (let i = 0; i < startDay; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const getEventsForDay = (day) => events.filter(e => e.date === day);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className="gradient-text">Shared Calendar</h1>
                    <p className={styles.subtitle}>Coordinate appointments and family events.</p>
                </div>
                <button className="btn btn-primary">
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
                            {events.map(ev => (
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
        </div>
    );
}
