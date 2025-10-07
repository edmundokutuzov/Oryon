
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { reports } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="p-6 fade-in">
        <h1 className="text-3xl font-bold text-white mb-8">Relatórios</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map(report => (
                <Card key={report.id} className="gradient-surface border-0 rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-white">{report.title}</CardTitle>
                        <CardDescription className="text-sm text-white/70 pt-2">{report.summary}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                             <Badge variant="secondary" className="capitalize bg-green-500/20 text-green-300">
                                {report.type}
                            </Badge>
                            <Button variant="link" className="text-primary/80 hover:text-primary">
                                Ver Detalhes <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
