"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users,
  Calendar,
  ClipboardList,
  Tag,
  FileText,
  Menu,
  Home,
  LogOut,
  ChevronRight,
  TrendingUp,
  Award,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { db } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  fetchAvaliacoes,
  publishAvaliacao,
  archiveAvaliacao,
  Avaliacao,
} from "@/services/avaliacoes";
import AvaliacaoCard from "@/components/AvaliacaoCard";
import Recibo from "@/components/Recibo";
import Cupons from "@/components/CuponsDesconto";
import Agenda from "@/components/Agenda";
import Clientes from "@/components/ClienteComponent/Clientes";
import Overview from "@/components/dashboard/Overview";

const TABS = {
  VISAO_GERAL: "visao-geral",
  AVALIACOES: "avaliacoes",
  AGENDA: "agenda",
  CLIENTES: "clientes",
  CUPONS: "cupons",
  RECIBOS: "recibos",
} as const;

type TabsType = typeof TABS[keyof typeof TABS];

interface SidebarProps {
  setActiveTab: (tab: TabsType) => void;
  activeTab: TabsType;
}

const Sidebar = ({ setActiveTab, activeTab }: SidebarProps) => {
  const navItems = [
    { tab: TABS.VISAO_GERAL, label: "Visão Geral", icon: Home },
    { tab: TABS.AVALIACOES, label: "Avaliações", icon: ClipboardList },
    { tab: TABS.AGENDA, label: "Agenda de Corridas", icon: Calendar },
    { tab: TABS.CLIENTES, label: "Clientes", icon: Users },
    { tab: TABS.CUPONS, label: "Cupons de Desconto", icon: Tag },
    { tab: TABS.RECIBOS, label: "Emissão de Recibos", icon: FileText },
  ];

  return (
    <div className="space-y-6 py-6 flex flex-col h-full bg-[#0A0A0A] text-white border-r border-[#444748]/20">
      <div className="px-6 py-2 flex flex-col space-y-1">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-black font-extrabold text-lg">
            A
          </div>
          <div>
            <h2 className="text-base font-bold font-display tracking-tight text-white">Anderson Executivo</h2>
            <p className="text-[10px] text-secondary uppercase tracking-widest font-semibold">Painel Administrativo</p>
          </div>
        </div>
      </div>
      
      <Separator className="bg-[#444748]/20" />
      
      <div className="flex-1 px-4 space-y-1">
        {navItems.map(({ tab, label, icon: Icon }) => (
          <Button
            key={tab}
            variant="ghost"
            className={`w-full justify-start text-sm py-5 rounded-lg transition-all duration-200 ${
              activeTab === tab 
                ? "bg-secondary text-black font-semibold hover:bg-secondary-fixed hover:text-black shadow-md shadow-secondary/10" 
                : "text-gray-400 hover:bg-[#1A1C1C]/40 hover:text-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {label}
          </Button>
        ))}
      </div>

      <div className="px-4 mt-auto">
        <Separator className="bg-[#444748]/20 mb-4" />
        <Link href="/" passHref legacyBehavior>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:bg-rose-950/40 hover:text-rose-300 py-5 rounded-lg text-sm transition-all"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sair do Painel
          </Button>
        </Link>
      </div>
    </div>
  );
};

const MobileSidebar = ({ setActiveTab, activeTab }: SidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden border-[#444748]/30 bg-[#0C0F0F] text-white hover:bg-[#1A1C1C]/50">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72 bg-[#0A0A0A] border-[#444748]/20">
        <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      </SheetContent>
    </Sheet>
  );
};

export default function Dashboard() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPublish, setLoadingPublish] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabsType>(TABS.VISAO_GERAL);
  
  const [totalCorridas, setTotalCorridas] = useState<number>(0);
  const [totalClientes, setTotalClientes] = useState<number>(0);
  const [totalCampanhas, setTotalCampanhas] = useState<number>(0);
  const [loadingStats, setLoadingStats] = useState<boolean>(true);

  const fetchStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      const [corridasSnap, clientesSnap, campanhasSnap] = await Promise.all([
        getDocs(collection(db, "corridas")),
        getDocs(collection(db, "clientes")),
        getDocs(collection(db, "campanhas"))
      ]);
      setTotalCorridas(corridasSnap.size);
      setTotalClientes(clientesSnap.size);
      setTotalCampanhas(campanhasSnap.size);
    } catch (e) {
      console.error("Erro ao carregar estatísticas do Firestore:", e);
    } finally {
      setLoadingStats(false);
    }
  }, []);

  const loadAvaliacoes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAvaliacoes(showArchived);
      setAvaliacoes(data);
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    } finally {
      setLoading(false);
    }
  }, [showArchived]);

  const handlePublish = async (id: string) => {
    setLoadingPublish(id);
    try {
      await publishAvaliacao(id);
      await loadAvaliacoes();
    } finally {
      setLoadingPublish(null);
    }
  };

  const handleArchive = async (id: string) => {
    await archiveAvaliacao(id);
    await loadAvaliacoes();
  };

  useEffect(() => {
    loadAvaliacoes();
    fetchStats();
  }, [loadAvaliacoes, fetchStats, activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case TABS.VISAO_GERAL:
        return (
          <Overview
            totalCorridas={totalCorridas}
            totalClientes={totalClientes}
            totalCampanhas={totalCampanhas}
            totalAvaliacoes={avaliacoes.length}
            setActiveTab={setActiveTab}
          />
        );
      case TABS.AVALIACOES:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#444748]/10 pb-4">
              <div>
                <h3 className="text-xl font-bold font-display text-white">Depoimentos dos Clientes</h3>
                <p className="text-sm text-[#c4c7c7]">Monitore, aprove e arquive as avaliações recebidas.</p>
              </div>
              <Button
                onClick={() => setShowArchived((prev) => !prev)}
                variant="outline"
                className="border-secondary/25 text-secondary bg-transparent hover:bg-secondary/10 hover:text-secondary-fixed transition-colors font-bold text-xs uppercase"
              >
                {showArchived ? "Ver Ativas" : "Ver Arquivadas"}
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                <p className="text-center col-span-3 text-[#c4c7c7] py-8">Carregando avaliações...</p>
              ) : avaliacoes.length > 0 ? (
                avaliacoes.map((avaliacao) => (
                  <AvaliacaoCard
                    key={avaliacao.id}
                    avaliacao={avaliacao}
                    onPublish={() => handlePublish(avaliacao.id)}
                    onArchive={() => handleArchive(avaliacao.id)}
                    isLoading={loadingPublish === avaliacao.id}
                    showArchived={showArchived}
                  />
                ))
              ) : (
                <p className="text-center col-span-3 text-[#c4c7c7] py-12 border border-dashed border-[#444748]/30 rounded-2xl bg-white/5">
                  Nenhuma avaliação encontrada.
                </p>
              )}
            </div>
          </div>
        );
      case TABS.AGENDA:
        return <Agenda />;
      case TABS.CLIENTES:
        return <Clientes />;
      case TABS.CUPONS:
        return <Cupons />;
      case TABS.RECIBOS:
        return <Recibo />;
      default:
        return <div className="text-[#c4c7c7]">Selecione uma opção no menu lateral para começar.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0F0F] text-[#e2e2e2] flex flex-col font-body">
      {/* Header Mobile e Topbar */}
      <header className="bg-[#0A0A0A] text-white h-16 border-b border-[#444748]/20 flex items-center px-6 lg:px-8 z-30 sticky top-0">
        <MobileSidebar setActiveTab={setActiveTab} activeTab={activeTab} />
        
        <div className="ml-4 lg:ml-0 flex items-center space-x-2">
          <span className="hidden lg:flex items-center text-xs font-bold text-secondary tracking-widest uppercase bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full">
            <Award className="w-3.5 h-3.5 mr-1.5" />
            Serviço Executivo Ativo
          </span>
        </div>

        <div className="ml-auto flex items-center space-x-6">
          <Link href="/apresentacao" passHref legacyBehavior>
            <a className="text-xs lg:text-sm text-gray-400 hover:text-white flex items-center transition group">
              <Sparkles className="w-4 h-4 mr-1.5 text-secondary animate-pulse group-hover:scale-110 transition" />
              <span className="hidden sm:inline">Demonstração Interativa</span>
            </a>
          </Link>
          <Link href="/" passHref legacyBehavior>
            <a className="text-xs lg:text-sm text-gray-400 hover:text-white flex items-center transition">
              <Home className="w-4 h-4 mr-1.5 text-secondary" />
              <span className="hidden sm:inline">Visualizar Site</span>
            </a>
          </Link>
        </div>
      </header>

      <div className="flex flex-1 h-[calc(100vh-4rem)]">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
        </aside>

        {/* Painel Principal */}
        <main className="flex-1 overflow-y-auto w-full p-6 lg:p-8 space-y-8 bg-[#0C0F0F]">
          {/* Renderizador das abas do Painel */}
          <div className="glass-card p-6 rounded-2xl border border-secondary/10 shadow-lg min-h-[500px] bg-transparent text-white">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}