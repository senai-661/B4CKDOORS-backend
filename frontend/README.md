# GRENÁ — Sprint 06 | Protótipo de interface

Projeto acadêmico de loja esportiva desenvolvido do zero com **ReactJS + TypeScript + Vite**, inspirado nas capturas do protótipo Figma enviado.

## Requisitos
- Node.js 20.19+ (ou versão compatível com o Vite instalado)
- npm

## Como executar
1. Extraia o ZIP.
2. Abra a pasta `GRENA_Sprint06` no VS Code.
3. Abra o terminal dentro da pasta e execute:

```bash
npm install
npm run dev
```

4. Abra o endereço indicado pelo Vite (normalmente `http://localhost:5173`).

Para gerar uma versão de produção:

```bash
npm run build
npm run preview
```

## Telas e funcionalidades
- Início com banner promocional, categorias, benefícios e produtos em destaque.
- Catálogos por categoria (futebol, calçados, roupas, basquete, suplementos e acessórios).
- Busca por nome, categoria ou time.
- Filtros por preço e ofertas; ordenação por preço e avaliação.
- Detalhes do produto, escolha de tamanho e quantidade.
- Favoritos salvos no navegador.
- Carrinho com alteração de quantidade, remoção, subtotal e frete demonstrativo.
- Checkout com endereço e opções Pix, cartão de crédito, cartão de débito e boleto.
- Cadastro/login demonstrativos, área do cliente e histórico local de pedidos.
- Layout responsivo para desktop e celular.
- Imagens SVG locais para os produtos; o projeto não depende de links externos para imagens.

## Observações importantes
Este projeto é um **protótipo frontend para a Sprint 06**. Login, cadastro, carrinho, favoritos e pedidos são persistidos no `localStorage` do navegador. Não há backend, banco de dados, autenticação real nem integração com gateway de pagamento. Os formulários de checkout servem para demonstrar a interface; não insira dados reais de cartão ou documentos.

## Estrutura
```text
GRENA_Sprint06/
├── public/
│   ├── brand/grena-mark.svg
│   └── products/           # ilustrações SVG locais dos produtos
├── src/
│   ├── components/         # Header, Footer, Layout, ProductCard, ProductGrid
│   ├── context/             # estado global do carrinho/conta/favoritos
│   ├── data/products.ts     # catálogo demonstrativo
│   ├── pages/               # telas da aplicação
│   ├── App.tsx
│   ├── main.tsx
│   ├── styles.css
│   └── types.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Paleta de cores (requisito da Sprint 06)

| Cor | HEX | Aplicação no layout |
|---|---|---|
| Preto | `#080808` | Fundo principal e cabeçalho |
| Grená | `#8E1928` | Botões principais, promoções, badges e detalhes |
| Branco | `#FFFFFF` | Textos de alto contraste e botões claros |
| Cinza claro | `#D9D9D9` | Referência de superfícies, ícones e elementos neutros |
| Grafite | `#242424` | Cards, áreas secundárias e superfícies escuras |

Cores complementares usadas para estados: cinza de texto `#A5A5A5`, bordas `#292929` e grená claro `#A92738`.

## Aplicação da paleta
- **Preto:** plano de fundo predominante, reforçando a linguagem esportiva do protótipo.
- **Grená:** cor de marca para chamadas de ação e elementos de destaque.
- **Branco:** leitura dos títulos, preços e ações em contraste com o fundo.
- **Cinza claro:** fundos das imagens de produtos e áreas neutras.
- **Grafite:** cards, filtros, campos e divisórias sem perder a unidade visual.

## Checklist da Sprint 06
- [x] Protótipo implementado em ReactJS + TypeScript.
- [x] Telas principais, listagens, detalhes, formulários e navegação.
- [x] Paleta com pelo menos cinco cores.
- [x] Documentação da paleta e suas aplicações.
- [x] Layout responsivo.
- [x] Componentes reutilizáveis.
- [ ] Inserir o link público do Figma na entrega da atividade.
- [ ] Conferir o projeto em sala e comparar as telas com o protótipo final do grupo.