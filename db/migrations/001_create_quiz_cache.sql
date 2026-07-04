CREATE TABLE IF NOT EXISTS quiz_cache (
  id UUID PRIMARY KEY,
  tense VARCHAR(50) NOT NULL,
  question TEXT NOT NULL,
  options JSON NOT NULL,
  correct_answer VARCHAR(1) NOT NULL,
  explanation TEXT NOT NULL,
  generated_by VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_cache_tense ON quiz_cache (tense);
