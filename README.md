# NLW Agents API

<div align="center">
  <b>🇧🇷 Português | <a href="#english-version">🇺🇸 English below</a></b>
</div>

Projeto desenvolvido durante o evento **NLW (Next Level Week)** da Rocketseat, focado em criar uma API para gerenciamento de salas e perguntas com agentes inteligentes.

Developed during the **NLW (Next Level Week)** event by Rocketseat, focused on creating an API for managing rooms and questions with intelligent agents.

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs"/>
  <img src="https://img.shields.io/badge/Fastify-4.x-000000?style=for-the-badge&logo=fastify"/>
  <img src="https://img.shields.io/badge/Drizzle%20ORM-0.x-3E77E6?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/PostgreSQL-15+-4169E1?style=for-the-badge&logo=postgresql"/>
  <img src="https://img.shields.io/badge/Zod-3.x-3F52E3?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/TypeScript-4.4+-3178C6?style=for-the-badge&logo=typescript"/>
  <img src="https://img.shields.io/badge/Docker-24+-2496ED?style=for-the-badge&logo=docker"/>
  <img src="https://img.shields.io/badge/Biome-1.x-FFD700?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/CORS-enabled-29B6F6?style=for-the-badge"/>
</p>

---

## 📑 Sumário | Table of Contents

**PT-BR:**

