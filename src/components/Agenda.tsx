import React, { useState, useEffect, useCallback } from "react";
import ClienteSearch, { Cliente } from "../components/ClienteComponent/ClienteSearch";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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

  // Função para buscar os clientes
  const fetchClientes = useCallback(async () => {
    setCarregando(true);
    try {
      const clientesRef = collection(db, "clientes");
      const clientesSnap = await getDocs(clientesRef);
      const clientesList: Cliente[] = clientesSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
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

  // Função chamada quando a pesquisa é feita
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

  // Função para definir o cliente selecionado
  const handleClienteSelect = (cliente: Cliente) => {
    setClienteSelecionado(cliente);
    setNovoEvento({
      ...novoEvento,
      cliente: `${cliente.nome} ${cliente.sobrenome}`,
    });
  };

  // Função para adicionar o evento
  const handleAddEvento = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteSelecionado) {
      alert("Selecione um cliente antes de adicionar o evento.");
      return;
    }

    const { cliente, origem, destino, data, hora, valor } = novoEvento;
    const dataCompleta = new Date(`${data}T${hora}`);

    // Verifica se a data e hora são válidas
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

    // Limpeza do formulário após adicionar
    setNovoEvento({
      cliente: "",
      origem: "",
      destino: "",
      data: "",
      hora: "",
      valor: "",
    });
    setClienteSelecionado(null);
    setMostrarModal(false); // Fecha o modal após adicionar o evento
  };

  // Função para excluir evento
  const handleDeleteEvento = (index: number) => {
    const eventosAtualizados = eventos.filter((_, i) => i !== index);
    setEventos(eventosAtualizados);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Agenda de Corridas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Botão para abrir o modal de criação de evento */}
        <div>
          <button
            onClick={() => setMostrarModal(true)}
            className="flex items-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            <PlusCircleIcon className="h-5 w-5 inline-block mr-2" />
            Adicionar Corrida
          </button>
        </div>
      </div>

      {/* Modal de criação de evento */}
      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setMostrarModal(false)}
              className="absolute top-2 right-2 text-gray-600"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detalhes do Evento</h2>
            <form onSubmit={handleAddEvento} className="space-y-4">
              <div className="space-y-2">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Buscar Cliente</h3>
                  <ClienteSearch onSearch={handleSearch} />
                  {carregando ? (
                    <p className="text-gray-500">Carregando clientes...</p>
                  ) : (
                    <div className="mt-4">
                      {clientesFiltrados.length > 0 ? (
                        clientesFiltrados.map((cliente) => (
                          <div
                            key={cliente.id}
                            className={`border p-3 rounded-lg cursor-pointer mb-2 ${clienteSelecionado?.id === cliente.id ? "bg-blue-100" : "hover:bg-gray-100"}`}
                            onClick={() => handleClienteSelect(cliente)}
                          >
                            <p className="font-semibold">{cliente.nome} {cliente.sobrenome}</p>
                            <p className="text-sm text-gray-600">{cliente.email}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">Nenhum cliente encontrado.</p>
                      )}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Origem"
                    value={novoEvento.origem}
                    onChange={(e) => setNovoEvento({ ...novoEvento, origem: e.target.value })}
                    className="w-full border rounded-lg p-3"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Destino"
                    value={novoEvento.destino}
                    onChange={(e) => setNovoEvento({ ...novoEvento, destino: e.target.value })}
                    className="w-full border rounded-lg p-3"
                    required
                  />
                  <div className="flex gap-4">
                    <input
                      type="date"
                      value={novoEvento.data}
                      onChange={(e) => setNovoEvento({ ...novoEvento, data: e.target.value })}
                      className="w-full border rounded-lg p-3"
                      required
                    />
                    <input
                      type="time"
                      value={novoEvento.hora}
                      onChange={(e) => setNovoEvento({ ...novoEvento, hora: e.target.value })}
                      className="w-full border rounded-lg p-3"
                      required
                    />
                  </div>
                  <input
                    type="number"
                    placeholder="Valor da Corrida (opcional)"
                    value={novoEvento.valor}
                    onChange={(e) => setNovoEvento({ ...novoEvento, valor: e.target.value })}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
              >
                <PlusCircleIcon className="h-5 w-5 inline-block mr-2" />
                Adicionar Corrida
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Seção do Calendário */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Selecione a Data do Evento</h2>
        <Calendar
          onChange={(date) => setDataSelecionada(date as Date)}
          value={dataSelecionada}
          className="rounded-lg shadow-lg border border-gray-200"
        />
      </div>

      {/* Exibição dos Eventos */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Eventos Cadastrados</h2>
        {eventos.length > 0 ? (
          <div className="space-y-4">
            {eventos.map((evento, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-sm flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{evento.cliente}</h3>
                  <p className="text-sm text-gray-600">Origem: {evento.origem}</p>
                  <p className="text-sm text-gray-600">Destino: {evento.destino}</p>
                  <p className="text-sm text-gray-600">Data: {evento.data.toLocaleDateString()} às {evento.data.toLocaleTimeString()}</p>
                  {evento.valor && <p className="text-sm text-gray-600">Valor: R${evento.valor}</p>}
                </div>
                <button
                  onClick={() => handleDeleteEvento(index)}
                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nenhum evento cadastrado.</p>
        )}
      </section>
    </div>
  );
};

export default Agenda;
