"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaClipboardList,
  FaTag,
  FaFileInvoice,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import HeaderCpanel from "../../components/HeaderCpanel";
import {
  fetchAvaliacoes,
  publishAvaliacao,
  archiveAvaliacao,
  Avaliacao,
} from "../../services/avaliacoes";
import AvaliacaoCard from "../../components/AvaliacaoCard";
import Recibo from "../../components/Recibo";
import Cupons from "../../components/CuponsDesconto";
import Agenda from "../../components/Agenda";
import Clientes from "../../components/ClienteComponent/Clientes";

const TABS = {
  AVALIACOES: "avaliacoes",
  AGENDA: "agenda",
  CLIENTES: "clientes",
  CUPONS: "cupons",
  RECIBOS: "recibos",
};

const Sidebar: React.FC<{
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}> = ({ setActiveTab, isOpen, toggleSidebar }) => (
  <aside
    className={`fixed z-40 top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-lg transform transition-transform ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } lg:translate-x-0 lg:static`}
  >
    <div className="flex items-center justify-between p-6 border-b border-gray-700">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <button
        onClick={toggleSidebar}
        className="text-white lg:hidden focus:outline-none"
      >
        <FaTimes size={24} />
      </button>
    </div>
    <nav className="flex-1 p-4 space-y-4">
      {[
        { tab: TABS.AVALIACOES, label: "Avaliações", icon: FaClipboardList },
        { tab: TABS.AGENDA, label: "Agenda", icon: FaCalendarAlt },
        { tab: TABS.CLIENTES, label: "Clientes", icon: FaUser },
        { tab: TABS.CUPONS, label: "Cupons", icon: FaTag },
        { tab: TABS.RECIBOS, label: "Recibos", icon: FaFileInvoice },
      ].map(({ tab, label, icon: Icon }) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className="flex items-center gap-3 p-3 w-full bg-gray-700 rounded-md hover:bg-gray-600 transition"
        >
          <Icon className="text-white w-5 h-5" />
          {label}
        </button>
      ))}
    </nav>
  </aside>
);

const CPanel: React.FC = () => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPublish, setLoadingPublish] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>(TABS.AVALIACOES);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

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
  }, [activeTab, showArchived, loadAvaliacoes]);

  const renderContent = () => {
    switch (activeTab) {
      case TABS.AVALIACOES:
        return (
          <div>
            <button
              onClick={() => setShowArchived((prev) => !prev)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 mb-6 transition"
            >
              {showArchived ? "Ver Ativas" : "Ver Arquivadas"}
            </button>
            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            </section>
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
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col">
        <HeaderCpanel />
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <FaBars size={24} />
        </button>
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <h3 className="text-xl font-bold">Últimas Avaliações</h3>
              <p>{avaliacoes.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <h3 className="text-xl font-bold">Próximos Eventos</h3>
              <p>3 eventos agendados</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <h3 className="text-xl font-bold">Clientes Ativos</h3>
              <p>120</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <h3 className="text-xl font-bold">Cupons Emitidos</h3>
              <p>50</p>
            </div>
          </section>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default CPanel;
