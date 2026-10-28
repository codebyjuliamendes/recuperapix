# ⚡ RecuperaPix — B2B SaaS de Recuperação de Inadimplência via WhatsApp com Pix

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19.3-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

> **O SaaS que transforma faturas atrasadas em Pix na conta de pequenas e médias empresas no piloto automático.**

---

## 💡 A Dor do Empresário & Modelo de Negócio

Pequenas e médias empresas (clínicas, escolas, academias, agências, distribuidores e prestadores de serviços) perdem entre **10% a 25% de seu faturamento líquido** por conta de clientes que esquecem de pagar ou atrasam boletos.

Ligar ou mandar mensagens de cobrança manuais é:
- **Constrangedor** e desgasta o relacionamento comercial;
- **Lento**, dependendo de horas de atendentes e do time financeiro;
- **Ineficiente**, pois boletos levam até 3 dias úteis para compensar.

### A Solução RecuperaPix:
O **RecuperaPix** automatiza todo o ciclo de contas a receber. Ele envia réguas de comunicação amigáveis pelo WhatsApp com **chave Pix dinâmica e QR Code Copia-e-Cola**. O cliente clica no link, paga pelo app do banco em 10 segundos, e a conciliação acontece em tempo real no dashboard do empresário.

---

## 🎯 Proposta de Valor & ROI do Cliente

| Cenário Tradicional (Sem RecuperaPix) | Com RecuperaPix |
| :--- | :--- |
| Ligações de cobrança manuais e incômodas | Mensagens automáticas, cordiais e humanizadas no WhatsApp |
| Boletos com taxa alta e 3 dias de compensação | Chave Pix dinâmica sem taxa de emissão, liquidada na hora |
| 35% a 45% de perda definitiva de créditos | **Até 84% de recuperação nos primeiros 7 dias** |
| Cliente devedor com vergonha de voltar a comprar | Acordo facilitado com incentivo Pix em 1 clique |

> **Calculadora de ROI:** Para uma empresa que fatura R$ 60.000/mês com 12% de inadimplência (R$ 7.200 em risco), o RecuperaPix recupera em média **R$ 5.616 todos os meses**. Uma assinatura do plano Pro (R$ 197/mês) gera um **retorno sobre investimento de 28x**!

---

## ✨ Funcionalidades Principais

1. **Dashboard Financeiro Executivo (`/dashboard`)**:
   - Métricas em tempo real: Total recuperado, total em aberto, taxa de conversão e tempo médio de pagamento.
   - Gestão de devedores e faturas com status em tempo real (`PENDENTE`, `VENCIDA`, `COBRADA`, `PAGA`).
   - Ação rápida de disparo de cobrança e geração de link instantâneo.
   - Modal de cadastro de nova cobrança com geração automática do payload Pix.

2. **Régua Inteligente no WhatsApp (`/dashboard/regua`)**:
   - Simulador interativo com mockup realista de smartphone.
   - Etapas de cobrança pré-calibradas:
     - 🕒 **D-3**: Alerta preventivo cortês.
     - 📅 **D-0**: Notificação do dia do vencimento com botão Copia-e-Cola.
     - ⚠️ **D+2**: Lembrete suave pós-vencimento sem acréscimos.
     - 🤝 **D+7**: Renegociação amigável com incentivo de 10% de desconto no Pix à vista.

3. **Página de Checkout Pix Pública do Cliente (`/fatura/[id]`)**:
   - Interface limpa, responsiva e segura (estilo banco digital).
   - QR Code Pix dinâmico renderizado em SVG de alto contraste.
   - Botão de "Copiar Código Pix" com feedback de cópia em 1 clique.
   - **Simulador de Pagamento em Tempo Real (Sandbox)** com animação festiva de confetes e emissão imediata do comprovante de quitação.

4. **Landing Page Comercial B2B de Alta Conversão (`/`)**:
   - Calculadora interativa de ROI ajustável com sliders de faturamento e inadimplência.
   - Tabela de precificação com 3 planos SaaS:
     - **Starter** (R$ 97/mês): até 150 cobranças ativas.
     - **Pro** (R$ 197/mês): até 600 cobranças + IA de renegociação.
     - **Enterprise** (R$ 397/mês): cobranças ilimitadas + integração API/Webhooks.

---

## 🛠️ Stack Tecnológica

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, Turbopack, Partial Prerendering)
- **Linguagem**: [TypeScript 5](https://www.typescriptlang.org)
- **Biblioteca UI**: [React 19](https://react.dev)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com)
- **Ícones**: [Lucide React](https://lucide.dev)
- **Efeitos e Interatividade**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Armazenamento**: LocalStorage com sincronização híbrida & pronto para PostgreSQL/Prisma

---

## 🚀 Como Executar Localmente

### 1. Clonar o Repositório
```bash
git clone https://github.com/codebyjuliamendes/recuperapix.git
cd recuperapix
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Rodar em Modo de Desenvolvimento
```bash
npm run dev
```
Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a landing page comercial e o dashboard.

### 4. Build de Produção
```bash
npm run build
npm run start
```

---

## 🌐 Rotas da Aplicação

- `/` — Landing Page Comercial com Calculadora de ROI e Planos
- `/dashboard` — Painel do Empresário com Gestão de Cobranças e Métricas
- `/dashboard/regua` — Simulador e Editor de Réguas WhatsApp
- `/fatura/[id]` — Tela Pública de Pagamento Pix do Cliente (Ex: `/fatura/FAT-1092`)

---

## 👩‍💻 Autora

Desenvolvido por **[Júlia Mendes](https://github.com/codebyjuliamendes)**  
🌐 [Portfólio (JúliaOS)](https://codebyjuliamendes.github.io) · 💼 [LinkedIn](https://www.linkedin.com/in/codebyjuliamendes)
