
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyticsData } from '@/lib/data';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function AnalyticsPage() {
  return (
    <div className="p-6 fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-8">Analytics</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            <Card className="gradient-surface border-0 rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Progresso dos Projetos Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {analyticsData.projectProgress.labels.map((label, i) => (
                            <div key={label}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-foreground">{label}</span>
                                    <span className="text-foreground/80">{analyticsData.projectProgress.data[i]}%</span>
                                </div>
                                <div className="w-full bg-foreground/10 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${analyticsData.projectProgress.data[i]}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
