"use client";

import Link from "next/link";
import { LogOut, Home } from "lucide-react";

const HeaderCpanel: React.FC = () => {
  return (
    <header className="flex justify-between items-center bg-gradient-to-r from-blue-700 to-blue-900 text-white p-4 shadow-lg">
      {/* Logo ou Título */}
      <div className="flex items-center gap-2">
        <Home className="w-6 h-6 text-white" />
        <h1 className="text-2xl font-bold drop-shadow-lg">Bem-vindo ao Painel de Controle</h1>
      </div>

      <Link
        href="/"
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md transition hover:bg-red-700 focus:ring focus:ring-red-400"
      >
        <LogOut className="w-5 h-5" />
        Sair
      </Link>
    </header>
  );
};

export default HeaderCpanel;
