import type { Metadata } from "next";
import Header from "@/components/Header";
import { PresentationClient } from "@/components/presentation/PresentationClient";

// SEO metadata rendered on the Server Side for optimal crawl speed
export const metadata: Metadata = {
  title: "Central de Apresentação | Anderson Executive Transfers",
  description: "Central de demonstração interativa do front-end da plataforma Anderson Transfers. Explore fluxos do Google Calendar, mensagens WhatsApp e sandbox de dispositivos.",
};

export default function PresentationPage() {
  return (
    <div className="min-h-screen bg-[#0C0F0F] text-[#e2e2e2] flex flex-col font-body relative overflow-hidden">
      {/* Background glowing luxury effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header component */}
      <Header />

      {/* Main Container rendering the Client Controller */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-28 relative z-10">
        <PresentationClient />
      </main>
    </div>
  );
}
