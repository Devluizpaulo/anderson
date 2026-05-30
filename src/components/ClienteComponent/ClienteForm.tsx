import React, { useState, useEffect } from "react";
import { Cliente, Endereco } from "./types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { User, Mail, MapPin, Sparkles, Check, X, FileText } from "lucide-react";

interface ClienteFormProps {
  selectedClient: Cliente | null;
  onSubmit: (clientData: Omit<Cliente, "id">) => Promise<void>;
  onCancel: () => void;
}

const DEFAULT_ENDERECO: Endereco = {
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
  pais: "Brasil",
  cep: "",
};

export const ClienteForm: React.FC<ClienteFormProps> = ({
  selectedClient,
  onSubmit,
  onCancel,
}) => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState<Endereco>({ ...DEFAULT_ENDERECO });
  const [observacoes, setObservacoes] = useState("");
  const [isSearchingCep, setIsSearchingCep] = useState(false);

  // Carregar dados de edição
  useEffect(() => {
    if (selectedClient) {
      setNome(selectedClient.nome);
      setSobrenome(selectedClient.sobrenome);
      setEmail(selectedClient.email);
      setEndereco({ ...selectedClient.endereco });
      setObservacoes(selectedClient.observacoes || "");
    } else {
      setNome("");
      setSobrenome("");
      setEmail("");
      setEndereco({ ...DEFAULT_ENDERECO });
      setObservacoes("");
    }
  }, [selectedClient]);

  // Busca ViaCEP
  const buscarEnderecoPorCep = async (cepValue: string) => {
    const cleanCep = cepValue.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      setIsSearchingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setEndereco((prev) => ({
            ...prev,
            rua: data.logradouro || "",
            bairro: data.bairro || "",
            cidade: data.localidade || "",
            estado: data.uf || "",
            complemento: data.complemento || "",
            cep: data.cep || cepValue,
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
      } finally {
        setIsSearchingCep(false);
      }
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEndereco((prev) => ({ ...prev, cep: value }));
    buscarEnderecoPorCep(value);
  };

  const handleFieldChange = (field: keyof Endereco, value: string) => {
    setEndereco((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      alert("Por favor, preencha o nome do cliente.");
      return;
    }

    try {
      await onSubmit({
        nome: nome.trim(),
        sobrenome: sobrenome.trim(),
        email: email.trim(),
        endereco,
        observacoes: observacoes.trim(),
      });
    } catch (err) {
      alert("Ocorreu um erro ao processar o cadastro.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-black/30 border border-[#e9c349]/10 p-6 rounded-2xl space-y-6 shadow-xl">
        {/* Título e Status */}
        <div className="flex items-center space-x-2 border-b border-[#e9c349]/10 pb-3">
          <Sparkles className="w-5 h-5 text-[#e9c349]" />
          <h3 className="font-bold text-white text-sm uppercase tracking-wider">
            {selectedClient ? "Editar Cadastro" : "Novo Cliente"}
          </h3>
        </div>

        {/* Nome e Sobrenome */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-xs font-semibold text-[#c4c7c7]">
              Nome *
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">
                <User className="w-4 h-4 text-[#e9c349]" />
              </span>
              <Input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: João"
                className="pl-9 bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sobrenome" className="text-xs font-semibold text-[#c4c7c7]">
              Sobrenome
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">
                <User className="w-4 h-4 text-gray-500" />
              </span>
              <Input
                id="sobrenome"
                type="text"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                placeholder="Ex: da Silva"
                className="pl-9 bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
              />
            </div>
          </div>
        </div>

        {/* E-mail */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-semibold text-[#c4c7c7]">
            E-mail do Cliente
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">
              <Mail className="w-4 h-4 text-gray-500" />
            </span>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: joao@empresa.com.br"
              className="pl-9 bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
            />
          </div>
        </div>

        {/* Endereço */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-white/5 pb-2">
            <MapPin className="w-4 h-4 text-[#e9c349]" />
            <span className="text-xs font-bold text-[#e2e2e2] uppercase tracking-wide">
              Endereço Frequente
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cep" className="text-xs font-semibold text-[#c4c7c7]">
                CEP
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">
                  <MapPin className="w-4 h-4 text-gray-500" />
                </span>
                <Input
                  id="cep"
                  type="text"
                  value={endereco.cep}
                  onChange={handleCepChange}
                  placeholder={isSearchingCep ? "Buscando..." : "Ex: 01310-100"}
                  className="pl-9 bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rua" className="text-xs font-semibold text-[#c4c7c7]">
                Rua / Logradouro
              </Label>
              <Input
                id="rua"
                type="text"
                value={endereco.rua}
                onChange={(e) => handleFieldChange("rua", e.target.value)}
                placeholder="Ex: Avenida Paulista"
                className="bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numero" className="text-xs font-semibold text-[#c4c7c7]">
                Número
              </Label>
              <Input
                id="numero"
                type="text"
                value={endereco.numero}
                onChange={(e) => handleFieldChange("numero", e.target.value)}
                placeholder="Ex: 1000"
                className="bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="complemento" className="text-xs font-semibold text-[#c4c7c7]">
                Comp. (Opcional)
              </Label>
              <Input
                id="complemento"
                type="text"
                value={endereco.complemento}
                onChange={(e) => handleFieldChange("complemento", e.target.value)}
                placeholder="Ex: Apto 12"
                className="bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
              />
            </div>

            <div className="col-span-2 sm:col-span-1 space-y-2">
              <Label htmlFor="bairro" className="text-xs font-semibold text-[#c4c7c7]">
                Bairro
              </Label>
              <Input
                id="bairro"
                type="text"
                value={endereco.bairro}
                onChange={(e) => handleFieldChange("bairro", e.target.value)}
                placeholder="Ex: Bela Vista"
                className="bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cidade" className="text-xs font-semibold text-[#c4c7c7]">
                Cidade
              </Label>
              <Input
                id="cidade"
                type="text"
                value={endereco.cidade}
                onChange={(e) => handleFieldChange("cidade", e.target.value)}
                className="bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estado" className="text-xs font-semibold text-[#c4c7c7]">
                Estado
              </Label>
              <Input
                id="estado"
                type="text"
                value={endereco.estado}
                onChange={(e) => handleFieldChange("estado", e.target.value)}
                className="bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
              />
            </div>

            <div className="col-span-2 sm:col-span-1 space-y-2">
              <Label htmlFor="pais" className="text-xs font-semibold text-[#c4c7c7]">
                País
              </Label>
              <Input
                id="pais"
                type="text"
                value={endereco.pais}
                onChange={(e) => handleFieldChange("pais", e.target.value)}
                className="bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
              />
            </div>
          </div>
        </div>

        {/* Observações */}
        <div className="space-y-2">
          <Label htmlFor="observacoes" className="text-xs font-semibold text-[#c4c7c7]">
            Observações ou Instruções Especiais
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">
              <FileText className="w-4 h-4 text-gray-500" />
            </span>
            <Textarea
              id="observacoes"
              rows={2}
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Ex: Passageiro corporativo sênior, prefere ar condicionado ameno e trajetos rápidos."
              className="pl-9 bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition resize-none"
            />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex space-x-3 border-t border-white/5 pt-4">
          <Button
            type="submit"
            className="flex-1 bg-[#e9c349] hover:bg-[#e9c349]/90 text-black font-extrabold py-5 rounded-xl text-xs uppercase tracking-wider"
          >
            <Check className="w-4 h-4 mr-2" />
            {selectedClient ? "Atualizar" : "Salvar"}
          </Button>

          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="bg-transparent hover:bg-white/5 text-gray-400 border border-white/10 hover:text-white py-5 rounded-xl text-xs uppercase tracking-wider"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ClienteForm;