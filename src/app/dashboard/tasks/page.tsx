'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getTasksForUser, getCurrentUser, users } from '@/lib/data';
import { Calendar, Check, Clock, File, Plus, User, Users, Paperclip, CheckSquare, ArrowUpDown, LayoutGrid, List } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';

const currentUser = getCurrentUser();
const userTasks = getTasksForUser(currentUser.id);

export default function TasksPage() {
    const { toast } = useToast();

    const handleNewTask = () => {
        toast({
            title: "Funcionalidade em desenvolvimento",
            description: "A criação de novas tarefas estará disponível em breve.",
        });
    }

    return (
        <div className="p-6 fade-in h-full flex flex-col">
            <div className="flex justify-between items-center mb-8 flex-shrink-0">
                <h1 className="text-3xl font-bold text-foreground">Minhas Tarefas</h1>
                 <Button className="btn-primary-gradient" onClick={handleNewTask}>
                    <Plus className="mr-2 h-4 w-4" /> Nova Tarefa
                </Button>
            </div>

            <Tabs defaultValue="board" className="flex-grow flex flex-col">
                <TabsList className="grid w-full grid-cols-2 max-w-sm mb-6 bg-muted/50 self-start">
                    <TabsTrigger value="board"><LayoutGrid className="mr-2 h-4 w-4" />Quadro</TabsTrigger>
                    <TabsTrigger value="list"><List className="mr-2 h-4 w-4" />Lista</TabsTrigger>
                </TabsList>
                <TabsContent value="board" className="flex-grow overflow-hidden">
                    <TasksBoardView />
                </TabsContent>
                <TabsContent value="list" className="flex-grow overflow-y-auto custom-scrollbar">
                    <TasksListView />
                </TabsContent>
            </Tabs>
        </div>
    );
}

const TasksBoardView = () => {
    const tasksBacklog = userTasks.filter(t => t.status === 'backlog');
    const tasksTodo = userTasks.filter(t => t.status === 'todo');
    const tasksInProgress = userTasks.filter(t => t.status === 'in-progress');
    const tasksDone = userTasks.filter(t => t.status === 'done');
    const tasksBlocked = userTasks.filter(t => t.status === 'blocked');

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 h-full">
            <TaskColumn title="Backlog" tasks={tasksBacklog} />
            <TaskColumn title="A Fazer" tasks={tasksTodo} />
            <TaskColumn title="Em Progresso" tasks={tasksInProgress} />
            <TaskColumn title="Bloqueado" tasks={tasksBlocked} />
            <TaskColumn title="Concluído" tasks={tasksDone} />
        </div>
    );
}

