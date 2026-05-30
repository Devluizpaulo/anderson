import React, { useState } from "react";
import { ReceiptData } from "./types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Share2, FileText, Check, Shield } from "lucide-react";

interface ReceiptPreviewProps {
  receipt: ReceiptData;
  onPrint: () => void;
  onCopy: (receipt: ReceiptData) => Promise<boolean>;
}

export const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({
  receipt,
  onPrint,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await onCopy(receipt);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedDate = new Date(receipt.dataServico).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(receipt.valor);

  return (
    <div className="space-y-6">
      {/* Wrapper de Impressão */}
      <div className="print-area">
        <Card className="max-w-xl mx-auto p-8 border border-[#e9c349]/20 shadow-2xl bg-black/40 backdrop-blur-md relative text-[#e2e2e2] overflow-hidden rounded-2xl">
          {/* Fundo Decorativo Premium (Apenas Tela) */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#e9c349]/5 rounded-full blur-3xl pointer-events-none no-print" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none no-print" />

          {/* Header do Recibo */}
          <div className="text-center border-b border-[#e9c349]/20 pb-6 mb-6">
            {/* Logo Estilizada Dourada (Apenas Tela) */}
            <div className="hidden sm:flex justify-center items-center mb-3 space-x-2 no-print">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#e9c349] to-[#ffe088] flex items-center justify-center text-black font-serif font-extrabold text-xl shadow-lg shadow-[#e9c349]/10">
                M
              </div>
              <div className="text-left">
                <span className="text-[10px] text-[#e9c349] font-bold tracking-widest uppercase font-sans">
                  Private Chauffeur
                </span>
                <h4 className="text-sm font-bold text-white tracking-wide uppercase font-display">
                  Marumoto Executivo
                </h4>
              </div>
            </div>

            {/* Nome Corporativo em Serif/Playfair */}
            <h3 className="text-2xl font-bold tracking-widest font-display text-white mt-2 uppercase text-center border-b-2 border-[#e9c349]/10 pb-2 print-only-header">
              Marumoto Mobilidade Executiva
            </h3>

            {/* CNPJ e detalhes em preto no papel, cinza na tela */}
            <p className="text-[10px] uppercase tracking-widest text-[#c4c7c7] mt-2 font-sans font-medium print-dark-text">
              Serviços de Transporte Privado Corporativo e Viagens Executivas
            </p>
            {receipt.motorista.cnpj && (
              <p className="text-[9px] text-[#c4c7c7] font-mono mt-1 print-dark-text">
                CNPJ: {receipt.motorista.cnpj}
              </p>
            )}
          </div>

          {/* Identificação de Controle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 font-sans text-xs border-b border-white/5 pb-4 print-border-dark">
            <span className="px-3 py-1 bg-[#e9c349]/10 border border-[#e9c349]/20 text-[#e9c349] rounded-full font-bold tracking-wide font-mono print-bw-badge">
              Nº {receipt.numero}
            </span>
            <span className="text-[#c4c7c7] font-medium print-dark-text">
              Emissão: {new Date(receipt.criadoEm).toLocaleDateString("pt-BR")}
            </span>
          </div>

          {/* Declaração Principal (Texto estilo Voucher Serif) */}
          <div className="text-justify leading-relaxed mb-6 font-serif text-[#e2e2e2] text-sm print-dark-text">
            Declaramos para os devidos fins que recebemos de{" "}
            <strong className="font-sans font-bold text-white print-dark-bold">
              {receipt.cliente}
            </strong>
            {receipt.cpf && (
              <span>
                , portador do CPF/CNPJ{" "}
                <strong className="font-mono text-white print-dark-bold">
                  {receipt.cpf}
                </strong>
              </span>
            )}
            {receipt.telefone && (
              <span>
                , telefone de contato{" "}
                <strong className="font-sans text-white print-dark-bold">
                  {receipt.telefone}
                </strong>
              </span>
            )}
            , a importância líquida de{" "}
            <span className="font-sans font-extrabold text-[#e9c349] bg-[#e9c349]/10 border border-[#e9c349]/20 px-2 py-0.5 rounded text-[15px] font-mono print-bw-value inline-block mx-1">
              {formattedValue}
            </span>{" "}
            referente aos serviços prestados sob regime de fretamento particular conforme roteiro detalhado:
          </div>

          {/* Detalhamento do Percurso */}
          <div className="bg-[#0C0F0F]/50 p-4 rounded-xl border border-white/5 mb-6 font-sans text-xs space-y-2.5 print-bw-panel">
            <h4 className="font-bold text-[#e9c349] uppercase tracking-widest text-[10px] border-b border-white/5 pb-1 mb-2 print-dark-bold print-border-dark">
              Especificações do Roteiro
            </h4>
            <div className="flex items-start">
              <span className="font-semibold text-[#c4c7c7] w-16 flex-shrink-0 print-dark-text">Partida:</span>
              <span className="text-white print-dark-bold">{receipt.origem}</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-[#c4c7c7] w-16 flex-shrink-0 print-dark-text">Chegada:</span>
              <span className="text-white print-dark-bold">{receipt.destino}</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-[#c4c7c7] w-16 flex-shrink-0 print-dark-text">Agenda:</span>
              <span className="text-white print-dark-bold">
                {formattedDate} {receipt.horario ? `às ${receipt.horario}` : ""}
              </span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-[#c4c7c7] w-16 flex-shrink-0 print-dark-text">Pagamento:</span>
              <span className="text-[#e9c349] font-bold uppercase print-dark-bold">{receipt.formaPagamento}</span>
            </div>
            {receipt.observacoes && (
              <div className="pt-2 border-t border-white/5 mt-2 text-[#c4c7c7] text-[11px] italic print-dark-text print-border-dark">
                <strong>Obs:</strong> {receipt.observacoes}
              </div>
            )}
          </div>

          {/* Dados do Prestador */}
          <div className="border-t border-white/5 pt-5 font-sans print-border-dark">
            <h4 className="text-[10px] font-bold text-[#c4c7c7] uppercase tracking-wider mb-3 print-dark-text">
              Emissor do Documento
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[11px] text-[#c4c7c7] print-dark-text">
              <p>
                <strong>Motorista:</strong>{" "}
                <span className="text-white font-medium print-dark-bold">
                  {receipt.motorista.nome}
                </span>
              </p>
              <p>
                <strong>Veículo:</strong>{" "}
                <span className="text-white font-medium print-dark-bold">
                  {receipt.motorista.veiculo}
                </span>
              </p>
              <p>
                <strong>CPF:</strong>{" "}
                <span className="text-white font-mono print-dark-bold">
                  {receipt.motorista.cpf}
                </span>
              </p>
              <p>
                <strong>Placa:</strong>{" "}
                <span className="text-white font-mono font-medium print-dark-bold">
                  {receipt.motorista.placa}
                </span>
              </p>
            </div>
          </div>

          {/* Linha de Assinatura */}
          <div className="mt-10 flex flex-col items-center justify-center font-sans">
            <div className="w-60 border-t border-white/20 text-center pt-2 print-border-dark">
              <p className="text-xs font-bold text-white print-dark-bold">
                {receipt.motorista.nome}
              </p>
              <p className="text-[9px] text-[#c4c7c7] uppercase tracking-widest mt-0.5 print-dark-text">
                Assinatura do Chauffeur
              </p>
            </div>
          </div>

          {/* Marca d'água de autenticidade */}
          <div className="absolute right-4 bottom-4 font-sans text-[8px] text-[#c4c7c7]/30 select-none flex items-center print-dark-text">
            <Shield className="w-2.5 h-2.5 mr-1" />
            Voucher Eletrônico Autenticado
          </div>
        </Card>
      </div>

      {/* Botões de Ações de Alta Definição (Apenas na Tela) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 no-print max-w-xl mx-auto">
        <Button
          onClick={onPrint}
          className="bg-white hover:bg-white/90 text-black font-extrabold shadow-md flex items-center justify-center py-5 rounded-xl text-xs uppercase tracking-wider"
        >
          <Printer className="w-4 h-4 mr-2" />
          Imprimir Recibo
        </Button>

        <Button
          onClick={onPrint}
          className="bg-transparent hover:bg-white/5 text-[#e2e2e2] border border-white/20 font-bold flex items-center justify-center py-5 rounded-xl text-xs uppercase tracking-wider"
        >
          <FileText className="w-4 h-4 mr-2 text-[#e9c349]" />
          Salvar como PDF
        </Button>

        <Button
          onClick={handleCopy}
          className={`font-bold py-5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center ${
            copied
              ? "bg-green-600 hover:bg-green-600 text-white shadow-md shadow-green-900/10"
              : "bg-[#e9c349]/10 hover:bg-[#e9c349]/20 text-[#e9c349] border border-[#e9c349]/30"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-white" />
              Copiado!
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 mr-2" />
              Enviar WhatsApp
            </>
          )}
        </Button>
      </div>

      {/* Estilos Globais CSS para Impressão Perfeita e Otimizada */}
      <style jsx global>{`
        @media print {
          /* Esconde absolutamente toda a estrutura Next.js */
          body * {
            visibility: hidden;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            text-shadow: none !important;
          }
          
          /* Mostra apenas a área do recibo */
          .print-area, .print-area * {
            visibility: visible;
          }
          
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
          }

          /* Otimização de cores e economia de tinta no PDF/Impressora */
          .print-area .max-w-xl {
            border: 2px solid #000000 !important;
            background: #ffffff !important;
            color: #000000 !important;
            padding: 2.5rem !important;
            box-shadow: none !important;
            border-radius: 0px !important;
            max-width: 100% !important;
            width: 17cm !important; /* Tamanho otimizado para A4 */
          }

          .print-only-header {
            color: #000000 !important;
            font-family: serif !important;
            border-bottom: 2px solid #000000 !important;
          }

          .print-dark-text {
            color: #000000 !important;
          }

          .print-dark-bold {
            color: #000000 !important;
            font-weight: bold !important;
          }

          .print-border-dark {
            border-color: #000000 !important;
          }

          .print-bw-badge {
            background: #f0f0f0 !important;
            border: 1px solid #000000 !important;
            color: #000000 !important;
            border-radius: 3px !important;
            font-weight: bold !important;
          }

          .print-bw-value {
            background: #f5f5f5 !important;
            border: 1px solid #000000 !important;
            color: #000000 !important;
            font-weight: 800 !important;
            border-radius: 4px !important;
          }

          .print-bw-panel {
            background: #fafafa !important;
            border: 1px solid #000000 !important;
            color: #000000 !important;
            border-radius: 6px !important;
          }

          /* Ocultar elementos no-print */
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
export default ReceiptPreview;
