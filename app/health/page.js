"use client";
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import styles from './page.module.css';

export default function HealthPage() {
    const [showAI, setShowAI] = useState(true);
    const { healthStats } = useApp();

    const schedulePT = () => {
        alert("PT Scheduling: Request sent to Dr. Smith's office for next available slot.");
    };

    const dismissAI = () => {
        setShowAI(false);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className="gradient-text">Health & Wearables</h1>
                    <p className={styles.subtitle}>Real-time vitals and AI-powered insights.</p>
                </div>
                <div className={styles.statusBadge}>
                    <span className={styles.onlineDot} style={{ background: healthStats.deviceOnline ? '#10b981' : 'gray', boxShadow: healthStats.deviceOnline ? '0 0 8px #10b981' : 'none' }}></span>
                    {healthStats.deviceOnline ? 'Device Online' : 'Offline'}
                </div>
            </header>

            {/* Vitals Grid */}
            <div className={styles.vitalsGrid}>
                <div className={`glass ${styles.vitalCard}`}>
                    <div className={styles.iconBox} style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' }}>
                        ❤️
                    </div>
                    <div className={styles.vitalInfo}>
                        <h3>Heart Rate</h3>
                        <div className={styles.vitalValue}>{healthStats.heartRate} <span className={styles.unit}>bpm</span></div>
                        <p className={styles.trend}>Avg: 68-74 bpm</p>
                    </div>
                    <div className={styles.chartPlaceholder}>
                        <div className={styles.bar} style={{ height: '40%' }}></div>
                        <div className={styles.bar} style={{ height: '60%' }}></div>
                        <div className={styles.bar} style={{ height: '55%' }}></div>
                        <div className={styles.bar} style={{ height: '70%' }}></div>
                        <div className={styles.bar} style={{ height: '45%' }}></div>
                        <div className={styles.bar} style={{ height: '50%' }}></div>
                        <div className={styles.barActive} style={{ height: '60%' }}></div>
                    </div>
                </div>

                <div className={`glass ${styles.vitalCard}`}>
                    <div className={styles.iconBox} style={{ color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)' }}>
                        💤
                    </div>
                    <div className={styles.vitalInfo}>
                        <h3>Sleep Quality</h3>
                        <div className={styles.vitalValue}>{healthStats.sleep}</div>
                        <p className={styles.trend}>Deep Sleep: 1h 45m</p>
                    </div>
                    <div className={styles.chartPlaceholder}>
                        <div className={styles.bar} style={{ height: '80%' }}></div>
                        <div className={styles.bar} style={{ height: '70%' }}></div>
                        <div className={styles.bar} style={{ height: '60%' }}></div>
                        <div className={styles.barActive} style={{ height: '75%' }}></div>
                        <div className={styles.bar} style={{ height: '65%' }}></div>
                        <div className={styles.bar} style={{ height: '85%' }}></div>
                        <div className={styles.bar} style={{ height: '70%' }}></div>
                    </div>
                </div>

                <div className={`glass ${styles.vitalCard}`}>
                    <div className={styles.iconBox} style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)' }}>
                        👣
                    </div>
                    <div className={styles.vitalInfo}>
                        <h3>Activity</h3>
                        <div className={styles.vitalValue}>{healthStats.steps.toLocaleString()}</div>
                        <p className={styles.trend}>Steps Today</p>
                    </div>
                    <div className={styles.chartPlaceholder}>
                        <div className={styles.bar} style={{ height: '30%' }}></div>
                        <div className={styles.bar} style={{ height: '40%' }}></div>
                        <div className={styles.barActive} style={{ height: '35%' }}></div>
                        <div className={styles.bar} style={{ height: '50%' }}></div>
                        <div className={styles.bar} style={{ height: '45%' }}></div>
                        <div className={styles.bar} style={{ height: '20%' }}></div>
                        <div className={styles.bar} style={{ height: '30%' }}></div>
                    </div>
                </div>
            </div>

            {/* AI Insights */}
            {showAI && (
                <>
                    <h2 className={styles.sectionTitle}>AI Insights</h2>
                    <div className={`glass ${styles.aiCard}`}>
                        <div className={styles.aiHeader}>
                            <div className={styles.aiIcon}>✨</div>
                            <h3>GrampsIQ Analysis</h3>
                        </div>
                        <p className={styles.aiText}>
                            Based on recent activity patterns, Dad's mobility has decreased by <strong>15%</strong> this week.
                            This correlates with the reported "Tired" mood on Tuesday. Suggest scheduling a light PT session or a short walk.
                        </p>
                        <div className={styles.aiActions}>
                            <button className="btn btn-primary" onClick={schedulePT}>Schedule PT</button>
                            <button className="btn glass" onClick={dismissAI}>Dismiss</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
