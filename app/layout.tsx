import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RecuperaPix — Recuperação Automática de Cobranças via WhatsApp com Pix',
  description:
    'SaaS B2B para empresários e PMEs recuperarem faturas atrasadas no WhatsApp com Pix Dinâmico, régua de cobrança inteligente e conciliação em tempo real.',
  keywords: [
    'recuperação de crédito',
    'cobrança whatsapp',
    'pix cobrança',
    'saas b2b',
    'gestão financeira',
    'inadimplência',
  ],
  authors: [{ name: 'Júlia Mendes', url: 'https://github.com/codebyjuliamendes' }],
  openGraph: {
    title: 'RecuperaPix — Transforme Inadimplência em Pix no Caixa',
    description:
      'Automação de cobranças amigáveis e renegociação por WhatsApp com botão Pix. Aumente a conversão em até 84%.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
