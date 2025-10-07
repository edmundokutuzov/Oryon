// This file mocks a database.
// In a real application, you would fetch this data from a server.

export const users = [
    {
        id: 1,
        name: "Admin Sistema",
        email: "admin@standardbank.com",
        role: "Administrador",
        department: "Administração",
        avatar: "https://picsum.photos/seed/1/256/256",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
    },
    {
        id: 2,
        name: "Edmundo Kutuzov",
        email: "edmundo.kutuzov@standardbank.com",
        role: "Designer",
        department: "Marketing",
        avatar: "https://picsum.photos/seed/2/256/256",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
    },
    {
        id: 3,
        name: "Maria Silva",
        email: "maria.silva@standardbank.com",
        role: "Chefe de Dept.",
        department: "Marketing",
        avatar: "https://picsum.photos/seed/3/256/256",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
    },
    {
        id: 4,
        name: "Carlos Santos",
        email: "carlos.santos@standardbank.com",
        role: "Analista",
        department: "Financeiro",
        avatar: "https://picsum.photos/seed/4/256/256",
        status: "away" as "online" | "away" | "busy" | "offline" | "dnd",
    },
    {
        id: 5,
        name: "Ana Costa",
        email: "ana.costa@standardbank.com",
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
            { id: 'analytics', title: 'Analytics' },
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

export const knowledgeBase = [
    {
        id: 1,
        title: "Guia de Boas-Vindas ao Standard Bank",
        category: "Recursos Humanos",
        views: 1250,
        tags: ["onboarding", "cultura", "beneficios"]
    },
    {
        id: 2,
        title: "Política de Segurança da Informação",
        category: "Segurança",
        views: 890,
        tags: ["segurança", "dados", "compliance"]
    },
    {
        id: 3,
        title: "Como Solicitar Férias no Portal do Colaborador",
        category: "Recursos Humanos",
        views: 2340,
        tags: ["férias", "portal", "processo"]
    },
    {
        id: 4,
        title: "Brand Guidelines do Standard Bank",
        category: "Marketing",
        views: 780,
        tags: ["marca", "design", "logo"]
    },
    {
        id: 5,
        title: "Procedimentos de Abertura de Conta para Clientes",
        category: "Operações",
        views: 1560,
        tags: ["contas", "clientes", "operações"]
    }
];

export const documents = [
    { id: 1, title: "Relatório Financeiro Anual 2023", type: "PDF", size: "5.8 MB", lastModified: "2024-03-15" },
    { id: 2, title: "Plano de Marketing Q4 2024", type: "DOCX", size: "1.2 MB", lastModified: "2024-10-28" },
    { id: 3, title: "Apresentação Institucional", type: "PPTX", size: "12.3 MB", lastModified: "2024-09-05" },
    { id: 4, title: "Formulário de Avaliação de Desempenho", type: "PDF", size: "350 KB", lastModified: "2024-01-10" },
    { id: 5, title: "Templates para Redes Sociais", type: "ZIP", size: "25.5 MB", lastModified: "2024-11-02" },
];

export const reports = [
    { id: 1, title: "Desempenho de Vendas - Outubro 2024", summary: "Análise detalhada das métricas de vendas, incluindo performance por região e produto.", type: "mensal" },
    { id: 2, title: "Satisfação do Cliente - Q3 2024", summary: "Resultados da pesquisa trimestral de satisfação do cliente e principais insights.", type: "trimestral" },
    { id: 3, title: "Análise de Risco de Crédito", summary: "Relatório sobre a carteira de crédito atual e avaliação de riscos.", type: "anual" },
    { id: 4, title: "Performance da Campanha 'Conta Pro'", summary: "KPIs e ROI da campanha de lançamento do novo produto digital.", type: "semanal" },
];

export const analyticsData = {
    userActivity: {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        data: [65, 59, 80, 81, 56, 55, 40]
    },
    projectProgress: {
        labels: ["Campanha Q4", "Identidade Visual", "Relatório Trimestral", "Otimização SEO"],
        data: [65, 10, 40, 100]
    }
};

export const workflows = [
    { id: 1, name: "Onboarding de Novo Colaborador", department: "Recursos Humanos", steps: 12 },
    { id: 2, name: "Aprovação de Proposta Comercial", department: "Financeiro", steps: 5 },
    { id: 3, name: "Lançamento de Campanha de Marketing", department: "Marketing", steps: 8 },
    { id: 4, name: "Solicitação de Acesso a Sistemas", department: "Tecnologia", steps: 4 },
];

export const automations = [
    { id: 1, name: "Enviar email de boas-vindas a novos clientes", active: true },
    { id: 2, name: "Gerar relatório de performance semanal", active: true },
    { id: 3, name: "Notificar gestor sobre tarefas atrasadas", active: false },
    { id: 4, name: "Criar ticket de suporte a partir de email", active: true },
];

export const integrations = [
    { id: 1, name: "Slack", icon: "fab fa-slack", connected: true },
    { id: 2, name: "Google Drive", icon: "fab fa-google-drive", connected: true },
    { id: 3, name: "Salesforce", icon: "fab fa-salesforce", connected: false },
    { id: 4, name: "Trello", icon: "fab fa-trello", connected: true },
    { id: 5, name: "GitHub", icon: "fab fa-github", connected: false },
    { id: 6, name: "Figma", icon: "fab fa-figma", connected: true },
];

// Mock functions to simulate a backend
export const getCurrentUser = () => users.find(u => u.email === 'edmundo.kutuzov@standardbank.com')!;
export const getTasksForUser = (userId: number) => tasks.filter(t => t.assignedTo === userId);
export const getUpcomingMeetings = (userId: number) => meetings.filter(m => m.participants.includes(userId) && m.status === 'scheduled');
