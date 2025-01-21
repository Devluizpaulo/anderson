"use client";

import Link from "next/link";

const HeaderCpanel: React.FC = () => {
  return (
    <header className="flex justify-between items-center bg-blue-800 text-white p-4">
      {/* Logo ou Título */}
      <h1 className="text-xl font-semibold">Bem-vindo ao CPanel</h1>

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
