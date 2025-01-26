import { useEffect, useState, useCallback } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { format, isBefore, isSameDay, differenceInDays, startOfDay } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { PlusCircleIcon, CalendarIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/solid';

// Interface do Evento
interface Evento {
  id: string;
  titulo: string;
  descricao: string;
  data: Date;
  tipo: 'passado' | 'presente' | 'futuro';
  local: string;
}

// Componente para exibição de eventos
const EventoCard = ({ evento }: { evento: Evento }) => (
  <div
    className={`p-6 bg-white rounded-lg shadow-lg flex flex-col gap-4 hover:scale-105 transform transition-all ${
      evento.tipo === 'passado'
        ? 'border-l-4 border-gray-500'
        : evento.tipo === 'presente'
        ? 'border-l-4 border-blue-500'
        : 'border-l-4 border-green-500'
    }`}
  >
    <h3 className="text-xl font-semibold text-gray-800">{evento.titulo}</h3>
    <p className="text-gray-600">{evento.descricao}</p>
    <div className="flex items-center gap-2 text-gray-500">
      <MapPinIcon className="h-5 w-5" />
      {evento.local}
    </div>
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <CalendarIcon className="h-5 w-5" />
      {format(evento.data, 'dd/MM/yyyy HH:mm')}
    </div>
  </div>
);

// Componente principal da Agenda
const Agenda = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());
  const [novoEvento, setNovoEvento] = useState({
    cliente: '',
    origem: '',
    destino: '',
    data: '',
    hora: '',
  });

  // Carrega eventos da base de dados
  const fetchEventos = useCallback(async () => {
    try {
      const eventosRef = collection(db, 'eventos');
      const eventosSnap = await getDocs(eventosRef);

      const eventosList: Evento[] = eventosSnap.docs.map((doc) => {
        const dataEvento = doc.data().data.toDate();
        return {
          id: doc.id,
          titulo: doc.data().titulo || 'Título não disponível',
          descricao: doc.data().descricao || 'Descrição não disponível',
          local: doc.data().local || 'Local não disponível',
          data: dataEvento,
          tipo: getEventoTipo(dataEvento),
        };
      });

      setEventos(eventosList);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  }, []);

  // Determina o tipo do evento
  const getEventoTipo = (data: Date): 'passado' | 'presente' | 'futuro' => {
    const hoje = startOfDay(new Date());
    if (isBefore(data, hoje)) return 'passado';
    if (isSameDay(data, hoje)) return 'presente';
    return 'futuro';
  };

  // Adiciona novo evento
  const handleAddEvento = async (e: React.FormEvent) => {
    e.preventDefault();

    const { cliente, origem, destino, data, hora } = novoEvento;
    const dataCompleta = new Date(`${data}T${hora}`);

    try {
      const docRef = await addDoc(collection(db, 'eventos'), {
        titulo: `Corrida: ${cliente}`,
        descricao: `De ${origem} para ${destino}`,
        local: destino,
        data: dataCompleta,
      });

      setEventos((prevEventos) => [
        ...prevEventos,
        {
          id: docRef.id,
          titulo: `Corrida: ${cliente}`,
          descricao: `De ${origem} para ${destino}`,
          local: destino,
          data: dataCompleta,
          tipo: getEventoTipo(dataCompleta),
        },
      ]);

      setNovoEvento({ cliente: '', origem: '', destino: '', data: '', hora: '' });
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
    }
  };

  // Filtra os eventos para a data selecionada
  const eventosDoDia = eventos.filter((evento) => isSameDay(evento.data, dataSelecionada));

  // Efeito para carregar os eventos no início
  useEffect(() => {
    fetchEventos();
  }, [fetchEventos]);

  // Calcula a diferença de dias entre a data selecionada e a data atual
  const calcularDias = (data: Date) => {
    const hoje = startOfDay(new Date());
    const diff = differenceInDays(data, hoje);
    if (diff > 0) return `em ${diff} dia${diff > 1 ? 's' : ''}`;
    if (diff < 0) return `${Math.abs(diff)} dia${Math.abs(diff) > 1 ? 's' : ''} atrás`;
    return 'Hoje';
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Agenda de Eventos</h1>

      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-blue-600">
          {format(dataSelecionada, 'dd/MM/yyyy')} - {calcularDias(dataSelecionada)}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <Calendar
            onChange={(date) => setDataSelecionada(date as Date)}
            value={dataSelecionada}
            className="rounded-lg shadow-lg border border-gray-200 p-4"
          />
        </div>

        <form onSubmit={handleAddEvento} className="w-full md:w-1/2 space-y-4">
          <div className="flex items-center gap-2">
            <UserIcon className="h-6 w-6 text-blue-500" />
            <input
              type="text"
              placeholder="Cliente"
              value={novoEvento.cliente}
              onChange={(e) => setNovoEvento({ ...novoEvento, cliente: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-6 w-6 text-blue-500" />
            <input
              type="text"
              placeholder="Origem"
              value={novoEvento.origem}
              onChange={(e) => setNovoEvento({ ...novoEvento, origem: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-6 w-6 text-blue-500" />
            <input
              type="text"
              placeholder="Destino"
              value={novoEvento.destino}
              onChange={(e) => setNovoEvento({ ...novoEvento, destino: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={novoEvento.data}
              onChange={(e) => setNovoEvento({ ...novoEvento, data: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="time"
              value={novoEvento.hora}
              onChange={(e) => setNovoEvento({ ...novoEvento, hora: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition"
          >
            <PlusCircleIcon className="h-6 w-6" />
            Adicionar Evento
          </button>
        </form>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {eventosDoDia.length === 0 ? (
          <p className="text-gray-500 text-center">Sem eventos para este dia.</p>
        ) : (
          eventosDoDia.map((evento) => <EventoCard key={evento.id} evento={evento} />)
        )}
      </div>
    </div>
  );
};

export default Agenda;
