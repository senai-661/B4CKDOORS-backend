# Grená — Backend (B4CKDOORS)

API REST do **Grená**, e-commerce de artigos esportivos desenvolvido pelo grupo **B4CKDOORS**.
Gerencia catálogo (produtos e categorias), usuários, pedidos e **autenticação com JWT**, com controle de acesso por perfil (`admin` e `cliente`).

**Stack:** Node.js · TypeScript · Express 5 · PostgreSQL · JWT · bcrypt

> Frontend: repositório `B4CKDOORS-frontend` (React + Vite), que consome esta API.

---

## 1. Pré-requisitos

| Ferramenta | Versão |
|---|---|
| [Node.js](https://nodejs.org/) | 20 ou superior |
| [PostgreSQL](https://www.postgresql.org/) | 14 ou superior |
| npm | vem com o Node.js |

## 2. Instalação e execução local

```bash
# 1. Instale as dependências
npm install

# 2. Crie o arquivo de ambiente a partir do modelo e preencha os valores
cp .env.example .env
#    -> defina DB_PASSWORD e gere um JWT_SECRET (comando abaixo)

# 3. Crie o banco de dados vazio
#    (psql)  CREATE DATABASE grena;

# 4. Crie as tabelas, triggers e dados de exemplo
npm run db:init

# 5. Suba a API em modo desenvolvimento (recarrega ao salvar)
npm run dev
```

Gerar um `JWT_SECRET` forte:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

A API sobe em `http://localhost:3333` (ou na porta definida em `PORT`). Teste: `GET http://localhost:3333/`.

### Scripts

| Script | O que faz |
|---|---|
| `npm run dev` | Desenvolvimento com recarga automática (`tsx watch`) |
| `npm run build` | Compila o TypeScript para `dist/` |
| `npm start` | Executa a versão compilada (`node dist/app.js`) — use após `npm run build` |
| `npm run db:init` | Executa `infra/sql/init.sql` no banco do `.env` (**apaga e recria as tabelas**) |
| `npm run hash -- "senha"` | Gera um hash bcrypt (para trocar senha direto no banco) |

> ⚠️ `db:init` recusa rodar com `NODE_ENV=production` (a menos que use `--force`), pois o SQL faz `DROP TABLE`.

### Usuários criados pelo `init.sql`

| Perfil | E-mail | Senha |
|---|---|---|
| **admin** | `admin@grena.com` | `admin123` |
| cliente (10 usuários de exemplo) | ex.: `joao.silva@email.com` | `cliente123` |

As senhas ficam armazenadas **somente como hash bcrypt** (10 rounds). **Troque a senha do admin antes de publicar.** Em produção, a API avisa no log se o admin ainda usa a senha padrão.

Para trocar a senha do admin:

```bash
npm run hash -- "NovaSenhaForte123"
# copie o hash gerado e execute no banco:
# UPDATE usuarios SET senha = '<hash>' WHERE email = 'admin@grena.com';
```

---

## 3. Variáveis de ambiente (`.env.example`)

| Variável | Obrigatória | Descrição |
|---|---|---|
| `PORT` | não | Porta HTTP. Padrão: `process.env.PORT \|\| 3333` (plataformas de deploy definem automaticamente). |
| `NODE_ENV` | não | `development` ou `production`. Em `production` o `JWT_SECRET` precisa ter ≥ 32 caracteres e o CORS fica restrito. |
| `DB_HOST` | sim* | Host do PostgreSQL (ex.: `localhost`). |
| `DB_PORT` | não | Porta do PostgreSQL. Padrão `5432`. |
| `DB_USER` | sim* | Usuário do banco. |
| `DB_PASSWORD` | sim* | Senha do banco. **Sensível.** |
| `DB_NAME` | sim* | Nome do banco (ex.: `grena`). |
| `DATABASE_URL` | não | Connection string completa. Se definida, **substitui** as cinco variáveis `DB_*` acima (*). |
| `DB_SSL` | não | `true` para bancos gerenciados que exigem SSL (Render, Neon, Supabase…). Padrão `false`. |
| `JWT_SECRET` | **sim** | Chave usada para assinar/verificar os tokens JWT. **Sensível.** Sem ela o servidor não inicia. |
| `JWT_EXPIRES_IN` | não | Validade do token (ex.: `8h`, `30m`). Padrão `8h`. |
| `BCRYPT_ROUNDS` | não | Custo do bcrypt. Mínimo e padrão `10`; máximo `14`. |
| `FRONTEND_URL` | recomendada | Origem(ns) do frontend liberadas no CORS, separadas por vírgula (ex.: `http://localhost:5173,https://grena.exemplo.com`). Em desenvolvimento, se vazia, libera qualquer origem; em produção, se vazia, bloqueia navegadores. |
| `TRUST_PROXY` | não | Nº de proxies reversos à frente da API (ex.: `1` em Render/Railway). Necessário para o *rate limit* enxergar o IP real. |

## 4. Segurança implementada

- **Senhas** com bcrypt (salt automático, ≥ 10 rounds) no cadastro, na troca de senha e no login. O hash nunca é devolvido pela API.
- **JWT** (HS256, algoritmo fixado na verificação) enviado em `Authorization: Bearer <token>`. A cada requisição o usuário é conferido no banco: se foi excluído ou rebaixado, o token antigo perde o efeito imediatamente (a *role* vem do banco, não do token).
- **Autorização por role** (`admin` / `cliente`) e checagem de **propriedade** (cliente só acessa os próprios pedidos e dados).
- **Login** com mensagem genérica, tempo de resposta equalizado (não revela se o e-mail existe) e **limite de 10 falhas / 15 min por IP**; cadastro limitado a 20 / hora por IP.
- **Cadastro público sempre cria `cliente`.** Só um admin autenticado consegue criar outro admin.
- **Pedidos:** o total é calculado no servidor com os preços do banco; o estoque é conferido e baixado em transação (e devolvido ao cancelar).
- Proteções: `helmet`, CORS configurável, corpo JSON limitado a 100 KB, queries parametrizadas (sem SQL injection), validação de todas as entradas, erros sem stack trace.
- Não é possível excluir a si mesmo nem remover/rebaixar o **único** admin.

## 5. Rotas da API

Erros sempre retornam `{ "mensagem": "..." }` com o status adequado:
`400` dados inválidos · `401` não autenticado/token inválido ou expirado · `403` sem permissão · `404` não encontrado · `409` conflito (duplicado, estoque, registro em uso) · `413` corpo grande · `429` muitas tentativas · `500` erro interno.

Legenda de acesso: 🌐 público · 🔑 qualquer usuário logado · 👤 admin ou o próprio usuário · 🛡️ somente admin.

### Autenticação

| Método | Endpoint | Acesso | Descrição |
|---|---|---|---|
| GET | `/` | 🌐 | Verifica se a API está no ar. |
| POST | `/api/login` (alias `/login`) | 🌐 | Autentica e devolve o JWT. |
| GET | `/api/me` | 🔑 | Dados do usuário dono do token. |

`POST /api/login` — corpo:
```json
{ "email": "admin@grena.com", "senha": "admin123" }
```
Resposta `200`:
```json
{
  "auth": true,
  "token": "<jwt>",
  "expiresIn": "8h",
  "usuario": { "id": 11, "idUsuario": 11, "nome": "Administrador Grená", "email": "admin@grena.com", "role": "admin" }
}
```
Falha `401`: `{ "auth": false, "token": null, "mensagem": "E-mail e/ou senha incorretos." }`

O token contém `id`, `nome`, `email`, `role`, `iat` e `exp`.

### Usuários

| Método | Endpoint | Acesso | Descrição |
|---|---|---|---|
| GET | `/api/usuarios` | 🛡️ | Lista usuários (sem senha). |
| GET | `/api/usuarios/:idUsuario` | 👤 | Busca um usuário. |
| POST | `/api/usuarios` | 🌐 | Cadastra usuário. Público ⇒ `role` = `cliente`. Admin pode enviar `role`. |
| PUT | `/api/usuarios/:idUsuario` | 👤 | Atualiza. `senha` é opcional (vazia mantém a atual). Só admin altera `role`. |
| DELETE | `/api/usuarios/:idUsuario` | 🛡️ | Remove. |

Corpo de `POST`/`PUT`:
```json
{ "nome": "Maria Souza", "email": "maria@email.com", "cpf": "123.456.789-09", "senha": "minimo8chars", "role": "cliente" }
```
- `senha`: 8 a 72 caracteres (obrigatória no POST). `cpf`: 11 dígitos (com ou sem máscara). `role`: `admin` | `cliente` (opcional).
- Resposta `201`/`200`: `{ "mensagem": "...", "usuario": { "idUsuario": 12, "nome": "...", "email": "...", "cpf": "...", "role": "cliente" } }`

### Categorias

| Método | Endpoint | Acesso | Descrição |
|---|---|---|---|
| GET | `/api/categorias` | 🌐 | Lista categorias. |
| GET | `/api/categorias/:idCategoria` | 🌐 | Busca uma categoria. |
| POST | `/api/categorias` | 🛡️ | Cria. Corpo: `{ "nome": "Natação" }` |
| PUT | `/api/categorias/:idCategoria` | 🛡️ | Atualiza. Corpo: `{ "nome": "..." }` |
| DELETE | `/api/categorias/:idCategoria` | 🛡️ | Remove (`409` se houver produtos vinculados). |

Resposta de leitura: `{ "idCategoria": 1, "nome": "Futebol" }`

### Produtos

| Método | Endpoint | Acesso | Descrição |
|---|---|---|---|
| GET | `/api/produtos` | 🌐 | Lista produtos (vitrine). |
| GET | `/api/produtos/:idProduto` | 🌐 | Busca um produto. |
| POST | `/api/produtos` | 🛡️ | Cria produto (o `codProduto` é gerado por trigger). |
| PUT | `/api/produtos/:idProduto` | 🛡️ | Atualiza produto. |
| DELETE | `/api/produtos/:idProduto` | 🛡️ | Remove (`409` se já foi vendido). |

Corpo de `POST`/`PUT`:
```json
{ "nome": "Camisa Flamengo", "descricao": "Oficial", "preco": 199.9, "estoque": 30, "imagem": "https://...", "idCategoria": 1 }
```
`descricao` e `imagem` são opcionais. Resposta de leitura:
```json
{ "idProduto": 1, "codProduto": "PRD001", "nome": "...", "descricao": "...", "preco": 199.9, "estoque": 50, "imagem": null, "idCategoria": 1 }
```

### Pedidos

| Método | Endpoint | Acesso | Descrição |
|---|---|---|---|
| GET | `/api/pedidos` | 🔑 | Admin: todos. Cliente: apenas os próprios. |
| GET | `/api/pedidos/:idPedido` | 🔑 | Detalhe com itens (admin ou dono). |
| POST | `/api/pedidos` | 🔑 | Cria pedido (veja abaixo). |
| PUT | `/api/pedidos/:idPedido` | 🛡️ | Atualiza status (e opcionalmente o total). |
| DELETE | `/api/pedidos/:idPedido` | 🛡️ | Remove o pedido (devolve estoque se não estava cancelado). |

**Criar pedido com itens** (fluxo do carrinho; cliente ou admin). O total é calculado pelo servidor; o `idUsuario` é o do token (admin pode informar outro):
```json
{ "itens": [ { "idProduto": 1, "quantidade": 2 }, { "idProduto": 10, "quantidade": 1 } ] }
```
**Pedido manual** (somente admin, sem itens): `{ "idUsuario": 3, "valorTotal": 150.0, "status": "PAGO" }`

Resposta `201`: `{ "mensagem": "Pedido cadastrado com sucesso.", "pedido": { "idPedido": 11, "codPedido": "PED-2026-0011", "idUsuario": 1, "valorTotal": 479.7, "status": "PENDENTE", "dataPedido": "..." } }`

`PUT` — corpo: `{ "status": "ENVIADO", "valorTotal": 479.7 }` (`valorTotal` opcional).
Status válidos: `PENDENTE`, `PAGO`, `PROCESSANDO`, `ENVIADO`, `CONCLUIDO`, `CANCELADO`. Cancelar devolve os itens ao estoque; pedido cancelado não pode ser reaberto (`409`).

## 6. Estrutura do projeto

```
src/
├── app.ts              # ponto de entrada (conecta ao banco e sobe o servidor)
├── server.ts           # Express: helmet, CORS, JSON, rotas e tratamento global de erros
├── routes.ts           # mapa de rotas + rate limit + proteção por middleware
├── config/env.ts       # leitura e validação das variáveis de ambiente
├── middlewares/Auth.ts # JWT (autenticar) e controle por role (exigirRole)
├── controller/         # regras de entrada/saída HTTP (try/catch + status adequados)
├── model/              # acesso ao PostgreSQL (pool único)
├── interface/          # DTOs
└── utils/              # validações, hash de senha, HttpError
infra/sql/init.sql      # DDL + triggers + dados de exemplo (inclui o admin)
scripts/                # init-db.mjs e gerar-hash.mjs
docs/                   # documentação do projeto
```

## 7. Documentação (DER)

A pasta [`docs/`](./docs) reúne a documentação do projeto:

- `DER-GRENA.png` e `DER-grena.drawio` — Diagrama Entidade-Relacionamento.
- `REQUISITOSFUNCIONAIS.docx`, `SPRINT 1 - B4CKDOORS.docx`, `sprint-1-b4ckdoors.docx`, `grena.pptx` — requisitos e apresentações das sprints.

> **Observação:** o campo `role` foi adicionado à tabela `usuarios` (`VARCHAR(20)`, valores `admin`/`cliente`, padrão `cliente`) depois da elaboração do DER. Atualize `DER-grena.drawio` para refletir essa coluna.

## 8. Deploy

1. Provisione um PostgreSQL e rode `infra/sql/init.sql` **uma única vez** (ex.: `psql "$DATABASE_URL" -f infra/sql/init.sql`).
2. Configure as variáveis: `NODE_ENV=production`, `DATABASE_URL` (+ `DB_SSL=true` se exigido), `JWT_SECRET` (≥ 32 caracteres), `FRONTEND_URL` com a URL pública do frontend e `TRUST_PROXY=1` atrás de proxy.
3. Build: `npm install && npm run build` · Start: `npm start`.
4. Troque a senha padrão do admin.

## 9. Links do projeto

- Sprints: <https://senai-661.notion.site/Sprint-s-Projeto-em-grupo-2f55d25a87a18004b223ffe0bf47330a?source=copy_link>
- Repositório backend: <https://github.com/senai-661/B4CKDOORS-backend.git>
