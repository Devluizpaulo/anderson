import React, { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface ClienteSearchProps {
  onSearch: (query: string) => void;
}

export const ClienteSearch: React.FC<ClienteSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
        <Search className="w-4 h-4 text-[#e9c349]" />
      </div>
      <Input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Buscar cliente por nome, e-mail, observações ou endereço..."
        className="pl-10 w-full bg-[#0C0F0F] border-[#444748]/30 text-white placeholder-gray-500 focus:border-[#e9c349] transition rounded-xl py-5 text-sm"
      />
    </div>
  );
};

export type { Cliente } from "./types";
export default ClienteSearch;