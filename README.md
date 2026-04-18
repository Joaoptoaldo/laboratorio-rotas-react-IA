# Laboratório de Rotas - Eficiência com IA

[→ Veja também as instruções detalhadas para IA neste projeto](.github/IA-instruções.md)

## Sobre 

Esse é um projeto didático fullstack (Node.js + React) criado para demonstrar, na prática, como a inteligência artificial pode ser utilizada de forma eficiente e responsável no desenvolvimento de aplicações web modernas.

O sistema implementa um gerenciador de tarefas (to-do list) com autenticação, CRUD, integração frontend-backend e interface moderna, servindo como laboratório para estudo de rotas, arquitetura e automação de código.

---

## Decisões de Arquitetura e Trade-offs

**Minhas escolhas:**

- Optei por **Drizzle ORM** em vez de Prisma por ser mais simples e direto para o escopo didático, evitando complexidade desnecessária.
- Implementei **autenticação JWT** para garantir isolamento de tarefas por usuário, mesmo sabendo que tokens exigem renovação e controle de expiração.
- Estruturei o backend em rotas separadas para facilitar manutenção e testes.
- Preferi **Tailwind CSS** ao invés de styled-components para acelerar prototipação, mesmo abrindo mão de temas dinâmicos avançados.
- Não utilizei Zustand/Redux porque o foco era navegação e autenticação, não gerenciamento global de estado.

**Principais trade-offs:**

- Priorização da simplicidade e clareza.
- Menos flexibilidade em temas e estados globais, mas maior foco didático.

---

## Motivo

O principal objetivo é mostrar como a IA, especialmente ferramentas como GitHub Copilot pode:

- **Acelerar o desenvolvimento**: sugerindo código, compondo componentes, automatizando tarefas repetitivas e reduzindo o tempo de implementação de funcionalidades comuns.
- **Apoiar decisões arquiteturais**: propondo estruturas de pastas, padrões REST, integração de bibliotecas e melhores práticas de frontend/backend.
- **Aumentar a produtividade**: permitindo que o desenvolvedor foque em lógica de negócio, validação e refino, enquanto a IA cuida do boilerplate e da documentação inicial.
- **Potencializar o aprendizado**: servindo como tutor interativo, explicando conceitos, corrigindo erros e sugerindo melhorias em tempo real.

---

## Como a IA foi utilizada

- **Geração de código CRUD**: rotas, controllers, integração com Drizzle ORM e PostgreSQL, componentes React e hooks.
- **Refino de UI/UX**: sugestões de estilos, responsividade, acessibilidade e feedback visual.
- **Automação de testes e validações**: scripts de validação, mensagens de erro e fluxos de autenticação.
- **Documentação e explicações**: geração de comentários e instruções de uso.
- **Ajustes iterativos**: aplicação de patches, refatoração incremental e correção de bugs com feedback imediato.

---

## IA como ferramenta auditada

A IA foi utilizada como aceleradora de tarefas repetitivas e sugestões de código, mas todas as decisões de arquitetura, segurança e experiência do usuário foram validadas, adaptadas e revisadas por mim. A IA não substituiu o papel do programador, apenas potencializou a produtividade. Todo código gerado foi revisado, testado e ajustado para garantir alinhamento ao objetivo do projeto.

---

## Boas práticas no uso de IA

- **Validação humana é essencial**: toda sugestão da IA foi revisada, adaptada e testada antes de ser incorporada ao projeto.
- **IA como copiloto, não piloto**: as decisões finais de arquitetura, segurança e experiência do usuário sempre passaram por análise crítica.
- **Documentação viva**: o README e os comentários refletem o processo de desenvolvimento assistido por IA, servindo de guia para outros estudantes e desenvolvedores.

---

## Conclusões

- A IA é uma ferramenta poderosa para acelerar e qualificar o desenvolvimento, mas não substitui o entendimento dos conceitos.
- O uso eficiente de IA depende de perguntas claras, validação constante e interação ativa entre humano e máquina.

---

## Stack utilizada

- **Backend:** Node.js, Express, Drizzle ORM, PostgreSQL
- **Frontend:** React (Vite), Tailwind CSS
- **Auxílio IA:** GitHub Copilot

---

## Execução com Docker Compose

O projeto já possui configuração pronta para execução com Docker Compose, orquestrando frontend e backend. Os arquivos estão em `docker/`.

### Como executar

1. Certifique-se de ter Docker e Docker Compose instalados.
2. Na raiz do projeto, execute:

```bash
cd docker
# Build e sobe todos os serviços (frontend e backend)
docker-compose up --build
```

- O backend ficará disponível em `http://localhost:3001`
- O frontend ficará disponível em `http://localhost:8080`

### Estrutura dos containers
- **Backend:** Usa `docker/Dockerfile.backend`, expõe porta 3001, lê código de `../backend`.
- **Frontend:** Usa `docker/Dockerfile.frontend`, builda o React e serve via Nginx na porta 8080.
- (O banco de dados deve ser configurado externamente, ex: Neon, Render, Railway, ou localmente.)

### Variáveis de ambiente
- Configure o arquivo `.env` do backend (exemplo em `backend/.env`).
- Configure o arquivo `.env` do frontend (exemplo em `frontend/.env`).

> O docker-compose atual não sobe o banco de dados. Recomenda-se usar um serviço gerenciado ou rodar um container PostgreSQL à parte.

---

## Utilização com Docker

O projeto pode ser executado facilmente em ambiente Docker, facilitando a configuração e o deploy, especialmente para o backend (Node.js + PostgreSQL). Exemplos de uso:

- Suba o banco de dados PostgreSQL rapidamente com um comando:

```bash
docker run --name postgres-tarefas -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=tarefas -p 5432:5432 -d postgres:15
```

- (Opcional) Suba o backend em um container (exemplo básico):

```bash
docker build -t backend-tarefas ./backend
# Depois
docker run -p 3001:3001 --env-file ./backend/.env backend-tarefas
```

- Você pode adaptar um arquivo `docker-compose.yml` para orquestrar backend, banco e frontend juntos.

> O frontend (React) pode ser hospedado facilmente no Vercel, mas também pode ser containerizado se desejar.

**Dica:** Lembre-se de configurar as variáveis de ambiente corretamente (ex: `DATABASE_URL` no backend, `VITE_BACKEND` no frontend).

---

## Licença

Projeto aberto para fins educacionais. Sinta-se à vontade para clonar, estudar e adaptar os códigos.