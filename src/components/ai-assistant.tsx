'use client';

import { useState } from 'react';
import { summarizePage, SummarizePageOutput } from '@/ai/flows/summarize-page';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bot, Loader2, Link as LinkIcon, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AiAssistant({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SummarizePageOutput | null>(null);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!url) {
      toast({
        title: 'URL Inválida',
        description: 'Por favor, insira uma URL para resumir.',
        variant: 'destructive'
      });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const summary = await summarizePage({ url });
      setResult(summary);
    } catch (error) {
      console.error('Error summarizing page:', error);
      toast({
        title: 'Erro ao Resumir',
        description: 'Não foi possível resumir a página. Tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="gradient-surface border-primary/50 max-w-lg p-8">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Bot className="h-8 w-8 text-yellow-300" />
            OryonAI Assistant
          </DialogTitle>
          <DialogDescription>
            Resuma o conteúdo de qualquer página da web.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/artigo-interessante"
              className="pl-10 p-3 h-auto rounded-xl bg-white/10 border-white/20 focus:border-primary placeholder-white/50"
            />
          </div>
          <Button onClick={handleSummarize} disabled={loading} className="w-full btn-primary-gradient py-3 h-auto text-base font-semibold">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                A resumir...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-5 w-5" />
                Gerar Resumo
              </>
            )}
          </Button>
        </div>
        {(loading || result) && (
          <div className="mt-4 p-4 bg-black/20 rounded-lg max-h-60 overflow-y-auto custom-scrollbar">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Resumo Gerado
            </h3>
            {loading && <p className="text-sm text-white/70 animate-pulse">A gerar o resumo da página...</p>}
            {result && <p className="text-sm text-white/90 whitespace-pre-wrap">{result.summary}</p>}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
