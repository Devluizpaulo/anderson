import { db, collection, getDocs } from './firebase';

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
  try {
    const clientesCollection = collection(db, 'clientes');
    const snapshot = await getDocs(clientesCollection);

    // Verifica se o snapshot contém documentos
    if (snapshot.empty) {
      console.warn('Nenhum cliente encontrado.');
      return []; // Retorna um array vazio se não houver clientes
    }

    const clientesList: Cliente[] = snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Cliente, 'id'>; // Exclui o campo 'id' da tipagem
      return {
        id: doc.id,  // Adiciona o 'id' do documento
        ...data,      // Combina com os outros dados do cliente
      };
    });

    return clientesList;

  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw new Error("Não foi possível carregar os clientes."); // Lança um erro específico
  }
};

export { getClientes };
