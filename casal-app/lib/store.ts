import { Couple, DailyAnswer, IndividualReport, MoodLog, UserProfile, WeeklySummary, MonthlyRanking, AnamnesisRecord } from './types';
import { generateTherapeuticMap } from './ai-therapist';

const STORAGE_KEY = 'family_health_marley_silvia_v3';

const MOCK_COUPLE: Couple = {
  id: 'couple-marley-silvia',
  coupleName: 'Marley & Silvia',
  inviteCode: 'MARLEY-SILVIA-2026',
  createdAt: '2026-01-10'
};

const MOCK_PARTNER_1: UserProfile = {
  id: 'user-marley',
  fullName: 'Marley Luciano',
  email: 'marley@example.com',
  birthDate: '1988-03-15',
  relationshipStartDate: '2018-09-20',
  coupleId: 'couple-marley-silvia',
  partnerRole: 'partner_1',
  avatarEmoji: '🌿',
  lgpdConsent: true
};

const MOCK_PARTNER_2: UserProfile = {
  id: 'user-silvia',
  fullName: 'Silvia Amelia',
  email: 'silvia@example.com',
  birthDate: '1990-07-28',
  relationshipStartDate: '2018-09-20',
  coupleId: 'couple-marley-silvia',
  partnerRole: 'partner_2',
  avatarEmoji: '🌸',
  lgpdConsent: true
};

