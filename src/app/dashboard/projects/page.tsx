
'use client'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getProjectsForUser, getCurrentUser, users } from '@/lib/data';
import { Building, Calendar, CheckCircle, Users, DollarSign, AlertTriangle, Plus, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const currentUser = getCurrentUser();
const userProjects = getProjectsForUser(currentUser.id);

export default function ProjectsPage() {
  const { toast } = useToast();

  const handleNewProject = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A criação de novos projetos estará disponível em breve.",
    });
  }

  return (
    <div className="p-6 fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Meus Projetos</h1>
        <Button className="btn-primary-gradient" onClick={handleNewProject}>
          <Plus className="mr-2 h-4 w-4" /> Novo Projeto
        </Button>
      </div>
      <div className="space-y-8">
        {userProjects.map(project => (
          <Card key={project.id} className="gradient-surface border-0 rounded-2xl overflow-hidden">
            <CardHeader className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="secondary" className="mb-2 bg-primary/20 text-primary">{project.department}</Badge>
                  <CardTitle className="text-2xl font-bold">{project.name}</CardTitle>
                  <CardDescription className="text-muted-foreground mt-2 max-w-prose">{project.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold py-1 px-3 rounded-full capitalize ${project.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                        {project.status === 'active' ? 'Ativo' : 'Planeamento'}
                    </span>
                    <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5"/></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
                <div className="mb-4">
                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-1">
                        <span>Progresso</span>
                        <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2"/>
                </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary/70" />
                  <div>
                    <p className="text-muted-foreground">Prazo</p>
                    <p className="font-semibold text-foreground">{new Date(project.endDate).toLocaleDateString('pt-PT')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary/70" />
                  <div>
                    <p className="text-muted-foreground">Equipa</p>
                    <div className="flex -space-x-2">
                       {project.members.map(memberId => {
                         const user = users.find(u => u.id === memberId);
                         return user ? (
                           <div key={user.id} className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-xs font-bold ring-2 ring-background" title={user.name}>
                             {user.name.charAt(0)}
                           </div>
                         ) : null;
                       })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary/70" />
                  <div>
                    <p className="text-muted-foreground">Tarefas</p>
                    <p className="font-semibold text-foreground">{project.completedTasks} / {project.tasksCount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-primary/70" />
                  <div>
                    <p className="text-muted-foreground">Orçamento</p>
                    <p className="font-semibold text-foreground">${(project.spent / 1000)}k / ${(project.budget / 1000)}k</p>
                  </div>
                </div>
              </div>
                <div className="mt-6 border-t border-border pt-4">
                     <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-yellow-400"/>Riscos Principais</h4>
                     <p className="text-sm text-muted-foreground">{project.risks}</p>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
