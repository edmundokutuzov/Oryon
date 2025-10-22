
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TxunaLogo from '@/components/icons/txuna-logo';
import { Bot, Calendar, MessageCircle, CheckCircle, ShieldCheck, Play } from 'lucide-react';

/**
 * Página Inicial - Oryon for Txuna Bet
 * Substituir src/app/page.tsx por este ficheiro.
 *
 * Pré-requisitos:
 * - globals.css com as variáveis de cor já definidas (fornecido).
 * - Tailwind configurado; Inter importado no layout.
 * - Componente TxunaLogo em src/components/icons/txuna-logo.tsx
 *
 * Comportamento:
 * - CTA "Entrar" -> /login
 * - CTA "Ver Demo" -> abre modal com preview (iframe para /demo)
 * - Formulario "Contactar" envia POST para /api/leads (implementar endpoint server)
 */

export default function HomePage() {
  const router = useRouter();
  const [demoOpen, setDemoOpen] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadMsg, setLeadMsg] = useState('');
  const [sendingLead, setSendingLead] = useState(false);
  const [leadSent, setLeadSent] = useState(false);

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!leadName || !leadEmail) return;
    setSendingLead(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: leadName, email: leadEmail, message: leadMsg, source: 'homepage-txuna' })
      });
      setLeadSent(true);
      setLeadName('');
      setLeadEmail('');
      setLeadMsg('');
      setTimeout(() => setLeadSent(false), 4500);
    } catch (err) {
      console.error('lead err', err);
      alert('Ocorreu um erro ao enviar. Tente novamente.');
    } finally {
      setSendingLead(false);
    }
  }

  return (
    <main className="min-h-screen w-full font-body bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <header className="max-w-[1200px] mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <TxunaLogo />
          <div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">Oryon · For</div>
            <div className="text-xs text-[hsl(var(--muted-foreground))]">Txuna Bet — Plataforma interna</div>
          </div>
        </div>

        <nav className="flex items-center gap-3">
          <Link href="/docs" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Documentação</Link>
          <Link href="/support" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Suporte</Link>
          <button
            onClick={() => router.push('/login')}
            className="ml-3 rounded-full px-4 py-2 font-semibold text-sm shadow-sm"
            style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
            aria-label="Entrar na plataforma"
          >
            Entrar
          </button>
        </nav>
      </header>

      {/* HERO */}
      <section className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12">
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-headline leading-tight tracking-tight">
            Oryon para <span className="inline-block bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-2 py-0.5 rounded">Txuna Bet</span>
          </h1>
          <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-xl">
            A plataforma central da Txuna Bet — comunicação interna, gestão de tarefas, processamento de operações e um cérebro IA para acelerar decisões e reduzir fraude. Tudo num só lugar, pensado para a tua equipa.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push('/login')}
              className="rounded-full px-5 py-3 font-semibold text-sm inline-flex items-center gap-2"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
            >
              Entrar na Txuna
            </button>

            <button
              onClick={() => setDemoOpen(true)}
              className="rounded-full px-5 py-3 border border-[hsl(var(--border))] text-sm inline-flex items-center gap-2 hover:opacity-95"
              aria-haspopup="dialog"
            >
              <Play className="h-4 w-4" /> Ver Demo
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <FeatureBadge icon={<MessageCircle className="h-4 w-4" />} title="Chat & Teams" desc="Canais, DMs e chamadas internas" />
            <FeatureBadge icon={<Calendar className="h-4 w-4" />} title="Calendário" desc="Horários, feriados Moz e sincronização" />
            <FeatureBadge icon={<ShieldCheck className="h-4 w-4" />} title="Segurança" desc="2FA, roles e audit trail" />
            <FeatureBadge icon={<CheckCircle className="h-4 w-4" />} title="Workflows" desc="Automations & SLA" />
          </div>
        </div>

        {/* Hero visual / mock dashboard preview */}
        <div className="relative p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-xl">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">Visão rápida</div>
              <div className="text-lg font-semibold">Dashboard · Operações</div>
            </div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">Atualizado há 2m</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SmallCard title="Apostas Ativas" value="1,254" subtitle="+34 vs ontem" />
            <SmallCard title="Incidentes (24h)" value="3" subtitle="2 em resolução" tone="warn" />
            <SmallCard title="Sinistros Processados" value="124" subtitle="Média 2.7h" />
            <SmallCard title="Tarefas Pendentes" value="42" subtitle="Prioridade: 7" tone="accent" />
          </div>

          <div className="mt-6">
            <div className="text-sm text-[hsl(var(--muted-foreground))] mb-2">Próximas reuniões</div>
            <div className="flex flex-col gap-2">
              <MiniEvent time="09:00" title="Standup Ops" body="Daily — Equipa Ops" />
              <MiniEvent time="11:30" title="Reunião com Marketing" body="Campanha nova" />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / BENEFÍCIOS */}
      <section className="bg-[rgba(255,255,255,0.02)] py-10">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TrustCard title="Tudo integrado" desc="Do front-desk ao back-office: clientes, apólices internas, pagamentos e conciliação juntos." />
          <TrustCard title="Fraude reduzida" desc="IA de detecção de padrões suspeitos e triagem automática de incidentes." />
          <TrustCard title="Escalável" desc="Arquitetura serverless com Firestore, Cloud Functions e feature flags." />
        </div>
      </section>

      {/* CONTACT / LEAD */}
      <section className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold">Queres que a Txuna experimente?</h3>
            <p className="text-[hsl(var(--muted-foreground))] mt-2 max-w-md">
              Deixa o teu contacto e a nossa equipa técnica vai agendar uma demo personalizada com dados da Txuna Bet.
            </p>
            <form className="mt-6 space-y-3 max-w-md" onSubmit={handleLeadSubmit}>
              <input
                className="w-full p-3 rounded-lg bg-[transparent] border border-[hsl(var(--border))] placeholder:text-[hsl(var(--muted-foreground))]"
                placeholder="Nome completo"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                required
              />
              <input
                type="email"
                className="w-full p-3 rounded-lg bg-[transparent] border border-[hsl(var(--border))] placeholder:text-[hsl(var(--muted-foreground))]"
                placeholder="Email corporativo"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                required
              />
              <textarea
                className="w-full p-3 rounded-lg bg-[transparent] border border-[hsl(var(--border))] placeholder:text-[hsl(var(--muted-foreground))]"
                placeholder="Mensagem (opcional)"
                rows={3}
                value={leadMsg}
                onChange={(e) => setLeadMsg(e.target.value)}
              />
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="rounded-full px-4 py-2 font-semibold"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
                  disabled={sendingLead}
                >
                  {sendingLead ? 'Enviando...' : (leadSent ? 'Enviado ✓' : 'Pedir Demo')}
                </button>
                <a className="text-sm text-[hsl(var(--muted-foreground))]" href="/privacy">Política de privacidade</a>
              </div>
            </form>
          </div>

          <div className="rounded-xl p-6 border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
            <h4 className="font-semibold">Demo: O que verás</h4>
            <ul className="mt-4 space-y-3 text-[hsl(var(--muted-foreground))]">
              <li>• Painel operacional: apostas, balanço e flags de risco</li>
              <li>• Gestão de incidentes com SLA e automações</li>
              <li>• Chat departamental, DMs, e integração com Calls</li>
              <li>• Editor de documentos e modelos de resposta</li>
            </ul>

            <div className="mt-6">
              <h5 className="text-sm text-[hsl(var(--muted-foreground))]">Pronto para começar?</h5>
              <div className="mt-3 flex gap-3">
                <button onClick={() => router.push('/signup')} className="px-3 py-2 rounded-full border border-[hsl(var(--border))]">Criar conta</button>
                <button onClick={() => setDemoOpen(true)} className="px-3 py-2 rounded-full" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>Ver Demo</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[transparent] border-t border-[hsl(var(--border))] py-6 mt-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <TxunaLogo className="w-36 h-12" />
            <span className="text-sm text-[hsl(var(--muted-foreground))]">© Txuna Bet · Oryon Platform</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/terms">Termos</Link>
            <Link href="/privacy">Privacidade</Link>
            <Link href="/contact">Contacto</Link>
          </div>
        </div>
      </footer>

      {/* DEMO MODAL */}
      {demoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDemoOpen(false)} />
          <div className="relative w-full max-w-5xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-2xl overflow-hidden">
            <div className="p-3 flex items-center justify-between border-b border-[hsl(var(--border))]">
              <div className="flex items-center gap-3">
                <TxunaLogo className="w-36 h-10" />
                <div className="text-sm text-[hsl(var(--muted-foreground))]">Demo Interactiva • Txuna</div>
              </div>
              <button onClick={() => setDemoOpen(false)} aria-label="Fechar demo" className="px-3 py-1 rounded bg-[transparent] border border-[hsl(var(--border))]">Fechar</button>
            </div>

            <div className="h-[600px]">
              {/* Iframe para demo real (substituir URL por /demo) */}
              <iframe src="/demo" title="Demo Oryon Txuna" className="w-full h-full border-0 bg-white/5" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ------------------- Helper components ------------------ */

