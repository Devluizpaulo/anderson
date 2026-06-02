import type { Metadata } from "next";
import AboutDriverClient from "../../components/AboutDriverClient";

export const metadata: Metadata = {
  title: "Sobre o Motorista | Anderson Executive Transfers",
  description: "Saiba mais sobre Anderson Marumoto, motorista particular executivo profissional, oferecendo transfers de alta classe, segurança e discrição na região de São Paulo.",
};

const AboutPage = () => {
  return <AboutDriverClient />;
};

export default AboutPage;
