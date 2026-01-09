"use client";
import { useApp } from '@/context/AppContext';
import { useState } from 'react';
import Link from 'next/link';
import CareFundWidget from '@/components/CareFundWidget';
import styles from './page.module.css';
import { Calendar, CheckCircle, Activity, AlertTriangle, Clock } from 'lucide-react';
import { MotionContainer, MotionItem, MotionCard } from '@/components/MotionWrapper';
import HealthChart from '@/components/HealthChart';

export default function Home() {
  const { events, tasks, healthStats } = useApp();

  // Logic to find next event
  const today = 15; // Mock Date
  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const upcomingEvents = events.filter(e => e.date >= today).sort((a, b) => a.date - b.date);
  const nextEvent = upcomingEvents[0];

  return (
    <MotionContainer className={styles.container}>
      <header className={styles.header}>
        <MotionItem>
          <h1 className="gradient-text">Good Morning, Jane</h1>
          <p className={styles.subtitle}>Here is what is happening with Dad today.</p>
        </MotionItem>
      </header>

      <div className={styles.grid}>

        {/* Widget 1: Up Next */}
        <div style={{ display: 'contents' }}>
          <MotionCard href="/calendar" className={`card ${styles.widget} ${styles.calendarWidget}`}>
            <div className={styles.widgetHeader}>
              <h3>Up Next</h3>
              <Calendar size={20} className="text-gray-400" />
            </div>
            {nextEvent ? (
              <div className={styles.eventHighlight}>
                <div className={styles.eventDate}>
                  <span className={styles.bigNum}>{nextEvent.date}</span>
                  <span className={styles.month}>OCT</span>
                </div>
                <div className={styles.eventDetails}>
                  <h4>{nextEvent.title}</h4>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock size={14} />
                    <span>{nextEvent.time}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p>No upcoming events.</p>
            )}
          </MotionCard>
        </div>

        {/* Widget 2: Pending Tasks */}
        <div style={{ display: 'contents' }}>
          <MotionCard href="/tasks" className={`card ${styles.widget}`}>
            <div className={styles.widgetHeader}>
              <h3>Pending Tasks</h3>
              <span className={styles.badge}>{pendingTasks.length}</span>
            </div>
            <ul className={styles.miniList}>
              {pendingTasks.slice(0, 3).map((task, i) => (
                <li key={task.id} className={styles.miniListItem}>
                  <CheckCircle size={16} className="text-gray-500" />
                  <span>{task.title}</span>
                </li>
              ))}
            </ul>
            {pendingTasks.some(t => t.section.includes('Overdue')) && (
              <div className={styles.alert}>
                <AlertTriangle size={16} />
                Urgent items!
              </div>
            )}
          </MotionCard>
        </div>

        {/* Widget 3: Care Fund (Web3) */}
        <div className={styles.widget}>
          <CareFundWidget />
        </div>

        {/* Widget 4: Health Status */}
        <div style={{ display: 'contents' }}>
          <MotionCard href="/health" className={`card ${styles.widget} ${styles.healthWidget}`}>
            <div className={styles.widgetHeader}>
              <h3>Live Vitals</h3>
              <div className="flex items-center gap-2">
                <span className={styles.liveIndicator}>• Live</span>
                <Activity size={20} className="text-red-500" />
              </div>
            </div>

            {/* New Chart Component */}
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
              <HealthChart />
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
          </MotionCard>
        </div>

      </div>
    </MotionContainer>
  );
}
