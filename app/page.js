import styles from './page.module.css';

export default function Home() {
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
          <div className={styles.eventItem}>
            <div className={styles.eventTime}>2:00 PM</div>
            <div className={styles.eventDetails}>
              <h4>Cardiologist Appointment</h4>
              <p>Dr. Smith • Main Street Clinic</p>
            </div>
          </div>
          <div className={styles.eventItem}>
            <div className={styles.eventTime}>5:00 PM</div>
            <div className={styles.eventDetails}>
              <h4>Family Dinner</h4>
              <p>Mom's House</p>
            </div>
          </div>
        </div>

        {/* Tasks Widget */}
        <div className={`card ${styles.widget} ${styles.tasksWidget}`}>
          <div className={styles.widgetHeader}>
            <h3>Pending Tasks</h3>
            <span className={styles.badgeWarning}>3 Urgent</span>
          </div>
          <ul className={styles.taskList}>
            <li className={styles.taskItem}>
              <button className={styles.checkbox}></button>
              <span>Pay Electricity Bill</span>
            </li>
            <li className={styles.taskItem}>
              <button className={styles.checkbox}></button>
              <span>Refill Prescriptions</span>
            </li>
            <li className={styles.taskItem}>
              <button className={styles.checkbox}></button>
              <span>Call Insurance</span>
            </li>
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
              <span className={styles.vitalValue}>72 <small>bpm</small></span>
            </div>
            <div className={styles.vital}>
              <span className={styles.vitalLabel}>Blood Pressure</span>
              <span className={styles.vitalValue}>120/80</span>
            </div>
            <div className={styles.vital}>
              <span className={styles.vitalLabel}>Sleep</span>
              <span className={styles.vitalValue}>7h 20m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
