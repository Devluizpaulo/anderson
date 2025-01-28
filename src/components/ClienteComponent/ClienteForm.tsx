import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { PhoneIcon, MapPinIcon, PencilIcon } from '@heroicons/react/20/solid';
import { Input } from '../ui/input'; // Importe o componente Input do shadcn
import { Button } from '../ui/button'; // Importe o componente Button do shadcn
import { Textarea } from '../ui/textarea'; // Importe o componente Textarea do shadcn
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'; // Importe os componentes Card do shadcn

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

  useEffect(() => {
    if (selectedClient) {
      setNome(selectedClient.nome);
      setSobrenome(selectedClient.sobrenome);
      setEmail(selectedClient.email);
      setEndereco(selectedClient.endereco);
      setObservacoes(selectedClient.observacoes);
    }
  }, [selectedClient]);

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
            pais: 'Brasil',
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
      const clientRef = doc(db, 'clientes', selectedClient.id);
      await updateDoc(clientRef, clienteData);
    } else {
      const newDocRef = doc(db, 'clientes');
      await setDoc(newDocRef, clienteData);
    }

    onSubmit(); // Chama a função para atualizar a lista de clientes ou fechar o formulário
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{selectedClient ? 'Editar Cliente' : 'Cadastrar Cliente'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <PencilIcon className="w-5 h-5 text-gray-500" />
              <Input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome"
              />
            </div>

            <div className="flex items-center space-x-2">
              <PencilIcon className="w-5 h-5 text-gray-500" />
              <Input
                type="text"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                placeholder="Sobrenome"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <PhoneIcon className="w-5 h-5 text-gray-500" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-5 h-5 text-gray-500" />
              <Input
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

            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-5 h-5 text-gray-500" />
              <Input
                type="text"
                value={endereco.rua}
                onChange={(e) => setEndereco((prev) => ({ ...prev, rua: e.target.value }))}
                placeholder="Rua/Av"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-5 h-5 text-gray-500" />
              <Input
                type="text"
                value={endereco.numero}
                onChange={(e) => setEndereco((prev) => ({ ...prev, numero: e.target.value }))}
                placeholder="Número"
              />
            </div>

            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-5 h-5 text-gray-500" />
              <Input
                type="text"
                value={endereco.bairro}
                onChange={(e) => setEndereco((prev) => ({ ...prev, bairro: e.target.value }))}
                placeholder="Bairro"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-5 h-5 text-gray-500" />
              <Input
                type="text"
                value={endereco.cidade}
                onChange={(e) => setEndereco((prev) => ({ ...prev, cidade: e.target.value }))}
                placeholder="Cidade"
              />
            </div>

            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-5 h-5 text-gray-500" />
              <Input
                type="text"
                value={endereco.estado}
                onChange={(e) => setEndereco((prev) => ({ ...prev, estado: e.target.value }))}
                placeholder="Estado"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-5 h-5 text-gray-500" />
              <Input
                type="text"
                value={endereco.pais}
                onChange={(e) => setEndereco((prev) => ({ ...prev, pais: e.target.value }))}
                placeholder="País"
              />
            </div>
          </div>

          <div>
            <Textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Observações"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="submit">
              {selectedClient ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
            </Button>
            <Button
              type="button"
              onClick={() => onSubmit()}
              variant="outline"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ClienteForm;