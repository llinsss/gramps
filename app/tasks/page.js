import styles from './page.module.css';

export default function TasksPage() {
    const sections = [
        {
            title: 'Overdue & High Priority',
            color: 'var(--danger)',
            tasks: [
                { id: 1, title: 'Pay Electricity Bill', assignee: 'Jane', due: 'Yesterday', status: 'overdue' },
                { id: 2, title: 'Refill Heart Meds', assignee: 'Mark', due: 'Today', status: 'urgent' },
            ],
        },
        {
            title: 'Current Week',
            color: 'var(--accent-primary)',
            tasks: [
                { id: 3, title: 'Mow the Lawn', assignee: 'Mark', due: 'Wednesday', status: 'pending' },
                { id: 4, title: 'Grocery Run', assignee: 'Jane', due: 'Friday', status: 'pending' },
            ],
        },
        {
            title: 'Maintenance & Admin',
            color: 'var(--text-secondary)',
            tasks: [
                { id: 5, title: 'Schedule Eye Exam', assignee: 'Unassigned', due: 'Next Week', status: 'pending' },
                { id: 6, title: 'Check Hearing Aid Batteries', assignee: 'Dad', due: 'Monthly', status: 'pending' },
            ],
        },
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className="gradient-text">Care Tasks</h1>
                    <p className={styles.subtitle}>Track bills, home maintenance, and daily duties.</p>
                </div>
                <div className={styles.actions}>
                    <button className="btn glass">Split Expense</button>
                    <button className="btn btn-primary">+ New Task</button>
                </div>
            </header>

            <div className={styles.taskContainer}>
                {sections.map((section, idx) => (
                    <div key={idx} className={styles.section}>
                        <h3 className={styles.sectionTitle} style={{ color: section.color }}>
                            {section.title}
                        </h3>
                        <div className={styles.taskList}>
                            {section.tasks.map((task) => (
                                <div key={task.id} className={`glass ${styles.taskRow} ${styles[task.status]}`}>
                                    <button className={styles.checkbox}></button>
                                    <div className={styles.taskInfo}>
                                        <span className={styles.taskTitle}>{task.title}</span>
                                        <span className={styles.taskMeta}>Due {task.due}</span>
                                    </div>
                                    <div className={styles.assignee}>
                                        {task.assignee.charAt(0)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
