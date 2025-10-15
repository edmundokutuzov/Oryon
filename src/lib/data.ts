

// This file mocks a database.
// In a real application, you would fetch this data from a server.

export const users = [
    {
        id: 1,
        name: "Admin Sistema",
        email: "admin@standardbank.com",
        password: "Oryon@2024!",
        role: "Administrador",
        department: "Administração",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTk3Nzk4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Administrador do sistema Oryon, garantindo a segurança e a operacionalidade da plataforma.",
        phone: "+258 84 123 4567",
        location: "Maputo, Moçambique",
        permissions: ["all", "2fa"],
    },
    {
        id: 2,
        name: "Edmundo Kutuzov",
        email: "edmundo.kutuzov@standardbank.com",
        password: "Oryon@2024!",
        role: "Lead Designer",
        department: "Marketing",
        avatar: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTk3Nzk4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Designer criativo especializado em campanhas digitais e identidade visual. Apaixonado por interfaces intuitivas.",
        phone: "+258 84 234 5678",
        location: "Maputo, Moçambique",
        permissions: ["read", "write", "comment"],
    },
    {
        id: 3,
        name: "Maria Silva",
        email: "maria.silva@standardbank.com",
        password: "Oryon@2024!",
        role: "Chefe de Dept.",
        department: "Marketing",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTk3Nzk4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Chefe de Departamento de Marketing com 10 anos de experiência em estratégia digital e gestão de equipas.",
        phone: "+258 84 345 6789",
        location: "Maputo, Moçambique",
        permissions: ["read", "write", "comment", "manage", "approve", "2fa"],
    },
    {
        id: 4,
        name: "Carlos Santos",
        email: "carlos.santos@standardbank.com",
        password: "Oryon@2024!",
        role: "Analista Financeiro",
        department: "Financeiro",
        avatar: "https://images.unsplash.com/photo-1583195764359-c67133f93a74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxibGFjayUyMG1hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc1OTc4ODQ4OHww&ixlib=rb-4.1.0&q=80&w=1080",
        status: "away" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        bio: "Analista financeiro especializado em relatórios trimestrais e análise de risco.",
        phone: "+258 84 456 7890",
        location: "Maputo, Moçambique",
        permissions: ["read", "write"],
    },
    {
        id: 5,
        name: "Ana Costa",
        email: "ana.costa@standardbank.com",
        password: "Oryon@2024!",
        role: "Gestora de RH",
        department: "Recursos Humanos",
        avatar: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTk3Nzk4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        status: "busy" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Gestora de RH focada em desenvolvimento organizacional, recrutamento e bem-estar dos colaboradores.",
        phone: "+258 84 567 8901",
        location: "Maputo, Moçambique",
        permissions: ["read", "write", "manage", "approve"],
    },
    {
        id: 6,
        name: "Sofia Ribeiro",
        email: "sofia.ribeiro@standardbank.com",
        password: "Oryon@2024!",
        role: "Controller",
        department: "Financeiro",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTk3Nzk4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Controller experiente com foco em relatórios financeiros e controlo de gestão.",
        phone: "+258 84 678 9012",
        location: "Maputo, Moçambique",
        permissions: ["read", "write", "approve"],
    },
    {
        id: 7,
        name: "João Almeida",
        email: "joao.almeida@standardbank.com",
        password: "Oryon@2024!",
        role: "Analista de Risco",
        department: "Financeiro",
        avatar: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTk3Nzk4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Especialista em análise e mitigação de riscos financeiros e de crédito.",
        phone: "+258 84 789 0123",
        location: "Maputo, Moçambique",
        permissions: ["read", "write"],
    },
    {
        id: 8,
        name: "Beatriz Martins",
        email: "beatriz.martins@standardbank.com",
        password: "Oryon@2024!",
        role: "Tesoureira",
        department: "Financeiro",
        avatar: "https://images.unsplash.com/photo-1591461974026-614a0b6af24d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxibGFjayUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzU5Nzg4NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
        status: "offline" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        bio: "Responsável pela gestão de tesouraria, fluxo de caixa e investimentos do banco.",
        phone: "+258 84 890 1234",
        location: "Maputo, Moçambique",
        permissions: ["read", "write", "manage"],
    },
    {
        id: 9,
        name: "Pedro Nunes",
        email: "pedro.nunes@standardbank.com",
        password: "Oryon@2024!",
        role: "Engenheiro de Software Sénior",
        department: "Tecnologia",
        avatar: "https://images.unsplash.com/photo-1557862921-37829c790f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTk3Nzk4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Desenvolvedor backend com foco em microserviços e APIs de alta performance.",
        phone: "+258 84 901 2345",
        location: "Maputo, Moçambique",
        permissions: ["read", "write"],
    },
    {
        id: 10,
        name: "Laura Fernandes",
        email: "laura.fernandes@standardbank.com",
        password: "Oryon@2024!",
        role: "Analista de Processos",
        department: "Operações",
        avatar: "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTk3Nzk4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        status: "away" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        bio: "Especialista em otimização de processos e automação (RPA).",
        phone: "+258 84 012 3456",
        location: "Maputo, Moçambique",
        permissions: ["read", "write"],
    },
    {
        id: 11,
        name: "Daniela Pereira",
        email: "daniela.pereira@standardbank.com",
        password: "Oryon@2024!",
        role: "Oficial de Compliance Sénior",
        department: "Compliance",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTk3Nzk4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Garante a conformidade com as regulamentações financeiras e políticas internas.",
        phone: "+258 84 112 2334",
        location: "Maputo, Moçambique",
        permissions: ["read", "approve"],
    },
    {
        id: 12,
        name: "Ricardo Mendes",
        email: "ricardo.mendes@standardbank.com",
        password: "Oryon@2024!",
        role: "Especialista em Cibersegurança",
        department: "Segurança",
        avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8cGVyc29uJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzU5Nzc5ODA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        status: "dnd" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Responsável pela proteção dos ativos digitais do banco contra ameaças cibernéticas.",
        phone: "+258 84 223 3445",
        location: "Maputo, Moçambique",
        permissions: ["read", "manage"],
    },
    {
        id: 13,
        name: "Júlia Barros",
        email: "julia.barros@standardbank.com",
        password: "Oryon@2024!",
        role: "Analista de Marketing Digital",
        department: "Marketing",
        avatar: "https://picsum.photos/seed/13/400/400",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Focada em SEO, SEM e análise de métricas de campanhas digitais.",
        phone: "+258 84 123 1111",
        location: "Maputo, Moçambique",
        permissions: ["read", "write"],
    },
    {
        id: 14,
        name: "Tiago Martins",
        email: "tiago.martins@standardbank.com",
        password: "Oryon@2024!",
        role: "Gestor de Conteúdo",
        department: "Marketing",
        avatar: "https://picsum.photos/seed/14/400/400",
        status: "away" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
        bio: "Responsável pela criação e curadoria de conteúdo para o blog e redes sociais.",
        phone: "+258 84 123 2222",
        location: "Maputo, Moçambique",
        permissions: ["read", "write", "comment"],
    },
    {
        id: 15,
        name: "Rui Costa",
        email: "rui.costa@standardbank.com",
        password: "Oryon@2024!",
        role: "Analista de Contabilidade",
        department: "Financeiro",
        avatar: "https://picsum.photos/seed/15/400/400",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Especializado em fecho de contas e relatórios fiscais.",
        phone: "+258 84 123 3333",
        location: "Maputo, Moçambique",
        permissions: ["read", "write"],
    },
    {
        id: 16,
        name: "Carla Meireles",
        email: "carla.meireles@standardbank.com",
        password: "Oryon@2024!",
        role: "Técnica de RH",
        department: "Recursos Humanos",
        avatar: "https://picsum.photos/seed/16/400/400",
        status: "busy" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Focada no processamento salarial e gestão de benefícios.",
        phone: "+258 84 123 4444",
        location: "Maputo, Moçambique",
        permissions: ["read", "write"],
    },
    {
        id: 17,
        name: "Sérgio Ramos",
        email: "sergio.ramos@standardbank.com",
        password: "Oryon@2024!",
        role: "Especialista de Recrutamento",
        department: "Recursos Humanos",
        avatar: "https://picsum.photos/seed/17/400/400",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Responsável por atrair e selecionar os melhores talentos para o banco.",
        phone: "+258 84 123 5555",
        location: "Maputo, Moçambique",
        permissions: ["read", "write", "approve"],
    },
    {
        id: 18,
        name: "Vasco Monteiro",
        email: "vasco.monteiro@standardbank.com",
        password: "Oryon@2024!",
        role: "Engenheiro de DevOps",
        department: "Tecnologia",
        avatar: "https://picsum.photos/seed/18/400/400",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Focado em CI/CD, automação de infraestrutura e monitoramento.",
        phone: "+258 84 123 6666",
        location: "Maputo, Moçambique",
        permissions: ["read", "write", "manage"],
    },
    {
        id: 19,
        name: "Telma Borges",
        email: "telma.borges@standardbank.com",
        password: "Oryon@2024!",
        role: "Administradora de Sistemas",
        department: "Tecnologia",
        avatar: "https://picsum.photos/seed/19/400/400",
        status: "dnd" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Responsável pela manutenção dos servidores e da infraestrutura de TI.",
        phone: "+258 84 123 7777",
        location: "Maputo, Moçambique",
        permissions: ["read", "write", "manage"],
    },
    {
        id: 20,
        name: "Bruno Paixão",
        email: "bruno.paixao@standardbank.com",
        password: "Oryon@2024!",
        role: "Engenheiro de Software Júnior",
        department: "Tecnologia",
        avatar: "https://picsum.photos/seed/20/400/400",
        status: "offline" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        bio: "Desenvolvedor frontend, apaixonado por React e novas tecnologias web.",
        phone: "+258 84 123 8888",
        location: "Maputo, Moçambique",
        permissions: ["read", "write"],
    },
    {
        id: 21,
        name: "Fábio Neves",
        email: "fabio.neves@standardbank.com",
        password: "Oryon@2024!",
        role: "Gestor de Logística",
        department: "Operações",
        avatar: "https://picsum.photos/seed/21/400/400",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Responsável pela cadeia de suprimentos e logística do banco.",
        phone: "+258 84 123 9999",
        location: "Maputo, Moçambique",
        permissions: ["read", "write"],
    },
    {
        id: 22,
        name: "Catarina Valente",
        email: "catarina.valente@standardbank.com",
        password: "Oryon@2024!",
        role: "Analista de KYC",
        department: "Compliance",
        avatar: "https://picsum.photos/seed/22/400/400",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Especialista em processos de 'Know Your Customer' e prevenção de lavagem de dinheiro.",
        phone: "+258 84 321 1111",
        location: "Maputo, Moçambique",
        permissions: ["read", "approve"],
    },
    {
        id: 23,
        name: "Alexandre Pires",
        email: "alexandre.pires@standardbank.com",
        password: "Oryon@2024!",
        role: "Analista de Segurança SOC",
        department: "Segurança",
        avatar: "https://picsum.photos/seed/23/400/400",
        status: "busy" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Monitora e responde a incidentes de segurança no Security Operations Center.",
        phone: "+258 84 321 2222",
        location: "Maputo, Moçambique",
        permissions: ["read", "manage"],
    },
    {
        id: 24,
        name: "Beatriz Lima",
        email: "beatriz.lima@standardbank.com",
        password: "Oryon@2024!",
        role: "Assistente Executiva",
        department: "Administração",
        avatar: "https://picsum.photos/seed/24/400/400",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Assistente do CEO e suporte à equipa de administração.",
        phone: "+258 84 321 3333",
        location: "Maputo, Moçambique",
        permissions: ["read", "write", "comment"],
    },
    {
        id: 25,
        name: "Fernando Costa",
        email: "fernando.costa@standardbank.com",
        password: "Oryon@2024!",
        role: "Diretor de Operações (COO)",
        department: "Administração",
        avatar: "https://picsum.photos/seed/25/400/400",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Responsável por supervisionar todas as operações diárias da empresa.",
        phone: "+258 84 321 4444",
        location: "Maputo, Moçambique",
        permissions: ["all"],
    },
    {
        id: 26,
        name: "Helena Moreira",
        email: "helena.moreira@standardbank.com",
        password: "Oryon@2024!",
        role: "Diretora Financeira (CFO)",
        department: "Administração",
        avatar: "https://picsum.photos/seed/26/400/400",
        status: "busy" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Lidera a estratégia financeira e a saúde fiscal da organização.",
        phone: "+258 84 321 5555",
        location: "Maputo, Moçambique",
        permissions: ["all"],
    },
    {
        id: 27,
        name: "Jorge Valério",
        email: "jorge.valerio@standardbank.com",
        password: "Oryon@2024!",
        role: "Conselheiro Geral",
        department: "Administração",
        avatar: "https://picsum.photos/seed/27/400/400",
        status: "away" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        bio: "Fornece orientação jurídica em todas as matérias corporativas.",
        phone: "+258 84 321 6666",
        location: "Maputo, Moçambique",
        permissions: ["all"],
    },
    {
        id: 28,
        name: "Luísa Matos",
        email: "luisa.matos@standardbank.com",
        password: "Oryon@2024!",
        role: "Chefe de Estratégia",
        department: "Administração",
        avatar: "https://picsum.photos/seed/28/400/400",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Desenvolve e executa as iniciativas estratégicas de longo prazo da empresa.",
        phone: "+258 84 321 7777",
        location: "Maputo, Moçambique",
        permissions: ["all"],
    },
    {
        id: 29,
        name: "Nuno Gomes",
        email: "nuno.gomes@standardbank.com",
        password: "Oryon@2024!",
        role: "Chefe de Compliance",
        department: "Compliance",
        avatar: "https://picsum.photos/seed/29/400/400",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Lidera o departamento de Compliance, garantindo a aderência a todas as normativas.",
        phone: "+258 84 321 8888",
        location: "Maputo, Moçambique",
        permissions: ["read", "write", "manage", "approve"],
    },
    {
        id: 30,
        name: "Rita Marques",
        email: "rita.marques@standardbank.com",
        password: "Oryon@2024!",
        role: "Oficial de Compliance Sénior",
        department: "Compliance",
        avatar: "https://picsum.photos/seed/30/400/400",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Supervisiona as atividades de compliance e orienta a equipe de analistas.",
        phone: "+258 84 321 9999",
        location: "Maputo, Moçambique",
        permissions: ["read", "write", "approve"],
    },
    {
        id: 31,
        name: "David Antunes",
        email: "david.antunes@standardbank.com",
        password: "Oryon@2024!",
        role: "Auditor de Compliance",
        department: "Compliance",
        avatar: "https://picsum.photos/seed/31/400/400",
        status: "away" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        bio: "Realiza auditorias internas para verificar a conformidade dos processos.",
        phone: "+258 84 321 0000",
        location: "Maputo, Moçambique",
        permissions: ["read", "write"],
    },
    {
        id: 32,
        name: "Inês Faria",
        email: "ines.faria@standardbank.com",
        password: "Oryon@2024!",
        role: "Especialista em Prevenção à Lavagem de Dinheiro",
        department: "Compliance",
        avatar: "https://picsum.photos/seed/32/400/400",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Focada na análise de transações e prevenção de atividades ilícitas (AML).",
        phone: "+258 84 432 1111",
        location: "Maputo, Moçambique",
        permissions: ["read", "write"],
    },
    {
        id: 33,
        name: "Miguel Loureiro",
        email: "miguel.loureiro@standardbank.com",
        password: "Oryon@2024!",
        role: "Analista Regulatório",
        department: "Compliance",
        avatar: "https://picsum.photos/seed/33/400/400",
        status: "busy" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Acompanha e interpreta novas legislações e regulamentos do setor financeiro.",
        phone: "+258 84 432 2222",
        location: "Maputo, Moçambique",
        permissions: ["read"],
    },
    {
        id: 34,
        name: "Roberto Vaz",
        email: "roberto.vaz@standardbank.com",
        password: "Oryon@2024!",
        role: "Chefe de Operações",
        department: "Operações",
        avatar: "https://picsum.photos/seed/34/400/400",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Lidera o departamento de operações, focado na eficiência e qualidade dos processos.",
        phone: "+258 84 555 1111",
        location: "Maputo, Moçambique",
        permissions: ["read", "write", "manage", "approve"],
    },
    {
        id: 35,
        name: "Sandra Rocha",
        email: "sandra.rocha@standardbank.com",
        password: "Oryon@2024!",
        role: "Gestora de Projetos de Operações",
        department: "Operações",
        avatar: "https://picsum.photos/seed/35/400/400",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Gerencia projetos de otimização e automação dentro do departamento de operações.",
        phone: "+258 84 555 2222",
        location: "Maputo, Moçambique",
        permissions: ["read", "write", "manage"],
    },
    {
        id: 36,
        name: "André Gusmão",
        email: "andre.gusmao@standardbank.com",
        password: "Oryon@2024!",
        role: "Analista de Qualidade",
        department: "Operações",
        avatar: "https://picsum.photos/seed/36/400/400",
        status: "away" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        bio: "Responsável por monitorar a qualidade dos serviços e processos operacionais.",
        phone: "+258 84 555 3333",
        location: "Maputo, Moçambique",
        permissions: ["read", "write"],
    },
    {
        id: 37,
        name: "Patrícia Abreu",
        email: "patricia.abreu@standardbank.com",
        password: "Oryon@2024!",
        role: "Especialista em Melhoria Contínua",
        department: "Operações",
        avatar: "https://picsum.photos/seed/37/400/400",
        status: "online" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Implementa metodologias Lean e Six Sigma para otimizar os fluxos de trabalho.",
        phone: "+258 84 555 4444",
        location: "Maputo, Moçambique",
        permissions: ["read", "write"],
    },
    {
        id: 38,
        name: "Márcio Viana",
        email: "marcio.viana@standardbank.com",
        password: "Oryon@2024!",
        role: "Coordenador de Turno",
        department: "Operações",
        avatar: "https://picsum.photos/seed/38/400/400",
        status: "busy" as "online" | "away" | "busy" | "offline" | "dnd",
        lastSeen: new Date().toISOString(),
        bio: "Coordena a equipe de operações de back-office durante o turno da noite.",
        phone: "+258 84 555 5555",
        location: "Maputo, Moçambique",
        permissions: ["read", "write", "manage"],
    }
];

