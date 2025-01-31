"use client";

import { FaShieldAlt, FaClock, FaRegUser, FaTrophy, FaCogs, FaHandshake } from "react-icons/fa"; // Importando ícones
import Header from "../components/Header";
import WhatsAppButton from "../components/WhatsAppButton";
import Hero from "../components/Hero";
import ReviewSection from "../components/ReviewSection"; // Importe o componente ReviewSection
import Image from "next/image";

const Home: React.FC = () => {
  return (
    <div className="font-sans m-0 p-0">
      <Header />
      <Hero />

      {/* Tipos de Atendimento */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-gray-800 text-center">
            Tipos de Atendimento
          </h2>
          <p className="text-base sm:text-lg mb-12 text-gray-600 mx-auto max-w-4xl text-center">
            Oferecemos uma ampla gama de serviços de transporte, cuidadosamente adaptados às suas necessidades. Cada detalhe é planejado para garantir conforto, segurança e eficiência. Descubra a experiência única que preparamos para você.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-10">
            {[{
              src: "/airport-transfer.png",
              title: "Transfer Receptivo em Aeroportos",
              description: "Aproveite um serviço de transporte eficiente e pontual para chegadas e partidas em aeroportos. Incluímos recepção personalizada e assistência para garantir tranquilidade durante todo o trajeto.",
            },
            {
              src: "/beach-travel.png",
              title: "Atendimento em Litoral e Interior",
              description: "Ideal para férias ou escapadas rápidas, nosso transporte oferece segurança e conforto em viagens para o litoral ou interior. Relaxe enquanto cuidamos de cada detalhe do seu percurso.",
            },
            {
              src: "/executive.png",
              title: "Atendimento Executivo",
              description: "Para profissionais que exigem excelência, nosso atendimento executivo combina discrição e pontualidade com veículos de alto padrão, projetados para atender às suas necessidades.",
            },
            {
              src: "/tourism.png",
              title: "Recepção ao Turismo em São Paulo",
              description: "Explore São Paulo com um serviço especializado para turistas. Oferecemos transporte confortável para passeios culturais, compras e visitas às principais atrações da cidade.",
            }].map((card, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105">
                <Image
                  src={card.src}
                  alt={card.title}
                  width={400}
                  height={300}
                  className="w-full h-48 sm:h-56 object-cover mb-6 rounded-lg"
                />
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-base sm:text-lg text-justify">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Diferenciais do Atendimento */}
      <section className="py-16 text-black">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-black">
            Compromisso com a Excelência
          </h2>
          <p className="text-base sm:text-lg mb-12 text-center max-w-3xl mx-auto opacity-90">
            Cada viagem que planejo para você é pensada com o máximo cuidado, buscando sempre segurança, conforto e um atendimento excepcional. Conheça os diferenciais que tornam o meu serviço único e inesquecível:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                icon: <FaShieldAlt size={45} className="text-green-500" />,
                title: "Segurança em Primeiro Lugar",
                description: "Com a minha atenção constante à segurança, garanto que você viaje com total tranquilidade. Meus veículos passam por manutenções rigorosas e possuem monitoramento 24/7.",
              },
              {
                icon: <FaClock size={45} className="text-orange-500" />,
                title: "Pontualidade Garantida",
                description: "Seu tempo é precioso para mim. Me comprometo a ser pontual, com o objetivo de você cumprir sua agenda sem contratempos ou atrasos.",
              },
              {
                icon: <FaRegUser size={45} className="text-blue-500" />,
                title: "Total Discrição",
                description: "Eu entendo a importância da sua privacidade. Ofereço um atendimento discreto e profissional, seja para viagens pessoais ou corporativas.",
              },
              {
                icon: <FaTrophy size={45} className="text-red-500" />,
                title: "Profissionalismo",
                description: "Com ampla experiência, meu compromisso é entregar um serviço impecável, sempre atento aos detalhes e com o mais alto padrão de cortesia e respeito.",
              },
              {
                icon: <FaCogs size={45} className="text-purple-500" />,
                title: "Conforto e Qualidade",
                description: "Os meus veículos são equipados com o que há de melhor para garantir a sua experiência mais confortável e sofisticada durante toda a viagem.",
              },
              {
                icon: <FaHandshake size={45} className="text-indigo-500" />,
                title: "Atendimento Personalizado",
                description: "Para mim, cada cliente é único. Por isso, ofereço um atendimento totalmente sob medida, focado em atender todas as suas expectativas e necessidades.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 shadow-md">
                    {item.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 ml-4">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-base sm:text-lg text-justify">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chamando o Componente de Avaliações */}
      <ReviewSection />
      {/* Galeria */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800">
            Galeria
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {["/gallery1.jpg", "/gallery2.jpg", "/gallery3.jpg", "/gallery4.jpg"].map((src, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                <Image
                  src={src}
                  alt={`Viagem ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-72 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold">
                    Viagem {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Botão Flutuante de WhatsApp */}
      <WhatsAppButton />

      {/* Rodapé */}
      <footer className="py-10 bg-gray-800 text-white text-center">
        <p>
          &copy; {new Date().getFullYear()} Anderson Marumoto - Todos os Direitos
          Reservados.
        </p>
      </footer>
    </div>
  );
};

export default Home;
