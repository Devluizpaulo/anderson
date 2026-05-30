import React from "react";
import { ReceiptData } from "./types";
import { Trash2, ExternalLink, FileText, TrendingUp, Coins, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ReceiptHistoryProps {
  history: ReceiptData[];
  onSelect: (receipt: ReceiptData) => void;
  onDelete: (id: string) => void;
  activeReceiptId?: string;
}

export const ReceiptHistory: React.FC<ReceiptHistoryProps> = ({
  history,
  onSelect,
  onDelete,
  activeReceiptId,
}) => {
  // Calcular Estatísticas
  const totalValue = history.reduce((acc, curr) => acc + curr.valor, 0);
  const totalIssued = history.length;
  const averageValue = totalIssued > 0 ? totalValue / totalIssued : 0;

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalValue);

  const formattedAverage = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(averageValue);

  return (
    <div className="space-y-6">
      {/* Cards de Métricas Rápidas */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        {/* Faturamento Acumulado */}
        <div className="bg-black/30 border border-[#e9c349]/10 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#c4c7c7] uppercase tracking-wider font-semibold">
              Faturamento Acumulado
            </span>
            <h4 className="text-xl font-extrabold text-[#e9c349] mt-1">
              {formattedTotal}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#e9c349]/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#e9c349]" />
          </div>
        </div>

        {/* Média por Corrida */}
        <div className="bg-black/30 border border-[#e9c349]/10 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#c4c7c7] uppercase tracking-wider font-semibold">
              Média por Corrida
            </span>
            <h4 className="text-xl font-extrabold text-white mt-1">
              {formattedAverage}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
            <Coins className="w-5 h-5 text-gray-300" />
          </div>
        </div>

        {/* Total Emitido */}
        <div className="bg-black/30 border border-[#e9c349]/10 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#c4c7c7] uppercase tracking-wider font-semibold">
              Recibos Emitidos
            </span>
            <h4 className="text-xl font-extrabold text-white mt-1">
              {totalIssued}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
            <FileText className="w-5 h-5 text-gray-300" />
          </div>
        </div>
      </div>

      {/* Tabela/Lista do Histórico */}
      <Card className="bg-black/20 border border-white/5 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-white/5 p-5">
          <CardTitle className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-[#e9c349]" />
            Histórico Recente de Recibos
          </CardTitle>
          <CardDescription className="text-xs text-[#c4c7c7]">
            Visualize ou exclua recibos emitidos diretamente do seu dispositivo.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {history.length === 0 ? (
            <div className="text-center py-12 px-6">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-[#c4c7c7] font-medium">Nenhum recibo emitido ainda.</p>
              <p className="text-xs text-gray-600 mt-1">Preencha o formulário para emitir seu primeiro recibo.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5 max-h-[360px] overflow-y-auto custom-scrollbar">
              {history.map((item) => {
                const isSelected = activeReceiptId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 transition-all duration-150 ${
                      isSelected ? "bg-[#e9c349]/5" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex-1 min-w-0 mr-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white tracking-wide truncate">
                          {item.cliente}
                        </span>
                        <span className="text-[9px] font-mono font-bold bg-[#e9c349]/10 border border-[#e9c349]/20 text-[#e9c349] px-2 py-0.5 rounded">
                          {item.numero}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#c4c7c7] truncate mt-1">
                        📍 {item.origem} → 🏁 {item.destino}
                      </p>
                      <p className="text-[9px] text-gray-500 mt-0.5">
                        Serviço em: {new Date(item.dataServico).toLocaleDateString("pt-BR")} • Pago via: {item.formaPagamento}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span className="text-xs font-extrabold text-[#e9c349] mr-2">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(item.valor)}
                      </span>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onSelect(item)}
                        className={`h-8 w-8 rounded-lg hover:bg-white/10 hover:text-white ${
                          isSelected ? "text-[#e9c349]" : "text-gray-400"
                        }`}
                        title="Visualizar Recibo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onDelete(item.id)}
                        className="h-8 w-8 rounded-lg hover:bg-red-950/40 text-gray-500 hover:text-red-400"
                        title="Excluir do Histórico"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default ReceiptHistory;
