'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { File as FileIcon, FileText, Folder, MoreVertical, Plus, Search, UploadCloud, FileSpreadsheet, FileVideo, Globe, HardDrive, Trash2, Download, Share2, Loader2, ArrowUpDown } from 'lucide-react';
import { useState, useMemo, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, serverTimestamp, doc, query, where } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

const fileTypeIcons: { [key: string]: React.ReactNode } = {
  'doc': <FileText className="w-5 h-5 text-blue-400" />,
  'sheet': <FileSpreadsheet className="w-5 h-5 text-green-400" />,
  'ppt': <FileVideo className="w-5 h-5 text-orange-400" />,
  'board': <FileIcon className="w-5 h-5 text-purple-400" />,
  'pdf': <FileText className="w-5 h-5 text-red-400" />,
  'image': <FileIcon className="w-5 h-5 text-pink-400" />,
  'folder': <Folder className="w-5 h-5 text-yellow-500" />,
  'default': <FileIcon className="w-5 h-5" />,
};

const getFileIcon = (fileType: string) => {
    if (fileType === 'folder') return fileTypeIcons.folder;
    const match = Object.keys(fileTypeIcons).find(key => fileType.startsWith(key));
    return match ? fileTypeIcons[match] : fileTypeIcons.default;
}

type File = {
  id: string;
  title: string;
  type: string;
  size: number;
  url: string;
  owner: string;
  members: string[];
  createdAt: any;
  updatedAt: any;
};

type Folder = { id: string, name: string, type: 'folder', updatedAt: string, size: string, owner: string };

