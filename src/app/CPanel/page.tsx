"use client";

import { useState, useEffect } from "react";
import { FaUser, FaCalendarAlt, FaClipboardList, FaTag, FaFileInvoice } from "react-icons/fa";
import HeaderCpanel from "../../components/HeaderCpanel";
import { fetchAvaliacoes, publishAvaliacao, archiveAvaliacao, Avaliacao } from "../../services/avaliacoes";
import AvaliacaoCard from "../../components/AvaliacaoCard";
import Recibo from "../../components/Recibo";
import Cupons from "../../components/CuponsDesconto";
import Agenda from "../../components/Agenda";
import Clientes from "../../components/Clientes";

const TABS = {
  AVALIACOES: "avaliacoes",
  AGENDA: "agenda",
  CLIENTES: "clientes",
  CUPONS: "cupons",
  RECIBOS: "recibos",
};

const Sidebar: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => (
  <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
    <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
    <button
      onClick={() => setActiveTab(TABS.AVALIACOES)}
      className="flex items-center px-4 py-2 mb-2 bg-blue-600 rounded hover:bg-blue-700 w-full"
    >
      <FaClipboardList className="mr-2" /> Avaliações
    </button>
    <button
      onClick={() => setActiveTab(TABS.AGENDA)}
      className="flex items-center px-4 py-2 mb-2 bg-blue-600 rounded hover:bg-blue-700 w-full"
    >
      <FaCalendarAlt className="mr-2" /> Agenda
    </button>
    <button
      onClick={() => setActiveTab(TABS.CLIENTES)}
      className="flex items-center px-4 py-2 mb-2 bg-blue-600 rounded hover:bg-blue-700 w-full"
    >
      <FaUser className="mr-2" /> Clientes
    </button>
    <button
      onClick={() => setActiveTab(TABS.CUPONS)}
      className="flex items-center px-4 py-2 mb-2 bg-blue-600 rounded hover:bg-blue-700 w-full"
    >
      <FaTag className="mr-2" /> Cupons
    </button>
    <button
      onClick={() => setActiveTab(TABS.RECIBOS)}
      className="flex items-center px-4 py-2 mb-2 bg-blue-600 rounded hover:bg-blue-700 w-full"
    >
      <FaFileInvoice className="mr-2" /> Recibos
    </button>
  </div>
);

const CPanel: React.FC = () => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPublish, setLoadingPublish] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>(TABS.AVALIACOES);

  const loadAvaliacoes = async () => {
    setLoading(true);
    try {
      const data = await fetchAvaliacoes(showArchived);
      setAvaliacoes(data);
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    } finally {
      setLoading(false);
    }
  };

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
  }, [activeTab, showArchived]); // Recarregar avaliações quando o tab ativo ou a visualização de arquivadas mudar

  const renderContent = () => {
    switch (activeTab) {
      case TABS.AVALIACOES:
        return (
          <div>
            <button
              onClick={() => setShowArchived((prev) => !prev)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-6"
            >
              {showArchived ? "Ver Ativas" : "Ver Arquivadas"}
            </button>
            <section className="mt-8 grid gap-6">
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
      <Sidebar setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <HeaderCpanel />
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default CPanel;
