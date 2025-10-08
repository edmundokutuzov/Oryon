
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyticsData } from '@/lib/data';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

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


export default function AnalyticsPage() {
  return (
    <div className="p-6 fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-8">Analytics</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
             <Card className="gradient-surface border-0 rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Progresso dos Projetos Ativos</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
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
                </CardContent>
            </Card>
            <Card className="gradient-surface border-0 rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Atividade dos Utilizadores (Últimos 7 Dias)</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData.userActivity.labels.map((label, i) => ({ name: label, value: analyticsData.userActivity.data[i] }))}>
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                cursor={{ fill: 'hsla(var(--primary) / 0.1)' }}
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    borderColor: 'hsl(var(--border))',
                                    color: 'hsl(var(--foreground))'
                                }}
                            />
                            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
