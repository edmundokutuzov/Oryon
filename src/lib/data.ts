

// This file mocks a database.
// In a real application, you would fetch this data from a server.

import { UserRole, ROLES } from "@/config/roles";

type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole; // Using the new UserRole type
    department: string;
    avatar: string;
    status: "online" | "away" | "busy" | "offline" | "dnd";
    lastSeen: string;
    bio: string;
    phone: string;
    location: string;
}

export const users: User[] = [
    {
        id: 1,
        name: "Admin Sistema",
        email: "admin@txunabet.com",
        password: "Oryon@2024!",
        role: ROLES.ADMIN, // Admin role
        department: "Administração",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTk3Nzk4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        status: "online",
        lastSeen: new Date().toISOString(),
        bio: "Administrador do sistema Oryon, garantindo a segurança e a operacionalidade da plataforma.",
        phone: "+258 84 123 4567",
        location: "Maputo, Moçambique",
    },
    {
        id: 2,
        name: "Edmundo Kutuzov",
        email: "edmundo.kutuzov@txunabet.com",
        password: "Oryon@2024!",
        role: ROLES.CONTENT_MANAGER, // Content Manager role
        department: "Marketing",
        avatar: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTk3Nzk4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        status: "online",
        lastSeen: new Date().toISOString(),
        bio: "Designer criativo especializado em campanhas digitais e identidade visual. Apaixonado por interfaces intuitivas.",
        phone: "+258 84 234 5678",
        location: "Maputo, Moçambique",
    },
    {
        id: 3,
        name: "Maria Silva",
        email: "maria.silva@txunabet.com",
        password: "Oryon@2024!",
        role: ROLES.CONTENT_MANAGER, // Content Manager role
        department: "Marketing",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTk3Nzk4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        status: "online",
        lastSeen: new Date().toISOString(),
        bio: "Chefe de Departamento de Marketing com 10 anos de experiência em estratégia digital e gestão de equipas.",
        phone: "+258 84 345 6789",
        location: "Maputo, Moçambique",
    },
    {
        id: 4,
        name: "Carlos Santos",
        email: "carlos.santos@txunabet.com",
        password: "Oryon@2024!",
        role: ROLES.RISK_ANALYST, // Risk Analyst role
        department: "Financeiro",
        avatar: "https://images.unsplash.com/photo-1583195764359-c67133f93a74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxibGFjayUyMG1hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc1OTc4ODQ4OHww&ixlib=rb-4.1.0&q=80&w=1080",
        status: "away",
        lastSeen: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        bio: "Analista financeiro especializado em relatórios trimestrais e análise de risco.",
        phone: "+258 84 456 7890",
        location: "Maputo, Moçambique",
    },
    {
        id: 5,
        name: "Ana Costa",
        email: "ana.costa@txunabet.com",
        password: "Oryon@2024!",
        role: ROLES.SUPPORT_AGENT, // Support Agent role
        department: "Recursos Humanos",
        avatar: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTk3Nzk4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        status: "busy",
        lastSeen: new Date().toISOString(),
        bio: "Gestora de RH focada em desenvolvimento organizacional, recrutamento e bem-estar dos colaboradores.",
        phone: "+258 84 567 8901",
        location: "Maputo, Moçambique",
    },
    // ... other users with their respective roles
];

