import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa'; // Usando o ícone de "+" da react-icons
import ClienteForm from './ClienteForm';
import ClienteList from './ClienteList';
import ClienteSearch from './ClienteSearch';
import { getClientes } from '../../services/clienteService'; // Importe o serviço de clientes

// Definindo uma interface para os dados de cliente
interface Cliente {
    id: string;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
}

const Clientes: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState(''); // Filtro de busca
    const [selectedClient, setSelectedClient] = useState<Cliente | null>(null); // Cliente selecionado
    const [clients, setClients] = useState<Cliente[]>([]); // Lista de clientes
    const [showForm, setShowForm] = useState(false); // Estado para exibir/ocultar o formulário

    // Carregar os clientes quando o componente for montado
    useEffect(() => {
        const fetchClients = async () => {
            const fetchedClients = await getClientes();
            setClients(fetchedClients); // Armazenar clientes no estado
        };
        fetchClients();
    }, []); // Carregar clientes apenas uma vez

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
        setShowForm(prev => !prev); // Alterna entre mostrar e esconder o formulário
    };

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
            <ClienteSearch clients={clients} onSearch={handleSearch} />

            {/* Componente que lista os clientes */}
            <ClienteList searchQuery={searchQuery} onSelectClient={handleSelectClient} />
        </div>
    );
};

export default Clientes;
