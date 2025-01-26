import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

export interface Cliente {
  id: string;
  name: string;
  email: string;
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
    <input
      type="text"
      value={searchQuery}
      onChange={handleInputChange}
      placeholder="Buscar cliente"
    />
  );
};

export default ClienteSearch;
