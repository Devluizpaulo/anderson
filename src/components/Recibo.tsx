import React from "react";
import { useReceipt } from "../hooks/useReceipt";
import { ReceiptForm } from "./receipt/ReceiptForm";
import { ReceiptDriverConfig } from "./receipt/ReceiptDriverConfig";
import { ReceiptPreview } from "./receipt/ReceiptPreview";
import { ReceiptHistory } from "./receipt/ReceiptHistory";
import { FileText, Sparkles } from "lucide-react";

const Recibo: React.FC = () => {
  const {
    history,
    activeReceipt,
    setActiveReceipt,
    driver,
    setDriver,
    createReceipt,
    deleteReceipt,
    printReceipt,
    copyWhatsapp,
  } = useReceipt();

  return (
    <div className="space-y-8 font-sans">
      {/* Cabeçalho da Aba - Apenas Tela */}
      <div className="flex items-center justify-between border-b border-white/5 pb-5 no-print">
        <div>
          <h2 className="text-xl font-bold font-display text-white flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-[#e9c349]" />
            Emissão de Recibos Premium
          </h2>
          <p className="text-xs text-[#c4c7c7] mt-1">
            Gere recibos corporativos para seus passageiros, envie via WhatsApp ou imprima em formato A4.
          </p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#e9c349]">
          <FileText className="w-5 h-5" />
        </div>
      </div>

      {/* Grid Principal - Apenas Tela */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start no-print">
        {/* Coluna Esquerda: Formulários e Ajustes */}
        <div className="lg:col-span-6 space-y-6">
          <ReceiptForm onSubmit={createReceipt} />
          
          <ReceiptDriverConfig driver={driver} onChange={setDriver} />
          
          <ReceiptHistory
            history={history}
            onSelect={setActiveReceipt}
            onDelete={deleteReceipt}
            activeReceiptId={activeReceipt?.id}
          />
        </div>

        {/* Coluna Direita: Preview Fixo/Acompanhamento */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
          <div className="text-center sm:text-left">
            <h4 className="text-xs font-semibold text-[#c4c7c7] uppercase tracking-wider">
              Visualização em Tempo Real
            </h4>
            <p className="text-[10px] text-gray-500 mt-0.5">
              Este é o modelo final do ticket corporativo do passageiro.
            </p>
          </div>

          {activeReceipt ? (
            <ReceiptPreview
              receipt={activeReceipt}
              onPrint={printReceipt}
              onCopy={copyWhatsapp}
            />
          ) : (
            <div className="border border-dashed border-[#e9c349]/20 rounded-2xl p-12 text-center bg-black/20 text-gray-400 min-h-[350px] flex flex-col justify-center items-center">
              <FileText className="w-12 h-12 text-gray-700 mb-3 animate-pulse" />
              <h5 className="text-sm font-bold text-white uppercase tracking-wider">
                Voucher Não Gerado
              </h5>
              <p className="text-xs text-[#c4c7c7] max-w-xs mx-auto mt-2">
                Preencha as especificações do percurso ao lado e clique em **Gerar Recibo de Corrida** para obter o preview.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Área Reservada para Impressão Física (@media print assume aqui) */}
      {activeReceipt && (
        <div className="hidden print:block">
          <ReceiptPreview
            receipt={activeReceipt}
            onPrint={printReceipt}
            onCopy={copyWhatsapp}
          />
        </div>
      )}
    </div>
  );
};

export default Recibo;