"use client";
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import styles from './page.module.css';
import { MotionContainer, MotionItem, MotionCard } from '@/components/MotionWrapper';
import HealthChart from '@/components/HealthChart';
import { Heart, Moon, Activity, Sparkles, X } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Tooltip as RechartsTooltip, Cell } from 'recharts';
import { toast } from 'sonner';

// Mock Data for new charts
const sleepData = [
    { day: 'M', hours: 7 }, { day: 'T', hours: 6.5 }, { day: 'W', hours: 8 },
    { day: 'T', hours: 7.5 }, { day: 'F', hours: 5 }, { day: 'S', hours: 9 }, { day: 'S', hours: 7 }
];
const activityData = [
    { day: 'M', steps: 4000 }, { day: 'T', steps: 7000 }, { day: 'W', steps: 5500 },
    { day: 'T', steps: 8000 }, { day: 'F', steps: 3000 }, { day: 'S', steps: 6000 }, { day: 'S', steps: 4500 }
];

export default function HealthPage() {
    const [showAI, setShowAI] = useState(true);
    const { healthStats } = useApp();

    const schedulePT = () => {
        toast.info("Request Sent", {
            description: "PT scheduling request sent to Dr. Smith's office."
        });
    };

    const dismissAI = () => {
        setShowAI(false);
    };

    return (
        <MotionContainer className={styles.container}>
            <header className={styles.header}>
                <MotionItem>
                    <h1 className="gradient-text">Health & Wearables</h1>
                    <p className={styles.subtitle}>Real-time vitals and AI-powered insights.</p>
                </MotionItem>
                <MotionItem delay={0.2} className={styles.statusBadge}>
                    <span className={styles.onlineDot} style={{ background: healthStats.deviceOnline ? '#10b981' : 'gray', boxShadow: healthStats.deviceOnline ? '0 0 8px #10b981' : 'none' }}></span>
                    {healthStats.deviceOnline ? 'Device Online' : 'Offline'}
                </MotionItem>
            </header>

            {/* Vitals Grid */}
            <div className={styles.vitalsGrid}>
                {/* Heart Rate */}
                <MotionCard className={`glass ${styles.vitalCard}`}>
                    <div className={styles.iconBox} style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' }}>
                        <Heart size={24} />
                    </div>
                    <div className={styles.vitalInfo}>
                        <h3>Heart Rate</h3>
                        <div className={styles.vitalValue}>{healthStats.heartRate} <span className={styles.unit}>bpm</span></div>
                        <p className={styles.trend}>Avg: 68-74 bpm</p>
                    </div>
                    <div className={styles.chartContainer}>
                        <HealthChart />
                    </div>
                </MotionCard>

                {/* Sleep Quality */}
                <MotionCard className={`glass ${styles.vitalCard}`} delay={0.1}>
                    <div className={styles.iconBox} style={{ color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)' }}>
                        <Moon size={24} />
                    </div>
                    <div className={styles.vitalInfo}>
                        <h3>Sleep Quality</h3>
                        <div className={styles.vitalValue}>{healthStats.sleep}</div>
                        <p className={styles.trend}>Deep Sleep: 1h 45m</p>
                    </div>
                    <div className={styles.chartContainer} style={{ height: 100 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sleepData}>
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                                    {sleepData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.hours > 6 ? '#3b82f6' : '#60a5fa'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </MotionCard>

                {/* Activity */}
                <MotionCard className={`glass ${styles.vitalCard}`} delay={0.2}>
                    <div className={styles.iconBox} style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)' }}>
                        <Activity size={24} />
                    </div>
                    <div className={styles.vitalInfo}>
                        <h3>Activity</h3>
                        <div className={styles.vitalValue}>{healthStats.steps.toLocaleString()}</div>
                        <p className={styles.trend}>Steps Today</p>
                    </div>
                    <div className={styles.chartContainer} style={{ height: 100 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData}>
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar dataKey="steps" radius={[4, 4, 0, 0]}>
                                    {activityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.steps > 5000 ? '#10b981' : '#34d399'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </MotionCard>
            </div>

            {/* AI Insights */}
            {showAI && (
                <MotionCard className={`glass ${styles.aiCard}`} delay={0.4} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
                    <div className={styles.aiHeader}>
                        <div className={styles.aiIcon}>
                            <Sparkles size={18} />
                        </div>
                        <h3>GrampsIQ Analysis</h3>
                    </div>
                    <p className={styles.aiText}>
                        Based on recent activity patterns, Dad's mobility has decreased by <strong>15%</strong> this week.
                        This correlates with the reported "Tired" mood on Tuesday. Suggest scheduling a light PT session or a short walk.
                    </p>
                    <div className={styles.aiActions}>
                        <button className="btn btn-primary" onClick={schedulePT}>Schedule PT</button>
                        <button className="btn glass flex-center" onClick={dismissAI}>
                            <X size={16} /> Dismiss
                        </button>
                    </div>
                </MotionCard>
            )}
        </MotionContainer>
    );
}
