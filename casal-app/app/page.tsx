'use client';

import React, { useState } from 'react';
import { AppStore } from '../lib/store';
import { Navbar } from '../components/Navbar';
import { EthicalDisclaimerModal } from '../components/EthicalDisclaimerModal';
import { HoroscopeModal } from '../components/HoroscopeModal';
import { DashboardTab } from '../components/DashboardTab';
import { AnamnesisTab } from '../components/AnamnesisTab';
import { MoodDiaryTab } from '../components/MoodDiaryTab';
import { ReportsTab } from '../components/ReportsTab';
import { WisdomRAGTab } from '../components/WisdomRAGTab';

export default function Home() {
  const [store] = useState(() => new AppStore());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeUserId, setActiveUserId] = useState('user-marley');
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isHoroscopeOpen, setIsHoroscopeOpen] = useState(false);
  const [, setRefreshTick] = useState(0);

  const activeUser = activeUserId === store.partner1.id ? store.partner1 : store.partner2;
  const partnerUser = activeUserId === store.partner1.id ? store.partner2 : store.partner1;

  const handleSwitchUser = (userId: string) => {
    store.switchActiveUser(userId);
    setActiveUserId(userId);
  };

  const handleSaved = () => {
    setRefreshTick(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100 selection:bg-rose-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        couple={store.couple}
        activeUser={activeUser}
        partnerUser={partnerUser}
        onSwitchUser={handleSwitchUser}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        onOpenHoroscope={() => setIsHoroscopeOpen(true)}
      />

      {/* Main Content Area */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {activeTab === 'dashboard' && (
          <DashboardTab
            store={store}
            partner1={store.partner1}
            partner2={store.partner2}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'anamnesis' && (
          <AnamnesisTab
            store={store}
            partner1={store.partner1}
            partner2={store.partner2}
            onSaved={handleSaved}
          />
        )}

        {activeTab === 'diary' && (
          <MoodDiaryTab
            store={store}
            activeUser={activeUser}
            partnerUser={partnerUser}
            onSaved={handleSaved}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsTab
            store={store}
            partner1={store.partner1}
            partner2={store.partner2}
          />
        )}

        {activeTab === 'wisdom' && <WisdomRAGTab />}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-zinc-200 py-6 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <p>Family Health — Agente Terapeuta de Casal • Marley Luciano & Silvia Amelia</p>
        <p className="mt-1 text-[11px] text-zinc-400">
          Esta ferramenta não substitui a terapia profissional. RAG integrado com Método Gottman, EFT, Esther Perel e Imago.
        </p>
      </footer>

      {/* Ethical & LGPD Disclaimer Modal */}
      <EthicalDisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />

      {/* ✨ Horoscope Modal */}
      <HoroscopeModal
        isOpen={isHoroscopeOpen}
        onClose={() => setIsHoroscopeOpen(false)}
      />
    </div>
  );
}