export const tasks = [
    // --- Marketing Tasks ---
    {
        id: 1,
        title: "Criar campanha publicitária para 'Conta Pro'",
        description: "Desenvolver conceito criativo e materiais para campanha do novo produto bancário digital 'Conta Pro'. Foco em mídia digital e redes sociais.",
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
        title: "Atualizar identidade visual da marca para 2025",
        description: "Revisar e atualizar guidelines da marca para 2025 incluindo logotipo, tipografia, cores e aplicações.",
        projectId: null,
        assignedTo: [2],
        createdBy: 3,
        priority: "medium" as "urgent" | "high" | "medium" | "low",
        status: "todo" as "backlog" | "todo" | "in-progress" | "blocked" | "done",
        labels: ["branding", "design"],
        dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 45 days from now
        progress: 10,
        attachments: [],
        checklist: [],
        dependencies: [],
        watchers: [3],
        commentsCount: 1,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    // --- Finance Tasks ---
    {
        id: 3,
        title: "Preparar relatório financeiro Q3",
        description: "Compilar dados de performance dos últimos 3 meses e preparar relatório para apresentação à direção.",
        projectId: null,
        assignedTo: [4, 6],
        createdBy: 26,
        priority: "high" as "urgent" | "high" | "medium" | "low",
        status: "in-progress" as "backlog" | "todo" | "in-progress" | "blocked" | "done",
        labels: ["relatório", "financeiro"],
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
        progress: 40,
        attachments: [{ name: "dados-setembro.xlsx", size: "3.2 MB", type: "excel" }],
        checklist: [
            { id: 'c3-1', text: 'Coletar dados de vendas de todos os canais', checked: true },
            { id: 'c3-2', text: 'Analisar despesas operacionais e de marketing', checked: false },
            { id: 'c3-3', text: 'Elaborar sumário executivo com principais conclusões', checked: false },
        ],
        dependencies: [],
        watchers: [25, 26],
        commentsCount: 2,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    // --- IT Tasks ---
    {
        id: 5,
        title: "Auditoria de Segurança dos Servidores Cloud",
        description: "Realizar uma auditoria completa de segurança para identificar e corrigir vulnerabilidades nos servidores AWS.",
        projectId: 2,
        assignedTo: [12, 23],
        createdBy: 1,
        priority: "high" as "urgent" | "high" | "medium" | "low",
        status: "in-progress" as "backlog" | "todo" | "in-progress" | "blocked" | "done",
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
        title: "Desenvolver Dashboard de Monitorização de KPIs",
        description: "Criar um novo dashboard em tempo real para monitorizar os principais indicadores de performance (KPIs) da plataforma, usando Recharts.",
        projectId: 2,
        assignedTo: [9, 20],
        createdBy: 28,
        priority: "medium" as "urgent" | "high" | "medium" | "low",
        status: "backlog" as "backlog" | "todo" | "in-progress" | "blocked" | "done",
        labels: ["dashboard", "kpi", "bi", "frontend"],
        dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 5,
        attachments: [],
        checklist: [],
        dependencies: [],
        watchers: [1, 28],
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
        status: "done" as "backlog" | "todo" | "in-progress" | "blocked" | "done",
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
        title: "Revisar e Aprovar Política de AML",
        description: "A equipa de Compliance precisa de rever a nova Política de Prevenção à Lavagem de Dinheiro (AML) antes da sua publicação interna.",
        projectId: null,
        assignedTo: [11, 29, 32],
        createdBy: 27,
        priority: "high" as "urgent" | "high" | "medium" | "low",
        status: "blocked" as "backlog" | "todo" | "in-progress" | "blocked" | "done",
        labels: ["compliance", "aml", "revisão"],
        dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 50,
        attachments: [{ name: "AML-policy-draft-v3.docx", size: "250 KB", type: "docx" }],
        checklist: [],
        dependencies: [],
        watchers: [27, 25],
        commentsCount: 3,
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
     {
        id: 9,
        title: "Implementar endpoint da API para parceiros",
        description: "Desenvolver e documentar o novo endpoint da API que será usado por parceiros externos para consulta de taxas de câmbio.",
        projectId: 2,
        assignedTo: [9, 18],
        createdBy: 1,
        priority: "high" as "urgent" | "high" | "medium" | "low",
        status: "todo" as "backlog" | "todo" | "in-progress" | "blocked" | "done",
        labels: ["api", "backend", "devops"],
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
        watchers: [1, 28],
        commentsCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 10,
        title: "Análise de performance SEO do blog corporativo",
        description: "Analisar performance do blog, identificar palavras-chave de oportunidade e otimizar os 10 artigos mais populares para melhorar ranking no Google.",
        projectId: 1,
        assignedTo: [13],
        createdBy: 3,
        priority: "low" as "urgent" | "high" | "medium" | "low",
        status: "done" as "backlog" | "todo" | "in-progress" | "blocked" | "done",
        labels: ["seo", "marketing"],
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
        title: "Reunião de Planeamento - Campanha Q4",
        description: "Discussão da estratégia de marketing para o último trimestre e preparação do lançamento da nova conta digital 'Conta Pro'.",
        department: "Marketing",
        date: "2024-11-20",
        time: "14:00",
        duration: 60,
        participants: [2, 3, 13, 14],
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
        participants: [1, 2, 3, 4, 5, 25, 26, 28],
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
        participants: [1, 2, 4, 9, 18, 28],
        status: "scheduled" as "scheduled" | "active" | "completed",
    }
];

export const departments = [
    { id: 1, name: "Marketing", slug: "marketing", head: 3, memberCount: 12, budget: 450000, projects: 8, description: "Responsável pela imagem da marca, estratégias de comunicação, campanhas publicitárias e marketing digital.", goals: ["Aumentar notoriedade da marca em 25%", "Lançar 3 novas campanhas digitais", "Aumentar leads qualificados em 40%"] },
    { id: 2, name: "Financeiro", slug: "finance", head: 26, memberCount: 8, budget: 1200000, projects: 5, description: "Gestão financeira, contabilidade, tesouraria, planeamento e relatórios económicos para a tomada de decisão.", goals: ["Reduzir custos operacionais em 15%", "Otimizar fluxo de caixa", "Melhorar precisão das previsões finance"] },
    { id: 3, name: "Recursos Humanos", slug: "hr", head: 5, memberCount: 6, budget: 300000, projects: 3, description: "Gestão de talentos, desenvolvimento profissional, recrutamento, e promoção do bem-estar dos colaboradores.", goals: ["Reduzir turnover para 8%", "Implementar novo programa de formação contínua", "Melhorar índice de satisfação dos colaboradores"] },
    { id: 4, name: "Tecnologia", slug: "it", head: 1, memberCount: 15, budget: 2000000, projects: 12, description: "Desenvolvimento e manutenção de sistemas, infraestrutura tecnológica, segurança da informação e suporte técnico.", goals: ["Migrar 50% dos sistemas para a cloud", "Implementar nova API de Open Banking", "Reduzir tempo de resposta de incidentes em 30%"] },
    { id: 5, name: "Operações", slug: "operations", head: 34, memberCount: 10, budget: 800000, projects: 6, description: "Otimização de processos operacionais bancários, gestão da qualidade, e eficiência dos serviços.", goals: ["Aumentar eficiência operacional em 20%", "Reduzir tempo de processamento de transações", "Automatizar 5 processos manuais"] },
    { id: 6, name: "Compliance", slug: "compliance", head: 29, memberCount: 5, budget: 400000, projects: 4, description: "Garantia de conformidade com regulamentações financeiras, políticas internas e prevenção de riscos.", goals: ["Implementar novo sistema de monitorização de transações (AML)", "Realizar auditorias de conformidade trimestrais", "Atualizar todas as políticas internas (RGPD, etc)"] },
    { id: 7, name: "Segurança", slug: "security", head: 12, memberCount: 4, budget: 600000, projects: 3, description: "Proteção de dados, cibersegurança, segurança física das instalações e prevenção de fraudes.", goals: ["Implementar autenticação multi-fator (MFA) para todos os sistemas críticos", "Realizar testes de penetração trimestrais", "Reduzir falsos positivos em alertas de fraude em 15%"] },
    { id: 8, name: "Administração", slug: "administration", head: 25, memberCount: 1, budget: 100000, projects: 1, description: "Gestão geral e administrativa da plataforma Oryon.", goals: [] },
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
        members: [2, 3, 13, 14],
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
        members: [1, 2, 4, 9, 18, 19, 20],
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
        members: [4, 5, 10, 34, 35, 36, 37],
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
            { id: 'pulse', title: 'Pulse' },
            { id: 'workspaces', title: 'Workspaces' },
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
            { id: 'analytics', title: 'Analytics', permissions: ['approve', 'all'] },
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
    { id: 1, title: "Desempenho de Vendas - Outubro 2024", summary: "Análise detalhada das métricas de vendas, incluindo performance por região e produto.", type: "mensal", department: "Marketing" },
    { id: 2, title: "Satisfação do Cliente - Q3 2024", summary: "Resultados da pesquisa trimestral de satisfação do cliente e principais insights.", type: "trimestral", department: "Operações" },
    { id: 3, title: "Análise de Risco de Crédito", summary: "Relatório sobre a carteira de crédito atual e avaliação de riscos.", type: "anual", department: "Financeiro" },
    { id: 4, title: "Performance da Campanha 'Conta Pro'", summary: "KPIs e ROI da campanha de lançamento do novo produto digital.", type: "semanal", department: "Marketing" },
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
    { id: 2, name: "Gerar relatório de performance semanal automaticamente", active: true },
    { id: 3, name: "Notificar gestor sobre tarefas com prazo iminente", active: true },
    { id: 4, name: "Criar ticket de suporte TI a partir de email para 'suporte@oryon.com'", active: true },
    { id: 5, name: "Arquivar projetos concluídos há mais de 90 dias", active: false },
    { id: 6, name: "Solicitar aprovação para despesas acima de €1000", active: true },
    { id: 7, name: "Lembrete de preenchimento de timesheet semanal", active: true },
    { id: 8, name: "Sincronizar eventos do calendário com o Google Calendar", active: false },
    { id: 9, name: "Criar relatório de despesas mensal para cada departamento", active: true },
    { id: 10, name: "Revogar acessos de ex-colaboradores automaticamente", active: true },
    { id: 11, name: "Alertar sobre baixo stock de material de escritório", active: false },
    { id: 12, name: "Publicar atualizações importantes no canal #geral do chat", active: true },
    { id: 13, name: "Backup diário da base de dados de clientes", active: true },
    { id: 14, name: "Análise de sentimento em feedback de clientes", active: true },
    { id: 15, name: "Lembrete de formação de compliance obrigatória", active: true }
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
    { id: 3, title: "Workshop de Inovação", description: "Workshop sobre tendências de inovação no sector bancário", start: "2024-11-25T09:00:00", end: "2024-11-25T13:00:00", createdBy: 1, participants: [1, 2, 3, 4, 5, 9, 18], type: "workshop", department: "Tecnologia", location: "Centro de Formação", color: "green" },
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
        name: "Lançamento Produto 'Conta Pro'",
        description: "Workspace central para a campanha de marketing do 4º trimestre para o lançamento da 'Conta Pro'.",
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
        name: "Modernização do Homebanking",
        description: "Projeto de tecnologia para a renovação completa da plataforma de homebanking.",
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
        content: { text: "O projeto 'Modernização da Plataforma de Homebanking' foi iniciado." },
        system_event_details: {
            event: 'project.created',
            project_id: 2,
            project_name: 'Modernização da Plataforma de Homebanking'
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
        content: { text: "Alguém tem experiência com a implementação de WebSockets para notificações em tempo real em larga escala? A pensar na arquitetura para o novo #homebanking. #devs #tecnologia" },
        mentions: [],
        hashtags: ['devs', 'tecnologia', 'homebanking'],
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
]


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
    ],
    "workspace_chat_1": [
        { id: 1, userId: 3, content: "Equipa, bem-vindos ao workspace para o lançamento da 'Conta Pro'! Vamos manter toda a comunicação aqui.", timestamp: "2024-11-18T10:00:00Z", reactions: [] },
        { id: 2, userId: 2, content: "Excelente iniciativa! Já associei os meus ficheiros de design a este workspace.", timestamp: "2024-11-18T10:05:00Z", reactions: [] },
    ],
    "workspace_chat_2": [
        { id: 1, userId: 1, content: "Este é o canal dedicado para a modernização do homebanking. Por favor partilhem aqui todas as atualizações técnicas.", timestamp: "2024-11-18T11:00:00Z", reactions: [] }
    ]
};

export const getCurrentUser = () => {
    if (typeof window !== 'undefined') {
        const session = document.cookie.split('; ').find(row => row.startsWith('oryon_user_session='));
        if (session) {
            try {
                // Correctly parse the JSON string from the cookie
                const userData = JSON.parse(decodeURIComponent(session.split('=')[1]));
                // Find the user in the mock data array
                const user = users.find(u => u.id === userData.id);
                if (user) {
                  return user;
                }
            } catch (e) {
                console.error("Failed to parse user session cookie:", e);
                // Fallback for server-side or if cookie is invalid
            }
        }
    }
    // Fallback for server-side rendering or if no user is logged in
    return users.find(u => u.id === 1)!;
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

    