- [🚀 Tecnologias](#-tecnologias)
- [📋 Pré-requisitos](#-pré-requisitos)
- [⚙️ Configuração](#️-configuração)
- [🏃‍♂️ Executando o projeto](#-executando-o-projeto)
- [📚 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔧 Scripts Disponíveis](#-scripts-disponíveis)
- [📖 API Endpoints](#-api-endpoints)
- [📝 Exemplos de Uso](#-exemplos-de-uso)
- [🗄️ Modelos de Dados](#️-modelos-de-dados)
- [🛠️ Padrões de Projeto](#️-padrões-de-projeto)
- [🧪 Testando a API](#-testando-a-api)
- [🔒 Validações](#-validações)
- [🔧 Troubleshooting](#-troubleshooting)
- [📦 Dependências principais](#-dependências-principais)
- [📝 Licença](#-licença)
- [👨‍💻 Autor | Author](#-autor--author)

**EN:**

- [🚀 Technologies](#-tecnologias)
- [📋 Prerequisites](#-pré-requisitos)
- [⚙️ Setup](#️-configuração)
- [🏃‍♂️ Running the project](#-executando-o-projeto)
- [📚 Project Structure](#-estrutura-do-projeto)
- [🔧 Available Scripts](#-scripts-disponíveis)
- [📖 API Endpoints](#-api-endpoints)
- [📝 Usage Examples](#-exemplos-de-uso)
- [🗄️ Data Models](#️-modelos-de-dados)
- [🛠️ Design Patterns](#️-padrões-de-projeto)
- [🧪 Testing the API](#-testando-a-api)
- [🔒 Validations](#-validações)
- [🔧 Troubleshooting](#-troubleshooting)
- [📦 Main Dependencies](#-dependências-principais)
- [📝 License](#-licença)
- [👨‍💻 Author](#-autor--author)

---

## 🚀 Tecnologias | Technologies

**PT-BR:**

- **Fastify** - Framework web para Node.js
- **Drizzle ORM** - ORM TypeScript-first
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de schemas
- **TypeScript** - Linguagem de programação
- **Docker** - Containerização
- **Biome** - Linter e formatter
- **CORS** - Cross-Origin Resource Sharing

**EN:**

- **Fastify** - Web framework for Node.js
- **Drizzle ORM** - TypeScript-first ORM
- **PostgreSQL** - Relational database
- **Zod** - Schema validation
- **TypeScript** - Programming language
- **Docker** - Containerization
- **Biome** - Linter and formatter
- **CORS** - Cross-Origin Resource Sharing

## 📋 Pré-requisitos | Prerequisites

**PT-BR:**

- Node.js 18+
- Docker e Docker Compose
- PostgreSQL (via Docker)

**EN:**

- Node.js 18+
- Docker and Docker Compose
- PostgreSQL (via Docker)

## ⚙️ Configuração | Setup

**PT-BR:**

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd nlw-agents
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3333
DATABASE_URL=postgres://docker:docker@localhost:5432/agent
GEMINI_API_KEY=<sua-chave-da-api-gemini>
```

- `PORT`: Porta do servidor (padrão: 3333)
- `DATABASE_URL`: URL de conexão com o banco PostgreSQL
- `GEMINI_API_KEY`: Chave de API do Google Gemini para transcrição e IA

### 4. Inicie o banco de dados

```bash
docker-compose up -d
```

> O banco utiliza a imagem `pgvector/pgvector:pg17` e habilita a extensão `vector` para embeddings. O script de inicialização está em `docker/setup.sql`.

### 5. Execute as migrações

```bash
npm run db:migrate
```

### 6. Popule o banco (opcional)

```bash
npm run db:seed
```

> O comando acima cria 10 salas e 5 perguntas de exemplo para facilitar testes e desenvolvimento.

**EN:**

### 1. Clone the repository

```bash
git clone <repository-url>
cd nlw-agents
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file at the project root:

```env
PORT=3333
DATABASE_URL=postgres://docker:docker@localhost:5432/agent
GEMINI_API_KEY=<your-gemini-api-key>
```

- `PORT`: Server port (default: 3333)
- `DATABASE_URL`: PostgreSQL connection URL
- `GEMINI_API_KEY`: Google Gemini API key for transcription and AI

### 4. Start the database

```bash
docker-compose up -d
```

> The database uses the `pgvector/pgvector:pg17` image and enables the `vector` extension for embeddings. The initialization script is in `docker/setup.sql`.

### 5. Run migrations

```bash
npm run db:migrate
```

### 6. Seed the database (optional)

```bash
npm run db:seed
```

> The above command creates 10 rooms and 5 sample questions to facilitate testing and development.

## 🏃‍♂️ Executando o projeto | Running the project

**PT-BR:**

### Desenvolvimento

```bash
npm run dev
```

### Produção

```bash
npm start
```

O servidor estará disponível em `http://localhost:3333`

**EN:**

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The server will be available at `http://localhost:3333`

## 📚 Estrutura do Projeto | Project Structure

**PT-BR:**

```
src/
├── db/
│   ├── connection.ts
│   ├── migrations/
│   ├── schema/
│   │   ├── index.ts
│   │   ├── rooms.ts
│   │   ├── questions.ts
│   │   └── audio.chunks.ts
│   └── seed.ts
├── http/
│   └── routes/
│       ├── create-room.ts
│       ├── create-question.ts
│       ├── get-rooms.ts
│       ├── get-room-questions.ts
│       └── upload-audio.ts
├── services/
│   └── gemini.ts
├── env.ts
└── server.ts
```

**EN:**

```
src/
├── db/
│   ├── connection.ts
│   ├── migrations/
│   ├── schema/
│   │   ├── index.ts
│   │   ├── rooms.ts
│   │   ├── questions.ts
│   │   └── audio.chunks.ts
│   └── seed.ts
├── http/
│   └── routes/
│       ├── create-room.ts
│       ├── create-question.ts
│       ├── get-rooms.ts
│       ├── get-room-questions.ts
│       └── upload-audio.ts
├── services/
│   └── gemini.ts
├── env.ts
└── server.ts
```

---

## 🔧 Scripts Disponíveis | Available Scripts

**PT-BR:**

- `npm run dev` - Executa o servidor em modo desenvolvimento
- `npm start` - Executa o servidor em produção
- `npm run db:seed` - Popula o banco de dados
- `npm run db:generate` - Gera novas migrações
- `npm run db:migrate` - Executa as migrações

**EN:**

- `npm run dev` - Runs the server in development mode
- `npm start` - Runs the server in production
- `npm run db:seed` - Seeds the database
- `npm run db:generate` - Generates new migrations
- `npm run db:migrate` - Runs the migrations

---

## 📖 API Endpoints

**PT-BR:**

### Health Check

- `GET /health` - Health check da API

### Salas (Rooms)

- `GET /rooms` - Lista todas as salas com contagem de perguntas
- `POST /rooms` - Cria uma nova sala

### Perguntas (Questions)

- `GET /rooms/:roomId/questions` - Lista todas as perguntas de uma sala
- `POST /rooms/:roomId/questions` - Cria uma nova pergunta em uma sala
  - Ao criar uma pergunta, a API utiliza IA para buscar trechos de áudio relevantes já transcritos e gerar uma resposta automática, se possível.

### Áudio (Audio Chunks)

- `POST /rooms/:roomId/audio` - Faz upload de um arquivo de áudio para uma sala, transcreve automaticamente o conteúdo usando IA Gemini, gera embedding e armazena ambos.

**EN:**

### Health Check

- `GET /health` - API health check

### Rooms

- `GET /rooms` - Lists all rooms with question count
- `POST /rooms` - Creates a new room

### Questions

- `GET /rooms/:roomId/questions` - Lists all questions in a room
- `POST /rooms/:roomId/questions` - Creates a new question in a room
  - When creating a question, the API uses AI to find relevant audio snippets already transcribed and generate an automatic answer if possible.

### Audio (Audio Chunks)

- `POST /rooms/:roomId/audio` - Uploads an audio file to a room, automatically transcribes the content using Gemini AI, generates embedding and stores both.

---

## 📝 Exemplos de Uso | Usage Examples

**PT-BR:**

### Criar uma Sala

```bash
curl -X POST http://localhost:3333/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sala de Teste",
    "description": "Sala para testes da API"
  }'
```

**Resposta:**

```json
{
  "roomId": "uuid-da-sala-criada"
}
```

### Listar Salas

```bash
curl http://localhost:3333/rooms
```

**Resposta:**

```json
[
  {
    "id": "uuid-da-sala",
    "name": "Sala de Teste",
    "questionCount": 5,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Criar uma Pergunta

```bash
curl -X POST http://localhost:3333/rooms/room-uuid/questions \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Qual é o propósito desta sala?"
  }'
```

**Resposta:**

```json
{
  "questionId": "uuid-da-pergunta-criada"
}
```

### Listar Perguntas de uma Sala

```bash
curl http://localhost:3333/rooms/room-uuid/questions
```

**Resposta:**

```json
[
  {
    "id": "uuid-da-pergunta",
    "question": "Qual é o propósito desta sala?",
    "answer": null,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Fazer upload de um áudio para uma sala

```bash
curl -X POST http://localhost:3333/rooms/room-uuid/audio \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/caminho/para/audio.mp3"
```

**Resposta:**

```json
{
  "chunkId": "uuid-do-chunk-criado"
}
```

> O áudio enviado é transcrito automaticamente para português do Brasil e armazenado junto com o embedding vetorial para buscas semânticas.

**EN:**

### Create a Room

```bash
curl -X POST http://localhost:3333/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Room",
    "description": "Room for API tests"
  }'
```

**Response:**

```json
{
  "roomId": "created-room-uuid"
}
```

### List Rooms

```bash
curl http://localhost:3333/rooms
```

**Response:**

```json
[
  {
    "id": "room-uuid",
    "name": "Test Room",
    "questionCount": 5,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Create a Question

```bash
curl -X POST http://localhost:3333/rooms/room-uuid/questions \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is the purpose of this room?"
  }'
```

**Response:**

```json
{
  "questionId": "created-question-uuid"
}
```

### List Questions in a Room

```bash
curl http://localhost:3333/rooms/room-uuid/questions
```

**Response:**

```json
[
  {
    "id": "question-uuid",
    "question": "What is the purpose of this room?",
    "answer": null,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Upload Audio to a Room

```bash
curl -X POST http://localhost:3333/rooms/room-uuid/audio \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/audio.mp3"
```

**Response:**

```json
{
  "chunkId": "created-chunk-uuid"
}
```

> The uploaded audio is automatically transcribed to Brazilian Portuguese and stored along with the vector embedding for semantic searches.

---

## 🗄️ Modelos de Dados | Data Models

**PT-BR:**

### Rooms (Salas)

```typescript
{
  id: string; // UUID
  name: string; // obrigatório
  description?: string; // opcional
  createdAt: Date;
}
```

### Questions (Perguntas)

```typescript
{
  id: string; // UUID
  roomId: string; // UUID, referência para rooms.id
  question: string; // obrigatório
  answer?: string; // gerada automaticamente pela IA, se possível
  createdAt: Date;
}
```

### AudioChunks (Chunks de Áudio)

```typescript
{
  id: string; // UUID
  roomId: string; // UUID, referência para rooms.id
  transcription: string; // transcrição gerada pela IA
  embedding: number[]; // vetor de embedding (dimensões: 768)
  createdAt: Date;
}
```

**EN:**

### Rooms

```typescript
{
  id: string; // UUID
  name: string; // required
  description?: string; // optional
  createdAt: Date;
}
```

### Questions

```typescript
{
  id: string; // UUID
  roomId: string; // UUID, reference to rooms.id
  question: string; // required
  answer?: string; // automatically generated by AI, if possible
  createdAt: Date;
}
```

### AudioChunks

```typescript
{
  id: string; // UUID
  roomId: string; // UUID, reference to rooms.id
  transcription: string; // transcription generated by AI
  embedding: number[]; // embedding vector (dimensions: 768)
  createdAt: Date;
}
```

---

## 🛠️ Padrões de Projeto | Design Patterns

**PT-BR:**

- **Integração com IA** - Transcrição automática de áudio e geração de embeddings usando Google Gemini
- **Fluxo de Perguntas e Respostas** - Ao criar uma pergunta, a API busca trechos de áudio relevantes (com similaridade > 0.7) e utiliza IA para gerar uma resposta automática baseada no contexto transcrito.
- **Clean Architecture** - Separação de responsabilidades
- **Type Safety** - Uso extensivo de TypeScript
- **Schema Validation** - Validação com Zod
- **ORM First** - Drizzle ORM para operações de banco
- **Environment Variables** - Configuração via variáveis de ambiente
- **RESTful API** - Endpoints seguindo padrões REST
- **Error Handling** - Tratamento adequado de erros
- **CORS** - Configuração para requisições cross-origin

**EN:**

- **AI Integration** - Automatic audio transcription and embedding generation using Google Gemini
- **Question & Answer Flow** - When creating a question, the API searches for relevant audio snippets (similarity > 0.7) and uses AI to generate an automatic answer based on the transcribed context.
- **Clean Architecture** - Separation of concerns
- **Type Safety** - Extensive use of TypeScript
- **Schema Validation** - Validation with Zod
- **ORM First** - Drizzle ORM for database operations
- **Environment Variables** - Configuration via environment variables
- **RESTful API** - Endpoints follow REST standards
- **Error Handling** - Proper error handling
- **CORS** - Configuration for cross-origin requests

---

## 🧪 Testando a API | Testing the API

**PT-BR:**
Você pode usar o arquivo `client.http` para testar a API no VS Code com a extensão REST Client, ou usar ferramentas como Postman ou Insomnia.

### Exemplo de fluxo completo:

1. **Criar uma sala:**

   ```http
   POST http://localhost:3333/rooms
   Content-Type: application/json

   {
     "name": "Minha Sala",
     "description": "Descrição da sala"
   }
   ```

   **Resposta:**

   ```json
   {
     "roomId": "uuid-da-sala-criada"
   }
   ```

2. **Fazer upload de áudio para a sala:**
   ```bash
   curl -X POST http://localhost:3333/rooms/{roomId}/audio \
     -H "Content-Type: multipart/form-data" \
     -F "file=@/caminho/para/audio.mp3"
   ```
   **Resposta:**
   ```json
   {
     "chunkId": "uuid-do-chunk-criado"
   }
   ```
3. **Criar uma pergunta na sala:**

   ```http
   POST http://localhost:3333/rooms/{roomId}/questions
   Content-Type: application/json

   {
     "question": "Como funciona esta API?"
   }
   ```

   **Resposta:**

   ```json
   {
     "questionId": "uuid-da-pergunta-criada"
   }
   ```

4. **Listar perguntas da sala:**
   ```http
   GET http://localhost:3333/rooms/{roomId}/questions
   ```
   **Resposta:**
   ```json
   [
     {
       "id": "uuid-da-pergunta",
       "question": "Como funciona esta API?",
       "answer": "Resposta gerada pela IA, se houver contexto suficiente.",
       "createdAt": "2024-01-01T00:00:00.000Z"
     }
   ]
   ```

> O fluxo completo permite criar uma sala, enviar áudios, transcrever e indexar o conteúdo, e depois fazer perguntas que serão respondidas automaticamente pela IA com base nos áudios enviados.

**EN:**
You can use the `client.http` file to test the API in VS Code with the REST Client extension, or use tools like Postman or Insomnia.

### Example full flow:

1. **Create a room:**

   ```http
   POST http://localhost:3333/rooms
   Content-Type: application/json

   {
     "name": "My Room",
     "description": "Room description"
   }
   ```

   **Response:**

   ```json
   {
     "roomId": "created-room-uuid"
   }
   ```

2. **Upload audio to the room:**
   ```bash
   curl -X POST http://localhost:3333/rooms/{roomId}/audio \
     -H "Content-Type: multipart/form-data" \
     -F "file=@/path/to/audio.mp3"
   ```
   **Response:**
   ```json
   {
     "chunkId": "created-chunk-uuid"
   }
   ```
3. **Create a question in the room:**

   ```http
   POST http://localhost:3333/rooms/{roomId}/questions
   Content-Type: application/json

   {
     "question": "How does this API work?"
   }
   ```

   **Response:**

   ```json
   {
     "questionId": "created-question-uuid"
   }
   ```

4. **List questions in the room:**
   ```http
   GET http://localhost:3333/rooms/{roomId}/questions
   ```
   **Response:**
   ```json
   [
     {
       "id": "question-uuid",
       "question": "How does this API work?",
       "answer": "Answer generated by AI, if there is enough context.",
       "createdAt": "2024-01-01T00:00:00.000Z"
     }
   ]
   ```

> The full flow allows you to create a room, upload audios, transcribe and index the content, and then ask questions that will be automatically answered by the AI based on the uploaded audios.

---

## 🔒 Validações | Validations

**PT-BR:**

- **Nome da sala:** Obrigatório, mínimo 1 caractere
- **Pergunta:** Obrigatório, mínimo 1 caractere
- **RoomId:** Deve ser um UUID válido
- **Descrição:** Opcional

**EN:**

- **Room name:** Required, minimum 1 character
- **Question:** Required, minimum 1 character
- **RoomId:** Must be a valid UUID
- **Description:** Optional

---

## 🔧 Troubleshooting

**PT-BR:**

- Certifique-se de que a variável `GEMINI_API_KEY` está definida corretamente no `.env`.
- O banco de dados precisa da extensão `vector` habilitada (já configurada via Docker).
- Para problemas com dependências, rode `npm install` novamente.
- Para resetar o banco e popular com dados de exemplo, use `npm run db:seed`.

**EN:**

- Make sure the `GEMINI_API_KEY` variable is correctly set in your `.env` file.
- The database needs the `vector` extension enabled (already configured via Docker).
- For dependency issues, run `npm install` again.
- To reset the database and seed with sample data, use `npm run db:seed`.

---

## 📦 Dependências principais | Main Dependencies

**PT-BR:**

- `fastify`, `@fastify/cors`, `@fastify/multipart`
- `drizzle-orm`, `drizzle-kit`, `drizzle-seed`
- `@google/genai` (integração IA)
- `zod` (validação)
- `typescript`, `@types/node`
- `biome` (linter)

**EN:**

- `fastify`, `@fastify/cors`, `@fastify/multipart`
- `drizzle-orm`, `drizzle-kit`, `drizzle-seed`
- `@google/genai` (AI integration)
- `zod` (validation)
- `typescript`, `@types/node`
- `biome` (linter)

---

## 📝 Licença | License

**PT-BR:**
Este projeto foi desenvolvido durante o evento NLW da Rocketseat.

**EN:**
This project was developed during Rocketseat's NLW event.

---

## 👨‍💻 Autor | Author

**PT-BR:**

<div align="center">

**Rodolfo M. F. Abreu**  
Desenvolvedor de software apaixonado por tecnologia, aprendizado contínuo e boas práticas de programação. Sempre em busca de novos desafios e oportunidades para colaborar em projetos inovadores.

[![GitHub](https://img.shields.io/badge/GitHub-rodolfomfabreu-black?style=for-the-badge&logo=github)](https://github.com/salamandery)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Rodolfo%20Abreu-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/rodolfo-marques-ferreira-de-abreu/)

Sinta-se à vontade para entrar em contato para dúvidas, sugestões ou colaborações!

</div>

**EN:**

<div align="center">

**Rodolfo M. F. Abreu**  
Software developer passionate about technology, continuous learning, and best programming practices. Always looking for new challenges and opportunities to collaborate on innovative projects.

[![GitHub](https://img.shields.io/badge/GitHub-rodolfomfabreu-black?style=for-the-badge&logo=github)](https://github.com/salamandery)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Rodolfo%20Abreu-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/rodolfo-marques-ferreira-de-abreu/)

Feel free to get in touch for questions, suggestions, or collaborations!

</div>

---

<div align="center">
  <b>Feito com 💙 para estudos de Electron, Node.js e aplicações desktop multiplataforma.<br/>
  Made with 💙 for Electron, Node.js and cross-platform desktop application studies.</b>
</div>

---

<div align="center" id="english-version">
  <b>🇺🇸 English version above | <a href="#top">🇧🇷 Versão em português acima</a></b>
</div>
