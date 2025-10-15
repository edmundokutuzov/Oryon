'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getTasksForUser, getCurrentUser, users } from '@/lib/data';
import { Calendar, Check, Clock, File, Plus, User, Users, Paperclip, CheckSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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

    const tasksBacklog = userTasks.filter(t => t.status === 'backlog');
    const tasksTodo = userTasks.filter(t => t.status === 'todo');
    const tasksInProgress = userTasks.filter(t => t.status === 'in-progress');
    const tasksDone = userTasks.filter(t => t.status === 'done');
    const tasksBlocked = userTasks.filter(t => t.status === 'blocked');


  return (
    <div className="p-6 fade-in h-full flex flex-col">
      <div className="flex justify-between items-center mb-8 flex-shrink-0">
        <h1 className="text-3xl font-bold text-foreground">Minhas Tarefas</h1>
        <Button className="btn-primary-gradient" onClick={handleNewTask}>
          <Plus className="mr-2 h-4 w-4" /> Nova Tarefa
        </Button>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 flex-grow overflow-x-auto">
            <TaskColumn title="Backlog" tasks={tasksBacklog} />
            <TaskColumn title="A Fazer" tasks={tasksTodo} />
            <TaskColumn title="Em Progresso" tasks={tasksInProgress} />
            <TaskColumn title="Bloqueado" tasks={tasksBlocked} />
            <TaskColumn title="Concluído" tasks={tasksDone} />
        </div>
    </div>
  );
}


function TaskColumn({title, tasks}: {title: string, tasks: typeof userTasks}) {
    const statusColor: { [key: string]: string } = {
        "Backlog": "border-t-slate-400",
        "A Fazer": "border-t-blue-400",
        "Em Progresso": "border-t-yellow-400",
        "Bloqueado": "border-t-red-500",
        "Concluído": "border-t-green-400",
    }
    return (
        <div className="flex flex-col">
            <div className={`flex-shrink-0 p-2 border-t-4 ${statusColor[title]}`}>
                <h2 className="text-lg font-bold text-foreground mb-4 px-2">{title} <span className="text-muted-foreground text-base font-normal">({tasks.length})</span></h2>
            </div>
            <div className="space-y-4 h-full overflow-y-auto custom-scrollbar pr-2 pb-4">
                {tasks.map(task => <TaskCard key={task.id} task={task} />)}
                 {tasks.length === 0 && <p className="text-sm text-muted-foreground text-center pt-10">Nenhuma tarefa aqui.</p>}
            </div>
        </div>
    )
}


function TaskCard({ task }: { task: (typeof userTasks)[0] }) {
  const priorityStyles: { [key: string]: string } = {
    urgent: 'bg-red-700/30 text-red-300 border-red-700/50',
    high: 'bg-red-500/20 text-red-300 border-red-500/30',
    medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    low: 'bg-green-500/20 text-green-300 border-green-500/30',
  };
   const assignedUsers = task.assignedTo.map(userId => users.find(u => u.id === userId)).filter(Boolean);

  return (
    <Card className="gradient-surface border-0 rounded-xl cursor-grab active:cursor-grabbing">
        <CardHeader className="p-4 pb-2">
             <div className="flex justify-between items-start">
                <Badge variant="outline" className={`text-xs capitalize ${priorityStyles[task.priority]}`}>{task.priority}</Badge>
                {task.status === 'done' && <Check className="w-5 h-5 text-green-400" />}
             </div>
             <CardTitle className="text-base font-semibold pt-2">{task.title}</CardTitle>
        </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{task.description}</p>
        
        { (task.progress !== undefined && task.progress > 0) &&
            <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progresso</span>
                    <span>{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-1.5" />
            </div>
        }

        <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
            </div>
             <div className="flex items-center gap-2">
                {task.checklist && task.checklist.length > 0 && 
                    <div className="flex items-center gap-1">
                        <CheckSquare className="w-3.5 h-3.5"/> 
                        <span>{task.checklist.filter(i => i.checked).length}/{task.checklist.length}</span>
                    </div>
                }
                {task.attachments && task.attachments.length > 0 &&
                    <div className="flex items-center gap-1">
                         <Paperclip className="w-3.5 h-3.5"/> 
                         <span>{task.attachments.length}</span>
                    </div>
                }
            </div>
        </div>
        
        <div className="border-t border-border pt-3 flex justify-between items-center">
            <div className="flex -space-x-2">
                {assignedUsers.map(user => {
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
            <div className='flex items-center gap-2'>
                {task.labels.map(label => (
                    <Badge key={label} variant="secondary" className="text-xs">{label}</Badge>
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
};
