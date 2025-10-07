
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { documents } from '@/lib/data';
import { Download, FileText, FileArchive, FileVideo } from 'lucide-react';

const fileIcons: { [key: string]: React.ReactNode } = {
    PDF: <FileText className="w-5 h-5 text-red-400" />,
    DOCX: <FileText className="w-5 h-5 text-blue-400" />,
    PPTX: <FileVideo className="w-5 h-5 text-orange-400" />,
    ZIP: <FileArchive className="w-5 h-5 text-yellow-400" />,
}

export default function DocumentsPage() {
  return (
    <div className="p-6 fade-in">
        <h1 className="text-3xl font-bold text-white mb-8">Documentos da Empresa</h1>
        <Card className="gradient-surface border-0 rounded-2xl">
            <CardContent className="p-6">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b-white/10 hover:bg-transparent">
                            <TableHead>Nome do Ficheiro</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Tamanho</TableHead>
                            <TableHead>Última Modificação</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {documents.map(doc => (
                            <TableRow key={doc.id} className="border-b-white/5 hover:bg-white/10">
                                <TableCell className="font-medium text-white flex items-center gap-3">
                                    {fileIcons[doc.type] || <FileText className="w-5 h-5" />}
                                    {doc.title}
                                </TableCell>
                                <TableCell>
                                    <span className="bg-primary/20 text-primary text-xs font-bold py-1 px-2 rounded-full">
                                        {doc.type}
                                    </span>
                                </TableCell>
                                <TableCell className="text-white/80">{doc.size}</TableCell>
                                <TableCell className="text-white/80">{new Date(doc.lastModified).toLocaleDateString('pt-PT')}</TableCell>
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
