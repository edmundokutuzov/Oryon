
'use client';
import { useState } from 'react';
import { Menu, Search, Bot, Bell, Video, Plus, User, Key, CheckCircle, FilePlus, FolderPlus, Trash2 } from 'lucide-react';
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
import StartCallDialog from '../start-call-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';

const getBreadcrumb = (pathname: string) => {
  const pathParts = pathname.split('/').filter(p => p);
  if (pathParts.length < 2) return 'Dashboard';
  
  const pageId = pathParts.slice(1).join('/');

  for (const section of menuItems) {
    const item = section.items.find(i => i.id === pageId);
    if (item) return item.title;
  }

  // Handle dynamic routes like /call/[userId]
  if (pathParts[1] === 'call' && pathParts.length > 2) return 'Chamada';


  return 'Dashboard';
}

const notifications = [
    { id: 1, type: 'task', content: 'Você atualizou a tarefa "Criar campanha..." para "Em Progresso".', time: 'há 2 horas', icon: <CheckCircle className="w-4 h-4 text-blue-400"/>, read: false, category: 'tasks'},
    { id: 2, type: 'security', content: 'Sessão iniciada a partir de um novo dispositivo.', time: 'há 1 dia', icon: <Key className="w-4 h-4 text-green-400"/>, read: false, category: 'security' },
    { id: 3, type: 'mention', content: 'Você foi mencionado por Maria Silva no canal de Marketing.', time: 'há 3 dias', icon: <User className="w-4 h-4 text-purple-400"/>, read: true, category: 'mentions' },
];

export default function Header() {
  const pathname = usePathname();
  const breadcrumb = getBreadcrumb(pathname);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isStartCallOpen, setIsStartCallOpen] = useState(false);
  
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
                  {notifications.filter(n => !n.read).length > 0 &&
                    <span className="absolute -top-1 -right-1 flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-xs items-center justify-center">{notifications.filter(n => !n.read).length}</span>
                    </span>
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96 p-0" align="end">
                 <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="all">Todas</TabsTrigger>
                        <TabsTrigger value="unread">Não Lidas</TabsTrigger>
                        <TabsTrigger value="mentions">Menções</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="p-4 max-h-96 overflow-y-auto custom-scrollbar">
                        {notifications.map(n => <NotificationItem key={n.id} notification={n} />)}
                    </TabsContent>
                    <TabsContent value="unread" className="p-4 max-h-96 overflow-y-auto custom-scrollbar">
                        {notifications.filter(n => !n.read).map(n => <NotificationItem key={n.id} notification={n} />)}
                         {notifications.filter(n => !n.read).length === 0 && <p className="text-center text-sm text-muted-foreground py-8">Nenhuma notificação por ler.</p>}
                    </TabsContent>
                    <TabsContent value="mentions" className="p-4 max-h-96 overflow-y-auto custom-scrollbar">
                       {notifications.filter(n => n.category === 'mentions').map(n => <NotificationItem key={n.id} notification={n} />)}
                       {notifications.filter(n => n.category === 'mentions').length === 0 && <p className="text-center text-sm text-muted-foreground py-8">Nenhuma menção encontrada.</p>}
                    </TabsContent>
                </Tabs>
              </PopoverContent>
            </Popover>

            <Button size="icon" className="rounded-full btn-primary-gradient shadow-lg hover:shadow-xl" title="Iniciar Chamada" onClick={() => setIsStartCallOpen(true)}>
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
      <StartCallDialog isOpen={isStartCallOpen} onOpenChange={setIsStartCallOpen} />
    </>
  );
}

const NotificationItem = ({ notification }: { notification: (typeof notifications)[0] }) => {
    return (
        <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 relative">
            {!notification.read && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full"></span>}
            <div className="p-2 bg-card rounded-full">{notification.icon}</div>
            <div className="flex-grow">
                <p className="text-sm text-foreground/90">{notification.content}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7"><CheckCircle className="w-4 h-4 text-green-500" title="Marcar como lida" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7"><Trash2 className="w-4 h-4 text-red-500" title="Apagar"/></Button>
            </div>
        </div>
    );
};
