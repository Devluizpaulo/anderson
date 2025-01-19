import Image from "next/image";
import { FaInstagram, FaFacebook, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Header from "../../components/Header";

const AboutDriver = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {/* Cabeçalho */}
      <Header />

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Imagem de fundo (banner) */}
        <div className="relative">
          <Image
            src="/city-skyline.jpg" // Substitua pelo caminho da sua imagem de fundo
            alt="City Skyline"
            width={1500}
            height={400}
            className="w-full h-48 object-cover"
          />
          {/* Foto do motorista */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
            <Image
              src="/driver-profile.jpg" // Substitua pelo caminho da foto do motorista
              alt="Foto do Motorista"
              width={196}
              height={196}
              className="object-cover"
            />
          </div>
        </div>

        {/* Informações do motorista */}
        <div className="text-center mt-14 px-6 pb-8">
          <h1 className="text-2xl font-bold text-gray-800">João Carlos da Silva</h1>
          <p className="text-gray-500 text-sm mb-4">Motorista Executivo</p>
          <p className="text-gray-600 text-base leading-relaxed">
            João Carlos é um motorista experiente e dedicado a oferecer viagens seguras e confortáveis. 
            Com mais de 10 anos de experiência, ele garante profissionalismo, discrição e pontualidade em cada viagem.
          </p>
        </div>

        {/* Contato e redes sociais */}
        <div className="px-6 pb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Informações de Contato</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-gray-700">
              <FaPhoneAlt size={20} />
              <span>+55 11 99999-9999</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <FaEnvelope size={20} />
              <span>contato@seumotorista.com.br</span>
            </div>
          </div>
        </div>

        {/* Redes Sociais */}
        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="https://www.instagram.com/seu_usuario"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-pink-500 hover:text-pink-400 transition-transform transform hover:scale-125"
          >
            <FaInstagram size={30} />
          </a>
          <a
            href="https://www.facebook.com/seu_usuario"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-blue-600 hover:text-blue-500 transition-transform transform hover:scale-125"
          >
            <FaFacebook size={30} />
          </a>
        </div>

        {/* Sobre o motorista */}
        <div className="px-6 pb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Sobre João Carlos</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Carteira de habilitação categoria B com cursos de direção defensiva.</li>
            <li>Especialista em transfers executivos e viagens para o interior.</li>
            <li>Veículo próprio de alto padrão, sempre limpo e higienizado.</li>
          </ul>
        </div>

        {/* Depoimento */}
        <div className="bg-gray-50 px-6 py-8 text-center">
          <p className="italic text-gray-600">
            “Viaje com segurança e conforto. João Carlos é a escolha ideal para sua jornada.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutDriver;
