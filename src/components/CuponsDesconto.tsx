import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, updateDoc, doc, getDocs, query, where, getDoc, Timestamp } from 'firebase/firestore';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

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
    const [campanhas, setCampanhas] = useState<Campanha[]>([]);
    const [nomeCampanha, setNomeCampanha] = useState('');
    const [descricaoCampanha, setDescricaoCampanha] = useState('');
    const [valorDesconto, setValorDesconto] = useState(5);
    const [limiteCupons, setLimiteCupons] = useState(0);
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [statusCampanha, setStatusCampanha] = useState('ativo');
    const [customValorDesconto, setCustomValorDesconto] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
        return cuponsSnap.size;
    };

    // Criar nova campanha
    const handleCriarCampanha = async () => {
        if (!nomeCampanha || !descricaoCampanha || !dataInicio || !dataFim || limiteCupons <= 0) {
            toast({
                title: "Erro",
                description: "Preencha todos os campos obrigatórios.",
                variant: "destructive",
            });
            return;
        }

        if (new Date(dataInicio) >= new Date(dataFim)) {
            toast({
                title: "Erro",
                description: "A data de início deve ser anterior à data de fim.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        const novaCampanha = {
            nome: nomeCampanha,
            descricao: descricaoCampanha,
            valor_desconto: customValorDesconto ? Number(customValorDesconto) : valorDesconto,
            limite_cupons: limiteCupons,
            quantidade_cupons: 0,
            inicio: Timestamp.fromDate(new Date(dataInicio)),
            fim: Timestamp.fromDate(new Date(dataFim)),
            status: statusCampanha,
        };

        try {
            await addDoc(collection(db, 'campanhas'), novaCampanha);
            toast({
                title: "Sucesso",
                description: "Campanha criada com sucesso!",
            });
            fetchCampanhas();
        } catch (e) {
            toast({
                title: "Erro",
                description: "Erro ao criar campanha: " + e,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Gerar cupons para a campanha
    const handleGerarCupons = async (campanhaId: string) => {
        const campanhaRef = doc(db, 'campanhas', campanhaId);
        const campanhaSnap = await getDoc(campanhaRef);
        const campanhaData = campanhaSnap.data();

        if (!campanhaData) {
            toast({
                title: "Erro",
                description: "Campanha não encontrada!",
                variant: "destructive",
            });
            return;
        }

        const cuponsEmitidos = await checkCuponsRestantes(campanhaId);
        const cuponsRestantes = campanhaData.limite_cupons - cuponsEmitidos;

        if (cuponsRestantes <= 0) {
            toast({
                title: "Erro",
                description: "Limite de cupons já atingido!",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
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

            await updateDoc(campanhaRef, { quantidade_cupons: cuponsEmitidos + cuponsRestantes });
            toast({
                title: "Sucesso",
                description: "Cupons gerados com sucesso!",
            });
            fetchCampanhas();
        } catch (e) {
            toast({
                title: "Erro",
                description: "Erro ao gerar cupons: " + e,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-6">Cupons de Desconto</h2>

            {/* Formulário de Criação de Campanha */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Criar Campanha</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="nomeCampanha">Nome da Campanha</Label>
                        <Input
                            id="nomeCampanha"
                            value={nomeCampanha}
                            onChange={(e) => setNomeCampanha(e.target.value)}
                            placeholder="Digite o nome da campanha"
                        />
                    </div>
                    <div>
                        <Label htmlFor="descricaoCampanha">Descrição da Campanha</Label>
                        <Input
                            id="descricaoCampanha"
                            value={descricaoCampanha}
                            onChange={(e) => setDescricaoCampanha(e.target.value)}
                            placeholder="Descreva os detalhes da campanha"
                        />
                    </div>
                    <div>
                        <Label htmlFor="valorDesconto">Valor do Desconto</Label>
                        <div className="flex gap-2">
                            <Select
                                value={valorDesconto.toString()}
                                onValueChange={(value) => setValorDesconto(Number(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90].map((valor) => (
                                        <SelectItem key={valor} value={valor.toString()}>{valor}%</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Input
                                id="customValorDesconto"
                                type="number"
                                value={customValorDesconto}
                                onChange={(e) => setCustomValorDesconto(e.target.value)}
                                placeholder="Valor personalizado"
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="statusCampanha">Status da Campanha</Label>
                        <Select
                            value={statusCampanha}
                            onValueChange={(value) => setStatusCampanha(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ativo">Ativo</SelectItem>
                                <SelectItem value="inativo">Inativo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="limiteCupons">Limite de Cupons</Label>
                        <Input
                            id="limiteCupons"
                            type="number"
                            value={limiteCupons}
                            onChange={(e) => setLimiteCupons(Number(e.target.value))}
                            placeholder="Número máximo de cupons"
                        />
                    </div>
                    <div>
                        <Label htmlFor="dataInicio">Data de Início</Label>
                        <Input
                            id="dataInicio"
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="dataFim">Data de Fim</Label>
                        <Input
                            id="dataFim"
                            type="date"
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleCriarCampanha} disabled={isLoading} className="w-full">
                        {isLoading ? "Criando..." : "Criar Campanha"}
                    </Button>
                </CardFooter>
            </Card>

            {/* Listagem de Campanhas Criadas */}
            <div>
                <h3 className="text-2xl font-semibold mb-4">Campanhas Criadas</h3>
                {campanhas.map(campanha => (
                    <Card key={campanha.id} className="mb-4">
                        <CardHeader>
                            <CardTitle>{campanha.nome}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{campanha.descricao}</p>
                            <p>Valor de Desconto: {campanha.valor_desconto}%</p>
                            <p>Status: {campanha.status}</p>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() => handleGerarCupons(campanha.id)}
                                disabled={isLoading}
                            >
                                Gerar Cupons
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Renderizar o Toaster */}
            <Toaster />
        </div>
    );
};

export default CuponsDesconto;