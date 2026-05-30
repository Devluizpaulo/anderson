import { useState, useEffect, useCallback } from "react";
import { ReceiptData, DriverData } from "../components/receipt/types";

const LOCAL_STORAGE_KEY = "marumoto_receipts_history";

const DEFAULT_DRIVER: DriverData = {
  nome: "Anderson Marumoto",
  cpf: "324.569.874-00",
  cnpj: "32.456.987/0001-99",
  veiculo: "Toyota Corolla Cross Black Edition",
  placa: "EEX-9A88",
};

export const useReceipt = () => {
  const [history, setHistory] = useState<ReceiptData[]>([]);
  const [activeReceipt, setActiveReceipt] = useState<ReceiptData | null>(null);
  const [driver, setDriver] = useState<DriverData>(DEFAULT_DRIVER);

  // Carregar histórico inicial do localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Erro ao carregar histórico de recibos:", e);
    }
  }, []);

  // Salvar no localStorage sempre que o histórico mudar
  const saveToStorage = (updatedHistory: ReceiptData[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch (e) {
      console.error("Erro ao salvar histórico de recibos:", e);
    }
  };

  // Gerar número de recibo profissional: AM-YYYYMMDD-XXX
  const generateReceiptNumber = useCallback(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const today = `${yyyy}${mm}${dd}`;
    const uniqueDigits = Math.floor(100 + Math.random() * 900).toString();
    return `AM-${today}-${uniqueDigits}`;
  }, []);

  // Criar recibo
  const createReceipt = useCallback((
    fields: Omit<ReceiptData, "id" | "numero" | "criadoEm" | "motorista">
  ) => {
    const newReceipt: ReceiptData = {
      ...fields,
      id: `rcpt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      numero: generateReceiptNumber(),
      motorista: { ...driver },
      criadoEm: new Date().toISOString(),
    };

    setHistory((prev) => {
      const next = [newReceipt, ...prev];
      saveToStorage(next);
      return next;
    });

    setActiveReceipt(newReceipt);
    return newReceipt;
  }, [driver, generateReceiptNumber]);

  // Excluir recibo do histórico
  const deleteReceipt = useCallback((id: string) => {
    setHistory((prev) => {
      const next = prev.filter((r) => r.id !== id);
      saveToStorage(next);
      return next;
    });

    setActiveReceipt((prev) => (prev?.id === id ? null : prev));
  }, []);

  // Imprimir recibo
  const printReceipt = useCallback(() => {
    if (typeof window !== "undefined") {
      window.print();
    }
  }, []);

  // Gerar texto formatado premium para WhatsApp
  const formatWhatsappText = useCallback((r: ReceiptData): string => {
    const formattedDate = new Date(r.dataServico).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const formattedTime = r.horario ? ` às ${r.horario}` : "";
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(r.valor);

    return `🧾 *RECIBO DE TRANSPORTE EXECUTIVO*

*Recibo Nº:* ${r.numero}
*Data:* ${formattedDate}${formattedTime}

*Cliente:* ${r.cliente}
${r.cpf ? `*CPF/CNPJ:* ${r.cpf}\n` : ""}${r.telefone ? `*Telefone:* ${r.telefone}\n` : ""}
---
*Origem:*
📍 ${r.origem}

*Destino:*
🏁 ${r.destino}

*Forma de Pagamento:* ${r.formaPagamento}
*Valor Total:* ${formattedValue}
${r.observacoes ? `\n*Observações:* ${r.observacoes}\n` : ""}
---
*Motorista:* ${r.motorista.nome}
*Veículo:* ${r.motorista.veiculo}
*Placa:* ${r.motorista.placa}
${r.motorista.cnpj ? `*CNPJ:* ${r.motorista.cnpj}\n` : ""}
*Agradecemos a preferência!*
Marumoto Mobilidade Executiva`;
  }, []);

  // Copiar para clipboard
  const copyWhatsapp = useCallback(async (r: ReceiptData): Promise<boolean> => {
    const text = formatWhatsappText(r);
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Falha ao copiar texto do recibo:", err);
      return false;
    }
  }, [formatWhatsappText]);

  return {
    history,
    activeReceipt,
    setActiveReceipt,
    driver,
    setDriver,
    createReceipt,
    deleteReceipt,
    printReceipt,
    copyWhatsapp,
  };
};
