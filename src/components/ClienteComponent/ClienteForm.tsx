import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaAddressCard, FaPhoneAlt, FaSearch } from 'react-icons/fa';

interface Cliente {
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  cpf: string;
  whatsapp: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  cep: string;
}

interface ClienteFormProps {
  selectedClient?: Cliente;
}

const ClienteForm: React.FC<ClienteFormProps> = ({ selectedClient }) => {
  const [formData, setFormData] = useState<Cliente>({
    nome: '',
    sobrenome: '',
    email: '',
    telefone: '',
    cpf: '',
    whatsapp: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    pais: '',
    cep: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (selectedClient) {
      setFormData(selectedClient);
    }
  }, [selectedClient]);

  const buscarEndereco = async (cep: string) => {
    if (!cep || cep.length !== 8) {
      alert('Por favor, insira um CEP válido.');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      if (!response.ok) {
        throw new Error('Erro ao buscar o CEP');
      }

      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado.');
        return;
      }

      setFormData({
        ...formData,
        rua: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || '',
      });
    } catch (error) {
      console.error('Erro ao buscar o CEP:', error);
      alert('Erro ao buscar o CEP. Por favor, tente novamente.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Cliente salvo:', formData);
    setIsModalOpen(true);
  };

  return (
    <div className="relative">
      {/* Formulário */}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 space-y-6 max-w-5xl mx-auto transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Cadastro de Cliente</h2>

        {/* Dados Pessoais */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Dados Pessoais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="nome">
                <FaAddressCard className="absolute left-3 top-3 text-blue-500" />
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="shadow-sm border rounded-lg w-full py-3 px-12 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="sobrenome">
                Sobrenome
              </label>
              <input
                type="text"
                id="sobrenome"
                name="sobrenome"
                value={formData.sobrenome}
                onChange={handleChange}
                className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Dados de Contato */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Dados de Contato</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                <FaPhoneAlt className="absolute left-3 top-3 text-blue-500" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow-sm border rounded-lg w-full py-3 px-12 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="telefone">
                Telefone
              </label>
              <input
                type="text"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Endereço</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="cep">
                <FaSearch className="absolute left-3 top-3 text-blue-500" />
                CEP
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  id="cep"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  className="shadow-sm border rounded-lg w-full py-3 px-12 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => buscarEndereco(formData.cep)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
                >
                  Buscar
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="rua">
                Rua/Av.
              </label>
              <input
                type="text"
                id="rua"
                name="rua"
                value={formData.rua}
                onChange={handleChange}
                className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="numero">
                Número
              </label>
              <input
                type="text"
                id="numero"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="complemento">
                Complemento
              </label>
              <input
                type="text"
                id="complemento"
                name="complemento"
                value={formData.complemento}
                onChange={handleChange}
                className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="bairro">
                Bairro
              </label>
              <input
                type="text"
                id="bairro"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="cidade">
                Cidade
              </label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="estado">
                Estado
              </label>
              <input
                type="text"
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="pais">
                País
              </label>
              <input
                type="text"
                id="pais"
                name="pais"
                value={formData.pais}
                onChange={handleChange}
                className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Botão para salvar */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transform transition-all duration-300 hover:scale-105"
          >
            Salvar Cliente
          </button>
        </div>
      </form>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-80">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">Cliente Salvo</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimesCircle />
              </button>
            </div>
            <div className="mt-4 text-center">
              <FaCheckCircle className="text-green-500 text-4xl" />
              <p className="mt-2 text-lg">Os dados do cliente foram salvos com sucesso!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClienteForm;