export default function DocumentsPage() {
    const { toast } = useToast();
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    const userFilesQuery = useMemoFirebase(() => {
        if (!firestore || !user?.uid) return null;
        return query(
            collection(firestore, 'docs'),
            where('members', 'array-contains', user.uid)
        );
    }, [firestore, user?.uid]);
    
    const { data: files, isLoading: areFilesLoading } = useCollection<File>(userFilesQuery);

    const [folders, setFolders] = useState<Folder[]>([]);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState({ key: 'title', order: 'asc' });
    const uploadInputRef = useRef<HTMLInputElement>(null);

    const filesAndFolders = useMemo(() => {
        const fileItems = files ? files.map(f => ({ ...f, name: f.title, size: (f.size / (1024*1024)).toFixed(2) + ' MB' })) : [];
        return [...fileItems, ...folders];
    }, [files, folders]);

    const sortedAndFilteredItems = useMemo(() => {
    return [...filesAndFolders]
        .filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => {
            const aValue = a[sort.key as keyof typeof a] as any;
            const bValue = b[sort.key as keyof typeof b] as any;

            if (sort.key === 'size') {
                const sizeA = a.type === 'folder' ? -1 : parseFloat(a.size);
                const sizeB = b.type === 'folder' ? -1 : parseFloat(b.size);
                 if (sizeA < sizeB) return sort.order === 'asc' ? -1 : 1;
                if (sizeA > sizeB) return sort.order === 'asc' ? 1 : -1;
                return 0;
            }
            
            if (sort.key === 'updatedAt' || sort.key === 'createdAt') {
              const getTimestamp = (item: any) => {
                  const value = item[sort.key as keyof typeof item];
                  if (!value) return 0;

                  if (typeof value.toDate === 'function') { // Firebase Timestamp
                      return value.toDate().getTime();
                  }
                  if (typeof value === 'string') { // ISO string
                      const date = new Date(value);
                      return isNaN(date.getTime()) ? 0 : date.getTime();
                  }
                  return 0;
              };

              const dateA = getTimestamp(a);
              const dateB = getTimestamp(b);
              
              if (dateA < dateB) return sort.order === 'asc' ? -1 : 1;
              if (dateA > dateB) return sort.order === 'asc' ? 1 : -1;
              return 0;
            }
            
            // Generic string/number comparison for other fields like 'title' or 'owner'
            const valA = a[sort.key as keyof typeof a] ?? '';
            const valB = b[sort.key as keyof typeof b] ?? '';

            if (valA < valB) return sort.order === 'asc' ? -1 : 1;
            if (valA > valB) return sort.order === 'asc' ? 1 : -1;
            return 0;
        });
}, [filesAndFolders, filter, sort]);

    const handleSort = (key: string) => {
        setSort(prev => ({
            key,
            order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc'
        }));
    };
    
    const handleUploadClick = () => uploadInputRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0 || !user?.uid || !firestore) return;
        
        const file = e.target.files[0];
        const storage = getStorage();
        const filePath = `docs/${user.uid}/${Date.now()}_${file.name}`;
        const fileStorageRef = storageRef(storage, filePath);
        const uploadTask = uploadBytesResumable(fileStorageRef, file);

        toast({ title: 'Upload Iniciado', description: `A carregar o ficheiro "${file.name}".`});

        uploadTask.on('state_changed', 
            (snapshot) => { /* can be used for progress bar */ }, 
            (error) => {
                console.error("Upload error:", error);
                toast({ title: 'Erro no Upload', description: `Não foi possível carregar "${file.name}".`, variant: 'destructive'});
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const fileDocRef = doc(collection(firestore, 'docs'));
                    const newFile: Omit<File, 'id' | 'url'> = {
                        title: file.name,
                        type: file.type,
                        size: file.size,
                        owner: user.uid,
                        members: [user.uid],
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp()
                    };
                    setDocumentNonBlocking(fileDocRef, { ...newFile, url: downloadURL }, {});
                    toast({ title: 'Upload Concluído', description: `"${file.name}" foi carregado com sucesso.`});
                });
            }
        );
        e.target.value = '';
    };

    const handleDelete = (itemId: string) => {
        if (!user?.uid || !firestore) return;
        const docRef = doc(firestore, 'docs', itemId);
        deleteDocumentNonBlocking(docRef);
        toast({ title: 'Item Apagado', description: `O ficheiro foi movido para o lixo.`, variant: 'destructive'});
    };

    const QuickActionCard = ({ icon: Icon, title, description, href, onClick, comingSoon }: { icon: React.ElementType, title: string, description: string, href?: string, onClick?: () => void, comingSoon?: boolean }) => {
        const { toast } = useToast();
        const content = (
             <Card className="gradient-surface border-0 rounded-2xl text-left h-full hover:bg-muted/50 transition-colors">
                <CardContent className="p-4 flex flex-col justify-between h-full">
                    <div>
                        <div className="p-2 bg-primary/20 text-primary rounded-lg w-fit mb-4"><Icon className="w-5 h-5"/></div>
                        <h3 className="font-semibold text-foreground">{title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{description}</p>
                    </div>
                     {comingSoon && <Badge variant="outline" className="mt-4 w-fit">Em Breve</Badge>}
                </CardContent>
            </Card>
        );

        const handleClick = () => {
            if (comingSoon) {
                toast({ title: "Funcionalidade em desenvolvimento", description: `${title} estará disponível em breve.` });
            } else if (onClick) {
                onClick();
            }
        };

        if (href && !comingSoon) {
            return <Link href={href}>{content}</Link>;
        }
        return <button onClick={handleClick} className="w-full h-full disabled:opacity-50" disabled={comingSoon}>{content}</button>;
    };

    return (
        <div className="p-6 fade-in">
             <input type="file" ref={uploadInputRef} onChange={handleFileChange} className="hidden" />
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-foreground">Documentos</h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Pesquisar documentos..." className="w-64 bg-card border-border pl-10 h-10" value={filter} onChange={e => setFilter(e.target.value)} />
                    </div>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="btn-primary-gradient">
                                <Plus className="mr-2 h-4 w-4" /> Novo
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                             <DropdownMenuItem asChild>
                                <Link href="/dashboard/document-editor"><FileText className="mr-2 h-4 w-4" />Documento</Link>
                             </DropdownMenuItem>
                             <DropdownMenuItem onSelect={() => toast({title: "Em breve!"})}>
                                <FileSpreadsheet className="mr-2 h-4 w-4" />Planilha
                            </DropdownMenuItem>
                             <DropdownMenuItem onSelect={() => toast({title: "Em breve!"})}>
                                <FileVideo className="mr-2 h-4 w-4" />Apresentação
                            </DropdownMenuItem>
                             <DropdownMenuSeparator />
                             <DropdownMenuItem onSelect={handleUploadClick}>
                                <UploadCloud className="mr-2 h-4 w-4" />Carregar Ficheiro
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <QuickActionCard icon={FileText} title="Documento" description="Crie um novo documento de texto." href="/dashboard/document-editor" />
                <QuickActionCard icon={FileSpreadsheet} title="Planilha" description="Crie uma nova planilha." comingSoon />
                <QuickActionCard icon={FileVideo} title="Apresentação" description="Crie uma nova apresentação." comingSoon />
                <QuickActionCard icon={HardDrive} title="Do meu computador" description="Carregue ficheiros do seu dispositivo." onClick={handleUploadClick} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <QuickActionCard icon={Globe} title="Do Google Drive" description="Importe do Google Drive." comingSoon />
                <QuickActionCard icon={HardDrive} title="Do Dropbox" description="Importe do Dropbox." comingSoon />
            </div>

            <Card className="gradient-surface border-0 rounded-2xl">
                <CardContent className="p-4">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b-border hover:bg-transparent">
                                <TableHead onClick={() => handleSort('title')} className="cursor-pointer"><span className="flex items-center gap-2">Nome <ArrowUpDown className="w-4 h-4"/></span></TableHead>
                                <TableHead onClick={() => handleSort('owner')} className="cursor-pointer"><span className="flex items-center gap-2">Proprietário <ArrowUpDown className="w-4 h-4"/></span></TableHead>
                                <TableHead onClick={() => handleSort('updatedAt')} className="cursor-pointer"><span className="flex items-center gap-2">Última Modificação <ArrowUpDown className="w-4 h-4"/></span></TableHead>
                                <TableHead onClick={() => handleSort('size')} className="cursor-pointer"><span className="flex items-center gap-2">Tamanho <ArrowUpDown className="w-4 h-4"/></span></TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {(isUserLoading || areFilesLoading) && (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                                    </TableCell>
                                </TableRow>
                            )}
                            {!isUserLoading && !areFilesLoading && sortedAndFilteredItems.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-48 text-center">
                                        <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                        <h3 className="mt-4 text-lg font-semibold text-foreground">Sem documentos ainda</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">Comece por criar um novo documento ou carregar um ficheiro.</p>
                                    </TableCell>
                                </TableRow>
                            )}
                            {!isUserLoading && !areFilesLoading && sortedAndFilteredItems.map(item => (
                                <TableRow key={item.id} className="border-b-border/50 hover:bg-muted/50">
                                    <TableCell className="font-medium text-foreground flex items-center gap-3">
                                        {getFileIcon(item.type)}
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{item.owner === user?.uid ? "Eu" : "Outro"}</TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {item.type !== 'folder' && (item as File).updatedAt?.toDate ? (item as File).updatedAt.toDate().toLocaleDateString('pt-PT') : (item as Folder).updatedAt ? new Date((item as Folder).updatedAt).toLocaleDateString('pt-PT') : '-'}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{item.size}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => toast({title: "Funcionalidade em breve"})}><Share2 className="w-4 h-4 text-primary/80" /></Button>
                                        <a href={item.type !== 'folder' ? (item as File).url : '#'} download={item.name} target="_blank" rel="noopener noreferrer">
                                            <Button variant="ghost" size="icon" disabled={item.type === 'folder'}><Download className="w-4 h-4 text-primary/80" /></Button>
                                        </a>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}><Trash2 className="w-4 h-4 text-red-400/80" /></Button>
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
    

    