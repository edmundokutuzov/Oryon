'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import TxunaLogo from '@/components/icons/txuna-logo';
import { ArrowRight, Play, Shield, Zap, Users, BarChart3, MessageSquare, Calendar, Target, Trophy, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Velocidade de Resultados",
      description: "Processos acelerados em 300% com nossa tecnologia de ponta"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Foco em Performance",
      description: "Metas claras, resultados mensuráveis e conquistas diárias"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Equipe Conectada",
      description: "Colaboração perfeita entre todos os departamentos"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Dados em Tempo Real",
      description: "Analytics instantâneos para decisões estratégicas"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Comunicação Imediata",
      description: "Chats dedicados por projeto e comunicação direta"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Gestão Inteligente",
      description: "Agendamentos automáticos e lembretes inteligentes"
    }
  ];

  const stats = [
    { number: "24/7", label: "Operação Contínua" },
    { number: "99.9%", label: "Uptime Garantido" },
    { number: "5.2x", label: "Mais Eficiência" },
    { number: "∞", label: "Possibilidades" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(260,25%,8%)] via-[hsl(260,25%,12%)] to-[hsl(260,25%,6%)] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[hsl(90,85%,55%)] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[hsl(260,25%,25%)] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[hsl(90,85%,55%)] opacity-5 rounded-full blur-3xl"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border-r border-b border-[hsl(260,25%,22%)]"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <TxunaLogo className="w-40 h-12" />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <a
              href="/login"
              className="group relative px-8 py-3 bg-[hsl(90,85%,55%)] text-[hsl(260,25%,10%)] rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[hsl(90,85%,55%)]/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Acessar Plataforma
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </a>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(260,25%,18%)] border border-[hsl(260,25%,22%)] rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-[hsl(90,85%,55%)]" />
              <span className="text-sm text-[hsl(0,0%,98%)] font-medium">
                Plataforma Exclusiva Txuna Bet
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[hsl(0,0%,98%)] via-[hsl(90,85%,55%)] to-[hsl(0,0%,98%)] bg-clip-text text-transparent">
                O Jogo
              </span>
              <br />
              <span className="bg-gradient-to-r from-[hsl(90,85%,55%)] to-[hsl(90,85%,75%)] bg-clip-text text-transparent">
                Mudou.
              </span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-[hsl(260,5%,75%)] max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Bem-vindo à <span className="text-[hsl(90,85%,55%)] font-semibold">Oryon</span> - 
              onde a excelência da Txuna Bet encontra a potência da gestão inteligente. 
              <span className="block mt-2 text-lg">
                Mais do que uma plataforma, uma revolução na forma como sua equipe vence.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <a
                href="/login"
                className="group relative px-12 py-4 bg-[hsl(90,85%,55%)] text-[hsl(260,25%,10%)] rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[hsl(90,85%,55%)]/30"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Começar a Vencer
                  <Trophy className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </a>

              <button className="group flex items-center gap-3 px-8 py-4 text-[hsl(0,0%,98%)] font-semibold rounded-2xl border border-[hsl(260,25%,22%)] hover:border-[hsl(90,85%,55%)] transition-all duration-300">
                <Play className="w-5 h-5" />
                Ver Demonstração
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="text-center p-6 bg-[hsl(260,25%,12%)] border border-[hsl(260,25%,18%)] rounded-2xl hover:border-[hsl(90,85%,55%)] transition-all duration-300"
                >
                  <div className="text-2xl md:text-3xl font-bold text-[hsl(90,85%,55%)] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-[hsl(260,5%,75%)] font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[hsl(0,0%,98%)] to-[hsl(90,85%,55%)] bg-clip-text text-transparent">
                Potência
              </span>
              <span className="text-[hsl(0,0%,98%)]"> em Cada Movimento</span>
            </h2>
            <p className="text-xl text-[hsl(260,5%,75%)] max-w-2xl mx-auto">
              Ferramentas projetadas para quem joga para vencer. 
              Cada recurso é uma vantagem competitiva.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="group p-8 bg-[hsl(260,25%,12%)] border border-[hsl(260,25%,18%)] rounded-3xl hover:border-[hsl(90,85%,55%)] hover:transform hover:scale-105 transition-all duration-500"
              >
                <div className="w-16 h-16 mb-6 rounded-2xl bg-[hsl(260,25%,15%)] border border-[hsl(260,25%,22%)] flex items-center justify-center text-[hsl(90,85%,55%)] group-hover:bg-[hsl(90,85%,55%)] group-hover:text-[hsl(260,25%,10%)] transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[hsl(0,0%,98%)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[hsl(260,5%,75%)] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-[hsl(0,0%,98%)]">Pronto para</span>
              <span className="block bg-gradient-to-r from-[hsl(90,85%,55%)] to-[hsl(90,85%,75%)] bg-clip-text text-transparent">
                Dominar o Jogo?
              </span>
            </h2>
            
            <p className="text-xl text-[hsl(260,5%,75%)] mb-8 max-w-2xl mx-auto">
              Junte-se aos campeões da Txuna Bet e experimente a plataforma 
              que está redefinindo o conceito de produtividade no setor.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/login"
                className="group relative px-12 py-4 bg-[hsl(90,85%,55%)] text-[hsl(260,25%,10%)] rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[hsl(90,85%,55%)]/40"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Acessar Agora - É Grátis
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </a>

              <div className="flex items-center gap-2 text-sm text-[hsl(260,5%,65%)]">
                <Shield className="w-4 h-4" />
                Ambiente 100% seguro e exclusivo para colaboradores Txuna Bet
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-[hsl(260,25%,18%)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <TxunaLogo className="w-32 h-10 mb-6 md:mb-0" />
            <div className="text-center md:text-right">
              <p className="text-[hsl(260,5%,65%)] text-sm">
                Plataforma Oryon • Exclusivo para Colaboradores Txuna Bet
              </p>
              <p className="text-[hsl(260,5%,55%)] text-xs mt-2">
                © 2024 Txuna Bet. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}