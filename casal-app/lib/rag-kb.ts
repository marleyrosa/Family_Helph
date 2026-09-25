import { RAGDocument } from './types';

export const INITIAL_RAG_DOCUMENTS: RAGDocument[] = [
  {
    id: 'gottman-01',
    title: 'Os 4 Cavaleiros do Apocalipse e seus Antídotos',
    author: 'Dr. John Gottman & Dr. Julie Gottman',
    framework: 'Método Gottman',
    tags: ['comunicação', 'conflito', 'antídotos', 'gottman', 'briga', 'discussao', 'critica'],
    chunkText: `O Método Gottman identifica 4 comportamentos destrutivos na comunicação de casais e seus antídotos:
1. Crítica (atacar a personalidade do parceiro): O antídoto é expressar necessidades usando "Eu" sem culpar (ex: "Fiquei frustrado com o atraso" em vez de "Você nunca cumpre horários").
2. Desprezo (sarcasmo, desrespeito, zombaria): O antídoto é cultivar uma cultura de apreciação contínua e gratidão diária.
3. Defensividade (vitimização ou devolver o ataque): O antídoto é aceitar a responsabilidade por pelo menos uma parte da situação.
4. Obstrução/Stonewalling (desligar-se e ignorar o parceiro): O antídoto é praticar a autorregulação fisiológica, fazendo uma pausa de 20 minutos para desacelerar batimentos cardíacos.`
  },
  {
    id: 'gottman-02',
    title: 'A Proporção 5:1 de Interações Positivas',
    author: 'Dr. John Gottman',
    framework: 'Método Gottman',
    tags: ['humor', 'positividade', 'conexão', 'gottman', 'elogio', 'carinho', 'apreciacao'],
    chunkText: `Casais estáveis e felizes mantêm uma proporção mínima de 5 interações positivas para cada 1 interação negativa durante momentos de conflito (e 20:1 no dia a dia normal). Pequenos gestos de afeição, toque físico, escuta atenta e elogios sinceros alimentam a conta bancária emocional do casal, tornando o relacionamento resiliente contra desgastes diários.`
  },
  {
    id: 'gottman-03',
    title: 'Divisão de Tarefas e Justiça Percebida',
    author: 'Dr. John Gottman',
    framework: 'Método Gottman',
    tags: ['tarefas', 'casa', 'trabalho', 'rotina', 'divisao', 'cansaço', 'sobrecarga'],
    chunkText: `A percepção de justiça na divisão de responsabilidades domésticas é um dos maiores preditores de satisfação conjugal. Gottman recomenda transformar tarefas em acordos explícitos e cooperativos, evitando que um dos parceiros se sinta "gerente da casa" e o outro apenas "ajudante". A conversa deve focar em valores compartilhados sobre o lar.`
  },
  {
    id: 'eft-01',
    title: 'A.R.E. - Acessibilidade, Responsividade e Engajamento',
    author: 'Dra. Sue Johnson',
    framework: 'Terapia Focada nas Emoções (EFT)',
    tags: ['apego', 'segurança', 'eft', 'sue-johnson', 'presenca', 'apoio'],
    chunkText: `A Terapia Focada nas Emoções (EFT) baseia-se na teoria do apego adulto. A pergunta fundamental que cada parceiro faz (consciente ou inconscientemente) é: "Você está lá por mim?". As três chaves A.R.E. são:
- Acessibilidade: Posso alcançar você quando preciso?
- Responsividade: Posso confiar que você responderá com empatia aos meus sentimentos?
- Engajamento Emocional: Sei que você me valoriza e permanece perto emocionalmente?`
  },
  {
    id: 'eft-02',
    title: 'Desconstruindo a Dança Negativa do Casal',
    author: 'Dra. Sue Johnson',
    framework: 'Terapia Focada nas Emoções (EFT)',
    tags: ['ciclo-negativo', 'perseguidor-distanciador', 'eft', 'silencio', 'cobrança', 'frieza'],
    chunkText: `Em momentos de estresse, muitos casais entram em um ciclo reativo (a "Dança Negativa"), tipicamente entre o Perseguidor (que cobra e critica buscando conexão) e o Distanciador (que se retira buscando evitar mais briga). O objetivo não é determinar quem está certo, mas reconhecer a Dança Negativa como o verdadeiro inimigo comum, permitindo que ambos expressem as necessidades vulneráveis sob a raiva ou o silêncio.`
  },
  {
    id: 'perel-01',
    title: 'Individualidade e Intimidade: O Espaço do Desejo',
    author: 'Esther Perel',
    framework: 'Psicodinâmica da Intimidade',
    tags: ['desejo', 'autonomia', 'erotismo', 'esther-perel', 'paixão', 'hobbies', 'espaco'],
    chunkText: `O desejo requer espaço e mistério. Enquanto a segurança emocional busca a fusão e proximidade total, a paixão e o desejo exigem a manutenção da individualidade de cada parceiro. Manter hobbies, projetos pessoais e espaço próprio permite que os parceiros continuem admirando um ao outro de um ponto de vista externo.`
  },
  {
    id: 'imago-01',
    title: 'O Diálogo Imago: Espelhamento, Validação e Empatia',
    author: 'Dr. Harville Hendrix & Helen LaKelly Hunt',
    framework: 'Terapia de Relacionamento Imago',
    tags: ['dialogo', 'escuta-ativa', 'imago', 'comunicacao', 'ouvir', 'compreensao'],
    chunkText: `O Diálogo Imago é uma ferramenta estruturada em 3 passos para conversas profundas e difíceis:
1. Espelhamento: Repetir exatamente o que o parceiro disse ("Se entendi direito, você disse que... Correto? Tem mais algo sobre isso?").
2. Validação: Reconhecer a lógica da perspectiva do outro ("Faz sentido o que você está sentindo porque...").
3. Empatia: Conectar-se com o estado emocional ("Consigo me imaginar em seu lugar sentindo frustração/tristeza").`
  },
  {
    id: 'financas-01',
    title: 'Finanças do Casal e Alinhamento de Metas',
    author: 'Dra. Julie Gottman',
    framework: 'Método Gottman',
    tags: ['dinheiro', 'finanças', 'gastos', 'planejamento', 'futuro', 'contas'],
    chunkText: `Discussões sobre dinheiro raramente são apenas sobre números; geralmente refletem valores mais profundos como segurança, liberdade ou sonhos de infância. Criar momentos de alinhamento financeiro quinzenais focando em objetivos comuns reduz a ansiedade e fortalece a cumplicidade.`
  }
];