const TasksListView = () => {
    type SortKey = 'title' | 'priority' | 'dueDate';
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'ascending' | 'descending' }>({ key: 'dueDate', direction: 'ascending' });

    const priorityOrder: { [key: string]: number } = { urgent: 4, high: 3, medium: 2, low: 1 };

    const sortedTasks = useMemo(() => {
        let sortableItems = [...userTasks];
        sortableItems.sort((a, b) => {
            if (sortConfig.key === 'priority') {
                 const aValue = priorityOrder[a.priority] || 0;
                 const bValue = priorityOrder[b.priority] || 0;
                 if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
            } else if (sortConfig.key === 'dueDate') {
                 if (new Date(a.dueDate) < new Date(b.dueDate)) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (new Date(a.dueDate) > new Date(b.dueDate)) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
            } else { // title
                 if (a.title < b.title) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a.title > b.title) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
            }
            return 0;
        });
        return sortableItems;
    }, [userTasks, sortConfig]);

    const requestSort = (key: SortKey) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const priorityStyles: { [key: string]: string } = {
        urgent: 'bg-red-700/30 text-red-300 border-red-700/50',
        high: 'bg-red-500/20 text-red-300 border-red-500/30',
        medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        low: 'bg-green-500/20 text-green-300 border-green-500/30',
    };

    return (
        <Card className="gradient-surface border-0 rounded-2xl h-full">
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b-border hover:bg-transparent">
                            <TableHead onClick={() => requestSort('title')} className="cursor-pointer">
                                <span className="flex items-center gap-2">Tarefa <ArrowUpDown className="w-4 h-4"/></span>
                            </TableHead>
                            <TableHead>Responsáveis</TableHead>
                             <TableHead onClick={() => requestSort('priority')} className="cursor-pointer">
                                <span className="flex items-center gap-2">Prioridade <ArrowUpDown className="w-4 h-4"/></span>
                            </TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead onClick={() => requestSort('dueDate')} className="cursor-pointer text-right">
                                <span className="flex items-center gap-2 justify-end">Prazo <ArrowUpDown className="w-4 h-4"/></span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedTasks.map(task => (
                            <TableRow key={task.id} className="border-b-border/50 hover:bg-muted/50">
                                <TableCell className="font-medium text-foreground">{task.title}</TableCell>
                                <TableCell>
                                    <div className="flex -space-x-2">
                                        {task.assignedTo.map(userId => {
                                            const user = users.find(u => u.id === userId);
                                            if (!user) return null;
                                            const avatar = PlaceHolderImages.find(p => p.id === `user-avatar-${user.id}`)?.imageUrl;
                                            return (
                                                <Avatar key={user.id} className="h-7 w-7 border-2 border-background" title={user.name}>
                                                    <AvatarImage src={avatar} />
                                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            );
                                        })}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={`capitalize ${priorityStyles[task.priority]}`}>{task.priority}</Badge>
                                </TableCell>
                                 <TableCell>
                                    <Badge variant="secondary" className="capitalize">{task.status.replace('-', ' ')}</Badge>
                                </TableCell>
                                <TableCell className="text-right text-muted-foreground">{new Date(task.dueDate).toLocaleDateString('pt-PT')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

function TaskColumn({title, tasks}: {title: string, tasks: typeof userTasks}) {
    const columnStyles: { [key: string]: { border: string } } = {
        "Backlog": { border: "border-slate-400" },
        "A Fazer": { border: "border-blue-400" },
        "Em Progresso": { border: "border-yellow-400" },
        "Bloqueado": { border: "border-red-500" },
        "Concluído": { border: "border-green-400" },
    }
    const style = columnStyles[title] || { border: "border-gray-400" };
    return (
        <div className="flex flex-col h-full bg-muted/30 rounded-lg">
            <div className={`flex-shrink-0 p-3 border-l-4 ${style.border}`}>
                <h2 className="text-base font-semibold text-foreground">{title} <span className="text-sm text-muted-foreground font-normal">({tasks.length})</span></h2>
            </div>
            <div className="space-y-4 flex-grow overflow-y-auto custom-scrollbar p-3">
                {tasks.map(task => <TaskCard key={task.id} task={task} />)}
                 {tasks.length === 0 && <div className="text-sm text-muted-foreground text-center pt-10 px-4">Nenhuma tarefa nesta coluna.</div>}
            </div>
        </div>
    )
}

function TaskCard({ task }: { task: (typeof userTasks)[0] }) {
  const priorityStyles: { [key: string]: { text: string; icon: string } } = {
    urgent: { text: 'text-red-400', icon: '🔴' },
    high: { text: 'text-red-400', icon: '🔴' },
    medium: { text: 'text-yellow-400', icon: '🟡' },
    low: { text: 'text-green-400', icon: '🟢' },
  };
   const assignedUsers = task.assignedTo.map(userId => users.find(u => u.id === userId)).filter(Boolean);
   const isDone = task.status === 'done';

  return (
    <div className={cn("p-4 bg-card/70 rounded-lg shadow-sm cursor-grab active:cursor-grabbing", { 'opacity-60': isDone }, { 'border-l-2 border-red-500': task.status === 'blocked'})}>
        <p className={cn("font-semibold text-foreground text-sm", {'line-through text-muted-foreground': isDone})}>
            {task.title}
        </p>

        {task.status === 'blocked' && (
            <p className="text-xs font-semibold text-red-400 mt-2">Bloqueio: Aguardando aprovação do orçamento.</p>
        )}

        <p className={cn("text-xs text-muted-foreground mt-2", {'line-through': isDone})}>{task.description}</p>
        
        {task.checklist && task.checklist.length > 0 && (
             <div className="mt-3 space-y-1">
                 {task.checklist.map(item => (
                     <div key={item.id} className={cn("flex items-center gap-2 text-xs", item.checked ? 'text-muted-foreground line-through' : 'text-foreground')}>
                         <input type="checkbox" checked={item.checked} readOnly className="w-3.5 h-3.5 rounded-sm bg-card/80 border-border"/>
                         <span>{item.text}</span>
                     </div>
                 ))}
             </div>
        )}

        <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-xs">
                {task.priority && (
                    <span className={cn('font-semibold', priorityStyles[task.priority]?.text)}>
                        {priorityStyles[task.priority]?.icon} {task.priority}
                    </span>
                )}
                {task.dueDate && (
                     <span className="text-muted-foreground">| Prazo: {new Date(task.dueDate).toLocaleDateString('pt-PT')}</span>
                )}
            </div>
            <div className="flex -space-x-2">
                {assignedUsers.map(user => {
                    if (!user) return null;
                    const avatar = PlaceHolderImages.find(p => p.id === `user-avatar-${user.id}`)?.imageUrl;
                    return (
                        <Avatar key={user.id} className="h-6 w-6 border-2 border-background" title={user.name}>
                            <AvatarImage src={avatar} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    );
                })}
            </div>
        </div>
         {task.labels && task.labels.length > 0 && (
             <div className="mt-3 flex flex-wrap gap-1">
                 {task.labels.map(label => (
                     <Badge key={label} variant="secondary" className="text-xs">#{label}</Badge>
                 ))}
             </div>
         )}
    </div>
  );
};
