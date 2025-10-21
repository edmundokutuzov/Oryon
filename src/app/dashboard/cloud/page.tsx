
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cloudFiles as initialFiles, users } from '@/lib/data';
import { Download, File as FileIcon, FileArchive, FileText, FileVideo, Folder, MoreVertical, Share2, Trash2, UploadCloud, Plus, ArrowUpDown, FolderPlus } from 'lucide-react';
import { useState, useMemo, useRef } from 'react';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';


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
    const { toast } = useToast();
    const [filesAndFolders, setFilesAndFolders] = useState<(File | Folder)[]>([
        ...initialFiles,
        { id: 'folder-1', name: 'Relatórios Q3', type: 'folder', lastModified: '2024-11-10T11:00:00Z', size: '--', sharedWith: [] },
        { id: 'folder-2', name: 'Projetos 2024', type: 'folder', lastModified: '2024-10-20T09:00:00Z', size: '--', sharedWith: [] },
        { id: 'folder-3', name: 'Recursos de Marketing', type: 'folder', lastModified: '2024-11-01T14:00:00Z', size: '--', sharedWith: [] },
        { id: 'folder-4', name: 'Documentos Pessoais', type: 'folder', lastModified: '2024-09-05T18:00:00Z', size: '--', sharedWith: [] },
    ]);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState({ key: 'name', order: 'asc' });
    const [isNewFolderOpen, setIsNewFolderOpen] = useState(false);
    const newFolderNameRef = useRef<HTMLInputElement>(null);
    const uploadInputRef = useRef<HTMLInputElement>(null);

    const totalStorage = 20; // GB
    const usedStorage = useMemo(() => filesAndFolders.filter(f => f.type !== 'folder').reduce((acc, file) => acc + parseFloat(file.size), 0) / 1024, [filesAndFolders]);
    const usedPercentage = (usedStorage / totalStorage) * 100;
    
    const sortedAndFilteredItems = useMemo(() => {
        return [...filesAndFolders]
            .filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
            .sort((a, b) => {
                const aValue = a[sort.key as keyof typeof a] as string;
                const bValue = b[sort.key as keyof typeof b] as string;

                if (sort.key === 'size') {
                    const sizeA = a.type === 'folder' ? -1 : parseFloat(a.size) * 1024;
                    const sizeB = b.type === 'folder' ? -1 : parseFloat(b.size) * 1024;
                     if (sizeA < sizeB) return sort.order === 'asc' ? -1 : 1;
                    if (sizeA > sizeB) return sort.order === 'asc' ? 1 : -1;
                    return 0;
                }

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

    const handleCreateFolder = () => {
        const folderName = newFolderNameRef.current?.value;
        if (folderName?.trim()) {
            const newFolder: Folder = {
                id: `folder-${Date.now()}`,
                name: folderName.trim(),
                type: 'folder',
                lastModified: new Date().toISOString(),
                size: '--',
                sharedWith: []
            };
            setFilesAndFolders(prev => [newFolder, ...prev]);
            toast({ title: 'Pasta Criada', description: `A pasta "${folderName}" foi criada.` });
            setIsNewFolderOpen(false);
        } else {
             toast({ title: 'Nome inválido', description: 'Por favor, insira um nome para a pasta.', variant: 'destructive' });
        }
    };

    const handleUploadClick = () => {
        uploadInputRef.current?.click();
    }
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            toast({ title: 'Upload Iniciado', description: `A carregar o ficheiro "${file.name}".`});
            // Simulate upload
            setTimeout(() => {
                 toast({ title: 'Upload Concluído', description: `"${file.name}" foi carregado.`});
            }, 2000);
        }
    };
    
    const handleDelete = (itemId: string, itemName: string) => {
        setFilesAndFolders(prev => prev.filter(item => item.id !== itemId));
        toast({ title: 'Item Apagado', description: `"${itemName}" foi movido para o lixo.`, variant: 'destructive'});
    }

    const handleAction = (action: string, itemName: string) => {
        toast({ title: `${action} iniciado`, description: `A ${action.toLowerCase()} "${itemName}".`});
    }

    return (
        <div className="p-6 fade-in">
             <input type="file" ref={uploadInputRef} onChange={handleFileChange} className="hidden" />
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-foreground">Minha Nuvem</h1>
                <div className="flex gap-2">
                    <Dialog open={isNewFolderOpen} onOpenChange={setIsNewFolderOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="bg-card/80">
                                <FolderPlus className="mr-2 h-4 w-4" /> Nova Pasta
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>Criar Nova Pasta</DialogTitle>
                            <DialogDescription>
                                Dê um nome à sua nova pasta.
                            </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                    Nome
                                    </Label>
                                    <Input id="name" ref={newFolderNameRef} className="col-span-3 bg-card" placeholder="Ex: Relatórios Trimestrais" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleCreateFolder} className="btn-primary-gradient">Criar Pasta</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button className="btn-primary-gradient" onClick={handleUploadClick}>
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
                                        <Button variant="ghost" size="icon" onClick={() => handleAction('Partilhar', item.name)}><Share2 className="w-4 h-4 text-primary/80" /></Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleAction('Download', item.name)}><Download className="w-4 h-4 text-primary/80" /></Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-red-400/80" /></Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta ação não pode ser desfeita. O ficheiro será apagado permanentemente.
                                                </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(item.id, item.name)} className="bg-destructive hover:bg-destructive/90">Apagar</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
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
