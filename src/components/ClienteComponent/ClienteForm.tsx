import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

// Interfaces para os dados do cliente
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

// Propriedades para o componente ClienteForm
interface ClienteFormProps {
  selectedClient: Cliente | null;
  onSubmit: () => void;
}

const ClienteForm: React.FC<ClienteFormProps> = ({ selectedClient, onSubmit }) => {
  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    pais: '',
    cep: ''
  });
  const [observacoes, setObservacoes] = useState('');

  // Efeito para preencher os campos quando um cliente for selecionado
  useEffect(() => {
    if (selectedClient) {
      setNome(selectedClient.nome);
      setSobrenome(selectedClient.sobrenome);
      setEmail(selectedClient.email);
      setEndereco(selectedClient.endereco);
      setObservacoes(selectedClient.observacoes);
    }
  }, [selectedClient]);

  // Função para buscar endereço com base no CEP
  const buscarEnderecoPorCep = async (cep: string) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setEndereco({
            rua: data.logradouro,
            numero: '',
            complemento: data.complemento || '',
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
            pais: 'Brasil', // Como o Viacep é para o Brasil
            cep: data.cep
          });
        } else {
          alert('CEP não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
        alert('Erro ao buscar o CEP.');
      }
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const clienteData = {
      nome,
      sobrenome,
      email,
      endereco,
      observacoes
    };

    if (selectedClient) {
      // Atualizar cliente existente
      const clientRef = doc(db, 'clientes', selectedClient.id);
      await updateDoc(clientRef, clienteData);
    } else {
      // Cadastrar novo cliente
      const newDocRef = doc(db, 'clientes');
      await setDoc(newDocRef, clienteData);
    }

    onSubmit(); // Chama a função para atualizar a lista de clientes ou fechar o formulário
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
      </div>

      <div>
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
        />
      </div>

      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>

      <div>
        <input
          type="text"
          value={endereco.cep}
          onChange={(e) => {
            const newCep = e.target.value;
            setEndereco((prev) => ({ ...prev, cep: newCep }));
            buscarEnderecoPorCep(newCep);
          }}
          placeholder="CEP"
        />
      </div>

      <div>
        <input
          type="text"
          value={endereco.rua}
          onChange={(e) => setEndereco((prev) => ({ ...prev, rua: e.target.value }))}
          placeholder="Rua/Av"
        />
      </div>

      <div>
        <input
          type="text"
          value={endereco.numero}
          onChange={(e) => setEndereco((prev) => ({ ...prev, numero: e.target.value }))}
          placeholder="Número"
        />
      </div>

      <div>
        <input
          type="text"
          value={endereco.complemento}
          onChange={(e) => setEndereco((prev) => ({ ...prev, complemento: e.target.value }))}
          placeholder="Complemento"
        />
      </div>

      <div>
        <input
          type="text"
          value={endereco.bairro}
          onChange={(e) => setEndereco((prev) => ({ ...prev, bairro: e.target.value }))}
          placeholder="Bairro"
        />
      </div>

      <div>
        <input
          type="text"
          value={endereco.cidade}
          onChange={(e) => setEndereco((prev) => ({ ...prev, cidade: e.target.value }))}
          placeholder="Cidade"
        />
      </div>

      <div>
        <input
          type="text"
          value={endereco.estado}
          onChange={(e) => setEndereco((prev) => ({ ...prev, estado: e.target.value }))}
          placeholder="Estado"
        />
      </div>

      <div>
        <input
          type="text"
          value={endereco.pais}
          onChange={(e) => setEndereco((prev) => ({ ...prev, pais: e.target.value }))}
          placeholder="País"
        />
      </div>

      <div>
        <textarea
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          placeholder="Observações"
        />
      </div>

      <div>
        <button type="submit">{selectedClient ? 'Atualizar Cliente' : 'Cadastrar Cliente'}</button>
      </div>
    </form>
  );
};

export default ClienteForm;
