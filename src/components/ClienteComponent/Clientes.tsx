import React, { useEffect, useState } from 'react';
import ClienteForm from './ClienteForm';
import ClienteList from './ClienteList';
import ClienteSearch from './ClienteSearch';
import { db } from '../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Cliente {
  id: string;
  name: string;
  email: string;
}

const Clientes: React.FC = () => {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'clientes'));
        const clientsData: Cliente[] = [];
        querySnapshot.forEach((doc) => {
          clientsData.push({ id: doc.id, ...doc.data() } as Cliente);
        });
        setClients(clientsData);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClients();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectClient = (client: Cliente) => {
    setSelectedClient(client);
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Clientes</h1>
      <ClienteSearch onSearch={handleSearch} />
      <ClienteForm selectedClient={selectedClient} onSubmit={() => setSelectedClient(null)} />
      <ClienteList clients={filteredClients} onSelectClient={handleSelectClient} />
    </div>
  );
};

export default Clientes;
