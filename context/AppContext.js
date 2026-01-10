"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import GrampsCareABI from '@/app/utils/grampsCareABI.json';
import { toast } from 'sonner';

const AppContext = createContext();

// TODO: Replace with deployed contract address
const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

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

    // --- WEB3 STATE ---
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [careFundBalance, setCareFundBalance] = useState('0.0 ETH');
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [documents, setDocuments] = useState([]);

    // Initial check for wallet connection
    useEffect(() => {
        checkConnection();
    }, []);

    const checkConnection = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                    setIsConnected(true);
                    loadBlockchainData(accounts[0]);
                }
            } catch (error) {
                console.error("Error checking connection:", error);
            }
        }
    };

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
                setIsConnected(true);
                loadBlockchainData(accounts[0]);
                toast.success('Wallet connected successfully!');
            } catch (error) {
                console.error("Connection error:", error);
                toast.error('Failed to connect wallet');
            }
        } else {
            toast.warning("Please install MetaMask!");
        }
    };

    const disconnectWallet = () => {
        setIsConnected(false);
        setWalletAddress('');
        setCareFundBalance('0.0 ETH');
        setRecentTransactions([]);
        toast.info('Wallet disconnected');
    };

    const loadBlockchainData = async (account) => {
        if (!CONTRACT_ADDRESS) {
            console.warn("Contract address not set");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, GrampsCareABI, provider);

            // Fetch Balance
            const balance = await provider.getBalance(CONTRACT_ADDRESS);
            setCareFundBalance(Number(ethers.formatEther(balance)).toFixed(4) + ' ETH');

            // Fetch Events
            // Note: In production, fetching all logs from block 0 can be slow/limited by RPC.
            // Optimized query: Look at last 10000 blocks or use an indexer.
            // For now, we'll try to fetch recent logs. 
            // Since we don't have block number easily here without another call, we'll query from 'latest' - X or just all if local.
            // Let's assume a safe range or 'fromBlock: 0' if it's a testnet with few txs.

            const depositFilter = contract.filters.Deposit();
            const expenseFilter = contract.filters.ExpensePaid();

            const deposits = await contract.queryFilter(depositFilter);
            const expenses = await contract.queryFilter(expenseFilter);

            // Combine and sort
            const allEvents = [
                ...deposits.map(e => ({
                    id: e.transactionHash + '-dep',
                    type: 'Deposit',
                    from: e.args[0], // address from
                    amount: ethers.formatEther(e.args[1]),
                    blockNumber: e.blockNumber,
                    hash: e.transactionHash
                })),
                ...expenses.map(e => ({
                    id: e.transactionHash + '-exp',
                    type: 'Expense',
                    to: e.args[1], // recipient
                    amount: ethers.formatEther(e.args[2]),
                    reason: e.args[3],
                    blockNumber: e.blockNumber,
                    hash: e.transactionHash
                }))
            ].sort((a, b) => b.blockNumber - a.blockNumber); // Newest first

            // Format for UI (Limit to 5)
            // We need timestamps for "2h ago", but that requires getBlock for each event.
            // For performance, we'll just show 'Block #' or simplified date if possible.
            // Ideally, we'd fetch block timestamps in parallel.

            // let's fetch timestamps for top 5
            const recent = allEvents.slice(0, 5);
            const recentWithTime = await Promise.all(recent.map(async (tx) => {
                const block = await provider.getBlock(tx.blockNumber);
                const date = new Date(block.timestamp * 1000).toLocaleDateString();
                return { ...tx, date };
            }));

            setRecentTransactions(recentWithTime);

            // Fetch Documents
            const docFilter = contract.filters.DocumentRegistered();
            const docEvents = await contract.queryFilter(docFilter);

            const docs = await Promise.all(docEvents.map(async (e) => {
                const block = await provider.getBlock(e.blockNumber);
                return {
                    id: e.transactionHash,
                    hash: e.args[0],
                    category: e.args[1],
                    timestamp: e.args[2],
                    date: new Date(block.timestamp * 1000).toLocaleDateString(),
                    title: `Doc-${e.args[0].substring(0, 6)}...`, // Placeholder title
                    size: 'Hash Only'
                };
            }));

            setDocuments(docs.reverse()); // Newest first

        } catch (error) {
            console.error("Error loading blockchain data:", error);
        }
    };

    const deposit = async (amount) => {
        if (!CONTRACT_ADDRESS || !isConnected) return;
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // Send ETH directly to contract (triggers receive() function)
            const tx = await signer.sendTransaction({
                to: CONTRACT_ADDRESS,
                value: ethers.parseEther(amount)
            });

            await tx.wait();

            // Refresh data
            loadBlockchainData(walletAddress);
            toast.success('Deposit successful!');
        } catch (error) {
            console.error("Deposit error:", error);
            toast.error('Deposit failed: ' + error.message);
        }
    };

    const registerDocument = async (fileName, category) => {
        if (!CONTRACT_ADDRESS || !isConnected) return;
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, GrampsCareABI, signer);

            // Create a hash of the "file" (using name + timestamp for uniqueness in this demo)
            const docHash = ethers.id(fileName + Date.now());

            const tx = await contract.registerDocument(docHash, category);
            await tx.wait();

            // Refresh
            loadBlockchainData(walletAddress);
            toast.success('Document Registered on Blockchain!');
        } catch (error) {
            console.error("Registration error:", error);
            toast.error('Failed to register: ' + error.message);
        }
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
        documents,
        connectWallet,
        disconnectWallet,
        deposit,
        registerDocument
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    return useContext(AppContext);
}
