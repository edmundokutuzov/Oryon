
'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { documents as initialDocuments } from '@/lib/data';
import { Download, FileText, FileArchive, FileVideo, Folder, Plus, ArrowUpDown } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';

const fileIcons: { [key: string]: React.ReactNode } = {
    PDF: <FileText className="w-5 h-5 text-red-400" />,
    DOCX: <FileText className="w-5 h-5 text-blue-400" />,
    PPTX: <FileVideo className="w-5 h-5 text-orange-400" />,
    ZIP: <FileArchive className="w-5 h-5 text-yellow-400" />,
    folder: <Folder className="w-5 h-5 text-yellow-500" />,
    default: <FileText className="w-5 h-5" />,
}

type Doc = (typeof initialDocuments)[0];
type Folder = { id: string, title: string, type: 'folder', lastModified: string, size: string };

export default function DocumentsPage() {
    const [items, setItems] = useState<(Doc | Folder)[]>([
        { id: 'folder-1', title: 'Relatórios Anuais', type: 'folder', lastModified: '2024-10-01', size: '--'},
        { id: 'folder-2', title: 'Recursos de Marketing', type: 'folder', lastModified: '2024-09-15', size: '--'},
        ...initialDocuments,
    ]);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState({ key: 'title', order: 'asc' });

     const sortedAndFilteredItems = useMemo(() => {
        return [...items]
            .filter(item => item.title.toLowerCase().includes(filter.toLowerCase()))
            .sort((a, b) => {
                const aValue = a[sort.key as keyof typeof a] as string;
                const bValue = b[sort.key as keyof typeof b] as string;
                if (aValue < bValue) return sort.order === 'asc' ? -1 : 1;
                if (aValue > bValue) return sort.order === 'asc' ? 1 : -1;
                return 0;
            });
    }, [items, filter, sort]);

    const handleSort = (key: string) => {
        setSort(prev => ({
            key,
            order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc'
        }));
    };

  return (
    <div className="p-6 fade-in">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">Documentos da Empresa</h1>
             <Input 
                placeholder="Filtrar por nome..."
                className="w-80 bg-card border-border"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                />
        </div>
        <Card className="gradient-surface border-0 rounded-2xl">
            <CardContent className="p-6">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b-border hover:bg-transparent">
                            <TableHead onClick={() => handleSort('title')} className="cursor-pointer"><span className="flex items-center gap-2">Nome <ArrowUpDown className="w-4 h-4"/></span></TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead onClick={() => handleSort('size')} className="cursor-pointer"><span className="flex items-center gap-2">Tamanho <ArrowUpDown className="w-4 h-4"/></span></TableHead>
                            <TableHead onClick={() => handleSort('lastModified')} className="cursor-pointer"><span className="flex items-center gap-2">Última Modificação <ArrowUpDown className="w-4 h-4"/></span></TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedAndFilteredItems.map(doc => (
                            <TableRow key={doc.id} className="border-b-border/50 hover:bg-muted/50">
                                <TableCell className="font-medium text-foreground flex items-center gap-3">
                                    {fileIcons[doc.type] || <FileText className="w-5 h-5" />}
                                    {doc.title}
                                </TableCell>
                                <TableCell>
                                   {doc.type !== 'folder' && (
                                     <span className="bg-primary/20 text-primary text-xs font-bold py-1 px-2 rounded-full">
                                        {doc.type}
                                    </span>
                                   )}
                                </TableCell>
                                <TableCell className="text-muted-foreground">{doc.size}</TableCell>
                                <TableCell className="text-muted-foreground">{new Date(doc.lastModified).toLocaleDateString('pt-PT')}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="text-primary/80 hover:text-primary">
                                        <Download className="w-5 h-5"/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
