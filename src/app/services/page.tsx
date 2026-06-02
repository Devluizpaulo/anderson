"use client";

import Link from "next/link";
import Header from "../../components/Header";
import React from "react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import { 
  Plane, 
  Map, 
  Briefcase, 
  Compass, 
  ArrowLeft
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Services: React.FC = () => {
  const { language, t } = useLanguage();

  const getWhatsappLink = (serviceNamePt: string, serviceNameEn: string) => {
    const serviceName = language === "pt" ? serviceNamePt : serviceNameEn;
    const text = language === "pt"
      ? `Olá Anderson! Gostaria de solicitar um orçamento para o serviço de *${serviceName}*.`
      : `Hello Anderson! I would like to request a quote for the *${serviceName}* service.`;
    return `https://wa.me/+5511958396939?text=${encodeURIComponent(text)}`;
  };

  const servicesData = [
    {
      id: "airport",
      titleKey: "servicesPage.cards.airport.title",
      descKey: "servicesPage.cards.airport.desc",
      img: "/airport-transfer.png",
      ptName: "Transfer Receptivo em Aeroportos",
      enName: "Airport Transfers (Meet & Greet)",
      icon: <Plane className="w-6 h-6 text-secondary" />,
    },
    {
      id: "travel",
      titleKey: "servicesPage.cards.travel.title",
      descKey: "servicesPage.cards.travel.desc",
      img: "/beach-travel.png",
      ptName: "Atendimento em Litoral e Interior",
      enName: "Out-of-Town & Coastal Trips",
      icon: <Map className="w-6 h-6 text-secondary" />,
    },
    {
      id: "executive",
      titleKey: "servicesPage.cards.executive.title",
      descKey: "servicesPage.cards.executive.desc",
      img: "/executive.png",
      ptName: "Atendimento Executivo",
      enName: "Executive Transportation",
      icon: <Briefcase className="w-6 h-6 text-secondary" />,
    },
    {
      id: "tourism",
      titleKey: "servicesPage.cards.tourism.title",
      descKey: "servicesPage.cards.tourism.desc",
      img: "/tourism.png",
      ptName: "Recepção ao Turismo em São Paulo",
      enName: "São Paulo Private Sightseeing",
      icon: <Compass className="w-6 h-6 text-secondary" />,
    },
  ];

  return (
    <main className="bg-[#0C0F0F] min-h-screen text-[#e2e2e2] relative overflow-hidden font-body selection:bg-secondary selection:text-black">
      {/* Background glowing effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none animate-pulse duration-[8000ms] delay-1000" />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-secondary/2 rounded-full blur-3xl pointer-events-none animate-pulse duration-[10000ms] delay-2000" />

      <Header />

      <section className="pt-32 pb-24 px-6 sm:px-10 max-w-7xl mx-auto w-full relative z-10">
        {/* Title / Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-secondary bg-secondary/10 border border-secondary/20 rounded-full mb-4 animate-fade-in">
            {language === "pt" ? "Exclusividade e Alta Classe" : "Exclusivity & High Class"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-white mb-6 tracking-wide leading-tight">
            {t("servicesPage.title")}
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-secondary to-secondary-container mx-auto mb-6 rounded-full" />
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            {t("servicesPage.desc")}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {servicesData.map((svc) => (
            <div
              key={svc.id}
              className="glass-card rounded-[32px] overflow-hidden border border-secondary/10 hover:border-secondary/30 hover:scale-[1.01] hover:shadow-[0_15px_30px_rgba(233,195,73,0.05)] transition-all duration-500 flex flex-col group"
            >
              {/* Image wrapper */}
              <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-surface-container-low">
                <Image
                  src={svc.img}
                  alt={t(svc.titleKey)}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={svc.id === "airport" || svc.id === "travel"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F0F] via-transparent to-transparent opacity-85" />
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-secondary/10 border border-secondary/20">
                      {svc.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-secondary transition-colors duration-300">
                      {t(svc.titleKey)}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed text-justify">
                    {t(svc.descKey)}
                  </p>
                </div>

                {/* Direct CTA */}
                <a
                  href={getWhatsappLink(svc.ptName, svc.enName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-secondary hover:bg-secondary-fixed text-black font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-2xl transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-secondary/5 hover:shadow-secondary/15 hover:scale-[1.01] transform"
                >
                  <FaWhatsapp className="w-4.5 h-4.5" />
                  <span>{language === "pt" ? "Solicitar Atendimento" : "Book Service"}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-center items-center mt-16 pt-8 border-t border-secondary/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/10 hover:border-secondary/30 text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:text-white transition duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("common.nav.back")}</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Services;
