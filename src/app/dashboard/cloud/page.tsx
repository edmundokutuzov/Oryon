
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cloudFiles as initialFiles, users } from '@/lib/data';
import { Download, File as FileIcon, FileArchive, FileText, FileVideo, Folder, MoreVertical, Share2, Trash2, UploadCloud, Plus, ArrowUpDown } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const fileIcons: { [key: string]: React.ReactNode } = {
    pdf: <FileText className="w-5 h-5 text-red-400" />,
    docx: <FileText className="w-5 h-5 text-blue-400" />,
    word: <FileText className="w-5 h-5 text-blue-500" />,
    powerpoint: <FileVideo className="w-5 h-5 text-orange-400" />,
    excel: <FileText className="w-5 h-5 text-green-400" />,
    zip: <FileArchive className="w-5 h-5 text-yellow-400" />,
    figma: <FileIcon className="w-5 h-5 text-purple-400" />,
    folder: <Folder className="w-5 h-5 text-yellow-500" />,
    default: <FileIcon className="w-5 h-5" />,
}

type File = (typeof initialFiles)[0] & { type: string };
type Folder = { id: string, name: string, type: 'folder', lastModified: string, size: string, sharedWith: never[] };

export default function CloudPage() {
    const [filesAndFolders, setFilesAndFolders] = useState<(File | Folder)[]>([
        ...initialFiles,
        { id: 'folder-1', name: 'Relatórios Q3', type: 'folder', lastModified: '2024-11-10T11:00:00Z', size: '--', sharedWith: [] }
    ]);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState({ key: 'name', order: 'asc' });

    const totalStorage = 20; // GB
    const usedStorage = initialFiles.reduce((acc, file) => acc + parseFloat(file.size), 0) / 1024;
    const usedPercentage = (usedStorage / totalStorage) * 100;
    
    const sortedAndFilteredItems = useMemo(() => {
        return [...filesAndFolders]
            .filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
            .sort((a, b) => {
                const aValue = a[sort.key as keyof typeof a] as string;
                const bValue = b[sort.key as keyof typeof b] as string;
                if (aValue < bValue) return sort.order === 'asc' ? -1 : 1;
                if (aValue > bValue) return sort.order === 'asc' ? 1 : -1;
                return 0;
            });
    }, [filesAndFolders, filter, sort]);

    const handleSort = (key: string) => {
        setSort(prev => ({
            key,
            order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc'
        }));
    };

    return (
        <div className="p-6 fade-in">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-foreground">Minha Nuvem</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="bg-card/80">
                        <Folder className="mr-2 h-4 w-4" /> Nova Pasta
                    </Button>
                    <Button className="btn-primary-gradient">
                        <UploadCloud className="mr-2 h-4 w-4" /> Upload
                    </Button>
                </div>
            </div>

            <Card className="gradient-surface border-0 rounded-2xl mb-8">
                <CardHeader>
                    <CardTitle>Uso do Armazenamento</CardTitle>
                </CardHeader>
                <CardContent>
                    <Progress value={usedPercentage} className="h-3" />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>{usedStorage.toFixed(2)} GB de {totalStorage} GB utilizados</span>
                        <span>{usedPercentage.toFixed(1)}%</span>
                    </div>
                </CardContent>
            </Card>

            <Card className="gradient-surface border-0 rounded-2xl">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Meus Ficheiros</CardTitle>
                        <div className="flex gap-2">
                             <Input 
                                placeholder="Filtrar por nome..."
                                className="w-64 bg-card border-border"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                             />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b-border hover:bg-transparent">
                                <TableHead onClick={() => handleSort('name')} className="cursor-pointer"><span className="flex items-center gap-2">Nome <ArrowUpDown className="w-4 h-4"/></span></TableHead>
                                <TableHead onClick={() => handleSort('size')} className="cursor-pointer"><span className="flex items-center gap-2">Tamanho <ArrowUpDown className="w-4 h-4"/></span></TableHead>
                                <TableHead onClick={() => handleSort('lastModified')} className="cursor-pointer"><span className="flex items-center gap-2">Última Modificação <ArrowUpDown className="w-4 h-4"/></span></TableHead>
                                <TableHead>Partilhado com</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedAndFilteredItems.map(item => (
                                <TableRow key={item.id} className="border-b-border/50 hover:bg-muted/50">
                                    <TableCell className="font-medium text-foreground flex items-center gap-3">
                                        {fileIcons[item.type] || fileIcons.default}
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{item.size}</TableCell>
                                    <TableCell className="text-muted-foreground">{new Date(item.lastModified).toLocaleDateString('pt-PT')}</TableCell>
                                    <TableCell>
                                        <div className="flex -space-x-2">
                                            {item.sharedWith?.map(userId => {
                                                const user = users.find(u => u.id === userId);
                                                return user ? <div key={user.id} className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold ring-2 ring-background" title={user.name}>{user.name.charAt(0)}</div> : null;
                                            })}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon"><Share2 className="w-4 h-4 text-primary/80" /></Button>
                                        <Button variant="ghost" size="icon"><Download className="w-4 h-4 text-primary/80" /></Button>
                                        <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-red-400/80" /></Button>
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
