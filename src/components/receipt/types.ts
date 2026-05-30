export interface DriverData {
  nome: string;
  cpf: string;
  cnpj?: string;
  veiculo: string;
  placa: string;
}

export interface ReceiptData {
  id: string; // Identificador único interno para histórico/exclusão
  numero: string; // Número do recibo público formatado (ex: AM-YYYYMMDD-XXX)
  cliente: string;
  cpf?: string;
  telefone?: string;
  origem: string;
  destino: string;
  dataServico: string;
  horario?: string; // Mantido para complementar a data
  valor: number;
  formaPagamento: string;
  observacoes?: string;
  motorista: DriverData;
  criadoEm: string; // Timestamp ISO de criação do registro
}
