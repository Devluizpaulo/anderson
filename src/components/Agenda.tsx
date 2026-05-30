"use client";

import React, { useState, useEffect, useCallback } from "react";
import { db } from "../services/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { Plus, Trash2, MapPin, Calendar as CalendarIcon, Clock, DollarSign, RefreshCw, CheckCircle, AlertTriangle, ExternalLink, MessageSquare, Shield, TrendingUp } from "lucide-react";
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

interface Evento {
  id: string;
  cliente: string;
  origem: string;
  destino: string;
  data: Date;
  valor: string;
}

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
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [carregando, setCarregando] = useState<boolean>(false);
  const [carregandoEventos, setCarregandoEventos] = useState<boolean>(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Estados da Simulação do Google Calendar (Apresentação do Front-end)
  const [googleSyncEnabled, setGoogleSyncEnabled] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>("há 2 minutos");

  const fetchClientes = useCallback(async () => {
    setCarregando(true);
    try {
      const clientesRef = collection(db, "clientes");
      const clientesSnap = await getDocs(clientesRef);
      const clientesList: Cliente[] = clientesSnap.docs.map((doc) => {
        const clienteData = doc.data();
        return {
          id: doc.id,
          nome: clienteData.nome || "",
          sobrenome: clienteData.sobrenome || "",
          email: clienteData.email || "",
          endereco: clienteData.endereco || {
            rua: "", numero: "", complemento: "", bairro: "", cidade: "", estado: "", pais: "", cep: ""
          },
          observacoes: clienteData.observacoes || "",
        };
      });
      setClientes(clientesList);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setCarregando(false);
    }
  }, []);

  const fetchEventos = useCallback(async () => {
    setCarregandoEventos(true);
    try {
      const corridasRef = collection(db, "corridas");
      const corridasSnap = await getDocs(corridasRef);
      const corridasList: Evento[] = corridasSnap.docs.map((docSnap) => {
        const data = docSnap.data();
        let dataFormatada: Date;
        if (data.data instanceof Timestamp) {
          dataFormatada = data.data.toDate();
        } else if (data.data && data.data.seconds) {
          dataFormatada = new Timestamp(data.data.seconds, data.data.nanoseconds).toDate();
        } else {
          dataFormatada = new Date(data.data);
        }

        return {
          id: docSnap.id,
          cliente: data.cliente || "",
          origem: data.origem || "",
          destino: data.destino || "",
          data: dataFormatada,
          valor: data.valor || "",
        };
      });
      setEventos(corridasList);
    } catch (error) {
      console.error("Erro ao buscar corridas no Firestore:", error);
    } finally {
      setCarregandoEventos(false);
    }
  }, []);

  useEffect(() => {
    fetchClientes();
    fetchEventos();
  }, [fetchClientes, fetchEventos]);

  const handleSearch = (query: string) => {
    if (query === "") {
      setClientesFiltrados([]);
    } else {
      const filtered = clientes.filter(
        (cliente) =>
          cliente.nome.toLowerCase().includes(query.toLowerCase()) ||
          cliente.sobrenome.toLowerCase().includes(query.toLowerCase()) ||
          (cliente.email && cliente.email.toLowerCase().includes(query.toLowerCase())) ||
          (cliente.endereco?.rua && cliente.endereco.rua.toLowerCase().includes(query.toLowerCase()))
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

    try {
      const novoDoc = {
        cliente,
        origem,
        destino,
        data: Timestamp.fromDate(dataCompleta),
        valor,
      };

      await addDoc(collection(db, "corridas"), novoDoc);
      
      // Simulação de sincronização automática com o Google Calendar
      if (googleSyncEnabled) {
        setIsSyncing(true);
        setTimeout(() => {
          setIsSyncing(false);
          setLastSyncTime("agora mesmo");
        }, 1500);
      }

      await fetchEventos();

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
    } catch (error) {
      console.error("Erro ao salvar corrida no Firestore:", error);
      alert("Não foi possível salvar a corrida no banco de dados.");
    }
  };

  const handleDeleteEvento = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este agendamento?")) return;
    try {
      await deleteDoc(doc(db, "corridas", id));
      
      // Simulação de remoção sincronizada do Google Calendar
      if (googleSyncEnabled) {
        setIsSyncing(true);
        setTimeout(() => {
          setIsSyncing(false);
          setLastSyncTime("agora mesmo");
        }, 1000);
      }

      await fetchEventos();
    } catch (error) {
      console.error("Erro ao deletar corrida:", error);
      alert("Erro ao excluir corrida do banco de dados.");
    }
  };

  const handleForceSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime("agora mesmo");
    }, 2000);
  };

  const eventosDoDia = eventos.filter((evento) => {
    if (!evento.data) return false;
    const dataEv = new Date(evento.data);
    return (
      dataEv.getDate() === dataSelecionada.getDate() &&
      dataEv.getMonth() === dataSelecionada.getMonth() &&
      dataEv.getFullYear() === dataSelecionada.getFullYear()
    );
  });

  // Modificador para destacar dias com agendamentos no calendário
  const customModifiers = {
    hasRides: (date: Date) => {
      return eventos.some((ev) => {
        if (!ev.data) return false;
        const evDate = new Date(ev.data);
        return (
          evDate.getDate() === date.getDate() &&
          evDate.getMonth() === date.getMonth() &&
          evDate.getFullYear() === date.getFullYear()
        );
      });
    }
  };

  // Faturamento estimado do dia selecionado
  const faturamentoDoDia = eventosDoDia.reduce((acc, ev) => {
    return acc + (ev.valor ? Number(ev.valor) : 0);
  }, 0);

  // Status de ocupação inteligente
  const getOccupancyStatus = () => {
    const total = eventosDoDia.length;
    if (total === 0) {
      return {
        label: "Totalmente Livre",
        desc: "Anderson está 100% livre para novos transfers executivos e atendimentos corporativos nesta data.",
        color: "border-[#444748]/20 bg-white/5 text-gray-300",
        badge: "bg-white/10 text-gray-300"
      };
    }
    if (total === 1) {
      return {
        label: "Ocupação Parcial",
        desc: "1 agendamento ativo. Existem ótimas janelas de horários disponíveis para novos trajetos.",
        color: "border-secondary/20 bg-secondary/5 text-secondary",
        badge: "bg-secondary/15 text-secondary"
      };
    }
    if (total === 2) {
      return {
        label: "Ocupação Moderada",
        desc: "2 agendamentos ativos. Anderson possui alguns slots premium disponíveis na parte da tarde.",
        color: "border-amber-500/20 bg-amber-500/5 text-amber-400",
        badge: "bg-amber-500/15 text-amber-450"
      };
    }
    return {
      label: "Ocupação Alta",
      desc: `${total} trajetos marcados. Anderson possui disponibilidade restrita nesta data de operação.`,
      color: "border-rose-500/20 bg-rose-500/5 text-rose-400",
      badge: "bg-rose-500/15 text-rose-450"
    };
  };

  const occupancy = getOccupancyStatus();

  // Calcular taxa de ocupação da semana baseada nos próximos 7 dias
  const getWeeklyOccupancyRate = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    
    let busyDaysCount = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      const dayHasRides = eventos.some(ev => {
        if (!ev.data) return false;
        const evDate = new Date(ev.data);
        return (
          evDate.getDate() === d.getDate() &&
          evDate.getMonth() === d.getMonth() &&
          evDate.getFullYear() === d.getFullYear()
        );
      });
      if (dayHasRides) busyDaysCount++;
    }
    return Math.round((busyDaysCount / 7) * 100);
  };

  const weeklyOccupancyRate = getWeeklyOccupancyRate();

  // Link para confirmar corrida com template personalizado de WhatsApp
  const getWhatsappConfirmationLink = (cliente: string, hora: Date, origem: string, destino: string) => {
    const horaStr = new Date(hora).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    const text = `Olá, ${cliente}! Aqui é o Chauffeur Anderson Marumoto.\n\nPassando para confirmar o nosso transfer executivo agendado para hoje às *${horaStr}*.\n\n📍 *Origem:* ${origem}\n🏁 *Destino:* ${destino}\n\nO Toyota Corolla Cross blindado já está sendo preparado para o trajeto. Qualquer alteração, estou à disposição!`;
    return `https://wa.me/+5511958396939?text=${encodeURIComponent(text)}`;
  };

  // Link direto para gerar rota no Google Maps
  const getGoogleMapsDirectionLink = (origem: string, destino: string) => {
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origem)}&destination=${encodeURIComponent(destino)}`;
  };

  // Ordenar eventos do dia de forma cronológica
  const eventosDoDiaOrdenados = [...eventosDoDia].sort((a, b) => {
    return new Date(a.data).getTime() - new Date(b.data).getTime();
  });

  // Gatilho rápido para adicionar corrida pré-selecionando o horário livre
  const handleQuickAddSlot = (horaSlot: string) => {
    const dateStr = dataSelecionada.toISOString().split("T")[0];
    setNovoEvento({
      cliente: "",
      origem: "",
      destino: "",
      data: dateStr,
      hora: horaSlot,
      valor: ""
    });
    setClienteSelecionado(null);
    setMostrarModal(true);
  };

  // Lista de Slots Livres recomendados do dia para preenchimento rápido
  const recommendedSlots = [
    { time: "08:00", label: "Manhã" },
    { time: "11:00", label: "Almoço" },
    { time: "14:00", label: "Tarde" },
    { time: "17:00", label: "Fim da Tarde" },
    { time: "20:00", label: "Noite" }
  ];

  return (
    <div className="container mx-auto py-4 space-y-6 text-[#e2e2e2] font-body w-full">
      
      {/* Header unificado com design de comando */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#444748]/15 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-display text-white tracking-wide">Agenda de Corridas</h1>
            <span className="text-[9px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Google Calendar Ativo
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Painel executivo de controle logístico e sincronizações do Anderson Transfers.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Widget de status do Google Calendar */}
          <div className="glass-card px-3.5 py-2 rounded-xl flex items-center gap-3 border border-secondary/15">
            <div className="w-2 h-2 rounded-full bg-emerald-450 relative">
              <span className="absolute inset-0 rounded-full bg-emerald-450 animate-ping opacity-75" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold uppercase tracking-wider text-[9px] flex items-center gap-1">
                Google Sync
              </p>
              <p className="text-[#8e9192] text-[8px]">Sincronizado {lastSyncTime}</p>
            </div>
            <Button
              onClick={handleForceSync}
              disabled={isSyncing}
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-secondary hover:bg-secondary/10 hover:text-secondary-fixed ml-1"
              title="Forçar Sincronização Manual"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-secondary-fixed" : ""}`} />
            </Button>
          </div>

          <Dialog open={mostrarModal} onOpenChange={setMostrarModal}>
            <DialogTrigger asChild>
              <Button className="bg-secondary hover:bg-secondary-fixed text-black font-bold uppercase tracking-wider text-xs px-5 py-2 rounded-xl shadow-lg shadow-secondary/10 hover:scale-[1.01] transform transition duration-300">
                <Plus className="mr-1.5 h-4 w-4" />
                Nova Corrida
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card border border-secondary/15 max-w-[500px] text-white">
              <DialogHeader>
                <DialogTitle className="font-display text-white text-xl">Nova Corrida</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddEvento} className="space-y-4 mt-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-xs text-[#c4c7c7] uppercase tracking-wider">Buscar Cliente</h3>
                    <ClienteSearch onSearch={handleSearch} />
                    {carregando ? (
                      <p className="text-[#c4c7c7] text-xs mt-1">Carregando clientes...</p>
                    ) : (
                      <div className="mt-2 max-h-[120px] overflow-y-auto border border-[#444748]/20 rounded-xl p-2 bg-[#0C0F0F]">
                        {clientesFiltrados.length > 0 ? (
                          clientesFiltrados.map((cliente) => (
                            <div
                              key={cliente.id}
                              onClick={() => handleClienteSelect(cliente)}
                              className={`p-2 rounded-lg cursor-pointer mb-1 text-xs transition ${
                                clienteSelecionado?.id === cliente.id
                                  ? "bg-secondary/10 border border-secondary/30 font-semibold text-secondary"
                                  : "hover:bg-[#1A1C1C]/40 text-[#c4c7c7]"
                              }`}
                            >
                              <p>{cliente.nome} {cliente.sobrenome}</p>
                              <p className="text-[10px] text-[#8e9192]">{cliente.email}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-550 text-[10px] text-center py-2">Busque pelo nome do cliente acima</p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {clienteSelecionado && (
                    <div className="p-3 bg-emerald-500/10 text-emerald-300 rounded-xl border border-emerald-500/20 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Cliente selecionado: <strong>{clienteSelecionado.nome} {clienteSelecionado.sobrenome}</strong>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">Origem</label>
                    <Input
                      placeholder="Endereço de partida"
                      value={novoEvento.origem}
                      onChange={(e) => setNovoEvento({ ...novoEvento, origem: e.target.value })}
                      required
                      className="bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-secondary/50 transition placeholder-gray-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">Destino</label>
                    <Input
                      placeholder="Endereço de chegada"
                      value={novoEvento.destino}
                      onChange={(e) => setNovoEvento({ ...novoEvento, destino: e.target.value })}
                      required
                      className="bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-secondary/50 transition placeholder-gray-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">Data</label>
                      <Input
                        type="date"
                        value={novoEvento.data}
                        onChange={(e) => setNovoEvento({ ...novoEvento, data: e.target.value })}
                        required
                        className="bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-secondary/50 transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">Hora</label>
                      <Input
                        type="time"
                        value={novoEvento.hora}
                        onChange={(e) => setNovoEvento({ ...novoEvento, hora: e.target.value })}
                        required
                        className="bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-secondary/50 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">Valor da Corrida (R$)</label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Ex: 150.00"
                      value={novoEvento.valor}
                      onChange={(e) => setNovoEvento({ ...novoEvento, valor: e.target.value })}
                      className="bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-secondary/50 transition placeholder-gray-600"
                    />
                  </div>

                  {googleSyncEnabled && (
                    <div className="p-3 bg-secondary/5 border border-secondary/15 rounded-xl text-[10px] text-secondary flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-secondary-fixed mt-0.5" />
                      <span><strong>Nota de Integração:</strong> Este agendamento será sincronizado bidirecionalmente em tempo real com a sua agenda do Google Calendar.</span>
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-full mt-2 bg-secondary hover:bg-secondary-fixed text-black font-bold uppercase tracking-wider text-xs py-3.5 rounded-xl transition flex items-center justify-center gap-2">
                  <Plus className="h-4 w-4" />
                  Confirmar e Sincronizar
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Grid unificado e indestrutível de colunas flex-split */}
      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        
        {/* Coluna Esquerda: Controle Compacto Constrito (lg:w-[330px] fixo) */}
        <div className="w-full lg:w-[330px] flex-shrink-0 space-y-6">
          
          {/* Calendário Operacional sem elasticidade */}
          <Card className="glass-card border border-secondary/10 bg-transparent rounded-3xl shadow-lg relative overflow-hidden">
            <CardHeader className="pb-3 px-5 pt-5">
              <CardTitle className="font-display text-white text-base flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-secondary" />
                Calendário Operacional
              </CardTitle>
              <CardDescription className="text-gray-400 text-[10px]">
                Selecione uma data para inspecionar trajetos.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center p-4 bg-white/[0.02] border-t border-[#444748]/10">
              {/* Div de contenção absoluta para travar o calendário */}
              <div className="w-full max-w-[290px] mx-auto overflow-hidden">
                <Calendar
                  mode="single"
                  selected={dataSelecionada}
                  onSelect={(date) => date && setDataSelecionada(date)}
                  modifiers={customModifiers}
                  modifiersClassNames={{
                    hasRides: "after:content-['•'] after:block after:text-secondary after:text-[14px] after:leading-[0px] after:mt-0.5 font-bold text-secondary-fixed bg-secondary/5 rounded-md"
                  }}
                  className="rounded-xl border border-[#444748]/15 p-2 shadow bg-[#0C0F0F] text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Insights do Dia Selecionado */}
          <Card className="glass-card border border-secondary/10 bg-transparent rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="pb-3 px-5 pt-5">
              <CardTitle className="font-display text-white text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-secondary" />
                Status do Dia
              </CardTitle>
              <CardDescription className="text-gray-400 text-[10px]">Sumário de carga operacional da data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-5 pb-5 pt-0 text-xs">
              
              {/* Ocupação ativa badge */}
              <div className={`p-3.5 rounded-2xl border ${occupancy.color} space-y-1.5`}>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold uppercase tracking-wider text-[9px] text-[#e2e2e2]">Carga de Trabalho</span>
                  <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${occupancy.badge}`}>
                    {occupancy.label}
                  </span>
                </div>
                <p className="text-[10px] leading-relaxed text-[#c4c7c7]">{occupancy.desc}</p>
              </div>

              {/* Faturamento e Contadores */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-3 bg-[#0C0F0F] rounded-xl border border-white/5 space-y-0.5 text-center">
                  <span className="text-[8px] text-gray-500 uppercase font-bold tracking-wider">Faturamento</span>
                  <p className="text-sm font-extrabold text-emerald-450">
                    R$ {faturamentoDoDia.toFixed(2)}
                  </p>
                </div>
                <div className="p-3 bg-[#0C0F0F] rounded-xl border border-white/5 space-y-0.5 text-center">
                  <span className="text-[8px] text-gray-500 uppercase font-bold tracking-wider">Trajetos</span>
                  <p className="text-sm font-extrabold text-white">
                    {eventosDoDia.length}
                  </p>
                </div>
              </div>

              {/* Weekly ocupação bar */}
              <div className="space-y-1.5 pt-1.5 border-t border-[#444748]/10">
                <div className="flex items-center justify-between text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                  <span>Ocupação Semanal</span>
                  <span className="text-secondary">{weeklyOccupancyRate}%</span>
                </div>
                <div className="w-full bg-[#0C0F0F] h-1.5 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="bg-gradient-to-r from-secondary-container to-secondary h-full rounded-full transition-all duration-300"
                    style={{ width: `${weeklyOccupancyRate}%` }}
                  />
                </div>
              </div>

            </CardContent>
          </Card>

        </div>

        {/* Coluna Direita: Cronograma Cronológico de Viagens (Timeline + Slot Planner) */}
        <div className="flex-1 w-full space-y-6">
          
          <Card className="glass-card border border-secondary/10 bg-transparent rounded-3xl shadow-lg relative overflow-hidden">
            <CardHeader className="pb-3 px-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="font-display text-white text-lg flex items-center gap-2">
                    <Clock className="w-4.5 h-4.5 text-secondary" />
                    Cronologia de Viagens
                  </CardTitle>
                  <CardDescription className="text-secondary font-bold text-[10px] tracking-wider uppercase mt-1">
                    {dataSelecionada.toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardDescription>
                </div>
                
                <span className="self-start sm:self-center text-[9px] text-secondary font-bold bg-secondary/10 border border-secondary/15 px-3 py-1 rounded-full uppercase tracking-wider">
                  Linha do Tempo
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6 border-t border-[#444748]/10 bg-white/[0.01] min-h-[350px]">
              
              {/* Timeline Container */}
              <div className="space-y-1">
                {carregandoEventos ? (
                  <p className="text-center text-[#c4c7c7] py-12 text-xs">Buscando agendamentos...</p>
                ) : eventosDoDiaOrdenados.length > 0 ? (
                  eventosDoDiaOrdenados.map((evento) => (
                    <div 
                      key={evento.id} 
                      className="relative pl-8 pb-8 last:pb-2 border-l border-white/10 ml-3 animate-in fade-in duration-300"
                    >
                      {/* Chronological Connector Indicator dot */}
                      <div className="absolute -left-[13px] top-1.5 w-6 h-6 rounded-full bg-[#0A0A0A] border-2 border-secondary flex items-center justify-center shadow-[0_0_8px_rgba(233,195,73,0.3)] z-10">
                        <Clock className="w-3 h-3 text-secondary" />
                      </div>

                      {/* The Event Glass Card */}
                      <div className="glass-card p-4 rounded-2xl border border-secondary/15 hover:border-secondary/35 transition bg-transparent space-y-4 shadow-md">
                        {/* Top Details */}
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <div className="space-y-1">
                            <span className="text-secondary font-bold text-[10px] bg-secondary/10 px-3 py-0.5 rounded-full border border-secondary/20 tracking-wider">
                              {new Date(evento.data).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                            <h4 className="font-bold text-white text-base mt-2">{evento.cliente}</h4>
                          </div>
                          
                          {evento.valor && (
                            <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-0.5 rounded-full border border-emerald-500/15 flex items-center">
                              <DollarSign className="w-3 h-3 mr-0.5" />
                              R$ {Number(evento.valor).toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Trajet Connector Graphic */}
                        <div className="bg-[#0C0F0F] p-4 rounded-xl border border-white/5 space-y-3.5 text-xs">
                          <div className="relative pl-6">
                            <div className="absolute left-1.5 top-1.5 bottom-1.5 border-l border-dashed border-[#444748]/30" />
                            
                            <div className="relative space-y-3.5">
                              <div className="flex items-start gap-2">
                                <span className="absolute -left-[22px] top-1 w-2 h-2 rounded-full bg-blue-500 border border-[#0C0F0F]" />
                                <div>
                                  <p className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Origem (Partida)</p>
                                  <p className="text-white mt-0.5 font-medium">{evento.origem}</p>
                                </div>
                              </div>

                              <div className="flex items-start gap-2">
                                <span className="absolute -left-[22px] top-1 w-2 h-2 rounded-full bg-emerald-400 border border-[#0C0F0F]" />
                                <div>
                                  <p className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Destino (Chegada)</p>
                                  <p className="text-white mt-0.5 font-medium">{evento.destino}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom details & interactive action triggers */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-[#444748]/10 text-xs">
                          <span className="flex items-center gap-1.5 text-[9px] text-secondary bg-secondary/5 px-2.5 py-0.5 rounded border border-secondary/15 uppercase font-bold tracking-wider">
                            <Shield className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                            Serviço Corolla Cross Blindado
                          </span>

                          <div className="flex items-center gap-2">
                            {/* WhatsApp Direct Confirm Link */}
                            <a
                              href={getWhatsappConfirmationLink(evento.cliente, evento.data, evento.origem, evento.destino)}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Confirmar via WhatsApp"
                              className="h-8 px-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10 transition flex items-center gap-1.5 font-bold uppercase tracking-wider text-[9px]"
                            >
                              <MessageSquare className="w-3 h-3 text-emerald-400 fill-current" />
                              Confirmar
                            </a>

                            {/* Google Maps Route directions link */}
                            <a
                              href={getGoogleMapsDirectionLink(evento.origem, evento.destino)}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Ver Rota GPS no Google Maps"
                              className="h-8 w-8 rounded-xl border border-[#444748]/30 bg-white/5 text-[#c4c7c7] hover:border-secondary/30 hover:text-white transition flex items-center justify-center"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>

                            {/* Delete Slot Button */}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteEvento(evento.id)}
                              className="h-8 w-8 rounded-xl text-rose-450 hover:text-rose-350 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 flex items-center justify-center"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 border border-dashed border-[#444748]/20 rounded-3xl bg-black/10 flex flex-col items-center justify-center gap-4 animate-in fade-in duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500">
                      <span className="material-symbols-outlined text-2xl">event_busy</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-white font-bold text-sm">Sem Corridas para esta Data</p>
                      <p className="text-gray-400 text-xs max-w-[280px] mx-auto">Nenhum trajeto operacional agendado ou sincronizado para este dia de logística.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* MÓDULO INTELIGENTE: Planejador de Horários Livres (Slot Booking Grid) */}
              <div className="mt-8 pt-6 border-t border-[#444748]/15 space-y-4">
                <div>
                  <h4 className="font-display text-white text-sm font-bold flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-secondary" />
                    Horários Disponíveis de Hoje
                  </h4>
                  <p className="text-gray-400 text-[10px] mt-0.5">Clique em um slot vago para agendar e preencher o formulário automaticamente.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {recommendedSlots.map((slot) => {
                    // Verificar se o horário do slot já possui uma corrida agendada
                    const isBooked = eventosDoDia.some((ev) => {
                      const evHour = new Date(ev.data).getHours();
                      const slotHour = parseInt(slot.time.split(":")[0]);
                      return Math.abs(evHour - slotHour) < 2; // Bloqueia slots próximos de 2 horas
                    });

                    return (
                      <button
                        key={slot.time}
                        disabled={isBooked}
                        onClick={() => handleQuickAddSlot(slot.time)}
                        className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 group relative ${
                          isBooked
                            ? "bg-rose-500/5 border-rose-500/10 text-rose-300 opacity-40 cursor-not-allowed"
                            : "bg-[#0C0F0F] border-white/5 hover:border-secondary/30 text-white hover:bg-secondary/5 cursor-pointer"
                        }`}
                      >
                        <span className="text-[10px] font-bold tracking-wider">{slot.time}</span>
                        <span className={`text-[8px] font-semibold uppercase tracking-wider ${
                          isBooked ? "text-rose-450" : "text-gray-500 group-hover:text-secondary-fixed"
                        }`}>
                          {isBooked ? "Ocupado" : slot.label}
                        </span>
                        
                        {!isBooked && (
                          <span className="absolute right-2 top-2 text-secondary opacity-0 group-hover:opacity-100 transition duration-200">
                            <Plus className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
};

export default Agenda;