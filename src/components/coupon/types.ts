import { Timestamp } from "firebase/firestore";

export interface Campanha {
  id: string;
  nome: string;
  descricao?: string;
  tipoDesconto: "percentual" | "valor";
  valorDesconto: number;
  limiteCupons: number;
  cuponsGerados: number;
  cuponsUtilizados: number;
  dataInicio: Timestamp;
  dataFim: Timestamp;
  ativa: boolean;
  arquivada: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Cupom {
  id: string;
  codigo: string;
  campanhaId: string;
  utilizado: boolean;
  clienteId?: string;
  utilizadoEm?: Timestamp;
  createdAt: Timestamp;
}
