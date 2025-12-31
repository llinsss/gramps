"use client";
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import styles from './page.module.css';

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const { events, addEvent: addEventContext } = useApp();

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

    const addEvent = () => {
        const title = window.prompt("Event Title:");
        if (!title) return;
        const date = parseInt(window.prompt("Day of month (1-31):") || "1");
        const type = window.prompt("Type (medical, social, task):") || "social";
        const time = window.prompt("Time:") || "12:00 PM";

        const newEvent = {
            id: Date.now(),
            title,
            date,
            type,
            time
        };

        addEventContext(newEvent);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className="gradient-text">Shared Calendar</h1>
                    <p className={styles.subtitle}>Coordinate appointments and family events.</p>
                </div>
                <button className="btn btn-primary" onClick={addEvent}>
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
        </div>
    );
}
