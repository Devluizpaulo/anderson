import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Metadados da aplicação para SEO
export const metadata: Metadata = {
  title: "Anderson Executive Transfers | Táxi Executivo & Transfers em São Paulo",
  description: "Serviço de transporte executivo privado de alto padrão comandado por Anderson Marumoto. Especialista em transfer receptivo de aeroportos (Guarulhos, Congonhas, Viracopos), viagens para litoral e interior, e atendimento corporativo em São Paulo com Toyota Corolla Cross premium.",
  keywords: [
    "transporte executivo", 
    "transfer aeroporto sao paulo", 
    "motorista particular congonhas", 
    "motorista particular guarulhos", 
    "carro premium sao paulo", 
    "viagem executiva litoral interior", 
    "Anderson Executive Transfers",
    "táxi executivo premium"
  ],
  authors: [{ name: "Anderson Marumoto" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

// Layout raiz da aplicação
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body
        className={`${playfairDisplay.variable} ${manrope.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
