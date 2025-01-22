import React, { useState, useEffect } from 'react';
import { getClientes } from '../../services/clienteService';

interface ClienteSearchProps {
  onSearch: (query: string) => void;
}

const ClienteSearch: React.FC<ClienteSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [filteredClients, setFilteredClients] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const clientsList = await getClientes();
      setClients(clientsList);
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
