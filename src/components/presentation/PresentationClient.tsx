"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  Laptop,
  Calendar,
  MessageSquare,
  Layers,
  Sparkles
} from "lucide-react";

// Import subcomponents directly since they are already memoized
import { SyncSimulator } from "./SyncSimulator";
import { WhatsappSimulator } from "./WhatsappSimulator";
import { DeviceSimulator } from "./DeviceSimulator";
import { DesignSystem } from "./DesignSystem";

export const PresentationClient: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<"sync" | "whatsapp" | "device" | "design">("sync");

  const renderActiveTab = () => {
    switch (activeSubTab) {
      case "sync":
        return <SyncSimulator />;
      case "whatsapp":
        return <WhatsappSimulator />;
      case "device":
        return <DeviceSimulator />;
      case "design":
        return <DesignSystem />;
      default:
        return <SyncSimulator />;
    }
  };

  return (
    <div className="space-y-12 w-full">
      {/* Title Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4 animate-fade-in">
        <span className="flex inline-flex items-center text-xs font-bold text-secondary tracking-widest uppercase bg-secondary/10 border border-secondary/20 px-4 py-1.5 rounded-full mx-auto">
          <Sparkles className="w-3.5 h-3.5 mr-2 animate-pulse text-secondary" />
          Central de Apresentação e Demonstração do Front-end
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-display text-white tracking-wide leading-tight">
          Explore a Interface & <span className="text-secondary">Simulações de Integrações</span>
        </h1>
        <p className="text-sm sm:text-base text-[#c4c7c7] leading-relaxed max-w-2xl mx-auto">
          Uma área interativa exclusiva projetada para testar, validar e apresentar todas as funcionalidades estéticas, templates e a lógica do ecossistema front-end do Anderson Transfers.
        </p>
      </section>

      {/* Navigation Tabs Bar */}
      <section className="flex justify-center border-b border-[#444748]/20 pb-1">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/5">
          {[
            { id: "sync", label: "Agenda Bidirecional (Google Calendar)", icon: Calendar },
            { id: "whatsapp", label: "Orçamentos & WhatsApp", icon: MessageSquare },
            { id: "device", label: "Simulador de Telas Mobile", icon: Smartphone },
            { id: "design", label: "Design System & Cores", icon: Layers }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition duration-350 ${
                  isActive
                    ? "bg-secondary text-black font-extrabold shadow-lg shadow-secondary/15 scale-[1.02]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main interactive area based on selected tab */}
      <section className="bg-transparent animate-fade-in pt-4">
        {renderActiveTab()}
      </section>

      {/* Floating back button to return to home/dashboard */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/dashboard" passHref legacyBehavior>
          <a className="flex items-center gap-2 bg-secondary hover:bg-secondary-fixed text-black px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-2xl transition duration-300 hover:scale-105">
            <Laptop className="w-4 h-4 text-black" />
            Voltar ao Dashboard
          </a>
        </Link>
      </div>
    </div>
  );
};
