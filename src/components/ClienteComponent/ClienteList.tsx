import React, { useEffect, useState } from 'react';
import { db } from '../../services/firebase'; // Verifique se 'db' está configurado corretamente
import { collection, getDocs, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';

interface Cliente {
  id: string;
  nome: string;
  email: string;
}

interface ClienteListProps {
  searchQuery: string;
  onSelectClient: (client: Cliente) => void;
}

const ClienteList: React.FC<ClienteListProps> = ({ searchQuery, onSelectClient }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'clientes'));
        const clientsData: Cliente[] = [];
        querySnapshot.forEach((doc) => {
          clientsData.push({ id: doc.id, ...doc.data() } as Cliente);
        });
        setClientes(clientsData);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClients();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      if (typeof id !== 'string') {
        console.error('O ID fornecido não é uma string:', id);
        return;
      }

      // Primeiro, mova o cliente para a coleção de arquivados
      const clientRef = doc(db, 'clientes', id);
      const clientSnapshot = await clientRef.get();
      if (!clientSnapshot.exists()) {
        console.error('Cliente não encontrado.');
        return;
      }

      const clientData = clientSnapshot.data();
      const archivedClientRef = doc(db, 'clientes_arquivados', id); // Coleção de arquivados
      await setDoc(archivedClientRef, { ...clientData, archivedAt: new Date() }); // Arquiva com data

      // Após arquivar, exclua o cliente da coleção original
      await deleteDoc(clientRef);

      setClientes((prevClientes) => prevClientes.filter((cliente) => cliente.id !== id));
      console.log('Cliente arquivado e excluído com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  const handleUpdate = async (id: string, updatedData: Partial<Cliente>) => {
    try {
      if (typeof id !== 'string') {
        console.error('O ID fornecido não é uma string:', id);
        return;
      }

      const clientRef = doc(db, 'clientes', id);
      await updateDoc(clientRef, updatedData);
      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente.id === id ? { ...cliente, ...updatedData } : cliente
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    }
  };

  const filteredClients = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ul className="bg-white shadow-md rounded p-4">
      {filteredClients.map((cliente) => (
        <li
          key={cliente.id}
          className="flex justify-between items-center border-b py-2 cursor-pointer hover:bg-gray-100"
          onClick={() => onSelectClient(cliente)}
        >
          <span>{cliente.nome}</span>
          <span className="text-gray-500 text-sm">{cliente.email}</span>
          <div className="ml-2 flex space-x-2">
            <button
              onClick={() => handleUpdate(cliente.id, { nome: 'Novo Nome' })}
              className="text-blue-500 hover:text-blue-700"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(cliente.id)}
              className="text-red-500 hover:text-red-700"
            >
              Excluir
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ClienteList;
