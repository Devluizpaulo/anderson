import { db, collection, getDocs, DocumentData } from './firebase';

// Defina a interface para os dados de um cliente
interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

// Função para buscar clientes no Firestore
const getClientes = async (): Promise<Cliente[]> => {
  const clientesCollection = collection(db, 'clientes');
  const snapshot = await getDocs(clientesCollection);
  const clientesList: Cliente[] = snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Cliente, 'id'>; // exclui o campo 'id' da tipagem de 'Cliente'
    return {
      id: doc.id,
      ...data,
    };
  });
  return clientesList;
};

export { getClientes };
