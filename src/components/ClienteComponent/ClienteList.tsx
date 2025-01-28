import React from 'react';
import { Cliente } from './ClienteSearch'; // Tipo Cliente atualizado
import { db } from '../../services/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'; // Componentes Table do shadcn
import { Button } from '../ui/button'; // Componente Button do shadcn

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Sobrenome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Endereço</TableHead>
          <TableHead>Observações</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell>{client.nome}</TableCell>
            <TableCell>{client.sobrenome}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>
              {client.endereco.rua}, {client.endereco.numero}{' '}
              {client.endereco.complemento && `- ${client.endereco.complemento}`}
              <br />
              {client.endereco.bairro} - {client.endereco.cidade}, {client.endereco.estado} -{' '}
              {client.endereco.pais}
              <br />
              CEP: {client.endereco.cep}
            </TableCell>
            <TableCell>{client.observacoes || 'Sem observações'}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => onSelectClient(client)}
                >
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(client.id)}
                >
                  Excluir
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClienteList;