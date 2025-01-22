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
    <div
      className="flex flex-col items-center justify-center min-h-screen p-8"
      style={{
        backgroundImage: "url('/image.jpg')", // Coloque o caminho correto para sua imagem
        backgroundSize: "cover", // Ajusta a imagem para cobrir a tela
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", // Evita repetição da imagem
      }}
    >
      <h1 className="text-5xl sm:text-5xl font-semibold text-white mb-4">
        Siga-me nas redes sociais
      </h1>


      {/* Links de redes sociais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 w-full max-w-md">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-4 bg-white text-black py-2 px-4 rounded-full shadow-xl transform transition duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-black w-3/4 sm:w-auto hover:shadow-2xl hover:rotate-3"
        >
          <FaInstagram size={24} />
          <span className="font-semibold text-sm">Instagram</span>
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-4 bg-white text-black py-2 px-4 rounded-full shadow-xl transform transition duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-black w-3/4 sm:w-auto hover:shadow-2xl hover:rotate-3"
        >
          <FaFacebook size={24} />
          <span className="font-semibold text-sm">Facebook</span>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-4 bg-white text-black py-2 px-4 rounded-full shadow-xl transform transition duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-black w-3/4 sm:w-auto hover:shadow-2xl hover:rotate-3"
        >
          <FaTwitter size={24} />
          <span className="font-semibold text-sm">Twitter</span>
        </a>
      </div>

      {/* Card de Convite para Avaliação */}
      {avaliacaoStep === 1 && (
        <div className="bg-white p-6 rounded-xl shadow-2xl w-full sm:w-96 mb-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Como foi a sua experiência?</h2>
          <p className="text-gray-600 mb-4">
            Compartilhe sua opinião.
          </p>
          <button
            onClick={handleNextStep}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg w-full sm:w-auto"
          >
            Avaliar Agora
          </button>
        </div>
      )}

      {/* Exibição do alerta personalizado */}
      {showAlert && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-full shadow-lg text-center z-10">
          <p>Avaliação enviada com sucesso!</p>
        </div>
      )}

      {/* Formulário de Avaliação - Passo 1 */}
      {avaliacaoStep === 2 && (
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full sm:w-96 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Obrigado</h2>
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
      {avaliacaoStep === 3 && (
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full sm:w-5/12 mb-12">
          <h2 className="text-2xl font-semibold text-black mb-4 text-center">Seu Feedback</h2>
          <textarea
            className="w-full p-4 mb-4 border text-black border-gray-300 rounded-lg"
            placeholder="Obrigado pela sua atenção! Deixe sua mensagem aqui. (Ela pode ser exibida em meu PERFIL.)"
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
      {avaliacaoStep === 4 && (
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full sm:w-96 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">IMPORTANTE</h2>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={lgpd}
              onChange={(e) => setLgpd(e.target.checked)}
              className="mr-2"
            />
            <span className="text-base text-justify text-gray-600">
              Eu aceito a <span className="font-semibold text-gray-800">política de privacidade</span> e concordo com o uso da minha <span className="font-semibold text-gray-800">opinião</span> e o armazenamento dos meus dados, seguindo as normas da <span className="font-semibold text-gray-800">LGPD</span>.
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
