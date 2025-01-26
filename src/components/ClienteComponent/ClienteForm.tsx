import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

interface Cliente {
  id: string;
  name: string;
  email: string;
}

interface ClienteFormProps {
  selectedClient: Cliente | null;
  onSubmit: () => void;
}

const ClienteForm: React.FC<ClienteFormProps> = ({ selectedClient, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (selectedClient) {
      setName(selectedClient.name);
      setEmail(selectedClient.email);
    }
  }, [selectedClient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedClient) {
      // Atualizar cliente
      const clientRef = doc(db, 'clientes', selectedClient.id);
      await updateDoc(clientRef, { name, email });
    } else {
      // Cadastrar novo cliente
      const newClient = { name, email };
      const newDocRef = doc(db, 'clientes');
      await setDoc(newDocRef, newClient);
    }

    onSubmit(); // Chama a função do componente pai para atualizar a lista
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">{selectedClient ? 'Atualizar Cliente' : 'Cadastrar Cliente'}</button>
    </form>
  );
};

export default ClienteForm;
