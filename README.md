# NLW Agents API

Projeto desenvolvido durante o evento **NLW (Next Level Week)** da Rocketseat, focado em criar uma API para gerenciamento de salas e perguntas com agentes inteligentes.

## 🚀 Tecnologias

- **Fastify** - Framework web para Node.js
- **Drizzle ORM** - ORM TypeScript-first
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de schemas
- **TypeScript** - Linguagem de programação
- **Docker** - Containerização
- **Biome** - Linter e formatter
- **CORS** - Cross-Origin Resource Sharing

## 📋 Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- PostgreSQL (via Docker)

## ⚙️ Configuração

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

## 🏃‍♂️ Executando o projeto

### Desenvolvimento

```bash
npm run dev
```

### Produção

```bash
npm start
```

O servidor estará disponível em `http://localhost:3333`

## 📚 Estrutura do Projeto

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

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa o servidor em modo desenvolvimento
- `npm start` - Executa o servidor em produção
- `npm run db:seed` - Popula o banco de dados
- `npm run db:generate` - Gera novas migrações
- `npm run db:migrate` - Executa as migrações

## 📖 API Endpoints

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

## 📝 Exemplos de Uso

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

## 🗄️ Modelos de Dados

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

## 🛠️ Padrões de Projeto

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

## 🧪 Testando a API

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

## 🔒 Validações

- **Nome da sala:** Obrigatório, mínimo 1 caractere
- **Pergunta:** Obrigatório, mínimo 1 caractere
- **RoomId:** Deve ser um UUID válido
- **Descrição:** Opcional

## 🔧 Troubleshooting

- Certifique-se de que a variável `GEMINI_API_KEY` está definida corretamente no `.env`.
- O banco de dados precisa da extensão `vector` habilitada (já configurada via Docker).
- Para problemas com dependências, rode `npm install` novamente.
- Para resetar o banco e popular com dados de exemplo, use `npm run db:seed`.

## 📦 Dependências principais

- `fastify`, `@fastify/cors`, `@fastify/multipart`
- `drizzle-orm`, `drizzle-kit`, `drizzle-seed`
- `@google/genai` (integração IA)
- `zod` (validação)
- `typescript`, `@types/node`
- `biome` (linter)

## 📝 Licença

Este projeto foi desenvolvido durante o evento NLW da Rocketseat.
**Desenvolvido por:** Rodolfo M. F. Abreu
