'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Bot,
  CheckCheck,
  ChevronRight,
  Clock,
  MessageSquare,
  Send,
  Sparkles,
  Zap,
} from 'lucide-react';
import { REGUA_TEMPLATES } from '@/lib/data';

export default function ReguaPage() {
  const [activeStage, setActiveStage] = useState<'D-3' | 'D-0' | 'D+2' | 'D+7'>('D-0');
  const [tone, setTone] = useState<'cordial' | 'direto' | 'renegociador'>('cordial');
  const [simulatedSent, setSimulatedSent] = useState(false);

  const stageData = REGUA_TEMPLATES[activeStage];

  const handleTestSend = () => {
    setSimulatedSent(true);
    setTimeout(() => setSimulatedSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Painel
            </Link>
            <div className="h-4 w-px bg-slate-800" />
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Configurador de Régua de Cobrança WhatsApp
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Régua Automatizada & Humanizada
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            A régua do RecuperaPix reduz o atrito e aumenta a taxa de conversão em até 84% sem desgastar o
            relacionamento com seus clientes. Escolha a etapa para visualizar e calibrar.
          </p>
        </div>

        {/* 4 Stage Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(['D-3', 'D-0', 'D+2', 'D+7'] as const).map((stage) => {
            const st = REGUA_TEMPLATES[stage];
            const isActive = activeStage === stage;

            return (
              <button
                key={stage}
                onClick={() => setActiveStage(stage)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono font-bold text-sm px-2 py-0.5 rounded ${
                      isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {stage}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">{st.tone}</span>
                </div>
                <h4 className="text-xs font-bold text-white leading-tight">{st.title}</h4>
              </button>
            );
          })}
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">Configuração da Etapa {activeStage}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{stageData.title}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${stageData.badge}`}>
                  {stageData.tone}
                </span>
              </div>

              {/* Tone selection */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Tom da Comunicação
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'cordial', label: '🤝 Cordial & Amigável' },
                    { id: 'direto', label: '⚡ Direto ao Ponto' },
                    { id: 'renegociador', label: '🎁 Com Incentivo Pix' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTone(t.id as any)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                        tone === t.id
                          ? 'bg-slate-800 border-emerald-500 text-white shadow'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Tags Available */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Variáveis Dinâmicas Ativas
                </label>
                <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                  <span className="bg-slate-950 border border-slate-800 px-2 py-1 rounded text-emerald-400">
                    {'{nome}'}
                  </span>
                  <span className="bg-slate-950 border border-slate-800 px-2 py-1 rounded text-emerald-400">
                    {'{valor}'}
                  </span>
                  <span className="bg-slate-950 border border-slate-800 px-2 py-1 rounded text-emerald-400">
                    {'{vencimento}'}
                  </span>
                  <span className="bg-slate-950 border border-slate-800 px-2 py-1 rounded text-emerald-400">
                    {'{servico}'}
                  </span>
                  <span className="bg-slate-950 border border-slate-800 px-2 py-1 rounded text-emerald-400">
                    {'{link_pix}'}
                  </span>
                </div>
              </div>

              {/* Expected Conversion Metric */}
              <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Eficácia Estimada no WhatsApp</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Baseado no histórico de mais de 45.000 cobranças Pix processadas
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-emerald-400">
                    {activeStage === 'D-3' ? '52%' : activeStage === 'D-0' ? '84%' : activeStage === 'D+2' ? '68%' : '73%'}
                  </span>
                  <span className="text-[10px] block text-slate-400">de quitação</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleTestSend}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  {simulatedSent ? 'Disparo Simulado com Sucesso! 📲' : 'Simular Disparo desta Etapa'}
                </button>
              </div>
            </div>
          </div>

          {/* Smartphone Mockup Preview (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[340px] bg-slate-950 rounded-[40px] border-[8px] border-slate-800 shadow-2xl overflow-hidden relative">
              {/* Phone Speaker Notch */}
              <div className="h-6 bg-slate-950 flex items-center justify-center">
                <div className="w-16 h-3 bg-slate-800 rounded-full" />
              </div>

              {/* WhatsApp Header Mock */}
              <div className="bg-[#1f2c34] text-white px-4 py-3 flex items-center gap-3 border-b border-[#2a3942]">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-xs">
                  RP
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold truncate">RecuperaPix Notificador</h4>
                  <p className="text-[10px] text-emerald-400">Conta Comercial Verificada</p>
                </div>
              </div>

              {/* Chat Canvas */}
              <div className="bg-[#0b141a] p-3 min-h-[380px] flex flex-col justify-end space-y-3 font-sans">
                {/* Date bubble */}
                <div className="text-center">
                  <span className="bg-[#182229] text-[10px] text-slate-400 px-2.5 py-1 rounded-md shadow">
                    HOJE
                  </span>
                </div>

                {/* Message Bubble */}
                <div className="bg-[#005c4b] text-white p-3 rounded-xl rounded-tr-none text-xs leading-relaxed shadow max-w-[92%] ml-auto">
                  <p>
                    Olá, <strong>Academia Iron Fit</strong>! Tudo bem?
                  </p>
                  <p className="mt-2">
                    {activeStage === 'D-3' &&
                      'Passando para lembrar que sua fatura de R$ 1.450,00 referente a "Software de Catraca" vence em 3 dias. Para sua comodidade, você pode antecipar via Pix.'}
                    {activeStage === 'D-0' &&
                      'Sua fatura de R$ 1.450,00 vence hoje. Para pagar sem filas nem juros, basta acessar o link ou usar o Pix Copia e Cola:'}
                    {activeStage === 'D+2' &&
                      'Notamos que sua fatura de R$ 1.450,00 ainda não foi identificada. Atualizamos seu link para quitação imediata via Pix sem acréscimos:'}
                    {activeStage === 'D+7' &&
                      'Liberamos uma condição especial de 10% de desconto para pagamento à vista no Pix ou opção de parcelamento para sua fatura de R$ 1.450,00:'}
                  </p>

                  <div className="mt-2 p-2 bg-black/25 rounded-lg text-emerald-200 text-[11px] font-mono underline break-all">
                    https://recuperapix.com.br/fatura/FAT-1092
                  </div>

                  <div className="text-[9px] text-right text-emerald-200/70 mt-1 flex items-center justify-end gap-1">
                    10:48 <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                  </div>
                </div>
              </div>

              {/* Bottom Phone Bar */}
              <div className="h-5 bg-slate-950 flex items-center justify-center">
                <div className="w-24 h-1 bg-slate-800 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
