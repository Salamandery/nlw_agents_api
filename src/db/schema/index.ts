import { audioChunks } from './audio.chunks.ts';
import { questions } from './questions.ts';
import { rooms } from './rooms.ts';

// Barrel file for database schema exports
export const schema = {
  rooms,
  questions,
  audioChunks,
};
