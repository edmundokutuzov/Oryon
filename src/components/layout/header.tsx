'use client';
import { useState } from 'react';
import { Menu, Search, Bot, Bell, Video, Plus, User, Key, CheckCircle, FilePlus, FolderPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { menuItems } from '@/lib/data';
import AiAssistant from '@/components/ai-assistant';
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

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

const notifications = [
    { id: 1, type: 'task', content: 'Você atualizou a tarefa "Criar campanha..." para "Em Progresso".', time: 'há 2 horas', icon: <CheckCircle className="w-4 h-4 text-blue-400"/> },
    { id: 2, type: 'security', content: 'Sessão iniciada a partir de um novo dispositivo.', time: 'há 1 dia', icon: <Key className="w-4 h-4 text-green-400"/> },
    { id: 3, type: 'mention', content: 'Você foi mencionado por Maria Silva no canal de Marketing.', time: 'há 3 dias', icon: <User className="w-4 h-4 text-purple-400"/> },
];

export default function Header() {
  const pathname = usePathname();
  const breadcrumb = getBreadcrumb(pathname);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const { toast } = useToast();
  
  const handleQuickMeeting = () => {
    toast({
      title: "Reunião Rápida Iniciada",
      description: "O convite para a sua reunião foi enviado.",
    });
  };

  return (
    <>
      <header className="flex-shrink-0 p-4 gradient-surface z-10 rounded-bl-2xl flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
          <div className="text-lg font-light text-muted-foreground">
            <Link href="/dashboard" className="text-foreground transition-colors hover:text-primary">Dashboard</Link>
            {breadcrumb !== 'Dashboard' && (
              <>
                <span className="mx-2">/</span>
                <span className="text-foreground font-medium">{breadcrumb}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Pesquisar no Oryon..."
              className="pl-10 pr-4 py-2 w-64 h-auto bg-card border-border rounded-xl focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 hover:text-yellow-300" title="OryonAI" onClick={() => setIsAiAssistantOpen(true)}>
              <Bot />
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full bg-card/10 text-foreground hover:bg-card/20 relative" title="Notificações">
                  <Bell />
                  <span className="absolute -top-1 -right-1 flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-xs items-center justify-center">3</span>
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="p-4">
                  <h3 className="text-lg font-medium text-foreground">Notificações</h3>
                </div>
                <div className="space-y-2">
                  {notifications.map(notification => (
                    <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50">
                       <div className="p-2 bg-card rounded-full">{notification.icon}</div>
                       <div>
                         <p className="text-sm text-foreground/90">{notification.content}</p>
                         <p className="text-xs text-muted-foreground">{notification.time}</p>
                       </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-border mt-2 text-center">
                    <Link href="#" className="text-sm text-primary hover:underline">Ver todas as notificações</Link>
                </div>
              </PopoverContent>
            </Popover>

            <Button size="icon" className="rounded-full btn-primary-gradient shadow-lg hover:shadow-xl" title="Reunião Rápida" onClick={handleQuickMeeting}>
              <Video />
            </Button>

             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full bg-card/10 text-foreground hover:bg-card/20" title="Criar Novo">
                  <Plus />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/tasks">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span>Nova Tarefa</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/projects">
                    <FolderPlus className="mr-2 h-4 w-4" />
                    <span>Novo Projeto</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/document-editor">
                    <FilePlus className="mr-2 h-4 w-4" />
                    <span>Novo Documento</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
      </header>
      <AiAssistant isOpen={isAiAssistantOpen} onOpenChange={setIsAiAssistantOpen} />
    </>
  );
}
