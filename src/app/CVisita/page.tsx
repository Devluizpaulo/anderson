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
  Send 
} from 'lucide-react';
import { db, addDoc, collection } from '../../services/firebase';
import { QRCodeSVG } from 'qrcode.react';

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
  const [currentUrl, setCurrentUrl] = useState("https://andersonexecutivo.com.br");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleNextStep = () => {
    if (avaliacaoStep === 2 && (!nome || !telefone)) {
      alert("Por favor, preencha seu nome e telefone antes de prosseguir.");
      return;
    }
    if (avaliacaoStep === 3 && (!feedback || estrelas === 0)) {
      alert("Por favor, deixe seu comentário e selecione uma nota de estrelas.");
      return;
    }
    setAvaliacaoStep(avaliacaoStep + 1);
  };

  const handlePrevStep = () => {
    if (avaliacaoStep > 1) {
      setAvaliacaoStep(avaliacaoStep - 1);
    }
  };

  const handleSubmit = async () => {
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
        alert("Erro ao enviar avaliação. Tente novamente.");
      }
    } else {
      alert("Por favor, aceite os termos da LGPD antes de enviar!");
    }
  };

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Anderson Marumoto
ORG:Anderson Executive Transfers
TITLE:Motorista Executivo Privado
TEL;TYPE=CELL,VOICE:+5511958396939
EMAIL;TYPE=PREF,INTERNET:contato@andersonexecutivo.com.br
URL:https://andersonexecutivo.com.br
NOTE:Frota Executiva Blindada - Toyota Corolla Cross Black Edition.
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

  const socialLinks = [
    {
      platform: "WhatsApp",
      url: "https://wa.me/+5511958396939?text=Olá Anderson, salvei seu contato digital!",
      icon: <Phone className="w-5 h-5" />,
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/andersonexecutivo",
      icon: <Instagram className="w-5 h-5" />,
    },
    {
      platform: "Facebook",
      url: "https://facebook.com/andersonexecutivo",
      icon: <Facebook className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-[#0C0F0F] font-body">
      {/* Background glowing effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Profile Card */}
        <div className="glass-card rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden border border-secondary/10">
          <div className="absolute top-3 right-3 flex space-x-2">
            <button
              onClick={() => setShowQrModal(true)}
              title="Mostrar Código QR"
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-secondary transition-all hover:scale-105"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              onClick={downloadVCard}
              title="Salvar Contato"
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-secondary transition-all hover:scale-105"
            >
              <UserPlus className="w-4 h-4" />
            </button>
          </div>

          <div className="relative w-28 h-28 rounded-full mx-auto mb-4 border-4 border-secondary shadow-xl overflow-hidden bg-[#1A1C1C]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcPoa9LVsKkg4gx5eyc01DyOwEcW8QXwlJ_kbQpbE_vm0vI0z3NrK-AAJdfgOf5SWB0OiY1X2QSFzC1ivp5L22Y4VFudVeOqhhf_UAxhPdLiF8Vl8iOhTt1a4g1eeSQSWGqL6schVo75LWu0xyrAjzC7S3528v3wtMABoHx2_qWZQNkQLeKjM9KM2hqW8kQYIOz4D5GA9J5gn2ECo-nVWUF9ZmZQR-dT-juHkoeeqIl9_4vqAnLnz27UowkNdrPltxIBk6YLou0R4"
              alt="Anderson Marumoto Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold font-display text-white leading-tight">Anderson Marumoto</h1>
          <p className="text-secondary text-xs font-bold uppercase tracking-widest mt-1">Motorista Executivo Privado</p>
          <p className="text-[#c4c7c7] text-xs mt-3 leading-relaxed max-w-xs mx-auto">
            Frota blindada premium, transfers receptivos de aeroportos e viagens interestaduais. Segurança e requinte sob medida.
          </p>
        </div>

        {/* Action / Navigation Buttons */}
        <div className="space-y-3">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 glass-card text-white p-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-secondary/30 hover:bg-[#1A1C1C]/25 group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-2.5 rounded-xl bg-white/5 text-secondary border border-white/5 group-hover:text-secondary-fixed">
                  {link.icon}
                </div>
                <span className="text-sm font-semibold tracking-wide">{link.platform} Oficial</span>
              </div>
              <span className="text-secondary group-hover:translate-x-1 transition-transform text-xs font-bold tracking-wider uppercase">Falar Conosco &rarr;</span>
            </a>
          ))}

          <a
            href="tel:+5511958396939"
            className="flex items-center justify-between gap-4 glass-card text-white p-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-secondary/30 hover:bg-[#1A1C1C]/25 group"
          >
            <div className="flex items-center space-x-3.5">
              <div className="p-2.5 rounded-xl bg-white/5 text-secondary border border-white/5">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold tracking-wide">Ligação Direta</span>
            </div>
            <span className="text-secondary group-hover:translate-x-1 transition-transform text-xs font-bold tracking-wider uppercase">Ligar Agora &rarr;</span>
          </a>

          <a
            href="/"
            className="flex items-center justify-between gap-4 bg-secondary text-black p-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-secondary-fixed group"
          >
            <div className="flex items-center space-x-3.5">
              <div className="p-2.5 rounded-xl bg-black/5 text-black border border-black/5">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold tracking-wide">Acessar Website Oficial</span>
            </div>
            <span className="text-black group-hover:translate-x-1 transition-transform text-xs font-extrabold tracking-wider uppercase">Visitar &rarr;</span>
          </a>
        </div>

        {/* Feedback / Evaluation Wizard */}
        <div className="glass-card rounded-3xl p-6 shadow-2xl relative border border-secondary/10">
          
          {avaliacaoStep === 1 && (
            <div className="text-center space-y-4">
              <h2 className="text-lg font-bold font-display text-white">Como foi sua experiência?</h2>
              <p className="text-[#c4c7c7] text-xs leading-relaxed">
                Seu feedback é fundamental para mantermos o nível máximo de excelência executiva nos nossos percursos.
              </p>
              <button
                onClick={handleNextStep}
                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-secondary font-bold text-sm rounded-xl transition hover:scale-[1.01]"
              >
                Avaliar Meu Atendimento
              </button>
            </div>
          )}

          {avaliacaoStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#444748]/10 pb-3">
                <h2 className="text-base font-bold font-display text-white">Identificação</h2>
                <button onClick={handlePrevStep} className="text-[#c4c7c7] hover:text-white flex items-center text-xs">
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Voltar
                </button>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Seu Nome Completo *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-secondary/50 transition"
                    placeholder="Ex: Carlos Silva"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">WhatsApp / Telefone *</label>
                  <input
                    type="tel"
                    required
                    className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-secondary/50 transition"
                    placeholder="Ex: (11) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">E-mail (Opcional)</label>
                  <input
                    type="email"
                    className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-secondary/50 transition"
                    placeholder="Ex: carlos@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={handleNextStep}
                className="w-full py-3 bg-secondary text-black font-bold text-xs uppercase tracking-wider rounded-xl transition"
              >
                Continuar
              </button>
            </div>
          )}

          {avaliacaoStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#444748]/10 pb-3">
                <h2 className="text-base font-bold font-display text-white">Sua Mensagem</h2>
                <button onClick={handlePrevStep} className="text-[#c4c7c7] hover:text-white flex items-center text-xs">
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Voltar
                </button>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Feedback Escrito *</label>
                  <textarea
                    rows={3}
                    required
                    className="w-full bg-[#0C0F0F] border border-[#444748]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-secondary/50 transition resize-none"
                    placeholder="Conte como foi sua experiência de transporte executivo..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>

                <div className="flex justify-between border border-[#444748]/20 rounded-xl p-3 bg-[#0C0F0F]">
                  {["Elogio", "Crítica", "Sugestão"].map((tipo) => (
                    <label key={tipo} className="flex items-center cursor-pointer text-xs select-none">
                      <input
                        type="radio"
                        className="mr-2 accent-secondary"
                        name="feedbackTipo"
                        value={tipo}
                        checked={feedbackTipo === tipo}
                        onChange={() => setFeedbackTipo(tipo)}
                      />
                      <span className={feedbackTipo === tipo ? "text-secondary font-bold" : "text-[#c4c7c7]"}>{tipo}</span>
                    </label>
                  ))}
                </div>

                <div className="border border-[#444748]/20 rounded-xl p-4 bg-[#0C0F0F] text-center">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Classificação por Estrelas *</h3>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Star
                        key={num}
                        className={`w-7 h-7 cursor-pointer transition ${
                          num <= estrelas ? 'fill-secondary text-secondary' : 'text-gray-700 hover:text-secondary/50'
                        }`}
                        onClick={() => setEstrelas(num)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleNextStep}
                className="w-full py-3 bg-secondary text-black font-bold text-xs uppercase tracking-wider rounded-xl transition"
              >
                Continuar
              </button>
            </div>
          )}

          {avaliacaoStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#444748]/10 pb-3">
                <h2 className="text-base font-bold font-display text-white">LGPD & Privacidade</h2>
                <button onClick={handlePrevStep} className="text-[#c4c7c7] hover:text-white flex items-center text-xs">
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Voltar
                </button>
              </div>

              <div className="bg-[#0C0F0F] p-4 border border-[#444748]/20 rounded-2xl flex items-start space-x-3">
                <input
                  id="lgpd"
                  type="checkbox"
                  checked={lgpd}
                  onChange={(e) => setLgpd(e.target.checked)}
                  className="mt-1.5 accent-secondary cursor-pointer h-4 w-4 rounded-md"
                />
                <label htmlFor="lgpd" className="text-[11px] leading-relaxed text-justify cursor-pointer select-none text-[#c4c7c7]">
                  Aceito a <span className="font-semibold text-secondary">Política de Privacidade</span> e autorizo a utilização do meu feedback e nome no site institucional, em conformidade com as diretrizes da <span className="font-semibold text-secondary">LGPD (Lei Geral de Proteção de Dados)</span>.
                </label>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!lgpd}
                className={`w-full py-3.5 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 ${
                  lgpd 
                    ? "bg-secondary text-black shadow-lg shadow-secondary/10" 
                    : "bg-[#1A1C1C] text-gray-500 cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4" />
                Enviar Depoimento
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <p className="text-[10px] text-gray-600 text-center tracking-wide">
          &copy; {new Date().getFullYear()} Anderson Executive Transfers | Todos os direitos reservados.
        </p>
      </div>

      {/* QR Code Modal Overlay */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6">
          <div className="glass-card rounded-3xl p-8 max-w-sm w-full text-center space-y-6 animate-in fade-in zoom-in-95 duration-200 border border-secondary/10">
            <div>
              <h3 className="text-xl font-bold font-display text-white">Compartilhar Contato</h3>
              <p className="text-[#c4c7c7] text-xs mt-1">Escaneie para acessar o cartão de visitas digital instantaneamente.</p>
            </div>
            
            <div className="bg-white p-5 rounded-2xl inline-block border border-gray-200 shadow-inner">
              <QRCodeSVG value={currentUrl} size={180} />
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
            >
              Fechar Código QR
            </button>
          </div>
        </div>
      )}

      {/* Alert toast notification */}
      {showAlert && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-secondary text-black py-3.5 px-6 rounded-2xl shadow-2xl flex items-center space-x-2 font-bold text-xs uppercase tracking-wider z-50 animate-bounce">
          <ShieldCheck className="w-5 h-5" />
          <span>Avaliação enviada com sucesso!</span>
        </div>
      )}
    </div>
  );
}

export default LinkNaBio;