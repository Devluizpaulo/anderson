import { useState, useEffect, useCallback } from "react";
import { db } from "../services/firebase";
import { collection, onSnapshot, doc, addDoc, updateDoc, Timestamp, query, where, getDoc } from "firebase/firestore";
import { Campanha } from "../components/coupon/types";

export const useCoupons = () => {
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listeners ativos em tempo real (onSnapshot)
  useEffect(() => {
    setLoading(true);
    // Filtrar apenas campanhas não arquivadas para visualização, ou pegar todas e filtrar localmente
    const q = query(collection(db, "campanhas"), where("arquivada", "==", false));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: Campanha[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          list.push({
            id: docSnap.id,
            ...data,
          } as Campanha);
        });

        // Ordenar por data de criação decrescente
        list.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
        
        setCampanhas(list);
        setLoading(false);
      },
      (err) => {
        console.error("Erro ao escutar coleção de campanhas:", err);
        setError("Erro ao sincronizar dados em tempo real.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  // Criar Campanha
  const criarCampanha = useCallback(async (fields: {
    nome: string;
    descricao?: string;
    tipoDesconto: "percentual" | "valor";
    valorDesconto: number;
    limiteCupons: number;
    dataInicio: string;
    dataFim: string;
    ativa: boolean;
  }) => {
    setLoading(true);
    try {
      const now = Timestamp.now();
      const newCampanha = {
        nome: fields.nome,
        descricao: fields.descricao || "",
        tipoDesconto: fields.tipoDesconto,
        valorDesconto: fields.valorDesconto,
        limiteCupons: fields.limiteCupons,
        cuponsGerados: 0,
        cuponsUtilizados: 0,
        dataInicio: Timestamp.fromDate(new Date(fields.dataInicio + "T00:00:00")),
        dataFim: Timestamp.fromDate(new Date(fields.dataFim + "T23:59:59")),
        ativa: fields.ativa,
        arquivada: false,
        createdAt: now,
        updatedAt: now,
      };

      await addDoc(collection(db, "campanhas"), newCampanha);
    } catch (err) {
      console.error("Erro ao criar campanha:", err);
      throw new Error("Erro ao criar campanha.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Geração de Códigos Únicos: VIP-XXXXXXXX
  const generateCouponCode = (): string => {
    const chars = "0123456789ABCDEF";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return `VIP-${code}`;
  };

  // Gerar Cupons em Massa para a Campanha no Firestore
  const gerarCupons = useCallback(async (campanhaId: string) => {
    setLoading(true);
    try {
      const campRef = doc(db, "campanhas", campanhaId);
      const campSnap = await getDoc(campRef);
      const campData = campSnap.data();

      if (!campData) {
        throw new Error("Campanha não encontrada.");
      }

      const limit = campData.limiteCupons;
      const currentGenerated = campData.cuponsGerados || 0;
      const amountToEmit = limit - currentGenerated;

      if (amountToEmit <= 0) {
        throw new Error("Limite de cupons já atingido.");
      }

      // Criar cupons em massa no Firestore
      for (let i = 0; i < amountToEmit; i++) {
        const codigo = generateCouponCode();
        const cupomDoc = {
          codigo,
          campanhaId,
          utilizado: false,
          clienteId: "",
          utilizadoEm: null,
          createdAt: Timestamp.now(),
        };
        await addDoc(collection(db, "cupons"), cupomDoc);
      }

      // Atualizar o contador da campanha
      await updateDoc(campRef, {
        cuponsGerados: limit,
        updatedAt: Timestamp.now(),
      });
    } catch (err: any) {
      console.error("Erro ao emitir cupons:", err);
      throw new Error(err.message || "Erro ao gerar cupons.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Soft Delete (Arquivamento Seguro)
  const arquivarCampanha = useCallback(async (campanhaId: string) => {
    setLoading(true);
    try {
      const campRef = doc(db, "campanhas", campanhaId);
      await updateDoc(campRef, {
        arquivada: true,
        ativa: false,
        updatedAt: Timestamp.now(),
      });
    } catch (err) {
      console.error("Erro ao arquivar campanha:", err);
      throw new Error("Erro ao arquivar campanha.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Compartilhamento WhatsApp Formatter e Cópia Clipboard
  const shareCouponText = useCallback((campanha: Campanha): string => {
    const formattedDate = campanha.dataFim.toDate().toLocaleDateString("pt-BR");
    
    const discountLabel =
      campanha.tipoDesconto === "percentual"
        ? `${campanha.valorDesconto}% OFF`
        : new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 0,
          }).format(campanha.valorDesconto) + " OFF";

    return `🎁 *Você recebeu um benefício exclusivo!*

*Desconto:* ${discountLabel}
*Campanha:* ${campanha.nome}
${campanha.descricao ? `*Descrição:* ${campanha.descricao}\n` : ""}
*Válido até:* ${formattedDate}

Aproveite seu benefício em seu próximo trajeto executivo com a *Marumoto Mobilidade Executiva*!`;
  }, []);

  const shareCoupon = useCallback(async (campanha: Campanha): Promise<boolean> => {
    const text = shareCouponText(campanha);
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Erro ao copiar benefício:", err);
      return false;
    }
  }, [shareCouponText]);

  return {
    campanhas,
    loading,
    error,
    criarCampanha,
    gerarCupons,
    arquivarCampanha,
    shareCoupon,
  };
};
