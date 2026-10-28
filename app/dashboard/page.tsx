'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  DollarSign,
  ExternalLink,
  Filter,
  MessageCircle,
  Plus,
  Search,
  Send,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from 'lucide-react';
import { Invoice, INITIAL_INVOICES, REGUA_TEMPLATES } from '@/lib/data';

export default function DashboardPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('TODOS');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Formulário de Nova Cobrança
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Carrega do LocalStorage na montagem
  useEffect(() => {
    const stored = localStorage.getItem('recuperapix_invoices');
    if (stored) {
      try {
        setInvoices(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveInvoices = (newList: Invoice[]) => {
    setInvoices(newList);
    localStorage.setItem('recuperapix_invoices', JSON.stringify(newList));
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Métricas calculadas
  const totalRecovered = invoices
    .filter((i) => i.status === 'PAGA')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalPending = invoices
    .filter((i) => i.status === 'VENCIDA' || i.status === 'COBRADA' || i.status === 'PENDENTE')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const recoveryRate =
    invoices.length > 0
      ? Math.round((invoices.filter((i) => i.status === 'PAGA').length / invoices.length) * 100)
      : 0;

  // Filtragem
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.customerPhone.includes(searchTerm);
    const matchesStatus = statusFilter === 'TODOS' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenWhatsAppModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleSendWhatsAppNotification = () => {
    if (!selectedInvoice) return;
    const updated = invoices.map((i) =>
      i.id === selectedInvoice.id
        ? {
            ...i,
            status: 'COBRADA' as const,
            remindedAt: new Date().toLocaleString('pt-BR'),
          }
        : i
    );
    saveInvoices(updated);
    setIsModalOpen(false);
    showNotification(`Cobrança enviada com sucesso no WhatsApp de ${selectedInvoice.customerName}! 📲`);
  };

  const handleCopyLink = (invoice: Invoice) => {
    const link = `${window.location.origin}/fatura/${invoice.id}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(invoice.id);
    showNotification(`Link público da fatura #${invoice.id} copiado!`);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName || !newAmount || !newDueDate) return;

    const numAmount = parseFloat(newAmount.replace(',', '.'));
    const id = `FAT-${Math.floor(1000 + Math.random() * 9000)}`;

    const newInvoice: Invoice = {
      id,
      customerName: newCustomerName,
      customerDocument: '00.000.000/0001-00',
      customerPhone: newCustomerPhone || '(11) 99999-9999',
      amount: numAmount,
      originalAmount: numAmount,
      dueDate: newDueDate,
      status: 'PENDENTE',
      stage: 'D-0',
      description: newDescription || 'Prestação de Serviços',
      pixKey: 'financeiro@recuperapix.com.br',
      pixPayload: `00020126580014br.gov.bcb.pix0136${id}recuperapix5204000053039865406${numAmount.toFixed(2)}5802BR5920RECUPERAPIX6009SAOPAULO62070503***6304E8A1`,
    };

    saveInvoices([newInvoice, ...invoices]);
    setIsNewInvoiceOpen(false);
    setNewCustomerName('');
    setNewCustomerPhone('');
    setNewAmount('');
    setNewDueDate('');
    setNewDescription('');
    showNotification(`Nova cobrança #${id} criada com Pix gerado automaticamente! 🚀`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-white font-medium text-sm px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
                <Zap className="w-5 h-5 fill-slate-950" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Recupera<span className="text-emerald-400">Pix</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              <Link
                href="/dashboard"
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-white font-semibold"
              >
                Visão Geral
              </Link>
              <Link
                href="/dashboard/regua"
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                Régua WhatsApp
              </Link>
              <Link
                href="/"
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                Landing Page
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsNewInvoiceOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Plus className="w-4 h-4" /> Nova Cobrança
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Painel de Cobranças & Recuperação
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Monitore suas faturas em aberto, disparos de WhatsApp e conversões Pix em tempo real.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/regua"
              className="text-xs font-semibold px-4 py-2 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" /> Configurar Régua
            </Link>
          </div>
        </div>

        {/* 4 KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Total Recuperado</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRecovered)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mt-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+34.2% vs mês anterior</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Em Aberto / Inadimplente</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPending)}
            </div>
            <div className="text-xs text-slate-400 mt-3">
              <span>{invoices.filter((i) => i.status !== 'PAGA').length} faturas aguardando</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Taxa de Recuperação</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {recoveryRate}%
            </div>
            <div className="text-xs text-blue-400 font-medium mt-3">
              <span>Média de mercado: 41%</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Tempo Médio Pix</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              26 horas
            </div>
            <div className="text-xs text-slate-400 mt-3">
              <span>Após envio da notificação</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por cliente, telefone ou ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-3.5 h-3.5 text-slate-500 hidden sm:block mr-1" />
            {['TODOS', 'VENCIDA', 'COBRADA', 'PENDENTE', 'PAGA'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  statusFilter === st
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Identificador</th>
                  <th className="py-3.5 px-4">Cliente & Contato</th>
                  <th className="py-3.5 px-4">Valor</th>
                  <th className="py-3.5 px-4">Vencimento</th>
                  <th className="py-3.5 px-4">Régua</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Ações Rápidas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredInvoices.map((inv) => {
                  const statusColors = {
                    PAGA: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                    VENCIDA: 'bg-red-500/10 text-red-400 border-red-500/20',
                    COBRADA: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                    PENDENTE: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                  };

                  return (
                    <tr key={inv.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-slate-300">#{inv.id}</td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white text-sm">{inv.customerName}</div>
                        <div className="text-[11px] text-slate-400">{inv.customerPhone}</div>
                      </td>
                      <td className="py-4 px-4 font-bold text-white text-sm">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(inv.amount)}
                      </td>
                      <td className="py-4 px-4 text-slate-300">{inv.dueDate}</td>
                      <td className="py-4 px-4">
                        <span className="font-semibold px-2 py-0.5 rounded text-[11px] bg-slate-800 border border-slate-700 text-slate-300">
                          {inv.stage}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full font-semibold text-[11px] border ${
                            statusColors[inv.status]
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Botão Cobrar no WhatsApp */}
                          {inv.status !== 'PAGA' && (
                            <button
                              onClick={() => handleOpenWhatsAppModal(inv)}
                              title="Cobrar pelo WhatsApp"
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 transition-all font-semibold inline-flex items-center gap-1"
                            >
                              <MessageCircle className="w-3.5 h-3.5" /> Cobrar
                            </button>
                          )}

                          {/* Copiar Link Público */}
                          <button
                            onClick={() => handleCopyLink(inv)}
                            title="Copiar Link de Pagamento Pix"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>

                          {/* Visualizar Fatura Pública */}
                          <Link
                            href={`/fatura/${inv.id}`}
                            title="Abrir Tela do Cliente"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal: Pré-visualizar Cobrança WhatsApp */}
      {isModalOpen && selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Disparo de Cobrança WhatsApp</h3>
                <p className="text-xs text-slate-400">Régua recomendada: {selectedInvoice.stage}</p>
              </div>
            </div>

            {/* Simulação do Balão de WhatsApp */}
            <div className="bg-[#0b141a] p-4 rounded-xl border border-slate-800 mb-6">
              <div className="bg-[#005c4b] text-white p-3.5 rounded-xl rounded-tr-none text-xs leading-relaxed max-w-md ml-auto shadow">
                <p>
                  Olá, <strong>{selectedInvoice.customerName}</strong>! Tudo bem?
                </p>
                <p className="mt-2">
                  Lembramos que a sua fatura de{' '}
                  <strong>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      selectedInvoice.amount
                    )}
                  </strong>{' '}
                  referente a <em>&quot;{selectedInvoice.description}&quot;</em> tem vencimento em{' '}
                  <strong>{selectedInvoice.dueDate}</strong>.
                </p>
                <p className="mt-2">
                  Você pode quitar direto no Pix com confirmação imediata clicando no link abaixo:
                </p>
                <div className="mt-2.5 p-2 bg-black/20 rounded-lg text-emerald-200 text-[11px] font-mono underline break-all">
                  https://recuperapix.com.br/fatura/{selectedInvoice.id}
                </div>
                <div className="text-[10px] text-right text-emerald-200/80 mt-1.5 flex items-center justify-end gap-1">
                  10:45 <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-1/2 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSendWhatsAppNotification}
                className="w-1/2 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Confirmar e Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Nova Cobrança */}
      {isNewInvoiceOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsNewInvoiceOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-white text-base mb-1">Cadastrar Nova Cobrança</h3>
            <p className="text-xs text-slate-400 mb-4">
              Gere o Pix dinâmico e agende o disparo automático da régua.
            </p>

            <form onSubmit={handleCreateInvoice} className="space-y-3.5">
              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1">Nome do Cliente ou Empresa</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Marmoraria São Jorge"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">Telefone WhatsApp</label>
                  <input
                    type="text"
                    required
                    placeholder="(11) 98888-7777"
                    value={newCustomerPhone}
                    onChange={(e) => setNewCustomerPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">Valor (R$)</label>
                  <input
                    type="text"
                    required
                    placeholder="750.00"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1">Data de Vencimento</label>
                <input
                  type="date"
                  required
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1">Descrição do Serviço / Produto</label>
                <input
                  type="text"
                  placeholder="Ex: Serviços de Consultoria - Mês Outubro"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-all"
                >
                  Criar Cobrança e Gerar Pix
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
