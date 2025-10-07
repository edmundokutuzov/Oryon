
'use client';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bold, Italic, Underline, List, ListOrdered } from "lucide-react";

export default function DocumentEditorPage() {

    const handleCommand = (command: string) => {
        document.execCommand(command, false);
    };

    return (
        <div className="p-6 fade-in">
            <h1 className="text-3xl font-bold text-white mb-8">Editor de Documentos</h1>
            <Card className="gradient-surface border-0 rounded-2xl overflow-hidden">
                <div className="p-2 flex items-center space-x-1 border-b border-white/10 bg-slate-900/50">
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('bold')}><Bold className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('italic')}><Italic className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('underline')}><Underline className="w-4 h-4" /></Button>
                    <div className="h-6 w-px bg-white/20 mx-2"></div>
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('insertUnorderedList')}><List className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('insertOrderedList')}><ListOrdered className="w-4 h-4" /></Button>
                    <div className="flex-grow"></div>
                    <Button className="btn-primary-gradient px-4 py-1 text-sm font-semibold rounded-lg h-auto">Salvar Documento</Button>
                </div>
                <div 
                    id="editable-doc" 
                    contentEditable="true" 
                    className="p-6 text-white/90 bg-transparent min-h-[500px] focus:outline-none"
                    suppressContentEditableWarning={true}
                >
                    <h2>Título do Documento</h2>
                    <p>Comece a escrever o seu documento aqui...</p>
                </div>
            </Card>
        </div>
    );
}
