"use client";

import React, { useRef, useEffect } from "react";
import { Terminal } from "lucide-react";
import { ConsoleLog } from "./mockData";

interface TerminalConsoleProps {
  logs: ConsoleLog[];
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = React.memo(({ logs }) => {
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  return (
    <div className="glass-card rounded-3xl border border-secondary/15 flex flex-col overflow-hidden bg-[#070909] shadow-2xl h-[340px]">
      {/* Top Bar */}
      <div className="bg-[#0e1111] px-5 py-3 border-b border-[#444748]/20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-secondary" />
          <span className="font-mono text-xs font-bold text-gray-300 tracking-wider">Console Integrado de Sincronização</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
        </div>
      </div>

      {/* Terminal Logs Content */}
      <div className="flex-1 p-5 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-2">
        {logs.length > 0 ? (
          logs.map((log, idx) => {
            let colorClass = "text-[#e2e2e2]";
            if (log.type === "success") colorClass = "text-emerald-400";
            if (log.type === "warn") colorClass = "text-yellow-400";
            if (log.type === "api") colorClass = "text-secondary";
            return (
              <div key={idx} className="flex items-start">
                <span className="text-[#8e9192] select-none mr-2.5">[{log.time}]</span>
                <span className="text-cyan-500 select-none mr-1.5">&gt;</span>
                <span className={colorClass}>{log.message}</span>
              </div>
            );
          })
        ) : (
          <div className="text-gray-550 italic py-16 text-center">
            Nenhum cenário ativo. Clique em &apos;Cenário A&apos; ou &apos;Cenário B&apos; para iniciar a simulação operacional.
          </div>
        )}
        <div ref={consoleEndRef} />
      </div>

      {/* Bottom Stats */}
      <div className="bg-[#0e1111] px-5 py-2.5 border-t border-[#444748]/20 flex justify-between items-center text-[10px] text-gray-400 font-mono">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
          API Status: Conectado
        </div>
        <div>
          Sincronizados Hoje: 14 corridas
        </div>
      </div>
    </div>
  );
});

TerminalConsole.displayName = "TerminalConsole";
