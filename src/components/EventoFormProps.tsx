import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  // Adicione outros campos se necessário
}

interface EventoFormProps {
  onEventoCadastrado: () => void;
}

const EventoForm = ({ onEventoCadastrado }: EventoFormProps) => {
  const [nomeCliente, setNomeCliente] = useState<string>('');
  const [clientesEncontrados, setClientesEncontrados] = useState<Cliente[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null); // Estado para armazenar o cliente selecionado
  const [titulo, setTitulo] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [data, setData] = useState<Date>(new Date());
  const [local, setLocal] = useState<string>('');
  const [mostrarCadastroCliente, setMostrarCadastroCliente] = useState<boolean>(false); // Exibir formulário de cadastro de cliente

  // Função para pesquisar clientes
  const pesquisarCliente = async (nome: string) => {
    if (nome.length > 2) {  // A pesquisa começa após 3 caracteres
      const clientesRef = collection(db, 'clientes');
      const q = query(clientesRef, where('nome', '>=', nome), where('nome', '<=', nome + '\uf8ff'));
      try {
        const querySnapshot = await getDocs(q);
        const clientes: Cliente[] = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));

        setClientesEncontrados(clientes);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    } else {
      setClientesEncontrados([]);  // Limpa a pesquisa se o nome for muito curto
    }
  };

  // Função para salvar um novo cliente
  const cadastrarCliente = async () => {
    try {
      const clienteRef = collection(db, 'clientes');
      const docRef = await addDoc(clienteRef, {
        nome: nomeCliente,
        cpf: '000.000.000-00', // Simplesmente como exemplo, adicione outros campos necessários
        telefone: '0000000000',
        // Adicione mais campos conforme necessário
      });
      setClienteSelecionado({
        id: docRef.id,
        nome: nomeCliente,
        cpf: '000.000.000-00',
        telefone: '0000000000',
      });
      setMostrarCadastroCliente(false);  // Fecha o formulário de cadastro de cliente
      alert('Cliente cadastrado com sucesso!');
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
    }
  };

  // Efeito para pesquisar o cliente ao digitar
  useEffect(() => {
    pesquisarCliente(nomeCliente);
  }, [nomeCliente]);

  // Função para salvar evento
  const salvarEvento = () => {
    // Lógica para salvar o evento, considerando dados como nome do cliente, etc.
    onEventoCadastrado();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Cadastro de Evento</h2>

      {/* Campo de busca do cliente */}
      <div className="mb-4">
        <input
          type="text"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Digite o nome do cliente"
        />
        {clientesEncontrados.length > 0 && (
          <div className="mt-2">
            <ul>
              {clientesEncontrados.map(cliente => (
                <li
                  key={cliente.id}
                  className="py-1 cursor-pointer"
                  onClick={() => setClienteSelecionado(cliente)}
                >
                  {cliente.nome}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Se nenhum cliente for selecionado e o nome for suficiente para cadastro */}
      {!clienteSelecionado && nomeCliente.length > 2 && !mostrarCadastroCliente && (
        <div className="text-center mb-4">
          <button
            onClick={() => setMostrarCadastroCliente(true)}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Cadastrar Novo Cliente
          </button>
        </div>
      )}

      {/* Formulário de cadastro de novo cliente */}
      {mostrarCadastroCliente && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Cadastrar Cliente</h3>
          <button
            onClick={cadastrarCliente}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Confirmar Cadastro
          </button>
        </div>
      )}

      {/* Exibe o nome do cliente selecionado */}
      {clienteSelecionado && (
        <div className="mb-4">
          <p>Cliente Selecionado: {clienteSelecionado.nome}</p>
        </div>
      )}

      {/* Título do Evento */}
      <div className="mb-4">
        <label className="block text-gray-700">Título do Evento</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Título do evento"
        />
      </div>

      {/* Descrição do Evento */}
      <div className="mb-4">
        <label className="block text-gray-700">Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Descrição do evento"
        />
      </div>

      {/* Data do Evento */}
      <div className="mb-4">
        <label className="block text-gray-700">Data do Evento</label>
        <input
          type="datetime-local"
          value={data.toISOString().slice(0, 16)}
          onChange={(e) => setData(new Date(e.target.value))}
          className="border p-2 w-full rounded"
        />
      </div>

      {/* Local do Evento */}
      <div className="mb-4">
        <label className="block text-gray-700">Local</label>
        <input
          type="text"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Local do evento"
        />
      </div>

      {/* Botão de Salvar */}
      <div className="text-center">
        <button
          onClick={salvarEvento}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Salvar Evento
        </button>
      </div>
    </div>
  );
};

export default EventoForm;
