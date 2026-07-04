import { randomUUID } from "crypto";
import { mockQuestions } from "../src/lib/mockQuestions";
import { VERB_TENSE_TO_CODE } from "../src/lib/tenseMapping";
import { ensureQuizCacheSchema, getPool } from "../src/lib/db";

async function seedCache() {
  const pool = getPool();
  if (!pool) {
    console.error("DATABASE_URL não configurada.");
    process.exit(1);
  }

  await ensureQuizCacheSchema();

  let inserted = 0;

  for (const [label, questions] of Object.entries(mockQuestions)) {
    const tense = VERB_TENSE_TO_CODE[label as keyof typeof VERB_TENSE_TO_CODE];
    if (!tense) continue;

    for (const question of questions) {
      await pool.query(
        `INSERT INTO quiz_cache (id, tense, question, options, correct_answer, explanation, generated_by, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
        [
          randomUUID(),
          tense,
          question.question,
          JSON.stringify(question.options),
          question.correctAnswer,
          question.explanation,
          "seed",
        ]
      );
      inserted += 1;
    }
  }

  console.log(`Seed concluído. ${inserted} questão(ões) inserida(s).`);
  await pool.end();
}

seedCache().catch((error) => {
  console.error("Erro ao popular cache:", error);
  process.exit(1);
});
