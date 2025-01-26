import React from 'react';
import { Cliente } from './ClienteSearch';
import { db } from '../../services/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

interface ClienteListProps {
  clients: Cliente[];
  onSelectClient: (client: Cliente) => void;
}

const ClienteList: React.FC<ClienteListProps> = ({ clients, onSelectClient }) => {
  const handleDelete = async (id: string) => {
    try {
      const clientRef = doc(db, 'clientes', id);
      await deleteDoc(clientRef);
      alert('Cliente excluído com sucesso');
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      alert('Erro ao excluir cliente');
    }
  };

  return (
    <ul>
      {clients.map((client) => (
        <li key={client.id}>
          <span>{client.name}</span>
          <span>{client.email}</span>
          <button onClick={() => onSelectClient(client)}>Editar</button>
          <button onClick={() => handleDelete(client.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};

export default ClienteList;
