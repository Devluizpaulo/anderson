"use client";

import Link from "next/link";
import { FaUser, FaTaxi, FaIdCard, FaBuilding, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-surface/30 dark:bg-surface/30 backdrop-blur-xl border-b border-secondary/10 fixed top-0 left-0 w-full z-50 shadow-sm font-body">
      <div className="container mx-auto flex items-center justify-between p-4 px-6 max-w-container-max">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="group flex items-center space-x-2 hover:text-secondary-fixed transition-colors">
            <span className="font-display text-lg sm:text-xl font-bold tracking-widest text-secondary uppercase">
              Anderson Marumoto
            </span>
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden text-secondary hover:text-secondary-fixed focus:outline-none transition-colors"
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
              strokeWidth={2.5}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        {/* Navegação */}
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row items-center sm:space-x-8 absolute sm:static top-16 left-0 w-full sm:w-auto bg-surface sm:bg-transparent p-6 sm:p-0 border-b border-secondary/10 sm:border-0 z-50 transition-all duration-300`}
        >
          <ul className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 w-full sm:w-auto">
            <li>
              <Link
                href="/sobre"
                className="flex items-center space-x-2 text-sm font-semibold text-on-surface-variant hover:text-secondary transition-all"
              >
                <FaUser size={14} />
                <span>Sobre</span>
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="flex items-center space-x-2 text-sm font-semibold text-on-surface-variant hover:text-secondary transition-all"
              >
                <FaTaxi size={14} />
                <span>Serviços</span>
              </Link>
            </li>
            <li>
              <Link
                href="/CVisita"
                className="flex items-center space-x-2 text-sm font-semibold text-on-surface-variant hover:text-secondary transition-all"
              >
                <FaIdCard size={14} />
                <span>Cartão de Visitas</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-sm font-semibold text-on-surface-variant hover:text-secondary transition-all"
              >
                <FaBuilding size={14} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="sm:hidden w-full pt-2">
              <a
                href="https://wa.me/+5511958396939"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full py-2.5 px-5 bg-secondary text-black rounded-full font-bold text-xs shadow-md"
              >
                <FaWhatsapp size={14} />
                <span>Solicitar Transfer</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* CTA Button (Desktop Only) */}
        <div className="hidden sm:block">
          <a
            href="https://wa.me/+5511958396939"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 py-2 px-5 bg-secondary text-black rounded-full font-bold text-xs tracking-wider uppercase shadow-lg shadow-secondary/10 hover:shadow-secondary/20 hover:bg-secondary/90 transform transition duration-300 hover:scale-105"
          >
            <FaWhatsapp size={14} />
            <span>Solicitar Transfer</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
