import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa'; // Ícone de "+" da react-icons
import ClienteForm from './ClienteForm';
import ClienteList from './ClienteList';
import ClienteSearch from './ClienteSearch';
import { getClientes } from '../../services/clienteService'; // Serviço para obter a lista de clientes

// Interface para os dados de cliente
interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

const Clientes: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // Filtro de busca
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null); // Cliente selecionado
  const [clients, setClients] = useState<Cliente[]>([]); // Lista de clientes
  const [showForm, setShowForm] = useState<boolean>(false); // Estado para exibir/ocultar o formulário
  const [loading, setLoading] = useState<boolean>(false); // Estado para controle de carregamento
  const [error, setError] = useState<string | null>(null); // Estado para controle de erros

  // Carregar os clientes quando o componente for montado
  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true); // Inicia o carregamento
      setError(null); // Reseta qualquer erro anterior
      try {
        const fetchedClients = await getClientes(); // Chama o serviço para buscar clientes
        setClients(fetchedClients); // Armazena os clientes no estado
      } catch (err) {
        // Tratamento de erro aprimorado
        setError('Erro ao carregar os clientes.'); // Atualiza o estado de erro
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };
    fetchClients();
  }, []); // Executa uma vez, ao montar o componente

  // Função de busca
  const handleSearch = (query: string) => {
    setSearchQuery(query); // Atualiza o filtro de busca
  };

  // Função para selecionar um cliente
  const handleSelectClient = (client: Cliente) => {
    setSelectedClient(client); // Atualiza o cliente selecionado
  };

  // Função para alternar a visibilidade do formulário
  const toggleForm = () => {
    setShowForm((prev) => !prev); // Alterna entre mostrar e esconder o formulário
  };

  // Filtra os clientes com base no query de busca
  const filteredClients = clients.filter((client) =>
    client.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.cpf.includes(searchQuery) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Clientes</h1>

      {/* Botão para alternar a exibição do formulário */}
      <button
        onClick={toggleForm}
        className="bg-blue-500 text-white p-2 rounded-full shadow-md mb-4"
      >
        <FaPlus size={24} /> {/* Ícone de "+" */}
      </button>

      {/* Exibe o formulário apenas se showForm for verdadeiro */}
      {showForm && <ClienteForm selectedClient={selectedClient} />}

      {/* Componente de busca */}
      <ClienteSearch onSearch={handleSearch} />

      {/* Exibe mensagens de erro, se houver */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Exibe o estado de carregamento */}
      {loading ? (
        <p>Carregando clientes...</p>
      ) : (
        // Componente que lista os clientes filtrados
        <ClienteList clients={filteredClients} onSelectClient={handleSelectClient} />
      )}
    </div>
  );
};

export default Clientes;
