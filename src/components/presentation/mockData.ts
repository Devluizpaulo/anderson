export interface ConsoleLog {
  time: string;
  type: "info" | "success" | "warn" | "api";
  message: string;
}

export interface TimelineStep {
  step: number;
  label: string;
  desc: string;
}

export interface DeviceScreenOption {
  id: "card" | "about" | "reviews" | "booking";
  label: string;
  desc: string;
}

export const INITIAL_SYNC_LOGS: ConsoleLog[] = [
  { time: "18:00:00", type: "info", message: "Motor de sincronização bidirecional inicializado com sucesso." },
  { time: "18:00:01", type: "api", message: "Conexão estabelecida com Google Calendar API v3 (OAuth2)." },
  { time: "18:02:15", type: "success", message: "Webhook push listener ativo: https://api.andersonexecutivo.com.br/v1/sync/calendar" }
];

export const TIMELINE_STEPS: TimelineStep[] = [
  { step: 1, label: "Gatilho de Evento Detectado", desc: "Ação de agendamento disparada pelo usuário." },
  { step: 2, label: "Persistência no Firestore", desc: "Gravação e consistência dos dados do transfer." },
  { step: 3, label: "Transmissão da Payload API", desc: "Requisição estruturada enviada ao microsserviço de sync." },
  { step: 4, label: "Validação & Escrita Google v3", desc: "Processamento e gravação dos blocos de horários na nuvem." },
  { step: 5, label: "Sincronia Concluída", desc: "Status atualizado nas sessões do painel administrativo." }
];

export const INITIAL_WHATSAPP_FORM = {
  nome: "Carlos Eduardo Santos",
  origem: "Aeroporto de Guarulhos (GRU) - Terminal 3",
  destino: "Hotel Unique - Av. Brig. Luís Antônio, 4700",
  data: "2026-06-15",
  hora: "14:30",
  veiculo: "Toyota Corolla Cross Blindado",
  observacoes: "Necessita de receptivo com placa no desembarque internacional."
};

export const DEVICE_SCREENS: DeviceScreenOption[] = [
  { id: "card", label: "Cartão de Visitas Digital (/CVisita)", desc: "Perfil VIP com atalhos, telefone e estrelas." },
  { id: "about", label: "Sobre o Chauffeur (/sobre)", desc: "Perfil profissional do Anderson, frotas e diferenciais." },
  { id: "reviews", label: "Depoimentos Dinâmicos (Firebase)", desc: "Feedbacks aprovados de clientes no site." },
  { id: "booking", label: "Formulário de Orçamentos", desc: "Simulador com campos e atalho direto para orçamento." }
];

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || "+5511958396939";
export const TELEPHONE_NUMBER = process.env.NEXT_PUBLIC_TELEPHONE || "+5511958396939";
