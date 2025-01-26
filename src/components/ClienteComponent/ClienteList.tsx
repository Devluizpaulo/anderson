import React from 'react';
import { Cliente } from './ClienteSearch'; // Tipo Cliente atualizado
import { db } from '../../services/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

interface ClienteListProps {
  clients: Cliente[];
  onSelectClient: (client: Cliente) => void;
}

const ClienteList: React.FC<ClienteListProps> = ({ clients, onSelectClient }) => {
  const handleDelete = async (id: string) => {
    try {
      // Excluindo o cliente do Firestore
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
        <li key={client.id} className="border-b py-2">
          {/* Exibição do nome e sobrenome do cliente */}
          <span className="font-bold">{client.nome} {client.sobrenome}</span>

          {/* Exibindo o e-mail */}
          <div>{client.email}</div>

          {/* Exibindo o endereço completo */}
          <div>
            {client.endereco.rua}, {client.endereco.numero} {client.endereco.complemento && `- ${client.endereco.complemento}`}<br />
            {client.endereco.bairro} - {client.endereco.cidade}, {client.endereco.estado} - {client.endereco.pais}<br />
            CEP: {client.endereco.cep}
          </div>

          {/* Exibindo observações */}
          <div className="text-gray-500">{client.observacoes || 'Sem observações'}</div>

          {/* Botões de editar e excluir */}
          <div className="mt-2">
            <button
              onClick={() => onSelectClient(client)}
              className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(client.id)}
              className="bg-red-600 text-white px-4 py-2 rounded"
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
