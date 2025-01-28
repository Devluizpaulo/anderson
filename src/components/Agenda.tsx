"use client";

import React, { useState, useEffect, useCallback } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Plus, Trash2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ClienteSearch, { Cliente } from "../components/ClienteComponent/ClienteSearch";

const Agenda = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [novoEvento, setNovoEvento] = useState({
    cliente: "",
    origem: "",
    destino: "",
    data: "",
    hora: "",
    valor: "",
  });
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());
  const [eventos, setEventos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState<boolean>(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const fetchClientes = useCallback(async () => {
    setCarregando(true);
    try {
      const clientesRef = collection(db, "clientes");
      const clientesSnap = await getDocs(clientesRef);
      const clientesList: Cliente[] = clientesSnap.docs.map((doc) => {
        const clienteData = doc.data();
        return {
          id: doc.id,
          nome: clienteData.nome,
          sobrenome: clienteData.sobrenome,
          email: clienteData.email,
          endereco: clienteData.endereco,
          observacoes: clienteData.observacoes,
        };
      });
      setClientes(clientesList);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  const handleSearch = (query: string) => {
    if (query === "") {
      setClientesFiltrados([]);
    } else {
      const filtered = clientes.filter(
        (cliente) =>
          cliente.nome.toLowerCase().includes(query.toLowerCase()) ||
          cliente.email.toLowerCase().includes(query.toLowerCase()) ||
          cliente.endereco.rua.toLowerCase().includes(query.toLowerCase())
      );
      setClientesFiltrados(filtered);
    }
  };

  const handleClienteSelect = (cliente: Cliente) => {
    setClienteSelecionado(cliente);
    setNovoEvento({
      ...novoEvento,
      cliente: `${cliente.nome} ${cliente.sobrenome}`,
    });
  };

  const handleAddEvento = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteSelecionado) {
      alert("Selecione um cliente antes de adicionar o evento.");
      return;
    }

    const { cliente, origem, destino, data, hora, valor } = novoEvento;
    const dataCompleta = new Date(`${data}T${hora}`);

    if (isNaN(dataCompleta.getTime())) {
      alert("Data ou hora inválidos!");
      return;
    }

    const evento = {
      cliente,
      origem,
      destino,
      data: dataCompleta,
      valor,
    };
    setEventos([...eventos, evento]);

    setNovoEvento({
      cliente: "",
      origem: "",
      destino: "",
      data: "",
      hora: "",
      valor: "",
    });
    setClienteSelecionado(null);
    setMostrarModal(false);
  };

  const handleDeleteEvento = (index: number) => {
    const eventosAtualizados = eventos.filter((_, i) => i !== index);
    setEventos(eventosAtualizados);
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Agenda de Corridas</h1>
        <Dialog open={mostrarModal} onOpenChange={setMostrarModal}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Corrida
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Nova Corrida</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddEvento} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Buscar Cliente</h3>
                  <ClienteSearch onSearch={handleSearch} />
                  {carregando ? (
                    <p className="text-muted-foreground">Carregando clientes...</p>
                  ) : (
                    <div className="mt-4 max-h-[200px] overflow-y-auto">
                      {clientesFiltrados.map((cliente) => (
                        <div
                          key={cliente.id}
                          onClick={() => handleClienteSelect(cliente)}
                          className={`p-3 rounded-lg cursor-pointer mb-2 ${
                            clienteSelecionado?.id === cliente.id
                              ? "bg-secondary"
                              : "hover:bg-secondary/50"
                          }`}
                        >
                          <p className="font-medium">{cliente.nome} {cliente.sobrenome}</p>
                          <p className="text-sm text-muted-foreground">{cliente.email}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Input
                  placeholder="Origem"
                  value={novoEvento.origem}
                  onChange={(e) => setNovoEvento({ ...novoEvento, origem: e.target.value })}
                  required
                />
                <Input
                  placeholder="Destino"
                  value={novoEvento.destino}
                  onChange={(e) => setNovoEvento({ ...novoEvento, destino: e.target.value })}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="date"
                    value={novoEvento.data}
                    onChange={(e) => setNovoEvento({ ...novoEvento, data: e.target.value })}
                    required
                  />
                  <Input
                    type="time"
                    value={novoEvento.hora}
                    onChange={(e) => setNovoEvento({ ...novoEvento, hora: e.target.value })}
                    required
                  />
                </div>
                <Input
                  type="number"
                  placeholder="Valor da Corrida (opcional)"
                  value={novoEvento.valor}
                  onChange={(e) => setNovoEvento({ ...novoEvento, valor: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Corrida
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
            <CardDescription>Selecione uma data para visualizar os eventos</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={dataSelecionada}
              onSelect={(date) => date && setDataSelecionada(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eventos do Dia</CardTitle>
            <CardDescription>
              {dataSelecionada.toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventos.length > 0 ? (
                eventos.map((evento, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{evento.cliente}</p>
                      <p className="text-sm text-muted-foreground">
                        {evento.origem} → {evento.destino}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {evento.data.toLocaleTimeString()}
                      </p>
                      {evento.valor && (
                        <p className="text-sm font-medium">R$ {evento.valor}</p>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteEvento(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Nenhum evento cadastrado para esta data.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Agenda;