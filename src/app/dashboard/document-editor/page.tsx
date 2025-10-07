'use client';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Bold, Italic, Underline, List, ListOrdered, Heading1, Heading2, Heading3, TextQuote, Code, Link, Image, Pilcrow, AlignLeft, AlignCenter, AlignRight, AlignJustify, Undo, Redo, Paintbrush, Highlighter, CaseSensitive, Strikethrough, Subscript, Superscript
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function DocumentEditorPage() {
    const { toast } = useToast();

    const handleCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
    };
    
    const handleInsertLink = () => {
        const url = prompt("Insira a URL do link:");
        if (url) {
            handleCommand('createLink', url);
        }
    }
    
    const handleInsertImage = () => {
        const url = prompt("Insira a URL da imagem:");
        if (url) {
            handleCommand('insertImage', url);
        }
    }

    const handleSave = () => {
        toast({
            title: "Documento Salvo",
            description: "O seu documento foi salvo com sucesso.",
        });
    }

    return (
        <div className="p-6 fade-in">
            <h1 className="text-3xl font-bold text-white mb-8">Editor de Documentos Avançado</h1>
            <Card className="gradient-surface border-0 rounded-2xl overflow-hidden">
                <div className="p-2 flex items-center flex-wrap gap-1 border-b border-white/10 bg-slate-900/50">
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('undo')} title="Desfazer"><Undo className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('redo')} title="Refazer"><Redo className="w-4 h-4" /></Button>
                    <div className="h-6 w-px bg-white/20 mx-2"></div>
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('bold')} title="Negrito"><Bold className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('italic')} title="Itálico"><Italic className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('underline')} title="Sublinhado"><Underline className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('strikeThrough')} title="Riscado"><Strikethrough className="w-4 h-4" /></Button>
                     <Popover>
                        <PopoverTrigger asChild>
                             <Button variant="ghost" size="icon" title="Cor do Texto"><Paintbrush className="w-4 h-4" /></Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2">
                             <input type="color" onChange={(e) => handleCommand('foreColor', e.target.value)} className="w-8 h-8"/>
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger asChild>
                             <Button variant="ghost" size="icon" title="Cor de Fundo"><Highlighter className="w-4 h-4" /></Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2">
                             <input type="color" onChange={(e) => handleCommand('hiliteColor', e.target.value)} className="w-8 h-8"/>
                        </PopoverContent>
                    </Popover>
                    <div className="h-6 w-px bg-white/20 mx-2"></div>
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('formatBlock', 'h1')} title="Título 1"><Heading1 className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('formatBlock', 'h2')} title="Título 2"><Heading2 className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('formatBlock', 'h3')} title="Título 3"><Heading3 className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('formatBlock', 'p')} title="Parágrafo"><Pilcrow className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('formatBlock', 'blockquote')} title="Citação"><TextQuote className="w-4 h-4" /></Button>
                     <Button variant="ghost" size="icon" onClick={() => handleCommand('formatBlock', 'pre')} title="Bloco de Código"><Code className="w-4 h-4" /></Button>
                    <div className="h-6 w-px bg-white/20 mx-2"></div>
                     <Button variant="ghost" size="icon" onClick={() => handleCommand('justifyLeft')} title="Alinhar à Esquerda"><AlignLeft className="w-4 h-4" /></Button>
                     <Button variant="ghost" size="icon" onClick={() => handleCommand('justifyCenter')} title="Centralizar"><AlignCenter className="w-4 h-4" /></Button>
                     <Button variant="ghost" size="icon" onClick={() => handleCommand('justifyRight')} title="Alinhar à Direita"><AlignRight className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('justifyFull')} title="Justificar"><AlignJustify className="w-4 h-4" /></Button>
                    <div className="h-6 w-px bg-white/20 mx-2"></div>
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('insertUnorderedList')} title="Lista Não Ordenada"><List className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleCommand('insertOrderedList')} title="Lista Ordenada"><ListOrdered className="w-4 h-4" /></Button>
                     <Button variant="ghost" size="icon" onClick={() => handleCommand('superscript')} title="Sobrescrito"><Superscript className="w-4 h-4" /></Button>
                     <Button variant="ghost" size="icon" onClick={() => handleCommand('subscript')} title="Subscrito"><Subscript className="w-4 h-4" /></Button>
                    <div className="h-6 w-px bg-white/20 mx-2"></div>
                    <Button variant="ghost" size="icon" onClick={handleInsertLink} title="Inserir Link"><Link className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={handleInsertImage} title="Inserir Imagem"><Image className="w-4 h-4" /></Button>
                    <div className="flex-grow"></div>
                    <Button className="btn-primary-gradient px-4 py-1 text-sm font-semibold rounded-lg h-auto" onClick={handleSave}>Salvar Documento</Button>
                </div>
                <div 
                    id="editable-doc" 
                    contentEditable="true" 
                    className="p-8 text-white/90 bg-transparent min-h-[600px] focus:outline-none prose prose-invert prose-lg max-w-full"
                    suppressContentEditableWarning={true}
                >
                    <h1>Título do Documento</h1>
                    <h2>Subtítulo para iniciar</h2>
                    <p>Comece a escrever o seu documento aqui... Utilize as ferramentas acima para formatar o seu texto. Pode adicionar <b>negrito</b>, <i>itálico</i>, e <u>sublinhado</u>. Crie listas, alinhe o texto e muito mais.</p>
                    <blockquote>Este é um bloco de citação, ideal para destacar informações importantes ou citações diretas de fontes.</blockquote>
                    <ul>
                        <li>Item de lista não ordenada 1</li>
                        <li>Item de lista não ordenada 2</li>
                    </ul>
                    <ol>
                        <li>Item de lista ordenada 1</li>
                        <li>Item de lista ordenada 2</li>
                    </ol>
                    <p>Pode também inserir <a href="#" className="text-primary hover:underline">hiperligações</a> para fontes externas.</p>
                </div>
            </Card>
        </div>
    );
}
