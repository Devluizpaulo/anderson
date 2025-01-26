import React, { useState, useEffect } from 'react';
import { getClientes } from '../../services/clienteService';

interface Cliente {
  id: string;
  name: string;
}

interface ClienteSearchProps {
  onSearch: (query: string) => void;
}

const ClienteSearch: React.FC<ClienteSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState<Cliente[]>([]); // Usando o tipo Cliente aqui
  const [filteredClients, setFilteredClients] = useState<Cliente[]>([]); // Também usando o tipo Cliente

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientsList = await getClientes();
        // Garantindo que o retorno seja tratado como um array de Cliente
        setClients(clientsList as unknown as Cliente[]); 
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = clients.filter((client) =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clients);  // Exibir todos os clientes se a pesquisa estiver vazia
    }
  }, [searchQuery, clients]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);  // Passa a pesquisa para o componente pai
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Buscar cliente"
        aria-label="Buscar cliente"  // Melhora a acessibilidade
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {filteredClients.length > 0 && (
        <ul className="mt-2 border rounded bg-white shadow-md">
          {filteredClients.map((client) => (
            <li key={client.id} className="p-2 hover:bg-gray-100 cursor-pointer">
              {client.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClienteSearch;
