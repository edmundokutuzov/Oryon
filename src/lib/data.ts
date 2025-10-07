// This file mocks a database.
// In a real application, you would fetch this data from a server.

export const users = [
    {
        id: 1,
        name: "Admin Sistema",
        email: "admin@standardbank.com",
        role: "Administrador",
        department: "Administração",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Administrador do sistema Oryon, garantindo a segurança e a operacionalidade da plataforma.",
        phone: "+351 912 345 678",
        location: "Lisboa, Portugal",
        permissions: ["all"],
    },
    {
        id: 2,
        name: "Edmundo Kutuzov",
        email: "edmundo.kutuzov@standardbank.com",
        role: "Lead Designer",
        department: "Marketing",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Designer criativo especializado em campanhas digitais e identidade visual. Apaixonado por interfaces intuitivas.",
        phone: "+351 923 456 789",
        location: "Porto, Portugal",
        permissions: ["read", "write", "comment"],
    },
    {
        id: 3,
        name: "Maria Silva",
        email: "maria.silva@standardbank.com",
        role: "Chefe de Dept.",
        department: "Marketing",
        avatar: "https://images.unsplash.com/photo-1494790108375-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Chefe de Departamento de Marketing com 10 anos de experiência em estratégia digital e gestão de equipas.",
        phone: "+351 934 567 890",
        location: "Lisboa, Portugal",
        permissions: ["read", "write", "comment", "manage", "approve"],
    },
    {
        id: 4,
        name: "Carlos Santos",
        email: "carlos.santos@standardbank.com",
        role: "Analista Financeiro",
        department: "Financeiro",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        status: "away" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        bio: "Analista financeiro especializado em relatórios trimestrais e análise de risco.",
        phone: "+351 945 678 901",
        location: "Lisboa, Portugal",
        permissions: ["read", "write"],
    },
    {
        id: 5,
        name: "Ana Costa",
        email: "ana.costa@standardbank.com",
        role: "Gestora de RH",
        department: "Recursos Humanos",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        status: "busy" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Gestora de RH focada em desenvolvimento organizacional, recrutamento e bem-estar dos colaboradores.",
        phone: "+351 956 789 012",
        location: "Porto, Portugal",
        permissions: ["read", "write", "manage", "approve"],
    },
    {
        id: 6,
        name: "Sofia Ribeiro",
        email: "sofia.ribeiro@standardbank.com",
        role: "Controller",
        department: "Financeiro",
        avatar: "",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Controller experiente com foco em relatórios financeiros e controlo de gestão.",
        phone: "+351 967 890 123",
        location: "Lisboa, Portugal",
        permissions: ["read", "write", "approve"],
    },
    {
        id: 7,
        name: "João Almeida",
        email: "joao.almeida@standardbank.com",
        role: "Analista de Risco",
        department: "Financeiro",
        avatar: "",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Especialista em análise e mitigação de riscos financeiros e de crédito.",
        phone: "+351 911 223 344",
        location: "Lisboa, Portugal",
        permissions: ["read", "write"],
    },
    {
        id: 8,
        name: "Beatriz Martins",
        email: "beatriz.martins@standardbank.com",
        role: "Tesoureira",
        department: "Financeiro",
        avatar: "",
        status: "offline" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        bio: "Responsável pela gestão de tesouraria, fluxo de caixa e investimentos do banco.",
        phone: "+351 933 445 566",
        location: "Porto, Portugal",
        permissions: ["read", "write", "manage"],
    }
];

