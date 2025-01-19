"use client";

import { useState } from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaStar } from "react-icons/fa";
import { db, addDoc, collection } from "../../services/firebase"; // Certifique-se de importar corretamente

const LinkNaBio: React.FC = () => {
  const [avaliacaoStep, setAvaliacaoStep] = useState(1);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackTipo, setFeedbackTipo] = useState(""); // Variável para armazenar o tipo de feedback (Elogio ou Crítica)
  const [estrelas, setEstrelas] = useState(0);
  const [lgpd, setLgpd] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Novo estado para controlar o alerta

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
        feedbackTipo, // Incluindo o tipo de feedback
        estrelas,
        lgpd,
        timestamp: new Date(),
      };

      try {
        await addDoc(collection(db, "avaliacoes"), avaliacao);
        setShowAlert(true); // Exibe o alerta
        setTimeout(() => {
          window.location.href = "/"; // Redireciona para a home após 2 segundos
        }, 2000);
      } catch (error) {
        console.error("Erro ao enviar avaliação:", error);
      }
    } else {
      alert("Por favor, preencha todos os campos obrigatórios!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-800 to-black p-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 text-center tracking-tight animate__animated animate__fadeIn">
        Cartão de Visitas Virtual
        <span className="block mt-2 text-sm sm:text-xl font-light text-gray-300">
          Acesse todos os links e promoções!
        </span>
      </h1>

      {/* Links de redes sociais */}
      <div className="flex flex-col items-center gap-6 mb-12 w-full sm:w-auto">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-white text-black py-3 px-6 rounded-full shadow-xl transform transition duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-black w-3/4 sm:w-auto hover:shadow-2xl hover:rotate-3"
        >
          <FaInstagram size={28} />
          <span className="font-semibold">Instagram</span>
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-white text-black py-3 px-6 rounded-full shadow-xl transform transition duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-black w-3/4 sm:w-auto hover:shadow-2xl hover:rotate-3"
        >
          <FaFacebook size={28} />
          <span className="font-semibold">Facebook</span>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-white text-black py-3 px-6 rounded-full shadow-xl transform transition duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-black w-3/4 sm:w-auto hover:shadow-2xl hover:rotate-3"
        >
          <FaTwitter size={28} />
          <span className="font-semibold">Twitter</span>
        </a>
      </div>

      {/* Exibição do alerta personalizado */}
      {showAlert && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-full shadow-lg text-center z-10">
          <p>Avaliação enviada com sucesso!</p>
        </div>
      )}

      {/* Formulário de Avaliação - Passo 1 */}
      {avaliacaoStep === 1 && (
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full sm:w-96 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Avalie o Motorista
          </h2>
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
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg"
          >
            Próxima Etapa
          </button>
        </div>
      )}

      {/* Formulário de Avaliação - Passo 2 */}
      {avaliacaoStep === 2 && (
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full sm:w-96 mb-12">
          <h2 className="text-2xl font-semibold text-black mb-4 text-center">
            Seu Feedback
          </h2>
          <textarea
            className="w-full p-3 mb-4 border text-black border-gray-300 rounded-lg"
            placeholder="Deixe sua mensagem ao motorista"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <div className="flex justify-between mb-4">
            <label className="flex items-center text-black">
              <input
                type="radio"
                className="mr-2"
                name="feedbackTipo"
                value="Elogio"
                onChange={() => setFeedbackTipo("Elogio")}
              />
              Elogio
            </label>
            <label className="flex items-center text-black">
              <input
                type="radio"
                className="mr-2"
                name="feedbackTipo"
                value="Crítica"
                onChange={() => setFeedbackTipo("Crítica")}
              />
              Crítica
            </label>
          </div>
          <div className="mb-4">
            <h3 className="text-lg">Classificação</h3>
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <FaStar
                  key={num}
                  size={30}
                  color={num <= estrelas ? "yellow" : "gray"}
                  onClick={() => setEstrelas(num)}
                  className="cursor-pointer"
                />
              ))}
            </div>
          </div>
          <button
            onClick={handleNextStep}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg"
          >
            Próxima Etapa
          </button>
        </div>
      )}

      {/* Formulário de Avaliação - Passo 3 (LGPD) */}
      {avaliacaoStep === 3 && (
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full sm:w-96 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            LGPD
          </h2>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={lgpd}
              onChange={(e) => setLgpd(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">
              Eu aceito a política de privacidade e concordo com o uso dos meus dados.
            </span>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg"
          >
            Enviar Avaliação
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkNaBio;
