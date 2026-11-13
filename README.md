Link para sprints
- https://senai-661.notion.site/Sprint-s-Projeto-em-grupo-2f55d25a87a18004b223ffe0bf47330a?source=copy_link

Repositório backend
- https://github.com/senai-661/B4CKDOORS-backend.git

Repositório frontend
- 

Repositório Mobile
- 
---

## Sobre esta versão (merge grená + caet)

Este backend é a junção do branch **b4-corrigido** (que já tinha a camada de
autenticação/JWT, roles, bcrypt e tratamento de erros) com o que o frontend
**caet** (grena-frontend mais completo, com perfil/pagamento/produto) precisava
e ainda não existia aqui:

- **`/api/perfil` (GET e PUT)** — a tela "Meu perfil" do frontend já chamava
  esses endpoints; eles não existiam em nenhum dos dois backends e foram
  criados agora (`PerfilController`), sempre operando sobre o usuário do
  token (nunca sobre um id arbitrário).
- **Campo `imagem` em produtos** — o frontend já exibia `produto.imagem`
  (componente `ImagemProduto`) e o painel admin agora tem um campo para
  cadastrar essa URL, mas a API/banco não tinham essa coluna. Adicionada em
  `ProdutoDTO`, `model/Produto.ts` e exposta pelo `ProdutoController`.
- **Campo `telefone` em usuários** — usado pelo perfil.

**Antes de rodar**, aplique a migração em `docs/migration-merge.sql` no banco
Postgres já usado pelo projeto (adiciona `produtos.imagem` e
`usuarios.telefone`).

## Marcas e filtros da loja (novo)

Ao iniciar (`npm run dev`) o servidor se atualiza sozinho — **não precisa rodar SQL no pgAdmin**:

- cria a tabela `marca` (`id_marca`, `nome`) com as 26 marcas da GRENÁ;
- adiciona em `produtos`: `id_marca` (FK para `marca`), `genero`, `esporte`, `faixa_etaria`, `cores`, `tamanhos`, `promocao`, `desconto`, `preco_anterior`, `parcelas`, `linha`, `caracteristicas`;
- se o banco tinha a coluna de texto `marca` (script antigo do pgAdmin), converte para `id_marca` e remove a coluna de texto;
- preenche gênero, esporte, idade, cores, tamanhos e promoção dos 200 produtos do catálogo que ainda estiverem vazios (nada que você já editou é sobrescrito).

### Rotas novas

| Método | Rota | Acesso |
|---|---|---|
| GET | `/api/marcas`, `/api/marcas/:idMarca` | público |
| POST | `/api/marcas` body `{ "nome": "Nike" }` | admin |
| PUT | `/api/marcas/:idMarca` | admin |
| DELETE | `/api/marcas/:idMarca` (produtos da marca ficam sem marca) | admin |

`GET /api/produtos` agora devolve `idMarca`, `marca`, `genero`, `esporte`, `faixaEtaria`, `cores`, `tamanhos`, `promocao`, `desconto`, `precoAnterior`… — é isso que alimenta os filtros da loja.

`POST/PUT /api/produtos` aceitam esses campos. Na marca basta mandar `marca` (nome — cria se for nova), `idMarca` ou `null` (tira a marca). No PUT, campo que não vier no corpo **não é alterado**.
