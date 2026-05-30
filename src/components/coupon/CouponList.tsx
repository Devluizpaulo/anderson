import React from "react";
import { Campanha } from "./types";
import { CouponCard } from "./CouponCard";
import { Tag, Sparkles } from "lucide-react";

interface CouponListProps {
  campanhas: Campanha[];
  onGenerateCupons: (campanhaId: string) => Promise<void>;
  onArchive: (campanhaId: string) => Promise<void>;
  onShare: (campanha: Campanha) => void;
  isLoading: boolean;
}

export const CouponList: React.FC<CouponListProps> = ({
  campanhas,
  onGenerateCupons,
  onArchive,
  onShare,
  isLoading,
}) => {
  // Filtrar campanhas arquivadas
  const visibleCampanhas = campanhas.filter((c) => !c.arquivada);

  if (visibleCampanhas.length === 0) {
    return (
      <div className="text-center py-16 bg-black/20 border border-dashed border-white/5 rounded-2xl p-8 text-gray-500 min-h-[300px] flex flex-col justify-center items-center">
        <Tag className="w-12 h-12 text-gray-700 mb-3 animate-pulse" />
        <h5 className="text-sm font-bold text-white uppercase tracking-wider">
          Nenhuma Campanha Ativa
        </h5>
        <p className="text-xs text-[#c4c7c7] mt-1 max-w-xs mx-auto">
          Crie sua primeira campanha corporativa ao lado para começar a emitir cupons de benefícios.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 max-h-[560px] overflow-y-auto custom-scrollbar pr-2">
      {visibleCampanhas.map((campanha) => (
        <CouponCard
          key={campanha.id}
          campanha={campanha}
          onGenerateCupons={onGenerateCupons}
          onArchive={onArchive}
          onShare={onShare}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default CouponList;
