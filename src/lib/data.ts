// This file mocks a database.
// In a real application, you would fetch this data from a server.

export const users = [
    {
        id: 1,
        name: "Admin Sistema",
        email: "admin@standardbank.com",
        password: "...", // Not stored on client
        role: "Administrador",
        department: "Administração",
        avatar: "https://picsum.photos/seed/1/256/256",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
    },
    {
        id: 2,
        name: "André Xavier",
        email: "andre.xavier@standardbank.com",
        password: "...",
        role: "Designer",
        department: "Marketing",
        avatar: "https://picsum.photos/seed/2/256/256",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
    },
    {
        id: 3,
        name: "Maria Silva",
        email: "maria.silva@standardbank.com",
        password: "...",
        role: "Chefe de Dept.",
        department: "Marketing",
        avatar: "https://picsum.photos/seed/3/256/256",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
    },
    {
        id: 4,
        name: "Carlos Santos",
        email: "carlos.santos@standardbank.com",
        password: "...",
        role: "Analista",
        department: "Financeiro",
        avatar: "https://picsum.photos/seed/4/256/256",
        status: "away" as "online" | "away" | "busy" | "offline" | "dnd",
    },
    {
        id: 5,
        name: "Ana Costa",
        email: "ana.costa@standardbank.com",
        password: "...",
        role: "Gestora",
        department: "Recursos Humanos",
        avatar: "https://picsum.photos/seed/5/256/256",
        status: "busy" as "online" | "away" | "busy" | "offline" | "dnd",
    }
];

export const tasks = [
    {
        id: 1,
        title: "Criar campanha publicitária para novo produto",
        description: "Desenvolver conceito criativo e materiais para campanha do novo produto bancário digital 'Conta Pro' incluindo anúncios, social media e email marketing.",
        assignedTo: 2,
        assignedBy: 3,
        department: "Marketing",
        dueDate: "2024-12-15",
        status: "in-progress" as "in-progress" | "pending" | "completed",
        priority: "high" as "high" | "medium" | "low",
        progress: 65,
    },
    {
        id: 2,
        title: "Atualizar identidade visual da marca",
        description: "Revisar e atualizar guidelines da marca para 2024 incluindo logotipo, tipografia, cores e aplicações em diferentes suportes.",
        assignedTo: 2,
        assignedBy: 3,
        department: "Marketing",
        dueDate: "2024-12-30",
        status: "pending" as "in-progress" | "pending" | "completed",
        priority: "medium" as "high" | "medium" | "low",
        progress: 0,
    },
    {
        id: 3,
        title: "Preparar relatório trimestral de desempenho",
        description: "Compilar dados de performance dos últimos 3 meses e preparar relatório para apresentação à direção.",
        assignedTo: 4,
        assignedBy: 1,
        department: "Financeiro",
        dueDate: "2024-11-25",
        status: "in-progress" as "in-progress" | "pending" | "completed",
        priority: "high" as "high" | "medium" | "low",
        progress: 40,
    },
    {
        id: 4,
        title: "Review SEO para blog corporativo",
        description: "Analisar performance do blog e otimizar artigos para melhor ranking nos motores de busca.",
        assignedTo: 2,
        assignedBy: 3,
        department: "Marketing",
        dueDate: "2024-11-28",
        status: "completed" as "in-progress" | "pending" | "completed",
        priority: "low" as "high" | "medium" | "low",
        progress: 100,
    }
];

export const meetings = [
    {
        id: 1,
        title: "Reunião de Planeamento - Campanha Q4",
        description: "Discussão da estratégia de marketing para o último trimestre e preparação do lançamento da nova conta digital.",
        department: "Marketing",
        date: "2024-11-20",
        time: "14:00",
        duration: 60,
        participants: [2, 3],
        status: "scheduled",
    },
    {
        id: 2,
        title: "Review Mensal de Projetos",
        description: "Análise do progresso dos projetos em andamento e ajustes de planeamento.",
        department: "Geral",
        date: "2024-11-25",
        time: "10:00",
        duration: 90,
        participants: [1, 2, 3, 4, 5],
        status: "scheduled",
    },
    {
        id: 3,
        title: "Workshop de Inovação Digital",
        description: "Sessão de brainstorming para identificar oportunidades de inovação nos serviços bancários.",
        department: "Tecnologia",
        date: "2024-12-05",
        time: "09:30",
        duration: 120,
        participants: [1, 2, 4],
        status: "scheduled",
    }
];

export const departments = [
    { id: 1, name: "Marketing", slug: "marketing" },
    { id: 2, name: "Financeiro", slug: "finance" },
    { id: 3, name: "Recursos Humanos", slug: "hr" },
    { id: 4, name: "Tecnologia", slug: "it" },
    { id: 5, name: "Operações", slug: "operations" },
    { id: 6, name: "Compliance", slug: "compliance" },
    { id: 7, name: "Segurança", slug: "security" },
];

export const menuItems = [
    {
        title: 'Navegação',
        items: [
            { id: 'dashboard', title: 'Dashboard' },
            { id: 'tasks', title: 'Minhas Tarefas', badge: 5 },
            { id: 'projects', title: 'Projetos' },
            { id: 'meetings', title: 'Reuniões', badge: 2 },
            { id: 'calendar', title: 'Calendário' },
            { id: 'team', title: 'Equipa' },
            { id: 'cloud', title: 'Minha Nuvem' },
        ],
    },
    {
        title: 'Departamentos',
        action: true,
        items: [
            { id: 'departments/marketing', title: 'Marketing', department: 'marketing', status: 'online' },
            { id: 'departments/finance', title: 'Financeiro', department: 'finance', status: 'online' },
            { id: 'departments/hr', title: 'Recursos Humanos', department: 'hr', status: 'away' },
            { id: 'departments/it', title: 'Tecnologia', department: 'it', status: 'online' },
            { id: 'departments/operations', title: 'Operações', department: 'operations', status: 'busy' },
            { id: 'departments/compliance', title: 'Compliance', department: 'compliance', status: 'online' },
            { id: 'departments/security', title: 'Segurança', department: 'security', status: 'dnd' },
        ],
    },
    {
        title: 'Comunicação',
        items: [
            { id: 'chat/general', title: 'Chat Geral', badge: 12 },
            { id: 'chat/department', title: 'Chat de Departamento', badge: 3 },
            { id: 'chat/direct', title: 'Mensagens Diretas' },
        ],
    },
    {
        title: 'Recursos',
        items: [
            { id: 'knowledge-base', title: 'Base de Conhecimento' },
            { id: 'documents', title: 'Documentos' },
            { id: 'reports', title: 'Relatórios' },
            { id 'analytics', title: 'Analytics' },
        ],
    },
    {
        title: 'Ferramentas',
        items: [
            { id: 'workflows', title: 'Workflows' },
            { id: 'automations', title: 'Automações' },
            { id: 'integrations', title: 'Integrações' },
            { id: 'document-editor', title: 'Editor de Documentos' },
        ],
    },
    {
        title: 'Configurações',
        items: [
            { id: 'profile', title: 'Meu Perfil' },
            { id: 'settings', title: 'Configurações' },
            { id: 'security', title: 'Segurança' },
        ],
    },
];

// Mock functions to simulate a backend
export const getCurrentUser = () => users.find(u => u.email === 'andre.xavier@standardbank.com')!;
export const getTasksForUser = (userId: number) => tasks.filter(t => t.assignedTo === userId);
export const getUpcomingMeetings = (userId: number) => meetings.filter(m => m.participants.includes(userId) && m.status === 'scheduled');
