"use client";
import { useApp } from '@/context/AppContext';
import styles from './page.module.css';

export default function TasksPage() {
    const { tasks, addTask, toggleTask } = useApp();

    const sections = [
        { title: 'Overdue & High Priority', color: 'var(--danger)' },
        { title: 'Current Week', color: 'var(--accent-primary)' },
        { title: 'Maintenance & Admin', color: 'var(--text-secondary)' },
    ];

    const addNewTask = () => {
        const title = window.prompt("Enter task title:");
        if (!title) return;
        const assignee = window.prompt("Who is doing this? (Jane, Mark, Dad)") || "Unassigned";

        const newTask = {
            id: Date.now(),
            title,
            assignee,
            due: 'Upcoming',
            status: 'pending',
            section: 'Current Week'
        };
        addTask(newTask);
    };

    const splitExpense = () => {
        alert("Expense Splitter:\n\nTotal detected expenses this month: $450\nJane paid: $300\nMark paid: $150\n\nMark owes Jane: $75");
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className="gradient-text">Care Tasks</h1>
                    <p className={styles.subtitle}>Track bills, home maintenance, and daily duties.</p>
                </div>
                <div className={styles.actions}>
                    <button className="btn glass" onClick={splitExpense}>Split Expense</button>
                    <button className="btn btn-primary" onClick={addNewTask}>+ New Task</button>
                </div>
            </header>

            <div className={styles.taskContainer}>
                {sections.map((section, idx) => {
                    const sectionTasks = tasks.filter(t => t.section === section.title);
                    // Show section if it has tasked OR if it's "Current Week" (to allow dragging/dropping visually later, or just general utility)
                    if (sectionTasks.length === 0 && section.title !== 'Current Week') return null;

                    return (
                        <div key={idx} className={styles.section}>
                            <h3 className={styles.sectionTitle} style={{ color: section.color }}>
                                {section.title}
                            </h3>
                            <div className={styles.taskList}>
                                {sectionTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className={`glass ${styles.taskRow} ${styles[task.status]}`}
                                        onClick={() => toggleTask(task.id)}
                                    >
                                        <button className={`${styles.checkbox} ${task.status === 'completed' ? styles.checked : ''}`}>
                                            {task.status === 'completed' && '✓'}
                                        </button>
                                        <div className={styles.taskInfo}>
                                            <span className={`${styles.taskTitle} ${task.status === 'completed' ? styles.strike : ''}`}>
                                                {task.title}
                                            </span>
                                            <span className={styles.taskMeta}>Due {task.due}</span>
                                        </div>
                                        <div className={styles.assignee}>
                                            {task.assignee.charAt(0)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