export const tasks = [
    {
        id: 1,
        title: "Criar campanha publicitária para novo produto 'Conta Pro'",
        description: "Desenvolver conceito criativo e materiais para campanha do novo produto bancário digital 'Conta Pro' incluindo anúncios, social media e email marketing. Foco em atingir o segmento de PMEs e freelancers.",
        assignedTo: 2,
        assignedBy: 3,
        department: "Marketing",
        dueDate: "2024-12-15",
        status: "in-progress" as "in-progress" | "pending" | "completed",
        priority: "high" as "high" | "medium" | "low",
        progress: 65,
        tags: ["design", "campanha", "urgente", "2024-Q4", "digital"],
        comments: [
            { id: 1, userId: 2, content: "Iniciei o design dos materiais. Preciso de feedback sobre a paleta de cores.", timestamp: "2024-11-10T14:30:00Z" },
            { id: 2, userId: 3, content: "A paleta está aprovada. Pode prosseguir com os designs finais. Gosto da abordagem moderna.", timestamp: "2024-11-11T09:15:00Z" },
        ],
        timeSpent: 12,
        attachments: [
            { name: "conceito-campanha.pdf", size: "2.4 MB", type: "pdf" },
            { name: "mockups-v1.psd", size: "15.7 MB", type: "psd" },
        ]
    },
    {
        id: 2,
        title: "Atualizar identidade visual da marca para 2025",
        description: "Revisar e atualizar guidelines da marca para 2025 incluindo logotipo, tipografia, cores e aplicações em diferentes suportes. O objetivo é modernizar a imagem do banco.",
        assignedTo: 2,
        assignedBy: 3,
        department: "Marketing",
        dueDate: "2024-12-30",
        status: "pending" as "in-progress" | "pending" | "completed",
        priority: "medium" as "high" | "medium" | "low",
        progress: 10,
        tags: ["branding", "design", "2025", "identidade-visual"],
        comments: [],
        timeSpent: 2,
        attachments: []
    },
    {
        id: 3,
        title: "Preparar relatório trimestral de desempenho financeiro Q3",
        description: "Compilar dados de performance dos últimos 3 meses e preparar relatório para apresentação à direção. Incluir análise de KPIs e projeções.",
        assignedTo: 4,
        assignedBy: 1,
        department: "Financeiro",
        dueDate: "2024-11-25",
        status: "in-progress" as "in-progress" | "pending" | "completed",
        priority: "high" as "high" | "medium" | "low",
        progress: 40,
        tags: ["relatório", "financeiro", "trimestral", "urgente"],
        comments: [
            { id: 3, userId: 4, content: "Aguardando dados do departamento de operações para completar a análise de custos.", timestamp: "2024-11-15T16:45:00Z" }
        ],
        timeSpent: 8,
        attachments: [{ name: "dados-setembro.xlsx", size: "3.2 MB", type: "excel" }]
    },
    {
        id: 4,
        title: "Review de SEO para blog corporativo e otimização de artigos",
        description: "Analisar performance do blog, identificar palavras-chave de oportunidade e otimizar os 10 artigos mais populares para melhor ranking nos motores de busca.",
        assignedTo: 2,
        assignedBy: 3,
        department: "Marketing",
        dueDate: "2024-11-28",
        status: "completed" as "in-progress" | "pending" | "completed",
        priority: "low" as "high" | "medium" | "low",
        progress: 100,
        tags: ["seo", "blog", "marketing-conteudo"],
        comments: [],
        timeSpent: 16,
        attachments: [{ name: "relatorio_seo_outubro.pdf", size: "1.2 MB", type: "pdf" }]
    }
];

export const meetings = [
    {
        id: 1,
        title: "Reunião de Planeamento - Campanha Q4",
        description: "Discussão da estratégia de marketing para o último trimestre e preparação do lançamento da nova conta digital 'Conta Pro'.",
        department: "Marketing",
        date: "2024-11-20",
        time: "14:00",
        duration: 60,
        participants: [2, 3],
        status: "scheduled" as "scheduled" | "active" | "completed",
    },
    {
        id: 2,
        title: "Review Mensal de Projetos Estratégicos",
        description: "Análise do progresso dos projetos em andamento, identificação de bloqueios e ajustes de planeamento para garantir o cumprimento dos prazos.",
        department: "Geral",
        date: "2024-11-25",
        time: "10:00",
        duration: 90,
        participants: [1, 2, 3, 4, 5],
        status: "scheduled" as "scheduled" | "active" | "completed",
    },
    {
        id: 3,
        title: "Workshop de Inovação Digital e Fintechs",
        description: "Sessão de brainstorming para identificar oportunidades de inovação nos serviços bancários, analisando o mercado de fintechs.",
        department: "Tecnologia",
        date: "2024-12-05",
        time: "09:30",
        duration: 120,
        participants: [1, 2, 4],
        status: "scheduled" as "scheduled" | "active" | "completed",
    }
];

