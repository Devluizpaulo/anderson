import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ReceiptData } from "./types";
import { CheckCircle, Users, MapPin, DollarSign } from "lucide-react";

interface ReceiptFormProps {
  onSubmit: (data: Omit<ReceiptData, "id" | "numero" | "criadoEm" | "motorista">) => void;
}

export const ReceiptForm: React.FC<ReceiptFormProps> = ({ onSubmit }) => {
  const [cliente, setCliente] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [dataServico, setDataServico] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [horario, setHorario] = useState("");
  const [valor, setValor] = useState<number>(0);
  const [formaPagamento, setFormaPagamento] = useState("Pix");
  const [observacoes, setObservacoes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cliente.trim()) {
      alert("Por favor, informe o nome do cliente.");
      return;
    }
    if (!origem.trim()) {
      alert("Por favor, informe o local de partida.");
      return;
    }
    if (!destino.trim()) {
      alert("Por favor, informe o local de destino.");
      return;
    }
    if (valor <= 0) {
      alert("Por favor, informe um valor de corrida maior que zero.");
      return;
    }

    onSubmit({
      cliente,
      cpf: cpf || undefined,
      telefone: telefone || undefined,
      origem,
      destino,
      dataServico,
      horario: horario || undefined,
      valor,
      formaPagamento,
      observacoes: observacoes || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Dados do Cliente */}
      <div className="space-y-4 bg-black/30 p-5 rounded-2xl border border-[#e9c349]/10">
        <div className="flex items-center space-x-2 border-b border-[#e9c349]/10 pb-2">
          <Users className="w-4 h-4 text-[#e9c349]" />
          <h3 className="font-bold text-[#e2e2e2] text-sm uppercase tracking-wider">Dados do Cliente</h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cliente" className="text-xs font-semibold text-[#c4c7c7]">
            Nome Completo do Cliente *
          </Label>
          <Input
            id="cliente"
            type="text"
            placeholder="Ex: João da Silva Santos"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            className="bg-[#0C0F0F] border-[#444748]/30 text-white placeholder-gray-600 focus:border-[#e9c349] transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cpf" className="text-xs font-semibold text-[#c4c7c7]">
              CPF ou CNPJ (Opcional)
            </Label>
            <Input
              id="cpf"
              type="text"
              placeholder="Ex: 000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="bg-[#0C0F0F] border-[#444748]/30 text-white placeholder-gray-600 focus:border-[#e9c349] transition"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefone" className="text-xs font-semibold text-[#c4c7c7]">
              Telefone (Opcional)
            </Label>
            <Input
              id="telefone"
              type="tel"
              placeholder="Ex: (11) 98888-7777"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="bg-[#0C0F0F] border-[#444748]/30 text-white placeholder-gray-600 focus:border-[#e9c349] transition"
            />
          </div>
        </div>
      </div>

      {/* Trajeto e Data */}
      <div className="space-y-4 bg-black/30 p-5 rounded-2xl border border-[#e9c349]/10">
        <div className="flex items-center space-x-2 border-b border-[#e9c349]/10 pb-2">
          <MapPin className="w-4 h-4 text-[#e9c349]" />
          <h3 className="font-bold text-[#e2e2e2] text-sm uppercase tracking-wider">Detalhes do Trajeto</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="origem" className="text-xs font-semibold text-[#c4c7c7]">
              Local de Partida *
            </Label>
            <Input
              id="origem"
              type="text"
              placeholder="Ex: Aeroporto de Congonhas (CGH)"
              value={origem}
              onChange={(e) => setOrigem(e.target.value)}
              className="bg-[#0C0F0F] border-[#444748]/30 text-white placeholder-gray-600 focus:border-[#e9c349] transition"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="destino" className="text-xs font-semibold text-[#c4c7c7]">
              Local de Destino *
            </Label>
            <Input
              id="destino"
              type="text"
              placeholder="Ex: Hotel Fasano, Jardins"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              className="bg-[#0C0F0F] border-[#444748]/30 text-white placeholder-gray-600 focus:border-[#e9c349] transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dataServico" className="text-xs font-semibold text-[#c4c7c7]">
              Data do Serviço *
            </Label>
            <Input
              id="dataServico"
              type="date"
              value={dataServico}
              onChange={(e) => setDataServico(e.target.value)}
              className="bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="horario" className="text-xs font-semibold text-[#c4c7c7]">
              Horário (Opcional)
            </Label>
            <Input
              id="horario"
              type="time"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              className="bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
            />
          </div>
        </div>
      </div>

      {/* Valores e Pagamento */}
      <div className="space-y-4 bg-black/30 p-5 rounded-2xl border border-[#e9c349]/10">
        <div className="flex items-center space-x-2 border-b border-[#e9c349]/10 pb-2">
          <DollarSign className="w-4 h-4 text-[#e9c349]" />
          <h3 className="font-bold text-[#e2e2e2] text-sm uppercase tracking-wider">Faturamento e Pagamento</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="valor" className="text-xs font-semibold text-[#c4c7c7]">
              Valor da Corrida (R$) *
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-[#c4c7c7]">R$</span>
              <Input
                id="valor"
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                value={valor || ""}
                onChange={(e) => setValor(Number(e.target.value))}
                className="pl-9 bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="formaPagamento" className="text-xs font-semibold text-[#c4c7c7]">
              Forma de Pagamento
            </Label>
            <select
              id="formaPagamento"
              value={formaPagamento}
              onChange={(e) => setFormaPagamento(e.target.value)}
              className="w-full h-10 px-3 py-2 text-sm rounded-md bg-[#0C0F0F] border border-[#444748]/30 text-white focus:border-[#e9c349] transition focus:outline-none"
            >
              <option value="Pix">Pix</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
              <option value="Cartão de Débito">Cartão de Débito</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Transferência Bancária">Transferência Bancária</option>
              <option value="Faturamento Mensal">Faturamento Mensal</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="observacoes" className="text-xs font-semibold text-[#c4c7c7]">
            Observações (Opcional)
          </Label>
          <textarea
            id="observacoes"
            rows={2}
            placeholder="Ex: Bagagem pesada, pedágio incluso no valor total."
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            className="w-full p-3 text-sm rounded-md bg-[#0C0F0F] border border-[#444748]/30 text-white focus:border-[#e9c349] focus:outline-none transition resize-none placeholder-gray-600"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#e9c349] hover:bg-[#e9c349]/90 text-black font-extrabold py-6 rounded-xl shadow-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center text-sm uppercase tracking-wider"
      >
        <CheckCircle className="w-5 h-5 mr-2" />
        Gerar Recibo de Corrida
      </Button>
    </form>
  );
};
