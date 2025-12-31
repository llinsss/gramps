"use client";
import styles from './page.module.css';
import { useApp } from '@/context/AppContext';

export default function Home() {
  const { events, tasks, healthStats } = useApp();

  // Get next upcoming event (simplified logic: just taking the first one for now, or sorting)
  const upcomingEvents = [...events].sort((a, b) => a.date - b.date);
  const nextEvent = upcomingEvents[0];
  const followingEvent = upcomingEvents[1];

  // Get urgent tasks
  const urgentTasks = tasks.filter(t => t.status === 'urgent' || t.status === 'overdue');
  const pendingTasks = tasks.filter(t => t.status !== 'completed').slice(0, 3); // Top 3 pending

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="gradient-text">Good Morning, Jane</h1>
        <p className={styles.subtitle}>Here's what's happening with Mom & Dad today.</p>
      </header>

      <div className={styles.grid}>
        {/* Calendar Widget */}
        <div className={`card ${styles.widget} ${styles.calendarWidget}`}>
          <div className={styles.widgetHeader}>
            <h3>Upcoming Events</h3>
            <span className={styles.badge}>Today</span>
          </div>
          {nextEvent ? (
            <>
              <div className={styles.eventItem}>
                <div className={styles.eventTime}>{nextEvent.time}</div>
                <div className={styles.eventDetails}>
                  <h4>{nextEvent.title}</h4>
                  <p>{nextEvent.type === 'medical' ? 'Doctor Appointment' : 'Family Event'}</p>
                </div>
              </div>
              {followingEvent && (
                <div className={styles.eventItem}>
                  <div className={styles.eventTime}>{followingEvent.time}</div>
                  <div className={styles.eventDetails}>
                    <h4>{followingEvent.title}</h4>
                    <p>{followingEvent.type}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>No upcoming events.</p>
          )}
        </div>

        {/* Tasks Widget */}
        <div className={`card ${styles.widget} ${styles.tasksWidget}`}>
          <div className={styles.widgetHeader}>
            <h3>Pending Tasks</h3>
            {urgentTasks.length > 0 && <span className={styles.badgeWarning}>{urgentTasks.length} Urgent</span>}
          </div>
          <ul className={styles.taskList}>
            {pendingTasks.map(task => (
              <li key={task.id} className={styles.taskItem}>
                <div className={styles.checkbox} style={{ borderColor: task.status === 'completed' ? 'var(--success)' : 'var(--text-secondary)' }}></div>
                <span>{task.title}</span>
              </li>
            ))}
            {pendingTasks.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>All caught up!</p>}
          </ul>
        </div>

        {/* Health Widget */}
        <div className={`card ${styles.widget} ${styles.healthWidget}`}>
          <div className={styles.widgetHeader}>
            <h3>Health Status</h3>
            <span className={styles.badgeSuccess}>Stable</span>
          </div>
          <div className={styles.vitalsGrid}>
            <div className={styles.vital}>
              <span className={styles.vitalLabel}>Heart Rate</span>
              <span className={styles.vitalValue}>{healthStats.heartRate} <small>bpm</small></span>
            </div>
            <div className={styles.vital}>
              <span className={styles.vitalLabel}>Sleep</span>
              <span className={styles.vitalValue}>{healthStats.sleep}</span>
            </div>
            <div className={styles.vital}>
              <span className={styles.vitalLabel}>Steps</span>
              <span className={styles.vitalValue}>{healthStats.steps}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