export const departments = [
    { id: 1, name: "Marketing", slug: "marketing", head: 3, memberCount: 12, budget: 450000, projects: 8, description: "Responsável pela imagem da marca, estratégias de comunicação, campanhas publicitárias e marketing digital.", goals: ["Aumentar notoriedade da marca em 25%", "Lançar 3 novas campanhas digitais", "Aumentar leads qualificados em 40%"] },
    { id: 2, name: "Financeiro", slug: "finance", head: 4, memberCount: 8, budget: 1200000, projects: 5, description: "Gestão financeira, contabilidade, tesouraria, planeamento e relatórios económicos para a tomada de decisão.", goals: ["Reduzir custos operacionais em 15%", "Otimizar fluxo de caixa", "Melhorar precisão das previsões financeiras"] },
    { id: 3, name: "Recursos Humanos", slug: "hr", head: 5, memberCount: 6, budget: 300000, projects: 3, description: "Gestão de talentos, desenvolvimento profissional, recrutamento, e promoção do bem-estar dos colaboradores.", goals: ["Reduzir turnover para 8%", "Implementar novo programa de formação contínua", "Melhorar índice de satisfação dos colaboradores"] },
    { id: 4, name: "Tecnologia", slug: "it", head: 1, memberCount: 15, budget: 2000000, projects: 12, description: "Desenvolvimento e manutenção de sistemas, infraestrutura tecnológica, segurança da informação e suporte técnico.", goals: ["Migrar 50% dos sistemas para a cloud", "Implementar nova API de Open Banking", "Reduzir tempo de resposta de incidentes em 30%"] },
    { id: 5, name: "Operações", slug: "operations", head: 1, memberCount: 10, budget: 800000, projects: 6, description: "Otimização de processos operacionais bancários, gestão da qualidade, e eficiência dos serviços.", goals: ["Aumentar eficiência operacional em 20%", "Reduzir tempo de processamento de transações", "Automatizar 5 processos manuais"] },
    { id: 6, name: "Compliance", slug: "compliance", head: 1, memberCount: 5, budget: 400000, projects: 4, description: "Garantia de conformidade com regulamentações financeiras, políticas internas e prevenção de riscos.", goals: ["Implementar novo sistema de monitorização de transações (AML)", "Realizar auditorias de conformidade trimestrais", "Atualizar todas as políticas internas (RGPD, etc)"] },
    { id: 7, name: "Segurança", slug: "security", head: 1, memberCount: 4, budget: 600000, projects: 3, description: "Proteção de dados, cibersegurança, segurança física das instalações e prevenção de fraudes.", goals: ["Implementar autenticação multi-fator (MFA) para todos os sistemas críticos", "Realizar testes de penetração trimestrais", "Reduzir falsos positivos em alertas de fraude em 15%"] },
];

