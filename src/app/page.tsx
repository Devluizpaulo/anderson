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

      {/* Qualidades do Atendimento */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-gray-800 text-center">
            Qualidades do Atendimento
          </h2>
          <p className="text-base sm:text-lg mb-12 text-gray-600 mx-auto max-w-4xl text-center">
            No meu serviço de transporte, prezo pela excelência e pelo conforto de cada cliente. Cada viagem é pensada para proporcionar uma experiência única, com atenção aos mínimos detalhes e com um serviço que faz você se sentir especial. Conheça as qualidades que faço questão de oferecer em cada atendimento:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
            {[{
              icon: <FaShieldAlt size={40} color="#4CAF50" />,
              title: "Segurança",
              description: "Eu me preocupo com sua segurança acima de tudo. Com veículos revisados regularmente e monitoramento constante, você pode relaxar sabendo que está em boas mãos.",
            },
            {
              icon: <FaClock size={40} color="#FF9800" />,
              title: "Pontualidade",
              description: "A pontualidade é essencial para mim. Eu me esforço para estar sempre no horário combinado, para que você nunca tenha que se preocupar com atrasos em seus compromissos.",
            },
            {
              icon: <FaRegUser size={40} color="#2196F3" />,
              title: "Discrição",
              description: "Seja para viagens executivas ou pessoais, sei como é importante preservar a sua privacidade. Eu mantenho a discrição em todas as situações, garantindo que sua viagem seja tranquila e sem interrupções.",
            },
            {
              icon: <FaTrophy size={40} color="#FF5722" />,
              title: "Profissionalismo",
              description: "Com muitos anos de experiência, minha missão é oferecer um serviço profissional de alta qualidade, sempre atento às suas necessidades, com respeito e cordialidade.",
            },
            {
              icon: <FaCogs size={40} color="#9C27B0" />,
              title: "Conforto",
              description: "Proporciono uma experiência confortável em cada viagem. Meus veículos são equipados com itens de luxo para garantir que você viaje com todo o conforto que merece.",
            },
            {
              icon: <FaHandshake size={40} color="#3F51B5" />,
              title: "Atendimento Personalizado",
              description: "Cada cliente é único. Por isso, personalizo o atendimento de acordo com suas preferências, oferecendo um serviço sob medida para garantir a sua satisfação.",
            }].map((quality, index) => (
              <div key={index} className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="flex items-center mb-4">
                  {quality.icon}
                  <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 ml-4">
                    {quality.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-base sm:text-lg text-justify">
                  {quality.description}
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
