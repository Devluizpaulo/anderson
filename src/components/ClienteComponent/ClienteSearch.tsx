// src/components/ClienteComponent/ClienteSearch.tsx
import React, { useState, useEffect } from 'react';
import { getClientes } from '../../services/clienteService';

interface ClienteSearchProps {
  clients: { id: string; name: string }[];  // Tipo de clientes
  onSearch: (query: string) => void;
}

const ClienteSearch: React.FC<ClienteSearchProps> = ({ clients, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClients, setFilteredClients] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = clients.filter((client) =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients([]);
    }
  }, [searchQuery, clients]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Buscar cliente"
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