export const projects = [
    {
        id: 1,
        name: "Lançamento Novo Produto Digital 'Conta Pro'",
        department: "Marketing",
        progress: 65,
        status: "active",
        startDate: "2024-10-01",
        endDate: "2024-12-31",
        members: [2, 3],
        budget: 250000,
        spent: 156000,
        tasksCount: 24,
        completedTasks: 16,
        description: "Desenvolvimento e lançamento da nova conta digital 'Conta Pro' com funcionalidades avançadas para empresas e freelancers. O projeto inclui desde a concepção da campanha até a execução e análise de resultados.",
        risks: "Concorrência agressiva no segmento, possíveis atrasos no desenvolvimento técnico da app."
    },
    {
        id: 2,
        name: "Modernização da Plataforma de Homebanking",
        department: "Tecnologia",
        progress: 30,
        status: "active",
        startDate: "2024-09-15",
        endDate: "2025-03-31",
        members: [1, 2, 4],
        budget: 500000,
        spent: 145000,
        tasksCount: 45,
        completedTasks: 14,
        description: "Atualização completa da plataforma de homebanking com nova interface (UI/UX), migração para nova arquitetura de micro-serviços e implementação de novas funcionalidades de gestão financeira pessoal (PFM).",
        risks: "Compatibilidade com sistemas legados, segurança durante a transição de dados dos clientes."
    },
    {
        id: 3,
        name: "Otimização de Processos Operacionais com RPA",
        department: "Operações",
        progress: 20,
        status: "planning",
        startDate: "2024-12-01",
        endDate: "2025-06-30",
        members: [4, 5],
        budget: 350000,
        spent: 45000,
        tasksCount: 18,
        completedTasks: 4,
        description: "Reengenharia de processos para aumentar eficiência e reduzir custos operacionais através da implementação de Robotic Process Automation (RPA) em tarefas manuais e repetitivas.",
        risks: "Resistência à mudança por parte dos colaboradores, necessidade de formação extensiva para as novas ferramentas."
    }
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

export const calendarEvents = [
    { id: 1, title: "Reunião de Equipa - Marketing", description: "Reunião semanal da equipa de Marketing", start: "2024-11-20T10:00:00", end: "2024-11-20T11:00:00", createdBy: 3, participants: [2, 3], type: "meeting", department: "Marketing", location: "Sala de Reuniões A", color: "purple" },
    { id: 2, title: "Apresentação aos Investidores", description: "Apresentação dos resultados do trimestre aos investidores", start: "2024-11-22T14:00:00", end: "2024-11-22T16:00:00", createdBy: 1, participants: [1, 3, 4], type: "presentation", department: "Administração", location: "Auditório Principal", color: "blue" },
    { id: 3, title: "Workshop de Inovação", description: "Workshop sobre tendências de inovação no sector bancário", start: "2024-11-25T09:00:00", end: "2024-11-25T13:00:00", createdBy: 1, participants: [1, 2, 3, 4, 5], type: "workshop", department: "Tecnologia", location: "Centro de Formação", color: "green" },
];

export const cloudFiles = [
    { id: 1, name: 'Orçamento_2025.xlsx', size: '1.2 MB', type: 'excel', lastModified: '2024-11-15T10:30:00Z', sharedWith: [4] },
    { id: 2, name: 'Apresentacao_Q3.pptx', size: '8.5 MB', type: 'powerpoint', lastModified: '2024-11-12T15:00:00Z', sharedWith: [1, 3] },
    { id: 3, name: 'Minutas_reuniao_estrategia.docx', size: '350 KB', type: 'word', lastModified: '2024-11-10T11:00:00Z', sharedWith: [] },
    { id: 4, name: 'Design_System_v2.fig', size: '22.1 MB', type: 'figma', lastModified: '2024-11-08T18:00:00Z', sharedWith: [3] },
    { id: 5, name: 'Logos_Campanha_Natal.zip', size: '15.8 MB', type: 'zip', lastModified: '2024-11-05T12:00:00Z', sharedWith: [] },
];

export const messages = {
    "geral": [
        { id: 1, userId: 1, content: "Bem-vindos ao Oryon Enterprise! 🎉 A nova plataforma de colaboração do STANDARD BANK.", timestamp: "2024-11-01T09:00:00Z", reactions: [{ userId: 2, emoji: "👍" }, { userId: 3, emoji: "🎉" }] },
        { id: 2, userId: 3, content: "Lembrando que temos reunião de departamento amanhã às 10h. Por favor tragam as atualizações dos vossos projetos.", timestamp: "2024-11-15T16:30:00Z", reactions: [{ userId: 2, emoji: "👌" }, { userId: 4, emoji: "👍" }] },
        { id: 3, userId: 4, content: "Partilho o relatório financeiro do último trimestre para revisão.", timestamp: "2024-11-16T11:20:00Z", attachments: [{ name: "relatorio-trimestral-q3.pdf", size: "4.8 MB", type: "pdf" }], reactions: [] },
    ],
    "marketing": [
        { id: 1, userId: 3, content: "@Edmundo Kutuzov, você pode preparar os mockups para a nova campanha? Precisamos apresentar na reunião de quinta-feira.", timestamp: "2024-11-16T09:15:00Z", reactions: [{ userId: 2, emoji: "👍" }] },
        { id: 2, userId: 2, content: "Claro, Maria! Já estou trabalhando nisso. Vou partilhar os primeiros drafts amanhã.", timestamp: "2024-11-16T09:20:00Z", reactions: [{ userId: 3, emoji: "👏" }] },
        { id: 3, userId: 2, content: "Aqui estão os primeiros conceitos para a campanha. O que acham?", timestamp: "2024-11-17T14:30:00Z", attachments: [{ name: "conceito-campanha-v1.pdf", size: "12.3 MB", type: "pdf" }, { name: "mockups-digital.jpg", size: "3.7 MB", type: "image" }], reactions: [{ userId: 3, emoji: "❤️" }, { userId: 1, emoji: "🔥" }] },
    ]
};

// Mock functions to simulate a backend
export const getCurrentUser = () => users.find(u => u.email === 'edmundo.kutuzov@standardbank.com')!;
export const getTasksForUser = (userId: number) => tasks.filter(t => t.assignedTo === userId);
export const getUpcomingMeetings = (userId: number) => meetings.filter(m => m.participants.includes(userId) && m.status === 'scheduled');
export const getProjectsForUser = (userId: number) => projects.filter(p => p.members.includes(userId));
export const getDepartment = (slug: string) => departments.find(d => d.slug === slug);
export const getDepartmentMembers = (deptName: string) => users.filter(u => u.department === deptName);
export const getDepartmentProjects = (deptName: string) => projects.filter(p => p.department === deptName);
export const getCalendarEventsForUser = (userId: number) => calendarEvents.filter(event => event.participants.includes(userId) || event.createdBy === userId);
