"use client";
import { useApp } from '@/context/AppContext';
import { Wallet, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WalletConnect({ className = "" }) {
    const { account, connectWallet, isConnecting } = useApp();

    const formatAddress = (addr) => {
        if (!addr) return "";
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    return (
        <motion.button
            className={`btn btn-primary flex-center gap-2 ${className}`}
            onClick={connectWallet}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isConnecting}
        >
            {isConnecting ? (
                <>
                    <Loader2 size={18} className="animate-spin" />
                    Connecting...
                </>
            ) : account ? (
                <>
                    <Wallet size={18} />
                    {formatAddress(account)}
                </>
            ) : (
                <>
                    <Wallet size={18} />
                    Connect Wallet
                </>
            )}
        </motion.button>
    );
}
