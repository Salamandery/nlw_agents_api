import { GoogleGenAI } from '@google/genai';
import { env } from '../env.ts';

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

const model = 'gemini-2.5-flash';

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcreva o audio para português do brasil, seja preciso e natural na transcrição, mantenha a pontuação adequada e divida o texto em paragrafos',
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  });

  if (!response.text) {
    throw new Error('Não foi possivel converter o audio!');
  }

  return response.text;
}

export async function generateEmbedding(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [{ text }],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT',
    },
  });

  if (!response.embeddings?.[0].values) {
    throw new Error('Não foi possivel gerar o array');
  }

  return response.embeddings[0].values;
}

export async function generateAnswer(
  question: string,
  transcription: string[]
) {
  const context = transcription.join('\n\n');

  const prompt = `
    Com base no texto fornecido pelo contexto, responda de forma clara e objetiva em português do brasil.
    contexto: ${context}
    pergunta: ${question}

    intruções:
    - use apenas informações contidas no contexto;
    - seja objetivo e claro;
    - mantenha um tom educativo e profissional;
    - evite suposições ou informações não contidas no contexto;
    - se a resposta não estiver contida no contexto, não responda a pergunta;
    - se for necessário incluir o contexto na resposta, utilize o termo "conteúdo da aula";
  `.trim();

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  });

  if (!response.text) {
    throw new Error('Não foi possível gerar a resposta');
  }

  return response.text;
}
