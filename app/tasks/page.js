"use client";
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import styles from './page.module.css';
import Modal from '@/components/Modal';
import { MotionContainer, MotionItem, MotionCard } from '@/components/MotionWrapper';
import { CheckCircle, Circle, Plus, AlertTriangle, User, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

export default function TasksPage() {
    const { tasks, addTask, toggleTask } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskAssignee, setNewTaskAssignee] = useState('Jane');

    const sections = [
        { title: 'Overdue & High Priority', color: 'var(--danger)', icon: <AlertTriangle size={18} /> },
        { title: 'Current Week', color: 'var(--accent-primary)', icon: <ClockIcon size={18} /> },
        { title: 'Maintenance & Admin', color: 'var(--text-secondary)', icon: <User size={18} /> },
        // Note: ClockIcon defined locally or imported if available, else standard icon
    ];

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTaskTitle) return;

        const newTask = {
            id: Date.now(),
            title: newTaskTitle,
            assignee: newTaskAssignee,
            due: 'Upcoming',
            status: 'pending',
            section: 'Current Week'
        };
        addTask(newTask);
        setIsModalOpen(false);
        setNewTaskTitle('');
        toast.success('Task created successfully');
    };

    const splitExpense = () => {
        toast.info("Expense Splitter", {
            description: "Jane paid $300. Mark paid $150. Mark owes Jane $75.",
            duration: 5000,
        });
    };

    return (
        <MotionContainer className={styles.container}>
            <header className={styles.header}>
                <MotionItem>
                    <h1 className="gradient-text">Care Tasks</h1>
                    <p className={styles.subtitle}>Track bills, home maintenance, and daily duties.</p>
                </MotionItem>
                <MotionItem delay={0.2} className={styles.actions}>
                    <button className="btn glass flex-center gap-2" onClick={splitExpense}>
                        <DollarSign size={18} />
                        Split Expense
                    </button>
                    <button className="btn btn-primary flex-center gap-2" onClick={() => setIsModalOpen(true)}>
                        <Plus size={20} />
                        New Task
                    </button>
                </MotionItem>
            </header>

            <div className={styles.taskContainer}>
                {sections.map((section, idx) => {
                    const sectionTasks = tasks.filter(t => t.section === section.title);
                    if (sectionTasks.length === 0 && section.title !== 'Current Week') return null;

                    return (
                        <div key={idx} className={styles.section}>
                            <MotionItem index={idx} className={styles.sectionTitle} style={{ color: section.color, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {section.icon}
                                {section.title}
                            </MotionItem>
                            <div className={styles.taskList}>
                                {sectionTasks.map((task, i) => (
                                    <MotionCard
                                        key={task.id}
                                        className={`glass ${styles.taskRow} ${styles[task.status]}`}
                                        onClick={() => toggleTask(task.id)}
                                        whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.08)' }}
                                    >
                                        <button className={`${styles.checkbox} ${task.status === 'completed' ? styles.checked : ''}`}>
                                            {task.status === 'completed' ? <CheckCircle size={20} className="text-green-500" /> : <Circle size={20} className="text-gray-500" />}
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
                                    </MotionCard>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Task">
                <form onSubmit={handleAddTask} className="modal-form">
                    <div className="form-group">
                        <label>Task Title</label>
                        <input
                            type="text"
                            placeholder="e.g., Pay Water Bill"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            className="input-glass"
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <label>Assignee</label>
                        <select
                            value={newTaskAssignee}
                            onChange={(e) => setNewTaskAssignee(e.target.value)}
                            className="input-glass"
                        >
                            <option value="Jane">Jane</option>
                            <option value="Mark">Mark</option>
                            <option value="Dad">Dad</option>
                            <option value="Unassigned">Unassigned</option>
                        </select>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn glass" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Create Task</button>
                    </div>
                </form>
            </Modal>
        </MotionContainer>
    );
}

// Simple fallback icon component if strictly needed, otherwise import Clock
function ClockIcon({ size }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
    );
}
