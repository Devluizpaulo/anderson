import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

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
  description: "Serviço de transporte executivo privado de alto padrão comandado por Anderson Marumoto. Especialista em transfer receptivo de aeroportos (Guarulhos, Congonhas, Viracopos), viagens para litoral e interior, e atendimento corporativo em São Paulo com Toyota Corolla Cross blindado.",
  keywords: [
    "transporte executivo", 
    "transfer aeroporto sao paulo", 
    "motorista particular congonhas", 
    "motorista particular guarulhos", 
    "carro blindado sao paulo", 
    "viagem executiva litoral interior", 
    "Anderson Executive Transfers",
    "táxi executivo blindado"
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
      <body
        className={`${playfairDisplay.variable} ${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
