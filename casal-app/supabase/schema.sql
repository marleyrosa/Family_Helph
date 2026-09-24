-- Schema SQL para o Projeto Family Health - Terapeuta de Casal
-- Executar no Editor SQL do Supabase

CREATE EXTENSION IF NOT EXISTS vector;

-- 1. Casais
CREATE TABLE IF NOT EXISTS couples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  couple_name TEXT NOT NULL,
  invite_code TEXT UNIQUE NOT NULL
);

-- 2. Usuários / Parceiros
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID REFERENCES couples(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE,
  birth_date DATE,
  relationship_start_date DATE,
  partner_role TEXT CHECK (partner_role IN ('partner_1', 'partner_2')),
  lgpd_consent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Diário de Humor (Mood Logs)
CREATE TABLE IF NOT EXISTS mood_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE,
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,
  mood_score INT NOT NULL CHECK (mood_score BETWEEN 1 AND 5),
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, log_date)
);

-- 4. Respostas Diárias (4 Perguntas)
CREATE TABLE IF NOT EXISTS daily_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE,
  answer_date DATE NOT NULL DEFAULT CURRENT_DATE,
  q1_mood_feeling TEXT NOT NULL,
  q2_important_event TEXT,
  q3_partner_positive TEXT,
  q4_partner_inconvenient TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, answer_date)
);

-- 5. Resumos Semanais do Casal (Sábado)
CREATE TABLE IF NOT EXISTS weekly_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  week_end_date DATE NOT NULL,
  summary_text TEXT NOT NULL,
  avg_mood NUMERIC(3,2),
  positive_highlights TEXT[],
  growth_points TEXT[],
  suggested_activity TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Relatórios Individuais (Domingo)
CREATE TABLE IF NOT EXISTS individual_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  week_end_date DATE NOT NULL,
  report_text TEXT NOT NULL,
  constructive_suggestions JSONB NOT NULL,
  rag_references JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Ranking / Evolução Mensal
CREATE TABLE IF NOT EXISTS monthly_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE,
  month INT NOT NULL CHECK (month BETWEEN 1 AND 12),
  year INT NOT NULL,
  best_week TEXT,
  challenging_week TEXT,
  evolution_highlights JSONB,
  therapist_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Documentos & Chunks RAG (Base de Conhecimento Especializada)
CREATE TABLE IF NOT EXISTS rag_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  framework TEXT NOT NULL,
  chunk_text TEXT NOT NULL,
  tags TEXT[],
  embedding VECTOR(768),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
