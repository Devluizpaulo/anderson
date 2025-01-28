"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users,
  Calendar,
  ClipboardList,
  Tag,
  FileText,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

const TABS = {
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
    { tab: TABS.AVALIACOES, label: "Avaliações", icon: ClipboardList },
    { tab: TABS.AGENDA, label: "Agenda", icon: Calendar },
    { tab: TABS.CLIENTES, label: "Clientes", icon: Users },
    { tab: TABS.CUPONS, label: "Cupons", icon: Tag },
    { tab: TABS.RECIBOS, label: "Recibos", icon: FileText },
  ];

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
        <div className="space-y-1">
          {navItems.map(({ tab, label, icon: Icon }) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab(tab)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

const MobileSidebar = ({ setActiveTab, activeTab }: SidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
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
  const [activeTab, setActiveTab] = useState<TabsType>(TABS.AVALIACOES);

  const stats = [
    { title: "Últimas Avaliações", value: avaliacoes.length.toString() },
    { title: "Próximos Eventos", value: "3" },
    { title: "Clientes Ativos", value: "120" },
    { title: "Cupons Emitidos", value: "50" },
  ];

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
  }, [loadAvaliacoes]);

  const renderContent = () => {
    switch (activeTab) {
      case TABS.AVALIACOES:
        return (
          <div className="space-y-4">
            <Button
              onClick={() => setShowArchived((prev) => !prev)}
              variant="outline"
            >
              {showArchived ? "Ver Ativas" : "Ver Arquivadas"}
            </Button>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                <p>Carregando avaliações...</p>
              ) : (
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
        return <div>Selecione uma opção para começar.</div>;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MobileSidebar setActiveTab={setActiveTab} activeTab={activeTab} />
          <div className="ml-auto flex items-center space-x-4">
            {/* Add user menu or other header items here */}
          </div>
        </div>
      </div>
      <div className="flex h-[calc(100vh-4rem)]">
        <aside className="hidden lg:block w-72 border-r bg-gray-100/40">
          <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
        </aside>
        <main className="flex-1 overflow-y-auto w-full">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Separator />
              {renderContent()}
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}