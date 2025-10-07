import {
  Activity,
  ListTodo,
  MessagesSquare,
  Video,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTasksForUser, getUpcomingMeetings, getCurrentUser, users } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';

const currentUser = getCurrentUser();
const tasks = getTasksForUser(currentUser.id);
const meetings = getUpcomingMeetings(currentUser.id);

const dashboardStats = [
  {
    title: 'Tarefas Pendentes',
    value: tasks.filter(t => t.status !== 'completed').length,
    icon: ListTodo,
    color: 'bg-blue-500/20 text-blue-300',
  },
  {
    title: 'Reuniões Hoje',
    value: meetings.length,
    icon: Video,
    color: 'bg-green-500/20 text-green-300',
  },
  {
    title: 'Mensagens Não Lidas',
    value: '12',
    icon: MessagesSquare,
    color: 'bg-purple-500/20 text-purple-300',
  },
  {
    title: 'Produtividade',
    value: '84%',
    icon: Activity,
    color: 'bg-yellow-500/20 text-yellow-300',
  },
];

const TaskPreviewCard = ({ task }: { task: (typeof tasks)[0] }) => {
  const priorityStyles: { [key: string]: string } = {
    high: 'bg-red-500/20 text-red-300',
    medium: 'bg-yellow-500/20 text-yellow-300',
    low: 'bg-green-500/20 text-green-300',
  };
  return (
    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-white text-sm" dangerouslySetInnerHTML={{ __html: task.title }}></h3>
        <Badge variant="outline" className={`text-xs ${priorityStyles[task.priority]}`}>{task.priority}</Badge>
      </div>
      <p className="text-white/60 text-sm mb-3 line-clamp-2" dangerouslySetInnerHTML={{ __html: task.description }}></p>
      <div className="flex items-center justify-between text-xs text-white/60">
        <span>Vence: {new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
        <span className="capitalize">{task.status === 'completed' ? 'Concluído' : task.status === 'in-progress' ? 'Em Progresso' : 'Pendente'}</span>
      </div>
    </div>
  );
};

const MeetingPreviewCard = ({ meeting }: { meeting: (typeof meetings)[0] }) => (
  <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-semibold text-white text-sm" dangerouslySetInnerHTML={{ __html: meeting.title }}></h3>
      <Button size="icon" variant="ghost" className="h-8 w-8 bg-green-500/20 text-green-300 hover:bg-green-500/30">
        <Video className="h-4 w-4" />
      </Button>
    </div>
    <p className="text-white/60 text-sm mb-3 line-clamp-2" dangerouslySetInnerHTML={{ __html: meeting.description }}></p>
    <div className="flex items-center justify-between text-xs text-white/60">
      <span>{new Date(`${meeting.date}T${meeting.time}`).toLocaleString('pt-BR')}</span>
      <span>{meeting.duration} min</span>
    </div>
  </div>
);

const ContextPanel = () => {
  const onlineUsers = users.filter(u => u.status === 'online');
  return (
    <div className="p-6 h-full flex flex-col">
        <h2 className="text-lg font-bold text-white mb-4">Resumo do Dia</h2>
        <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
                <span className="text-white/70">Tarefas para hoje:</span>
                <span className="font-bold text-white">3</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-white/70">Reuniões:</span>
                <span className="font-bold text-white">{meetings.length}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-white/70">Prazo final:</span>
                <span className="font-bold text-red-400">1</span>
            </div>
        </div>
        
        <h2 className="text-lg font-bold text-white mt-8 mb-4">Equipa Online</h2>
        <div className="space-y-3 flex-grow overflow-y-auto custom-scrollbar -mr-3 pr-3">
            {onlineUsers.map(user => {
              const avatar = PlaceHolderImages.find(p => p.id === `user-avatar-${user.id}`)?.imageUrl;
              return (
                <div key={user.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={avatar} alt={user.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-background"></span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-white/60">{user.role}</p>
                    </div>
                </div>
              )
            })}
        </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex h-full">
      <div className="flex-grow p-6 fade-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-white/60 mt-1">Bem-vindo de volta, {currentUser.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat) => (
            <Card key={stat.title} className="gradient-surface border-0 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/60 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="gradient-surface border-0 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Minhas Tarefas</CardTitle>
              <Link href="/dashboard/tasks" className="text-primary/80 hover:text-primary transition-colors text-sm">Ver todas</Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.slice(0,3).map(task => <TaskPreviewCard key={task.id} task={task} />)}
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-surface border-0 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Próximas Reuniões</CardTitle>
              <Link href="/dashboard/meetings" className="text-primary/80 hover:text-primary transition-colors text-sm">Ver todas</Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meetings.slice(0,3).map(meeting => <MeetingPreviewCard key={meeting.id} meeting={meeting} />)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <aside className="w-80 flex-shrink-0 gradient-surface rounded-l-2xl border-l border-white/10 hidden xl:block">
        <ContextPanel />
      </aside>
    </div>
  );
}
