import React, { useEffect, useState } from 'react';
import ClienteForm from './ClienteForm';
import ClienteList from './ClienteList';
import ClienteSearch from './ClienteSearch'; // Importação corrigida
import { db } from '../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'; // Importe os componentes do shadcn

interface Cliente {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  endereco: {
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
    cep: string;
  };
  observacoes: string;
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

  const filteredClients = clients.filter(
    (client) =>
      client.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.sobrenome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <ClienteSearch onSearch={handleSearch} />
          <ClienteForm selectedClient={selectedClient} onSubmit={() => setSelectedClient(null)} />
          <ClienteList clients={filteredClients} onSelectClient={handleSelectClient} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Clientes;