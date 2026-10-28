'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  Clock,
  DollarSign,
  Lock,
  MessageSquare,
  QrCode,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

export default function LandingPage() {
  // Calculadora de ROI
  const [revenue, setRevenue] = useState(60000); // Faturamento mensal
  const [defaultRate, setDefaultRate] = useState(12); // % inadimplência

  const lostMonthly = (revenue * defaultRate) / 100;
  const recoveredMonthly = lostMonthly * 0.78; // Recupera ~78%
  const recoveredYearly = recoveredMonthly * 12;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <Zap className="w-6 h-6 fill-slate-950" />
            </div>
            <span className="font-extrabold text-xl text-white tracking-tight">
              Recupera<span className="text-emerald-400">Pix</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#como-funciona" className="hover:text-emerald-400 transition-colors">
              Como Funciona
            </a>
            <a href="#calculadora" className="hover:text-emerald-400 transition-colors">
              Calculadora de ROI
            </a>
            <a href="#planos" className="hover:text-emerald-400 transition-colors">
              Planos
            </a>
            <Link href="/dashboard/regua" className="hover:text-emerald-400 transition-colors">
              Régua WhatsApp
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25 transition-all inline-flex items-center gap-2"
            >
              Acessar Painel <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-8">
            <Sparkles className="w-3.5 h-3.5" /> O SaaS #1 em Recuperação de Inadimplência para PMEs
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6">
            Transforme Faturas Atrasadas em{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
              Pix na Conta
            </span>{' '}
            da sua Empresa.
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Chega de constrangimento e ligações chatas. O <strong>RecuperaPix</strong> envia réguas de
            cobrança humanizadas pelo WhatsApp com botão Pix dinâmico. O cliente clica, paga em 10 segundos e o
            dinheiro cai na hora.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-base bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-xl shadow-emerald-500/30 transition-all inline-flex items-center justify-center gap-2"
            >
              Testar no Dashboard Grátis <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/fatura/FAT-1092"
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-base bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 transition-colors inline-flex items-center justify-center gap-2"
            >
              <QrCode className="w-5 h-5 text-emerald-400" /> Ver Tela do Cliente (Demo)
            </Link>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-slate-800/80">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white">+R$ 14.8M</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Recuperados para PMEs</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">84%</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Quitação em até 48 horas</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white">Zero</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Desgaste na relação</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-teal-400">5 min</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Para ativar e integrar</div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="calculadora" className="py-20 bg-slate-900/40 border-y border-slate-800/80 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Calculadora de Dinheiro Deixado na Mesa
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Veja quanto a sua empresa perde por mês com inadimplência e quanto você vai recuperar com o RecuperaPix.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className="text-slate-300">Faturamento Mensal da sua Empresa:</span>
                  <span className="text-emerald-400 font-bold font-mono">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(revenue)}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="5000"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className="text-slate-300">Taxa Estimada de Inadimplência:</span>
                  <span className="text-amber-400 font-bold font-mono">{defaultRate}% ao mês</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={defaultRate}
                  onChange={(e) => setDefaultRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1">
                <p>• Perda mensal atual sem régua: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lostMonthly)}</strong></p>
                <p>• O RecuperaPix recupera em média <strong>78%</strong> desse montante nos primeiros 7 dias.</p>
              </div>
            </div>

            {/* Results Box (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-teal-950/30 border border-emerald-500/30 rounded-2xl p-6 text-center shadow-lg relative">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                Recuperação Estimada
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight my-2">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(recoveredMonthly)}
              </div>
              <p className="text-xs text-emerald-300 font-semibold mb-6">
                De volta no caixa da sua empresa todos os meses
              </p>

              <div className="pt-4 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-400 block">Total recuperado em 1 ano:</span>
                <span className="text-lg font-bold text-emerald-400">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(recoveredYearly)}
                </span>
              </div>

              <Link
                href="/dashboard"
                className="mt-6 w-full py-3 px-4 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all block shadow-lg shadow-emerald-500/20"
              >
                Recuperar Meu Dinheiro Agora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Como o RecuperaPix Funciona
            </h2>
            <p className="text-base text-slate-400 mt-2">
              Simples, automático e sem atrito para o seu cliente final.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-xl mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Importe ou Cadastre as Faturas</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Integre seu ERP, planilha ou cadastre diretamente pelo painel. O RecuperaPix gera o Pix dinâmico com
                identificador exclusivo para cada cliente.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-xl mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Disparos no WhatsApp com Pix</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                A régua inteligente dispara mensagens cordiais e personalizadas (D-3, D-0, D+2, D+7) com o botão do Pix
                e link seguro de quitação rápida.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-xl mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Baixa Automática no seu Caixa</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Assim que o cliente paga no banco dele, o Pix é conciliado em 2 segundos e a fatura é marcada como
                liquidada sem nenhuma ação manual sua.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="planos" className="py-24 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Planos Transparentes que se Pagam
            </h2>
            <p className="text-base text-slate-400 mt-2">
              Se você recuperar apenas UMA fatura em atraso, a mensalidade do ano inteiro já está paga.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Plan 1 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-white">Starter</h3>
                <p className="text-xs text-slate-400 mt-1">Para pequenas empresas e autônomos</p>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-extrabold text-white">R$ 97</span>
                  <span className="text-xs text-slate-400">/mês</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Até 150 cobranças ativas/mês</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Régua WhatsApp padrão</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Geração de Pix Dinâmico</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Suporte via e-mail</li>
                </ul>
              </div>
              <Link
                href="/dashboard"
                className="mt-8 w-full py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white text-center transition-colors block"
              >
                Começar no Starter
              </Link>
            </div>

            {/* Plan 2 (Highlighted) */}
            <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/20 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl shadow-emerald-500/10">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
                Mais Escolhido por Empresários
              </span>
              <div>
                <h3 className="font-bold text-lg text-white">Pro</h3>
                <p className="text-xs text-slate-400 mt-1">Para empresas com fluxo constante de clientes</p>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-extrabold text-white">R$ 197</span>
                  <span className="text-xs text-slate-400">/mês</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Até 600 cobranças ativas/mês</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Régua WhatsApp personalizável</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> IA de renegociação com desconto Pix</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Relatórios de Aging List para contador</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Suporte prioritário via WhatsApp</li>
                </ul>
              </div>
              <Link
                href="/dashboard"
                className="mt-8 w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-center transition-all block shadow-lg shadow-emerald-500/20"
              >
                Assinar Plano Pro
              </Link>
            </div>

            {/* Plan 3 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-white">Enterprise</h3>
                <p className="text-xs text-slate-400 mt-1">Para operações de grande volume e ERP</p>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-extrabold text-white">R$ 397</span>
                  <span className="text-xs text-slate-400">/mês</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Cobranças ilimitadas</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Integração API REST e Webhooks</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Gerente de conta dedicado</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> SLA garantido de 99.9%</li>
                </ul>
              </div>
              <Link
                href="/dashboard"
                className="mt-8 w-full py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white text-center transition-colors block"
              >
                Falar com Especialista
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-12 bg-slate-950 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-xs">
              <Zap className="w-4 h-4 fill-slate-950" />
            </div>
            <span className="font-bold text-white text-sm">RecuperaPix</span>
            <span>— Tecnologia em Cobrança Inteligente.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/dashboard/regua" className="hover:text-white transition-colors">
              Régua WhatsApp
            </Link>
            <Link href="/fatura/FAT-1092" className="hover:text-white transition-colors">
              Demonstração de Fatura
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
