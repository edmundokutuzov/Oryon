'use client';

import { useState } from 'react';
import { chat, ChatMessage, ChatHistory } from '@/ai/flows/chat';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bot, Loader2, User, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AiAssistant({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ChatHistory>([]);
  const { toast } = useToast();

  const handleSendPrompt = async () => {
    if (!prompt) {
      toast({
        title: 'Prompt Vazio',
        description: 'Por favor, insira uma pergunta ou instrução.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    const userMessage: ChatMessage = { role: 'user', content: [{ text: prompt }] };
    
    // Add user message to history for immediate feedback
    setHistory(prevHistory => [...prevHistory, userMessage]);
    setPrompt('');

    try {
      const response = await chat({
        history: [...history, userMessage],
        prompt,
      });
      setHistory(response.history);
    } catch (error) {
      console.error('Error with chat flow:', error);
      toast({
        title: 'Erro de IA',
        description: 'Não foi possível obter uma resposta da IA. Tente novamente.',
        variant: 'destructive',
      });
       // remove the optimistic user message
       setHistory(prevHistory => prevHistory.slice(0, prevHistory.length - 1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="gradient-surface border-primary/50 max-w-2xl p-0 flex flex-col h-[70vh]">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <Bot className="h-8 w-8 text-yellow-300" />
            OryonAI Assistant
          </DialogTitle>
          <DialogDescription>
            Converse com a IA. Faça perguntas, peça resumos e muito mais.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto custom-scrollbar px-6 space-y-6">
          {history.length === 0 && !loading && (
            <div className="text-center text-muted-foreground pt-10">
              <Wand2 className="mx-auto h-12 w-12 text-primary/50" />
              <p className="mt-4">Comece a conversa com a OryonAI.</p>
            </div>
          )}
          {history.map((message, index) => (
            <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
               {message.role === 'model' && <Bot className="h-6 w-6 text-yellow-300 flex-shrink-0" />}
               <div className={`max-w-xl p-4 rounded-xl whitespace-pre-wrap text-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card/50'}`}>
                 {message.content.map(part => part.text).join('')}
               </div>
               {message.role === 'user' && <User className="h-6 w-6 text-foreground flex-shrink-0" />}
            </div>
          ))}
          {loading && (
             <div className="flex items-start gap-4">
                <Bot className="h-6 w-6 text-yellow-300 flex-shrink-0" />
                <div className="max-w-xl p-4 rounded-xl bg-card/50">
                    <Loader2 className="h-5 w-5 animate-spin" />
                </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border mt-auto">
          <div className="relative">
             <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !loading && handleSendPrompt()}
              placeholder="Pergunte qualquer coisa à OryonAI..."
              className="pr-20 p-3 h-auto rounded-xl bg-card/80 border-border focus:border-primary placeholder-muted-foreground"
              disabled={loading}
            />
            <Button onClick={handleSendPrompt} disabled={loading} className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary-gradient py-2 h-auto text-sm font-semibold">
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : "Enviar"}
            </Button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
