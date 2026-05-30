import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
  Calendar,
  FileText,
  Users,
  Tag,
  Sparkles,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock
} from "lucide-react";

interface OverviewProps {
  totalCorridas: number;
  totalClientes: number;
  totalCampanhas: number;
  totalAvaliacoes: number;
  setActiveTab: (tab: any) => void;
}

export const Overview: React.FC<OverviewProps> = ({
  totalCorridas,
  totalClientes,
  totalCampanhas,
  totalAvaliacoes,
  setActiveTab,
}) => {
  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Banner de Boas-vindas Premium */}
      <div className="relative overflow-hidden bg-gradient-to-r from-black/40 to-black/10 border border-[#e9c349]/10 p-6 sm:p-8 rounded-3xl shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#e9c349]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <span className="flex items-center text-[10px] font-bold text-[#e9c349] tracking-widest uppercase bg-[#e9c349]/10 border border-[#e9c349]/20 px-3 py-1 rounded-full w-max">
              <Award className="w-3.5 h-3.5 mr-1.5" />
              Chauffeur Executivo
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
              Olá, Anderson Marumoto!
            </h2>
            <p className="text-xs text-[#c4c7c7] max-w-xl leading-relaxed">
              Bem-vindo ao seu Centro de Controle Operacional. Gerencie sua frota, acompanhe a fidelidade de passageiros corporativos e emita documentos de viagem.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-gray-500 bg-white/5 border border-white/5 px-4 py-2.5 rounded-2xl flex-shrink-0">
            <Clock className="w-3.5 h-3.5 text-[#e9c349]" />
            <span className="capitalize">{dataAtual}</span>
          </div>
        </div>
      </div>

      {/* Grade de Estatísticas Relocadas */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-[#c4c7c7] uppercase tracking-wider">
          Resumo Métrico Operacional
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Avaliações */}
          <Card className="glass-card shadow-lg border border-[#e9c349]/10 bg-transparent rounded-2xl hover:border-[#e9c349]/30 transition duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Depoimentos Aprovados
              </CardTitle>
              <FileText className="h-5 w-5 text-[#e9c349] flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl lg:text-3xl font-extrabold text-white">{totalAvaliacoes}</div>
              <CardDescription className="text-[10px] text-[#c4c7c7] mt-1">
                Feedbacks ativos no site principal
              </CardDescription>
            </CardContent>
          </Card>

          {/* Corridas */}
          <Card className="glass-card shadow-lg border border-[#e9c349]/10 bg-transparent rounded-2xl hover:border-[#e9c349]/30 transition duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Corridas Agendadas
              </CardTitle>
              <Calendar className="h-5 w-5 text-[#e9c349] flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl lg:text-3xl font-extrabold text-white">{totalCorridas}</div>
              <CardDescription className="text-[10px] text-[#c4c7c7] mt-1">
                Serviços agendados e sincronizados
              </CardDescription>
            </CardContent>
          </Card>

          {/* Clientes */}
          <Card className="glass-card shadow-lg border border-[#e9c349]/10 bg-transparent rounded-2xl hover:border-[#e9c349]/30 transition duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Clientes Frequentes
              </CardTitle>
              <Users className="h-5 w-5 text-[#e9c349] flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl lg:text-3xl font-extrabold text-white">{totalClientes}</div>
              <CardDescription className="text-[10px] text-[#c4c7c7] mt-1">
                Cadastros de passageiros corporativos
              </CardDescription>
            </CardContent>
          </Card>

          {/* Campanhas */}
          <Card className="glass-card shadow-lg border border-[#e9c349]/10 bg-transparent rounded-2xl hover:border-[#e9c349]/30 transition duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Campanhas Fidelidade
              </CardTitle>
              <Tag className="h-5 w-5 text-[#e9c349] flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl lg:text-3xl font-extrabold text-white">{totalCampanhas}</div>
              <CardDescription className="text-[10px] text-[#c4c7c7] mt-1">
                Promoções ativas e inativas salvas
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Grade de Atalhos Rápidos Clicáveis */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-[#c4c7c7] uppercase tracking-wider">
          Acesso Operacional Rápido
        </h3>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Atalho 1: Agenda */}
          <button
            onClick={() => setActiveTab("agenda")}
            className="group text-left bg-black/20 border border-white/5 hover:border-[#e9c349]/20 p-5 rounded-2xl transition-all duration-300 hover:bg-[#e9c349]/[0.01] flex flex-col justify-between h-40 relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#e9c349] group-hover:scale-110 transition">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Agendar Nova Corrida</h4>
              <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">
                Adicione compromissos, traslados e reservas à sua agenda executiva.
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-600 absolute bottom-5 right-5 group-hover:translate-x-1 group-hover:text-[#e9c349] transition" />
          </button>

          {/* Atalho 2: Recibos */}
          <button
            onClick={() => setActiveTab("recibos")}
            className="group text-left bg-black/20 border border-white/5 hover:border-[#e9c349]/20 p-5 rounded-2xl transition-all duration-300 hover:bg-[#e9c349]/[0.01] flex flex-col justify-between h-40 relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#e9c349] group-hover:scale-110 transition">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Emitir Recibo</h4>
              <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">
                Gere comprovantes instantâneos corporativos, salve em PDF ou envie via WhatsApp.
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-600 absolute bottom-5 right-5 group-hover:translate-x-1 group-hover:text-[#e9c349] transition" />
          </button>

          {/* Atalho 3: Clientes */}
          <button
            onClick={() => setActiveTab("clientes")}
            className="group text-left bg-black/20 border border-white/5 hover:border-[#e9c349]/20 p-5 rounded-2xl transition-all duration-300 hover:bg-[#e9c349]/[0.01] flex flex-col justify-between h-40 relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#e9c349] group-hover:scale-110 transition">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Passageiros</h4>
              <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">
                Cadastre os endereços habituais dos passageiros corporativos frequentes.
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-600 absolute bottom-5 right-5 group-hover:translate-x-1 group-hover:text-[#e9c349] transition" />
          </button>

          {/* Atalho 4: Cupons */}
          <button
            onClick={() => setActiveTab("cupons")}
            className="group text-left bg-black/20 border border-white/5 hover:border-[#e9c349]/20 p-5 rounded-2xl transition-all duration-300 hover:bg-[#e9c349]/[0.01] flex flex-col justify-between h-40 relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#e9c349] group-hover:scale-110 transition">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Campanhas Fidelidade</h4>
              <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">
                Crie e dispare cupons de desconto pelo WhatsApp para impulsionar o CRM.
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-600 absolute bottom-5 right-5 group-hover:translate-x-1 group-hover:text-[#e9c349] transition" />
          </button>
        </div>
      </div>

      {/* Painel de Sincronização e Conexão de Redes */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Status de Integração */}
        <div className="bg-black/20 border border-white/5 p-6 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
            <ShieldCheck className="w-4 h-4 text-[#e9c349]" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Status das Conexões de APIs
            </h4>
          </div>

          <div className="space-y-3 font-sans text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Google Calendar API:</span>
              <span className="flex items-center text-emerald-400 font-semibold font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
                ATIVO e SINCRONIZADO
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">WhatsApp Simulator Link:</span>
              <span className="flex items-center text-emerald-400 font-semibold font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
                CONECTADO
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Firebase Firestore Database:</span>
              <span className="flex items-center text-emerald-400 font-semibold font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
                ONLINE (Real-time)
              </span>
            </div>
          </div>
        </div>

        {/* Notificação/Mural Informativo */}
        <div className="bg-black/20 border border-white/5 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
              <Sparkles className="w-4 h-4 text-[#e9c349]" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Dicas de Gestão Corporativa
              </h4>
            </div>
            <p className="text-[11px] text-[#c4c7c7] leading-relaxed">
              Trajetos corporativos para hotéis de luxo e aeroportos são excelentes pontos de contato para captar novos cadastros em campanhas de fidelidade. Utilize o recurso **"Enviar WhatsApp"** na aba de Cupons para enviar benefícios exclusivos logo após o término da corrida.
            </p>
          </div>
          <div className="text-[10px] text-gray-500 flex items-center mt-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#e9c349] mr-1.5 flex-shrink-0" />
            Sistema operacional operando sob protocolo de segurança HTTPS.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
