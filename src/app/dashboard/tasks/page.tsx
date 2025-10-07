
'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getTasksForUser, getCurrentUser, users } from '@/lib/data';
import { Calendar, Check, Clock, File, Plus, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

    const tasksPending = userTasks.filter(t => t.status === 'pending');
    const tasksInProgress = userTasks.filter(t => t.status === 'in-progress');
    const tasksCompleted = userTasks.filter(t => t.status === 'completed');

  return (
    <div className="p-6 fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Minhas Tarefas</h1>
        <Button className="btn-primary-gradient" onClick={handleNewTask}>
          <Plus className="mr-2 h-4 w-4" /> Nova Tarefa
        </Button>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TaskColumn title="Pendente" tasks={tasksPending} />
            <TaskColumn title="Em Progresso" tasks={tasksInProgress} />
            <TaskColumn title="Concluído" tasks={tasksCompleted} />
        </div>
    </div>
  );
}


function TaskColumn({title, tasks}: {title: string, tasks: typeof userTasks}) {
    return (
        <div className="bg-muted/50 rounded-2xl p-4">
            <h2 className="text-lg font-bold text-foreground mb-4 px-2">{title} ({tasks.length})</h2>
            <div className="space-y-4 h-full overflow-y-auto custom-scrollbar pr-2">
                {tasks.map(task => <TaskCard key={task.id} task={task} />)}
            </div>
        </div>
    )
}


function TaskCard({ task }: { task: (typeof userTasks)[0] }) {
  const priorityStyles: { [key: string]: string } = {
    high: 'bg-red-500/20 text-red-300 border-red-500/30',
    medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    low: 'bg-green-500/20 text-green-300 border-green-500/30',
  };
   const assignedBy = users.find(u => u.id === task.assignedBy);

  return (
    <Card className="gradient-surface border-0 rounded-xl">
        <CardHeader className="p-4 pb-2">
             <div className="flex justify-between items-start">
                <Badge variant="outline" className={`text-xs ${priorityStyles[task.priority]}`}>{task.priority}</Badge>
                {task.status === 'completed' && <Check className="w-5 h-5 text-green-400" />}
             </div>
             <CardTitle className="text-base font-semibold pt-2">{task.title}</CardTitle>
        </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{task.description}</p>
        
        <div className="mb-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progresso</span>
                <span>{task.progress}%</span>
            </div>
            <Progress value={task.progress} className="h-1.5" />
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Vence: {new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
            </div>
            {assignedBy && 
            <div className="flex items-center gap-1.5" title={`Atribuído por ${assignedBy.name}`}>
                <User className="w-3.5 h-3.5" />
                <span>{assignedBy.name.split(' ')[0]}</span>
            </div>
            }
        </div>
        
        {task.attachments && task.attachments.length > 0 && (
             <div className="border-t border-border pt-3">
                <h4 className="text-xs font-semibold text-muted-foreground mb-2">Anexos</h4>
                <div className="flex flex-wrap gap-2">
                    {task.attachments.map(att => (
                        <div key={att.name} className="flex items-center gap-2 text-xs bg-muted/50 px-2 py-1 rounded-md">
                            <File className="w-3 h-3" />
                            <span>{att.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}

      </CardContent>
    </Card>
  );
};
