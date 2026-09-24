'use client';

import React, { useState } from 'react';
import { UserProfile } from '../lib/types';
import { AppStore } from '../lib/store';
import { FileText, Calendar, Sparkles, User, Users, BookOpen, CheckCircle, Award, Lightbulb } from 'lucide-react';

interface Props {
  store: AppStore;
  partner1: UserProfile;
  partner2: UserProfile;
}

export function ReportsTab({ store, partner1, partner2 }: Props) {
  const [subTab, setSubTab] = useState<'weekly' | 'individual' | 'monthly'>('weekly');
  const [selectedIndividualUser, setSelectedIndividualUser] = useState<string>(partner1.id);

  const latestWeeklySummary = store.weeklySummaries[0];
  const selectedUserObj = selectedIndividualUser === partner1.id ? partner1 : partner2;
  const partnerUserObj = selectedIndividualUser === partner1.id ? partner2 : partner1;

  const currentIndividualReport = store.individualReports.find(
    r => r.userId === selectedIndividualUser
  ) || store.individualReports[0];

  const monthlyRanking = store.monthlyRankings[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 sm:p-8 text-white shadow-xl shadow-indigo-500/15">
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md">
            <FileText className="h-6 w-6 text-pink-200" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Central de Relatórios & RAG</h1>
            <p className="text-purple-100 text-sm">
              Sínteses geradas pela IA com base em evidências científicas de terapia de casal.
            </p>
          </div>
        </div>
      </div>

      {/* Subtab Selector */}
      <div className="flex rounded-2xl bg-zinc-100 p-1.5 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
        <button
          onClick={() => setSubTab('weekly')}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-semibold transition ${
            subTab === 'weekly'
              ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
          }`}
        >
          <Users className="h-4 w-4 text-rose-500" />
          <span>Resumo Semanal (Sábado)</span>
        </button>

        <button
          onClick={() => setSubTab('individual')}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-semibold transition ${
            subTab === 'individual'
              ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
          }`}
        >
          <User className="h-4 w-4 text-indigo-500" />
          <span>Relatório Individual (Domingo)</span>
        </button>

        <button
          onClick={() => setSubTab('monthly')}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-semibold transition ${
            subTab === 'monthly'
              ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
          }`}
        >
          <Award className="h-4 w-4 text-amber-500" />
          <span>Evolução Mensal</span>
        </button>
      </div>

      {/* 1. WEEKLY SUMMARY SUBTAB */}
      {subTab === 'weekly' && latestWeeklySummary && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-6">
              <div>
                <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                  Resumo Conjunto do Casal
                </span>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-2">
                  Visão Geral da Semana ({latestWeeklySummary.weekStartDate} a {latestWeeklySummary.weekEndDate})
                </h2>
              </div>
              <div className="flex items-center gap-2 bg-rose-50 px-4 py-2 rounded-2xl dark:bg-rose-950/40 border border-rose-200/50">
                <Sparkles className="h-5 w-5 text-rose-500" />
                <span className="text-sm font-bold text-rose-700 dark:text-rose-300">
                  Média Geral: {latestWeeklySummary.overallAvgMood}/5.0
                </span>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
              <p className="text-base">{latestWeeklySummary.summaryText}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Positive Highlights */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 mb-3">
                  <CheckCircle className="h-4 w-4" />
                  Destaques Positivos da Semana
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
                  {latestWeeklySummary.positiveHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500">•</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Growth points */}
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 dark:border-indigo-900/40 dark:bg-indigo-950/20">
                <h3 className="text-sm font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-2 mb-3">
                  <Lightbulb className="h-4 w-4" />
                  Oportunidades de Alinhamento
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
                  {latestWeeklySummary.growthPoints.map((gp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-500">•</span>
                      <span>{gp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Suggested weekend activity */}
            <div className="mt-6 rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 mb-1">
                🎯 Atividade Sugerida para o Fim de Semana
              </h4>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {latestWeeklySummary.suggestedActivity}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. INDIVIDUAL REPORT SUBTAB */}
      {subTab === 'individual' && (
        <div className="space-y-6">
          {/* User selector for individual report */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase text-zinc-400">Ver Relatório de:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedIndividualUser(partner1.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                  selectedIndividualUser === partner1.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300'
                }`}
              >
                <span>{partner1.avatarEmoji}</span>
                <span>{partner1.fullName}</span>
              </button>
              <button
                onClick={() => setSelectedIndividualUser(partner2.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                  selectedIndividualUser === partner2.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300'
                }`}
              >
                <span>{partner2.avatarEmoji}</span>
                <span>{partner2.fullName}</span>
              </button>
            </div>
          </div>

          {currentIndividualReport && (
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-3xl">{selectedUserObj.avatarEmoji}</span>
                <div>
                  <span className="rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                    Relatório Individual de Domingo
                  </span>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                    Análise Construtiva para {selectedUserObj.fullName}
                  </h2>
                </div>
              </div>

              {/* Text summary */}
              <div className="rounded-2xl bg-zinc-50 p-5 border border-zinc-200/60 dark:bg-zinc-900 dark:border-zinc-800 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {currentIndividualReport.reportText}
              </div>

              {/* Constructive suggestions */}
              <div>
                <h3 className="text-md font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  Sugestões Práticas de Ação (Tom Construtivo)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentIndividualReport.constructiveSuggestions.map((sug, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50"
                    >
                      <h4 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 mb-1">
                        {sug.title}
                      </h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3">
                        {sug.description}
                      </p>
                      <div className="rounded-xl bg-indigo-50 p-3 dark:bg-indigo-950/40 text-xs font-semibold text-indigo-900 dark:text-indigo-200 border border-indigo-100 dark:border-indigo-900/50">
                        👉 Passos: {sug.actionableStep}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RAG References */}
              <div>
                <h3 className="text-md font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-rose-500" />
                  Fundamentação RAG de Especialistas
                </h3>
                <div className="space-y-3">
                  {currentIndividualReport.ragReferences.map((ref, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-rose-100 bg-rose-50/30 p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-rose-700 dark:text-rose-400">
                          {ref.author} • {ref.framework}
                        </span>
                        <span className="text-xs text-zinc-400">{ref.concept}</span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 italic">
                        "{ref.quoteOrSummary}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. MONTHLY EVOLUTION SUBTAB */}
      {subTab === 'monthly' && monthlyRanking && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="rounded-2xl bg-amber-100 p-3 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                  Consolidação Mensal de Evolução
                </span>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                  Relatório do Mês ({monthlyRanking.month}/{monthlyRanking.year})
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
                <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">🌟 Melhor Semana</span>
                <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100 mt-1">
                  {monthlyRanking.bestWeek}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 dark:border-amber-900/50 dark:bg-amber-950/20">
                <span className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400">🌱 Semana de Aprendizado</span>
                <p className="text-sm font-semibold text-amber-900 dark:text-amber-100 mt-1">
                  {monthlyRanking.challengingWeek}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                Marcos de Evolução do Casal
              </h3>
              <div className="space-y-2">
                {monthlyRanking.evolutionHighlights.map((hl, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl bg-zinc-50 p-3.5 border border-zinc-200/60 dark:bg-zinc-900 dark:border-zinc-800 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-5 dark:border-purple-900/50 dark:bg-purple-950/20">
              <h4 className="text-xs font-bold uppercase text-purple-700 dark:text-purple-300 mb-1">
                💬 Nota do Terapeuta Virtual
              </h4>
              <p className="text-sm text-purple-900 dark:text-purple-200">
                {monthlyRanking.therapistNotes}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
