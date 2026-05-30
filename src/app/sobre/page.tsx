import Image from "next/image";
import { FaInstagram, FaFacebook, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Header from "../../components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre o Motorista | Anderson Executive Transfers",
  description: "Saiba mais sobre Anderson Marumoto, motorista particular executivo profissional, oferecendo transfers de alta classe, segurança e discrição na região de São Paulo.",
};

const AboutDriver = () => {
  return (
    <div className="min-h-screen bg-[#0C0F0F] text-[#e2e2e2] py-10 font-body relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Cabeçalho */}
      <Header />

      <div className="max-w-4xl mx-auto glass-card rounded-3xl overflow-hidden mt-20 shadow-2xl relative border border-secondary/10">
        {/* Imagem de fundo (banner) */}
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src="/city-skyline.jpg"
            alt="São Paulo Skyline"
            fill
            className="object-cover opacity-40 transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F0F] to-transparent" />
          
          {/* Foto do motorista */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full overflow-hidden border-4 border-secondary shadow-xl">
            <Image
              src="/perfil.png"
              alt="Foto do Motorista"
              width={196}
              height={196}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Informações do motorista */}
        <div className="text-center mt-16 px-6 sm:px-12 pb-8">
          <span className="text-secondary text-xs font-bold tracking-[0.2em] uppercase block mb-2">Chauffeur Privado</span>
          <h1 className="text-3xl font-bold font-display text-white tracking-wide">Anderson Marumoto</h1>
          <p className="text-secondary/70 text-sm mt-1 uppercase font-semibold tracking-wider mb-6">Motorista Executivo Privado</p>
          <p className="text-[#c4c7c7] text-base leading-relaxed max-w-2xl mx-auto text-justify sm:text-center">
            Anderson Marumoto é especialista em transporte executivo privado de alto padrão. 
            Com foco em atendimento corporativo, transfers de aeroportos e viagens personalizadas, ele oferece 
            pontualidade impecável, máxima discrição e segurança de nível internacional para cada um de seus clientes.
          </p>
        </div>

        {/* Contato e redes sociais */}
        <div className="px-6 sm:px-12 pb-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#444748]/10 pt-8">
          <div className="space-y-4">
            <h2 className="text-lg font-bold font-display text-secondary mb-2 uppercase tracking-wide">Informações de Contato</h2>
            <div className="space-y-3 text-sm">
              <a href="tel:+5511958396939" className="flex items-center space-x-3 text-[#c4c7c7] hover:text-secondary transition-colors group">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-secondary/20">
                  <FaPhoneAlt className="text-secondary" />
                </div>
                <span>+55 (11) 95839-6939</span>
              </a>
              <a href="mailto:contato@andersonexecutivo.com.br" className="flex items-center space-x-3 text-[#c4c7c7] hover:text-secondary transition-colors group">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-secondary/20">
                  <FaEnvelope className="text-secondary" />
                </div>
                <span>contato@andersonexecutivo.com.br</span>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold font-display text-secondary mb-2 uppercase tracking-wide">Redes Sociais</h2>
            <div className="flex space-x-6">
              <a
                href="https://www.instagram.com/andersonexecutivo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-pink-500 hover:text-pink-400 transition-transform transform hover:scale-110 p-3 bg-white/5 rounded-full border border-white/10"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/andersonexecutivo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-blue-500 hover:text-blue-400 transition-transform transform hover:scale-110 p-3 bg-white/5 rounded-full border border-white/10"
              >
                <FaFacebook size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Diferenciais */}
        <div className="px-6 sm:px-12 pb-8 border-t border-[#444748]/10 pt-8">
          <h2 className="text-lg font-bold font-display text-secondary mb-4 uppercase tracking-wide">Diferenciais do Serviço</h2>
          <ul className="space-y-4 text-sm text-[#c4c7c7]">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
              Motorista bilíngue altamente treinado para atendimento a executivos estrangeiros e multinacionais.
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
              Habilitação profissional com cursos avançados de direção defensiva, evasiva e primeiros socorros.
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
              Frota blindada própria de altíssimo padrão (Toyota Corolla Cross Black Edition), equipada com Wi-Fi a bordo, água e mimos adicionais.
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
              Monitoramento em tempo real do tráfego e voos para antecipação de eventuais imprevistos.
            </li>
          </ul>
        </div>

        {/* Depoimento */}
        <div className="bg-[#1A1C1C] border-t border-[#444748]/20 px-6 sm:px-12 py-8 text-center">
          <p className="italic text-[#c4c7c7] font-medium text-lg leading-relaxed max-w-xl mx-auto">
            “Sua tranquilidade e segurança são a minha prioridade absoluta. Viaje com quem entende de exclusividade e sofisticação.”
          </p>
          <p className="text-secondary text-sm mt-2 font-bold uppercase tracking-wider">— Anderson Marumoto</p>
        </div>
      </div>
    </div>
  );
};

export default AboutDriver;
