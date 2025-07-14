import { and, eq, sql } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';
import { generateAnswer, generateEmbedding } from '../../services/gemini.ts';

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
        body: z.object({
          question: z.string().min(1, 'Question is required'),
        }),
      },
    },
    async ({ body, params }, reply) => {
      const { roomId } = params;
      const { question } = body;

      const embedding = await generateEmbedding(question);
      const embeddingString = `[${embedding.join(',')}]`;

      const chunks = await db
        .select({
          id: schema.audioChunks.id,
          transcription: schema.audioChunks.transcription,
          similarity: sql<number>`1 - (${schema.audioChunks.embedding} <=> ${embeddingString}::vector)`,
        })
        .from(schema.audioChunks)
        .where(
          and(
            eq(schema.audioChunks.roomId, roomId),
            sql`1 - (${schema.audioChunks.embedding} <=> ${embeddingString}::vector) > 0.7`
          )
        )
        .orderBy(
          sql`${schema.audioChunks.embedding} <=> ${embeddingString}::vector`
        )
        .limit(5);

      let answer: string | null = null;

      if (chunks.length > 0) {
        const transcription = chunks.map((chunk) => chunk.transcription);
        answer = await generateAnswer(question, transcription);
      }

      const result = await db
        .insert(schema.questions)
        .values({
          question,
          roomId,
          answer,
        })
        .returning();

      const insertedQuestion = result[0];

      if (!insertedQuestion) {
        throw new Error('Failed to create new question. Please try again.');
      }

      return reply
        .status(201)
        .send({ questionId: insertedQuestion.id, answer });
    }
  );
};
