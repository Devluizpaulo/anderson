"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Send,
  ShieldCheck
} from "lucide-react";
import { INITIAL_WHATSAPP_FORM, WHATSAPP_NUMBER } from "./mockData";

export const WhatsappSimulator: React.FC = React.memo(() => {
  const [whatsappForm, setWhatsappForm] = useState(INITIAL_WHATSAPP_FORM);

  const getWhatsappMessage = () => {
    return `*MARUMOTO MOBILIDADE EXECUTIVA* 🌟\n` +
      `----------------------------------------\n` +
      `👤 *Cliente:* ${whatsappForm.nome}\n` +
      `📍 *Partida:* ${whatsappForm.origem}\n` +
      `🏁 *Destino:* ${whatsappForm.destino}\n` +
      `📅 *Data:* ${whatsappForm.data.split("-").reverse().join("/")}\n` +
      `🕒 *Horário:* ${whatsappForm.hora}\n` +
      `🚗 *Veículo:* ${whatsappForm.veiculo}\n` +
      `----------------------------------------\n` +
      `📝 *Observações:* _${whatsappForm.observacoes}_\n\n` +
      `_Enviado pelo formulário de orçamentos da Landing Page._`;
  };

  const handleOpenWhatsapp = () => {
    const encodedText = encodeURIComponent(getWhatsappMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, "_blank");
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-stretch">
      
      {/* Form Input parameters */}
      <div className="lg:col-span-5 glass-card p-6 rounded-3xl border border-secondary/10 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-secondary/10 text-secondary border border-secondary/20">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display text-white">Parâmetros de Orçamento</h3>
              <p className="text-xs text-secondary font-semibold uppercase tracking-wider">WhatsApp Template Builder</p>
            </div>
          </div>
          <p className="text-xs text-[#c4c7c7] leading-relaxed">
            Edite as informações abaixo para alterar o formato e a composição do orçamento executivo. O texto de saída é estruturado com formatações de negrito, listas e divisores personalizados.
          </p>

          <div className="space-y-3.5 pt-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#c4c7c7]">Nome do Cliente</label>
              <input
                type="text"
                value={whatsappForm.nome}
                onChange={(e) => setWhatsappForm({ ...whatsappForm, nome: e.target.value })}
                className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-secondary/50 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#c4c7c7]">Data da Corrida</label>
                <input
                  type="date"
                  value={whatsappForm.data}
                  onChange={(e) => setWhatsappForm({ ...whatsappForm, data: e.target.value })}
                  className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-secondary/50 transition"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#c4c7c7]">Horário</label>
                <input
                  type="time"
                  value={whatsappForm.hora}
                  onChange={(e) => setWhatsappForm({ ...whatsappForm, hora: e.target.value })}
                  className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-secondary/50 transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#c4c7c7]">Origem (Partida)</label>
              <input
                type="text"
                value={whatsappForm.origem}
                onChange={(e) => setWhatsappForm({ ...whatsappForm, origem: e.target.value })}
                className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-secondary/50 transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#c4c7c7]">Destino (Chegada)</label>
              <input
                type="text"
                value={whatsappForm.destino}
                onChange={(e) => setWhatsappForm({ ...whatsappForm, destino: e.target.value })}
                className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-secondary/50 transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#c4c7c7]">Veículo Selecionado</label>
              <select
                value={whatsappForm.veiculo}
                onChange={(e) => setWhatsappForm({ ...whatsappForm, veiculo: e.target.value })}
                className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-secondary/50 transition"
              >
                <option value="Toyota Corolla Cross Premium">Toyota Corolla Cross Premium (Black Edition)</option>
                <option value="Sedan Black Executivo">Sedan Black Executivo Premium</option>
                <option value="SUV Especial Executivo VIP">SUV Especial Executivo VIP</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#c4c7c7]">Observações Receptivo</label>
              <textarea
                value={whatsappForm.observacoes}
                onChange={(e) => setWhatsappForm({ ...whatsappForm, observacoes: e.target.value })}
                rows={2}
                className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-secondary/50 transition resize-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#444748]/20">
          <button
            onClick={handleOpenWhatsapp}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
          >
            <Send className="w-4 h-4 text-black fill-current" />
            Enviar WhatsApp Real
          </button>
        </div>
      </div>

      {/* Chat view bubble simulation */}
      <div className="lg:col-span-7 glass-card p-6 rounded-3xl border border-secondary/15 flex flex-col justify-between bg-[#070909]">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#444748]/15 pb-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Visualização de Mensagem WhatsApp</h4>
              <p className="text-[10px] text-gray-400">Simulador estético do celular do cliente</p>
            </div>
            <span className="flex items-center text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              Pronto para Envio
            </span>
          </div>

          {/* Simulated Mobile Chat Window */}
          <div className="bg-[#0b141a] rounded-2xl p-5 border border-white/5 min-h-[300px] flex flex-col justify-end relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]" />
            
            {/* Chat Bubble container */}
            <div className="max-w-[85%] bg-[#056162] text-[#e1f3f5] p-4 rounded-2xl rounded-tr-none shadow-md space-y-1 relative self-end border border-emerald-600/30">
              <div className="absolute top-0 right-[-6px] w-0 h-0 border-t-[8px] border-t-[#056162] border-r-[8px] border-r-transparent" />
              
              <div className="text-xs font-mono space-y-2 whitespace-pre-wrap">
                {/* Simulated custom rich text bold highlights */}
                <p className="text-secondary font-bold text-sm tracking-wide">MARUMOTO MOBILIDADE EXECUTIVA 🌟</p>
                <p className="text-emerald-300 text-[10px]">----------------------------------------</p>
                <p>👤 <strong>Cliente:</strong> {whatsappForm.nome}</p>
                <p>📍 <strong>Partida:</strong> {whatsappForm.origem}</p>
                <p>🏁 <strong>Destino:</strong> {whatsappForm.destino}</p>
                <p>📅 <strong>Data:</strong> {whatsappForm.data.split("-").reverse().join("/")}</p>
                <p>🕒 <strong>Horário:</strong> {whatsappForm.hora}</p>
                <p>🚗 <strong>Veículo:</strong> {whatsappForm.veiculo}</p>
                <p className="text-emerald-300 text-[10px]">----------------------------------------</p>
                <p className="italic text-emerald-100/90">📝 <strong>Observações:</strong> {whatsappForm.observacoes}</p>
              </div>

              <div className="text-right text-[9px] text-[#a4d4d6] pt-1">
                18:35 ✓✓
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-[10px] text-gray-400 space-y-2 mt-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-secondary flex-shrink-0" />
            <span><strong>Formatação Inteligente de Caracteres:</strong> Caracteres especiais como asteriscos `*` e sublinhados `_` são renderizados como negrito e itálico nativos no aplicativo do WhatsApp.</span>
          </div>
        </div>
      </div>

    </div>
  );
});

WhatsappSimulator.displayName = "WhatsappSimulator";
