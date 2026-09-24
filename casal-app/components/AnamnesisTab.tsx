'use client';

import React, { useState } from 'react';
import { UserProfile, AnamnesisRecord, IndividualAnamnesis, JointAnamnesis } from '../lib/types';
import { AppStore } from '../lib/store';
import { Sparkles, Save, Heart, ShieldCheck, Compass, CheckCircle2, User, Users, BookOpen } from 'lucide-react';

interface Props {
  store: AppStore;
  partner1: UserProfile; // Marley Luciano
  partner2: UserProfile; // Silvia Amelia
  onSaved: () => void;
}

export function AnamnesisTab({ store, partner1, partner2, onSaved }: Props) {
  const [activeStep, setActiveStep] = useState<'parte1_marley' | 'parte1_silvia' | 'parte2_encontro' | 'parte3_casal' | 'mapa'>('parte1_marley');

  const [marleyData, setMarleyData] = useState<IndividualAnamnesis>({ ...store.anamnesisRecord.marleyAnamnesis });
  const [silviaData, setSilviaData] = useState<IndividualAnamnesis>({ ...store.anamnesisRecord.silviaAnamnesis });
  const [jointData, setJointData] = useState<JointAnamnesis>({ ...store.anamnesisRecord.jointAnamnesis });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedRecord: AnamnesisRecord = {
      ...store.anamnesisRecord,
      marleyAnamnesis: marleyData,
      silviaAnamnesis: silviaData,
      jointAnamnesis: jointData,
    };
    store.saveAnamnesis(updatedRecord);
    setSavedSuccess(true);
    onSaved();
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const therapeuticMap = store.anamnesisRecord.therapeuticMapSummary;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 p-6 sm:p-8 text-white shadow-xl shadow-teal-500/15">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Compass className="h-5 w-5 text-emerald-200" />
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-100">
                Mapeamento Inicial & Anamnese Terapêutica
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              A História de {partner1.fullName} & {partner2.fullName}
            </h1>
            <p className="text-emerald-100 text-sm mt-1">
              Mapeamento de origens familiares, história da conexão e ciclo do casal para o Terapeuta de Casal.
            </p>
          </div>
          <button
            onClick={() => setActiveStep('mapa')}
            className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-teal-700 shadow-md hover:bg-emerald-50 transition shrink-0"
          >
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Ver Mapa Terapêutico</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 dark:bg-emerald-950/50 dark:border-emerald-900 dark:text-emerald-200 animate-in slide-in-from-top-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <div>
            <strong className="font-semibold block">História e Anamnese salvas com sucesso!</strong>
            O agente terapeuta sincronizou os dados e atualizou o Mapa Terapêutico do Casal.
          </div>
        </div>
      )}

      {/* Navigation Wizard Tabs */}
      <div className="flex overflow-x-auto rounded-2xl bg-zinc-100 p-1.5 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
        <button
          onClick={() => setActiveStep('parte1_marley')}
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
            activeStep === 'parte1_marley'
              ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
          }`}
        >
          <span>🌱 Parte 1: {partner1.fullName.split(' ')[0]}</span>
        </button>

        <button
          onClick={() => setActiveStep('parte1_silvia')}
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
            activeStep === 'parte1_silvia'
              ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
          }`}
        >
          <span>🌱 Parte 1: {partner2.fullName.split(' ')[0]}</span>
        </button>

        <button
          onClick={() => setActiveStep('parte2_encontro')}
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
            activeStep === 'parte2_encontro'
              ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
          }`}
        >
          <span>🌿 Parte 2: O Encontro</span>
        </button>

        <button
          onClick={() => setActiveStep('parte3_casal')}
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
            activeStep === 'parte3_casal'
              ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
          }`}
        >
          <span>❤️ Parte 3: O Casal</span>
        </button>

        <button
          onClick={() => setActiveStep('mapa')}
          className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
            activeStep === 'mapa'
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm'
              : 'text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-zinc-800'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Mapa Terapêutico</span>
        </button>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* PARTE 1 - MARLEY */}
        {activeStep === 'parte1_marley' && (
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-3xl">🌿</span>
              <div>
                <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  Parte 1 — Antes de Se Conhecerem
                </span>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                  História de Vida de {partner1.fullName}
                </h2>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                1. Família de Origem
              </label>
              <p className="text-xs text-zinc-500 mb-2">Como era sua família? Quem cuidava de você? Como eram as relações entre seus pais/familiares? Havia carinho, cobrança, críticas, elogios?</p>
              <textarea
                rows={3}
                value={marleyData.familyOrigin}
                onChange={e => setMarleyData({ ...marleyData, familyOrigin: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                2. Sentimento na Família
              </label>
              <p className="text-xs text-zinc-500 mb-2">Precisava agradar? Sentia que era ouvido? Sentia que precisava ser forte? Tinha liberdade para errar?</p>
              <textarea
                rows={3}
                value={marleyData.familyFeelings}
                onChange={e => setMarleyData({ ...marleyData, familyFeelings: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                3. Lidar com Emoções
              </label>
              <p className="text-xs text-zinc-500 mb-2">Podia demonstrar tristeza, raiva, medo? As pessoas acolhiam ou minimizavam? Como reagiam quando você errava?</p>
              <textarea
                rows={3}
                value={marleyData.emotionHandling}
                onChange={e => setMarleyData({ ...marleyData, emotionHandling: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                4. Amizades & Relacionamentos Anteriores
              </label>
              <p className="text-xs text-zinc-500 mb-2">Sentia-se aceito? Já viveu rejeição, abandono, traição ou relações conflituosas? O que aprendeu com isso?</p>
              <textarea
                rows={3}
                value={marleyData.pastRelationships}
                onChange={e => setMarleyData({ ...marleyData, pastRelationships: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                5. Autoimagem Antes do Encontro
              </label>
              <p className="text-xs text-zinc-500 mb-2">Quais eram suas inseguranças? O que admirava em si? O que sentia que precisava provar para as pessoas?</p>
              <textarea
                rows={3}
                value={marleyData.selfImage}
                onChange={e => setMarleyData({ ...marleyData, selfImage: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                6. Expectativas sobre Relacionamento Amoroso
              </label>
              <p className="text-xs text-zinc-500 mb-2">O que significava ser um "bom marido"? O que esperava receber e o que achava que deveria oferecer?</p>
              <textarea
                rows={3}
                value={marleyData.marriageExpectations}
                onChange={e => setMarleyData({ ...marleyData, marriageExpectations: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>
        )}

        {/* PARTE 1 - SILVIA */}
        {activeStep === 'parte1_silvia' && (
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-3xl">🌸</span>
              <div>
                <span className="rounded-full bg-pink-100 px-3 py-0.5 text-xs font-bold text-pink-800 dark:bg-pink-950/60 dark:text-pink-300">
                  Parte 1 — Antes de Se Conhecerem
                </span>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                  História de Vida de {partner2.fullName}
                </h2>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                1. Família de Origem
              </label>
              <p className="text-xs text-zinc-500 mb-2">Como era sua família? Quem cuidava de você? Como eram as relações entre seus pais/familiares? Havia carinho, cobrança, críticas, elogios?</p>
              <textarea
                rows={3}
                value={silviaData.familyOrigin}
                onChange={e => setSilviaData({ ...silviaData, familyOrigin: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                2. Sentimento na Família
              </label>
              <p className="text-xs text-zinc-500 mb-2">Precisava agradar? Sentia que era ouvida? Sentia que precisava ser forte? Tinha liberdade para errar?</p>
              <textarea
                rows={3}
                value={silviaData.familyFeelings}
                onChange={e => setSilviaData({ ...silviaData, familyFeelings: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                3. Lidar com Emoções
              </label>
              <p className="text-xs text-zinc-500 mb-2">Podia demonstrar tristeza, raiva, medo? As pessoas acolhiam ou minimizavam? Como reagiam quando você errava?</p>
              <textarea
                rows={3}
                value={silviaData.emotionHandling}
                onChange={e => setSilviaData({ ...silviaData, emotionHandling: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                4. Amizades & Relacionamentos Anteriores
              </label>
              <p className="text-xs text-zinc-500 mb-2">Sentia-se aceita? Já viveu rejeição, abandono, traição ou relações conflituosas? O que aprendeu com isso?</p>
              <textarea
                rows={3}
                value={silviaData.pastRelationships}
                onChange={e => setSilviaData({ ...silviaData, pastRelationships: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                5. Autoimagem Antes do Encontro
              </label>
              <p className="text-xs text-zinc-500 mb-2">Quais eram suas inseguranças? O que admirava em si? O que sentia que precisava provar para as pessoas?</p>
              <textarea
                rows={3}
                value={silviaData.selfImage}
                onChange={e => setSilviaData({ ...silviaData, selfImage: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                6. Expectativas sobre Relacionamento Amoroso
              </label>
              <p className="text-xs text-zinc-500 mb-2">O que significava ser uma "boa esposa"? O que esperava receber e o que achava que deveria oferecer?</p>
              <textarea
                rows={3}
                value={silviaData.marriageExpectations}
                onChange={e => setSilviaData({ ...silviaData, marriageExpectations: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>
        )}

        {/* PARTE 2 - O ENCONTRO */}
        {activeStep === 'parte2_encontro' && (
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-3xl">🌿</span>
              <div>
                <span className="rounded-full bg-teal-100 px-3 py-0.5 text-xs font-bold text-teal-800 dark:bg-teal-950/60 dark:text-teal-300">
                  Parte 2 — O Encontro
                </span>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                  A História da Conexão Inicial
                </h2>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                1. Como vocês se conheceram?
              </label>
              <p className="text-xs text-zinc-500 mb-2">Não apenas a data/local, mas a história do primeiro contato.</p>
              <textarea
                rows={3}
                value={jointData.howTheyMet}
                onChange={e => setJointData({ ...jointData, howTheyMet: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                2. O que chamou a atenção & fez se apaixonar?
              </label>
              <p className="text-xs text-zinc-500 mb-2">O que chamou a atenção de cada um? Como era o começo?</p>
              <textarea
                rows={3}
                value={jointData.firstImpressionAndAttraction}
                onChange={e => setJointData({ ...jointData, firstImpressionAndAttraction: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                3. O que cada um sentia ter encontrado no outro?
              </label>
              <textarea
                rows={3}
                value={jointData.whatFoundInOther}
                onChange={e => setJointData({ ...jointData, whatFoundInOther: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                4. Primeiros conflitos e diferenças importantes
              </label>
              <p className="text-xs text-zinc-500 mb-2">Quando começaram os primeiros conflitos e quando perceberam que tinham diferenças importantes?</p>
              <textarea
                rows={3}
                value={jointData.firstConflictsAndDifferences}
                onChange={e => setJointData({ ...jointData, firstConflictsAndDifferences: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>
        )}

        {/* PARTE 3 - O CASAL */}
        {activeStep === 'parte3_casal' && (
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-3xl">❤️</span>
              <div>
                <span className="rounded-full bg-rose-100 px-3 py-0.5 text-xs font-bold text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
                  Parte 3 — A História do Casal
                </span>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                  Evolução até o Presente & Fortalezas
                </h2>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                1. O que aconteceu com aquele casal que começou lá atrás?
              </label>
              <p className="text-xs text-zinc-500 mb-2">O que mudou? O que permaneceu?</p>
              <textarea
                rows={3}
                value={jointData.coupleEvolution}
                onChange={e => setJointData({ ...jointData, coupleEvolution: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                2. Quais feridas foram acumulando?
              </label>
              <textarea
                rows={3}
                value={jointData.accumulatedWounds}
                onChange={e => setJointData({ ...jointData, accumulatedWounds: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                3. Quais comportamentos vocês desenvolveram para se proteger?
              </label>
              <p className="text-xs text-zinc-500 mb-2">Ex: silêncio, ironia, afastamento, controle ou correria.</p>
              <textarea
                rows={3}
                value={jointData.defenseMechanisms}
                onChange={e => setJointData({ ...jointData, defenseMechanisms: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                4. Quais coisas boas vocês ainda têm que ficam escondidas?
              </label>
              <p className="text-xs text-zinc-500 mb-2">Fortalezas, carinhos e memórias boas que às vezes a rotina esconde.</p>
              <textarea
                rows={3}
                value={jointData.strengthsAndHiddenBeauty}
                onChange={e => setJointData({ ...jointData, strengthsAndHiddenBeauty: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>
        )}

        {/* MAPA TERAPÊUTICO */}
        {activeStep === 'mapa' && therapeuticMap && (
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 space-y-6 animate-in fade-in">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 p-3 text-white">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <span className="rounded-full bg-rose-100 px-3 py-0.5 text-xs font-bold text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
                  Síntese de Origem & Apego (EFT / Gottman)
                </span>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                  Mapa Terapêutico de {partner1.fullName.split(' ')[0]} & {partner2.fullName.split(' ')[0]}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                <span className="text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300 block mb-1">
                  🌿 Estilo de Apego & Necessidades de Marley Luciano
                </span>
                <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-100">
                  {therapeuticMap.attachmentStyleMarley}
                </p>
              </div>

              <div className="rounded-2xl border border-pink-100 bg-pink-50/50 p-5 dark:border-pink-900/40 dark:bg-pink-950/20">
                <span className="text-xs font-bold uppercase text-pink-800 dark:text-pink-300 block mb-1">
                  🌸 Estilo de Apego & Necessidades de Silvia Amelia
                </span>
                <p className="text-xs sm:text-sm text-pink-900 dark:text-pink-100">
                  {therapeuticMap.attachmentStyleSilvia}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-5 dark:border-indigo-900/50 dark:bg-indigo-950/30">
              <h3 className="text-xs font-bold uppercase text-indigo-800 dark:text-indigo-300 mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Mapeamento da Dança Negativa / Ciclo Reativo do Casal
              </h3>
              <p className="text-xs sm:text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed">
                {therapeuticMap.coupleNegativeCycle}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 dark:border-amber-900/50 dark:bg-amber-950/30">
              <h3 className="text-xs font-bold uppercase text-amber-800 dark:text-amber-300 mb-2">
                🌟 Fortalezas & Pilares do Relacionamento
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-amber-900 dark:text-amber-100">
                {therapeuticMap.coreStrengths.map((st, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-amber-500">✓</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h4 className="text-xs font-bold uppercase text-rose-700 dark:text-rose-400 mb-1">
                💬 Parecer Inicial do Agente Terapeuta
              </h4>
              <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed italic">
                "{therapeuticMap.therapistSynthesis}"
              </p>
            </div>
          </div>
        )}

        {/* Floating save action */}
        {activeStep !== 'mapa' && (
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-semibold text-white shadow-lg shadow-teal-600/25 hover:opacity-95 transition"
            >
              <Save className="h-4 w-4" />
              <span>Salvar Anamnese & Atualizar Mapa</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
