import React, { useState } from "react";
import { Campanha } from "./types";
import { CouponProgress } from "./CouponProgress";
import { Button } from "@/components/ui/button";
import { Calendar, Trash2, ShieldAlert, Sparkles, Send, PlusCircle, Check } from "lucide-react";

interface CouponCardProps {
  campanha: Campanha;
  onGenerateCupons: (campanhaId: string) => Promise<void>;
  onArchive: (campanhaId: string) => Promise<void>;
  onShare: (campanha: Campanha) => void;
  isLoading: boolean;
}

export const CouponCard: React.FC<CouponCardProps> = ({
  campanha,
  onGenerateCupons,
  onArchive,
  onShare,
  isLoading,
}) => {
  const [copied, setCopied] = useState(false);

  // Derivação estrita do Status em Tempo Real
  const getStatus = (): { label: string; colorClass: string } => {
    if (campanha.arquivada) return { label: "ARQUIVADA", colorClass: "bg-gray-800 text-gray-400 border-gray-700" };
    if (!campanha.ativa) return { label: "INATIVA", colorClass: "bg-red-950/40 text-red-400 border-red-900/30" };

    const now = new Date();
    const start = campanha.dataInicio.toDate();
    const end = campanha.dataFim.toDate();

    if (now < start) {
      return { label: "AGENDADO", colorClass: "bg-blue-950/40 text-blue-400 border-blue-900/30" };
    }
    if (now > end) {
      return { label: "EXPIRADO", colorClass: "bg-gray-950/50 text-gray-500 border-white/5" };
    }
    if (campanha.cuponsGerados >= campanha.limiteCupons) {
      return { label: "ESGOTADO", colorClass: "bg-rose-950/40 text-rose-400 border-rose-900/30" };
    }

    return { label: "ATIVO", colorClass: "bg-emerald-950/40 text-emerald-400 border-emerald-900/30" };
  };

  const status = getStatus();
  const startStr = campanha.dataInicio.toDate().toLocaleDateString("pt-BR");
  const endStr = campanha.dataFim.toDate().toLocaleDateString("pt-BR");

  // Formatar o valor de desconto reativamente
  const discountLabel =
    campanha.tipoDesconto === "percentual"
      ? `${campanha.valorDesconto}% OFF`
      : new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          maximumFractionDigits: 0,
        }).format(campanha.valorDesconto) + " OFF";

  const handleShareClick = () => {
    onShare(campanha);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isEsgotado = campanha.cuponsGerados >= campanha.limiteCupons;
  const isExpired = new Date() > campanha.dataFim.toDate();
  const canGenerate = campanha.ativa && !campanha.arquivada && !isEsgotado && !isExpired;

  return (
    <div className="group bg-black/30 border border-white/5 hover:border-[#e9c349]/20 p-5 rounded-2xl transition-all duration-300 hover:bg-[#e9c349]/[0.01] relative overflow-hidden flex flex-col justify-between min-h-[260px] shadow-lg">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#e9c349]/[0.01] rounded-full blur-2xl pointer-events-none group-hover:bg-[#e9c349]/[0.03] transition" />

      {/* Header do Card */}
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-2">
          {/* Nome e Descrição */}
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-white tracking-wide truncate">
              {campanha.nome}
            </h4>
            {campanha.descricao && (
              <p className="text-[10px] text-[#c4c7c7] truncate mt-0.5">
                {campanha.descricao}
              </p>
            )}
          </div>

          {/* Desconto Label em Degradê Dourado */}
          <span className="text-xs font-black bg-gradient-to-r from-[#e9c349] to-[#ffe088] text-black px-2.5 py-1 rounded-lg shadow-md flex-shrink-0 select-none">
            {discountLabel}
          </span>
        </div>

        {/* Status e Vigência */}
        <div className="flex flex-wrap gap-2 items-center text-[10px]">
          <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${status.colorClass}`}>
            {status.label}
          </span>
          <span className="text-gray-500 flex items-center">
            <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
            {startStr} até {endStr}
          </span>
        </div>
      </div>

      {/* Barra de Progresso Inteligente */}
      <div className="my-4">
        <CouponProgress current={campanha.cuponsGerados} total={campanha.limiteCupons} />
      </div>

      {/* Ações da Campanha */}
      <div className="flex items-center space-x-2 pt-4 border-t border-white/5 mt-auto">
        {/* Gerar Cupons */}
        <Button
          size="sm"
          onClick={() => onGenerateCupons(campanha.id)}
          disabled={isLoading || !canGenerate}
          className="flex-1 bg-[#e9c349] hover:bg-[#e9c349]/90 disabled:bg-white/5 disabled:text-gray-500 text-black font-extrabold text-[10px] uppercase tracking-wider py-4 rounded-xl flex items-center justify-center transition"
        >
          <PlusCircle className="w-3.5 h-3.5 mr-1" />
          Gerar Cupons
        </Button>

        {/* Compartilhar */}
        <Button
          size="sm"
          variant="outline"
          onClick={handleShareClick}
          disabled={campanha.cuponsGerados === 0}
          className={`h-9 w-9 rounded-xl flex items-center justify-center transition border border-white/10 ${
            copied
              ? "bg-green-600 hover:bg-green-600 text-white"
              : "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white"
          }`}
          title="Compartilhar Cupom de Fidelidade"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Send className="w-3.5 h-3.5" />}
        </Button>

        {/* Desativar / Arquivar */}
        {!campanha.arquivada && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onArchive(campanha.id)}
            disabled={isLoading}
            className="h-9 w-9 rounded-xl hover:bg-red-950/20 text-gray-500 hover:text-red-400 transition"
            title="Arquivar Campanha"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CouponCard;
