import React from "react";
import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <section className="relative flex flex-col sm:flex-row items-center mt-20 w-full bg-gray-900 text-white">
      {/* Imagem no lado esquerdo */}
      <div className="w-full sm:w-1/3 h-64 sm:h-auto flex-shrink-0">
        <Image
          src="/taxi-hero.jpg"
          alt="Imagem de um táxi premium em São Paulo"
          width={600}
          height={500}
          className="w-full object-cover rounded-md"
          priority // Carregamento prioritário para melhorar o LCP
        />
      </div>

      {/* Texto no lado direito */}
      <div className="w-full sm:w-2/3 flex flex-col justify-center px-6 lg:px-12 py-6 sm:py-0">
        <h1 className="text-lg sm:text-xl lg:text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
          Exclusividade e Sofisticação em Transfers
        </h1>
        <p className="text-sm sm:text-base lg:text-lg mb-3 leading-relaxed text-justify sm:text-left">
          Ofereço um serviço executivo de alto padrão para que você viaje com conforto, pontualidade e segurança. Seja para compromissos profissionais, passeios ou traslados especiais, estou aqui para garantir a melhor experiência em cada trajeto.</p>
        <p className="text-sm sm:text-base lg:text-lg mb-5 leading-relaxed text-justify sm:text-left">
          Atendimento personalizado, veículos de luxo e uma experiência única para tornar cada viagem impecável.
        </p>
        <a
          href="https://wa.me/+5511958396939"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block py-2 px-5 bg-yellow-400 text-black rounded-full text-xs sm:text-sm font-bold shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
        >
          Reserve Agora Sua Experiência
        </a>
      </div>

    </section>
  );
};

export default Hero;