function FeatureBadge({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string; }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-[hsl(var(--border))] bg-[transparent]">
      <div className="p-2 rounded-md bg-[rgba(255,255,255,0.02)]">{icon}</div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-xs text-[hsl(var(--muted-foreground))]">{desc}</div>
      </div>
    </div>
  );
}

function SmallCard({ title, value, subtitle, tone = 'neutral' }: { title: string; value: string; subtitle?: string; tone?: 'warn'|'accent'|'neutral' }) {
  const toneColor = tone === 'warn' ? 'text-[hsl(var(--destructive))]' : tone === 'accent' ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--foreground))]';
  return (
    <div className="p-3 rounded-lg border border-[hsl(var(--border))] bg-[transparent]">
      <div className={`text-xs ${toneColor}`}>{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {subtitle && <div className="text-[hsl(var(--muted-foreground))] text-xs mt-1">{subtitle}</div>}
    </div>
  );
}

function MiniEvent({ time, title, body }: { time: string; title: string; body: string }) {
  return (
    <div className="flex items-start gap-3 p-2 rounded-md hover:bg-[rgba(255,255,255,0.01)]">
      <div className="w-12 text-xs text-[hsl(var(--muted-foreground))]">{time}</div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-[hsl(var(--muted-foreground))] text-xs">{body}</div>
      </div>
    </div>
  );
}

function TrustCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 rounded-xl border border-[hsl(var(--border))] bg-[transparent]">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-[hsl(var(--muted-foreground))]">{desc}</div>
    </div>
  );
}
