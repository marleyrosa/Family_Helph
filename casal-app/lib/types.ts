export type MoodScore = 1 | 2 | 3 | 4 | 5;

export interface UserProfile {
  id: string;
  fullName: string;
  email?: string;
  birthDate?: string;
  relationshipStartDate?: string;
  coupleId: string;
  partnerRole: 'partner_1' | 'partner_2';
  avatarEmoji?: string;
  lgpdConsent: boolean;
}

export interface Couple {
  id: string;
  coupleName: string;
  inviteCode: string;
  createdAt: string;
}

export interface MoodLog {
  id: string;
  userId: string;
  coupleId: string;
  date: string; // YYYY-MM-DD
  moodScore: MoodScore;
  note?: string;
  createdAt: string;
}

export interface DailyAnswer {
  id: string;
  userId: string;
  coupleId: string;
  date: string; // YYYY-MM-DD
  q1Feeling: string;
  q2ImportantEvent: string;
  q3PartnerPositive: string;
  q4PartnerInconvenient: string;
  createdAt: string;
}

export interface IndividualAnamnesis {
  familyOrigin: string; // Como era a família, quem cuidava, relações
  familyFeelings: string; // Se sentia ouvido, forte, liberdade para errar
  emotionHandling: string; // Como lidava com raiva/tristeza, se acolhiam ou minimizavam
  pastRelationships: string; // Amizades, ex-relacionamentos, traições, rejeição
  selfImage: string; // Inseguranças, autoimagem, o que precisava provar
  marriageExpectations: string; // O que imaginava ser um bom marido/esposa, expectativas
}

export interface JointAnamnesis {
  howTheyMet: string; // Como se conheceram
  firstImpressionAndAttraction: string; // O que chamou atenção e fez apaixonar
  whatFoundInOther: string; // O que sentiu que encontrou no outro
  firstConflictsAndDifferences: string; // Primeiros conflitos e diferenças percebidas
  coupleEvolution: string; // O que aconteceu com o casal, o que mudou e permaneceu
  accumulatedWounds: string; // Feridas acumuladas ao longo dos anos
  defenseMechanisms: string; // Comportamentos desenvolvidos para se proteger
  strengthsAndHiddenBeauty: string; // Coisas boas que permanecem vivas mas escondidas
}

export interface AnamnesisRecord {
  id: string;
  coupleId: string;
  marleyAnamnesis: IndividualAnamnesis;
  silviaAnamnesis: IndividualAnamnesis;
  jointAnamnesis: JointAnamnesis;
  therapeuticMapSummary?: {
    attachmentStyleMarley: string;
    attachmentStyleSilvia: string;
    coupleNegativeCycle: string;
    coreStrengths: string[];
    therapistSynthesis: string;
  };
  updatedAt: string;
}

export interface WeeklySummary {
  id: string;
  coupleId: string;
  weekStartDate: string;
  weekEndDate: string;
  summaryText: string;
  avgMoodPartner1: number;
  avgMoodPartner2: number;
  overallAvgMood: number;
  positiveHighlights: string[];
  growthPoints: string[];
  suggestedActivity: string;
  createdAt: string;
}

export interface IndividualReport {
  id: string;
  userId: string;
  coupleId: string;
  weekStartDate: string;
  weekEndDate: string;
  reportText: string;
  constructiveSuggestions: {
    title: string;
    description: string;
    actionableStep: string;
  }[];
  ragReferences: {
    author: string;
    framework: string;
    concept: string;
    quoteOrSummary: string;
  }[];
  createdAt: string;
}

export interface MonthlyRanking {
  id: string;
  coupleId: string;
  month: number;
  year: number;
  bestWeek: string;
  challengingWeek: string;
  evolutionHighlights: string[];
  therapistNotes: string;
}

export interface RAGDocument {
  id: string;
  title: string;
  author: string;
  framework: string; // Gottman, EFT, Esther Perel, Imago
  chunkText: string;
  tags: string[];
}
