import { randomUUID } from "crypto";
import { ensureQuizCacheSchema, getPool } from "./db";
import { Question } from "./mockQuestions";
import { TenseCode } from "./tenseMapping";

interface CachedQuestionRow {
  question: string;
  options: string[] | string;
  correct_answer: string;
  explanation: string;
}

function rowToQuestion(row: CachedQuestionRow): Question {
  return {
    question: row.question,
    options: typeof row.options === "string" ? JSON.parse(row.options) : row.options,
    correctAnswer: row.correct_answer,
    explanation: row.explanation,
  };
}

export async function saveQuestionToCache(
  tense: TenseCode,
  question: Question,
  generatedBy: string
): Promise<void> {
  const db = getPool();
  if (!db) return;

  try {
    await ensureQuizCacheSchema();

    await db.query(
      `INSERT INTO quiz_cache (id, tense, question, options, correct_answer, explanation, generated_by, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
      [
        randomUUID(),
        tense,
        question.question,
        JSON.stringify(question.options),
        question.correctAnswer,
        question.explanation,
        generatedBy,
      ]
    );
  } catch (error) {
    console.error("Falha ao salvar questão no cache:", error);
  }
}

export async function getRandomCachedQuestion(
  tense: TenseCode,
  excludeTexts: string[] = []
): Promise<Question | null> {
  const db = getPool();
  if (!db) return null;

  try {
    await ensureQuizCacheSchema();

    const params: (string | string[])[] = [tense];
    let query = `
      SELECT question, options, correct_answer, explanation
      FROM quiz_cache
      WHERE tense = $1
    `;

    if (excludeTexts.length > 0) {
      params.push(excludeTexts);
      query += ` AND question <> ALL($2::text[])`;
    }

    query += ` ORDER BY RANDOM() LIMIT 1`;

    const result = await db.query<CachedQuestionRow>(query, params);
    if (result.rows.length === 0) return null;

    return rowToQuestion(result.rows[0]);
  } catch (error) {
    console.error("Falha ao recuperar questão do cache:", error);
    return null;
  }
}

export async function getRandomCachedQuestions(
  tense: TenseCode,
  limit = 10,
  excludeTexts: string[] = []
): Promise<Question[]> {
  const db = getPool();
  if (!db) return [];

  try {
    await ensureQuizCacheSchema();

    const params: (string | number | string[])[] = [tense, limit];
    let query = `
      SELECT question, options, correct_answer, explanation
      FROM quiz_cache
      WHERE tense = $1
    `;

    if (excludeTexts.length > 0) {
      params.push(excludeTexts);
      query += ` AND question <> ALL($3::text[])`;
    }

    query += ` ORDER BY RANDOM() LIMIT $2`;

    const result = await db.query<CachedQuestionRow>(query, params);
    return result.rows.map(rowToQuestion);
  } catch (error) {
    console.error("Falha ao recuperar questões do cache:", error);
    return [];
  }
}
