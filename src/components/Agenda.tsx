import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { format, isBefore, isSameDay, differenceInDays, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Calendar from 'react-calendar';
import EventoForm from './EventoFormProps'; // Importando o novo componente de cadastro de eventos
import 'react-calendar/dist/Calendar.css';

interface Evento {
    id: string;
    titulo: string;
    descricao: string;
    data: Date;
    tipo: 'passado' | 'presente' | 'futuro';
    local: string;
}

const Agenda = () => {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());
    const [eventosDoDia, setEventosDoDia] = useState<Evento[]>([]);
    const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);

    // Função para determinar o tipo do evento
    const getEventoTipo = (data: Date): 'passado' | 'presente' | 'futuro' => {
        const dataHoje = startOfDay(new Date());
        if (isBefore(data, dataHoje)) return 'passado';
        if (isSameDay(data, dataHoje)) return 'presente';
        return 'futuro';
    };

    // Função para buscar eventos no Firestore
    const fetchEventos = async () => {
        try {
            const eventosRef = collection(db, 'eventos');
            const eventosSnap = await getDocs(eventosRef);

            const eventosList: Evento[] = eventosSnap.docs.map(doc => {
                const eventoData = doc.data();
                return {
                    id: doc.id,
                    titulo: eventoData.titulo || 'Sem título',
                    descricao: eventoData.descricao || 'Sem descrição',
                    data: eventoData.data.toDate(), // Conversão do Firestore Timestamp para Date
                    local: eventoData.local || 'Local não informado',
                    tipo: 'futuro', // Temporário; será ajustado
                };
            });

            // Ajusta o tipo de cada evento após carregar
            const eventosComTipo = eventosList.map(evento => ({
                ...evento,
                tipo: getEventoTipo(evento.data),
            }));

            setEventos(eventosComTipo);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
    };

    // Atualiza os eventos do dia selecionado
    const atualizarEventosDoDia = () => {
        const eventosDia = eventos.filter(evento => isSameDay(evento.data, dataSelecionada));
        setEventosDoDia(eventosDia);
    };

    // Função para calcular a diferença de dias
    const calcularDias = (data: Date): string => {
        const dataHoje = startOfDay(new Date());
        const diff = differenceInDays(data, dataHoje);
        if (diff > 0) return `em ${diff} dia${diff > 1 ? 's' : ''}`;
        if (diff < 0) return `${Math.abs(diff)} dia${Math.abs(diff) > 1 ? 's' : ''} atrás`;
        return 'Hoje';
    };

    // Efeito para carregar os eventos ao montar o componente
    useEffect(() => {
        fetchEventos();
    }, []);

    // Efeito para atualizar eventos do dia ao alterar data ou lista de eventos
    useEffect(() => {
        atualizarEventosDoDia();
    }, [dataSelecionada, eventos]);

    // Manipula a mudança de data no calendário
    const handleDateChange = (value: Date | Date[] | null) => {
        if (value && !Array.isArray(value)) {
            setDataSelecionada(value);
        }
    };

    // Atualiza a lista de eventos após cadastrar um novo
    const handleEventoCadastrado = () => {
        fetchEventos();
        setMostrarFormulario(false); // Esconde o formulário após o evento ser cadastrado
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-semibold text-center mb-8">Agenda de Eventos</h1>

            {/* Botão para exibir o formulário */}
            <div className="text-center mb-6">
                <button
                    onClick={() => setMostrarFormulario(!mostrarFormulario)}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    {mostrarFormulario ? 'Fechar Formulário' : 'Cadastrar Corrida'}
                </button>
            </div>

            {/* Formulário de cadastro de evento */}
            {mostrarFormulario && <EventoForm onEventoCadastrado={handleEventoCadastrado} />}

            {/* Exibe a data selecionada */}
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-semibold text-blue-600">
                    {format(dataSelecionada, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} - {calcularDias(dataSelecionada)}
                </h2>
            </div>

            {/* Calendário */}
            <div className="flex justify-center mb-8">
                <Calendar
                    onChange={handleDateChange}
                    value={dataSelecionada}
                    className="rounded-lg shadow-xl border border-gray-300 p-4 w-full md:w-2/3 lg:w-1/2"
                />
            </div>

            {/* Lista de eventos do dia */}
            <div className="space-y-4">
                {eventosDoDia.length === 0 ? (
                    <p className="text-gray-500 text-center">Sem eventos para este dia.</p>
                ) : (
                    eventosDoDia.map(evento => (
                        <div key={evento.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                            <h3 className="font-semibold text-xl text-blue-600">{evento.titulo}</h3>
                            <p className="text-gray-600">{evento.descricao}</p>
                            <p className="text-sm text-gray-500">{format(evento.data, 'dd/MM/yyyy HH:mm', { locale: ptBR })}</p>
                            <p className="text-sm text-gray-500">Local: {evento.local}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Agenda;
