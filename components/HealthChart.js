"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { time: '10:00', hr: 68 },
    { time: '10:30', hr: 72 },
    { time: '11:00', hr: 75 },
    { time: '11:30', hr: 70 },
    { time: '12:00', hr: 65 },
    { time: '12:30', hr: 74 },
    { time: '13:00', hr: 78 },
];

export default function HealthChart() {
    return (
        <div style={{ width: '100%', height: 100 }}>
            <ResponsiveContainer>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                        itemStyle={{ color: '#fff' }}
                        cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="hr"
                        stroke="#ef4444"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorHr)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
