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
```

### 4. Inicie o banco de dados

```bash
docker-compose up -d
```

### 5. Execute as migrações

```bash
npm run db:migrate
```

### 6. Popule o banco (opcional)

```bash
npm run db:seed
```

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
│   │   └── questions.ts
│   └── seed.ts
├── http/
│   └── routes/
│       ├── create-room.ts
│       ├── create-question.ts
│       ├── get-rooms.ts
│       └── get-room-questions.ts
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

## 🗄️ Modelos de Dados

### Rooms (Salas)

```typescript
{
  id: string(UUID);
  name: string(obrigatório);
  description: string(opcional);
  createdAt: Date;
}
```

### Questions (Perguntas)

```typescript
{
  id: string (UUID)
  roomId: string (UUID, referência para rooms.id)
  question: string (obrigatório)
  answer: string (opcional)
  createdAt: Date
}
```

## 🛠️ Padrões de Projeto

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

2. **Criar uma pergunta na sala:**

   ```http
   POST http://localhost:3333/rooms/{roomId}/questions
   Content-Type: application/json

   {
     "question": "Como funciona esta API?"
   }
   ```

3. **Listar perguntas da sala:**
   ```http
   GET http://localhost:3333/rooms/{roomId}/questions
   ```

## 🔒 Validações

- **Nome da sala:** Obrigatório, mínimo 1 caractere
- **Pergunta:** Obrigatório, mínimo 1 caractere
- **RoomId:** Deve ser um UUID válido
- **Descrição:** Opcional

## 📝 Licença

Este projeto foi desenvolvido durante o evento NLW da Rocketseat.
**Desenvolvido por:** Rodolfo M. F. Abreu
