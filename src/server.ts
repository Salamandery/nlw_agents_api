import { fastifyCors } from '@fastify/cors';
import { fastifyMultipart } from '@fastify/multipart';
import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { env } from './env.ts';
import { createQuestionRoute } from './http/routes/create-question.ts';
import { createRoomRoute } from './http/routes/create-room.ts';
import { getRoomQuestionsRoute } from './http/routes/get-room-questions.ts';
import { getRoomsRoute } from './http/routes/get-rooms.ts';
import { uploadAudioRoute } from './http/routes/upload-audio.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
  return { message: "It's Ok" };
});
app.register(fastifyMultipart);
app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomQuestionsRoute);
app.register(createQuestionRoute);
app.register(uploadAudioRoute);

app
  .listen({ port: env.PORT })
  .then(() => {
    console.log(
      `Server is running on http://localhost:${env.PORT ? Number(env.PORT) : 3333}`
    );
  })
  .catch((err) => {
    console.error('Error starting server:', err);
  });
