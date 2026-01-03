"use client";
import { useApp } from '@/context/AppContext';
import styles from './CareFundWidget.module.css';

export default function CareFundWidget() {
    const { isConnected, connectWallet, walletAddress, careFundBalance, recentTransactions, deposit } = useApp();

    return (
        <div className={`card ${styles.container}`}>
            <div className={styles.header}>
                <h3 className="gradient-text">Care Fund</h3>
                <span className={styles.badge}>Base L2</span>
            </div>

            {!isConnected ? (
                <div className={styles.connectState}>
                    <p>Connect to view shared family funds.</p>
                    <button className="btn btn-primary" onClick={connectWallet}>
                        Connect Wallet
                    </button>
                </div>
            ) : (
                <>
                    <div className={styles.balanceCard}>
                        <span className={styles.label}>Total Balance</span>
                        <div className={styles.balanceRow}>
                            <span className={styles.amount}>{careFundBalance}</span>
                            <button className={styles.copyBtn} title="Copy Address">📋</button>
                        </div>
                        <p className={styles.address}>{walletAddress}</p>
                    </div>

                    <div className={styles.transactions}>
                        <h4>Recent Activity</h4>
                        <div className={styles.list}>
                            {recentTransactions.map(tx => (
                                <div key={tx.id} className={styles.txRow}>
                                    <div className={styles.txIcon}>
                                        {tx.type === 'Deposit' ? '⬇️' : '↗️'}
                                    </div>
                                    <div className={styles.txInfo}>
                                        <p className={styles.txTitle}>
                                            {tx.type === 'Deposit' ? `Deposit from ${tx.from}` : `Paid to ${tx.to}`}
                                        </p>
                                        <p className={styles.txMeta}>{tx.date} • {tx.reason || 'Fund'}</p>
                                    </div>
                                    <span className={`${styles.txAmount} ${tx.type === 'Deposit' ? styles.positive : ''}`}>
                                        {tx.type === 'Deposit' ? '+' : '-'}{tx.amount}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        className={`btn glass ${styles.actionBtn}`}
                        onClick={() => {
                            const amt = prompt("Amount to deposit (ETH):", "0.1");
                            if (amt) deposit(amt);
                        }}
                    >
                        + New Deposit
                    </button>
                </>
            )}
        </div>
    );
}
