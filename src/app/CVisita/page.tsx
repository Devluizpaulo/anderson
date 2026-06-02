"use client";

import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Instagram, 
  Facebook, 
  Phone, 
  Mail, 
  UserPlus, 
  QrCode, 
  Home, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  Send,
  Copy,
  ThumbsUp,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';
import { db, addDoc, collection } from '../../services/firebase';
import { QRCodeSVG } from 'qrcode.react';
import { useLanguage } from '../../context/LanguageContext';

function LinkNaBio() {
  const [avaliacaoStep, setAvaliacaoStep] = useState(1);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackTipo, setFeedbackTipo] = useState("");
  const [estrelas, setEstrelas] = useState(0);
  const [lgpd, setLgpd] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("https://andersonexecutivo.com.br");

  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleNextStep = () => {
    if (avaliacaoStep === 1) {
      if (estrelas === 0) {
        alert(language === "pt"
          ? "Por favor, selecione uma nota de estrelas."
          : "Please select a star rating."
        );
        return;
      }
      if (!feedbackTipo) {
        alert(language === "pt"
          ? "Por favor, selecione o tipo de avaliação."
          : "Please select the feedback type."
        );
        return;
      }
    }
    if (avaliacaoStep === 2) {
      if (!feedback.trim()) {
        alert(language === "pt"
          ? "Por favor, descreva sua experiência antes de prosseguir."
          : "Please write a comment about your experience before proceeding."
        );
        return;
      }
    }
    setAvaliacaoStep(avaliacaoStep + 1);
  };

  const handlePrevStep = () => {
    if (avaliacaoStep > 1) {
      setAvaliacaoStep(avaliacaoStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nome && telefone && estrelas && lgpd && feedback) {
      const avaliacao = {
        nome,
        telefone,
        email,
        feedback,
        feedbackTipo: feedbackTipo || "Comentário",
        estrelas,
        lgpd,
        status: "pendente",
        timestamp: new Date(),
      };

      try {
        await addDoc(collection(db, "avaliacoes"), avaliacao);
        setShowAlert(true);
        setTimeout(() => {
          setAvaliacaoStep(1);
          setShowAlert(false);
          setNome("");
          setTelefone("");
          setEmail("");
          setFeedback("");
          setFeedbackTipo("");
          setEstrelas(0);
          setLgpd(false);
        }, 2000);
      } catch (error) {
        console.error("Erro ao enviar avaliação:", error);
        alert(language === "pt" 
          ? "Erro ao enviar avaliação. Tente novamente." 
          : "Error submitting feedback. Please try again."
        );
      }
    } else {
      alert(language === "pt"
        ? "Por favor, preencha os dados obrigatórios e aceite a LGPD!"
        : "Please fill in the required fields and accept the privacy terms!"
      );
    }
  };

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Anderson Marumoto
ORG:Anderson Executive Transfers
TITLE:${language === "pt" ? "Motorista Executivo" : "Executive Chauffeur"}
TEL;TYPE=CELL,VOICE:+5511958396939
EMAIL;TYPE=PREF,INTERNET:contato@andersonexecutivo.com.br
URL:https://andersonexecutivo.com.br
NOTE:${language === "pt" ? "Frota Executiva - Toyota Corolla Cross Black Edition." : "Premium Executive Fleet - Toyota Corolla Cross Black Edition."}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Anderson_Marumoto.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    {
      platform: "WhatsApp",
      url: language === "pt" 
        ? "https://wa.me/+5511958396939?text=Olá Anderson, salvei seu contato digital!"
        : "https://wa.me/+5511958396939?text=Hello Anderson, I saved your digital contact details!",
      icon: <Phone className="w-5 h-5" />,
      hoverClass: "hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:text-emerald-400",
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/andersonexecutivo",
      icon: <Instagram className="w-5 h-5" />,
      hoverClass: "hover:border-pink-500/40 hover:bg-pink-500/5 hover:text-pink-400",
    },
    {
      platform: "Facebook",
      url: "https://facebook.com/andersonexecutivo",
      icon: <Facebook className="w-5 h-5" />,
      hoverClass: "hover:border-blue-500/40 hover:bg-blue-500/5 hover:text-blue-400",
    },
  ];

  const feedbackTipos = [
    { id: "Elogio", label: language === "pt" ? "Elogio" : "Compliment", icon: <ThumbsUp className="w-4 h-4" /> },
    { id: "Sugestão", label: language === "pt" ? "Sugestão" : "Suggestion", icon: <Lightbulb className="w-4 h-4" /> },
    { id: "Crítica", label: language === "pt" ? "Crítica" : "Critique", icon: <AlertTriangle className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-[#0C0F0F] font-body">
      {/* Background glowing effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none animate-pulse duration-5000" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none animate-pulse duration-[8000ms] delay-1000" />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-secondary/2 rounded-full blur-3xl pointer-events-none animate-pulse duration-[10000ms] delay-2000" />

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Profile Card */}
        <div className="glass-card rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden border border-secondary/10">
          
          {/* Top Left Language Selector - Sliding Pill */}
          <div className="absolute top-3 left-3 flex bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-0.5 shadow-inner w-20 h-7 relative">
            <div
              className={`absolute top-0.5 bottom-0.5 w-[36px] bg-secondary rounded-full shadow-md transition-all duration-300 ${
                language === "pt" ? "left-0.5" : "left-[41px]"
              }`}
            />
            <button
              onClick={() => setLanguage("pt")}
              className={`flex-1 text-[9px] font-extrabold tracking-wider z-10 text-center transition-colors duration-300 flex items-center justify-center h-full ${
                language === "pt" ? "text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              PT
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`flex-1 text-[9px] font-extrabold tracking-wider z-10 text-center transition-colors duration-300 flex items-center justify-center h-full ${
                language === "en" ? "text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          <div className="absolute top-3 right-3 flex space-x-2">
            <button
              onClick={() => setShowQrModal(true)}
              title={t("cvisita.qrCode")}
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-secondary transition-all hover:scale-105"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              onClick={downloadVCard}
              title={t("cvisita.saveContact")}
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-secondary transition-all hover:scale-105"
            >
              <UserPlus className="w-4 h-4" />
            </button>
          </div>

          <div className="relative w-28 h-28 mx-auto mb-4 group/avatar">
            {/* Golden animated aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-secondary/40 via-[#ffd700]/20 to-secondary/40 blur-md opacity-75 group-hover/avatar:opacity-100 transition-opacity duration-500 animate-spin-slow" />
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-secondary shadow-[0_0_15px_rgba(233,195,73,0.25)] bg-[#1A1C1C] transition-transform duration-300 group-hover/avatar:scale-105">
              <img
                src="profile2.png"
                alt="Anderson Marumoto Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold font-display text-white leading-tight">Anderson Marumoto</h1>
          <p className="text-secondary text-xs font-bold uppercase tracking-widest mt-1">{t("cvisita.badge")}</p>
          <p className="text-[#c4c7c7] text-xs mt-3 leading-relaxed max-w-xs mx-auto">
            {t("cvisita.desc")}
          </p>
        </div>

        {/* Action / Navigation Buttons - Cascaded entrance animation */}
        <div className="space-y-3">
          {socialLinks.map((link, index) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between gap-4 glass-card text-white p-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] ${link.hoverClass} group transform ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 transition-colors group-hover:bg-white/10">
                  {link.icon}
                </div>
                <span className="text-sm font-semibold tracking-wide">{link.platform} Oficial</span>
              </div>
              <span className="text-secondary group-hover:translate-x-1 transition-transform text-xs font-bold tracking-wider uppercase">{t("cvisita.talkOfficial")}</span>
            </a>
          ))}

          <a
            href="tel:+5511958396939"
            className={`flex items-center justify-between gap-4 glass-card text-white p-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-amber-500/40 hover:bg-amber-500/5 hover:text-amber-400 group transform ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: `${socialLinks.length * 80}ms` }}
          >
            <div className="flex items-center space-x-3.5">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 transition-colors group-hover:bg-white/10">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold tracking-wide">{t("cvisita.directCall")}</span>
            </div>
            <span className="text-secondary group-hover:translate-x-1 transition-transform text-xs font-bold tracking-wider uppercase">{t("cvisita.callNow")}</span>
          </a>

          <a
            href="/"
            className={`flex items-center justify-between gap-4 bg-secondary text-black p-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-secondary-fixed group transform ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: `${(socialLinks.length + 1) * 80}ms` }}
          >
            <div className="flex items-center space-x-3.5">
              <div className="p-2.5 rounded-xl bg-black/5 text-black border border-black/5">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold tracking-wide">{t("cvisita.officialWeb")}</span>
            </div>
            <span className="text-black group-hover:translate-x-1 transition-transform text-xs font-extrabold tracking-wider uppercase">{t("cvisita.visit")}</span>
          </a>
        </div>

        {/* Feedback / Evaluation Wizard (Otimizado Mobile) */}
        <div className="glass-card rounded-3xl p-6 shadow-2xl relative border border-secondary/10 overflow-hidden">
          
          {/* Progress bar */}
          <div className="w-full mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                {language === "pt" ? `Etapa ${avaliacaoStep} de 3` : `Step ${avaliacaoStep} of 3`}
              </span>
              <span className="text-[9px] font-extrabold text-secondary tracking-widest uppercase">
                {avaliacaoStep === 1 && (language === "pt" ? "Nota & Tipo" : "Rating & Type")}
                {avaliacaoStep === 2 && (language === "pt" ? "Mensagem" : "Message")}
                {avaliacaoStep === 3 && (language === "pt" ? "Envio" : "Submit")}
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-secondary via-amber-400 to-secondary transition-all duration-500 ease-out"
                style={{ width: `${(avaliacaoStep / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Wizard with slide effect */}
          <div className="w-full overflow-hidden relative">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${(avaliacaoStep - 1) * 100}%)` }}
            >
              
              {/* ETAPA 1: Estrelas e Tipo de Feedback */}
              <div className="w-full flex-shrink-0 px-0.5 space-y-6">
                <div className="text-center space-y-1">
                  <h2 className="text-lg font-bold font-display text-white">{t("cvisita.feedback.title")}</h2>
                  <p className="text-[#c4c7c7] text-xs leading-relaxed">
                    {t("cvisita.feedback.desc")}
                  </p>
                </div>

                {/* Stars container */}
                <div className="flex flex-col items-center justify-center p-4 bg-white/3 border border-white/5 rounded-2xl relative">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                    {t("cvisita.feedback.steps.stars")}
                  </h3>
                  <div className="flex justify-center gap-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Star
                        key={num}
                        className={`w-9 h-9 cursor-pointer transition-all duration-200 transform hover:scale-125 ${
                          num <= estrelas 
                            ? 'fill-secondary text-secondary drop-shadow-[0_0_8px_rgba(233,195,73,0.4)]' 
                            : 'text-gray-700 hover:text-secondary/50'
                        }`}
                        onClick={() => setEstrelas(num)}
                      />
                    ))}
                  </div>
                </div>

                {/* Touch Feedback Type Selection Pills */}
                <div className="space-y-2">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">
                    {language === "pt" ? "Como você classifica seu feedback? *" : "How do you classify your feedback? *"}
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {feedbackTipos.map((tipo) => {
                      const isActive = feedbackTipo === tipo.id;
                      return (
                        <button
                          key={tipo.id}
                          type="button"
                          onClick={() => setFeedbackTipo(tipo.id)}
                          className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-bold transition-all duration-300 ${
                            isActive 
                              ? "bg-secondary text-black border-secondary shadow-lg shadow-secondary/15 scale-[1.03]" 
                              : "bg-white/3 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                          }`}
                        >
                          <div className={isActive ? "text-black" : "text-secondary"}>
                            {tipo.icon}
                          </div>
                          <span>{tipo.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={estrelas === 0 || !feedbackTipo}
                  className={`w-full py-3.5 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                    estrelas > 0 && feedbackTipo
                      ? "bg-secondary text-black hover:scale-[1.01]" 
                      : "bg-[#1A1C1C] text-gray-500 cursor-not-allowed border border-white/5"
                  }`}
                >
                  <span>{language === "pt" ? "Avançar" : "Continue"}</span>
                </button>
              </div>

              {/* ETAPA 2: Mensagem / Comentário por escrito */}
              <div className="w-full flex-shrink-0 px-0.5 space-y-6">
                <div className="flex items-center justify-between border-b border-[#444748]/10 pb-3">
                  <h2 className="text-base font-bold font-display text-white">{t("cvisita.feedback.steps.msgTitle")}</h2>
                  <button onClick={handlePrevStep} className="text-[#c4c7c7] hover:text-white flex items-center text-xs transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" /> {t("cvisita.feedback.steps.back")}
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                    {language === "pt" ? "Deixe sua opinião por escrito *" : "Write your review *"}
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/20 transition-all resize-none placeholder:text-gray-600"
                    placeholder={t("cvisita.feedback.steps.feedbackPlaceholder")}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!feedback.trim()}
                  className={`w-full py-3.5 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                    feedback.trim()
                      ? "bg-secondary text-black hover:scale-[1.01]" 
                      : "bg-[#1A1C1C] text-gray-500 cursor-not-allowed border border-white/5"
                  }`}
                >
                  <span>{language === "pt" ? "Avançar" : "Continue"}</span>
                </button>
              </div>

              {/* ETAPA 3: Identificação & LGPD Consent */}
              <form onSubmit={handleSubmit} className="w-full flex-shrink-0 px-0.5 space-y-5">
                <div className="flex items-center justify-between border-b border-[#444748]/10 pb-3">
                  <h2 className="text-base font-bold font-display text-white">{t("cvisita.feedback.steps.idTitle")}</h2>
                  <button type="button" onClick={handlePrevStep} className="text-[#c4c7c7] hover:text-white flex items-center text-xs transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" /> {t("cvisita.feedback.steps.back")}
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">{t("cvisita.feedback.steps.name")}</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/20 transition-all"
                      placeholder={t("cvisita.feedback.steps.namePlaceholder")}
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">{t("cvisita.feedback.steps.phone")}</label>
                    <input
                      type="tel"
                      required
                      className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/20 transition-all"
                      placeholder={t("cvisita.feedback.steps.phonePlaceholder")}
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">{t("cvisita.feedback.steps.email")}</label>
                    <input
                      type="email"
                      className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/20 transition-all"
                      placeholder={t("cvisita.feedback.steps.emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Integrated LGPD box */}
                <div className="bg-[#0C0F0F] p-3 border border-[#444748]/20 rounded-xl flex items-start space-x-2.5">
                  <input
                    id="lgpd"
                    type="checkbox"
                    checked={lgpd}
                    onChange={(e) => setLgpd(e.target.checked)}
                    className="mt-1.5 accent-secondary cursor-pointer h-4 w-4 rounded-md flex-shrink-0"
                  />
                  <label htmlFor="lgpd" className="text-[10px] leading-relaxed text-justify cursor-pointer select-none text-[#c4c7c7]">
                    {t("cvisita.feedback.steps.lgpdText")}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!lgpd}
                  className={`w-full py-3.5 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                    lgpd 
                      ? "bg-secondary text-black shadow-lg shadow-secondary/15 hover:scale-[1.01]" 
                      : "bg-[#1A1C1C] text-gray-500 cursor-not-allowed border border-white/5"
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  {t("cvisita.feedback.steps.submit")}
                </button>
              </form>

            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-[10px] text-gray-600 text-center tracking-wide">
          &copy; {new Date().getFullYear()} Anderson Executive Transfers | {language === "pt" ? "Todos os direitos reservados." : "All rights reserved."}
        </p>
      </div>

      {/* QR Code Modal Overlay */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6">
          <div className="glass-card rounded-3xl p-8 max-w-sm w-full text-center space-y-6 border border-secondary/10 shadow-2xl">
            <div>
              <h3 className="text-xl font-bold font-display text-white">{t("cvisita.shareContact")}</h3>
              <p className="text-[#c4c7c7] text-xs mt-1">{t("cvisita.shareContactDesc")}</p>
            </div>
            
            <div className="bg-white p-5 rounded-2xl inline-block border border-gray-200 shadow-inner">
              <QRCodeSVG value={currentUrl} size={180} />
            </div>

            <div className="space-y-2 w-full">
              <button
                onClick={handleCopyLink}
                className="w-full py-3 bg-secondary text-black font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 hover:bg-secondary-fixed hover:scale-[1.01]"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? (language === "pt" ? "Link Copiado!" : "Link Copied!") : (language === "pt" ? "Copiar Link" : "Copy Link")}</span>
              </button>

              <button
                onClick={() => setShowQrModal(false)}
                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                {t("cvisita.closeQr")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert toast notification */}
      {showAlert && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-secondary text-black py-3.5 px-6 rounded-2xl shadow-2xl flex items-center space-x-2 font-bold text-xs uppercase tracking-wider z-50 animate-bounce">
          <ShieldCheck className="w-5 h-5" />
          <span>{t("cvisita.feedback.steps.success")}</span>
        </div>
      )}

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default LinkNaBio;