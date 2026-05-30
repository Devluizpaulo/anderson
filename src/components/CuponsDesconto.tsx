import React from "react";
import { useCoupons } from "../hooks/useCoupons";
import { CouponStats } from "./coupon/CouponStats";
import { CouponForm } from "./coupon/CouponForm";
import { CouponList } from "./coupon/CouponList";
import { Toaster } from "@/components/ui/toaster";
import { Tag, Sparkles } from "lucide-react";

const CuponsDesconto: React.FC = () => {
  const {
    campanhas,
    loading,
    error,
    criarCampanha,
    gerarCupons,
    arquivarCampanha,
    shareCoupon,
  } = useCoupons();

  return (
    <div className="space-y-8 font-sans">
      {/* Cabeçalho da Aba */}
      <div className="flex items-center justify-between border-b border-white/5 pb-5">
        <div>
          <h2 className="text-xl font-bold font-display text-white flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-[#e9c349]" />
            Campanhas de Desconto & CRM
          </h2>
          <p className="text-xs text-[#c4c7c7] mt-1">
            Gerencie campanhas de benefícios de forma estratégica, acompanhe as taxas de conversão e envie cupons via WhatsApp.
          </p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#e9c349]">
          <Tag className="w-5 h-5" />
        </div>
      </div>

      {/* KPI Stats Banner no Topo */}
      <CouponStats campanhas={campanhas} />

      {/* Grid Principal Dual-Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coluna Esquerda: Nova Campanha Form */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-left mb-1">
            <h4 className="text-xs font-semibold text-[#c4c7c7] uppercase tracking-wider">
              Painel de Configuração
            </h4>
            <p className="text-[10px] text-gray-500 mt-0.5">
              Crie novas ofertas para distribuição ou metas corporativas.
            </p>
          </div>

          <CouponForm onSubmit={criarCampanha} isLoading={loading} />
        </div>

        {/* Coluna Direita: Campanhas Ativas Grade */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-left mb-1">
            <h4 className="text-xs font-semibold text-[#c4c7c7] uppercase tracking-wider">
              Campanhas de Fidelidade Criadas
            </h4>
            <p className="text-[10px] text-gray-500 mt-0.5">
              Gerencie estoque, ative emissões ou compartilhe promoções.
            </p>
          </div>

          {error ? (
            <div className="text-center py-12 text-rose-400 text-sm">{error}</div>
          ) : (
            <CouponList
              campanhas={campanhas}
              onGenerateCupons={gerarCupons}
              onArchive={arquivarCampanha}
              onShare={shareCoupon}
              isLoading={loading}
            />
          )}
        </div>
      </div>

      {/* Notificações Toaster */}
      <Toaster />
    </div>
  );
};

export default CuponsDesconto;