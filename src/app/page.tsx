"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import WhatsAppButton from "../components/WhatsAppButton";
import ReviewSection from "../components/ReviewSection";
import { FaChevronDown, FaChevronUp, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const Home: React.FC = () => {
  // Estado do formulário de orçamento
  const [nome, setNome] = useState("");
  const [tipoServico, setTipoServico] = useState("Transfer Aeroporto");
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [observacoes, setObservacoes] = useState("");

  // Estado do FAQ (Accordion)
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const { language, t } = useLanguage();

  // Efeito de revelação no scroll (Scroll Reveal)
  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", reveal);
    reveal(); // Gatilho imediato no carregamento
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  // Função para enviar o orçamento formatado via WhatsApp
  const handleSendOrçamento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !origem || !destino) {
      alert(language === "pt" 
        ? "Por favor, preencha os campos obrigatórios (Nome, Origem e Destino)." 
        : "Please fill in the required fields (Name, Pick-up, and Destination)."
      );
      return;
    }

    const mensagem = language === "pt"
      ? `Olá Anderson! Gostaria de solicitar um orçamento de transfer executivo.%0A%0A` +
        `*Nome do Passageiro:* ${nome}%0A` +
        `*Serviço:* ${tipoServico}%0A` +
        `*Origem:* ${origem}%0A` +
        `*Destino:* ${destino}%0A` +
        `*Data:* ${data ? new Date(data).toLocaleDateString("pt-BR") : "A combinar"}%0A` +
        `*Hora:* ${hora || "A combinar"}%0A` +
        `${observacoes ? `*Observações:* ${observacoes}%0A` : ""}%0A` +
        `Agradeço desde já!`
      : `Hello Anderson! I would like to request an executive transfer quote.%0A%0A` +
        `*Passenger Name:* ${nome}%0A` +
        `*Service:* ${tipoServico}%0A` +
        `*Pick-up Location:* ${origem}%0A` +
        `*Drop-off Location:* ${destino}%0A` +
        `*Date:* ${data ? new Date(data).toLocaleDateString("en-US") : "To be arranged"}%0A` +
        `*Time:* ${hora || "To be arranged"}%0A` +
        `${observacoes ? `*Notes:* ${observacoes}%0A` : ""}%0A` +
        `Thank you!`;

    window.open(`https://wa.me/+5511958396939?text=${mensagem}`, "_blank", "noopener,noreferrer");
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = (t("home.faq.items") || []) as Array<{ question: string; answer: string }>;

  return (
    <div className="font-body bg-[#0C0F0F] text-[#e2e2e2] antialiased selection:bg-secondary selection:text-black min-h-screen pb-20 md:pb-0">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-end pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Executive Car at Night"
            className="w-full h-full object-cover scale-100 transition-transform duration-10000"
            src="/hero.png"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-container-max mx-auto w-full">
          <div className="max-w-3xl reveal active">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              {t("home.hero.title")}
            </h1>
            <p className="text-lg sm:text-xl text-[#c4c7c7] mb-10 max-w-xl leading-relaxed">
              {t("home.hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#orcamento"
                className="bg-secondary text-black px-8 py-4 rounded-full font-semibold text-sm hover:scale-105 transition-transform text-center"
              >
                {t("home.hero.ctaRequest")}
              </a>
              <a
                href="https://wa.me/+5511958396939"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-secondary text-secondary px-8 py-4 rounded-full font-semibold text-sm hover:bg-secondary/10 transition-colors text-center flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="text-lg" />
                {t("home.hero.ctaTalk")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Ribbon */}
      <div className="bg-[#1A1C1C] py-8 border-y border-[#444748]/20">
        <div className="max-w-container-max mx-auto px-6 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">schedule</span>
              <span className="text-xs font-bold tracking-widest text-[#c4c7c7] uppercase">{t("home.ribbon.available24h")}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">flight_takeoff</span>
              <span className="text-xs font-bold tracking-widest text-[#c4c7c7] uppercase">{t("home.ribbon.airports")}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">business</span>
              <span className="text-xs font-bold tracking-widest text-[#c4c7c7] uppercase">{t("home.ribbon.corporate")}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">verified_user</span>
              <span className="text-xs font-bold tracking-widest text-[#c4c7c7] uppercase">{t("home.ribbon.chauffeur")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <section className="py-24 px-6 md:px-16 max-w-container-max mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative reveal">
            <div className="aspect-square rounded-2xl overflow-hidden border border-secondary/20">
              <img
                alt="Anderson Marumoto Profile"
                className="w-full h-full object-cover"
                src="perfil.png"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-card p-8 rounded-xl hidden md:block">
              <div className="text-secondary font-display text-4xl font-bold">15+</div>
              <div className="text-xs font-bold tracking-widest text-[#c4c7c7] uppercase">{t("home.bio.experienceYears")}</div>
            </div>
          </div>
          <div className="reveal" style={{ transitionDelay: "200ms" }}>
            <span className="text-secondary text-xs font-bold tracking-[0.2em] mb-4 block uppercase">{t("home.bio.badgeTitle")}</span>
            <h2 className="font-display text-3xl sm:text-4xl text-white mb-6">{t("home.bio.title")}</h2>
            <p className="text-[#c4c7c7] mb-6 leading-relaxed text-justify">
              {t("home.bio.p1")}
            </p>
            <p className="text-[#c4c7c7] mb-8 leading-relaxed text-justify">
              {t("home.bio.p2")}
            </p>
            <div className="font-display text-2xl text-secondary/80 italic">{t("home.bio.name")}</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-[#0A0A0A] border-t border-[#444748]/10">
        <div className="px-6 md:px-16 max-w-container-max mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">{t("home.services.title")}</h2>
            <div className="w-20 h-1 bg-secondary mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="glass-card rounded-2xl overflow-hidden group reveal">
              <div className="h-64 overflow-hidden relative">
                <img
                  alt="Airport Transfer Service"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src="/airport-transfer.png"
                />
              </div>
              <div className="p-8">
                <h3 className="font-display text-xl font-bold text-white mb-4">{t("home.services.transfer.title")}</h3>
                <p className="text-[#c4c7c7] mb-6 text-sm">{t("home.services.transfer.desc")}</p>
                <a className="text-secondary font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:gap-4 transition-all" href="#orcamento">
                  {t("home.services.transfer.cta")} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
            {/* Service 2 */}
            <div className="glass-card rounded-2xl overflow-hidden group reveal" style={{ transitionDelay: "100ms" }}>
              <div className="h-64 overflow-hidden relative">
                <img
                  alt="Corporate Chauffeur Service"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src="/executive.png"
                />
              </div>
              <div className="p-8">
                <h3 className="font-display text-xl font-bold text-white mb-4">{t("home.services.corporate.title")}</h3>
                <p className="text-[#c4c7c7] mb-6 text-sm">{t("home.services.corporate.desc")}</p>
                <a className="text-secondary font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:gap-4 transition-all" href="#orcamento">
                  {t("home.services.corporate.cta")} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
            {/* Service 3 */}
            <div className="glass-card rounded-2xl overflow-hidden group reveal" style={{ transitionDelay: "200ms" }}>
              <div className="h-64 overflow-hidden relative">
                <img
                  alt="Trips & Events Service"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src="/beach-travel.png"
                />
              </div>
              <div className="p-8">
                <h3 className="font-display text-xl font-bold text-white mb-4">{t("home.services.events.title")}</h3>
                <p className="text-[#c4c7c7] mb-6 text-sm">{t("home.services.events.desc")}</p>
                <a className="text-secondary font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:gap-4 transition-all" href="#orcamento">
                  {t("home.services.events.cta")} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentials Grid */}
      <section className="py-24 px-6 md:px-16 max-w-container-max mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2 reveal">
            <h2 className="font-display text-3xl sm:text-4xl text-white mb-6">{t("home.differentials.title")}</h2>
            <p className="text-[#c4c7c7] mb-10 leading-relaxed">{t("home.differentials.subtitle")}</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <span className="material-symbols-outlined text-secondary">verified</span>
                <span className="text-white font-semibold">{t("home.differentials.punctuality")}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="material-symbols-outlined text-secondary">lock</span>
                <span className="text-white font-semibold">{t("home.differentials.secrecy")}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="material-symbols-outlined text-secondary">shield</span>
                <span className="text-white font-semibold">{t("home.differentials.armored")}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="material-symbols-outlined text-secondary">language</span>
                <span className="text-white font-semibold">{t("home.differentials.tailored")}</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 glass-card p-12 rounded-3xl reveal" style={{ transitionDelay: "300ms" }}>
            <h3 className="font-display text-xl font-bold text-secondary mb-8">{t("home.differentials.facilities.title")}</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                <span className="text-[#e2e2e2] text-sm md:text-base">{t("home.differentials.facilities.billing")}</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                <span className="text-[#e2e2e2] text-sm md:text-base">{t("home.differentials.facilities.reception")}</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                <span className="text-[#e2e2e2] text-sm md:text-base">{t("home.differentials.facilities.wifi")}</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                <span className="text-[#e2e2e2] text-sm md:text-base">{t("home.differentials.facilities.languages")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* In-Cabin Experience */}
      <section className="relative py-28 overflow-hidden border-t border-[#444748]/10">
        <div className="absolute inset-0 z-0">
          <img
            alt="Executive Car Interior Detail"
            className="w-full h-full object-cover opacity-20"
            src="/executive.png"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0F0F] via-transparent to-[#0C0F0F]"></div>
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-container-max mx-auto">
          <div className="max-w-xl reveal">
            <span className="text-secondary text-xs font-bold tracking-[0.2em] mb-4 block uppercase">{t("home.cabin.badge")}</span>
            <h2 className="font-display text-3xl sm:text-4xl text-white mb-8">{t("home.cabin.title")}</h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <span className="material-symbols-outlined text-secondary">water_full</span>
                <h4 className="text-white font-bold text-sm sm:text-base">{t("home.cabin.water.title")}</h4>
                <p className="text-[#c4c7c7] text-xs sm:text-sm">{t("home.cabin.water.desc")}</p>
              </div>
              <div className="space-y-2">
                <span className="material-symbols-outlined text-secondary">battery_charging_full</span>
                <h4 className="text-white font-bold text-sm sm:text-base">{t("home.cabin.connectivity.title")}</h4>
                <p className="text-[#c4c7c7] text-xs sm:text-sm">{t("home.cabin.connectivity.desc")}</p>
              </div>
              <div className="space-y-2">
                <span className="material-symbols-outlined text-secondary">ac_unit</span>
                <h4 className="text-white font-bold text-sm sm:text-base">{t("home.cabin.climate.title")}</h4>
                <p className="text-[#c4c7c7] text-xs sm:text-sm">{t("home.cabin.climate.desc")}</p>
              </div>
              <div className="space-y-2">
                <span className="material-symbols-outlined text-secondary">luggage</span>
                <h4 className="text-white font-bold text-sm sm:text-base">{t("home.cabin.space.title")}</h4>
                <p className="text-[#c4c7c7] text-xs sm:text-sm">{t("home.cabin.space.desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 4: Formulário Interativo de Orçamento */}
      <section id="orcamento" className="py-24 bg-[#0A0A0A] border-t border-[#444748]/10 relative">
        <div className="container mx-auto px-6 md:px-16 max-w-container-max">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Texto de chamada do formulário */}
            <div className="w-full lg:w-1/2 space-y-6 reveal">
              <span className="text-xs uppercase font-extrabold text-secondary tracking-widest bg-secondary/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs">calculate</span>
                {t("home.quote.badge")}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                {t("home.quote.title")}
              </h2>
              <p className="text-[#c4c7c7] text-base leading-relaxed text-justify">
                {t("home.quote.desc")}
              </p>
              <ul className="space-y-3 text-sm text-[#c4c7c7]">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  {t("home.quote.benefit1")}
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  {t("home.quote.benefit2")}
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  {t("home.quote.benefit3")}
                </li>
              </ul>
            </div>

            {/* Formulário Real */}
            <div className="w-full lg:w-1/2 glass-card rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10 reveal" style={{ transitionDelay: "200ms" }}>
              <form onSubmit={handleSendOrçamento} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">{t("home.quote.form.name")}</label>
                  <input
                    type="text"
                    required
                    placeholder={t("home.quote.form.namePlaceholder")}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary/50 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">{t("home.quote.form.service")}</label>
                  <select
                    value={tipoServico}
                    onChange={(e) => setTipoServico(e.target.value)}
                    className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary/50 transition cursor-pointer"
                  >
                    <option value="Transfer Aeroporto">{t("home.quote.form.serviceOptions.airport")}</option>
                    <option value="Viagem Litoral/Interior">{t("home.quote.form.serviceOptions.travel")}</option>
                    <option value="Atendimento Executivo">{t("home.quote.form.serviceOptions.executive")}</option>
                    <option value="City Tour / Turismo">{t("home.quote.form.serviceOptions.tour")}</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">{t("home.quote.form.origin")}</label>
                    <input
                      type="text"
                      required
                      placeholder={t("home.quote.form.originPlaceholder")}
                      value={origem}
                      onChange={(e) => setOrigem(e.target.value)}
                      className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary/50 transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">{t("home.quote.form.dest")}</label>
                    <input
                      type="text"
                      required
                      placeholder={t("home.quote.form.destPlaceholder")}
                      value={destino}
                      onChange={(e) => setDestino(e.target.value)}
                      className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary/50 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">{t("home.quote.form.date")}</label>
                    <input
                      type="date"
                      value={data}
                      onChange={(e) => setData(e.target.value)}
                      className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary/50 transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">{t("home.quote.form.time")}</label>
                    <input
                      type="time"
                      value={hora}
                      onChange={(e) => setHora(e.target.value)}
                      className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary/50 transition"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">{t("home.quote.form.notes")}</label>
                  <textarea
                    rows={2}
                    placeholder={t("home.quote.form.notesPlaceholder")}
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary/50 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-secondary text-black font-bold tracking-wide uppercase text-xs rounded-xl shadow-lg shadow-secondary/10 hover:shadow-secondary/20 hover:scale-[1.01] transform transition duration-300 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  {t("home.quote.form.submit")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Avaliações Firebase */}
      <ReviewSection />

      {/* FAQ Accordion */}
      <section className="py-24 px-6 md:px-16 max-w-4xl mx-auto border-t border-[#444748]/10 reveal">
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-extrabold text-secondary tracking-widest bg-secondary/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <span className="material-symbols-outlined text-xs">help</span>
            {t("home.faq.badge")}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-white mt-4 mb-6">{t("home.faq.title")}</h2>
          <p className="text-[#c4c7c7] text-base leading-relaxed">
            {t("home.faq.desc")}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#1A1C1C]/45 transition focus:outline-none"
              >
                <span className="font-semibold text-white text-base sm:text-lg">{faq.question}</span>
                {activeFaq === index ? (
                  <FaChevronUp className="text-secondary w-4 h-4 flex-shrink-0" />
                ) : (
                  <FaChevronDown className="text-gray-500 w-4 h-4 flex-shrink-0" />
                )}
              </button>
              
              {activeFaq === index && (
                <div className="p-6 pt-0 text-[#c4c7c7] text-sm sm:text-base leading-relaxed border-t border-[#444748]/10 bg-[#1A1C1C]/10 text-justify">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Botão Flutuante de WhatsApp */}
      <WhatsAppButton />

      {/* Rodapé */}
      <footer className="bg-[#0A0A0A] border-t border-[#444748]/20 py-16 px-6 md:px-16">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="font-display text-2xl text-secondary mb-6 tracking-widest uppercase">{t("common.footer.title")}</div>
              <p className="text-[#c4c7c7] text-sm mb-8 max-w-sm leading-relaxed text-justify">
                {t("common.footer.description")}
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">{t("common.footer.linksTitle")}</h4>
              <ul className="space-y-4 text-[#c4c7c7] text-sm">
                <li><Link className="hover:text-secondary transition-colors" href="/sobre">{t("common.nav.about")}</Link></li>
                <li><Link className="hover:text-secondary transition-colors" href="/services">{t("common.nav.services")}</Link></li>
                <li><Link className="hover:text-secondary transition-colors" href="/CVisita">{t("common.nav.card")}</Link></li>
                <li><Link className="hover:text-secondary transition-colors" href="/dashboard">{t("common.nav.dashboard")}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">{t("common.footer.contactTitle")}</h4>
              <ul className="space-y-4 text-[#c4c7c7] text-sm">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-secondary">call</span>
                  +55 (11) 95839-6939
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-secondary">mail</span>
                  contato@andersonexecutivo.com.br
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-[#444748]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#c4c7c7]">
            <p>{t("common.footer.rights").replace("{year}", new Date().getFullYear().toString())}</p>
            <p className="text-gray-600">{t("common.footer.regulation")}</p>
          </div>
        </div>
      </footer>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-[#1A1C1C]/80 backdrop-blur-lg border-t border-secondary/20 shadow-2xl md:hidden">
        <div className="flex justify-around items-center h-20 px-4">
          <a
            href="#orcamento"
            className="bg-secondary text-black rounded-full px-6 py-2.5 flex items-center gap-2 active:scale-95 transition-all font-semibold text-xs uppercase"
          >
            <span className="material-symbols-outlined text-sm">phone_in_talk</span>
            <span>{t("home.mobileNav.request")}</span>
          </a>
          <a
            href="https://wa.me/+5511958396939"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c4c7c7] flex items-center gap-2 active:scale-95 transition-all font-semibold text-xs uppercase"
          >
            <span className="material-symbols-outlined text-sm">chat</span>
            <span>{t("home.mobileNav.consult")}</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Home;
