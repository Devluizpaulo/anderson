"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  ArrowRight,
  Play,
  CheckCircle,
  MapPin
} from "lucide-react";
import { SyncTimeline } from "./SyncTimeline";
import { TerminalConsole } from "./TerminalConsole";
import { ConsoleLog, INITIAL_SYNC_LOGS, INITIAL_WHATSAPP_FORM } from "./mockData";

export const SyncSimulator: React.FC = React.memo(() => {
  const [syncTimelineStep, setSyncTimelineStep] = useState<number>(0);
  const [isSimulatingSync, setIsSimulatingSync] = useState<boolean>(false);
  const [syncLogs, setSyncLogs] = useState<ConsoleLog[]>(INITIAL_SYNC_LOGS);

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const addLog = (message: string, type: "info" | "success" | "warn" | "api") => {
    if (!mountedRef.current) return;
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    setSyncLogs((prev) => [...prev, { time: timeStr, type, message }]);
  };

  const handleSimulateScenario = async (scenario: "site_to_google" | "google_to_site") => {
    if (isSimulatingSync) return;
    setIsSimulatingSync(true);
    setSyncTimelineStep(1);
    
    if (scenario === "site_to_google") {
      setSyncLogs([]);
      addLog("Cenário A Iniciado: Reserva criada pelo cliente no site.", "info");
      
      await delay(1200);
      if (!mountedRef.current) return;
      setSyncTimelineStep(2);
      addLog(`[Firestore] Salvando dados na coleção 'corridas' para o cliente '${INITIAL_WHATSAPP_FORM.nome}'...`, "info");
      addLog(`[Firestore] Documento gerado com ID 'cor_${Math.random().toString(36).substring(2, 9)}'`, "success");
      
      await delay(1500);
      if (!mountedRef.current) return;
      setSyncTimelineStep(3);
      addLog(`[SyncEngine] Detectada nova corrida. Montando payload de sincronização...`, "api");
      addLog(`[Google Calendar API] POST https://www.googleapis.com/calendar/v3/calendars/primary/events`, "api");
      
      await delay(1500);
      if (!mountedRef.current) return;
      setSyncTimelineStep(4);
      addLog(`[Google Calendar API] Evento criado com sucesso na agenda corporativa! ID: 'gcal_${crypto?.randomUUID ? crypto.randomUUID().substring(0, 8) : Math.random().toString(36).substring(2, 10)}'`, "success");
      addLog(`[Notificação push] Notificação enviada ao smartphone do motorista (Anderson Marumoto).`, "info");
      
      await delay(1000);
      if (!mountedRef.current) return;
      setSyncTimelineStep(5);
      addLog(`Sincronização de ida concluída. Status: 200 OK.`, "success");
    } else {
      setSyncLogs([]);
      addLog("Cenário B Iniciado: Evento criado/alterado diretamente no Google Calendar (externo).", "info");
      
      await delay(1200);
      if (!mountedRef.current) return;
      setSyncTimelineStep(2);
      addLog(`[Webhook] Push notification recebida de googleapis.com/calendar/v3/watch`, "api");
      addLog(`[Webhook] Assinatura validada: 'x-goog-resource-state: sync'`, "success");
      
      await delay(1500);
      if (!mountedRef.current) return;
      setSyncTimelineStep(3);
      addLog(`[SyncEngine] Buscando detalhes do evento externo no Calendar...`, "api");
      addLog(`[SyncEngine] Detalhes obtidos: 'Reunião Diretoria' em '2026-06-18' com destino a 'Berrini'`, "info");
      
      await delay(1500);
      if (!mountedRef.current) return;
      setSyncTimelineStep(4);
      addLog(`[Firestore] Atualizando/Criando registro na coleção 'corridas' local...`, "info");
      addLog(`[Firestore] Documento na coleção 'corridas' atualizado via webhook de entrada!`, "success");
      
      await delay(1000);
      if (!mountedRef.current) return;
      setSyncTimelineStep(5);
      addLog(`[Notificação Dashboard] Pushing real-time state changes via Server-Sent Events (SSE).`, "info");
      addLog(`Dashboard atualizado em tempo real. Sincronização de volta concluída.`, "success");
    }
    
    if (mountedRef.current) {
      setIsSimulatingSync(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-stretch">
      {/* Left explanation and scenarios */}
      <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
        <div className="glass-card p-6 rounded-3xl border border-secondary/10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-secondary/10 text-secondary border border-secondary/20">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display text-white">Sincronização de Agenda</h3>
              <p className="text-xs text-secondary font-semibold uppercase tracking-wider">Simulação Operacional Bidirecional</p>
            </div>
          </div>
          
          <p className="text-xs text-[#c4c7c7] leading-relaxed">
            Esta seção demonstra graficamente como a agenda de corridas do site se conecta de forma dinâmica com o <strong>Google Calendar</strong>. Clique nos cenários operacionais abaixo para assistir à comunicação em tempo real de ida (do Site para o Calendar) e volta (do Calendar para o Dashboard).
          </p>

          <div className="space-y-3 pt-3">
            <button
              onClick={() => handleSimulateScenario("site_to_google")}
              disabled={isSimulatingSync}
              className="w-full flex items-center justify-between p-4 rounded-2xl border border-secondary/10 bg-[#0C0F0F] hover:border-secondary/35 text-left transition duration-300 group"
            >
              <div className="space-y-1 pr-2">
                <span className="text-[10px] text-secondary font-bold uppercase tracking-wider flex items-center gap-1">
                  Cenário A
                  <ArrowRight className="w-3 h-3 text-secondary animate-pulse" />
                </span>
                <h4 className="text-xs font-bold text-white group-hover:text-secondary-fixed transition">Nova Corrida pelo Site</h4>
                <p className="text-[10px] text-gray-400">Cliente agenda no site &rarr; Atualiza Firestore &rarr; Sincroniza Google Calendar.</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-secondary/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-black transition">
                <Play className="w-3.5 h-3.5 fill-current" />
              </div>
            </button>

            <button
              onClick={() => handleSimulateScenario("google_to_site")}
              disabled={isSimulatingSync}
              className="w-full flex items-center justify-between p-4 rounded-2xl border border-secondary/10 bg-[#0C0F0F] hover:border-secondary/35 text-left transition duration-300 group"
            >
              <div className="space-y-1 pr-2">
                <span className="text-[10px] text-secondary font-bold uppercase tracking-wider flex items-center gap-1">
                  Cenário B
                  <ArrowRight className="w-3 h-3 text-secondary animate-pulse" />
                </span>
                <h4 className="text-xs font-bold text-white group-hover:text-secondary-fixed transition">Modificação Externa no Google Calendar</h4>
                <p className="text-[10px] text-gray-400">Inserido no Google Calendar &rarr; Dispara Webhook &rarr; Atualiza Dashboard instantaneamente.</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-secondary/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-black transition">
                <Play className="w-3.5 h-3.5 fill-current" />
              </div>
            </button>
          </div>
        </div>

        {/* Timeline Status component */}
        <SyncTimeline currentStep={syncTimelineStep} />
      </div>

      {/* Right live terminal console and active sync screen simulator */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {/* Terminal Log Console */}
        <TerminalConsole logs={syncLogs} />

        {/* Simulated Google Calendar widget */}
        <div className="glass-card p-6 rounded-3xl border border-secondary/10 bg-transparent flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Visualização de Agendamentos (Simulado)</h4>
            <span className="text-[10px] text-secondary font-bold bg-secondary/10 border border-secondary/15 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Google Calendar Feed
            </span>
          </div>

          <div className="grid gap-3">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-xs font-bold text-white">{INITIAL_WHATSAPP_FORM.nome}</p>
                <p className="text-[10px] text-gray-400 flex items-center">
                  <MapPin className="w-3 h-3 mr-1 text-secondary" />
                  {INITIAL_WHATSAPP_FORM.origem.length > 30 ? INITIAL_WHATSAPP_FORM.origem.substring(0, 30) + "..." : INITIAL_WHATSAPP_FORM.origem}
                </p>
              </div>
              <div className="text-right space-y-1">
                <span className="text-[10px] font-bold text-secondary bg-secondary/5 border border-secondary/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {INITIAL_WHATSAPP_FORM.hora}
                </span>
                <p className="text-[9px] text-[#8e9192]">{INITIAL_WHATSAPP_FORM.data.split("-").reverse().join("/")}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center opacity-65">
              <div className="space-y-1">
                <p className="text-xs font-bold text-white">Mariana de Alencar Silveira</p>
                <p className="text-[10px] text-gray-400 flex items-center">
                  <MapPin className="w-3 h-3 mr-1 text-secondary" />
                  Aeroporto de Congonhas (CGH)
                </p>
              </div>
              <div className="text-right space-y-1">
                <span className="text-[10px] font-bold text-white bg-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  10:00
                </span>
                <p className="text-[9px] text-[#8e9192]">16/06/2026</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
});

SyncSimulator.displayName = "SyncSimulator";
