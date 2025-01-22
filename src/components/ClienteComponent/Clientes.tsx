import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa'; // Usando o ícone de "+" da react-icons
import ClienteForm from './ClienteForm';
import ClienteList from './ClienteList';
import ClienteSearch from './ClienteSearch';
import { getClientes } from '../../services/clienteService'; // Importe o serviço de clientes
import { format } from 'date-fns'; // Importação necessária para formatar datas


// Definindo uma interface para os dados de cliente
interface Cliente {
    id: string;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
}

const Clientes: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClient, setSelectedClient] = useState<Cliente | null>(null); // Tipo de selectedClient
    const [clients, setClients] = useState<Cliente[]>([]); // Lista de clientes com o tipo correto
    const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar o formulário
    
    const formattedDate = format(new Date(), 'dd/MM/yyyy'); // Usando a função 'format'
    console.log(formattedDate); // Exibe a data formatada
    
    useEffect(() => {
        const fetchClients = async () => {
            const fetchedClients = await getClientes();
            setClients(fetchedClients);
        };
        fetchClients();
    }, []); // Carregar clientes apenas uma vez ao montar o componente

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleSelectClient = (client: Cliente) => {
        setSelectedClient(client);
    };

    const toggleForm = () => {
        setShowForm(prev => !prev); // Alterna o estado de visibilidade do formulário
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

            <ClienteSearch clients={clients} onSearch={handleSearch} />
            <ClienteList searchQuery={searchQuery} onSelectClient={handleSelectClient} />
        </div>
    );
};

export default Clientes;
