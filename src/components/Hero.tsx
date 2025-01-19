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
      <div className="w-full sm:w-2/3 flex flex-col justify-center px-6 lg:px-12 py-8 sm:py-0">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
          Táxi Premium em São Paulo
        </h1>
        <p className="text-base sm:text-lg lg:text-xl mb-4 leading-relaxed text-justify sm:text-left">
          Viaje com conforto e segurança com um serviço Premium. Transfers executivos, passeios turísticos e viagens para o interior, tudo personalizado para que sua experiência seja única.
        </p>
        <p className="text-base sm:text-lg lg:text-xl mb-6 leading-relaxed text-justify sm:text-left">
          Priorize seu conforto em todas as suas viagens com atendimento personalizado e excelência em cada detalhe.
        </p>
        <a
          href="https://wa.me/+5511958396939"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block py-3 px-6 bg-yellow-400 text-black rounded-full text-sm sm:text-lg font-bold shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
        >
          Agende Sua Viagem Agora
        </a>
      </div>

    </section>
  );
};

export default Hero;
