import { useState, useEffect, useCallback, useMemo } from "react";
import { db } from "../services/firebase";
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Cliente } from "../components/ClienteComponent/types";

export const useClientes = () => {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, "clientes"));
      const clientsData: Cliente[] = [];
      querySnapshot.forEach((docSnap) => {
        clientsData.push({ id: docSnap.id, ...docSnap.data() } as Cliente);
      });
      setClients(clientsData);
    } catch (err: any) {
      console.error("Erro ao buscar clientes do Firestore:", err);
      setError("Falha ao carregar a lista de clientes.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar inicial
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // Adicionar Cliente
  const addCliente = useCallback(async (clientData: Omit<Cliente, "id">) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "clientes"), clientData);
      const newClient: Cliente = { id: docRef.id, ...clientData };
      setClients((prev) => [newClient, ...prev]);
      return newClient;
    } catch (err) {
      console.error("Erro ao cadastrar cliente:", err);
      throw new Error("Erro ao cadastrar cliente.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar Cliente
  const updateCliente = useCallback(async (id: string, clientData: Omit<Cliente, "id">) => {
    setLoading(true);
    try {
      const clientRef = doc(db, "clientes", id);
      await updateDoc(clientRef, clientData as any);
      setClients((prev) =>
        prev.map((c) => (c.id === id ? { id, ...clientData } : c))
      );
    } catch (err) {
      console.error("Erro ao atualizar cliente:", err);
      throw new Error("Erro ao atualizar cliente.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Excluir Cliente
  const deleteCliente = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const clientRef = doc(db, "clientes", id);
      await deleteDoc(clientRef);
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Erro ao excluir cliente:", err);
      throw new Error("Erro ao excluir cliente.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Filtro Inteligente Reativo
  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return clients;
    const query = searchQuery.toLowerCase();
    return clients.filter((client) => {
      const fullName = `${client.nome} ${client.sobrenome}`.toLowerCase();
      const email = client.email.toLowerCase();
      const obs = client.observacoes ? client.observacoes.toLowerCase() : "";
      const street = client.endereco.rua ? client.endereco.rua.toLowerCase() : "";
      const district = client.endereco.bairro ? client.endereco.bairro.toLowerCase() : "";
      const city = client.endereco.cidade ? client.endereco.cidade.toLowerCase() : "";

      return (
        fullName.includes(query) ||
        email.includes(query) ||
        obs.includes(query) ||
        street.includes(query) ||
        district.includes(query) ||
        city.includes(query)
      );
    });
  }, [clients, searchQuery]);

  return {
    clients,
    filteredClients,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    fetchClients,
    addCliente,
    updateCliente,
    deleteCliente,
  };
};
