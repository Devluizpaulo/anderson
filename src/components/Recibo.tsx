import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Componente Recibo
const Recibo: React.FC = () => {
  const [clienteNome, setClienteNome] = useState<string>("");
  const [clienteTelefone, setClienteTelefone] = useState<string>("");
  const [inicioCorrida, setInicioCorrida] = useState<string>("");
  const [fimCorrida, setFimCorrida] = useState<string>("");
  const [valorCorrida, setValorCorrida] = useState<number>(0);
  const [numeroRecibo, setNumeroRecibo] = useState<string>("");
  const [motoristaNome, setMotoristaNome] = useState<string>("");
  const [motoristaCpfCnpj, setMotoristaCpfCnpj] = useState<string>("");
  const [placaCarro, setPlacaCarro] = useState<string>("");
  const [modeloCarro, setModeloCarro] = useState<string>("");

  // Gerar número do recibo automaticamente
  const gerarNumeroRecibo = () => {
    const numero = `R-${Math.floor(Math.random() * 10000)}`;
    setNumeroRecibo(numero);
  };

  // Renderizar o recibo
  const renderRecibo = () => {
    return (
      <Card className="max-w-2xl mx-auto p-6 mt-6">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Recibo de Corrida</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <p><strong>Número do Recibo:</strong> {numeroRecibo}</p>
            <p><strong>Cliente:</strong> {clienteNome}</p>
            <p><strong>CPF ou CNPJ:</strong> {clienteTelefone}</p>
            <p><strong>Telefone:</strong> {clienteTelefone}</p>
            <p><strong>Origem:</strong> {inicioCorrida}</p>
            <p><strong>Destino:</strong> {fimCorrida}</p>
            <p><strong>Valor da Corrida:</strong> R$ {valorCorrida.toFixed(2)}</p>
            <p><strong>Data e Local:</strong> {inicioCorrida}</p>
          </div>

          <h4 className="text-xl font-semibold text-gray-700 mt-6">Dados do Motorista</h4>
          <div className="grid grid-cols-2 gap-6 mt-4">
            <p><strong>Placa do Carro:</strong> {placaCarro}</p>
            <p><strong>Modelo do Carro:</strong> {modeloCarro}</p>
            <p><strong>Nome do Motorista:</strong> {motoristaNome}</p>
            <p><strong>CPF ou CNPJ do Motorista:</strong> {motoristaCpfCnpj}</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col p-6 bg-gray-50 rounded-lg shadow-xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Emitir Recibo</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="clienteNome">Nome do Cliente</Label>
          <Input
            id="clienteNome"
            type="text"
            value={clienteNome}
            onChange={(e) => setClienteNome(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="clienteTelefone">Telefone do Cliente</Label>
          <Input
            id="clienteTelefone"
            type="text"
            value={clienteTelefone}
            onChange={(e) => setClienteTelefone(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="inicioCorrida">Início da Corrida</Label>
          <Input
            id="inicioCorrida"
            type="datetime-local"
            value={inicioCorrida}
            onChange={(e) => setInicioCorrida(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="fimCorrida">Fim da Corrida</Label>
          <Input
            id="fimCorrida"
            type="datetime-local"
            value={fimCorrida}
            onChange={(e) => setFimCorrida(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="valorCorrida">Valor da Corrida (R$)</Label>
          <Input
            id="valorCorrida"
            type="number"
            value={valorCorrida}
            onChange={(e) => setValorCorrida(Number(e.target.value))}
            className="mt-1"
          />
        </div>

        {/* Dados do Motorista */}
        <div>
          <Label htmlFor="motoristaNome">Nome do Motorista</Label>
          <Input
            id="motoristaNome"
            type="text"
            value={motoristaNome}
            onChange={(e) => setMotoristaNome(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="motoristaCpfCnpj">CPF ou CNPJ do Motorista</Label>
          <Input
            id="motoristaCpfCnpj"
            type="text"
            value={motoristaCpfCnpj}
            onChange={(e) => setMotoristaCpfCnpj(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="placaCarro">Placa do Carro</Label>
          <Input
            id="placaCarro"
            type="text"
            value={placaCarro}
            onChange={(e) => setPlacaCarro(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="modeloCarro">Modelo do Carro</Label>
          <Input
            id="modeloCarro"
            type="text"
            value={modeloCarro}
            onChange={(e) => setModeloCarro(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <Button
        onClick={gerarNumeroRecibo}
        className="mt-6"
      >
        Gerar Recibo
      </Button>

      {/* Exibir Recibo gerado */}
      {numeroRecibo && renderRecibo()}
    </div>
  );
};

export default Recibo;