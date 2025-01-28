"use client";

import React, { useState } from 'react';
import { Star, Instagram, Facebook, Twitter } from 'lucide-react';
import { db, addDoc, collection } from '../../services/firebase';
import Image from 'next/image';

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

  const handleNextStep = () => {
    setAvaliacaoStep(avaliacaoStep + 1);
  };

  const handleSubmit = async () => {
    if (nome && telefone && estrelas && lgpd && feedback) {
      const avaliacao = {
        nome,
        telefone,
        email,
        feedback,
        feedbackTipo,
        estrelas,
        lgpd,
        timestamp: new Date(),
      };

      try {
        await addDoc(collection(db, "avaliacoes"), avaliacao);
        setShowAlert(true);
        setTimeout(() => {
          setAvaliacaoStep(1);
          setShowAlert(false);
          // Reset form
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
      }
    } else {
      alert("Por favor, preencha todos os campos obrigatórios!");
    }
  };

  const socialLinks = [
    {
      platform: "instagram",
      url: "https://instagram.com/yourusername",
      icon: <Instagram className="w-6 h-6" />,
    },
    {
      platform: "facebook",
      url: "https://facebook.com/yourusername",
      icon: <Facebook className="w-6 h-6" />,
    },
    {
      platform: "twitter",
      url: "https://twitter.com/yourusername",
      icon: <Twitter className="w-6 h-6" />,
    },
  ];

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-8"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2560')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/perfil.png" // Certifique-se de que a imagem está na pasta public
            alt="Profile"
            width={128} // Defina a largura
            height={128} // Defina a altura
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
          />
          <h1 className="text-4xl font-bold text-white mb-2">Anderson</h1>
          <p className="text-white/90">Siga-me nas redes sociais</p>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white py-3 px-4 rounded-xl 
                shadow-xl transform transition duration-300 hover:scale-105 hover:bg-white hover:text-black
                border border-white/20 hover:border-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Feedback Form Steps */}
        {avaliacaoStep === 1 && (
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Como foi sua experiência?</h2>
            <p className="mb-6">Compartilhe sua opinião conosco</p>
            <button
              onClick={handleNextStep}
              className="w-full px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Avaliar Agora
            </button>
          </div>
        )}

        {avaliacaoStep === 2 && (
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Seus Dados</h2>
            <input
              type="text"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              placeholder="Seu Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="tel"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              placeholder="Seu Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
            <input
              type="email"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              placeholder="Seu E-mail (opcional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleNextStep}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg"
            >
              Próxima Etapa
            </button>
          </div>
        )}

        {avaliacaoStep === 3 && (
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Seu Feedback</h2>
            <textarea
              className="w-full p-4 mb-4 border border-gray-300 rounded-lg h-32"
              placeholder="Deixe sua mensagem aqui..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="flex justify-between mb-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  className="mr-2"
                  name="feedbackTipo"
                  value="Elogio"
                  onChange={() => setFeedbackTipo("Elogio")}
                />
                <span className="text-gray-700">Elogio</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  className="mr-2"
                  name="feedbackTipo"
                  value="Crítica"
                  onChange={() => setFeedbackTipo("Crítica")}
                />
                <span className="text-gray-700">Crítica</span>
              </label>
            </div>
            <div className="mb-6">
              <h3 className="text-lg mb-2 text-gray-800">Classificação</h3>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Star
                    key={num}
                    className={`w-8 h-8 cursor-pointer transition-colors ${num <= estrelas ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    onClick={() => setEstrelas(num)}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={handleNextStep}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg"
            >
              Próxima Etapa
            </button>
          </div>
        )}

        {avaliacaoStep === 4 && (
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">LGPD</h2>
            <div className="flex items-start mb-6">
              <input
                type="checkbox"
                checked={lgpd}
                onChange={(e) => setLgpd(e.target.checked)}
                className="mt-1 mr-3"
              />
              <span className="text-gray-600 text-sm">
                Aceito a <span className="font-semibold">política de privacidade</span> e
                concordo com o uso da minha <span className="font-semibold">opinião</span> e o
                armazenamento dos meus dados, seguindo as normas da <span className="font-semibold">LGPD</span>.
              </span>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg"
            >
              Enviar Avaliação
            </button>
          </div>
        )}

        {showAlert && (
          <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-full shadow-lg">
            <p>Avaliação enviada com sucesso!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LinkNaBio;