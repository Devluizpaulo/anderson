import React from "react";

interface CouponProgressProps {
  current: number;
  total: number;
}

export const CouponProgress: React.FC<CouponProgressProps> = ({ current, total }) => {
  const percentage = total > 0 ? Math.min(Math.round((current / total) * 100), 100) : 0;

  // Cor reativa dinâmica
  let barColorClass = "bg-[#e9c349]"; // Dourado 0-60%
  let textRangeColor = "text-[#e9c349]";

  if (percentage > 60 && percentage <= 90) {
    barColorClass = "bg-amber-500"; // Laranja 60-90%
    textRangeColor = "text-amber-400";
  } else if (percentage > 90) {
    barColorClass = "bg-rose-600"; // Vermelho 90-100%
    textRangeColor = "text-rose-400";
  }

  return (
    <div className="space-y-1.5 font-sans">
      <div className="flex justify-between items-center text-[10px] font-semibold">
        <span className="text-gray-500 uppercase tracking-wider">
          Estoque de Cupons
        </span>
        <span className={`font-mono font-bold ${textRangeColor}`}>
          {current} / {total} ({percentage}%)
        </span>
      </div>

      {/* Container da Barra */}
      <div className="w-full h-2.5 rounded-full bg-white/5 border border-white/5 overflow-hidden relative">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${barColorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default CouponProgress;
