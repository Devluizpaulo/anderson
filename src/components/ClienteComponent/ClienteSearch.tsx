import React, { useState } from 'react';

export interface Endereco {
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  cep: string;
}

export interface Cliente {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  endereco: Endereco;
  observacoes: string;
}

interface ClienteSearchProps {
  onSearch: (query: string) => void;
}

const ClienteSearch: React.FC<ClienteSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Passa o query para o componente pai
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Buscar cliente por nome, e-mail ou endereço"
        className="border p-2 w-full rounded"
      />
    </div>
  );
};

export default ClienteSearch;
