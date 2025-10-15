'use client';

import { analyticsData } from '@/lib/data';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const projectProgressColors = {
    'Campanha Q4': '#8884d8',
    'Identidade Visual': '#82ca9d',
    'Relatório Trimestral': '#ffc658',
    'Otimização SEO': '#ff8042',
};

const projectData = analyticsData.projectProgress.labels.map((label, i) => ({
    name: label,
    value: analyticsData.projectProgress.data[i],
    fill: projectProgressColors[label as keyof typeof projectProgressColors] || '#8884d8'
}));

export default function ProjectProgressChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                    <Pie data={projectData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                    {projectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Pie>
                <Tooltip
                    cursor={{ fill: 'hsla(var(--primary) / 0.1)' }}
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))',
                        color: 'hsl(var(--foreground))'
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}
