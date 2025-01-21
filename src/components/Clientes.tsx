import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useForm, Controller } from 'react-hook-form';
import { FaSearch, FaTrashAlt, FaPen } from 'react-icons/fa'; // Ícones
import { format } from 'date-fns';

interface Cliente {
    id: string;
    nome: string;
    sobrenome: string;
    endereco: string;
    cep: string;
    cpf?: string;
    email?: string;
    telefone: string;
    observacoes?: string;
    rua?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    pais?: string;
}

const ClienteComponent = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
    const { control, handleSubmit, reset } = useForm<Cliente>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        const clientesRef = collection(db, 'clientes');
        const clientesSnap = await getDocs(clientesRef);
        const clientesList = clientesSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setClientes(clientesList);
    };

    const fetchCEP = async (cep: string) => {
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                if (data.erro) {
                    alert('CEP inválido');
                } else {
                    reset({
                        endereco: data.logradouro,
                        bairro: data.bairro,
                        cidade: data.localidade,
                        estado: data.uf,
                        pais: 'BR',
                    });
                }
            } catch (error) {
                console.error('Erro ao buscar o CEP:', error);
            }
        }
    };

    const onSubmit = async (data: Cliente) => {
        setLoading(true);
        try {
            if (selectedClient) {
                // Atualizar cliente
                const clienteRef = doc(db, 'clientes', selectedClient.id);
                await updateDoc(clienteRef, data);
            } else {
                // Cadastrar novo cliente
                await addDoc(collection(db, 'clientes'), data);
            }
            fetchClientes();
            setSelectedClient(null); // Reset após salvar
        } catch (error) {
            console.error('Erro ao salvar o cliente:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectCliente = (cliente: Cliente) => {
        setSelectedClient(cliente);
        reset(cliente);
    };

    const handleDeleteCliente = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'clientes', id));
            fetchClientes();
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-4xl font-semibold text-center mb-8">Gestão de Clientes</h1>

            {/* Formulário de Cliente */}
            <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-4">
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <Controller
                            name="nome"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    placeholder="Nome"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            )}
                        />
                    </div>
                    <div className="w-1/2">
                        <Controller
                            name="sobrenome"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    placeholder="Sobrenome"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <Controller
                            name="cep"
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-center">
                                    <input
                                        {...field}
                                        placeholder="CEP"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        onBlur={() => fetchCEP(field.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fetchCEP(field.value)}
                                        className="ml-2 p-2 text-blue-500"
                                    >
                                        <FaSearch />
                                    </button>
                                </div>
                            )}
                        />
                    </div>
                    <div className="w-1/2">
                        <Controller
                            name="rua"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    placeholder="Rua"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <Controller
                            name="numero"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    placeholder="Número"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            )}
                        />
                    </div>
                    <div className="w-1/2">
                        <Controller
                            name="complemento"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    placeholder="Complemento"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <Controller
                            name="bairro"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    placeholder="Bairro"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            )}
                        />
                    </div>
                    <div className="w-1/2">
                        <Controller
                            name="cidade"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    placeholder="Cidade"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <Controller
                            name="estado"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    placeholder="Estado"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    defaultValue="BR"
                                />
                            )}
                        />
                    </div>
                    <div className="w-1/2">
                        <Controller
                            name="pais"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    placeholder="País"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    defaultValue="BR"
                                />
                            )}
                        />
                    </div>
                </div>

                <Controller
                    name="telefone"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            placeholder="Telefone (WhatsApp)"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    )}
                />

                <Controller
                    name="observacoes"
                    control={control}
                    render={({ field }) => (
                        <textarea
                            {...field}
                            placeholder="Observações"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    )}
                />

                <button
                    type="submit"
                    className="w-full p-3 bg-blue-500 text-white rounded-md"
                    disabled={loading}
                >
                    {loading ? 'Carregando...' : selectedClient ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
                </button>
            </form>

            {/* Lista de Clientes */}
            <h2 className="text-2xl font-semibold mb-4">Clientes Cadastrados</h2>
            <ul className="space-y-4">
                {clientes.map(cliente => (
                    <li key={cliente.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{cliente.nome} {cliente.sobrenome}</h3>
                                <p className="text-sm">{cliente.telefone}</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                    onClick={() => handleSelectCliente(cliente)}
                                >
                                    <FaPen />
                                    Editar
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                                    onClick={() => handleDeleteCliente(cliente.id)}
                                >
                                    <FaTrashAlt />
                                    Deletar
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClienteComponent;
