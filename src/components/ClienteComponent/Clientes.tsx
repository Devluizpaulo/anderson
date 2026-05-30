import React, { useState } from "react";
import { useClientes } from "../../hooks/useClientes";
import { ClienteForm } from "./ClienteForm";
import { ClienteList } from "./ClienteList";
import { ClienteSearch } from "./ClienteSearch";
import { Cliente } from "./types";
import { Users, Sparkles, UserPlus } from "lucide-react";

export const Clientes: React.FC = () => {
  const {
    clients,
    filteredClients,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    addCliente,
    updateCliente,
    deleteCliente,
  } = useClientes();

  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);

  const handleFormSubmit = async (clientData: Omit<Cliente, "id">) => {
    if (selectedClient) {
      await updateCliente(selectedClient.id, clientData);
      setSelectedClient(null);
    } else {
      await addCliente(clientData);
    }
  };

  const handleCancel = () => {
    setSelectedClient(null);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Cabeçalho da Aba */}
      <div className="flex items-center justify-between border-b border-white/5 pb-5">
        <div>
          <h2 className="text-xl font-bold font-display text-white flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-[#e9c349]" />
            Contatos & Clientes Frequentes
          </h2>
          <p className="text-xs text-[#c4c7c7] mt-1">
            Cadastre os endereços habituais dos passageiros corporativos para acelerar novos agendamentos e orçamentos.
          </p>
        </div>
        <div className="w-12 h-10 px-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center space-x-1.5 text-xs text-[#e9c349] font-bold font-mono">
          <Users className="w-4 h-4" />
          <span>{clients.length}</span>
        </div>
      </div>

      {/* Grid Dual Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coluna Esquerda: Busca e Lista de Contatos */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-left mb-1">
            <h4 className="text-xs font-semibold text-[#c4c7c7] uppercase tracking-wider">
              Listagem de Contatos
            </h4>
            <p className="text-[10px] text-gray-500 mt-0.5">
              Pesquise por qualquer palavra-chave ou clique para editar os registros.
            </p>
          </div>

          <ClienteSearch onSearch={setSearchQuery} />

          {loading && clients.length === 0 ? (
            <p className="text-center text-[#c4c7c7] py-12 text-sm">Carregando contatos...</p>
          ) : error ? (
            <p className="text-center text-red-400 py-12 text-sm">{error}</p>
          ) : (
            <ClienteList
              clients={filteredClients}
              onSelectClient={setSelectedClient}
              onDeleteClient={deleteCliente}
            />
          )}
        </div>

        {/* Coluna Direita: Formulário Fixo de Cadastro */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="text-left mb-1">
            <h4 className="text-xs font-semibold text-[#c4c7c7] uppercase tracking-wider">
              {selectedClient ? "Modo de Edição" : "Cadastro de Passageiros"}
            </h4>
            <p className="text-[10px] text-gray-500 mt-0.5">
              Preencha o formulário para salvar ou editar dados de faturamento.
            </p>
          </div>

          <ClienteForm
            selectedClient={selectedClient}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default Clientes;