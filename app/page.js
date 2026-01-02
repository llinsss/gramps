"use client";
import { useApp } from '@/context/AppContext';
import { useState } from 'react';
import Link from 'next/link';
import CareFundWidget from '@/components/CareFundWidget';
import styles from './page.module.css';

export default function Home() {
  const { events, tasks, healthStats } = useApp();

  // Logic to find next event
  const today = 15; // Mock Date
  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const upcomingEvents = events.filter(e => e.date >= today).sort((a, b) => a.date - b.date);
  const nextEvent = upcomingEvents[0];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="gradient-text">Good Morning, Jane</h1>
        <p className={styles.subtitle}>Here is what is happening with Dad today.</p>
      </header>

      <div className={styles.grid}>

        {/* Widget 1: Up Next */}
        <Link href="/calendar" className={`card ${styles.widget} ${styles.calendarWidget}`}>
          <div className={styles.widgetHeader}>
            <h3>Up Next</h3>
            <span className={styles.icon}>📅</span>
          </div>
          {nextEvent ? (
            <div className={styles.eventHighlight}>
              <div className={styles.eventDate}>
                <span className={styles.bigNum}>{nextEvent.date}</span>
                <span className={styles.month}>OCT</span>
              </div>
              <div className={styles.eventDetails}>
                <h4>{nextEvent.title}</h4>
                <p>{nextEvent.time}</p>
              </div>
            </div>
          ) : (
            <p>No upcoming events.</p>
          )}
        </Link>

        {/* Widget 2: Pending Tasks */}
        <Link href="/tasks" className={`card ${styles.widget}`}>
          <div className={styles.widgetHeader}>
            <h3>Pending Tasks</h3>
            <span className={styles.badge}>{pendingTasks.length}</span>
          </div>
          <ul className={styles.miniList}>
            {pendingTasks.slice(0, 3).map(task => (
              <li key={task.id} className={styles.miniListItem}>
                <span className={styles.dot}></span>
                {task.title}
              </li>
            ))}
          </ul>
          {pendingTasks.some(t => t.section.includes('Overdue')) && (
            <div className={styles.alert}>
              ⚠️ Urgent items!
            </div>
          )}
        </Link>

        {/* Widget 3: Care Fund (Web3) */}
        <div className={styles.widget}>
          <CareFundWidget />
        </div>

        {/* Widget 4: Health Status */}
        <Link href="/health" className={`card ${styles.widget} ${styles.healthWidget}`}>
          <div className={styles.widgetHeader}>
            <h3>Live Vitals</h3>
            <span className={styles.liveIndicator}>• Live</span>
          </div>
          <div className={styles.vitalsGrid}>
            <div className={styles.vital}>
              <span className={styles.vitalLabel}>HR</span>
              <span className={styles.vitalValue} style={{ color: 'var(--danger)' }}>
                {healthStats.heartRate} <span className={styles.unit}>bpm</span>
              </span>
            </div>
            <div className={styles.vital}>
              <span className={styles.vitalLabel}>Sleep</span>
              <span className={styles.vitalValue} style={{ color: 'var(--accent-secondary)' }}>
                {healthStats.sleep} <span className={styles.unit}>hrs</span>
              </span>
            </div>
            <div className={styles.vital}>
              <span className={styles.vitalLabel}>Steps</span>
              <span className={styles.vitalValue}>
                {healthStats.steps}
              </span>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}
