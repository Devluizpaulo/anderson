import React from "react";
import { Campanha } from "./types";
import { Tag, TrendingUp, CheckCircle, BarChart } from "lucide-react";

interface CouponStatsProps {
  campanhas: Campanha[];
}

export const CouponStats: React.FC<CouponStatsProps> = ({ campanhas }) => {
  // Campanhas Ativas (não arquivadas e ativas no banco)
  const activeCampanhasCount = campanhas.filter((c) => c.ativa && !c.arquivada).length;

  // Cupons Emitidos
  const totalEmitidos = campanhas.reduce((acc, curr) => acc + curr.cuponsGerados, 0);

  // Cupons Utilizados
  const totalUtilizados = campanhas.reduce((acc, curr) => acc + curr.cuponsUtilizados, 0);

  // Taxa de Conversão
  const conversaoTaxa = totalEmitidos > 0 ? Math.round((totalUtilizados / totalEmitidos) * 100) : 0;

  return (
    <div className="flex flex-wrap items-center gap-y-3 gap-x-6 py-4 px-5 bg-black/40 border border-[#e9c349]/10 rounded-2xl text-xs font-mono text-[#c4c7c7] no-print w-full shadow-inner backdrop-blur-sm">
      {/* Campanhas Ativas */}
      <div className="flex items-center space-x-2">
        <Tag className="w-3.5 h-3.5 text-[#e9c349]" />
        <span>
          Campanhas Ativas: <strong className="text-white font-sans text-sm font-extrabold">{activeCampanhasCount}</strong>
        </span>
      </div>

      <div className="hidden sm:block h-4 w-px bg-white/10" />

      {/* Cupons Emitidos */}
      <div className="flex items-center space-x-2">
        <BarChart className="w-3.5 h-3.5 text-gray-400" />
        <span>
          Cupons Emitidos: <strong className="text-white font-sans text-sm font-extrabold">{totalEmitidos}</strong>
        </span>
      </div>

      <div className="hidden sm:block h-4 w-px bg-white/10" />

      {/* Cupons Utilizados */}
      <div className="flex items-center space-x-2">
        <CheckCircle className="w-3.5 h-3.5 text-[#e9c349]" />
        <span>
          Utilizados: <strong className="text-white font-sans text-sm font-extrabold">{totalUtilizados}</strong>
        </span>
      </div>

      <div className="hidden sm:block h-4 w-px bg-white/10" />

      {/* Taxa de Conversão */}
      <div className="flex items-center space-x-2">
        <TrendingUp className="w-3.5 h-3.5 text-[#e9c349]" />
        <span>
          Taxa de Conversão: <strong className="text-[#e9c349] font-sans text-sm font-black">{conversaoTaxa}%</strong>
        </span>
      </div>
    </div>
  );
};

export default CouponStats;
