"use client";
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    // --- TASKS STATE ---
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Pay Electricity Bill', assignee: 'Jane', due: 'Yesterday', status: 'overdue', section: 'Overdue & High Priority' },
        { id: 2, title: 'Refill Heart Meds', assignee: 'Mark', due: 'Today', status: 'urgent', section: 'Overdue & High Priority' },
        { id: 3, title: 'Mow the Lawn', assignee: 'Mark', due: 'Wednesday', status: 'pending', section: 'Current Week' },
        { id: 4, title: 'Grocery Run', assignee: 'Jane', due: 'Friday', status: 'pending', section: 'Current Week' },
        { id: 5, title: 'Schedule Eye Exam', assignee: 'Unassigned', due: 'Next Week', status: 'pending', section: 'Maintenance & Admin' },
    ]);

    const addTask = (task) => setTasks([...tasks, task]);
    const toggleTask = (id) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t
        ));
    };

    // --- CALENDAR STATE ---
    const [events, setEvents] = useState([
        { id: 1, title: 'Cardiologist', date: 15, type: 'medical', time: '2:00 PM' },
        { id: 2, title: 'Family Dinner', date: 15, type: 'social', time: '6:00 PM' },
        { id: 3, title: 'Grocery Run', date: 18, type: 'task', time: '10:00 AM' },
        { id: 4, title: 'PT Session', date: 22, type: 'medical', time: '11:00 AM' },
    ]);

    const addEvent = (event) => setEvents([...events, event]);

    // --- VISITS STATE ---
    const [visits, setVisits] = useState([
        { id: 1, date: 'Today, 10:30 AM', visitor: 'Jane (You)', mood: 'Happy', moodColor: 'var(--success)', note: 'Brought groceries. Dad was in good spirits, watched the game together.' },
        { id: 2, date: 'Yesterday, 5:00 PM', visitor: 'Mark (Brother)', mood: 'Tired', moodColor: 'var(--warning)', note: 'Stopped by after work. He seemed a bit lethargic, check BP tomorrow.' },
        { id: 3, date: 'Oct 28, 2:00 PM', visitor: 'Dr. Smith', mood: 'Neutral', moodColor: 'var(--accent-primary)', note: 'Routine checkup. Everything looks stable.' },
    ]);

    const addVisit = (visit) => setVisits([visit, ...visits]);

    // --- HEALTH STATE ---
    const [healthStats, setHealthStats] = useState({
        heartRate: 72,
        sleep: '7h 20m',
        steps: 3450,
        deviceOnline: true
    });

    // Web3 State (Mock)
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [careFundBalance, setCareFundBalance] = useState('4.2 ETH'); // Mock balance
    const [recentTransactions, setRecentTransactions] = useState([
        { id: 1, type: 'Deposit', from: 'Mark', amount: '0.5 ETH', date: '2h ago' },
        { id: 2, type: 'Expense', to: 'CVS Pharmacy', amount: '0.05 ETH', date: '1d ago', reason: 'Meds' },
    ]);

    const connectWallet = () => {
        // Simulate connection delay
        setTimeout(() => {
            setIsConnected(true);
            setWalletAddress('0x71C...9B21');
        }, 800);
    };

    const disconnectWallet = () => {
        setIsConnected(false);
        setWalletAddress('');
    };

    const value = {
        tasks, addTask, toggleTask,
        events, addEvent,
        visits, addVisit,
        healthStats, setHealthStats,
        // Web3 Exports
        isConnected,
        walletAddress,
        careFundBalance,
        recentTransactions,
        connectWallet,
        disconnectWallet
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    return useContext(AppContext);
}
