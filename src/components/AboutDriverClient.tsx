"use client";

import Link from "next/link";
import { 
  Instagram, 
  Facebook, 
  Phone, 
  Mail, 
  Award, 
  ShieldCheck, 
  ArrowLeft,
  Calendar,
  Wifi,
  Thermometer,
  BatteryCharging,
  Coffee,
  Quote
} from "lucide-react";
import Header from "./Header";
import { useLanguage } from "../context/LanguageContext";

const AboutDriverClient = () => {
  const { language, t } = useLanguage();
  const diffs = (t("sobre.diffs") || []) as string[];

  // Map each differential index to an icon for rich visual structure
  const diffIcons = [
    <Award className="w-5 h-5 text-secondary flex-shrink-0" key="award" />,
    <ShieldCheck className="w-5 h-5 text-secondary flex-shrink-0" key="shield" />,
    <Award className="w-5 h-5 text-secondary flex-shrink-0" key="certificate" />,
    <Calendar className="w-5 h-5 text-secondary flex-shrink-0" key="calendar" />
  ];

  return (
    <div className="min-h-screen bg-[#0C0F0F] text-[#e2e2e2] pt-28 pb-16 font-body relative overflow-hidden selection:bg-secondary selection:text-black">
      {/* Background glowing effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none animate-pulse duration-[8000ms] delay-1000" />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-secondary/2 rounded-full blur-3xl pointer-events-none animate-pulse duration-[10000ms] delay-2000" />

      <Header />

      <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-12 animate-fade-in">
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Profile info & Contacts (col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card rounded-[32px] p-6 text-center border border-secondary/15 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-secondary via-secondary-fixed to-secondary" />
              
              {/* Profile image with gold pulse border */}
              <div className="relative w-32 h-32 mx-auto mb-6 group/avatar">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-secondary/40 via-secondary-fixed/20 to-secondary/40 blur-md opacity-75 group-hover/avatar:opacity-100 transition-opacity duration-500" />
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-secondary shadow-[0_0_15px_rgba(233,195,73,0.25)] bg-[#1A1C1C] transition-transform duration-300 group-hover/avatar:scale-105">
                  <img
                    src="profile2.png"
                    alt="Anderson Marumoto"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <span className="inline-block px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-secondary bg-secondary/10 border border-secondary/20 rounded-full mb-3">
                {t("sobre.badge")}
              </span>
              <h1 className="text-2xl font-bold font-display text-white tracking-wide leading-tight">{t("sobre.name")}</h1>
              <p className="text-secondary/70 text-xs mt-1.5 uppercase font-bold tracking-widest mb-6">{t("sobre.sub")}</p>

              {/* Direct contacts inside profile card */}
              <div className="space-y-3 pt-4 border-t border-[#444748]/10 text-left">
                <a
                  href="tel:+5511958396939"
                  className="flex items-center space-x-3 text-xs text-on-surface-variant hover:text-secondary transition-colors group p-2.5 rounded-xl bg-white/3 border border-white/5 hover:border-secondary/20"
                >
                  <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span className="font-semibold">+55 (11) 95839-6939</span>
                </a>
                <a
                  href="mailto:contato@andersonexecutivo.com.br"
                  className="flex items-center space-x-3 text-xs text-on-surface-variant hover:text-secondary transition-colors group p-2.5 rounded-xl bg-white/3 border border-white/5 hover:border-secondary/20"
                >
                  <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span className="font-semibold truncate">contato@andersonexecutivo.com.br</span>
                </a>
              </div>

              {/* Social Media Row */}
              <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-[#444748]/10">
                <a
                  href="https://www.instagram.com/andersonexecutivo"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-3 bg-white/3 hover:bg-pink-500/10 border border-white/5 hover:border-pink-500/30 text-gray-400 hover:text-pink-500 rounded-2xl transition duration-300 hover:scale-105"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/andersonexecutivo"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-3 bg-white/3 hover:bg-blue-500/10 border border-white/5 hover:border-blue-500/30 text-gray-400 hover:text-blue-500 rounded-2xl transition duration-300 hover:scale-105"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Bio, Diffs and Fleet Details (col-span-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Banner Cover Container */}
            <div className="h-56 rounded-[32px] overflow-hidden relative border border-white/5 shadow-lg group bg-[#0A0A0A]">
              <img
                src="/hero.png"
                alt="Chauffeur Service background"
                className="w-full h-full object-cover opacity-30 transition-transform duration-[8000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F0F] via-[#0C0F0F]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 sm:left-8">
                <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-wide uppercase">
                  {language === "pt" ? "Excelência Operacional" : "Operational Excellence"}
                </h2>
                <p className="text-secondary text-xs uppercase font-bold tracking-widest mt-1">
                  {language === "pt" ? "Mobilidade Corporativa Particular" : "Private Corporate Mobility"}
                </p>
              </div>
            </div>

            {/* Biography */}
            <div className="glass-card rounded-[32px] p-6 sm:p-8 border border-secondary/10 space-y-4">
              <h2 className="text-lg font-bold font-display text-secondary uppercase tracking-wider">
                {language === "pt" ? "Perfil Profissional" : "Professional Profile"}
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed text-justify">
                {t("sobre.bio")}
              </p>
            </div>

            {/* Service Standards / Diffs */}
            <div className="glass-card rounded-[32px] p-6 sm:p-8 border border-secondary/10 space-y-6">
              <h2 className="text-lg font-bold font-display text-secondary uppercase tracking-wider">
                {t("sobre.diffTitle")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {diffs.map((diff, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white/3 border border-white/5 p-4 rounded-2xl">
                    {diffIcons[index] || <Award className="w-5 h-5 text-secondary flex-shrink-0" />}
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed text-left">{diff}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Onboard Experience & Premium Fleet Details */}
            <div className="glass-card rounded-[32px] p-6 sm:p-8 border border-secondary/10 space-y-6">
              <h2 className="text-lg font-bold font-display text-secondary uppercase tracking-wider">
                {language === "pt" ? "Experiência a Bordo e Veículo" : "Onboard Experience & Vehicle"}
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed text-justify">
                {language === "pt"
                  ? "As viagens são realizadas a bordo de um veículo de propriedade do motorista, o Toyota Corolla Cross Black Edition. O carro foi projetado para oferecer o máximo conforto executivo, segurança em deslocamentos rodoviários e conectividade constante."
                  : "All journeys are completed in the chauffeur-owned Toyota Corolla Cross Black Edition. The vehicle is optimized to offer premium executive comfort, safe road navigation, and continuous connectivity."}
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-4 bg-white/3 border border-white/5 rounded-2xl text-center space-y-2">
                  <Wifi className="w-6 h-6 text-secondary mx-auto" />
                  <p className="text-[10px] font-bold uppercase text-white tracking-wider">Wi-Fi 5G</p>
                  <p className="text-[9px] text-[#c4c7c7]">{language === "pt" ? "Conectado" : "Connected"}</p>
                </div>
                <div className="p-4 bg-white/3 border border-white/5 rounded-2xl text-center space-y-2">
                  <Thermometer className="w-6 h-6 text-secondary mx-auto" />
                  <p className="text-[10px] font-bold uppercase text-white tracking-wider">{language === "pt" ? "Clima" : "Climate"}</p>
                  <p className="text-[9px] text-[#c4c7c7]">{language === "pt" ? "Dual Zone" : "Dual Zone"}</p>
                </div>
                <div className="p-4 bg-white/3 border border-white/5 rounded-2xl text-center space-y-2">
                  <BatteryCharging className="w-6 h-6 text-secondary mx-auto" />
                  <p className="text-[10px] font-bold uppercase text-white tracking-wider">{language === "pt" ? "Cargas" : "Power"}</p>
                  <p className="text-[9px] text-[#c4c7c7]">{language === "pt" ? "Multi Cabos" : "Multi Cables"}</p>
                </div>
                <div className="p-4 bg-white/3 border border-white/5 rounded-2xl text-center space-y-2">
                  <Coffee className="w-6 h-6 text-secondary mx-auto" />
                  <p className="text-[10px] font-bold uppercase text-white tracking-wider">{language === "pt" ? "Cortesia" : "Amenities"}</p>
                  <p className="text-[9px] text-[#c4c7c7]">{language === "pt" ? "Água Premium" : "Premium Water"}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Depoimento / Quote Banner */}
        <div className="relative overflow-hidden glass-card rounded-[32px] p-8 sm:p-12 border border-secondary/15 text-center bg-gradient-to-br from-[#121414] to-[#0A0A0A]">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-secondary via-secondary-fixed to-secondary" />
          <Quote className="w-10 h-10 text-secondary/35 mx-auto mb-6 rotate-180" />
          <p className="italic text-white font-medium text-base sm:text-xl leading-relaxed max-w-2xl mx-auto">
            {t("sobre.quote")}
          </p>
          <p className="text-secondary text-xs sm:text-sm mt-4 font-bold uppercase tracking-[0.2em]">— {t("sobre.name")}</p>
        </div>

        {/* Back Button Navigation */}
        <div className="flex justify-center items-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/10 hover:border-secondary/30 text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:text-white transition duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("common.nav.back")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutDriverClient;
