"use client";

import Link from "next/link";
import { useState } from "react";

const HeaderCpanel: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="flex justify-between items-center bg-blue-800 text-white p-4">
      {/* Logo ou Título */}
      <h1 className="text-xl font-semibold">Bem-vindo ao CPanel</h1>

      {/* Botão Sair */}
      <Link
        href="/"
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
      >
        Sair
      </Link>
    </header>
  );
};

export default HeaderCpanel;
