'use client';

import React, { useState } from 'react';
import { Sparkles, ExternalLink, X, Moon, Star, Compass } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultUrl?: string;
}

export function HoroscopeModal({
  isOpen,
  onClose,
  defaultUrl = 'https://www.personare.com.br/horoscopo-hoje'
}: Props) {
  const [horoscopeUrl, setHoroscopeUrl] = useState(defaultUrl);
  const [isEditingUrl, setIsEditingUrl] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[85vh] flex flex-col rounded-3xl bg-white shadow-2xl overflow-hidden dark:bg-zinc-950 dark:border dark:border-zinc-800">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-purple-100 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 px-6 py-4 text-white dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400/20 text-amber-300 backdrop-blur-md border border-amber-400/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight">Horóscopo & Astrologia do Casal</h2>
                <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-semibold text-amber-200 border border-amber-400/30">
                  Link Externo
                </span>
              </div>
              <p className="text-xs text-purple-200">
                Previsões diárias dos signos de Marley Luciano e Silvia Amelia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={horoscopeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-amber-400 px-3.5 py-2 text-xs font-bold text-zinc-950 hover:bg-amber-300 transition shadow-md"
              title="Abrir em Nova Aba"
            >
              <span>Abrir no Site</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <button
              onClick={onClose}
              className="rounded-full p-2 text-purple-200 hover:bg-white/10 hover:text-white transition"
              title="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* URL Controller bar */}
        <div className="flex items-center justify-between bg-purple-50 px-6 py-2.5 border-b border-purple-100 dark:bg-zinc-900 dark:border-zinc-800 text-xs">
          <div className="flex items-center gap-2 flex-1 mr-4">
            <span className="text-zinc-500 font-semibold shrink-0">Site Atual:</span>
            {isEditingUrl ? (
              <input
                type="url"
                value={horoscopeUrl}
                onChange={e => setHoroscopeUrl(e.target.value)}
                onBlur={() => setIsEditingUrl(false)}
                className="w-full rounded-lg border border-purple-300 px-3 py-1 outline-none text-xs dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
              />
            ) : (
              <span
                onClick={() => setIsEditingUrl(true)}
                className="font-mono text-purple-700 dark:text-purple-300 truncate cursor-pointer hover:underline"
                title="Clique para alterar a URL do Horóscopo"
              >
                {horoscopeUrl}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsEditingUrl(!isEditingUrl)}
            className="text-xs text-purple-600 font-medium hover:underline dark:text-purple-400 shrink-0"
          >
            {isEditingUrl ? 'Concluído' : 'Alterar Link'}
          </button>
        </div>

        {/* Iframe Viewport Container */}
        <div className="flex-1 w-full bg-zinc-100 dark:bg-zinc-900 relative">
          <iframe
            src={horoscopeUrl}
            title="Horóscopo do Dia"
            className="w-full h-full border-0"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between bg-white px-6 py-3 border-t border-zinc-100 text-xs text-zinc-500 dark:bg-zinc-950 dark:border-zinc-800">
          <span className="flex items-center gap-1.5">
            <Moon className="h-3.5 w-3.5 text-indigo-500" />
            <span>Astrologia & Sintonia do Casal</span>
          </span>
          <button
            onClick={onClose}
            className="rounded-xl bg-zinc-100 px-4 py-1.5 font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
