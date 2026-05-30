"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import WhatsAppButton from "../components/WhatsAppButton";
import ReviewSection from "../components/ReviewSection";
import { FaChevronDown, FaChevronUp, FaWhatsapp } from "react-icons/fa";

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
      alert("Por favor, preencha os campos obrigatórios (Nome, Origem e Destino).");
      return;
    }

    const mensagem = `Olá Anderson! Gostaria de solicitar um orçamento de transfer executivo.%0A%0A` +
      `*Nome do Passageiro:* ${nome}%0A` +
      `*Serviço:* ${tipoServico}%0A` +
      `*Origem:* ${origem}%0A` +
      `*Destino:* ${destino}%0A` +
      `*Data:* ${data ? new Date(data).toLocaleDateString("pt-BR") : "A combinar"}%0A` +
      `*Hora:* ${hora || "A combinar"}%0A` +
      `${observacoes ? `*Observações:* ${observacoes}%0A` : ""}%0A` +
      `Agradeço desde já!`;

    window.open(`https://wa.me/+5511958396939?text=${mensagem}`, "_blank", "noopener,noreferrer");
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Como funciona a recepção em aeroportos?",
      answer: "Nossa recepção é totalmente personalizada (receptivo de desembarque). O motorista aguarda no saguão de desembarque com uma placa de identificação elegante (digital ou física), auxiliando com as bagagens e conduzindo-o com segurança até o veículo blindado.",
    },
    {
      question: "A frota é 100% blindada?",
      answer: "Sim, operamos exclusivamente com veículos blindados de altíssimo padrão (nível III-A, o máximo permitido por lei para uso civil no Brasil). Isso garante a máxima segurança urbana em todos os percursos.",
    },
    {
      question: "Com quanta antecedência devo fazer meu agendamento?",
      answer: "Recomendamos realizar o agendamento com pelo menos 12 a 24 horas de antecedência para garantir total disponibilidade e preparação minuciosa de sua viagem. Para transfers de aeroportos imediatos, favor entrar em contato diretamente via telefone no WhatsApp.",
    },
    {
      question: "Quais são as formas de pagamento aceitas?",
      answer: "Aceitamos Pix, cartões de crédito/débito diretamente no veículo ou faturamento corporativo para empresas cadastradas mediante contrato prévio.",
    },
    {
      question: "Os motoristas são qualificados?",
      answer: "Sim. Nossos motoristas possuem licença profissional EAR, passam por rigorosos treinamentos de direção defensiva e evasiva de segurança, e estão preparados para oferecer atendimento executivo exemplar, com discrição absoluta e presteza.",
    }
  ];

  return (
    <div className="font-body bg-[#0C0F0F] text-[#e2e2e2] antialiased selection:bg-secondary selection:text-black min-h-screen pb-20 md:pb-0">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-end pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Executive Car at Night"
            className="w-full h-full object-cover scale-105 transition-transform duration-10000"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaAKk4xRdj8mVnNqsjym4BHUYfMnZ9bO1UAViWohfybSUmTEZSfEPZ8cRXxMslqn8tslHJP7CPr2kXClaXbOCw-itb8bgggSISWHGcGVadHje-hEGzj9GIdYd_UxupDHwlG_L7zq7pmj1PKk0kRVZZxFyhImVCVx2DLcn17QvVE-UxseR5rUUgizVpO7zpPTJjGeNKTajxbKANu64jWPcIXbCU6qE66W5eLP3B_97IlM25w9bVGtKFuXRrHf5FkcYZftuYj2xbAHA"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-container-max mx-auto w-full">
          <div className="max-w-3xl reveal active">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Mobilidade Executiva com Atendimento Personalizado
            </h1>
            <p className="text-lg sm:text-xl text-[#c4c7c7] mb-10 max-w-xl leading-relaxed">
              Mais do que uma corrida. Uma experiência completa de transporte executivo em São Paulo, focada em pontualidade, discrição e segurança absoluta.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#orcamento"
                className="bg-secondary text-black px-8 py-4 rounded-full font-semibold text-sm hover:scale-105 transition-transform text-center"
              >
                Solicitar Atendimento
              </a>
              <a
                href="https://wa.me/+5511958396939"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-secondary text-secondary px-8 py-4 rounded-full font-semibold text-sm hover:bg-secondary/10 transition-colors text-center flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="text-lg" />
                Falar no WhatsApp
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
              <span className="text-xs font-bold tracking-widest text-[#c4c7c7] uppercase">DISPONÍVEL 24H</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">flight_takeoff</span>
              <span className="text-xs font-bold tracking-widest text-[#c4c7c7] uppercase">AEROPORTOS</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">business</span>
              <span className="text-xs font-bold tracking-widest text-[#c4c7c7] uppercase">CORPORATIVO</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">verified_user</span>
              <span className="text-xs font-bold tracking-widest text-[#c4c7c7] uppercase">CHAUFFEUR PRIVADO</span>
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcPoa9LVsKkg4gx5eyc01DyOwEcW8QXwlJ_kbQpbE_vm0vI0z3NrK-AAJdfgOf5SWB0OiY1X2QSFzC1ivp5L22Y4VFudVeOqhhf_UAxhPdLiF8Vl8iOhTt1a4g1eeSQSWGqL6schVo75LWu0xyrAjzC7S3528v3wtMABoHx2_qWZQNkQLeKjM9KM2hqW8kQYIOz4D5GA9J5gn2ECo-nVWUF9ZmZQR-dT-juHkoeeqIl9_4vqAnLnz27UowkNdrPltxIBk6YLou0R4"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-card p-8 rounded-xl hidden md:block">
              <div className="text-secondary font-display text-4xl font-bold">15+</div>
              <div className="text-xs font-bold tracking-widest text-[#c4c7c7] uppercase">Anos de Experiência</div>
            </div>
          </div>
          <div className="reveal" style={{ transitionDelay: "200ms" }}>
            <span className="text-secondary text-xs font-bold tracking-[0.2em] mb-4 block uppercase">EXCELÊNCIA & COMPROMISSO</span>
            <h2 className="font-display text-3xl sm:text-4xl text-white mb-6">Conheça Anderson Marumoto</h2>
            <p className="text-[#c4c7c7] mb-6 leading-relaxed text-justify">
              Como especialista em mobilidade urbana de alto padrão, dedico minha carreira a oferecer mais que transporte: ofereço tranquilidade. Cada jornada é planejada meticulosamente para atender aos padrões mais exigentes de executivos e empresas.
            </p>
            <p className="text-[#c4c7c7] mb-8 leading-relaxed text-justify">
              Meu compromisso é com a discrição absoluta, o conforto inigualável e uma pontualidade que respeita o valor do seu tempo.
            </p>
            <div className="font-display text-2xl text-secondary/80 italic">Anderson Marumoto</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-[#0A0A0A] border-t border-[#444748]/10">
        <div className="px-6 md:px-16 max-w-container-max mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">Serviços Premium</h2>
            <div className="w-20 h-1 bg-secondary mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="glass-card rounded-2xl overflow-hidden group reveal">
              <div className="h-64 overflow-hidden relative">
                <img
                  alt="Airport Transfer Service"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHpDcloQBCbVBYDVgSf9-ZKEpDSQH6jlrDhX3H2d1xN6veEVbGjqrOw0gYUgd5bZkxNEKqJv15fX9R7_OYwMw0igxvkZnMqndWEUZieI61ke2lcMLJpmNr-d0feI7TnHQtiVnRhqY-DrqEOW8Gm2TLwxUbQAKvs7c4ZsLtMCfCth1NBLpH8GsHDks_PPVlior0NTL5zcE1zL8UEvlNJguTVwEgH0GJhDnJxWWPgZVULY5OnGT8MujDwBdCjrECXQCPjttmg5CGY-E"
                />
              </div>
              <div className="p-8">
                <h3 className="font-display text-xl font-bold text-white mb-4">Transfer Aeroportos</h3>
                <p className="text-[#c4c7c7] mb-6 text-sm">Recepção personalizada em GRU, CGH e VCP com monitoramento de voos em tempo real.</p>
                <a className="text-secondary font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:gap-4 transition-all" href="#orcamento">
                  SOLICITAR <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
            {/* Service 2 */}
            <div className="glass-card rounded-2xl p-8 flex flex-col justify-between reveal" style={{ transitionDelay: "100ms" }}>
              <div>
                <span className="material-symbols-outlined text-4xl text-secondary mb-6">apartment</span>
                <h3 className="font-display text-xl font-bold text-white mb-4">Atendimento Corporativo</h3>
                <p className="text-[#c4c7c7] text-sm">Soluções de faturamento e logística coordenada para CEOs e delegações empresariais.</p>
              </div>
              <a className="text-secondary font-semibold text-xs tracking-wider uppercase mt-8 flex items-center gap-2 hover:gap-4 transition-all" href="#orcamento">
                CONTRATAR <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
            {/* Service 3 */}
            <div className="glass-card rounded-2xl p-8 flex flex-col justify-between reveal" style={{ transitionDelay: "200ms" }}>
              <div>
                <span className="material-symbols-outlined text-4xl text-secondary mb-6">event_seat</span>
                <h3 className="font-display text-xl font-bold text-white mb-4">Viagens & Eventos</h3>
                <p className="text-[#c4c7c7] text-sm">Suporte logístico elegante para trajetos ao interior/litoral e eventos de alto padrão.</p>
              </div>
              <a className="text-secondary font-semibold text-xs tracking-wider uppercase mt-8 flex items-center gap-2 hover:gap-4 transition-all" href="#orcamento">
                RESERVAR <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Differentials Grid */}
      <section className="py-24 px-6 md:px-16 max-w-container-max mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2 reveal">
            <h2 className="font-display text-3xl sm:text-4xl text-white mb-6">O Diferencial de um Serviço Executivo Real</h2>
            <p className="text-[#c4c7c7] mb-10 leading-relaxed">Não somos apenas motoristas. Somos parceiros da sua agenda e protetores da sua produtividade.</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <span className="material-symbols-outlined text-secondary">verified</span>
                <span className="text-white font-semibold">Pontualidade Britânica</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="material-symbols-outlined text-secondary">lock</span>
                <span className="text-white font-semibold">Sigilo Total</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="material-symbols-outlined text-secondary">shield</span>
                <span className="text-white font-semibold">Segurança Blindada III-A</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="material-symbols-outlined text-secondary">language</span>
                <span className="text-white font-semibold">Atendimento Tailored</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 glass-card p-12 rounded-3xl reveal" style={{ transitionDelay: "300ms" }}>
            <h3 className="font-display text-xl font-bold text-secondary mb-8">Facilidades Corporativas</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                <span className="text-[#e2e2e2] text-sm md:text-base">Faturamento mensal para empresas (PJ)</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                <span className="text-[#e2e2e2] text-sm md:text-base">Recepção personalizada no desembarque</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                <span className="text-[#e2e2e2] text-sm md:text-base">Wi-fi de alta velocidade 5G a bordo</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                <span className="text-[#e2e2e2] text-sm md:text-base">Suporte em Inglês e Espanhol para multinacionais</span>
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
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfECOPGqOHQIDtTTv5c4U6Dq3mEI24DQz0Ha7hmx-SzMEpDk3RFG0UKpsATl1jrx076V6E3I7pDhnfPpFZn_6z9u2Onfa-PVzA2sXuj79Plw3-6f0FMsWXaJ_2ER16RILDXoAf1WKMbd31--7Z1cIkVbeEPHi7WkdGGkrrGcTMAMb3-796LcBydKv1DoAwTff7dib1tB6LlTLJqrAxtd5otGzKhtSDa1c-HeFvfSN3ZTeEc8CcbWiXiUsqe-A5xtU16Cc0qKq2LZY"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0F0F] via-transparent to-[#0C0F0F]"></div>
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-container-max mx-auto">
          <div className="max-w-xl reveal">
            <span className="text-secondary text-xs font-bold tracking-[0.2em] mb-4 block uppercase">A BORDO</span>
            <h2 className="font-display text-3xl sm:text-4xl text-white mb-8">Seu Escritório Móvel</h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <span className="material-symbols-outlined text-secondary">water_full</span>
                <h4 className="text-white font-bold text-sm sm:text-base">Água & Snacks</h4>
                <p className="text-[#c4c7c7] text-xs sm:text-sm">Cortesias premium sempre disponíveis.</p>
              </div>
              <div className="space-y-2">
                <span className="material-symbols-outlined text-secondary">battery_charging_full</span>
                <h4 className="text-white font-bold text-sm sm:text-base">Conectividade</h4>
                <p className="text-[#c4c7c7] text-xs sm:text-sm">Cabos para todos os modelos de smartphone.</p>
              </div>
              <div className="space-y-2">
                <span className="material-symbols-outlined text-secondary">ac_unit</span>
                <h4 className="text-white font-bold text-sm sm:text-base">Climatização</h4>
                <p className="text-[#c4c7c7] text-xs sm:text-sm">Controle dual-zone para seu total conforto.</p>
              </div>
              <div className="space-y-2">
                <span className="material-symbols-outlined text-secondary">luggage</span>
                <h4 className="text-white font-bold text-sm sm:text-base">Amplo Espaço</h4>
                <p className="text-[#c4c7c7] text-xs sm:text-sm">Capacidade generosa para malas e equipamentos.</p>
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
                Orçamento Rápido
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Planeje Sua Viagem no WhatsApp
              </h2>
              <p className="text-[#c4c7c7] text-base leading-relaxed text-justify">
                Preencha os dados do percurso abaixo para calcular e simular a sua rota executiva. Suas informações serão organizadas em uma mensagem automática profissional, pronta para ser enviada diretamente para o nosso atendimento rápido via WhatsApp.
              </p>
              <ul className="space-y-3 text-sm text-[#c4c7c7]">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Orçamentos sem compromisso e respostas em menos de 10 minutos.
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Confirmação instantânea de disponibilidade para agendamentos.
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Facilidade para ajustar percurso e horários no pós-reserva.
                </li>
              </ul>
            </div>

            {/* Formulário Real */}
            <div className="w-full lg:w-1/2 glass-card rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10 reveal" style={{ transitionDelay: "200ms" }}>
              <form onSubmit={handleSendOrçamento} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">Seu Nome *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Oliveira"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary/50 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">Tipo de Atendimento</label>
                  <select
                    value={tipoServico}
                    onChange={(e) => setTipoServico(e.target.value)}
                    className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary/50 transition cursor-pointer"
                  >
                    <option value="Transfer Aeroporto">Transfer Aeroporto (Receptivo)</option>
                    <option value="Viagem Litoral/Interior">Viagem Litoral ou Interior</option>
                    <option value="Atendimento Executivo">Atendimento Corporativo / Reuniões</option>
                    <option value="City Tour / Turismo">City Tour / Turismo em SP</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">Local de Partida (Origem) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Aeroporto Guarulhos T3"
                      value={origem}
                      onChange={(e) => setOrigem(e.target.value)}
                      className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary/50 transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">Local de Chegada (Destino) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Av. Faria Lima, Pinheiros"
                      value={destino}
                      onChange={(e) => setDestino(e.target.value)}
                      className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary/50 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">Data Desejada</label>
                    <input
                      type="date"
                      value={data}
                      onChange={(e) => setData(e.target.value)}
                      className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary/50 transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">Horário</label>
                    <input
                      type="time"
                      value={hora}
                      onChange={(e) => setHora(e.target.value)}
                      className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary/50 transition"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#c4c7c7] uppercase tracking-wider">Observações do Passageiro</label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Preciso de faturamento PJ / Voo atrasado..."
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
                  Solicitar Orçamento no WhatsApp
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
            Dúvidas Comuns
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-white mt-4 mb-6">Perguntas Frequentes</h2>
          <p className="text-[#c4c7c7] text-base leading-relaxed">
            Esclareça as dúvidas mais recorrentes sobre nosso serviço de transfer privativo.
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
              <div className="font-display text-2xl text-secondary mb-6 tracking-widest uppercase">ANDERSON MARUMOTO</div>
              <p className="text-[#c4c7c7] text-sm mb-8 max-w-sm leading-relaxed text-justify">
                Elevando o padrão da mobilidade executiva em São Paulo através de excelência operacional, discrição absoluta e segurança inigualável.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Links Rápidos</h4>
              <ul className="space-y-4 text-[#c4c7c7] text-sm">
                <li><a className="hover:text-secondary transition-colors" href="/sobre">Sobre</a></li>
                <li><a className="hover:text-secondary transition-colors" href="/services">Serviços</a></li>
                <li><a className="hover:text-secondary transition-colors" href="/CVisita">Cartão de Visitas</a></li>
                <li><a className="hover:text-secondary transition-colors" href="/dashboard">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Atendimento</h4>
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
            <p>© {new Date().getFullYear()} Anderson Marumoto Executive Chauffeur. Todos os direitos reservados.</p>
            <p className="text-gray-600">Serviços de transporte privado de passageiros operando sob as mais rígidas regulamentações vigentes.</p>
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
            <span>Solicitar</span>
          </a>
          <a
            href="https://wa.me/+5511958396939"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c4c7c7] flex items-center gap-2 active:scale-95 transition-all font-semibold text-xs uppercase"
          >
            <span className="material-symbols-outlined text-sm">chat</span>
            <span>Consultar</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Home;
