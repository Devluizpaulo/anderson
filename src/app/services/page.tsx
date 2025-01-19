"use client";

import Link from "next/link";
import Header from "../../components/Header";  // ajuste o caminho conforme necessário
import React from "react";
import Image from "next/image";  // Importando o componente Image
import { FaArrowLeft } from "react-icons/fa";

const Services: React.FC = () => {
  return (
    <main className="bg-gray-50">

      <Header />

      {/* Tipos de Atendimento */}
      <section id="services" className="mt-16 py-16 bg-gray-50">  {/* Adicionando o mt-16 para maior espaçamento */}
        <div className="container mx-auto px-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-gray-800 text-center">
            Tipos de Atendimento
          </h2>
          <p className="text-base sm:text-lg mb-12 text-gray-600 mx-auto max-w-4xl text-center">
            Oferecemos uma ampla gama de serviços de transporte, cuidadosamente adaptados às suas necessidades. Cada detalhe é planejado para garantir conforto, segurança e eficiência. Descubra a experiência única que preparamos para você.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">

            {/* Card 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105">
              <Image
                src="/airport-transfer.png"
                alt="Transfer Receptivo em Aeroportos"
                width={500} // Ajuste a largura conforme necessário
                height={300} // Ajuste a altura conforme necessário
                className="w-full h-48 sm:h-56 object-cover mb-6 rounded-lg"
              />
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">
                Transfer Receptivo em Aeroportos
              </h3>
              <p className="text-gray-600 text-base sm:text-lg text-justify">
                Aproveite um serviço de transporte eficiente e pontual para chegadas e partidas em aeroportos. Incluímos recepção personalizada e assistência para garantir tranquilidade durante todo o trajeto. Nossa equipe de motoristas está sempre pronta para oferecer o melhor atendimento.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105">
              <Image
                src="/beach-travel.png"
                alt="Atendimento em Litoral e Interior"
                width={500}
                height={300}
                className="w-full h-48 sm:h-56 object-cover mb-6 rounded-lg"
              />
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">
                Atendimento em Litoral e Interior
              </h3>
              <p className="text-gray-600 text-base sm:text-lg text-justify">
                Ideal para férias ou escapadas rápidas, nosso transporte oferece segurança e conforto em viagens para o litoral ou interior. Relaxe enquanto cuidamos de cada detalhe do seu percurso, seja para uma viagem de negócios ou lazer. Garantimos um transporte pontual e sem preocupações.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105">
              <Image
                src="/executive.png"
                alt="Atendimento Executivo"
                width={500}
                height={300}
                className="w-full h-48 sm:h-56 object-cover mb-6 rounded-lg"
              />
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">
                Atendimento Executivo
              </h3>
              <p className="text-gray-600 text-base sm:text-lg text-justify">
                Para profissionais que exigem excelência, nosso atendimento executivo combina discrição e pontualidade com veículos de alto padrão, projetados para atender às suas necessidades. Se você busca conforto e eficiência para suas reuniões ou viagens de negócios, temos a solução perfeita para você.
              </p>
            </div>
            {/* Card 4 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105">
              <Image
                src="/tourism.png"
                alt="Recepção ao Turismo em São Paulo"
                width={500}
                height={300}
                className="w-full h-48 sm:h-56 object-cover mb-6 rounded-lg"
              />
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">
                Recepção ao Turismo em São Paulo
              </h3>
              <p className="text-gray-600 text-base sm:text-lg text-justify">
                Explore São Paulo com um serviço especializado para turistas. Oferecemos transporte confortável para passeios culturais, compras e visitas às principais atrações da cidade. Nossa equipe tem o conhecimento local para garantir que você aproveite ao máximo sua estadia na cidade.
              </p>
            </div>
          </div>
          <section>
            <div className="flex justify-end items-center mt-8">
              <Link href="/" className="text-black hover:text-gray-900 flex items-center">
                <FaArrowLeft className="text-gray-700 hover:text-gray-600" size={24} />
                <span className="ml-4">Voltar</span>
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Services;