function getPastDateStr(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

const MOCK_MOODS: MoodLog[] = [
  // Marley
  { id: 'm-1', userId: 'user-marley', coupleId: 'couple-marley-silvia', date: getPastDateStr(6), moodScore: 4, note: 'Dia produtivo e tranquilo', createdAt: new Date().toISOString() },
  { id: 'm-2', userId: 'user-marley', coupleId: 'couple-marley-silvia', date: getPastDateStr(5), moodScore: 5, note: 'Passeio agradável com a Silvia', createdAt: new Date().toISOString() },
  { id: 'm-3', userId: 'user-marley', coupleId: 'couple-marley-silvia', date: getPastDateStr(4), moodScore: 3, note: 'Dia cansativo de trabalho', createdAt: new Date().toISOString() },
  { id: 'm-4', userId: 'user-marley', coupleId: 'couple-marley-silvia', date: getPastDateStr(3), moodScore: 4, note: 'Boa conversa à noite', createdAt: new Date().toISOString() },
  { id: 'm-5', userId: 'user-marley', coupleId: 'couple-marley-silvia', date: getPastDateStr(2), moodScore: 5, note: 'Almoço muito acolhedor', createdAt: new Date().toISOString() },
  { id: 'm-6', userId: 'user-marley', coupleId: 'couple-marley-silvia', date: getPastDateStr(1), moodScore: 4, note: 'Planejando o fim de semana', createdAt: new Date().toISOString() },
  { id: 'm-7', userId: 'user-marley', coupleId: 'couple-marley-silvia', date: getPastDateStr(0), moodScore: 5, note: 'Sentindo paz e sintonia', createdAt: new Date().toISOString() },

  // Silvia
  { id: 'ms-1', userId: 'user-silvia', coupleId: 'couple-marley-silvia', date: getPastDateStr(6), moodScore: 4, note: 'Dia bom', createdAt: new Date().toISOString() },
  { id: 'ms-2', userId: 'user-silvia', coupleId: 'couple-marley-silvia', date: getPastDateStr(5), moodScore: 5, note: 'Momento muito carinhoso juntos', createdAt: new Date().toISOString() },
  { id: 'ms-3', userId: 'user-silvia', coupleId: 'couple-marley-silvia', date: getPastDateStr(4), moodScore: 3, note: 'Um pouco estressada com prazos', createdAt: new Date().toISOString() },
  { id: 'ms-4', userId: 'user-silvia', coupleId: 'couple-marley-silvia', date: getPastDateStr(3), moodScore: 4, note: 'Marley me apoiou bastante', createdAt: new Date().toISOString() },
  { id: 'ms-5', userId: 'user-silvia', coupleId: 'couple-marley-silvia', date: getPastDateStr(2), moodScore: 4, note: 'Caminhada relaxante', createdAt: new Date().toISOString() },
  { id: 'ms-6', userId: 'user-silvia', coupleId: 'couple-marley-silvia', date: getPastDateStr(1), moodScore: 5, note: 'Ótima conversa no jantar', createdAt: new Date().toISOString() },
  { id: 'ms-7', userId: 'user-silvia', coupleId: 'couple-marley-silvia', date: getPastDateStr(0), moodScore: 5, note: 'Muito alegre com nosso momento', createdAt: new Date().toISOString() }
];

const MOCK_DAILY_ANSWERS: DailyAnswer[] = [
  {
    id: 'da-marley-1',
    userId: 'user-marley',
    coupleId: 'couple-marley-silvia',
    date: getPastDateStr(0),
    q1Feeling: 'Tranquilo, grato e focado.',
    q2ImportantEvent: 'Concluí um projeto importante e conversamos sobre o futuro.',
    q3PartnerPositive: 'A Silvia preparou um café delicioso e demonstrou muito carinho.',
    q4PartnerInconvenient: 'Um pequeno ruído no horário de sair de casa.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'da-silvia-1',
    userId: 'user-silvia',
    coupleId: 'couple-marley-silvia',
    date: getPastDateStr(0),
    q1Feeling: 'Acolhida e bem disposta.',
    q2ImportantEvent: 'Conseguimos organizar nossa semana sem correria.',
    q3PartnerPositive: 'O Marley foi super atencioso e ouviu meus planos com entusiasmo.',
    q4PartnerInconvenient: 'Fiquei um pouco ansiosa com a divisão das tarefas da tarde.',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_ANAMNESIS: AnamnesisRecord = {
  id: 'anamnesis-marley-silvia',
  coupleId: 'couple-marley-silvia',
  marleyAnamnesis: {
    familyOrigin: 'Família unida, com foco forte em responsabilidade e trabalho. Meus pais me apoiavam bastante.',
    familyFeelings: 'Sentia que precisava ser forte e responsável desde cedo para ajudar no ambiente familiar.',
    emotionHandling: 'Aprendi a me autorregular em silêncio. Nem sempre demonstrava raiva ou vulnerabilidade abertamente.',
    pastRelationships: 'Tive poucas relações anteriores, aprendi a valorizar muito a lealdade e a estabilidade.',
    selfImage: 'Busco sempre entregar o meu melhor e proteger quem amo. Insegurança pontual com sobrecarga de tarefas.',
    marriageExpectations: 'Ser um bom marido significa ser porto seguro, provedor de afeto, presença constante e diálogo.'
  },
  silviaAnamnesis: {
    familyOrigin: 'Família afetuosa e comunicativa, onde conversas sobre sentimentos eram frequentes.',
    familyFeelings: 'Sempre me senti muito ouvida e acolhida, com liberdade para expressar ideias e sentimentos.',
    emotionHandling: 'Expressava emoções abertamente. O acolhimento familiar me ensinou a buscar diálogo nos conflitos.',
    pastRelationships: 'Aprendi a importância da reciprocidade real e do respeito ao espaço do outro.',
    selfImage: 'Sou muito dedicada e sensível. Admiro minha empatia e busca constante por harmonia.',
    marriageExpectations: 'Ser uma boa esposa significa parceria verdadeira, apoio nos sonhos e carinho diário.'
  },
  jointAnamnesis: {
    howTheyMet: 'Nos conhecemos em um evento de amigos em comum e a conexão foi imediata.',
    firstImpressionAndAttraction: 'Marley se encantou com o sorriso e a energia leve da Silvia. Silvia admirou a firmeza e o respeito de Marley.',
    whatFoundInOther: 'Um porto seguro, alguém com quem compartilhar risadas, planos e vida com profundidade.',
    firstConflictsAndDifferences: 'Os primeiros conflitos surgiram ao ajustar ritmos de trabalho e formas de expressar estresse.',
    coupleEvolution: 'O carinho e o respeito permaneceram intactos, crescendo com os anos.',
    accumulatedWounds: 'Momentos de correria em que a escuta atenta ficou em segundo plano.',
    defenseMechanisms: 'Às vezes o recolhimento em momentos de cansaço ou a pressa em resolver.',
    strengthsAndHiddenBeauty: 'Humor compartilhado, lealdade profunda e um desejo sincero de caminhar juntos.'
  },
  updatedAt: new Date().toISOString()
};

export class AppStore {
  public couple: Couple = MOCK_COUPLE;
  public partner1: UserProfile = MOCK_PARTNER_1;
  public partner2: UserProfile = MOCK_PARTNER_2;
  public activeUserId: string = 'user-marley';
  public moodLogs: MoodLog[] = MOCK_MOODS;
  public dailyAnswers: DailyAnswer[] = MOCK_DAILY_ANSWERS;
  public anamnesisRecord: AnamnesisRecord = INITIAL_ANAMNESIS;
  public weeklySummaries: WeeklySummary[] = [];
  public individualReports: IndividualReport[] = [];
  public monthlyRankings: MonthlyRanking[] = [];

  constructor() {
    this.initSynchronousData();
    this.loadFromLocalStorage();
    this.syncWithServer();
  }

  private initSynchronousData() {
    this.anamnesisRecord.therapeuticMapSummary = generateTherapeuticMap(this.anamnesisRecord);

    const weekStart = getPastDateStr(6);
    const weekEnd = getPastDateStr(0);

    this.weeklySummaries = [
      {
        id: `summary-default`,
        coupleId: this.couple.id,
        weekStartDate: weekStart,
        weekEndDate: weekEnd,
        summaryText: `Nesta semana, o casal Marley & Silvia registrou um clima emocional extremamente positivo (média 4.6 de 5.0). O destaque foi o carinho constante e a abertura para conversas leves.`,
        avgMoodPartner1: 4.57,
        avgMoodPartner2: 4.57,
        overallAvgMood: 4.57,
        positiveHighlights: [
          'A Silvia preparou um café especial e demonstrou carinho no início do dia.',
          'O Marley foi super atencioso e ouviu os planos com entusiasmo.',
          'Ótima conversa no jantar e alinhamento sobre a rotina.'
        ],
        growthPoints: [
          'Pequenos ajustes no planejamento dos horários de saída.'
        ],
        suggestedActivity: 'Encontro de 45 minutos no domingo sem celulares para o Diálogo de Apreciação Mútua de Imago.',
        createdAt: new Date().toISOString()
      }
    ];

    this.individualReports = [
      {
        id: `ind-report-marley`,
        userId: this.partner1.id,
        coupleId: this.couple.id,
        weekStartDate: weekStart,
        weekEndDate: weekEnd,
        reportText: `Olá, Marley Luciano. Sua média de humor foi de 4.6/5 nesta semana. Você demonstrou foco e lealdade na rotina. Lembramos que praticar a autorregulação emocional em momentos de estresse traz ainda mais leveza à parceria.`,
        constructiveSuggestions: [
          {
            title: 'Expressar Necessidades em Primeira Pessoa ("Frases em Eu")',
            description: 'Em vez de guardar ou recolher o estresse do trabalho, compartilhe seu momento com Silvia.',
            actionableStep: 'Diga: "Tive um dia corrido, preciso de 15 minutos para desacelerar e depois conversamos com calma."'
          }
        ],
        ragReferences: [
          {
            author: 'Dr. John Gottman',
            framework: 'Método Gottman',
            concept: 'Antídoto da Defensividade e Autorregulação',
            quoteOrSummary: 'Fazer pausas de autorregulação fisiológica desacelera batimentos e restaura a sintonia do casal.'
          }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: `ind-report-silvia`,
        userId: this.partner2.id,
        coupleId: this.couple.id,
        weekStartDate: weekStart,
        weekEndDate: weekEnd,
        reportText: `Olá, Silvia Amelia. Sua média de humor foi de 4.6/5 nesta semana. Você se sentiu muito acolhida nos momentos de carinho com Marley. Continuem cultivando os pequenos gestos de gratidão diária.`,
        constructiveSuggestions: [
          {
            title: 'Validação e Escuta Ativa (A.R.E.)',
            description: 'Aproveite os momentos de tranquilidade para praticar o diálogo de escuta vulnerável.',
            actionableStep: 'Pergunte com carinho: "Como posso apoiar você hoje para o seu dia ser mais leve?"'
          }
        ],
        ragReferences: [
          {
            author: 'Dra. Sue Johnson',
            framework: 'Terapia Focada nas Emoções (EFT)',
            concept: 'A.R.E. - Acessibilidade e Engajamento',
            quoteOrSummary: 'Estar presente emocionalmente fortalece o sentimento de segurança afetiva no relacionamento.'
          }
        ],
        createdAt: new Date().toISOString()
      }
    ];

    this.monthlyRankings = [
      {
        id: 'mr-1',
        coupleId: 'couple-marley-silvia',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        bestWeek: 'Semana de Sintonia Total (Humor médio de 4.7)',
        challengingWeek: 'Semana de Ajustes na Rotina Profissional',
        evolutionHighlights: [
          'Prática contínua dos antídotos de Gottman e escuta ativa de Imago.',
          'Consistência admirável nos check-ins de Marley e Silvia.',
          'Fortalecimento da conta bancária emocional do casal.'
        ],
        therapistNotes: 'Marley Luciano e Silvia Amelia demonstram alta cumplicidade e maturidade emocional!'
      }
    ];
  }

  private loadFromLocalStorage() {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed.anamnesisRecord) {
        this.anamnesisRecord = parsed.anamnesisRecord;
      }
      if (parsed.moodLogs && Array.isArray(parsed.moodLogs)) {
        this.moodLogs = parsed.moodLogs;
      }
      if (parsed.dailyAnswers && Array.isArray(parsed.dailyAnswers)) {
        this.dailyAnswers = parsed.dailyAnswers;
      }
      if (parsed.activeUserId) {
        this.activeUserId = parsed.activeUserId;
      }
    } catch (e) {
      console.warn('Erro ao carregar do localStorage:', e);
    }
  }

  public saveToLocalStorage() {
    if (typeof window === 'undefined') return;
    try {
      const payload = {
        anamnesisRecord: this.anamnesisRecord,
        moodLogs: this.moodLogs,
        dailyAnswers: this.dailyAnswers,
        activeUserId: this.activeUserId
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Erro ao salvar no localStorage:', e);
    }
  }

  public async syncWithServer() {
    if (typeof window === 'undefined') return;
    try {
      const res = await fetch('/api/store');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const s = json.data;
          if (s.anamnesisRecord) {
            this.anamnesisRecord = s.anamnesisRecord;
          }
          if (s.moodLogs && Array.isArray(s.moodLogs) && s.moodLogs.length > 0) {
            this.moodLogs = s.moodLogs;
          }
          if (s.dailyAnswers && Array.isArray(s.dailyAnswers) && s.dailyAnswers.length > 0) {
            this.dailyAnswers = s.dailyAnswers;
          }
          this.saveToLocalStorage();
        }
      }
    } catch (err) {
      console.warn('Erro ao sincronizar com servidor:', err);
    }
  }

  public async sendToServer() {
    if (typeof window === 'undefined') return;
    try {
      const payload = {
        anamnesisRecord: this.anamnesisRecord,
        moodLogs: this.moodLogs,
        dailyAnswers: this.dailyAnswers,
        activeUserId: this.activeUserId
      };
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Erro ao enviar dados ao servidor:', err);
    }
  }

  public getActiveUser(): UserProfile {
    return this.activeUserId === this.partner1.id ? this.partner1 : this.partner2;
  }

  public getPartnerUser(): UserProfile {
    return this.activeUserId === this.partner1.id ? this.partner2 : this.partner1;
  }

  public switchActiveUser(userId: string) {
    this.activeUserId = userId;
    this.saveToLocalStorage();
    this.sendToServer();
  }

  public saveAnamnesis(record: AnamnesisRecord) {
    record.therapeuticMapSummary = generateTherapeuticMap(record);
    record.updatedAt = new Date().toISOString();
    this.anamnesisRecord = record;
    this.saveToLocalStorage();
    this.sendToServer();
  }

  public addMoodLog(moodScore: 1 | 2 | 3 | 4 | 5, note?: string) {
    const today = getPastDateStr(0);
    const existingIndex = this.moodLogs.findIndex(
      m => m.userId === this.activeUserId && m.date === today
    );

    const newLog: MoodLog = {
      id: `m-${Date.now()}`,
      userId: this.activeUserId,
      coupleId: this.couple.id,
      date: today,
      moodScore,
      note,
      createdAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      this.moodLogs[existingIndex] = newLog;
    } else {
      this.moodLogs.push(newLog);
    }
    this.saveToLocalStorage();
    this.sendToServer();
  }

  public addDailyAnswer(q1: string, q2: string, q3: string, q4: string) {
    const today = getPastDateStr(0);
    const existingIndex = this.dailyAnswers.findIndex(
      a => a.userId === this.activeUserId && a.date === today
    );

    const newAnswer: DailyAnswer = {
      id: `da-${Date.now()}`,
      userId: this.activeUserId,
      coupleId: this.couple.id,
      date: today,
      q1Feeling: q1,
      q2ImportantEvent: q2,
      q3PartnerPositive: q3,
      q4PartnerInconvenient: q4,
      createdAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      this.dailyAnswers[existingIndex] = newAnswer;
    } else {
      this.dailyAnswers.push(newAnswer);
    }
    this.saveToLocalStorage();
    this.sendToServer();
  }
}
