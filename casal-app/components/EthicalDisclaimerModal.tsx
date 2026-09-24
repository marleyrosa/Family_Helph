'use client';

import React from 'react';
import { AlertTriangle, ShieldCheck, HeartHandshake, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function EthicalDisclaimerModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900 dark:border dark:border-zinc-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400 mb-4">
          <div className="rounded-xl bg-rose-100 p-3 dark:bg-rose-950/60">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Termos de Uso & Aviso Ético
          </h2>
        </div>

        <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <div className="rounded-xl bg-amber-50 p-4 border border-amber-200/60 dark:bg-amber-950/30 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 flex gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-1">Ferramenta de Apoio e Autoconhecimento</strong>
              Este aplicativo é uma plataforma para diário guiado, reflexão e suporte ao relacionamento. <strong>Não constitui terapia psicoterapêutica profissional, nem substitui consultas médicos ou psiquiátricas.</strong> Em casos de crise grave ou violência, busque ajuda especializada ou ligue 188 (CVV).
            </div>
          </div>

          <div className="flex gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <div>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100 block mb-1">Privacidade & LGPD</strong>
              Seus registros emocionais e respostas diárias são de acesso exclusivo de você e do seu parceiro(a). Os dados são protegidos por criptografia e tratados sob os princípios de transparência e finalidade da Lei Geral de Proteção de Dados (LGPD).
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 text-white font-medium hover:bg-rose-700 transition shadow-md shadow-rose-600/20"
          >
            Compreendo e Aceito os Termos
          </button>
        </div>
      </div>
    </div>
  );
}
