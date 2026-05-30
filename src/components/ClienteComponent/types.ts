export interface Endereco {
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  cep: string;
}

export interface Cliente {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  endereco: Endereco;
  observacoes: string;
}
