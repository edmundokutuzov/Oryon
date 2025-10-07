'use client';
import { useState } from 'react';
import { Menu, Search, Bot, Bell, Video, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { menuItems } from '@/lib/data';
import AiAssistant from '@/components/ai-assistant';
import Link from 'next/link';

const getBreadcrumb = (pathname: string) => {
  const pathParts = pathname.split('/').filter(p => p);
  if (pathParts.length < 2) return 'Dashboard';
  
  const pageId = pathParts.slice(1).join('/');

  for (const section of menuItems) {
    const item = section.items.find(i => i.id === pageId);
    if (item) return item.title;
  }

  return 'Dashboard';
}

export default function Header() {
  const pathname = usePathname();
  const breadcrumb = getBreadcrumb(pathname);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  return (
    <>
      <header className="flex-shrink-0 p-4 gradient-surface z-10 rounded-bl-2xl flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
          <div className="text-lg font-light text-white/70">
            <Link href="/dashboard" className="text-white transition-colors hover:text-primary">Dashboard</Link>
            {breadcrumb !== 'Dashboard' && (
              <>
                <span className="mx-2">/</span>
                <span className="text-white font-medium">{breadcrumb}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
            <Input
              type="text"
              placeholder="Pesquisar no Oryon..."
              className="pl-10 pr-4 py-2 w-64 h-auto bg-white/10 border-white/20 rounded-xl focus:outline-none focus:border-primary text-white placeholder-white/50"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 hover:text-yellow-300" title="OryonAI" onClick={() => setIsAiAssistantOpen(true)}>
              <Bot />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-white/10 text-white hover:bg-white/20 relative" title="Notificações">
              <Bell />
              <span className="absolute -top-1 -right-1 flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-xs items-center justify-center">5</span>
              </span>
            </Button>
            <Button size="icon" className="rounded-full btn-primary-gradient shadow-lg hover:shadow-xl" title="Reunião Rápida">
              <Video />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-white/10 text-white hover:bg-white/20" title="Criar Novo">
              <Plus />
            </Button>
          </div>
        </div>
      </header>
      <AiAssistant isOpen={isAiAssistantOpen} onOpenChange={setIsAiAssistantOpen} />
    </>
  );
}
