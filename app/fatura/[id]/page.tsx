'use client';

import { Suspense, use, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Clock, Copy, QrCode, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Invoice, INITIAL_INVOICES } from '@/lib/data';

function FaturaContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Carrega do LocalStorage se existir, senão pega do array inicial
    const stored = localStorage.getItem('recuperapix_invoices');
    let list: Invoice[] = INITIAL_INVOICES;
    if (stored) {
      try {
        list = JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    const found = list.find((i) => i.id === resolvedParams.id);
    if (found) {
      setInvoice(found);
    } else {
      // Mock fallback se o ID não bater
      setInvoice({
        id: resolvedParams.id,
        customerName: 'Cliente Especial',
        customerDocument: '00.000.000/0001-00',
        customerPhone: '(11) 99999-9999',
        amount: 850.0,
        originalAmount: 850.0,
        dueDate: '2026-10-28',
        status: 'VENCIDA',
        stage: 'D-0',
        description: 'Prestação de Serviços Comerciais',
        pixKey: 'financeiro@recuperapix.com.br',
        pixPayload: `00020126580014br.gov.bcb.pix0136${resolvedParams.id}recuperapix5204000053039865406850.005802BR5920RECUPERAPIX6009SAOPAULO62070503***6304E8A1`,
      });
    }
  }, [resolvedParams.id]);

  const handleCopy = () => {
    if (!invoice) return;
    navigator.clipboard.writeText(invoice.pixPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulatePayment = () => {
    if (!invoice || invoice.status === 'PAGA') return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const updated: Invoice = {
        ...invoice,
        status: 'PAGA',
        paidAt: new Date().toLocaleString('pt-BR'),
      };
      setInvoice(updated);

      // Salva no LocalStorage
      const stored = localStorage.getItem('recuperapix_invoices');
      let list: Invoice[] = INITIAL_INVOICES;
      if (stored) {
        try {
          list = JSON.parse(stored);
        } catch (e) {
          console.error(e);
        }
      }
      const nextList = list.map((i) => (i.id === invoice.id ? updated : i));
      if (!list.some((i) => i.id === invoice.id)) {
        nextList.push(updated);
      }
      localStorage.setItem('recuperapix_invoices', JSON.stringify(nextList));

      // Dispara efeito de confete
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10B981', '#34D399', '#6EE7B7', '#059669'],
        });
      } catch (e) {
        console.error(e);
      }
    }, 1200);
  };

  if (!invoice) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-500"></div>
      </div>
    );
  }

  const isPaid = invoice.status === 'PAGA';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-lg w-full mx-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Painel
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" /> Pagamento Seguro Pix
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Business Info Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-slate-800/80">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">Fatura Digital</span>
              <h1 className="text-lg font-bold text-white leading-tight">RecuperaPix Enterprise</h1>
              <p className="text-xs text-slate-400">Identificador: #{invoice.id}</p>
            </div>
          </div>

          {/* Status Alert */}
          <div className="my-6">
            {isPaid ? (
              <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3 text-emerald-300">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm">Fatura Paga com Sucesso!</h3>
                  <p className="text-xs text-emerald-400/80 mt-0.5">
                    Pagamento confirmado via Pix em {invoice.paidAt || 'tempo real'}. Obrigado!
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-center justify-between text-amber-200">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <div>
                    <span className="text-xs block text-amber-400/80 uppercase font-bold tracking-wider">Vencimento</span>
                    <strong className="text-sm font-semibold">{invoice.dueDate}</strong>
                  </div>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {invoice.status}
                </span>
              </div>
            )}
          </div>

          {/* Amount & Description */}
          <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/60 mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-xs text-slate-400">Valor Total a Pagar</span>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(invoice.amount)}
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800/60 flex justify-between text-xs text-slate-400">
              <span>Cliente:</span>
              <span className="text-slate-200 font-medium">{invoice.customerName}</span>
            </div>
            <div className="pt-1 flex justify-between text-xs text-slate-400">
              <span>Serviço:</span>
              <span className="text-slate-200">{invoice.description}</span>
            </div>
          </div>

          {/* Pix QR Code Section */}
          {!isPaid ? (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl flex flex-col items-center justify-center shadow-inner mx-auto max-w-[240px]">
                {/* SVG Mock QR Code */}
                <svg viewBox="0 0 160 160" className="w-44 h-44 text-slate-900" fill="currentColor">
                  {/* Outer Frame */}
                  <rect x="0" y="0" width="160" height="160" fill="white" />
                  {/* Top-left position marker */}
                  <rect x="10" y="10" width="40" height="40" fill="black" />
                  <rect x="16" y="16" width="28" height="28" fill="white" />
                  <rect x="22" y="22" width="16" height="16" fill="black" />
                  {/* Top-right position marker */}
                  <rect x="110" y="10" width="40" height="40" fill="black" />
                  <rect x="116" y="16" width="28" height="28" fill="white" />
                  <rect x="122" y="22" width="16" height="16" fill="black" />
                  {/* Bottom-left position marker */}
                  <rect x="10" y="110" width="40" height="40" fill="black" />
                  <rect x="16" y="116" width="28" height="28" fill="white" />
                  <rect x="22" y="122" width="16" height="16" fill="black" />
                  {/* Pix Matrix patterns */}
                  <rect x="60" y="15" width="10" height="10" fill="black" />
                  <rect x="75" y="15" width="10" height="10" fill="black" />
                  <rect x="90" y="25" width="10" height="15" fill="black" />
                  <rect x="60" y="40" width="15" height="10" fill="black" />
                  <rect x="85" y="45" width="10" height="10" fill="black" />
                  <rect x="15" y="65" width="15" height="10" fill="black" />
                  <rect x="35" y="70" width="10" height="15" fill="black" />
                  <rect x="55" y="60" width="20" height="20" fill="black" />
                  <rect x="85" y="65" width="15" height="15" fill="black" />
                  <rect x="110" y="60" width="10" height="25" fill="black" />
                  <rect x="130" y="65" width="15" height="10" fill="black" />
                  <rect x="20" y="90" width="10" height="10" fill="black" />
                  <rect x="40" y="95" width="15" height="10" fill="black" />
                  <rect x="65" y="85" width="10" height="20" fill="black" />
                  <rect x="85" y="90" width="20" height="10" fill="black" />
                  <rect x="120" y="95" width="20" height="10" fill="black" />
                  <rect x="60" y="115" width="15" height="15" fill="black" />
                  <rect x="85" y="125" width="10" height="15" fill="black" />
                  <rect x="105" y="115" width="20" height="10" fill="black" />
                  <rect x="135" y="120" width="15" height="20" fill="black" />
                  <rect x="65" y="140" width="30" height="10" fill="black" />
                  <rect x="105" y="135" width="15" height="15" fill="black" />
                </svg>
                <div className="flex items-center gap-1.5 mt-2 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  <QrCode className="w-3.5 h-3.5 text-emerald-600" /> Aponte a câmera do banco
                </div>
              </div>

              {/* Copy Pix Button */}
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-medium">Pix Copia e Cola:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={invoice.pixPayload}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none select-all"
                  />
                  <button
                    onClick={handleCopy}
                    type="button"
                    className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      copied
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>

              {/* Sandbox Payment Action */}
              <div className="pt-4 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Processando no Banco Central...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-200" />
                      Simular Pagamento Instantâneo (Demo)
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-slate-500 mt-2">
                  Ambiente de demonstração do RecuperaPix. O pagamento reflete no painel em tempo real.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-white">Comprovante de Quitação Emitido</h2>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Esta obrigação financeira foi totalmente liquidada. A empresa emissora já foi notificada da liquidação.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
              >
                Ir para o Dashboard de Cobranças
              </Link>
            </div>
          )}
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-slate-500 mt-6">
          © {new Date().getFullYear()} RecuperaPix Tecnologia S.A. · Processamento seguro de pagamentos instantâneos.
        </p>
      </div>
    </div>
  );
}

export default function FaturaPage(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-500"></div>
        </div>
      }
    >
      <FaturaContent params={props.params} />
    </Suspense>
  );
}
