export interface Invoice {
  id: string;
  customerName: string;
  customerDocument: string;
  customerPhone: string;
  amount: number;
  originalAmount: number;
  discountAmount?: number;
  dueDate: string;
  status: 'PENDENTE' | 'VENCIDA' | 'COBRADA' | 'PAGA';
  stage: 'D-3' | 'D-0' | 'D+2' | 'D+7';
  description: string;
  pixKey: string;
  pixPayload: string;
  paidAt?: string;
  remindedAt?: string;
}

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'FAT-1092',
    customerName: 'Academia Iron Fit Ltda',
    customerDocument: '14.892.102/0001-44',
    customerPhone: '(11) 98765-4321',
    amount: 1450.0,
    originalAmount: 1450.0,
    dueDate: '2026-10-23',
    status: 'VENCIDA',
    stage: 'D+2',
    description: 'Manutenção de Equipamentos e Software de Catraca',
    pixKey: 'financeiro@recuperapix.com.br',
    pixPayload: '00020126580014br.gov.bcb.pix0136e4f9b231-8f42-4b31-98dc-1092recupera52040000530398654071450.005802BR5920RECUPERAPIX BRASIL6009SAO PAULO62070503***6304E8A1',
    remindedAt: '2026-10-25 09:15',
  },
  {
    id: 'FAT-1093',
    customerName: 'Clínica Odonto Sorriso',
    customerDocument: '32.114.908/0001-92',
    customerPhone: '(21) 99876-5432',
    amount: 890.0,
    originalAmount: 890.0,
    dueDate: '2026-10-27',
    status: 'COBRADA',
    stage: 'D-0',
    description: 'Licença Mensal de Sistema de Prontuário Eletrônico',
    pixKey: 'financeiro@recuperapix.com.br',
    pixPayload: '00020126580014br.gov.bcb.pix0136e4f9b231-8f42-4b31-98dc-1093recupera5204000053039865406890.005802BR5920RECUPERAPIX BRASIL6009SAO PAULO62070503***6304B72F',
    remindedAt: '2026-10-27 08:30',
  },
  {
    id: 'FAT-1094',
    customerName: 'Studio Bella Hair & Spa',
    customerDocument: '45.789.012/0001-33',
    customerPhone: '(31) 98456-7890',
    amount: 380.0,
    originalAmount: 380.0,
    dueDate: '2026-10-18',
    status: 'VENCIDA',
    stage: 'D+7',
    description: 'Fornecimento de Cosméticos e Produtos de Salão',
    pixKey: 'financeiro@recuperapix.com.br',
    pixPayload: '00020126580014br.gov.bcb.pix0136e4f9b231-8f42-4b31-98dc-1094recupera5204000053039865406380.005802BR5920RECUPERAPIX BRASIL6009SAO PAULO62070503***630419DC',
  },
  {
    id: 'FAT-1095',
    customerName: 'Transportes e Logística Guimarães',
    customerDocument: '18.992.345/0001-10',
    customerPhone: '(41) 99123-4567',
    amount: 3200.0,
    originalAmount: 3200.0,
    dueDate: '2026-10-30',
    status: 'PENDENTE',
    stage: 'D-3',
    description: 'Serviço de Rastreamento de Frota - Outubro',
    pixKey: 'financeiro@recuperapix.com.br',
    pixPayload: '00020126580014br.gov.bcb.pix0136e4f9b231-8f42-4b31-98dc-1095recupera52040000530398654073200.005802BR5920RECUPERAPIX BRASIL6009SAO PAULO62070503***630456FA',
  },
  {
    id: 'FAT-1096',
    customerName: 'Escola Infantil Viver Bem',
    customerDocument: '09.334.887/0001-78',
    customerPhone: '(19) 98234-5678',
    amount: 1120.0,
    originalAmount: 1120.0,
    dueDate: '2026-10-21',
    status: 'PAGA',
    stage: 'D+2',
    description: 'Consultoria Pedagógica e Material Didático Integrado',
    pixKey: 'financeiro@recuperapix.com.br',
    pixPayload: '00020126580014br.gov.bcb.pix0136e4f9b231-8f42-4b31-98dc-1096recupera52040000530398654071120.005802BR5920RECUPERAPIX BRASIL6009SAO PAULO62070503***630489C1',
    paidAt: '2026-10-23 14:22',
    remindedAt: '2026-10-23 10:00',
  },
  {
    id: 'FAT-1097',
    customerName: 'Contabilidade Nova Era',
    customerDocument: '27.445.661/0001-05',
    customerPhone: '(81) 98712-3456',
    amount: 650.0,
    originalAmount: 650.0,
    dueDate: '2026-10-24',
    status: 'PAGA',
    stage: 'D-0',
    description: 'Hospedagem em Nuvem de Servidor Fiscal Dedicado',
    pixKey: 'financeiro@recuperapix.com.br',
    pixPayload: '00020126580014br.gov.bcb.pix0136e4f9b231-8f42-4b31-98dc-1097recupera5204000053039865406650.005802BR5920RECUPERAPIX BRASIL6009SAO PAULO62070503***6304C201',
    paidAt: '2026-10-24 16:45',
    remindedAt: '2026-10-24 09:12',
  },
];

export const REGUA_TEMPLATES = {
  'D-3': {
    title: 'Lembrete Preventivo (3 dias antes)',
    tone: 'Amigável & Cordial',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    message: 'Olá, {nome}! Tudo bem? Passando para lembrar que sua fatura de R$ {valor} referente a "{servico}" vence em {vencimento}. Para sua comodidade, você pode pagar direto no Pix sem taxas no link: {link_pix}',
  },
  'D-0': {
    title: 'Notificação do Dia do Vencimento',
    tone: 'Objetivo com Pix Imediato',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    message: 'Oi, {nome}! Sua fatura de R$ {valor} vence hoje ({vencimento}). Para evitar juros, você pode pagar agora no Pix usando o código copia e cola abaixo ou acessando seu link: {link_pix}',
  },
  'D+2': {
    title: 'Lembrete Pós-Vencimento (2 dias após)',
    tone: 'Prestativo & Sem Constrangimento',
    badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    message: 'Olá, {nome}. Notamos que a fatura de R$ {valor} não foi identificada até agora. Sabemos que a rotina é corrida! Atualizamos seu link para pagamento com Pix sem multas adicionais se pago hoje: {link_pix}',
  },
  'D+7': {
    title: 'Acordo e Renegociação (7 dias após)',
    tone: 'Resolução com Desconto Especial',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    message: 'Olá, {nome}! Queremos muito manter nossa parceria. Liberamos uma condição especial exclusiva: pague com 10% de desconto no Pix à vista ou parcele sua fatura de R$ {valor} no link: {link_pix}',
  },
};
