"use client";
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import styles from './page.module.css';

export default function DocumentsPage() {
    const { documents, registerDocument, isConnected, connectWallet } = useApp();

    const categories = [
        { name: 'Medical', count: documents?.filter(d => d.category === 'Medical').length || 0, icon: '🏥', color: 'var(--accent-primary)' },
        { name: 'Legal', count: documents?.filter(d => d.category === 'Legal').length || 0, icon: '⚖️', color: 'var(--warning)' },
        { name: 'Financial', count: documents?.filter(d => d.category === 'Financial').length || 0, icon: '💰', color: 'var(--success)' },
        { name: 'IDs', count: documents?.filter(d => d.category === 'IDs').length || 0, icon: '🪪', color: 'var(--accent-secondary)' },
    ];

    const uploadDoc = () => {
        if (!isConnected) {
            alert("Please connect wallet first!");
            return;
        }
        const title = window.prompt("Document Filename:") || "New Document.pdf";
        const category = window.prompt("Category (Medical, Legal, IDs, Financial):") || "General";
        registerDocument(title, category);
    };

    const handleAction = (hash) => {
        // In real app, this would verify the hash against a file or download from IPFS
        alert(`Verifying on-chain hash:\n${hash}\n\n[Valid Timestamped Record]`);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className="gradient-text">The Vault</h1>
                    <p className={styles.subtitle}>Secure storage for critical family documents.</p>
                </div>
                {isConnected ? (
                    <button className="btn btn-primary" onClick={uploadDoc}>
                        + Register Document
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={connectWallet}>
                        Connect Wallet
                    </button>
                )}
            </header>

            {/* Categories */}
            <div className={styles.categoryGrid}>
                {categories.map((cat) => (
                    <div key={cat.name} className={`card ${styles.categoryCard}`}>
                        <div className={styles.catIcon} style={{ background: `${cat.color}20`, color: cat.color }}>
                            {cat.icon}
                        </div>
                        <div className={styles.catInfo}>
                            <h3>{cat.name}</h3>
                            <p>{cat.count} documents</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Files */}
            <h2 className={styles.sectionTitle}>Blockchain Registry</h2>
            <div className={styles.docList}>
                {isConnected && documents && documents.length > 0 ? (
                    documents.map((doc, index) => (
                        <div key={index} className={`glass ${styles.docRow}`}>
                            <div className={styles.docIcon}>📄</div>
                            <div className={styles.docDetails}>
                                <h4>{doc.title}</h4>
                                <p>{doc.category} • {doc.date} • {doc.size}</p>
                            </div>
                            <button className={styles.actionBtn} onClick={() => handleAction(doc.hash)}>🔍</button>
                        </div>
                    ))
                ) : (
                    <div className={styles.emptyState}>
                        <p>{isConnected ? "No documents found in registry." : "Connect wallet to view protected documents."}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
