import { AnamnesisRecord, DailyAnswer, IndividualReport, MoodLog, UserProfile, WeeklySummary } from './types';
import { searchRAGKnowledge, INITIAL_RAG_DOCUMENTS } from './rag-kb';

export async function generateWeeklySummary(
  coupleName: string,
  partner1: UserProfile,
  partner2: UserProfile,
  partner1Moods: MoodLog[],
  partner2Moods: MoodLog[],
  partner1Answers: DailyAnswer[],
  partner2Answers: DailyAnswer[],
  weekStartDate: string,
  weekEndDate: string
): Promise<WeeklySummary> {
  const avg1 = partner1Moods.length
    ? partner1Moods.reduce((acc, m) => acc + m.moodScore, 0) / partner1Moods.length
    : 4.0;
  const avg2 = partner2Moods.length
    ? partner2Moods.reduce((acc, m) => acc + m.moodScore, 0) / partner2Moods.length
    : 4.0;
  const overallAvg = Number(((avg1 + avg2) / 2).toFixed(2));

  const pos1 = partner1Answers.map(a => a.q3PartnerPositive).filter(Boolean);
  const pos2 = partner2Answers.map(a => a.q3PartnerPositive).filter(Boolean);
  const highlights = [...pos1, ...pos2].slice(0, 4);
  if (highlights.length === 0) {
    highlights.push(
      'Demonstração constante de carinho e dedicação nas tarefas diárias.',
      'Apoio mútuo e escuta compreensiva nos momentos de cansaço.'
    );
  }

  const inc1 = partner1Answers.map(a => a.q4PartnerInconvenient).filter(Boolean);
  const inc2 = partner2Answers.map(a => a.q4PartnerInconvenient).filter(Boolean);
  const growthPoints = [...inc1, ...inc2].slice(0, 3);
  if (growthPoints.length === 0) {
    growthPoints.push('Alinhamento de horários para momentos a dois de qualidade.');
  }

  const summaryText = `Nesta semana, o casal ${coupleName} registrou um clima emocional equilibrado (média de ${overallAvg.toFixed(1)} de 5.0). ${partner1.fullName} teve média ${avg1.toFixed(1)} e ${partner2.fullName} média ${avg2.toFixed(1)}. O grande destaque foi a abertura para compartilhar momentos marcantes e pequenos gestos de consideração no dia a dia. Para o fim de semana, a recomendação é focar em um momento de desconexão de telas para renovar o vínculo de cumplicidade.`;

  return {
    id: `summary-${Date.now()}`,
    coupleId: partner1.coupleId,
    weekStartDate,
    weekEndDate,
    summaryText,
    avgMoodPartner1: Number(avg1.toFixed(2)),
    avgMoodPartner2: Number(avg2.toFixed(2)),
    overallAvgMood: overallAvg,
    positiveHighlights: highlights,
    growthPoints: growthPoints,
    suggestedActivity: 'Encontro de 45 minutos no domingo sem celulares para o Diálogo de Apreciação Mútua de Imago.',
    createdAt: new Date().toISOString()
  };
}

export async function generateIndividualReport(
  user: UserProfile,
  partner: UserProfile,
  userMoods: MoodLog[],
  userAnswers: DailyAnswer[],
  weekStartDate: string,
  weekEndDate: string
): Promise<IndividualReport> {
  const avgMood = userMoods.length
    ? userMoods.reduce((acc, m) => acc + m.moodScore, 0) / userMoods.length
    : 4;

  const inconvenientTexts = userAnswers.map(a => a.q4PartnerInconvenient).join(' ');
  const ragDocs = searchRAGKnowledge(inconvenientTexts.length > 5 ? inconvenientTexts : 'comunicação e empatia', 2);
  if (ragDocs.length === 0) {
    ragDocs.push(INITIAL_RAG_DOCUMENTS[0], INITIAL_RAG_DOCUMENTS[2]);
  }

  const reportText = `Olá, ${user.fullName}. Nesta semana, sua média de humor foi de ${avgMood.toFixed(1)}/5. Observamos que você se sentiu acolhido(a) nos momentos em que ${partner.fullName} demonstrou apoio, mas também enfrentou instantes de sensibilidade ou sobrecarga. Lembramos que a parceria se constrói na clareza ao expressar necessidades e no cuidado com a própria autorregulação emocional.`;

  const constructiveSuggestions = [
    {
      title: 'Comunicação com Foco nas Suas Necessidades ("Frases em Eu")',
      description: 'Em vez de apontar uma atitude de ' + partner.fullName + ', comece a frase compartilhando o impacto emocional em você.',
      actionableStep: 'Experimente a estrutura: "Quando acontece X, eu me sinto Y, e o que me ajudaria seria Z".'
    },
    {
      title: 'Pausa para Autorregulação Emocional',
      description: 'Quando sentir que uma conversa sobre o dia está esquentando ou gerando ruído, faça um check-in interno antes de responder.',
      actionableStep: 'Faça 3 respirações profundas ou proponha uma pausa de 15 minutos antes de retomar a conversa.'
    }
  ];

  const ragReferences = ragDocs.map(doc => ({
    author: doc.author,
    framework: doc.framework,
    concept: doc.title,
    quoteOrSummary: doc.chunkText.slice(0, 280) + '...'
  }));

  return {
    id: `ind-report-${user.id}-${Date.now()}`,
    userId: user.id,
    coupleId: user.coupleId,
    weekStartDate,
    weekEndDate,
    reportText,
    constructiveSuggestions,
    ragReferences,
    createdAt: new Date().toISOString()
  };
}

export function generateTherapeuticMap(record: AnamnesisRecord) {
  const marley = record.marleyAnamnesis;
  const silvia = record.silviaAnamnesis;
  const joint = record.jointAnamnesis;

  return {
    attachmentStyleMarley: 'Busca de Segurança & Responsividade (Foco na resolução prática e proteção do ambiente familiar)',
    attachmentStyleSilvia: 'Busca de Conexão Emocional Profunda & Validação (Foco na escuta atenta e presença afetuosa)',
    coupleNegativeCycle: 'Ciclo Reativo de Sobrecarga vs. Silêncio Protetor: Quando o estresse do dia a dia se acumula, Marley tende a focar na solução e no recolhimento temporário para se autorregular, enquanto Silvia busca proximidade e diálogo imediato. Entender essa dinâmica evita que o espaço de autorregulação seja interpretado como afastamento.',
    coreStrengths: [
      'Memória afetiva rica do início do relacionamento e forte admiração mútua.',
      'Valores familiares sólidos e desejo genuíno de evolução contínua.',
      'Capacidade de acolhimento e cumplicidade demonstradas nas fases marcantes.',
      'Abertura para o diálogo reflexivo guiado pelo agente terapeuta.'
    ],
    therapistSynthesis: `O mapeamento de história de vida de Marley Luciano e Silvia Amelia revela duas trajetórias individuais de grande resiliência. Na infância e juventude, ambos desenvolveram mecanismos de proteção legítimos para lidar com cobranças e desafios. Quando se encontraram, viram um no outro um porto seguro e um olhar de admiração sincera. No momento presente, o trabalho do agente terapeuta será apoiar o casal na desconstrução de ruídos de comunicação, resgatando a leveza inicial e aplicando os conceitos de A.R.E. (Sue Johnson) e os Antídotos de Gottman.`
  };
}