export const tasks = [
    // --- Marketing Tasks ---
    {
        id: 1,
        title: "Criar campanha publicitária para 'Bónus de Boas-Vindas'",
        description: "Desenvolver conceito criativo e materiais para campanha do novo bónus de boas-vindas. Foco em mídia digital e redes sociais.",
        projectId: 1,
        assignedTo: [2, 13, 14],
        createdBy: 3,
        priority: "urgent" as "urgent" | "high" | "medium" | "low",
        status: "in-progress" as "backlog" | "todo" | "in-progress" | "blocked" | "done",
        labels: ["design", "campanha", "2024-Q4"],
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 days from now
        progress: 65,
        attachments: [
            { name: "conceito-campanha.pdf", size: "2.4 MB", type: "pdf" },
            { name: "mockups-v1.psd", size: "15.7 MB", type: "psd" },
        ],
        checklist: [
            { id: 'c1-1', text: 'Definir público-alvo e personas', checked: true },
            { id: 'c1-2', text: 'Criar mockups iniciais para anúncios', checked: true },
            { id: 'c1-3', text: 'Aprovar copywriting com a equipa de Compliance', checked: false },
            { id: 'c1-4', text: 'Agendar posts nas redes sociais', checked: false },
        ],
        dependencies: [],
        watchers: [1, 3],
        commentsCount: 5,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 2,
        title: "Atualizar banners do website com odds da Champions League",
        description: "Revisar e atualizar os banners da página principal para refletir as odds dos jogos da próxima jornada da Champions League.",
        projectId: null,
        assignedTo: [2],
        createdBy: 3,
        priority: "medium" as "urgent" | "high" | "medium" | "low",
        status: "todo" as "backlog" | "todo" | "in_progress" | "blocked" | "done",
        labels: ["branding", "design", "sportsbook"],
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 10,
        attachments: [],
        checklist: [],
        dependencies: [],
        watchers: [3],
        commentsCount: 1,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    // --- Finance Tasks ---
    {
        id: 3,
        title: "Análise Semanal de GGR (Gross Gaming Revenue)",
        description: "Compilar dados de GGR dos últimos 7 dias e preparar relatório de performance por vertical (Sportsbook, Casino).",
        projectId: null,
        assignedTo: [4, 6],
        createdBy: 26,
        priority: "high" as "urgent" | "high" | "medium" | "low",
        status: "in-progress" as "backlog" | "todo" | "in_progress" | "blocked" | "done",
        labels: ["relatório", "financeiro", "ggr"],
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 40,
        attachments: [{ name: "dados-ggr.xlsx", size: "3.2 MB", type: "excel" }],
        checklist: [
            { id: 'c3-1', text: 'Extrair dados do sistema de reporting', checked: true },
            { id: 'c3-2', text: 'Analisar desvios face à previsão', checked: false },
            { id: 'c3-3', text: 'Elaborar sumário executivo com principais conclusões', checked: false },
        ],
        dependencies: [],
        watchers: [25, 26],
        commentsCount: 2,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    // --- IT Tasks ---
    {
        id: 5,
        title: "Auditoria de Segurança dos Servidores de Jogos",
        description: "Realizar uma auditoria completa de segurança para identificar e corrigir vulnerabilidades nos servidores de jogos online.",
        projectId: 2,
        assignedTo: [12, 23],
        createdBy: 1,
        priority: "high" as "urgent" | "high" | "medium" | "low",
        status: "in-progress" as "backlog" | "todo" | "in_progress" | "blocked" | "done",
        labels: ["segurança", "cloud", "auditoria"],
        dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 30,
        attachments: [{ name: "checklist-auditoria-pci.docx", size: "150 KB", type: "docx" }],
        checklist: [
            {id: 'c5-1', text: 'Verificar configurações de firewall', checked: true},
            {id: 'c5-2', text: 'Analisar logs de acesso', checked: false},
            {id: 'c5-3', text: 'Realizar scan de vulnerabilidades', checked: false},
        ],
        dependencies: [],
        watchers: [1, 19],
        commentsCount: 0,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 6,
        title: "Desenvolver Dashboard de Monitorização de KPIs de Risco",
        description: "Criar um novo dashboard em tempo real para monitorizar os KPIs de risco, como atividade suspeita, limites de aposta e exposição por mercado.",
        projectId: 2,
        assignedTo: [9, 20],
        createdBy: 28,
        priority: "medium" as "urgent" | "high" | "medium" | "low",
        status: "backlog" as "backlog" | "todo" | "in_progress" | "blocked" | "done",
        labels: ["dashboard", "kpi", "risco", "frontend"],
        dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 5,
        attachments: [],
        checklist: [],
        dependencies: [],
        watchers: [1, 28, 7],
        commentsCount: 0,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    // --- HR Tasks ---
    {
        id: 7,
        title: "Organizar evento de team-building de final de ano",
        description: "Planear e organizar o evento de final de ano para todos os colaboradores, incluindo logística, catering e atividades.",
        projectId: null,
        assignedTo: [5, 16],
        createdBy: 5,
        priority: "medium" as "urgent" | "high" | "medium" | "low",
        status: "done" as "backlog" | "todo" | "in_progress" | "blocked" | "done",
        labels: ["evento", "rh", "cultura"],
        dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 100,
        attachments: [{ name: "propostas-locais.pdf", size: "5.5 MB", type: "pdf" }],
        checklist: [
            {id: 'c7-1', text: 'Reservar local', checked: true},
            {id: 'c7-2', text: 'Contratar catering', checked: true},
            {id: 'c7-3', text: 'Enviar convites', checked: true},
        ],
        dependencies: [],
        watchers: [24, 25, 26],
        commentsCount: 12,
        createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    // --- Compliance & Operations ---
    {
        id: 8,
        title: "Revisar e Aprovar Política de Jogo Responsável",
        description: "A equipa de Compliance precisa de rever a nova Política de Jogo Responsável antes da sua publicação.",
        projectId: null,
        assignedTo: [11, 29, 32],
        createdBy: 27,
        priority: "high" as "urgent" | "high" | "medium" | "low",
        status: "blocked" as "backlog" | "todo" | "in_progress" | "blocked" | "done",
        labels: ["compliance", "aml", "revisão"],
        dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 50,
        attachments: [{ name: "jogo-responsavel-draft-v3.docx", size: "250 KB", type: "docx" }],
        checklist: [],
        dependencies: [],
        watchers: [27, 25],
        commentsCount: 3,
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
     {
        id: 9,
        title: "Implementar API de verificação de identidade (KYC)",
        description: "Integrar a API de um fornecedor externo para automatizar o processo de verificação de identidade (Know Your Customer) no registo de novos utilizadores.",
        projectId: 2,
        assignedTo: [9, 18],
        createdBy: 1,
        priority: "high" as "urgent" | "high" | "medium" | "low",
        status: "todo" as "backlog" | "todo" | "in_progress" | "blocked" | "done",
        labels: ["api", "backend", "kyc"],
        dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 0,
        attachments: [],
        checklist: [
            {id: 'c9-1', text: 'Definir schema do endpoint', checked: false},
            {id: 'c9-2', text: 'Implementar lógica de negócio', checked: false},
            {id: 'c9-3', text: 'Escrever testes unitários e de integração', checked: false},
            {id: 'c9-4', text: 'Documentar na plataforma de desenvolvedores', checked: false},
        ],
        dependencies: [],
        watchers: [1, 28, 22],
        commentsCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 10,
        title: "Análise de performance SEO de mercados de apostas",
        description: "Analisar performance de SEO para os principais mercados de apostas, identificar palavras-chave de oportunidade e otimizar páginas para melhorar ranking no Google.",
        projectId: 1,
        assignedTo: [13],
        createdBy: 3,
        priority: "low" as "urgent" | "high" | "medium" | "low",
        status: "done" as "backlog" | "todo" | "in_progress" | "blocked" | "done",
        labels: ["seo", "marketing", "sportsbook"],
        dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 100,
        attachments: [{ name: "relatorio_seo_outubro.pdf", size: "1.2 MB", type: "pdf" }],
        checklist: [
             {id: 'c10-1', text: 'Análise de keywords concluída', checked: true},
             {id: 'c10-2', text: 'Otimização de 10 artigos concluída', checked: true},
        ],
        dependencies: [],
        watchers: [3],
        commentsCount: 4,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
];

export const meetings = [
    {
        id: 1,
        title: "Reunião de Planeamento - Campanha de Natal",
        description: "Discussão da estratégia de marketing para o Natal, incluindo bónus e promoções especiais.",
        department: "Marketing",
        date: new Date().toISOString().split('T')[0],
        time: "14:00",
        duration: 60,
        participants: [2, 3, 13, 14, 1],
        status: "active" as "scheduled" | "active" | "completed",
        location: "Videochamada",
        type: "meeting"
    },
    {
        id: 2,
        title: "Review Mensal de Risco e Fraude",
        description: "Análise dos padrões de fraude, atividade suspeita e eficácia das regras de risco atuais.",
        department: "Risco e Fraude",
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: "10:00",
        duration: 90,
        participants: [1, 7, 11, 22, 29, 26, 28],
        status: "scheduled" as "scheduled" | "active" | "completed",
        location: "Sala de Reuniões 3",
        type: "meeting"
    },
    {
        id: 3,
        title: "Workshop de Novas Funcionalidades da Plataforma",
        description: "Sessão de brainstorming para identificar oportunidades de novas funcionalidades para o Sportsbook e Casino.",
        department: "Plataforma",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: "09:30",
        duration: 120,
        participants: [1, 2, 9, 18, 20, 28, 34],
        status: "scheduled" as "scheduled" | "active" | "completed",
        location: "Auditório",
        type: "workshop"
    }
];

export const departments = [
    { id: 1, name: "Marketing", slug: "marketing", head: 3, memberCount: 4, budget: 450000, projects: 8, description: "Responsável pela imagem da marca, estratégias de comunicação, campanhas publicitárias e marketing digital.", goals: ["Aumentar notoriedade da marca em 25%", "Lançar 3 novas campanhas digitais", "Aumentar leads qualificados em 40%"] },
    { id: 2, name: "Financeiro", slug: "finance", head: 26, memberCount: 4, budget: 1200000, projects: 5, description: "Gestão financeira, contabilidade, tesouraria, planeamento e relatórios económicos para a tomada de decisão.", goals: ["Reduzir custos operacionais em 15%", "Otimizar fluxo de caixa", "Melhorar precisão das previsões finance"] },
    { id: 3, name: "Recursos Humanos", slug: "hr", head: 5, memberCount: 3, budget: 300000, projects: 3, description: "Gestão de talentos, desenvolvimento profissional, recrutamento, e promoção do bem-estar dos colaboradores.", goals: ["Reduzir turnover para 8%", "Implementar novo programa de formação contínua", "Melhorar índice de satisfação dos colaboradores"] },
    { id: 4, name: "Plataforma", slug: "it", head: 1, memberCount: 4, budget: 2000000, projects: 12, description: "Desenvolvimento e manutenção de sistemas, infraestrutura tecnológica, e suporte técnico da plataforma de apostas.", goals: ["Garantir uptime de 99.99%", "Implementar nova API de Odds", "Reduzir tempo de resposta de incidentes em 30%"] },
    { id: 5, name: "Operações", slug: "operations", head: 34, memberCount: 5, budget: 800000, projects: 6, description: "Otimização de processos operacionais, gestão da qualidade, e eficiência dos serviços.", goals: ["Aumentar eficiência operacional em 20%", "Reduzir tempo de processamento de transações", "Automatizar 5 processos manuais"] },
    { id: 6, name: "Risco e Fraude", slug: "compliance", head: 29, memberCount: 5, budget: 400000, projects: 4, description: "Garantia de conformidade com regulamentações, políticas internas e prevenção de riscos de fraude e lavagem de dinheiro.", goals: ["Implementar novo sistema de monitorização de transações (AML)", "Realizar auditorias de conformidade trimestrais", "Atualizar todas as políticas internas"] },
    { id: 7, name: "Segurança", slug: "security", head: 12, memberCount: 2, budget: 600000, projects: 3, description: "Proteção de dados, cibersegurança, e prevenção de ataques à plataforma.", goals: ["Implementar autenticação multi-fator (MFA) para todos os sistemas críticos", "Realizar testes de penetração trimestrais", "Reduzir falsos positivos em alertas de fraude em 15%"] },
    { id: 8, name: "Administração", slug: "administration", head: 25, memberCount: 4, budget: 100000, projects: 1, description: "Gestão geral e administrativa da plataforma Oryon.", goals: [] },
];

export const projects = [
    {
        id: 1,
        name: "Campanha de Marketing Q4 - Bónus de Natal",
        department: "Marketing",
        progress: 65,
        status: "active",
        startDate: "2024-10-01",
        endDate: "2024-12-31",
        members: [2, 3, 13, 14],
        budget: 250000,
        spent: 156000,
        tasksCount: 24,
        completedTasks: 16,
        description: "Desenvolvimento e lançamento da campanha de marketing de Natal, com foco em bónus de depósito, apostas grátis e promoções sazonais.",
        risks: "Concorrência agressiva no período natalício, ROI abaixo do esperado."
    },
    {
        id: 2,
        name: "Desenvolvimento da Nova App Mobile Txuna Bet",
        department: "Plataforma",
        progress: 30,
        status: "active",
        startDate: "2024-09-15",
        endDate: "2025-03-31",
        members: [1, 2, 4, 9, 18, 19, 20],
        budget: 500000,
        spent: 145000,
        tasksCount: 45,
        completedTasks: 14,
        description: "Desenvolvimento da nova aplicação móvel nativa para iOS e Android, com nova interface (UI/UX) e funcionalidades melhoradas.",
        risks: "Atrasos na aprovação pelas App Stores, problemas de performance em dispositivos mais antigos."
    },
    {
        id: 3,
        name: "Otimização do Motor de Risco",
        department: "Risco e Fraude",
        progress: 20,
        status: "planning",
        startDate: "2024-12-01",
        endDate: "2025-06-30",
        members: [4, 5, 10, 34, 35, 36, 37],
        budget: 350000,
        spent: 45000,
        tasksCount: 18,
        completedTasks: 4,
        description: "Melhoria do motor de análise de risco para detetar padrões de apostas suspeitas e fraude de forma mais eficaz, usando machine learning.",
        risks: "Complexidade do modelo de ML, necessidade de grande volume de dados para treino."
    }
];


export const menuItems = [
    {
        title: 'Navegação',
        items: [
            { id: 'dashboard', title: 'Dashboard', permissions: [] },
            { id: 'pulse', title: 'Pulse', permissions: [] },
            { id: 'workspaces', title: 'Workspaces', permissions: [] },
            { id: 'tasks', title: 'Minhas Tarefas', badge: 5, permissions: [] },
            { id: 'projects', title: 'Projetos', permissions: [] },
            { id: 'meetings', title: 'Reuniões', badge: 2, permissions: [] },
            { id: 'calendar', title: 'Calendário', permissions: [] },
            { id: 'team', title: 'Equipa', permissions: [] },
            { id: 'cloud', title: 'Minha Nuvem', permissions: [] },
        ],
    },
    {
        title: 'Departamentos',
        action: true,
        items: [
            { id: 'departments/marketing', title: 'Marketing', department: 'marketing', status: 'online', permissions: [] },
            { id: 'departments/finance', title: 'Financeiro', department: 'finance', status: 'online', permissions: [] },
            { id: 'departments/hr', title: 'Recursos Humanos', department: 'hr', status: 'away', permissions: [] },
            { id: 'departments/it', title: 'Plataforma', department: 'it', status: 'online', permissions: [] },
            { id: 'departments/operations', title: 'Operações', department: 'operations', status: 'busy', permissions: [] },
            { id: 'departments/compliance', title: 'Risco e Fraude', department: 'compliance', status: 'online', permissions: [] },
            { id: 'departments/security', title: 'Segurança', department: 'security', status: 'dnd', permissions: [] },
        ],
    },
    {
        title: 'Comunicação',
        items: [
            { id: 'chat/general', title: 'Chat Geral', badge: 12, permissions: [] },
            { id: 'chat/department', title: 'Chat de Departamento', badge: 3, permissions: [] },
            { id: 'chat/direct', title: 'Mensagens Diretas', permissions: [] },
        ],
    },
    {
        title: 'Recursos',
        items: [
            { id: 'knowledge-base', title: 'Base de Conhecimento', permissions: [] },
            { id: 'documents', title: 'Documentos', permissions: [] },
            { id: 'reports', title: 'Relatórios', permissions: [] },
            { id: 'analytics', title: 'Analytics', permissions: ['admin'] },
        ],
    },
    {
        title: 'Ferramentas',
        items: [
            { id: 'workflows', title: 'Workflows', permissions: [] },
            { id: 'automations', title: 'Automações', permissions: [] },
            { id: 'integrations', title: 'Integrações', permissions: [] },
            { id: 'document-editor', title: 'Editor de Documentos', permissions: [] },
        ],
    },
    {
        title: 'Configurações',
        items: [
            { id: 'profile', title: 'Meu Perfil', permissions: [] },
            { id: 'settings', title: 'Configurações', permissions: [] },
            { id: 'security', title: 'Segurança', permissions: [] },
        ],
    },
];

export const knowledgeBase = [
    {
        id: 1,
        title: "Guia de Boas-Vindas à Txuna Bet",
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
        title: "Como Gerir Limites de Aposta de Utilizadores",
        category: "Risco e Fraude",
        views: 2340,
        tags: ["risco", "limites", "processo"]
    },
    {
        id: 4,
        title: "Brand Guidelines da Txuna Bet",
        category: "Marketing",
        views: 780,
        tags: ["marca", "design", "logo"]
    },
    {
        id: 5,
        title: "Procedimentos de Verificação de Identidade (KYC)",
        category: "Operações",
        views: 1560,
        tags: ["kyc", "utilizadores", "operações"]
    }
];

export const documents = [
    { id: 1, title: "Relatório de GGR Anual 2023", type: "PDF", size: "5.8 MB", lastModified: "2024-03-15" },
    { id: 2, title: "Plano de Marketing Q4 2024", type: "DOCX", size: "1.2 MB", lastModified: "2024-10-28" },
    { id: 3, title: "Apresentação Institucional", type: "PPTX", size: "12.3 MB", lastModified: "2024-09-05" },
    { id: 4, title: "Formulário de Avaliação de Desempenho", type: "PDF", size: "350 KB", lastModified: "2024-01-10" },
    { id: 5, title: "Templates para Redes Sociais", type: "ZIP", size: "25.5 MB", lastModified: "2024-11-02" },
];

export const reports = [
    { id: 1, title: "Performance de Mercados - Outubro 2024", summary: "Análise detalhada da performance por desporto e tipo de aposta.", type: "mensal", department: "Sportsbook" },
    { id: 2, title: "Análise de Churn de Utilizadores - Q3 2024", summary: "Resultados do estudo sobre a taxa de abandono de utilizadores e principais motivos.", type: "trimestral", department: "Marketing" },
    { id: 3, title: "Análise de Risco de Mercados", summary: "Relatório sobre a exposição da casa por mercado e evento.", type: "semanal", department: "Risco e Fraude" },
    { id: 4, title: "Performance da Campanha 'Bónus de Verão'", summary: "KPIs e ROI da campanha de verão.", type: "final", department: "Marketing" },
];

export const analyticsData = {
    userActivity: {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        data: [65, 59, 80, 81, 56, 55, 40]
    },
    projectProgress: {
        labels: ["Campanha Q4", "App Mobile", "Motor de Risco", "Otimização SEO"],
        data: [65, 30, 20, 100]
    }
};

export const workflows = [
    { id: 1, name: "Onboarding de Novo Colaborador", department: "Recursos Humanos", steps: 12 },
    { id: 2, name: "Gestão de Incidente de Segurança", department: "Segurança", steps: 5 },
    { id: 3, name: "Lançamento de Campanha de Marketing", department: "Marketing", steps: 8 },
    { id: 4, name: "Aprovação de Novo Mercado de Apostas", department: "Sportsbook", steps: 4 },
];

export const automations = [
    { id: 1, name: "Enviar email de boas-vindas a novos utilizadores", active: true },
    { id: 2, name: "Gerar relatório de GGR diário automaticamente", active: true },
    { id: 3, name: "Notificar gestor de risco sobre apostas de alto valor", active: true },
    { id: 4, name: "Criar ticket de suporte a partir de email para 'suporte@txunabet.com'", active: true },
    { id: 5, name: "Suspender mercados 5 minutos antes do início do evento", active: true },
    { id: 6, name: "Solicitar aprovação para pagamentos de afiliados acima de €5000", active: true },
    { id: 7, name: "Lembrete de jogos importantes do dia para equipa de traders", active: true },
    { id: 8, name: "Sincronizar eventos do calendário com o Google Calendar", active: false },
];

export const integrations = [
    { id: 1, name: "Slack", icon: "💬", connected: true },
    { id: 2, name: "Salesforce", icon: "☁️", connected: false },
    { id: 3, name: "GitHub", icon: "💻", connected: false },
    { id: 4, name: "Figma", icon: "🎨", connected: true },
    { id: 5, name: "Zoom", icon: "📹", connected: false },
    { id: 6, name: "Asana", icon: "✅", connected: true },
    { id: 7, name: "Zendesk", icon: "🎧", connected: false },
    { id: 8, name: "Stripe", icon: "💳", connected: false },
    { id: 9, name: "Mailchimp", icon: "🐵", connected: true }
];

export const nationalHolidays = [
    { date: "2024-01-01", name: "Dia de Ano Novo" },
    { date: "2024-02-03", name: "Dia dos Heróis Moçambicanos" },
    { date: "2024-04-07", name: "Dia da Mulher Moçambicana" },
    { date: "2024-05-01", name: "Dia Internacional dos Trabalhadores" },
    { date: "2024-06-25", name: "Dia da Independência Nacional" },
    { date: "2024-09-07", name: "Dia da Vitória" },
    { date: "2024-09-25", name: "Dia das Forças Armadas de Defesa de Moçambique" },
    { date: "2024-10-04", name: "Dia da Paz e Reconciliação" },
    { date: "2024-12-25", name: "Dia da Família" },
];

export const calendarEvents = [
    { id: 1, title: "Reunião de Equipa - Marketing", description: "Reunião semanal da equipa de Marketing", start: "2024-11-20T10:00:00", end: "2024-11-20T11:00:00", createdBy: 3, participants: [2, 3, 13, 14], type: "meeting", department: "Marketing", location: "Sala de Reuniões A", color: "purple" },
    { id: 2, title: "Apresentação aos Investidores", description: "Apresentação dos resultados do trimestre aos investidores", start: "2024-11-22T14:00:00", end: "2024-11-22T16:00:00", createdBy: 1, participants: [1, 3, 4, 26, 28], type: "presentation", department: "Administração", location: "Auditório Principal", color: "blue" },
    { id: 3, title: "Workshop de Inovação", description: "Workshop sobre tendências de inovação no sector de apostas", start: "2024-11-25T09:00:00", end: "2024-11-25T13:00:00", createdBy: 1, participants: [1, 2, 3, 4, 5, 9, 18], type: "workshop", department: "Plataforma", location: "Centro de Formação", color: "green" },
];

export const cloudFiles = [
    { id: 1, name: 'Orçamento_2025.xlsx', size: '1.2 MB', type: 'excel', lastModified: '2024-11-15T10:30:00Z', sharedWith: [4] },
    { id: 2, name: 'Apresentacao_Q3.pptx', size: '8.5 MB', type: 'powerpoint', lastModified: '2024-11-12T15:00:00Z', sharedWith: [1, 3, 26, 28] },
    { id: 3, name: 'Minutas_reuniao_estrategia.docx', size: '350 KB', type: 'word', lastModified: '2024-11-10T11:00:00Z', sharedWith: [] },
    { id: 4, name: 'Design_System_v2.fig', size: '22.1 MB', type: 'figma', lastModified: '2024-11-08T18:00:00Z', sharedWith: [2, 3] },
    { id: 5, name: 'Logos_Campanha_Natal.zip', size: '15.8 MB', type: 'zip', lastModified: '2024-11-05T12:00:00Z', sharedWith: [13, 14] },
];

export type Workspace = {
    id: string;
    name: string;
    description: string;
    members: number[];
    owner_id: number;
    privacy: 'public' | 'private';
    linked_tasks: number[];
    linked_projects: number[];
    linked_files: number[];
    linked_chat_channel_id: string;
    linked_knowledge_base_articles: number[];
};

export const workspaces: Workspace[] = [
    {
        id: 'ws-marketing-q4',
        name: "Campanha de Natal Q4",
        description: "Workspace central para a campanha de marketing do 4º trimestre, focada nas promoções de Natal.",
        owner_id: 3,
        members: [2, 3, 13, 14],
        privacy: 'private',
        linked_tasks: [1, 2, 4],
        linked_projects: [1],
        linked_files: [4, 5],
        linked_chat_channel_id: "workspace_chat_1",
        linked_knowledge_base_articles: [4]
    },
    {
        id: 'ws-tech-homebanking',
        name: "Nova App Mobile",
        description: "Projeto de tecnologia para o desenvolvimento da nova app mobile nativa.",
        owner_id: 1,
        members: [1, 2, 4, 9, 18, 19, 20],
        privacy: 'private',
        linked_tasks: [6],
        linked_projects: [2],
        linked_files: [],
        linked_chat_channel_id: "workspace_chat_2",
        linked_knowledge_base_articles: []
    }
];

export type FeedItem = {
    item_id: string;
    timestamp: string;
    author_user_id: number | 'system';
    item_type: 'post' | 'poll' | 'kudos' | 'system_event';
    content: {
        text: string;
        media_urls?: { type: 'image' | 'video', url: string }[];
    };
    poll_options?: { option_id: string, text: string, votes: number }[];
    system_event_details?: {
        event: 'project.milestone.completed' | 'project.created' | 'user.joined';
        project_id?: number;
        project_name?: string;
        user_name?: string;
        department_name?: string;
        milestone_name?: string;
    };
    mentions?: number[];
    hashtags?: string[];
    reactions: { user_id: number, reaction_type: 'like' | 'celebrate' | 'idea' | 'thanks' }[];
    comments_count: number;
    is_pinned: boolean;
};

export const feedItems: FeedItem[] = [
    {
        item_id: 'pulse-1',
        timestamp: new Date().toISOString(),
        author_user_id: 1, // Admin
        item_type: 'post',
        content: { text: "<b>Anúncio Importante:</b> A partir da próxima segunda-feira, teremos um novo sistema de ponto eletrónico. Por favor, consultem o artigo na Base de Conhecimento para mais detalhes. #anuncios" },
        mentions: [],
        hashtags: ['anuncios', 'rh'],
        reactions: [{user_id: 2, reaction_type: 'like'}, {user_id: 5, reaction_type: 'like'}],
        comments_count: 2,
        is_pinned: true,
    },
    {
        item_id: 'pulse-2',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        author_user_id: 'system',
        item_type: 'system_event',
        content: { text: "O projeto 'Nova App Mobile Txuna Bet' foi iniciado." },
        system_event_details: {
            event: 'project.created',
            project_id: 2,
            project_name: 'Nova App Mobile Txuna Bet'
        },
        reactions: [],
        comments_count: 0,
        is_pinned: false,
    },
    {
        item_id: 'pulse-3',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        author_user_id: 2, // Edmundo
        item_type: 'post',
        content: { text: "Equipa de #design, partilho aqui algumas inspirações para a nova identidade visual. O que acham da abordagem com gradientes mais subtis? @Maria Silva, gostaria do seu feedback.", media_urls: [{ type: 'image', url: 'https://picsum.photos/seed/design-inspiration/800/400' }] },
        mentions: [3],
        hashtags: ['design', 'feedback', 'branding'],
        reactions: [{user_id: 3, reaction_type: 'idea'}, {user_id: 14, reaction_type: 'like'}, {user_id: 1, reaction_type: 'like'}],
        comments_count: 3,
        is_pinned: false,
    },
     {
        item_id: 'pulse-5',
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        author_user_id: 9, // Pedro Nunes
        item_type: 'post',
        content: { text: "Alguém tem experiência com a implementação de WebSockets para notificações em tempo real em larga escala? A pensar na arquitetura para a nova #appmobile. #devs #tecnologia" },
        mentions: [],
        hashtags: ['devs', 'tecnologia', 'appmobile'],
        reactions: [{user_id: 18, reaction_type: 'idea'}, {user_id: 20, reaction_type: 'idea'}],
        comments_count: 4,
        is_pinned: false,
    },
    {
        item_id: 'pulse-4',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        author_user_id: 'system',
        item_type: 'kudos',
        content: { text: "Parabéns à <b>Ana Costa</b> por ter recebido 'Kudos' do <b>Admin Sistema</b> pelo seu excelente trabalho na organização do evento de team-building! #cultura" },
        reactions: [{user_id: 3, reaction_type: 'celebrate'}, {user_id: 4, reaction_type: 'celebrate'}, {user_id: 2, reaction_type: 'celebrate'}],
        comments_count: 1,
        is_pinned: false,
    }
];


export const messages = {
    "geral": [
        { id: 1, userId: 1, content: "Bem-vindos ao Oryon Enterprise! 🎉 A nova plataforma de colaboração da Txuna Bet.", timestamp: "2024-11-01T09:00:00Z", reactions: [{ userId: 2, emoji: "👍" }, { userId: 3, emoji: "🎉" }] },
        { id: 2, userId: 3, content: "Lembrando que temos reunião de departamento amanhã às 10h. Por favor tragam as atualizações dos vossos projetos.", timestamp: "2024-11-15T16:30:00Z", reactions: [{ userId: 2, emoji: "👌" }, { userId: 4, emoji: "👍" }] },
        { id: 3, userId: 4, content: "Partilho o relatório financeiro do último trimestre para revisão.", timestamp: "2024-11-16T11:20:00Z", attachments: [{ name: "relatorio-trimestral-q3.pdf", size: "4.8 MB", type: "pdf" }], reactions: [] },
    ],
    "marketing": [
        { id: 1, userId: 3, content: "@Edmundo Kutuzov, você pode preparar os mockups para a nova campanha? Precisamos apresentar na reunião de quinta-feira.", timestamp: "2024-11-16T09:15:00Z", reactions: [{ userId: 2, emoji: "👍" }] },
        { id: 2, userId: 2, content: "Claro, Maria! Já estou trabalhando nisso. Vou partilhar os primeiros drafts amanhã.", timestamp: "2024-11-16T09:20:00Z", reactions: [{ userId: 3, emoji: "👏" }] },
        { id: 3, userId: 2, content: "Aqui estão os primeiros conceitos para a campanha. O que acham?", timestamp: "2024-11-17T14:30:00Z", attachments: [{ name: "conceito-campanha-v1.pdf", size: "12.3 MB", type: "pdf" }, { name: "mockups-digital.jpg", size: "3.7 MB", type: "image" }], reactions: [{ userId: 3, emoji: "❤️" }, { userId: 1, emoji: "🔥" }] },
    ],
    "workspace_chat_1": [
        { id: 1, userId: 3, content: "Equipa, bem-vindos ao workspace para o lançamento da 'Conta Pro'! Vamos manter toda a comunicação aqui.", timestamp: "2024-11-18T10:00:00Z", reactions: [] },
        { id: 2, userId: 2, content: "Excelente iniciativa! Já associei os meus ficheiros de design a este workspace.", timestamp: "2024-11-18T10:05:00Z", reactions: [] },
    ],
    "workspace_chat_2": [
        { id: 1, userId: 1, content: "Este é o canal dedicado para a modernização do homebanking. Por favor partilhem aqui todas as atualizações técnicas.", timestamp: "2024-11-18T11:00:00Z", reactions: [] }
    ]
};

// This is a mock function. In a real app, you'd get this from your auth state.
export const getCurrentUser = () => {
    // For now, let's pretend the logged in user is the Admin.
    // In a real scenario, this would be dynamically determined based on the authenticated user.
    const loggedInUserId = 1; // Or any other ID for testing purposes.
    const user = users.find(u => u.id === loggedInUserId);
    if (!user) {
        throw new Error("Could not find logged in user");
    }
    return user;
};


export const getTasksForUser = (userId: number) => tasks.filter(t => t.assignedTo.includes(userId));
export const getUpcomingMeetings = (userId: number) => meetings.filter(m => m.participants.includes(userId) && m.status === 'scheduled');
export const getProjectsForUser = (userId: number) => projects.filter(p => p.members.includes(userId));
export const getDepartment = (slug: string) => departments.find(d => d.slug === slug);
export const getDepartmentMembers = (deptName: string) => users.filter(u => u.department === deptName);
export const getDepartmentProjects = (deptName: string) => projects.filter(p => p.department === deptName);
export const getCalendarEventsForUser = (userId: number) => calendarEvents.filter(event => event.participants.includes(userId) || event.createdBy === userId);

export const getWorkspacesForUser = (userId: number) => workspaces.filter(w => w.members.includes(userId));
export const getWorkspaceById = (workspaceId: string) => workspaces.find(w => w.id === workspaceId);
export const getWorkspaceTasks = (taskIds: number[]) => tasks.filter(t => taskIds.includes(t.id));
export const getWorkspaceFiles = (fileIds: number[]) => cloudFiles.filter(f => fileIds.includes(f.id));

    

    