export function searchRAGKnowledge(query: string, maxResults = 3): RAGDocument[] {
  const normalizedQuery = query.toLowerCase();
  const terms = normalizedQuery.split(/\s+/).filter(t => t.length > 2);

  const scored = INITIAL_RAG_DOCUMENTS.map(doc => {
    let score = 0;
    const docText = `${doc.title} ${doc.author} ${doc.framework} ${doc.chunkText} ${doc.tags.join(' ')}`.toLowerCase();

    terms.forEach(term => {
      if (docText.includes(term)) {
        score += 2;
      }
    });

    doc.tags.forEach(tag => {
      if (normalizedQuery.includes(tag.toLowerCase())) {
        score += 3;
      }
    });

    return { doc, score };
  });

  const sorted = scored
    .sort((a, b) => b.score - a.score)
    .map(item => item.doc);

  return sorted.slice(0, maxResults);
}

export function generateDynamicRAGResponse(userQuery: string): { text: string; sources: RAGDocument[] } {
  const sources = searchRAGKnowledge(userQuery, 2);
  const mainDoc = sources[0] || INITIAL_RAG_DOCUMENTS[0];
  const secondDoc = sources[1] || INITIAL_RAG_DOCUMENTS[1];

  const q = userQuery.trim();

  // Dynamic Synthesis Engine connecting the exact query keywords with expert frameworks
  let synthesis = `Ao analisar a sua dúvida ("${q}"), a literatura de ${mainDoc.author} (${mainDoc.framework}) oferece um caminho muito prático:\n\n`;

  synthesis += `👉 **Orientação Principal (${mainDoc.title})**:\n`;
  synthesis += `${mainDoc.chunkText.split('\n').slice(0, 3).join('\n')}\n\n`;

  if (secondDoc && secondDoc.id !== mainDoc.id) {
    synthesis += `💡 **Complemento Prático por ${secondDoc.author} (${secondDoc.framework})**:\n`;
    synthesis += `Para aplicar isso no dia a dia com leveza, lembre-se de que ${secondDoc.chunkText.slice(0, 180)}...\n\n`;
  }

  synthesis += `✨ **Passo Recomendado para o Casal**: Em vez de focar na cobrança imediata, experimentem fazer uma pausa e usar a estrutura de Diálogo em 1ª pessoa ("Eu sinto... e o que me ajudaria seria...").`;

  return {
    text: synthesis,
    sources
  };
}
