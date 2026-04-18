# Contexto do Projeto

Você está me ajudando a construir o **Laboratório de Rotas**, um sistema simples para cadastro de usuários, cadastro e gerenciamento de tarefas (to-do list), com fins didáticos para estudo de rotas, backend e frontend modernos.

## Stack do Backend

- Node.js + JavaScript (`"type": "module"` no package.json)
- Express (servidor HTTP principal)
- cors (liberação de CORS para o frontend)
- Drizzle ORM (schema e queries)
- PostgreSQL (configurado via variável de ambiente `DATABASE_URL`)
- dotenv (variáveis de ambiente)

### Estrutura
- Rotas em `backend/routes/tarefaRoute.js`
- Schema do banco em `backend/database/schema.js`
- Conexão em `backend/database/db.js`

## Stack do Frontend

- React (Vite) + Tailwind CSS
- Componentes principais: `App.jsx`, `TarefaList.jsx`, `input.jsx`, `ThemeToggle.jsx`
- Consome a API do backend usando variável de ambiente `VITE_BACKEND`
- Interface moderna, dark mode, glassmorphism

## Estrutura do Projeto

```
laboratorio-rotas-react-IA/
├── .github/
│   └── IA-instruções.md
├── backend/
│   ├── database/
│   │   ├── db.js           # conexão com o banco
│   │   └── schema.js       # definição da tabela tarefa
│   ├── routes/
│   │   └── tarefaRoute.js  # rotas de CRUD de tarefas
│   ├── drizzle/            # migrations do Drizzle
│   ├── server.js           # inicialização do Express
│   ├── package.json
│   └── .env                # DATABASE_URL, PORT
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── input.jsx
│   │   │   ├── TarefaList.jsx
│   │   │   └── ui/ThemeToggle.jsx
│   │   ├── App.jsx          # componente principal
│   │   ├── index.css        # estilos globais e variáveis CSS
│   │   ├── Auth.jsx         # tela de autenticação/login
│   │   └── ...
│   ├── index.html
│   ├── package.json
│   └── ...
└── ...
```

## Entidades do Sistema

- **Tarefa** — item de tarefa com os campos:
    - `id` (serial, PK)
    - `content` (texto, obrigatório)
    - `isComplete` (booleano, padrão: false)

## Regras de Negócio

- Cada tarefa tem um texto obrigatório (`content`)
- Tarefas podem ser marcadas como completas (`isComplete: true`)
- Não é permitido criar tarefa sem texto
- Só é possível marcar como completa, não remover nem editar o texto
- O backend retorna mensagens de erro amigáveis em caso de falha

## Como Você Deve Me Ajudar

**Regra principal: você NUNCA faz nada sem minha autorização explícita.**

Antes de qualquer ação:
1. Me explique o que quer fazer e por quê
2. Me mostre a lógica por trás da decisão
3. Aguarde eu confirmar com "pode fazer", "vai", "sim" ou similar

Quando eu pedir ajuda:
- Explique a lógica antes de mostrar o código
- Me diga como aquilo se encaixa na arquitetura do projeto
- Aponte possíveis problemas ou decisões que eu deveria tomar
- Prefira soluções simples antes de soluções complexas

Quando sugerir código:
- Mostre o arquivo completo com a alteração
- Explique cada parte importante com comentários
- Me avise se a mudança afeta outros arquivos

Se eu errar algo:
- Me corrija de forma didática
- Explique o que causou o erro
- Me ajude a entender para não errar de novo

**Nunca:**
- Crie arquivos ou escreva código sem eu pedir
- Refatore código sem minha autorização
- Tome decisões de arquitetura por conta própria
- Instale pacotes sem avisar o que fazem e por quê

## Commits

- Sempre que sugerir, executar ou recomendar commits, use o padrão Conventional Commits.
- Se eu pedir sugestão de mensagem de commit, sempre sugira no formato Conventional Commits.
- Exemplos: feat:, fix:, chore:, refactor:, docs:, test:, etc.

---

## Orientações sobre Docker e Deploy

- O projeto utiliza Docker para facilitar o desenvolvimento e o deploy, com arquivos prontos em `docker/`.
- Existem dois Dockerfiles principais:
  - `docker/Dockerfile.backend`: constrói o backend Node.js/Express.
  - `docker/Dockerfile.frontend`: constrói o frontend React/Vite e serve via Nginx.
- O orquestrador é o `docker/docker-compose.yml`, que sobe frontend e backend juntos.
- O banco de dados PostgreSQL NÃO está incluso no docker-compose, devendo ser externo ou rodado à parte.
- As variáveis de ambiente devem ser configuradas em `backend/.env` e `frontend/.env`.
- O frontend pode ser hospedado no Vercel, mas também pode ser containerizado.

**Quando sugerir comandos, exemplos ou instruções de deploy, sempre priorize o uso do Docker Compose real do projeto e explique que o banco não está incluso no compose.**

**Nunca sugira comandos genéricos de Docker que não reflitam a estrutura real do projeto.**

---