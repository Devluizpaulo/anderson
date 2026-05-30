import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Percent, Calendar, Tag, FileText, Settings, BadgePercent } from "lucide-react";

interface CouponFormProps {
  onSubmit: (campaign: {
    nome: string;
    descricao?: string;
    tipoDesconto: "percentual" | "valor";
    valorDesconto: number;
    limiteCupons: number;
    dataInicio: string;
    dataFim: string;
    ativa: boolean;
  }) => Promise<void>;
  isLoading: boolean;
}

export const CouponForm: React.FC<CouponFormProps> = ({ onSubmit, isLoading }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoDesconto, setTipoDesconto] = useState<"percentual" | "valor">("percentual");
  const [percentSelect, setPercentSelect] = useState("10");
  const [valorCustom, setValorCustom] = useState("");
  const [limiteCupons, setLimiteCupons] = useState(100);
  const [dataInicio, setDataInicio] = useState(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  });
  const [dataFim, setDataFim] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30); // 30 dias de vigência padrão
    return d.toISOString().split("T")[0];
  });
  const [status, setStatus] = useState("ativo");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      alert("Por favor, preencha o nome da campanha.");
      return;
    }
    if (!dataInicio || !dataFim) {
      alert("Por favor, preencha as datas de início e fim da campanha.");
      return;
    }
    if (new Date(dataInicio) >= new Date(dataFim)) {
      alert("A data de início deve ser anterior à data de fim.");
      return;
    }
    if (limiteCupons <= 0) {
      alert("O limite de cupons deve ser maior que zero.");
      return;
    }

    // Calcular o valor de desconto reativamente
    let finalValorDesconto = 0;
    if (tipoDesconto === "percentual") {
      finalValorDesconto = valorCustom ? Number(valorCustom) : Number(percentSelect);
    } else {
      finalValorDesconto = Number(valorCustom);
    }

    if (finalValorDesconto <= 0) {
      alert("Por favor, preencha um valor de desconto maior que zero.");
      return;
    }

    try {
      await onSubmit({
        nome: nome.trim(),
        descricao: descricao.trim() || undefined,
        tipoDesconto,
        valorDesconto: finalValorDesconto,
        limiteCupons,
        dataInicio,
        dataFim,
        ativa: status === "ativo",
      });

      // Limpar campos após criação
      setNome("");
      setDescricao("");
      setValorCustom("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-black/30 border border-[#e9c349]/10 p-6 rounded-2xl space-y-6 shadow-xl">
        {/* Header do Form */}
        <div className="flex items-center space-x-2 border-b border-[#e9c349]/10 pb-3">
          <BadgePercent className="w-5 h-5 text-[#e9c349]" />
          <h3 className="font-bold text-white text-sm uppercase tracking-wider">
            Nova Campanha de Fidelidade
          </h3>
        </div>

        {/* Nome da Campanha */}
        <div className="space-y-2">
          <Label htmlFor="campsNome" className="text-xs font-semibold text-[#c4c7c7]">
            Nome da Campanha *
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">
              <Tag className="w-4 h-4 text-[#e9c349]" />
            </span>
            <Input
              id="campsNome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: CUPOM DE PRIMAVERA"
              className="pl-9 bg-[#0C0F0F] border-[#444748]/30 text-white placeholder-gray-600 focus:border-[#e9c349] transition"
            />
          </div>
        </div>

        {/* Descrição */}
        <div className="space-y-2">
          <Label htmlFor="campsDesc" className="text-xs font-semibold text-[#c4c7c7]">
            Descrição (Opcional)
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">
              <FileText className="w-4 h-4 text-gray-500" />
            </span>
            <Input
              id="campsDesc"
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Válido apenas para trajetos noturnos"
              className="pl-9 bg-[#0C0F0F] border-[#444748]/30 text-white placeholder-gray-600 focus:border-[#e9c349] transition"
            />
          </div>
        </div>

        {/* Tipo de Desconto e Valor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-[#c4c7c7]">Tipo de Desconto</Label>
            <select
              value={tipoDesconto}
              onChange={(e) => setTipoDesconto(e.target.value as any)}
              className="w-full h-10 px-3 py-2 text-sm rounded-md bg-[#0C0F0F] border border-[#444748]/30 text-white focus:border-[#e9c349] focus:outline-none transition"
            >
              <option value="percentual">Percentual (%)</option>
              <option value="valor">Valor Fixo (R$)</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="campsValue" className="text-xs font-semibold text-[#c4c7c7]">
              Valor do Desconto *
            </Label>
            <div className="flex gap-2">
              {tipoDesconto === "percentual" && !valorCustom && (
                <select
                  value={percentSelect}
                  onChange={(e) => setPercentSelect(e.target.value)}
                  className="w-24 h-10 px-3 py-2 text-sm rounded-md bg-[#0C0F0F] border border-[#444748]/30 text-white focus:border-[#e9c349] focus:outline-none transition"
                >
                  {[5, 10, 15, 20, 25, 30, 40, 50].map((v) => (
                    <option key={v} value={v}>
                      {v}%
                    </option>
                  ))}
                </select>
              )}
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5 text-xs text-gray-500 font-mono">
                  {tipoDesconto === "percentual" ? "%" : "R$"}
                </span>
                <Input
                  id="campsValue"
                  type="number"
                  placeholder={tipoDesconto === "percentual" ? "Fração customizada" : "Ex: 20"}
                  value={valorCustom}
                  onChange={(e) => setValorCustom(e.target.value)}
                  className="pl-8 bg-[#0C0F0F] border-[#444748]/30 text-white placeholder-gray-600 focus:border-[#e9c349] transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Limite de Cupons e Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="campsLimit" className="text-xs font-semibold text-[#c4c7c7]">
              Limite de Cupons *
            </Label>
            <Input
              id="campsLimit"
              type="number"
              value={limiteCupons}
              onChange={(e) => setLimiteCupons(Number(e.target.value))}
              placeholder="Ex: 100"
              className="bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-[#c4c7c7]">Status Inicial</Label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full h-10 px-3 py-2 text-sm rounded-md bg-[#0C0F0F] border border-[#444748]/30 text-white focus:border-[#e9c349] focus:outline-none transition"
            >
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </div>

        {/* Vigência */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="campsStart" className="text-xs font-semibold text-[#c4c7c7]">
              Data de Início *
            </Label>
            <Input
              id="campsStart"
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="campsEnd" className="text-xs font-semibold text-[#c4c7c7]">
              Data de Término *
            </Label>
            <Input
              id="campsEnd"
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
            />
          </div>
        </div>

        {/* Botão Submeter */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#e9c349] hover:bg-[#e9c349]/90 disabled:bg-white/5 disabled:text-gray-500 text-black font-extrabold py-5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center transition hover:scale-[1.01] active:scale-[0.99]"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          {isLoading ? "Criando..." : "Criar Campanha"}
        </Button>
      </div>
    </form>
  );
};

export default CouponForm;
