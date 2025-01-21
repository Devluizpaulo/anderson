import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaSmile, FaMicrophone } from "react-icons/fa";
import Image from "next/image"; // Importe o componente Image

const WhatsAppButton: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    // Mostrar popup por um curto período
    setShowPopup(true);
    const timer = setTimeout(() => {
      setShowPopup(false);
      setUnreadMessages(1);
    }, 4000); // Exibir popup por 4 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Mensagem Popup */}
      {showPopup && (
        <div
          className="fixed bottom-24 right-4 z-50 bg-white rounded-lg shadow-lg max-w-[90%] w-72 border border-gray-300 sm:w-80"
          onClick={() =>
            window.open("https://wa.me/+5511958396939", "_blank", "noopener,noreferrer")
          }
          style={{ cursor: "pointer" }}
        >
          {/* Cabeçalho */}
          <div className="flex items-center bg-green-600 text-white rounded-t-lg p-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
              {/* Substitua <img> por <Image /> */}
              <Image
                src="/perfil.png"
                alt="Foto do Atendente"
                className="w-full h-full object-cover"
                width={40} // Defina a largura e altura
                height={40}
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Anderson</p>
              <p className="text-xs">Online</p>
            </div>
          </div>

          {/* Corpo */}
          <div className="p-3 bg-gray-50">
            <p className="text-gray-700 text-sm">Olá! Como posso ajudá-lo?</p>
          </div>

          {/* Rodapé */}
          <div className="flex items-center border-t border-gray-200 bg-white p-2 space-x-2">
            <FaSmile className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Digite sua mensagem"
              className="flex-1 bg-gray-100 rounded-full px-4 py-1.5 outline-none text-sm"
              disabled
            />
            <FaMicrophone className="text-gray-400 w-5 h-5" />
          </div>
        </div>
      )}

      {/* Botão Flutuante de WhatsApp */}
      <a
        href="https://wa.me/+5511958396939"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 hover:shadow-xl transition-all duration-300 transform hover:scale-110 pulse sm:w-16 sm:h-16"
        title="Fale Conosco no WhatsApp"
      >
        <FaWhatsapp className="w-8 h-8 sm:w-7 sm:h-7" />
        {unreadMessages > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadMessages}
          </span>
        )}
      </a>

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .pulse {
          animation: pulse 1.8s infinite;
        }
      `}</style>
    </>
  );
};

export default WhatsAppButton;
