'use client';

import React from 'react';
import { Heart, LayoutDashboard, CalendarCheck, FileText, BookOpen, ShieldAlert, Users, Compass, Sparkles } from 'lucide-react';
import { UserProfile, Couple } from '../lib/types';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  couple: Couple;
  activeUser: UserProfile;
  partnerUser: UserProfile;
  onSwitchUser: (userId: string) => void;
  onOpenDisclaimer: () => void;
  onOpenHoroscope: () => void;
}

export function Navbar({
  activeTab,
  setActiveTab,
  couple,
  activeUser,
  partnerUser,
  onSwitchUser,
  onOpenDisclaimer,
  onOpenHoroscope
}: Props) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'anamnesis', label: 'História & Mapeamento', icon: Compass },
    { id: 'diary', label: 'Diário Diário', icon: CalendarCheck },
    { id: 'reports', label: 'Relatórios & Ranking', icon: FileText },
    { id: 'wisdom', label: 'Sabedoria RAG', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-rose-100 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25">
            <Heart className="h-5 w-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-100">
                Family Health
              </span>
              <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                Terapeuta de Casal
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {couple.coupleName} • Código: <code className="font-semibold text-rose-600 dark:text-rose-400">{couple.inviteCode}</code>
            </p>
          </div>
        </div>

        {/* User Toggle, Horoscope & Disclaimer */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* ✨ Horoscope Button */}
          <button
            onClick={onOpenHoroscope}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-purple-600/20 hover:opacity-95 transition"
            title="Abrir Horóscopo do Dia"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
            <span>Horóscopo</span>
          </button>

          {/* Switch Partner button */}
          <div className="flex items-center gap-1.5 rounded-full bg-zinc-100 p-1 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
            <button
              onClick={() => onSwitchUser(activeUser.id)}
              className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
            >
              <span>{activeUser.avatarEmoji}</span>
              <span className="hidden sm:inline">{activeUser.fullName}</span>
            </button>
            <button
              onClick={() => onSwitchUser(partnerUser.id)}
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              title={`Alternar para ${partnerUser.fullName}`}
            >
              <Users className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Trocar p/ {partnerUser.fullName.split(' ')[0]}</span>
            </button>
          </div>

          <button
            onClick={onOpenDisclaimer}
            className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-rose-600 dark:hover:bg-zinc-800"
            title="Aviso Ético & LGPD"
          >
            <ShieldAlert className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="mx-auto flex max-w-6xl overflow-x-auto px-4 sm:px-6">
        <nav className="flex gap-2 py-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-zinc-600 hover:bg-rose-50 hover:text-rose-700 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-rose-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
