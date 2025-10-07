
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cloudFiles, users } from '@/lib/data';
import { Download, File, FileArchive, FileText, FileVideo, Folder, MoreVertical, Share2, Trash2, UploadCloud } from 'lucide-react';

const fileIcons: { [key: string]: React.ReactNode } = {
    pdf: <FileText className="w-5 h-5 text-red-400" />,
    docx: <FileText className="w-5 h-5 text-blue-400" />,
    powerpoint: <FileVideo className="w-5 h-5 text-orange-400" />,
    excel: <FileText className="w-5 h-5 text-green-400" />,
    zip: <FileArchive className="w-5 h-5 text-yellow-400" />,
    figma: <File className="w-5 h-5 text-purple-400" />,
    word: <FileText className="w-5 h-5 text-blue-500" />,
    default: <File className="w-5 h-5" />,
}

export default function CloudPage() {
    const totalStorage = 20; // GB
    const usedStorage = cloudFiles.reduce((acc, file) => acc + parseFloat(file.size), 0) / 1024;
    const usedPercentage = (usedStorage / totalStorage) * 100;

    return (
        <div className="p-6 fade-in">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-foreground">Minha Nuvem</h1>
                <Button className="btn-primary-gradient">
                    <UploadCloud className="mr-2 h-4 w-4" /> Upload
                </Button>
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
                    <CardTitle>Meus Ficheiros</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b-border hover:bg-transparent">
                                <TableHead>Nome</TableHead>
                                <TableHead>Tamanho</TableHead>
                                <TableHead>Última Modificação</TableHead>
                                <TableHead>Partilhado com</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cloudFiles.map(file => (
                                <TableRow key={file.id} className="border-b-border/50 hover:bg-muted/50">
                                    <TableCell className="font-medium text-foreground flex items-center gap-3">
                                        {fileIcons[file.type] || fileIcons.default}
                                        {file.name}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{file.size}</TableCell>
                                    <TableCell className="text-muted-foreground">{new Date(file.lastModified).toLocaleDateString('pt-PT')}</TableCell>
                                    <TableCell>
                                        <div className="flex -space-x-2">
                                            {file.sharedWith.map(userId => {
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
