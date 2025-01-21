import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { format, isBefore, isToday, isSameDay, differenceInDays, startOfDay } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Estilo do calendário

interface Evento {
    id: string;
    titulo: string;
    descricao: string;
    data: any; // Timestamp do Firebase
    tipo: 'passado' | 'presente' | 'futuro';
    local: string;
}

const Agenda = () => {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());
    const [eventosDoDia, setEventosDoDia] = useState<Evento[]>([]);

    useEffect(() => {
        const fetchEventos = async () => {
            const eventosRef = collection(db, 'eventos');
            const eventosSnap = await getDocs(eventosRef);

            const eventosList: Evento[] = eventosSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                data: doc.data().data.toDate(), // Converter para data JS
            }));

            setEventos(eventosList.map(evento => ({
                ...evento,
                tipo: getEventoTipo(evento.data)
            })));
        };

        fetchEventos();
    }, []);

    const getEventoTipo = (data: Date) => {
        const dataInicioDia = startOfDay(new Date()); // Zera a hora da data de hoje
        if (isBefore(data, dataInicioDia)) {
            return 'passado';
        } else if (isSameDay(data, dataInicioDia)) {
            return 'presente';
        } else {
            return 'futuro';
        }
    };

    useEffect(() => {
        // Filtrar eventos para o dia selecionado
        const eventosDia = eventos.filter(evento =>
            isSameDay(evento.data, dataSelecionada)
        );
        setEventosDoDia(eventosDia);
    }, [dataSelecionada, eventos]);

    const handleDateChange = (date: Date) => {
        setDataSelecionada(date);
    };

    const calcularDias = (data: Date) => {
        const dataInicioDia = startOfDay(new Date()); // Zera a hora da data de hoje
        const diff = differenceInDays(data, dataInicioDia);
        if (diff > 0) {
            return `em ${diff} dia${diff > 1 ? 's' : ''}`;
        } else if (diff < 0) {
            return `${Math.abs(diff)} dia${Math.abs(diff) > 1 ? 's' : ''} atrás`;
        } else {
            return 'Hoje';
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-4xl font-semibold text-center mb-8">Agenda de Eventos</h1>
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-semibold text-blue-600">
                    {format(dataSelecionada, 'dd/MM/yyyy')} - {calcularDias(dataSelecionada)}
                </h2>
            </div>
            <div className="flex justify-center mb-8">
                <Calendar
                    onChange={handleDateChange}
                    value={dataSelecionada}
                    className="rounded-lg shadow-xl border border-gray-300 p-4"
                />
            </div>

            <div className="space-y-4">
                {eventosDoDia.length === 0 ? (
                    <p className="text-gray-500">Sem eventos para este dia.</p>
                ) : (
                    eventosDoDia.map(evento => (
                        <div
                            key={evento.id}
                            className={`p-6 bg-white rounded-lg shadow-lg hover:scale-105 transform transition-all ${
                                evento.tipo === 'passado' ? 'border-l-4 border-gray-500' : 
                                evento.tipo === 'presente' ? 'border-l-4 border-blue-500' :
                                'border-l-4 border-green-500'
                            }`}
                        >
                            <h3 className="text-xl font-semibold text-gray-800">{evento.titulo}</h3>
                            <p className="text-gray-600">{evento.descricao}</p>
                            <p className="text-gray-500">{evento.local}</p>
                            <p className="text-sm text-gray-400">
                                {format(evento.data, 'dd/MM/yyyy HH:mm')}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Agenda;
