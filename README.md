# NLW Agents

Projeto desenvolvido durante o evento **NLW (Next Level Week)** da Rocketseat, focado em criar uma API para gerenciamento de agentes.

## 🚀 Tecnologias

- **Fastify** - Framework web para Node.js
- **Drizzle ORM** - ORM TypeScript-first
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de schemas
- **TypeScript** - Linguagem de programação
- **Docker** - Containerização

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
npx drizzle-kit migrate
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
│   └── seed.ts
├── http/
│   └── routes/
├── env.ts
└── server.ts
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa o servidor em modo desenvolvimento
- `npm start` - Executa o servidor em produção
- `npm run db:seed` - Popula o banco de dados

## 📖 Endpoints

- `GET /health` - Health check da API
- `GET /rooms` - Lista todas as salas

## 🛠️ Padrões de Projeto

- **Clean Architecture** - Separação de responsabilidades
- **Type Safety** - Uso extensivo de TypeScript
- **Schema Validation** - Validação com Zod
- **ORM First** - Drizzle ORM para operações de banco
- **Environment Variables** - Configuração via variáveis de ambiente

## 📝 Licença

Este projeto foi desenvolvido durante o evento NLW da Rocketseat.
Rodolfo M. F. Abreu
