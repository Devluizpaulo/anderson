"use client";

import Link from "next/link";
import { FaUser, FaTaxi, FaIdCard, FaBuilding } from "react-icons/fa";
import { useState } from "react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 shadow-lg font-poppins">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-3xl font-extrabold tracking-wider">
          <Link href="/" className="text-yellow-400 hover:text-yellow-300">
            Anderson Executive Transfers
          </Link>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden text-yellow-400 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        {/* Navegação */}
        <nav
          className={`${isMenuOpen ? "block" : "hidden"
            } sm:flex items-center sm:space-x-8 absolute sm:static top-16 left-0 w-full sm:w-auto bg-gray-900 sm:bg-transparent p-4 sm:p-0`}
        >
          <ul className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <li>
              <Link
                href="/sobre"
                className="flex items-center space-x-2 hover:text-yellow-400 transition-colors"
              >
                <FaUser size={24} className="text-white" />
                <span>Sobre</span>
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="flex items-center space-x-2 hover:text-yellow-400 transition-colors"
              >
                <FaTaxi size={24} className="text-yellow-400" />
                <span>Serviços</span>
              </Link>
            </li>
            <li>
              <Link
                href="/CVisita"
                className="flex items-center space-x-2 hover:text-yellow-400 transition-colors"
              >
                <FaIdCard size={24} className="text-white" />
                <span>Cartao de visitas</span>
              </Link>
            </li>
            <li>
              <Link
                href="/CPanel"
                className="flex items-center space-x-2 hover:text-yellow-400 transition-colors"
              >
                <FaBuilding size={24} className="text-white" />
                <span>CPanel</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 hover:text-yellow-400 transition-colors"
              >
                <FaBuilding size={24} className="text-white" />
                <span>dashboard</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
