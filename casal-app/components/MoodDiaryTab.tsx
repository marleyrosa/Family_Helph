'use client';

import React, { useState, useEffect } from 'react';
import { UserProfile, MoodScore } from '../lib/types';
import { AppStore } from '../lib/store';
import { Sun, Heart, CheckCircle2, Send, Sparkles } from 'lucide-react';

interface Props {
  store: AppStore;
  activeUser: UserProfile;
  partnerUser: UserProfile;
  onSaved: () => void;
}

export function MoodDiaryTab({ store, activeUser, partnerUser, onSaved }: Props) {
  const today = new Date().toISOString().split('T')[0];

  const existingMood = store.moodLogs.find(
    m => m.userId === activeUser.id && m.date === today
  );
  const existingAnswer = store.dailyAnswers.find(
    a => a.userId === activeUser.id && a.date === today
  );

  const [selectedMood, setSelectedMood] = useState<MoodScore>(
    existingMood?.moodScore || 4
  );
  const [moodNote, setMoodNote] = useState(existingMood?.note || '');

  const [q1Feeling, setQ1Feeling] = useState(existingAnswer?.q1Feeling || '');
  const [q2Event, setQ2Event] = useState(existingAnswer?.q2ImportantEvent || '');
  const [q3Positive, setQ3Positive] = useState(existingAnswer?.q3PartnerPositive || '');
  const [q4Inconvenient, setQ4Inconvenient] = useState(existingAnswer?.q4PartnerInconvenient || '');

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync state whenever activeUser changes or store updates
  useEffect(() => {
    const curMood = store.moodLogs.find(
      m => m.userId === activeUser.id && m.date === today
    );
    const curAnswer = store.dailyAnswers.find(
      a => a.userId === activeUser.id && a.date === today
    );

    setSelectedMood(curMood?.moodScore || 4);
    setMoodNote(curMood?.note || '');
    setQ1Feeling(curAnswer?.q1Feeling || '');
    setQ2Event(curAnswer?.q2ImportantEvent || '');
    setQ3Positive(curAnswer?.q3PartnerPositive || '');
    setQ4Inconvenient(curAnswer?.q4PartnerInconvenient || '');
  }, [activeUser.id, store.moodLogs, store.dailyAnswers, today]);

  const moods: { score: MoodScore; emoji: string; label: string; bg: string; border: string; text: string }[] = [
    { score: 1, emoji: '🌧️', label: 'Desafiador', bg: 'bg-indigo-50 dark:bg-indigo-950/40', border: 'border-indigo-300', text: 'text-indigo-600' },
    { score: 2, emoji: '☁️', label: 'Sensível', bg: 'bg-blue-50 dark:bg-blue-950/40', border: 'border-blue-300', text: 'text-blue-600' },
    { score: 3, emoji: '🌤️', label: 'Neutro', bg: 'bg-zinc-50 dark:bg-zinc-900', border: 'border-zinc-300', text: 'text-zinc-600' },
    { score: 4, emoji: '☀️', label: 'Feliz', bg: 'bg-amber-50 dark:bg-amber-950/40', border: 'border-amber-300', text: 'text-amber-600' },
    { score: 5, emoji: '💖', label: 'Radiante', bg: 'bg-rose-50 dark:bg-rose-950/40', border: 'border-rose-300', text: 'text-rose-600' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.addMoodLog(selectedMood, moodNote);
    store.addDailyAnswer(q1Feeling, q2Event, q3Positive, q4Inconvenient);
    setSavedSuccess(true);
    onSaved();
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header card */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-6 sm:p-8 text-white shadow-xl shadow-rose-500/15">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{activeUser.avatarEmoji}</span>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Diário Diário de {activeUser.fullName}
            </h1>
            <p className="text-rose-100 text-sm">
              Check-in diário do casal • {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 dark:bg-emerald-950/50 dark:border-emerald-900 dark:text-emerald-200 animate-in slide-in-from-top-2 shadow-sm">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div>
            <strong className="font-semibold block">✓ Check-in salvo com sucesso!</strong>
            Suas respostas foram gravadas com segurança e integradas ao painel do casal.
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Mood Selector */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg mb-1">
            <Sun className="h-5 w-5 text-amber-500" />
            <h2>1. Como você classifica seu humor hoje?</h2>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            Escolha o emoji que melhor reflete seu estado emocional geral ao longo do dia.
          </p>

          <div className="grid grid-cols-5 gap-3">
            {moods.map(m => {
              const isSelected = selectedMood === m.score;
              return (
                <button
                  key={m.score}
                  type="button"
                  onClick={() => setSelectedMood(m.score)}
                  className={`flex flex-col items-center justify-center rounded-2xl p-4 border transition-all ${
                    m.bg
                  } ${
                    isSelected
                      ? `ring-2 ring-rose-500 ring-offset-2 ${m.border} scale-105 shadow-md`
                      : 'border-zinc-200 opacity-70 hover:opacity-100 hover:scale-102 dark:border-zinc-800'
                  }`}
                >
                  <span className="text-3xl mb-1">{m.emoji}</span>
                  <span className={`text-xs font-semibold ${isSelected ? m.text : 'text-zinc-600 dark:text-zinc-400'}`}>
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4">
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              Nota/Contexto sobre seu humor (opcional)
            </label>
            <input
              type="text"
              value={moodNote}
              onChange={e => setMoodNote(e.target.value)}
              placeholder="Ex: Tive um dia corrido mas o jantar foi muito relaxante..."
              className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>

        {/* Section 2: 4 Daily Questions */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 space-y-5">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg">
            <Sparkles className="h-5 w-5 text-rose-500" />
            <h2>2. Perguntas Diárias de Conexão</h2>
          </div>

          {/* Q1 */}
          <div>
            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
              1. Como você está se sentindo hoje neste momento?
            </label>
            <input
              type="text"
              required
              value={q1Feeling}
              onChange={e => setQ1Feeling(e.target.value)}
              placeholder="Ex: Me sinto grata e um pouco cansada pelo trabalho..."
              className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>

          {/* Q2 */}
          <div>
            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
              2. Aconteceu algo importante ou marcante hoje?
            </label>
            <input
              type="text"
              value={q2Event}
              onChange={e => setQ2Event(e.target.value)}
              placeholder="Ex: Fechei a meta do mês no trabalho..."
              className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>

          {/* Q3 */}
          <div>
            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
              3. O que seu parceiro(a) ({partnerUser.fullName}) fez hoje que te alegrou ou fez bem?
            </label>
            <textarea
              rows={2}
              value={q3Positive}
              onChange={e => setQ3Positive(e.target.value)}
              placeholder="Ex: Ele(a) trouxe meu café da manhã e fez um carinho antes de ir trabalhar..."
              className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>

          {/* Q4 */}
          <div>
            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
              4. Houve algo que seu parceiro(a) ({partnerUser.fullName}) fez (ou deixou de fazer) que te incomodou?
            </label>
            <textarea
              rows={2}
              value={q4Inconvenient}
              onChange={e => setQ4Inconvenient(e.target.value)}
              placeholder="Ex: Fiquei chateado(a) quando ele(a) esqueceu de responder a mensagem sobre a janta..."
              className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className={`flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 ${
                savedSuccess
                  ? 'bg-emerald-600 shadow-emerald-600/30 ring-2 ring-emerald-400'
                  : 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/25 active:scale-98'
              }`}
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-white animate-bounce" />
                  <span>✓ Check-in Salvo!</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 text-white" />
                  <span>Salvar Check-in Diário</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
