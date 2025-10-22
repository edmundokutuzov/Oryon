

import { ArrowRight, BarChart3, Calendar, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TxunaLogo from '@/components/icons/txuna-logo';
import { portalData } from '@/lib/data';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center text-white bg-background">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="aurora-bg"></div>
      </div>
      
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
      
      {/* Content */}
      <main className="relative z-20 flex flex-col items-center justify-center p-4 text-center w-full max-w-4xl mx-auto bounce-in">
        <TxunaLogo className="h-20 w-auto mb-6" />
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          O Jogo Começa Agora.
        </h1>
        <p className="text-xl md:text-2xl text-primary font-medium mb-10">
          {portalData.dailyFocus}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 justify-center"><BarChart3 className="w-4 h-4"/> Mercados em Alta Hoje</h3>
            <p className="text-lg font-bold text-foreground mt-2">{portalData.hotMarkets.join(', ')}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 justify-center"><Calendar className="w-4 h-4"/> Contagem Regressiva</h3>
            <p className="text-lg font-bold text-foreground mt-2">{portalData.countdownEvent}: <span className="text-primary">{portalData.countdownDays} Dias</span></p>
          </div>
           <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 justify-center"><Cpu className="w-4 h-4"/> Recorde da Casa (Ontem)</h3>
            <p className="text-lg font-bold text-foreground mt-2">Maior Odd Vencedora: <span className="text-primary">{portalData.recordOdd}x</span></p>
          </div>
        </div>

        <Link href="/login">
            <Button size="lg" className="btn-primary-gradient rounded-full px-12 py-7 text-lg font-bold h-auto">
                Entrar na Plataforma
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </Link>
      </main>

       {/* Footer */}
      <footer className="absolute bottom-0 left-0 w-full p-4 z-20">
        <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground">
          <Link href="#" className="hover:text-primary transition-colors">Suporte Técnico</Link>
          <Link href="#" className="hover:text-primary transition-colors">Status da Plataforma</Link>
          <Link href="#" className="hover:text-primary transition-colors">Política de Segurança</Link>
        </div>
      </footer>
    </div>
  );
}
