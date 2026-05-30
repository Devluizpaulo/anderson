"use client";

import React from "react";
import {
  Code,
  Layers,
  Sparkles
} from "lucide-react";

export const DesignSystem: React.FC = React.memo(() => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      
      {/* Card 1: Colors Palette */}
      <div className="glass-card p-6 rounded-3xl border border-secondary/10 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-secondary inline-block" />
          <h4 className="text-sm font-bold font-display text-white tracking-wide uppercase">Cores do Tema Stitch</h4>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          A paleta de cores foi extraída e configurada no Tailwind para refletir o design executivo de luxo, combinando tons metálicos escuros e acentos dourados elegantes.
        </p>

        <div className="space-y-2 pt-2 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0C0F0F] border border-white/5">
            <span className="font-semibold text-gray-300">Surface (Fundo)</span>
            <span className="font-mono text-secondary font-bold">#0C0F0F</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#1A1C1C] border border-white/5">
            <span className="font-semibold text-gray-300">Container (Cards)</span>
            <span className="font-mono text-secondary font-bold">#1A1C1C</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-secondary text-black">
            <span className="font-bold">Secondary (Dourado)</span>
            <span className="font-mono font-black">#E9C349</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#ffe088] text-black">
            <span className="font-bold">Secondary Fixed</span>
            <span className="font-mono font-black">#FFE088</span>
          </div>
        </div>
      </div>

      {/* Card 2: Typography Tokens */}
      <div className="glass-card p-6 rounded-3xl border border-secondary/10 space-y-4">
        <div className="flex items-center gap-2 text-secondary">
          <Code className="w-5 h-5" />
          <h4 className="text-sm font-bold font-display text-white tracking-wide uppercase">Tipografia de Alta Classe</h4>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          Utilizamos fontes nativas via `next/font/google` para obter performance impecável e contraste sofisticado entre títulos clássicos e textos de corpo modernos.
        </p>

        <div className="space-y-3 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-[#0C0F0F] border border-white/5 space-y-1">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Título (Headings)</span>
            <p className="font-display text-lg font-bold text-white leading-tight">Playfair Display</p>
            <p className="text-[9px] text-[#8e9192]">Classe do Tailwind: `font-display`</p>
          </div>
          
          <div className="p-3.5 rounded-xl bg-[#0C0F0F] border border-white/5 space-y-1">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Corpo (Body texts)</span>
            <p className="font-body text-xs font-semibold text-gray-300">Manrope (Modern Sans)</p>
            <p className="text-[9px] text-[#8e9192]">Classe do Tailwind: `font-body`</p>
          </div>
        </div>
      </div>

      {/* Card 3: Visual Elements Showcase */}
      <div className="glass-card p-6 rounded-3xl border border-secondary/10 space-y-4 md:col-span-2 lg:col-span-1">
        <div className="flex items-center gap-2 text-secondary">
          <Layers className="w-5 h-5" />
          <h4 className="text-sm font-bold font-display text-white tracking-wide uppercase">Efeitos & Glassmorfismo</h4>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          Demonstração dos efeitos dinâmicos criados no CSS global para obter o visual translúcido luxuoso com micro-bordas metálicas.
        </p>

        <div className="space-y-3.5 pt-2 text-xs">
          {/* Glass card style preview */}
          <div className="glass-card p-4 rounded-2xl border border-secondary/15 space-y-1.5 bg-transparent">
            <span className="text-[9px] text-secondary font-bold uppercase tracking-wider">Efeito .glass-card</span>
            <p className="text-[11px] text-[#c4c7c7] leading-relaxed">
              Painel semitransparente com desfoque de fundo de `20px` e micro-borda dourada sutil com `0.1` de opacidade.
            </p>
          </div>

          {/* Gradient button hover preview */}
          <button className="w-full bg-secondary hover:bg-secondary-fixed text-black font-extrabold uppercase tracking-wider py-3.5 rounded-xl transition duration-300 flex items-center justify-center gap-2 hover:scale-[1.01]">
            <Sparkles className="w-4 h-4" />
            Micro-Animações no Botão
          </button>
        </div>
      </div>

    </div>
  );
});

DesignSystem.displayName = "DesignSystem";
