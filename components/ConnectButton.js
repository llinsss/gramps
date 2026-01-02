"use client";
import { useApp } from '@/context/AppContext';
import styles from './ConnectButton.module.css';

export default function ConnectButton() {
    const { isConnected, connectWallet, disconnectWallet, walletAddress } = useApp();

    if (isConnected) {
        return (
            <button className={`${styles.btn} ${styles.connected}`} onClick={disconnectWallet} title="Disconnect">
                <span className={styles.dot}></span>
                {walletAddress}
            </button>
        );
    }

    return (
        <button className={styles.btn} onClick={connectWallet}>
            Connect Wallet
        </button>
    );
}
