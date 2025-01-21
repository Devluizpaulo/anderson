import { useState } from "react";

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
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h3 className="text-2xl font-semibold text-center text-gray-800">Recibo de Corrida</h3>
        <div className="mt-6">
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
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col p-6 bg-gray-50 rounded-lg shadow-xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Emitir Recibo</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome do Cliente</label>
          <input
            type="text"
            value={clienteNome}
            onChange={(e) => setClienteNome(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Telefone do Cliente</label>
          <input
            type="text"
            value={clienteTelefone}
            onChange={(e) => setClienteTelefone(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Início da Corrida</label>
          <input
            type="datetime-local"
            value={inicioCorrida}
            onChange={(e) => setInicioCorrida(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fim da Corrida</label>
          <input
            type="datetime-local"
            value={fimCorrida}
            onChange={(e) => setFimCorrida(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Valor da Corrida (R$)</label>
          <input
            type="number"
            value={valorCorrida}
            onChange={(e) => setValorCorrida(Number(e.target.value))}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Dados do Motorista */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome do Motorista</label>
          <input
            type="text"
            value={motoristaNome}
            onChange={(e) => setMotoristaNome(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CPF ou CNPJ do Motorista</label>
          <input
            type="text"
            value={motoristaCpfCnpj}
            onChange={(e) => setMotoristaCpfCnpj(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Placa do Carro</label>
          <input
            type="text"
            value={placaCarro}
            onChange={(e) => setPlacaCarro(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Modelo do Carro</label>
          <input
            type="text"
            value={modeloCarro}
            onChange={(e) => setModeloCarro(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <button
        onClick={() => {
          gerarNumeroRecibo();
        }}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
      >
        Gerar Recibo
      </button>

      {/* Exibir Recibo gerado */}
      {numeroRecibo && renderRecibo()}
    </div>
  );
};

export default Recibo;
