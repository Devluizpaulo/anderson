import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';  // Assumindo que você já configurou o Firebase
import { collection, addDoc, updateDoc, doc, getDocs, query, where, getDoc, Timestamp } from 'firebase/firestore';

// Função para gerar códigos de cupons exclusivos
const generateCouponCode = () => {
    return 'CUP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

// Definir o tipo da campanha
interface Campanha {
    id: string;
    nome: string;
    descricao: string;
    valor_desconto: number | string;
    limite_cupons: number;
    quantidade_cupons: number;
    inicio: Timestamp;
    fim: Timestamp;
    status: string;
}

const CuponsDesconto = () => {
    const [campanhas, setCampanhas] = useState<Campanha[]>([]);  // Corrigido o tipo de campanhas
    const [nomeCampanha, setNomeCampanha] = useState('');
    const [descricaoCampanha, setDescricaoCampanha] = useState('');
    const [valorDesconto, setValorDesconto] = useState(0);
    const [quantidadeCupons, setQuantidadeCupons] = useState(0);
    const [limiteCupons, setLimiteCupons] = useState(0); // Limite de cupons
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [statusCampanha, setStatusCampanha] = useState('ativo');
    const [customValorDesconto, setCustomValorDesconto] = useState(''); // Valor personalizado

    // Buscar campanhas do Firebase
    const fetchCampanhas = async () => {
        const campanhasRef = collection(db, 'campanhas');
        const campanhasSnap = await getDocs(campanhasRef);
        const campanhasList = campanhasSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Campanha[];
        setCampanhas(campanhasList);
    };

    useEffect(() => {
        fetchCampanhas();
    }, []);

    // Função para verificar a quantidade de cupons restantes
    const checkCuponsRestantes = async (campanhaId: string) => {
        const cuponsRef = collection(db, 'cupons');
        const q = query(cuponsRef, where("campanha_id", "==", campanhaId));
        const cuponsSnap = await getDocs(q);
        const cuponsEmitidos = cuponsSnap.size;
        return cuponsEmitidos;
    };

    // Criar nova campanha
    const handleCriarCampanha = async () => {
        const novaCampanha = {
            nome: nomeCampanha,
            descricao: descricaoCampanha,
            valor_desconto: customValorDesconto ? customValorDesconto : valorDesconto,
            limite_cupons: limiteCupons, // Limite de cupons
            quantidade_cupons: 0, // Inicialmente, 0 cupons gerados
            inicio: Timestamp.fromDate(new Date(dataInicio)),
            fim: Timestamp.fromDate(new Date(dataFim)),
            status: statusCampanha,
        };

        try {
            const docRef = await addDoc(collection(db, 'campanhas'), novaCampanha);
            alert('Campanha criada com sucesso!');
            fetchCampanhas();  // Recarregar campanhas
        } catch (e) {
            alert('Erro ao criar campanha: ' + e);
        }
    };

    // Gerar cupons para a campanha
    const handleGerarCupons = async (campanhaId: string) => {
        const campanhaRef = doc(db, 'campanhas', campanhaId);
        const campanhaSnap = await getDoc(campanhaRef);
        const campanhaData = campanhaSnap.data();

        if (!campanhaData) {
            alert('Campanha não encontrada!');
            return;
        }

        // Verifica a quantidade de cupons restantes
        const cuponsEmitidos = await checkCuponsRestantes(campanhaId);
        const cuponsRestantes = campanhaData.limite_cupons - cuponsEmitidos;

        if (cuponsRestantes <= 0) {
            alert('Limite de cupons já atingido!');
            return;
        }

        // Gera cupons
        for (let i = 0; i < cuponsRestantes; i++) {
            const codigoCupom = generateCouponCode();
            const cupom = {
                codigo: codigoCupom,
                campanha_id: campanhaId,
                cpf_celular: '',
                usado: false,
                data_resgate: null,
            };

            await addDoc(collection(db, 'cupons'), cupom);
        }

        // Atualiza a quantidade de cupons gerados na campanha
        await updateDoc(campanhaRef, { quantidade_cupons: cuponsEmitidos + cuponsRestantes });

        alert('Cupons gerados com sucesso!');
        fetchCampanhas();  // Recarregar campanhas
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-6">Cupons de Desconto</h2>
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <h3 className="text-2xl font-semibold mb-4">Criar Campanha</h3>

                {/* Formulário de Criação de Campanha */}
                <div className="p-6 shadow-xl mb-6 grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-lg font-medium mb-2" htmlFor="nomeCampanha">Nome da Campanha</label>
                        <input
                            id="nomeCampanha"
                            type="text"
                            value={nomeCampanha}
                            onChange={(e) => setNomeCampanha(e.target.value)}
                            placeholder="Digite o nome da campanha"
                            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Descrição da Campanha */}
                    <div>
                        <label className="block text-lg font-medium mb-2" htmlFor="descricaoCampanha">Descrição da Campanha</label>
                        <textarea
                            id="descricaoCampanha"
                            value={descricaoCampanha}
                            onChange={(e) => setDescricaoCampanha(e.target.value)}
                            placeholder="Descreva os detalhes da campanha"
                            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Valor do Desconto (lista de 5%, 10%, 15%, ... até 90% e campo personalizado) */}
                    <div>
                        <label className="block text-lg font-medium mb-2" htmlFor="valorDesconto">Valor do Desconto</label>
                        <div className="flex space-x-4">
                            <select
                                id="valorDesconto"
                                value={valorDesconto}
                                onChange={(e) => setValorDesconto(Number(e.target.value))}
                                className="w-1/2 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90].map((valor) => (
                                    <option key={valor} value={valor}>{valor}%</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Limite de Cupons */}
                    <div>
                        <label className="block text-lg font-medium mb-2" htmlFor="limiteCupons">Limite de Cupons</label>
                        <input
                            id="limiteCupons"
                            type="number"
                            value={limiteCupons}
                            onChange={(e) => setLimiteCupons(Number(e.target.value))}
                            placeholder="Informe o limite de cupons"
                            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Data de Início */}
                    <div>
                        <label className="block text-lg font-medium mb-2" htmlFor="dataInicio">Data de Início</label>
                        <input
                            id="dataInicio"
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Data de Fim */}
                    <div>
                        <label className="block text-lg font-medium mb-2" htmlFor="dataFim">Data de Fim</label>
                        <input
                            id="dataFim"
                            type="date"
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
                            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        onClick={handleCriarCampanha}
                        className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all"
                    >
                        Criar Campanha
                    </button>
                </div>
            </div>

            {/* Listagem de campanhas */}
            <div className="bg-white p-6 rounded-lg shadow-xl mt-6">
                <h3 className="text-2xl font-semibold mb-4">Campanhas Ativas</h3>
                <div className="space-y-6">
                    {campanhas.map((campanha) => (
                        <div key={campanha.id} className="p-6 shadow-xl bg-gray-50 rounded-md">
                            <h4 className="text-xl font-semibold">{campanha.nome}</h4>
                            <p>{campanha.descricao}</p>
                            <p><strong>Desconto:</strong> {campanha.valor_desconto}%</p>
                            <p><strong>Status:</strong> {campanha.status}</p>
                            <button
                                onClick={() => handleGerarCupons(campanha.id)}
                                className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-all mt-3"
                            >
                                Gerar Cupons
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CuponsDesconto;
