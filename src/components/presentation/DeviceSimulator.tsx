"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  ChevronRight,
  Star,
  MapPin,
  Shield,
  Send
} from "lucide-react";
import { DEVICE_SCREENS, TELEPHONE_NUMBER, WHATSAPP_NUMBER } from "./mockData";

export const DeviceSimulator: React.FC = React.memo(() => {
  const [deviceScreen, setDeviceScreen] = useState<"card" | "about" | "reviews" | "booking">("card");
  const [previewRating, setPreviewRating] = useState<number>(5);
  const [previewComment, setPreviewComment] = useState("Atendimento fantástico! Carro impecavelmente limpo, motorista extremamente educado, bilíngue e pontual. Melhor transfer executivo de SP.");

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-stretch">
      
      {/* Controls and Selectors */}
      <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
        <div className="glass-card p-6 rounded-3xl border border-secondary/10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-secondary/10 text-secondary border border-secondary/20">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display text-white">Simulador Mobile</h3>
              <p className="text-xs text-secondary font-semibold uppercase tracking-wider">Device Previewer Sandbox</p>
            </div>
          </div>
          <p className="text-xs text-[#c4c7c7] leading-relaxed">
            Selecione qual tela do aplicativo você deseja renderizar e simular no frame do smartphone ao lado. Todos os componentes apresentados foram adaptados para visualização vertical (Mobile-First).
          </p>

          <div className="space-y-2 pt-2">
            {DEVICE_SCREENS.map((scr) => (
              <button
                key={scr.id}
                onClick={() => setDeviceScreen(scr.id as any)}
                className={`w-full text-left p-3.5 rounded-2xl border text-xs transition duration-300 ${
                  deviceScreen === scr.id
                    ? "bg-secondary/10 border-secondary/35 text-secondary font-bold"
                    : "bg-[#0C0F0F] border-white/5 text-[#c4c7c7] hover:border-secondary/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{scr.label}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
                <p className="text-[10px] text-gray-500 font-normal mt-0.5">{scr.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Simulated review dynamic feedback creator */}
        {deviceScreen === "reviews" && (
          <div className="glass-card p-6 rounded-3xl border border-secondary/10 space-y-4 animate-in slide-in-from-bottom duration-300">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Simular Nova Avaliação no Feed</h4>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400">Classificação</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((st) => (
                    <button
                      key={st}
                      onClick={() => setPreviewRating(st)}
                      className="text-secondary hover:scale-110 transition"
                    >
                      <Star className={`w-5 h-5 ${previewRating >= st ? "fill-current" : ""}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400">Comentário</label>
                <textarea
                  value={previewComment}
                  onChange={(e) => setPreviewComment(e.target.value)}
                  rows={2}
                  className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl p-2.5 text-white text-[11px] focus:outline-none focus:border-secondary/50 transition resize-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* iPhone Frame Simulator */}
      <div className="lg:col-span-7 flex justify-center items-center py-6">
        
        {/* Phone mockup border */}
        <div className="w-[320px] h-[600px] rounded-[48px] border-[12px] border-[#222424] bg-[#0A0A0A] shadow-2xl relative overflow-hidden flex flex-col shadow-secondary/5">
          {/* Top Notch speaker and camera */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-[#222424] rounded-b-2xl z-50 flex items-center justify-center">
            <span className="w-12 h-1 bg-black/40 rounded-full inline-block" />
          </div>

          {/* Phone Screen Content Wrapper */}
          <div className="flex-1 overflow-y-auto pt-8 px-4 pb-6 scrollbar-thin text-white text-xs relative flex flex-col">
            
            {/* SCREEN 1: Digital VIP Card (/CVisita) */}
            {deviceScreen === "card" && (
              <div className="space-y-6 pt-2 animate-fade-in flex flex-col justify-between flex-1">
                <div className="space-y-5">
                  {/* VIP Header card */}
                  <div className="glass-card p-4 rounded-3xl border border-secondary/25 text-center bg-gradient-to-br from-[#121414] to-[#0A0A0A] shadow-md relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-secondary via-secondary-fixed to-secondary" />
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary shadow-lg mx-auto mb-2.5">
                      {/* Avatar placeholder style */}
                      <div className="w-full h-full bg-[#1A1C1C] flex items-center justify-center text-secondary font-bold text-lg">
                        AM
                      </div>
                    </div>
                    <h5 className="font-display font-bold text-sm text-white">Anderson Marumoto</h5>
                    <p className="text-[9px] text-secondary uppercase font-bold tracking-widest mt-0.5">Chauffeur Privado VIP</p>
                  </div>

                  {/* Quick shortcuts list */}
                  <div className="space-y-2">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-secondary hover:bg-secondary-fixed text-black font-extrabold py-3 px-4 rounded-2xl flex items-center justify-between transition shadow-md"
                    >
                      <span className="uppercase text-[9px] tracking-wider">Agendar pelo WhatsApp</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={`tel:${TELEPHONE_NUMBER}`}
                      className="w-full glass-card hover:bg-white/5 text-[#e2e2e2] font-semibold py-3 px-4 rounded-2xl flex items-center justify-between transition border border-white/10"
                    >
                      <span className="uppercase text-[9px] tracking-wider">Fazer Ligação Direta</span>
                      <ChevronRight className="w-3.5 h-3.5 text-secondary" />
                    </a>

                    <Link
                      href="/sobre"
                      className="w-full glass-card hover:bg-white/5 text-[#e2e2e2] font-semibold py-3 px-4 rounded-2xl flex items-center justify-between transition border border-white/10"
                    >
                      <span className="uppercase text-[9px] tracking-wider">Conhecer o Motorista</span>
                      <ChevronRight className="w-3.5 h-3.5 text-secondary" />
                    </Link>
                  </div>
                </div>

                {/* Interactive mini form */}
                <div className="glass-card p-4 rounded-3xl border border-secondary/15 mt-auto bg-[#0C0F0F]">
                  <span className="text-[8px] text-secondary font-bold uppercase tracking-wider block mb-1">Avaliação do Cliente</span>
                  <h6 className="text-[10px] font-bold text-white mb-2">Envie seu Feedback de Viagem</h6>
                  <div className="flex gap-1.5 mb-2.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-secondary fill-current" />
                    ))}
                  </div>
                  <button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/15 py-1.5 rounded-lg text-[9px] font-semibold uppercase tracking-wider transition">
                    Enviar Avaliação
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 2: About Driver (/sobre) */}
            {deviceScreen === "about" && (
              <div className="space-y-4 pt-2 animate-fade-in">
                {/* Profile Cover Image simulation */}
                <div className="h-28 w-full rounded-2xl overflow-hidden relative border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F0F] to-[#1e2020]/30 z-10" />
                  <div className="absolute bottom-2 left-3 z-20 space-y-0.5">
                    <span className="text-[8px] text-secondary uppercase font-bold tracking-widest">Motorista Particular</span>
                    <h5 className="font-display font-bold text-sm text-white">Anderson Marumoto</h5>
                  </div>
                </div>

                {/* Professional bio brief */}
                <div className="glass-card p-4 rounded-2xl border border-secondary/10 space-y-2">
                  <h6 className="text-[10px] font-bold text-secondary uppercase tracking-wider">Perfil Profissional</h6>
                  <p className="text-[10px] text-gray-300 leading-relaxed text-justify">
                    Anderson Marumoto é motorista bilíngue altamente especializado em transporte executivo particular e transfer corporativo em São Paulo, atuando com frota blindada premium.
                  </p>
                </div>

                {/* Fleet and credentials */}
                <div className="glass-card p-4 rounded-2xl border border-secondary/10 space-y-2.5">
                  <h6 className="text-[10px] font-bold text-secondary uppercase tracking-wider">Veículos & Serviços</h6>
                  
                  <div className="space-y-2 text-[10px]">
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="material-symbols-outlined text-secondary text-xs">shield</span>
                      <span>Toyota Corolla Cross Blindado</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="material-symbols-outlined text-secondary text-xs">check_circle</span>
                      <span>Direção defensiva de alto nível</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="material-symbols-outlined text-secondary text-xs">language</span>
                      <span>Atendimento Executivo Bilíngue</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 3: Reviews Dynamic list */}
            {deviceScreen === "reviews" && (
              <div className="space-y-4 pt-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h5 className="font-display font-bold text-sm text-white">Depoimentos</h5>
                  <span className="text-[8px] text-secondary font-bold bg-secondary/10 px-2 py-0.5 rounded border border-secondary/15 uppercase tracking-wider">
                    Site Oficial
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Live previewing created reviews card */}
                  <div className="p-4 rounded-2xl glass-card border border-secondary/25 bg-gradient-to-br from-[#121414] to-[#0A0A0A] space-y-2 shadow-md animate-in zoom-in-95 duration-355">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[10px] text-white">Mariana de Alencar</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((st) => (
                          <Star key={st} className={`w-2.5 h-2.5 text-secondary ${previewRating >= st ? "fill-current" : ""}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] text-[#c4c7c7] italic leading-relaxed">
                      &ldquo;{previewComment}&rdquo;
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl glass-card border border-white/5 space-y-2 opacity-50">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[10px] text-white">Bruno M. Mendes</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((st) => (
                          <Star key={st} className="w-2.5 h-2.5 text-secondary fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] text-[#c4c7c7] italic leading-relaxed">
                      &ldquo;Excelente serviço de receptivo em Guarulhos. Discrição total e carro blindado muito confortável.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 4: Interactive Booking Form */}
            {deviceScreen === "booking" && (
              <div className="space-y-4 pt-2 animate-fade-in">
                <div className="text-center space-y-1">
                  <span className="text-[8px] text-secondary font-bold uppercase tracking-widest">Orçamento Rápido</span>
                  <h5 className="font-display font-bold text-sm text-white">Reserve Seu Transfer</h5>
                </div>

                <div className="glass-card p-4 rounded-2xl border border-secondary/15 space-y-3 bg-[#0A0A0A]">
                  <div className="space-y-1">
                    <label className="text-[8px] font-bold uppercase text-gray-400 tracking-wider">Origem</label>
                    <input
                      type="text"
                      value="Aeroporto de Guarulhos"
                      readOnly
                      className="w-full bg-[#0C0F0F] border border-white/10 rounded-lg p-2 text-[9px] text-[#c4c7c7] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8px] font-bold uppercase text-gray-400 tracking-wider">Destino</label>
                    <input
                      type="text"
                      value="Hotel Unique Jardins"
                      readOnly
                      className="w-full bg-[#0C0F0F] border border-white/10 rounded-lg p-2 text-[9px] text-[#c4c7c7] focus:outline-none"
                    />
                  </div>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-secondary hover:bg-secondary-fixed text-black font-bold uppercase tracking-wider text-[9px] py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-secondary/10"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Solicitar por WhatsApp
                  </a>
                </div>
              </div>
            )}

          </div>

          {/* Home Indicator bar */}
          <div className="h-1 bg-white/30 rounded-full w-28 mx-auto mb-2" />
        </div>
      </div>

    </div>
  );
});

DeviceSimulator.displayName = "DeviceSimulator";
