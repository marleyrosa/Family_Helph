'use client';

import React from 'react';
import { UserProfile, Couple } from '../lib/types';
import { AppStore } from '../lib/store';
import { Heart, TrendingUp, Sparkles, Calendar, MessageSquare, ArrowRight, Sun, Award } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

interface Props {
  store: AppStore;
  partner1: UserProfile;
  partner2: UserProfile;
  onNavigateTab: (tab: string) => void;
}

export function DashboardTab({ store, partner1, partner2, onNavigateTab }: Props) {
  // Build chart data combining mood logs for partner 1 and partner 2 by date
  const dateMap: { [date: string]: { dateLabel: string; p1?: number; p2?: number } } = {};

  store.moodLogs.forEach(m => {
    const formattedDate = new Date(m.date + 'T00:00:00').toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    });
    if (!dateMap[m.date]) {
      dateMap[m.date] = { dateLabel: formattedDate };
    }
    if (m.userId === partner1.id) {
      dateMap[m.date].p1 = m.moodScore;
    } else if (m.userId === partner2.id) {
      dateMap[m.date].p2 = m.moodScore;
    }
  });

  const chartData = Object.keys(dateMap)
    .sort()
    .slice(-7)
    .map(date => dateMap[date]);

  // Averages
  const p1Moods = store.moodLogs.filter(m => m.userId === partner1.id);
  const p2Moods = store.moodLogs.filter(m => m.userId === partner2.id);

  const avg1 = p1Moods.length
    ? (p1Moods.reduce((a, b) => a + b.moodScore, 0) / p1Moods.length).toFixed(1)
    : '5.0';
  const avg2 = p2Moods.length
    ? (p2Moods.reduce((a, b) => a + b.moodScore, 0) / p2Moods.length).toFixed(1)
    : '5.0';
  const coupleAvg = (
    (parseFloat(avg1) + parseFloat(avg2)) / 2
  ).toFixed(1);

  // Appreciations list
  const appreciations = store.dailyAnswers
    .filter(a => a.q3PartnerPositive)
    .map(a => {
      const author = a.userId === partner1.id ? partner1 : partner2;
      const target = a.userId === partner1.id ? partner2 : partner1;
      return {
        id: a.id,
        author,
        target,
        text: a.q3PartnerPositive,
        date: a.date
      };
    })
    .slice(0, 4);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 p-6 sm:p-8 text-white shadow-xl shadow-rose-500/10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-5 w-5 text-amber-200" />
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-100">
                Dashboard de Conexão Conjugal
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Evolução de {partner1.fullName.split(' ')[0]} & {partner2.fullName.split(' ')[0]}
            </h1>
            <p className="text-rose-100 text-sm mt-1">
              Acompanhamento contínuo de clima emocional, apreço mútuo e resumos de RAG.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('diary')}
            className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-rose-600 shadow-md hover:bg-rose-50 transition shrink-0"
          >
            <span>Fazer Check-in Hoje</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-zinc-400">Humor Médio do Casal</span>
            <div className="rounded-xl bg-rose-100 p-2 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
              <Heart className="h-4 w-4 fill-rose-500" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100">{coupleAvg}</span>
            <span className="text-xs text-zinc-500">/ 5.0</span>
          </div>
          <p className="mt-1 text-xs text-emerald-600 font-medium flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Nível alto de sintonia emocional
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-zinc-400">{partner1.avatarEmoji} {partner1.fullName.split(' ')[0]}</span>
            <span className="text-xs font-bold text-amber-500">Média 7 dias</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100">{avg1}</span>
            <span className="text-xs text-zinc-500">/ 5.0</span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            {p1Moods.length} registros nesta semana
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-zinc-400">{partner2.avatarEmoji} {partner2.fullName.split(' ')[0]}</span>
            <span className="text-xs font-bold text-amber-500">Média 7 dias</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100">{avg2}</span>
            <span className="text-xs text-zinc-500">/ 5.0</span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            {p2Moods.length} registros nesta semana
          </p>
        </div>
      </div>

      {/* Chart Card */}
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-rose-500" />
              Gráfico de Humor Sobreposto (Últimos 7 Dias)
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Acompanhe as oscilações diárias de cada um para identificar momentos de sintonia ou sobrecarga.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500"></span>
              <span>{partner1.fullName.split(' ')[0]} ({partner1.avatarEmoji})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-indigo-500"></span>
              <span>{partner2.fullName.split(' ')[0]} ({partner2.avatarEmoji})</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
              <XAxis dataKey="dateLabel" tick={{ fontSize: 12 }} stroke="#71717a" />
              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 12 }} stroke="#71717a" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Line
                type="monotone"
                dataKey="p1"
                name={partner1.fullName}
                stroke="#f43f5e"
                strokeWidth={3}
                dot={{ r: 5, fill: '#f43f5e' }}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="p2"
                name={partner2.fullName}
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 5, fill: '#6366f1' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Wall of Appreciation Card */}
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg">
            <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
            <h2>Mural de Apreciação Mútua</h2>
          </div>
          <span className="text-xs text-zinc-400">Gottman 5:1 Antídoto</span>
        </div>

        {appreciations.length === 0 ? (
          <p className="text-sm text-zinc-500 py-4 text-center">
            Nenhuma apreciação registrada hoje. Faça o check-in diário para alimentar a conta emocional do casal!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {appreciations.map(appr => (
              <div
                key={appr.id}
                className="rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50/50 to-pink-50/30 p-4 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{appr.author.avatarEmoji}</span>
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-300">
                    {appr.author.fullName.split(' ')[0]} sobre {appr.target.fullName.split(' ')[0]}
                  </span>
                </div>
                <p className="text-sm text-zinc-700 italic dark:text-zinc-300">
                  "{appr.text}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
