import React from "react";
import { Cliente } from "./types";
import { Trash2, Edit3, Mail, MapPin, MessageSquare, UserCheck } from "lucide-react";
import { Button } from "../ui/button";

interface ClienteListProps {
  clients: Cliente[];
  onSelectClient: (client: Cliente) => void;
  onDeleteClient: (id: string) => Promise<void>;
}

export const ClienteList: React.FC<ClienteListProps> = ({
  clients,
  onSelectClient,
  onDeleteClient,
}) => {
  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Tem certeza de que deseja excluir o cliente ${name}?`)) {
      try {
        await onDeleteClient(id);
      } catch (err) {
        alert("Erro ao excluir cliente.");
      }
    }
  };

  if (clients.length === 0) {
    return (
      <div className="text-center py-16 bg-black/20 border border-dashed border-white/5 rounded-2xl p-8 text-gray-500">
        <UserCheck className="w-12 h-12 text-gray-700 mx-auto mb-3" />
        <h5 className="text-sm font-bold text-white uppercase tracking-wider">
          Nenhum Cliente Encontrado
        </h5>
        <p className="text-xs text-[#c4c7c7] mt-1">
          Utilize o formulário ao lado para cadastrar seu primeiro passageiro executivo.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[640px] overflow-y-auto custom-scrollbar pr-2">
      {clients.map((client) => {
        // Obter as iniciais do cliente
        const initials = `${client.nome.charAt(0)}${client.sobrenome ? client.sobrenome.charAt(0) : ""}`.toUpperCase();

        return (
          <div
            key={client.id}
            className="group bg-black/20 border border-white/5 hover:border-[#e9c349]/20 p-5 rounded-2xl transition-all duration-200 hover:bg-[#e9c349]/[0.01] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden"
          >
            {/* Visual Chauffeur Tag */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#e9c349]/[0.01] rounded-full blur-2xl pointer-events-none group-hover:bg-[#e9c349]/[0.03] transition" />

            <div className="flex items-start space-x-4 min-w-0 flex-1">
              {/* Avatar circular dourado */}
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#e9c349]/10 to-[#ffe088]/20 border border-[#e9c349]/30 text-[#e9c349] flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-inner select-none font-mono">
                {initials}
              </div>

              {/* Informações detalhadas do cliente */}
              <div className="min-w-0 space-y-1.5 flex-1">
                <h4 className="text-sm font-bold text-white tracking-wide truncate">
                  {client.nome} {client.sobrenome}
                </h4>

                {client.email && (
                  <p className="text-xs text-[#c4c7c7] flex items-center truncate">
                    <Mail className="w-3.5 h-3.5 text-[#e9c349]/70 mr-1.5 flex-shrink-0" />
                    {client.email}
                  </p>
                )}

                <p className="text-xs text-[#c4c7c7] flex items-start leading-relaxed pr-2">
                  <MapPin className="w-3.5 h-3.5 text-[#e9c349]/70 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="truncate">
                    {client.endereco.rua}, {client.endereco.numero}
                    {client.endereco.complemento && ` - ${client.endereco.complemento}`}
                    <span className="block text-[10px] text-gray-500 mt-0.5">
                      {client.endereco.bairro} • {client.endereco.cidade}-{client.endereco.estado} • CEP {client.endereco.cep}
                    </span>
                  </span>
                </p>

                {client.observacoes && (
                  <p className="text-[11px] text-[#c4c7c7] bg-white/5 border border-white/5 p-2 rounded-lg italic flex items-start">
                    <MessageSquare className="w-3 h-3 text-gray-500 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{client.observacoes}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Ações de Edição/Exclusão */}
            <div className="flex items-center space-x-2 self-end sm:self-center flex-shrink-0 border-t border-white/5 sm:border-0 pt-3 sm:pt-0 w-full sm:w-auto justify-end">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onSelectClient(client)}
                className="h-9 w-9 rounded-xl hover:bg-[#e9c349]/10 text-gray-400 hover:text-[#e9c349] transition"
                title="Editar Cadastro"
              >
                <Edit3 className="w-4 h-4" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleDelete(client.id, `${client.nome} ${client.sobrenome}`)}
                className="h-9 w-9 rounded-xl hover:bg-red-950/30 text-gray-500 hover:text-red-400 transition"
                title="Excluir Cliente"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClienteList;