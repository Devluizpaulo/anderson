import React from "react";
import Image from "next/image";
import { FaWhatsapp, FaShieldAlt } from "react-icons/fa";

const Hero: React.FC = () => {
  return (
    <section className="relative flex flex-col lg:flex-row items-center mt-20 w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white min-h-[500px] lg:min-h-[600px] overflow-hidden">
      {/* Background visual element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Imagem no lado esquerdo */}
      <div className="w-full lg:w-1/2 h-[300px] lg:h-[600px] flex-shrink-0 relative overflow-hidden">
        <Image
          src="/taxi-hero.jpg"
          alt="Imagem de um táxi premium em São Paulo"
          width={800}
          height={600}
          className="w-full h-full object-cover transition-transform duration-10000 hover:scale-105"
          priority // Carregamento prioritário para melhorar o LCP
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-950/90 hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent lg:hidden" />
        
        {/* Floating badge for safety */}
        <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center space-x-2 text-xs font-semibold tracking-wider text-yellow-500 uppercase">
          <FaShieldAlt className="text-yellow-500" />
          <span>Serviço 100% Premium</span>
        </div>
      </div>

      {/* Texto no lado direito */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 lg:py-0 relative z-10">
        <span className="text-xs uppercase tracking-widest font-extrabold text-yellow-500 mb-3 bg-yellow-500/10 px-3 py-1 rounded-full w-max">
          Serviço Executive Premium
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-white tracking-tight">
          Exclusividade e Sofisticação <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-600 font-black">
            em Transfers Executivos
          </span>
        </h1>
        <p className="text-gray-350 text-base lg:text-lg mb-6 leading-relaxed text-justify sm:text-left text-gray-300 max-w-xl">
          Oferecemos uma experiência de transporte executivo incomparável em São Paulo. 
          Viagens de negócios, transfers em aeroportos e deslocamentos privativos regidos com 
          conforto supremo, pontualidade britânica e total discrição que o seu perfil exige.
        </p>
        <p className="text-gray-350 text-sm lg:text-base mb-8 leading-relaxed text-justify sm:text-left text-gray-400 max-w-xl">
          Veículo executivo de última geração equipado com facilidades premium para que seu trajeto seja produtivo, seguro e extremamente relaxante.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <a
            href="https://wa.me/+5511958396939"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 py-3.5 px-8 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-black rounded-full text-sm font-extrabold shadow-lg shadow-yellow-500/20 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/30 hover:from-yellow-300 hover:to-yellow-400"
          >
            <FaWhatsapp size={18} />
            <span>Reserve Sua Corrida</span>
          </a>
          
          <a
            href="#services"
            className="text-sm font-bold hover:text-yellow-400 transition-colors py-2.5 px-4 text-gray-300 tracking-wide uppercase text-xs flex items-center group"
          >
            Conhecer Serviços
            <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-1 ml-1.5">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
