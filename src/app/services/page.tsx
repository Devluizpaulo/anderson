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
            Meu compromisso é oferecer um serviço de transporte personalizado, pensado para garantir sua comodidade, segurança e eficiência. Cada detalhe é planejado para que sua experiência seja impecável, seja em viagens de negócios, lazer ou compromissos especiais.
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
                Garanto um transporte eficiente e pontual para sua chegada ou partida no aeroporto. Estarei pronto para recebê-lo, auxiliando no que for necessário para que seu trajeto seja tranquilo e sem preocupações.  </p>
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
                Precisa viajar para o litoral ou interior? Cuido de tudo para que sua viagem seja segura e confortável. Seja para lazer ou compromissos profissionais, estou aqui para proporcionar um trajeto tranquilo e sem preocupações.
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
              <p className="text-gray-600 text-base sm:text-lg text-justify">Se você busca um transporte executivo que una discrição, pontualidade e conforto, eu tenho a solução ideal. Com um serviço de alto padrão, garanto que sua viagem de negócios ou reunião seja tranquila e eficiente.
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
                Descubra São Paulo com todo o conforto e segurança. Conheço a cidade como ninguém e estou pronto para guiá-lo pelos melhores pontos turísticos, passeios culturais e experiências únicas. Deixe que eu cuide do transporte enquanto você aproveita o que a cidade tem de melhor..
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
