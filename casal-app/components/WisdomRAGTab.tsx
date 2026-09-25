'use client';

import React, { useState } from 'react';
import { INITIAL_RAG_DOCUMENTS, searchRAGKnowledge, generateDynamicRAGResponse } from '../lib/rag-kb';
import { BookOpen, Search, Sparkles, MessageSquare, Bot, ArrowRight, Quote, RefreshCw } from 'lucide-react';

export function WisdomRAGTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [askQuery, setAskQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState<{ text: string; sources: typeof INITIAL_RAG_DOCUMENTS } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const exampleQuestions = [
    'Como dividir as tarefas da casa sem gerar discussão?',
    'Como expressar um incômodo sem parecer crítica ou cobrança?',
    'Como lidar com o cansaço do trabalho e manter a atenção no casal?',
    'Como conversar sobre dinheiro e finanças com alinhamento?',
    'O que fazer quando um quer conversar e o outro precisa de espaço?'
  ];

  const displayedDocs = searchQuery.trim()
    ? searchRAGKnowledge(searchQuery, 10)
    : INITIAL_RAG_DOCUMENTS;

  const handleAskRAG = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const queryToUse = customQuery || askQuery;
    if (!queryToUse.trim()) return;

    if (customQuery) {
      setAskQuery(customQuery);
    }

    setIsSearching(true);
    setTimeout(() => {
      const response = generateDynamicRAGResponse(queryToUse);
      setAiAnswer(response);
      setIsSearching(false);
    }, 400);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 p-6 sm:p-8 text-white shadow-xl shadow-teal-500/15">
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md">
            <BookOpen className="h-6 w-6 text-emerald-200" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Biblioteca de Sabedoria RAG</h1>
            <p className="text-teal-100 text-sm">
              Conhecimento científico curado de especialistas renomados em terapia e psicologia de casal.
            </p>
          </div>
        </div>
      </div>

      {/* AI RAG Assistant Interactive Box */}
      <div className="rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-50/70 via-pink-50/40 to-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-lg mb-2">
          <Bot className="h-5 w-5" />
          <h2>Assistente Virtual RAG de Relacionamento</h2>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4">
          Digite qualquer dúvida do casal para receber uma análise dinâmica fundamentada nos livros de Gottman, Sue Johnson, Esther Perel ou Harville Hendrix.
        </p>

        {/* Suggestion Chips */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          <span className="text-xs font-semibold text-zinc-400 self-center mr-1">Sugestões rápidas:</span>
          {exampleQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAskRAG(undefined, q)}
              className="rounded-full bg-white px-3 py-1 text-xs font-medium text-rose-700 border border-rose-200 hover:bg-rose-100 transition shadow-xs dark:bg-zinc-900 dark:border-zinc-800 dark:text-rose-300"
            >
              💡 {q}
            </button>
          ))}
        </div>

        <form onSubmit={handleAskRAG} className="flex gap-2">
          <input
            type="text"
            value={askQuery}
            onChange={e => setAskQuery(e.target.value)}
            placeholder="Digite sua pergunta aqui (ex: como lidar com a rotina)..."
            className="flex-1 rounded-xl border border-rose-200 px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 font-bold text-white shadow-md hover:bg-rose-700 transition disabled:opacity-50 shrink-0"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isSearching ? 'Consultando...' : 'Consultar RAG'}</span>
          </button>
        </form>

        {aiAnswer && (
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 animate-in slide-in-from-top-2">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                <Sparkles className="h-4 w-4" />
                <span>Resposta RAG Dinâmica</span>
              </div>
              <span className="text-[11px] font-semibold text-zinc-400">
                Pergunta: "{askQuery}"
              </span>
            </div>

            <div className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-line mb-4 font-normal">
              {aiAnswer.text}
            </div>

            <div className="border-t border-zinc-100 pt-3 dark:border-zinc-800">
              <span className="text-xs font-semibold text-zinc-400 block mb-2">Fontes de Especialistas Recuperadas no Retrieval:</span>
              <div className="flex flex-wrap gap-2">
                {aiAnswer.sources.map(s => (
                  <span
                    key={s.id}
                    className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60"
                  >
                    📖 {s.author} ({s.framework}) — {s.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RAG Knowledge Explorer Search */}
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Search className="h-5 w-5 text-indigo-500" />
              Explorar Base de Conhecimento Curada
            </h2>
            <p className="text-xs text-zinc-500">
              {displayedDocs.length} conceitos e frameworks disponíveis.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por antídoto, tarefas, finanças..."
              className="w-full rounded-xl border border-zinc-200 pl-9 pr-4 py-2 text-xs outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>

        {/* Documents Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedDocs.map(doc => (
            <div
              key={doc.id}
              className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                    {doc.framework}
                  </span>
                  <span className="text-xs text-zinc-400">{doc.author}</span>
                </div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-2">
                  {doc.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {doc.chunkText}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-zinc-200/50 dark:border-zinc-800">
                {doc.tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-zinc-500 border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
