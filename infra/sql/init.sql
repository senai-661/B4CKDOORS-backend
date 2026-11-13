-- ============================================================
--  GRENA-API  |  init.sql
--  Sprint 04  |  DDL + DML + Triggers
-- ============================================================

-- ─── LIMPEZA ────────────────────────────────────────────────
DROP TABLE IF EXISTS carrinho      CASCADE;
DROP TABLE IF EXISTS favoritos     CASCADE;
DROP TABLE IF EXISTS itens_pedido  CASCADE;
DROP TABLE IF EXISTS pedidos       CASCADE;
DROP TABLE IF EXISTS cupons        CASCADE;
DROP TABLE IF EXISTS produtos      CASCADE;
DROP TABLE IF EXISTS categorias    CASCADE;
DROP TABLE IF EXISTS usuarios      CASCADE;
DROP TABLE IF EXISTS marca         CASCADE;

DROP SEQUENCE IF EXISTS seq_cod_produto;
DROP SEQUENCE IF EXISTS seq_cod_pedido;

DROP FUNCTION IF EXISTS gerar_cod_produto() CASCADE;
DROP FUNCTION IF EXISTS gerar_cod_pedido()  CASCADE;

-- ============================================================
--  SEQUENCES
-- ============================================================

CREATE SEQUENCE seq_cod_produto START 1;
CREATE SEQUENCE seq_cod_pedido  START 1;

-- ============================================================
--  DDL — TABELAS
-- ============================================================

CREATE TABLE usuarios (
    id_usuario  SERIAL          PRIMARY KEY,
    nome        VARCHAR(100)    NOT NULL,
    email       VARCHAR(150)    UNIQUE NOT NULL,
    cpf         VARCHAR(14)     UNIQUE NOT NULL,
    senha       VARCHAR(255)    NOT NULL,
    role        VARCHAR(20)     NOT NULL DEFAULT 'cliente' CHECK (role IN ('cliente', 'admin')),
    telefone    VARCHAR(20),
    created_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
    id_categoria  SERIAL        PRIMARY KEY,
    nome          VARCHAR(100)  NOT NULL UNIQUE
);

CREATE TABLE produtos (
    id_produto    SERIAL          PRIMARY KEY,
    cod_produto   VARCHAR(20)     UNIQUE NOT NULL,
    nome          VARCHAR(150)    NOT NULL,
    descricao     TEXT,
    preco         NUMERIC(10,2)   NOT NULL CHECK (preco >= 0),
    estoque       INTEGER         NOT NULL CHECK (estoque >= 0),
    imagem        TEXT,
    id_categoria  INTEGER         REFERENCES categorias(id_categoria),
    created_at    TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cupons (
    id_cupom  SERIAL        PRIMARY KEY,
    codigo    VARCHAR(20)   UNIQUE NOT NULL,
    desconto  NUMERIC(5,2)  NOT NULL CHECK (desconto > 0),
    ativo     BOOLEAN       DEFAULT TRUE
);

CREATE TABLE pedidos (
    id_pedido   SERIAL        PRIMARY KEY,
    cod_pedido  VARCHAR(20)   UNIQUE NOT NULL,
    id_usuario  INTEGER       REFERENCES usuarios(id_usuario),
    total       NUMERIC(10,2) NOT NULL CHECK (total >= 0),
    status      VARCHAR(50)   DEFAULT 'PENDENTE',
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE itens_pedido (
    id_item         SERIAL        PRIMARY KEY,
    id_pedido       INTEGER       REFERENCES pedidos(id_pedido)  ON DELETE CASCADE,
    id_produto      INTEGER       REFERENCES produtos(id_produto),
    quantidade      INTEGER       NOT NULL CHECK (quantidade > 0),
    preco_unitario  NUMERIC(10,2) NOT NULL CHECK (preco_unitario >= 0)
);

CREATE TABLE favoritos (
    id_favorito  SERIAL  PRIMARY KEY,
    id_usuario   INTEGER REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_produto   INTEGER REFERENCES produtos(id_produto) ON DELETE CASCADE
);

CREATE TABLE carrinho (
    id_carrinho  SERIAL  PRIMARY KEY,
    id_usuario   INTEGER REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_produto   INTEGER REFERENCES produtos(id_produto) ON DELETE CASCADE,
    quantidade   INTEGER NOT NULL CHECK (quantidade > 0)
);

-- ============================================================
--  TRIGGERS
-- ============================================================

CREATE OR REPLACE FUNCTION gerar_cod_produto()
RETURNS TRIGGER AS $$
BEGIN
    NEW.cod_produto := 'PRD' || LPAD(nextval('seq_cod_produto')::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_cod_produto
    BEFORE INSERT ON produtos
    FOR EACH ROW
    EXECUTE FUNCTION gerar_cod_produto();

CREATE OR REPLACE FUNCTION gerar_cod_pedido()
RETURNS TRIGGER AS $$
BEGIN
    NEW.cod_pedido := 'PED-' || TO_CHAR(NOW(), 'YYYY') || '-'
                      || LPAD(nextval('seq_cod_pedido')::TEXT, 4, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_cod_pedido
    BEFORE INSERT ON pedidos
    FOR EACH ROW
    EXECUTE FUNCTION gerar_cod_pedido();

-- ============================================================
--  DML — POPULAÇÃO
-- ============================================================

-- USUARIOS
-- Senha do admin: admin123 | Senha dos clientes de teste: cliente123 (hashes reais em bcrypt)
INSERT INTO usuarios (nome, email, cpf, senha, role) VALUES
('Administrador GRENÁ', 'admin@grena.com',            '000.111.222-33', '$2b$10$FVpQhhrzJQ3DT2rWB2yQ2O6E1H3Gd3PWO/RvOfzJw7YOTIxnIM4nq', 'admin'),
('João Silva',       'joao.silva@email.com',       '111.111.111-11', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente'),
('Maria Oliveira',   'maria.oliveira@email.com',   '222.222.222-22', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente'),
('Pedro Santos',     'pedro.santos@email.com',     '333.333.333-33', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente'),
('Lucas Almeida',    'lucas.almeida@email.com',    '444.444.444-44', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente'),
('Ana Costa',        'ana.costa@email.com',         '555.555.555-55', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente'),
('Fernanda Lima',    'fernanda.lima@email.com',    '666.666.666-66', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente'),
('Rafael Souza',     'rafael.souza@email.com',     '777.777.777-77', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente'),
('Camila Rocha',     'camila.rocha@email.com',     '888.888.888-88', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente'),
('Bruno Martins',    'bruno.martins@email.com',    '999.999.999-99', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente'),
('Juliana Ferreira', 'juliana.ferreira@email.com', '000.000.000-00', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente');

-- CATEGORIAS
INSERT INTO categorias (nome) VALUES
('Futebol'),
('Basquete'),
('Masculino'),
('Mulheres'),
('Crianças'),
('Calçados'),
('Suplementos'),
('Promoções');

-- PRODUTOS
INSERT INTO produtos (nome, descricao, preco, estoque, id_categoria) VALUES
('Camisa São Paulo 24/25',   'Camisa oficial temporada 24/25',        199.90,  50, 1),
('Camisa Palmeiras 96/97',   'Modelo retrô temporada 96/97',          219.90,  30, 1),
('Camisa Corinthians 19/20', 'Camisa oficial 19/20',                  189.90,  40, 1),
('Regata Lakers 23/24',      'Regata oficial NBA',                    499.90,  20, 2),
('Regata Boston Celtics',    'Modelo clássico Celtics',               479.90,  25, 2),
('Tênis Nike Air Run',       'Tênis ideal para corrida longa',        399.90,  35, 6),
('Tênis Puma Carina',        'Modelo feminino casual',                349.90,  45, 6),
('Blusão Puma Squad',        'Moletom feminino com capuz',            279.90,  15, 4),
('Conjunto Infantil Inter',  'Conjunto infantil completo do Inter',   149.90,  60, 5),
('Kit Meias Puma x3',        'Kit com 3 pares de meias esportivas',    79.90, 100, 8),
('Shorts Adidas Run',        'Short masculino para corrida',          129.90,  55, 3),
('Coqueteleira 700ml',       'Coqueteleira com misturador interno',    59.90,  80, 7);

-- CUPONS
INSERT INTO cupons (codigo, desconto, ativo) VALUES
('GRENA10',    10.00, TRUE),
('FUTEBOL15',  15.00, TRUE),
('BASQUETE20', 20.00, TRUE),
('RUN5',        5.00, TRUE),
('PROMO25',    25.00, TRUE),
('DESCONTO30', 30.00, TRUE),
('CLIENTE5',    5.00, TRUE),
('OFERTA12',   12.00, TRUE),
('VIP18',      18.00, FALSE),
('SUPER50',    50.00, FALSE);

-- PEDIDOS
INSERT INTO pedidos (id_usuario, total, status, created_at) VALUES
(1,  199.90, 'PAGO',      '2025-06-01 09:10:00'),
(2,  349.90, 'PENDENTE',  '2025-06-05 14:30:00'),
(3,  479.90, 'PAGO',      '2025-06-08 11:00:00'),
(4,  219.90, 'ENVIADO',   '2025-06-10 16:45:00'),
(5,  149.90, 'PAGO',      '2025-06-12 10:20:00'),
(6,  399.90, 'CANCELADO', '2025-06-14 08:00:00'),
(7,  189.90, 'PAGO',      '2025-06-16 13:10:00'),
(8,  279.90, 'PENDENTE',  '2025-06-18 17:55:00'),
(9,  499.90, 'PAGO',      '2025-06-20 09:40:00'),
(10,  79.90, 'PAGO',      '2025-06-22 12:00:00');

-- ITENS DE PEDIDO
INSERT INTO itens_pedido (id_pedido, id_produto, quantidade, preco_unitario) VALUES
(1,  1, 1, 199.90),
(2,  7, 1, 349.90),
(3,  5, 1, 479.90),
(4,  2, 1, 219.90),
(5,  9, 1, 149.90),
(6,  6, 1, 399.90),
(7,  3, 1, 189.90),
(8,  8, 1, 279.90),
(9,  4, 1, 499.90),
(10, 10, 1,  79.90);

-- FAVORITOS
INSERT INTO favoritos (id_usuario, id_produto) VALUES
(1, 4), (1, 6), (2, 1), (3, 5), (4, 7),
(5, 2), (6, 9), (7, 3), (8, 10), (9, 8);

-- CARRINHO
INSERT INTO carrinho (id_usuario, id_produto, quantidade) VALUES
(1,  6, 1), (2,  4, 1), (3, 11, 2), (4,  1, 1), (5,  7, 1),
(6,  2, 1), (7, 12, 3), (8,  5, 1), (9,  9, 2), (10, 3, 1);


---------------------------------------

---------- MAIS PRODUTOS

 --------------------------------------

 

-- =====================================================================
--  GRENÁ — Marcas + 200 produtos (100 camisas de time)
--  Como usar no pgAdmin:
--    1. Abra o banco da loja > botão direito > "Query Tool"
--    2. Cole TODO este arquivo e aperte F5 (Executar)
--  O script pode ser rodado mais de uma vez: não duplica marcas,
--  categorias nem produtos (compara pelo nome).
--  Os produtos que você já tinha NÃO são alterados — a marca deles
--  você define depois pela tela de admin.
-- =====================================================================

-- 1) Tabela de MARCAS -------------------------------------------------
CREATE TABLE IF NOT EXISTS marca (
  id_marca   SERIAL PRIMARY KEY,
  nome       VARCHAR(80) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO marca (nome) VALUES
  ('Adidas'),
  ('Asics'),
  ('Black Skull'),
  ('Fila'),
  ('GRENÁ'),
  ('Growth Supplements'),
  ('Integralmédica'),
  ('Kappa'),
  ('Lupo'),
  ('Max Titanium'),
  ('Mikasa'),
  ('Mizuno'),
  ('New Balance'),
  ('Nike'),
  ('Oakley'),
  ('Olympikus'),
  ('Penalty'),
  ('Probiótica'),
  ('Puma'),
  ('Reebok'),
  ('Spalding'),
  ('Speedo'),
  ('Topper'),
  ('Umbro'),
  ('Under Armour'),
  ('Wilson')
ON CONFLICT (nome) DO NOTHING;

-- 2) Produtos a cadastrar (tabela temporária, some ao fechar a aba) ---
DROP TABLE IF EXISTS tmp_catalogo_grena;
CREATE TEMP TABLE tmp_catalogo_grena (
  nome text, descricao text, preco numeric(10,2), estoque int,
  categoria text, marca text, genero text, esporte text, faixa_etaria text,
  desconto int, preco_anterior numeric(10,2), promocao boolean,
  cores text[], tamanhos text[]
);

INSERT INTO tmp_catalogo_grena VALUES
('Camisa I 2025/26 Torcedor Flamengo', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Flamengo by Adidas.', 349.99, 48, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Vermelho','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Flamengo', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Flamengo by Adidas.', 349.99, 15, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Vermelho','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Flamengo', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Flamengo by Adidas.', 379.99, 9, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Vermelho','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Flamengo', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Flamengo by Adidas.', 249.99, 55, 'Camisas de Time', 'Adidas', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Vermelho','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Palmeiras', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Palmeiras by Puma.', 349.99, 25, 'Camisas de Time', 'Puma', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Verde','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Palmeiras', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Palmeiras by Puma.', 349.99, 23, 'Camisas de Time', 'Puma', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Verde','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Palmeiras', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Palmeiras by Puma.', 379.99, 22, 'Camisas de Time', 'Puma', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Verde','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Palmeiras', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Palmeiras by Puma.', 249.99, 16, 'Camisas de Time', 'Puma', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Verde','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Corinthians', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Corinthians by Nike.', 349.99, 55, 'Camisas de Time', 'Nike', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Branco','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Corinthians', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Corinthians by Nike.', 349.99, 14, 'Camisas de Time', 'Nike', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Branco','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Corinthians', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Corinthians by Nike.', 379.99, 51, 'Camisas de Time', 'Nike', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Branco','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Corinthians', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Corinthians by Nike.', 249.99, 55, 'Camisas de Time', 'Nike', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Branco','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor São Paulo', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial São Paulo by New Balance.', 349.99, 42, 'Camisas de Time', 'New Balance', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Branco','Vermelho','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor São Paulo', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial São Paulo by New Balance.', 349.99, 13, 'Camisas de Time', 'New Balance', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Branco','Vermelho','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 São Paulo', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial São Paulo by New Balance.', 379.99, 45, 'Camisas de Time', 'New Balance', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Branco','Vermelho','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 São Paulo', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial São Paulo by New Balance.', 249.99, 35, 'Camisas de Time', 'New Balance', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Branco','Vermelho','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Santos', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Santos by Umbro.', 349.99, 10, 'Camisas de Time', 'Umbro', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Branco','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Santos', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Santos by Umbro.', 349.99, 9, 'Camisas de Time', 'Umbro', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Branco','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Santos', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Santos by Umbro.', 379.99, 13, 'Camisas de Time', 'Umbro', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Branco','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Santos', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Santos by Umbro.', 249.99, 21, 'Camisas de Time', 'Umbro', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Branco','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Vasco da Gama', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Vasco da Gama by Kappa.', 349.99, 22, 'Camisas de Time', 'Kappa', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Vasco da Gama', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Vasco da Gama by Kappa.', 349.99, 40, 'Camisas de Time', 'Kappa', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Vasco da Gama', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Vasco da Gama by Kappa.', 379.99, 46, 'Camisas de Time', 'Kappa', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Vasco da Gama', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Vasco da Gama by Kappa.', 249.99, 9, 'Camisas de Time', 'Kappa', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Grêmio', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Grêmio by Umbro.', 349.99, 43, 'Camisas de Time', 'Umbro', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Azul','Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Grêmio', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Grêmio by Umbro.', 349.99, 20, 'Camisas de Time', 'Umbro', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Azul','Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Grêmio', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Grêmio by Umbro.', 379.99, 53, 'Camisas de Time', 'Umbro', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Azul','Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Grêmio', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Grêmio by Umbro.', 249.99, 49, 'Camisas de Time', 'Umbro', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Azul','Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Internacional', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Internacional by Adidas.', 349.99, 52, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Vermelho','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Internacional', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Internacional by Adidas.', 349.99, 42, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Vermelho','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Internacional', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Internacional by Adidas.', 379.99, 34, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Vermelho','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Internacional', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Internacional by Adidas.', 249.99, 22, 'Camisas de Time', 'Adidas', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Vermelho','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Atlético Mineiro', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Atlético Mineiro by Adidas.', 349.99, 36, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Atlético Mineiro', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Atlético Mineiro by Adidas.', 349.99, 45, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Atlético Mineiro', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Atlético Mineiro by Adidas.', 379.99, 25, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Atlético Mineiro', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Atlético Mineiro by Adidas.', 249.99, 59, 'Camisas de Time', 'Adidas', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Cruzeiro', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Cruzeiro by Adidas.', 349.99, 8, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Azul','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Cruzeiro', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Cruzeiro by Adidas.', 349.99, 56, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Azul','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Cruzeiro', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Cruzeiro by Adidas.', 379.99, 59, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Azul','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Cruzeiro', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Cruzeiro by Adidas.', 249.99, 18, 'Camisas de Time', 'Adidas', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Azul','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Botafogo', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Botafogo by Reebok.', 349.99, 52, 'Camisas de Time', 'Reebok', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Botafogo', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Botafogo by Reebok.', 349.99, 35, 'Camisas de Time', 'Reebok', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Botafogo', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Botafogo by Reebok.', 379.99, 29, 'Camisas de Time', 'Reebok', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Botafogo', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Botafogo by Reebok.', 249.99, 25, 'Camisas de Time', 'Reebok', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Fluminense', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Fluminense by Umbro.', 349.99, 17, 'Camisas de Time', 'Umbro', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Grená','Verde','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Fluminense', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Fluminense by Umbro.', 349.99, 21, 'Camisas de Time', 'Umbro', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Grená','Verde','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Fluminense', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Fluminense by Umbro.', 379.99, 56, 'Camisas de Time', 'Umbro', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Grená','Verde','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Fluminense', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Fluminense by Umbro.', 249.99, 29, 'Camisas de Time', 'Umbro', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Grená','Verde','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Bahia', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Bahia by Puma.', 349.99, 14, 'Camisas de Time', 'Puma', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Azul','Vermelho','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Bahia', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Bahia by Puma.', 349.99, 13, 'Camisas de Time', 'Puma', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Azul','Vermelho','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Bahia', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Bahia by Puma.', 379.99, 32, 'Camisas de Time', 'Puma', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Azul','Vermelho','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Bahia', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Bahia by Puma.', 249.99, 14, 'Camisas de Time', 'Puma', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Azul','Vermelho','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Real Madrid', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Real Madrid by Adidas.', 349.99, 30, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Branco','Dourado']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Real Madrid', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Real Madrid by Adidas.', 349.99, 30, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Branco','Dourado']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Real Madrid', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Real Madrid by Adidas.', 379.99, 46, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Branco','Dourado']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Real Madrid', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Real Madrid by Adidas.', 249.99, 24, 'Camisas de Time', 'Adidas', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Branco','Dourado']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Barcelona', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Barcelona by Nike.', 349.99, 59, 'Camisas de Time', 'Nike', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Azul','Grená']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Barcelona', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Barcelona by Nike.', 349.99, 10, 'Camisas de Time', 'Nike', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Azul','Grená']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Barcelona', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Barcelona by Nike.', 379.99, 54, 'Camisas de Time', 'Nike', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Azul','Grená']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Barcelona', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Barcelona by Nike.', 249.99, 37, 'Camisas de Time', 'Nike', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Azul','Grená']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Manchester City', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Manchester City by Puma.', 349.99, 42, 'Camisas de Time', 'Puma', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Azul','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Manchester City', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Manchester City by Puma.', 349.99, 15, 'Camisas de Time', 'Puma', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Azul','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Manchester City', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Manchester City by Puma.', 379.99, 32, 'Camisas de Time', 'Puma', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Azul','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Manchester City', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Manchester City by Puma.', 249.99, 13, 'Camisas de Time', 'Puma', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Azul','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Liverpool', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Liverpool by Adidas.', 349.99, 43, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Vermelho']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Liverpool', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Liverpool by Adidas.', 349.99, 26, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Vermelho']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Liverpool', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Liverpool by Adidas.', 379.99, 48, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Vermelho']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Liverpool', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Liverpool by Adidas.', 249.99, 47, 'Camisas de Time', 'Adidas', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Vermelho']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Paris Saint-Germain', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Paris Saint-Germain by Nike.', 349.99, 31, 'Camisas de Time', 'Nike', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Azul-marinho','Vermelho']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Paris Saint-Germain', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Paris Saint-Germain by Nike.', 349.99, 44, 'Camisas de Time', 'Nike', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Azul-marinho','Vermelho']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Paris Saint-Germain', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Paris Saint-Germain by Nike.', 379.99, 20, 'Camisas de Time', 'Nike', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Azul-marinho','Vermelho']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Paris Saint-Germain', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Paris Saint-Germain by Nike.', 249.99, 53, 'Camisas de Time', 'Nike', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Azul-marinho','Vermelho']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Juventus', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Juventus by Adidas.', 349.99, 12, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Juventus', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Juventus by Adidas.', 349.99, 10, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Juventus', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Juventus by Adidas.', 379.99, 50, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Juventus', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Juventus by Adidas.', 249.99, 22, 'Camisas de Time', 'Adidas', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Preto','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Milan', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Milan by Puma.', 349.99, 57, 'Camisas de Time', 'Puma', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Vermelho','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Milan', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Milan by Puma.', 349.99, 26, 'Camisas de Time', 'Puma', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Vermelho','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Milan', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Milan by Puma.', 379.99, 13, 'Camisas de Time', 'Puma', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Vermelho','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Milan', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Milan by Puma.', 249.99, 22, 'Camisas de Time', 'Puma', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Vermelho','Preto']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Bayern de Munique', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Bayern de Munique by Adidas.', 349.99, 14, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Vermelho','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Bayern de Munique', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Bayern de Munique by Adidas.', 349.99, 32, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Vermelho','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Bayern de Munique', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Bayern de Munique by Adidas.', 379.99, 25, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Vermelho','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Bayern de Munique', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Bayern de Munique by Adidas.', 249.99, 37, 'Camisas de Time', 'Adidas', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Vermelho','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Boca Juniors', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Boca Juniors by Adidas.', 349.99, 48, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Azul','Amarelo']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Boca Juniors', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Boca Juniors by Adidas.', 349.99, 31, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Azul','Amarelo']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Boca Juniors', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Boca Juniors by Adidas.', 379.99, 18, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Azul','Amarelo']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Boca Juniors', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Boca Juniors by Adidas.', 249.99, 31, 'Camisas de Time', 'Adidas', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Azul','Amarelo']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Seleção Brasileira', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Seleção Brasileira by Nike.', 349.99, 30, 'Camisas de Time', 'Nike', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Amarelo','Verde','Azul']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Seleção Brasileira', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Seleção Brasileira by Nike.', 349.99, 21, 'Camisas de Time', 'Nike', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Amarelo','Verde','Azul']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Seleção Brasileira', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Seleção Brasileira by Nike.', 379.99, 50, 'Camisas de Time', 'Nike', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Amarelo','Verde','Azul']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Seleção Brasileira', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Seleção Brasileira by Nike.', 249.99, 25, 'Camisas de Time', 'Nike', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Amarelo','Verde','Azul']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Seleção Argentina', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Seleção Argentina by Adidas.', 349.99, 52, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Azul','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Seleção Argentina', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Seleção Argentina by Adidas.', 349.99, 51, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Azul','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Seleção Argentina', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Seleção Argentina by Adidas.', 379.99, 49, 'Camisas de Time', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Azul','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Seleção Argentina', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Seleção Argentina by Adidas.', 249.99, 12, 'Camisas de Time', 'Adidas', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Azul','Branco']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa I 2025/26 Torcedor Seleção de Portugal', 'Uniforme titular oficial, versão torcedor, tecido leve com tecnologia de secagem rápida. Produto oficial Seleção de Portugal by Nike.', 349.99, 46, 'Camisas de Time', 'Nike', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Vermelho','Verde']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa II 2025/26 Torcedor Seleção de Portugal', 'Uniforme reserva oficial, versão torcedor, escudo bordado e gola com acabamento canelado. Produto oficial Seleção de Portugal by Nike.', 349.99, 48, 'Camisas de Time', 'Nike', 'Masculino', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Vermelho','Verde']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa III 2025/26 Seleção de Portugal', 'Terceiro uniforme oficial com design exclusivo da temporada. Produto oficial Seleção de Portugal by Nike.', 379.99, 18, 'Camisas de Time', 'Nike', 'Masculino', 'Futebol', 'Adulto', 15, 447.05, TRUE, ARRAY['Vermelho','Verde']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Camisa de Treino 2025/26 Seleção de Portugal', 'Camisa de treino usada pelo elenco, tecido respirável e corte atlético. Produto oficial Seleção de Portugal by Nike.', 249.99, 42, 'Camisas de Time', 'Nike', 'Unissex', 'Futebol', 'Adulto', 20, 312.49, TRUE, ARRAY['Vermelho','Verde']::text[], ARRAY['P','M','G','GG','XG']::text[]),
('Chuteira Nike Mercurial Vapor 16 Academy Campo', 'Chuteira Nike com cabedal leve e solado de alta tração para máximo controle de bola.', 599.99, 21, 'Chuteiras', 'Nike', 'Unissex', 'Futebol', 'Adulto', 15, 705.87, TRUE, ARRAY['Branco','Laranja']::text[], ARRAY['37','38','39','40','41','42','43','44']::text[]),
('Chuteira Nike Phantom GX II Club Society', 'Chuteira Nike com cabedal leve e solado de alta tração para máximo controle de bola.', 349.99, 23, 'Chuteiras', 'Nike', 'Unissex', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Verde','Amarelo']::text[], ARRAY['37','38','39','40','41','42','43','44']::text[]),
('Chuteira Nike Tiempo Legend 10 Academy Campo', 'Chuteira Nike com cabedal leve e solado de alta tração para máximo controle de bola.', 549.99, 26, 'Chuteiras', 'Nike', 'Unissex', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Preto','Branco']::text[], ARRAY['37','38','39','40','41','42','43','44']::text[]),
('Chuteira Adidas Predator League Campo', 'Chuteira Adidas com cabedal leve e solado de alta tração para máximo controle de bola.', 499.99, 26, 'Chuteiras', 'Adidas', 'Unissex', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Laranja','Azul']::text[], ARRAY['37','38','39','40','41','42','43','44']::text[]),
('Chuteira Adidas F50 League Society', 'Chuteira Adidas com cabedal leve e solado de alta tração para máximo controle de bola.', 449.99, 19, 'Chuteiras', 'Adidas', 'Unissex', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Amarelo','Azul']::text[], ARRAY['37','38','39','40','41','42','43','44']::text[]),
('Chuteira Adidas Copa Pure 2 Club Futsal', 'Chuteira Adidas com cabedal leve e solado de alta tração para máximo controle de bola.', 299.99, 37, 'Chuteiras', 'Adidas', 'Unissex', 'Futsal', 'Adulto', 0, NULL, FALSE, ARRAY['Laranja','Verde']::text[], ARRAY['37','38','39','40','41','42','43','44']::text[]),
('Chuteira Puma Future 7 Play Campo', 'Chuteira Puma com cabedal leve e solado de alta tração para máximo controle de bola.', 399.99, 22, 'Chuteiras', 'Puma', 'Unissex', 'Futebol', 'Adulto', 10, 444.43, TRUE, ARRAY['Branco','Verde']::text[], ARRAY['37','38','39','40','41','42','43','44']::text[]),
('Chuteira Puma Ultra 5 Play Society', 'Chuteira Puma com cabedal leve e solado de alta tração para máximo controle de bola.', 349.99, 33, 'Chuteiras', 'Puma', 'Unissex', 'Futebol', 'Adulto', 10, 388.88, TRUE, ARRAY['Amarelo','Laranja']::text[], ARRAY['37','38','39','40','41','42','43','44']::text[]),
('Chuteira Mizuno Morelia Neo IV Pro Campo', 'Chuteira Mizuno com cabedal leve e solado de alta tração para máximo controle de bola.', 899.99, 20, 'Chuteiras', 'Mizuno', 'Unissex', 'Futebol', 'Adulto', 15, 1058.81, TRUE, ARRAY['Branco','Amarelo']::text[], ARRAY['37','38','39','40','41','42','43','44']::text[]),
('Chuteira Umbro Pro 5 Bump Futsal', 'Chuteira Umbro com cabedal leve e solado de alta tração para máximo controle de bola.', 229.99, 11, 'Chuteiras', 'Umbro', 'Unissex', 'Futsal', 'Adulto', 0, NULL, FALSE, ARRAY['Preto','Verde']::text[], ARRAY['37','38','39','40','41','42','43','44']::text[]),
('Chuteira Penalty Bravo Y-3 Society', 'Chuteira Penalty com cabedal leve e solado de alta tração para máximo controle de bola.', 199.99, 16, 'Chuteiras', 'Penalty', 'Unissex', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Verde','Laranja']::text[], ARRAY['37','38','39','40','41','42','43','44']::text[]),
('Chuteira Topper Maestro TD Campo', 'Chuteira Topper com cabedal leve e solado de alta tração para máximo controle de bola.', 179.99, 30, 'Chuteiras', 'Topper', 'Unissex', 'Futebol', 'Adulto', 15, 211.75, TRUE, ARRAY['Laranja','Amarelo']::text[], ARRAY['37','38','39','40','41','42','43','44']::text[]),
('Chuteira Kappa Player Base Futsal', 'Chuteira Kappa com cabedal leve e solado de alta tração para máximo controle de bola.', 189.99, 39, 'Chuteiras', 'Kappa', 'Unissex', 'Futsal', 'Adulto', 0, NULL, FALSE, ARRAY['Azul','Amarelo']::text[], ARRAY['37','38','39','40','41','42','43','44']::text[]),
('Chuteira New Balance Furon V7 Dispatch Campo', 'Chuteira New Balance com cabedal leve e solado de alta tração para máximo controle de bola.', 479.99, 13, 'Chuteiras', 'New Balance', 'Unissex', 'Futebol', 'Adulto', 10, 533.32, TRUE, ARRAY['Verde','Amarelo']::text[], ARRAY['37','38','39','40','41','42','43','44']::text[]),
('Chuteira Nike Mercurial Superfly 10 Club Infantil', 'Chuteira Nike com cabedal leve e solado de alta tração para máximo controle de bola.', 299.99, 27, 'Chuteiras', 'Nike', 'Unissex', 'Futebol', 'Infantil', 15, 352.93, TRUE, ARRAY['Preto','Azul']::text[], ARRAY['28','29','30','31','32','33','34','35','36']::text[]),
('Tênis Nike Pegasus 41', 'Nike Pegasus 41: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 799.99, 10, 'Calçados', 'Nike', 'Feminino', 'Corrida', 'Adulto', 10, 888.88, TRUE, ARRAY['Preto','Laranja']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis Nike Vomero 18', 'Nike Vomero 18: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 999.99, 21, 'Calçados', 'Nike', 'Masculino', 'Corrida', 'Adulto', 10, 1111.10, TRUE, ARRAY['Rosa','Preto']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis Nike Revolution 7', 'Nike Revolution 7: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 399.99, 31, 'Calçados', 'Nike', 'Unissex', 'Corrida', 'Adulto', 0, NULL, FALSE, ARRAY['Rosa','Verde']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis Adidas Ultraboost 5', 'Adidas Ultraboost 5: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 1099.99, 9, 'Calçados', 'Adidas', 'Feminino', 'Corrida', 'Adulto', 25, 1466.65, TRUE, ARRAY['Verde','Branco']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis Adidas Adizero SL2', 'Adidas Adizero SL2: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 699.99, 35, 'Calçados', 'Adidas', 'Unissex', 'Corrida', 'Adulto', 10, 777.77, TRUE, ARRAY['Preto','Rosa']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis Adidas Duramo SL', 'Adidas Duramo SL: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 349.99, 20, 'Calçados', 'Adidas', 'Masculino', 'Corrida', 'Adulto', 10, 388.88, TRUE, ARRAY['Preto','Azul']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis Asics Gel-Nimbus 27', 'Asics Gel-Nimbus 27: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 1199.99, 12, 'Calçados', 'Asics', 'Masculino', 'Corrida', 'Adulto', 0, NULL, FALSE, ARRAY['Branco','Rosa']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis Asics Gel-Kayano 31', 'Asics Gel-Kayano 31: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 1099.99, 7, 'Calçados', 'Asics', 'Unissex', 'Corrida', 'Adulto', 25, 1466.65, TRUE, ARRAY['Cinza','Preto']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis Asics Novablast 5', 'Asics Novablast 5: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 899.99, 29, 'Calçados', 'Asics', 'Masculino', 'Corrida', 'Adulto', 20, 1124.99, TRUE, ARRAY['Branco','Laranja']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis Mizuno Wave Rider 28', 'Mizuno Wave Rider 28: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 899.99, 35, 'Calçados', 'Mizuno', 'Unissex', 'Corrida', 'Adulto', 25, 1199.99, TRUE, ARRAY['Branco','Azul']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis Mizuno Wave Prophecy 13', 'Mizuno Wave Prophecy 13: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 1499.99, 32, 'Calçados', 'Mizuno', 'Unissex', 'Corrida', 'Adulto', 25, 1999.99, TRUE, ARRAY['Cinza','Branco']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis Olympikus Corre 4', 'Olympikus Corre 4: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 499.99, 29, 'Calçados', 'Olympikus', 'Unissex', 'Corrida', 'Adulto', 10, 555.54, TRUE, ARRAY['Laranja','Branco']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis Olympikus Veloz 2', 'Olympikus Veloz 2: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 299.99, 17, 'Calçados', 'Olympikus', 'Unissex', 'Corrida', 'Adulto', 20, 374.99, TRUE, ARRAY['Laranja','Azul']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis New Balance Fresh Foam 1080v14', 'New Balance Fresh Foam 1080v14: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 1199.99, 33, 'Calçados', 'New Balance', 'Unissex', 'Corrida', 'Adulto', 0, NULL, FALSE, ARRAY['Cinza','Preto']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis New Balance 520v9', 'New Balance 520v9: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 449.99, 12, 'Calçados', 'New Balance', 'Masculino', 'Corrida', 'Adulto', 25, 599.99, TRUE, ARRAY['Azul','Preto']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis Fila Racer Carbon 2', 'Fila Racer Carbon 2: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 1299.99, 22, 'Calçados', 'Fila', 'Masculino', 'Corrida', 'Adulto', 0, NULL, FALSE, ARRAY['Rosa','Branco']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis Puma Velocity Nitro 3', 'Puma Velocity Nitro 3: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 799.99, 7, 'Calçados', 'Puma', 'Unissex', 'Corrida', 'Adulto', 0, NULL, FALSE, ARRAY['Laranja','Preto']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis Under Armour Charged Pursuit 3', 'Under Armour Charged Pursuit 3: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 399.99, 7, 'Calçados', 'Under Armour', 'Masculino', 'Corrida', 'Adulto', 0, NULL, FALSE, ARRAY['Verde','Azul']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis Puma Deviate Nitro 3', 'Puma Deviate Nitro 3: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 1199.99, 21, 'Calçados', 'Puma', 'Masculino', 'Corrida', 'Adulto', 20, 1499.99, TRUE, ARRAY['Azul','Laranja']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Tênis Fila Float Elite', 'Fila Float Elite: amortecimento responsivo e cabedal respirável para treinos e provas de corrida.', 599.99, 11, 'Calçados', 'Fila', 'Unissex', 'Corrida', 'Adulto', 25, 799.99, TRUE, ARRAY['Branco','Laranja']::text[], ARRAY['34','35','36','37','38','39','40','41','42','43','44']::text[]),
('Shorts Nike Dri-FIT Challenger 7"', 'Shorts Nike Dri-FIT Challenger 7": tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 199.99, 46, 'Roupas', 'Nike', 'Masculino', 'Corrida', 'Adulto', 10, 222.21, TRUE, ARRAY['Cinza','Branco']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Shorts Adidas Own The Run', 'Shorts Adidas Own The Run: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 179.99, 61, 'Roupas', 'Adidas', 'Masculino', 'Corrida', 'Adulto', 0, NULL, FALSE, ARRAY['Cinza','Branco']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Shorts Puma Run Favorite Velocity', 'Shorts Puma Run Favorite Velocity: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 159.99, 16, 'Roupas', 'Puma', 'Feminino', 'Corrida', 'Adulto', 0, NULL, FALSE, ARRAY['Vinho','Cinza']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Bermuda Under Armour Tech Graphic', 'Bermuda Under Armour Tech Graphic: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 169.99, 37, 'Roupas', 'Under Armour', 'Masculino', 'Treino', 'Adulto', 30, 242.84, TRUE, ARRAY['Cinza','Verde']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Regata Nike Dri-FIT Miler', 'Regata Nike Dri-FIT Miler: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 159.99, 13, 'Roupas', 'Nike', 'Masculino', 'Corrida', 'Adulto', 30, 228.56, TRUE, ARRAY['Vinho','Verde']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Regata Adidas Train Essentials', 'Regata Adidas Train Essentials: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 129.99, 16, 'Roupas', 'Adidas', 'Masculino', 'Academia', 'Adulto', 30, 185.70, TRUE, ARRAY['Preto','Cinza']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Camiseta Asics Core Run', 'Camiseta Asics Core Run: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 149.99, 31, 'Roupas', 'Asics', 'Masculino', 'Corrida', 'Adulto', 0, NULL, FALSE, ARRAY['Verde','Preto']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Camiseta Under Armour Tech 2.0', 'Camiseta Under Armour Tech 2.0: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 139.99, 22, 'Roupas', 'Under Armour', 'Masculino', 'Treino', 'Adulto', 10, 155.54, TRUE, ARRAY['Branco','Rosa']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Camiseta Mizuno Run Spark', 'Camiseta Mizuno Run Spark: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 119.99, 18, 'Roupas', 'Mizuno', 'Unissex', 'Corrida', 'Adulto', 0, NULL, FALSE, ARRAY['Cinza','Branco']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Camiseta Olympikus Essential', 'Camiseta Olympikus Essential: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 79.99, 39, 'Roupas', 'Olympikus', 'Unissex', 'Treino', 'Adulto', 10, 88.88, TRUE, ARRAY['Branco','Preto']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Top Nike Swoosh Medium Support', 'Top Nike Swoosh Medium Support: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 219.99, 61, 'Roupas', 'Nike', 'Feminino', 'Fitness', 'Adulto', 0, NULL, FALSE, ARRAY['Verde','Rosa']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Top Adidas Powerimpact', 'Top Adidas Powerimpact: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 199.99, 13, 'Roupas', 'Adidas', 'Feminino', 'Fitness', 'Adulto', 0, NULL, FALSE, ARRAY['Vinho','Rosa']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Legging Nike One High-Waisted', 'Legging Nike One High-Waisted: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 299.99, 15, 'Roupas', 'Nike', 'Feminino', 'Fitness', 'Adulto', 0, NULL, FALSE, ARRAY['Verde','Branco']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Legging Adidas Optime 7/8', 'Legging Adidas Optime 7/8: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 279.99, 36, 'Roupas', 'Adidas', 'Feminino', 'Yoga', 'Adulto', 0, NULL, FALSE, ARRAY['Cinza','Verde']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Legging Lupo Sport Max', 'Legging Lupo Sport Max: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 159.99, 65, 'Roupas', 'Lupo', 'Feminino', 'Academia', 'Adulto', 0, NULL, FALSE, ARRAY['Cinza','Preto']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Jaqueta Corta-Vento Nike Windrunner', 'Jaqueta Corta-Vento Nike Windrunner: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 499.99, 34, 'Roupas', 'Nike', 'Masculino', 'Corrida', 'Adulto', 0, NULL, FALSE, ARRAY['Preto','Cinza']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Jaqueta Adidas Tiro 24 Treino', 'Jaqueta Adidas Tiro 24 Treino: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 399.99, 69, 'Roupas', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Verde','Cinza']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Agasalho Puma TeamRISE', 'Agasalho Puma TeamRISE: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 449.99, 37, 'Roupas', 'Puma', 'Unissex', 'Futebol', 'Adulto', 15, 529.40, TRUE, ARRAY['Vinho','Verde']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Calça Adidas Tiro 24', 'Calça Adidas Tiro 24: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 299.99, 52, 'Roupas', 'Adidas', 'Masculino', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Vinho','Cinza']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Calça Nike Club Fleece Jogger', 'Calça Nike Club Fleece Jogger: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 349.99, 22, 'Roupas', 'Nike', 'Unissex', 'Lifestyle', 'Adulto', 0, NULL, FALSE, ARRAY['Azul-marinho','Branco']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Moletom Reebok Identity Fleece', 'Moletom Reebok Identity Fleece: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 279.99, 47, 'Roupas', 'Reebok', 'Unissex', 'Lifestyle', 'Adulto', 0, NULL, FALSE, ARRAY['Vinho','Rosa']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Camiseta Reebok Workout Ready', 'Camiseta Reebok Workout Ready: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 129.99, 57, 'Roupas', 'Reebok', 'Masculino', 'Crossfit', 'Adulto', 0, NULL, FALSE, ARRAY['Azul-marinho','Preto']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Bermuda Fila Basic Sports', 'Bermuda Fila Basic Sports: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 99.99, 47, 'Roupas', 'Fila', 'Masculino', 'Treino', 'Adulto', 15, 117.64, TRUE, ARRAY['Cinza','Rosa']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Camiseta Penalty X Treino', 'Camiseta Penalty X Treino: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 89.99, 20, 'Roupas', 'Penalty', 'Unissex', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Preto','Rosa']::text[], ARRAY['PP','P','M','G','GG']::text[]),
('Kit Infantil Umbro Treino Camisa + Shorts', 'Kit Infantil Umbro Treino Camisa + Shorts: tecido tecnológico que afasta o suor, toque macio e liberdade de movimento.', 149.99, 64, 'Roupas', 'Umbro', 'Unissex', 'Futebol', 'Infantil', 15, 176.46, TRUE, ARRAY['Branco','Preto']::text[], ARRAY['4','6','8','10','12','14']::text[]),
('Bola de Futebol Campo Nike Premier League Flight', 'Bola de Futebol Campo Nike Premier League Flight: costura de alta durabilidade e trajetória estável, ideal para treinos e jogos.', 899.99, 14, 'Bolas', 'Nike', 'Unissex', 'Futebol', 'Adulto', 10, 999.99, TRUE, ARRAY['Branco','Multicolorido']::text[], ARRAY['Único']::text[]),
('Bola de Futebol Campo Adidas UCL League', 'Bola de Futebol Campo Adidas UCL League: costura de alta durabilidade e trajetória estável, ideal para treinos e jogos.', 349.99, 25, 'Bolas', 'Adidas', 'Unissex', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Branco','Multicolorido']::text[], ARRAY['Único']::text[]),
('Bola de Futebol Society Penalty Matis', 'Bola de Futebol Society Penalty Matis: costura de alta durabilidade e trajetória estável, ideal para treinos e jogos.', 149.99, 17, 'Bolas', 'Penalty', 'Unissex', 'Futebol', 'Adulto', 10, 166.66, TRUE, ARRAY['Branco','Multicolorido']::text[], ARRAY['Único']::text[]),
('Bola de Futsal Penalty Max 1000', 'Bola de Futsal Penalty Max 1000: costura de alta durabilidade e trajetória estável, ideal para treinos e jogos.', 229.99, 25, 'Bolas', 'Penalty', 'Unissex', 'Futsal', 'Adulto', 10, 255.54, TRUE, ARRAY['Branco','Multicolorido']::text[], ARRAY['Único']::text[]),
('Bola de Futsal Umbro Neo Liga', 'Bola de Futsal Umbro Neo Liga: costura de alta durabilidade e trajetória estável, ideal para treinos e jogos.', 179.99, 48, 'Bolas', 'Umbro', 'Unissex', 'Futsal', 'Adulto', 0, NULL, FALSE, ARRAY['Branco','Multicolorido']::text[], ARRAY['Único']::text[]),
('Bola de Basquete Spalding NBA Street', 'Bola de Basquete Spalding NBA Street: costura de alta durabilidade e trajetória estável, ideal para treinos e jogos.', 199.99, 49, 'Bolas', 'Spalding', 'Unissex', 'Basquete', 'Adulto', 0, NULL, FALSE, ARRAY['Branco','Multicolorido']::text[], ARRAY['Único']::text[]),
('Bola de Basquete Wilson NBA DRV Pro', 'Bola de Basquete Wilson NBA DRV Pro: costura de alta durabilidade e trajetória estável, ideal para treinos e jogos.', 249.99, 36, 'Bolas', 'Wilson', 'Unissex', 'Basquete', 'Adulto', 10, 277.77, TRUE, ARRAY['Branco','Multicolorido']::text[], ARRAY['Único']::text[]),
('Bola de Vôlei Mikasa V200W', 'Bola de Vôlei Mikasa V200W: costura de alta durabilidade e trajetória estável, ideal para treinos e jogos.', 599.99, 47, 'Bolas', 'Mikasa', 'Unissex', 'Vôlei', 'Adulto', 10, 666.66, TRUE, ARRAY['Branco','Multicolorido']::text[], ARRAY['Único']::text[]),
('Bola de Vôlei Penalty Pro 8.0', 'Bola de Vôlei Penalty Pro 8.0: costura de alta durabilidade e trajetória estável, ideal para treinos e jogos.', 219.99, 43, 'Bolas', 'Penalty', 'Unissex', 'Vôlei', 'Adulto', 0, NULL, FALSE, ARRAY['Branco','Multicolorido']::text[], ARRAY['Único']::text[]),
('Bola de Tênis Wilson US Open (tubo c/ 3)', 'Bola de Tênis Wilson US Open (tubo c/ 3): costura de alta durabilidade e trajetória estável, ideal para treinos e jogos.', 59.99, 26, 'Bolas', 'Wilson', 'Unissex', 'Tênis', 'Adulto', 0, NULL, FALSE, ARRAY['Branco','Multicolorido']::text[], ARRAY['Único']::text[]),
('Meião Nike Classic II', 'Meião Nike Classic II: acessório esportivo resistente e confortável para o dia a dia de treino.', 49.99, 55, 'Acessórios', 'Nike', 'Unissex', 'Futebol', 'Adulto', 20, 62.49, TRUE, ARRAY['Branco','Azul']::text[], ARRAY['P','M','G']::text[]),
('Meia Lupo Sport Cano Médio (kit 3)', 'Meia Lupo Sport Cano Médio (kit 3): acessório esportivo resistente e confortável para o dia a dia de treino.', 59.99, 31, 'Acessórios', 'Lupo', 'Unissex', 'Corrida', 'Adulto', 10, 66.66, TRUE, ARRAY['Azul','Grená']::text[], ARRAY['P','M','G']::text[]),
('Caneleira Adidas Tiro Club', 'Caneleira Adidas Tiro Club: acessório esportivo resistente e confortável para o dia a dia de treino.', 79.99, 24, 'Acessórios', 'Adidas', 'Unissex', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Preto','Grená']::text[], ARRAY['P','M','G']::text[]),
('Caneleira Nike Mercurial Lite', 'Caneleira Nike Mercurial Lite: acessório esportivo resistente e confortável para o dia a dia de treino.', 99.99, 24, 'Acessórios', 'Nike', 'Unissex', 'Futebol', 'Adulto', 10, 111.10, TRUE, ARRAY['Cinza','Branco']::text[], ARRAY['P','M','G']::text[]),
('Luva de Goleiro Puma Ultra Grip 3', 'Luva de Goleiro Puma Ultra Grip 3: acessório esportivo resistente e confortável para o dia a dia de treino.', 249.99, 31, 'Acessórios', 'Puma', 'Unissex', 'Futebol', 'Adulto', 0, NULL, FALSE, ARRAY['Azul','Preto']::text[], ARRAY['7','8','9','10']::text[]),
('Luva de Goleiro Adidas Predator Training', 'Luva de Goleiro Adidas Predator Training: acessório esportivo resistente e confortável para o dia a dia de treino.', 229.99, 62, 'Acessórios', 'Adidas', 'Unissex', 'Futebol', 'Adulto', 20, 287.49, TRUE, ARRAY['Azul','Branco']::text[], ARRAY['7','8','9','10']::text[]),
('Mochila Nike Brasilia 24L', 'Mochila Nike Brasilia 24L: acessório esportivo resistente e confortável para o dia a dia de treino.', 249.99, 84, 'Acessórios', 'Nike', 'Unissex', 'Treino', 'Adulto', 10, 277.77, TRUE, ARRAY['Azul','Preto']::text[], ARRAY['Único']::text[]),
('Mochila Adidas Power VII', 'Mochila Adidas Power VII: acessório esportivo resistente e confortável para o dia a dia de treino.', 229.99, 28, 'Acessórios', 'Adidas', 'Unissex', 'Treino', 'Adulto', 0, NULL, FALSE, ARRAY['Branco','Azul']::text[], ARRAY['Único']::text[]),
('Mochila Under Armour Hustle 5.0', 'Mochila Under Armour Hustle 5.0: acessório esportivo resistente e confortável para o dia a dia de treino.', 349.99, 28, 'Acessórios', 'Under Armour', 'Unissex', 'Treino', 'Adulto', 10, 388.88, TRUE, ARRAY['Cinza','Branco']::text[], ARRAY['Único']::text[]),
('Garrafa Térmica GRENÁ 750ml', 'Garrafa Térmica GRENÁ 750ml: acessório esportivo resistente e confortável para o dia a dia de treino.', 89.99, 51, 'Acessórios', 'GRENÁ', 'Unissex', 'Academia', 'Adulto', 10, 99.99, TRUE, ARRAY['Cinza','Branco']::text[], ARRAY['Único']::text[]),
('Boné Nike Dri-FIT Club', 'Boné Nike Dri-FIT Club: acessório esportivo resistente e confortável para o dia a dia de treino.', 149.99, 41, 'Acessórios', 'Nike', 'Unissex', 'Corrida', 'Adulto', 10, 166.66, TRUE, ARRAY['Azul','Grená']::text[], ARRAY['Único']::text[]),
('Viseira Oakley Sport', 'Viseira Oakley Sport: acessório esportivo resistente e confortável para o dia a dia de treino.', 129.99, 21, 'Acessórios', 'Oakley', 'Unissex', 'Corrida', 'Adulto', 10, 144.43, TRUE, ARRAY['Preto','Grená']::text[], ARRAY['Único']::text[]),
('Óculos Oakley Sutro Lite', 'Óculos Oakley Sutro Lite: acessório esportivo resistente e confortável para o dia a dia de treino.', 999.99, 20, 'Acessórios', 'Oakley', 'Unissex', 'Ciclismo', 'Adulto', 0, NULL, FALSE, ARRAY['Preto','Azul']::text[], ARRAY['Único']::text[]),
('Óculos de Natação Speedo Vanquisher 3.0', 'Óculos de Natação Speedo Vanquisher 3.0: acessório esportivo resistente e confortável para o dia a dia de treino.', 149.99, 48, 'Acessórios', 'Speedo', 'Unissex', 'Natação', 'Adulto', 20, 187.49, TRUE, ARRAY['Branco','Grená']::text[], ARRAY['Único']::text[]),
('Touca de Natação Speedo Silicone', 'Touca de Natação Speedo Silicone: acessório esportivo resistente e confortável para o dia a dia de treino.', 49.99, 86, 'Acessórios', 'Speedo', 'Unissex', 'Natação', 'Adulto', 0, NULL, FALSE, ARRAY['Preto','Cinza']::text[], ARRAY['Único']::text[]),
('Whey Protein Concentrado Growth 1kg', 'Whey Protein Concentrado Growth 1kg: suplemento de alta qualidade para potencializar seus resultados.', 149.99, 108, 'Suplementos', 'Growth Supplements', 'Unissex', 'Academia', 'Adulto', 0, NULL, FALSE, ARRAY[]::text[], ARRAY['Único']::text[]),
('Creatina Monohidratada Growth 250g', 'Creatina Monohidratada Growth 250g: suplemento de alta qualidade para potencializar seus resultados.', 89.99, 89, 'Suplementos', 'Growth Supplements', 'Unissex', 'Academia', 'Adulto', 0, NULL, FALSE, ARRAY[]::text[], ARRAY['Único']::text[]),
('Whey Protein 100% Pure Integralmédica 900g', 'Whey Protein 100% Pure Integralmédica 900g: suplemento de alta qualidade para potencializar seus resultados.', 169.99, 67, 'Suplementos', 'Integralmédica', 'Unissex', 'Academia', 'Adulto', 15, 199.99, TRUE, ARRAY[]::text[], ARRAY['Único']::text[]),
('Creatina Hardcore Integralmédica 300g', 'Creatina Hardcore Integralmédica 300g: suplemento de alta qualidade para potencializar seus resultados.', 119.99, 90, 'Suplementos', 'Integralmédica', 'Unissex', 'Academia', 'Adulto', 0, NULL, FALSE, ARRAY[]::text[], ARRAY['Único']::text[]),
('Whey 3W Max Titanium 900g', 'Whey 3W Max Titanium 900g: suplemento de alta qualidade para potencializar seus resultados.', 139.99, 75, 'Suplementos', 'Max Titanium', 'Unissex', 'Academia', 'Adulto', 0, NULL, FALSE, ARRAY[]::text[], ARRAY['Único']::text[]),
('Creatina Max Titanium 300g', 'Creatina Max Titanium 300g: suplemento de alta qualidade para potencializar seus resultados.', 109.99, 25, 'Suplementos', 'Max Titanium', 'Unissex', 'Academia', 'Adulto', 0, NULL, FALSE, ARRAY[]::text[], ARRAY['Único']::text[]),
('Pré-Treino Black Skull Bone Crusher 300g', 'Pré-Treino Black Skull Bone Crusher 300g: suplemento de alta qualidade para potencializar seus resultados.', 99.99, 66, 'Suplementos', 'Black Skull', 'Unissex', 'Academia', 'Adulto', 0, NULL, FALSE, ARRAY[]::text[], ARRAY['Único']::text[]),
('Whey Protein Black Skull 900g', 'Whey Protein Black Skull 900g: suplemento de alta qualidade para potencializar seus resultados.', 129.99, 65, 'Suplementos', 'Black Skull', 'Unissex', 'Academia', 'Adulto', 0, NULL, FALSE, ARRAY[]::text[], ARRAY['Único']::text[]),
('Whey Protein Isolado Probiótica 900g', 'Whey Protein Isolado Probiótica 900g: suplemento de alta qualidade para potencializar seus resultados.', 199.99, 107, 'Suplementos', 'Probiótica', 'Unissex', 'Academia', 'Adulto', 0, NULL, FALSE, ARRAY[]::text[], ARRAY['Único']::text[]),
('Barra de Proteína Probiótica Crisp (caixa 12)', 'Barra de Proteína Probiótica Crisp (caixa 12): suplemento de alta qualidade para potencializar seus resultados.', 89.99, 105, 'Suplementos', 'Probiótica', 'Unissex', 'Academia', 'Adulto', 0, NULL, FALSE, ARRAY[]::text[], ARRAY['Único']::text[]),
('BCAA 2400 Max Titanium 100 caps', 'BCAA 2400 Max Titanium 100 caps: suplemento de alta qualidade para potencializar seus resultados.', 59.99, 65, 'Suplementos', 'Max Titanium', 'Unissex', 'Academia', 'Adulto', 15, 70.58, TRUE, ARRAY[]::text[], ARRAY['Único']::text[]),
('Glutamina Integralmédica 300g', 'Glutamina Integralmédica 300g: suplemento de alta qualidade para potencializar seus resultados.', 99.99, 72, 'Suplementos', 'Integralmédica', 'Unissex', 'Academia', 'Adulto', 15, 117.64, TRUE, ARRAY[]::text[], ARRAY['Único']::text[]),
('Hipercalórico Growth 3kg', 'Hipercalórico Growth 3kg: suplemento de alta qualidade para potencializar seus resultados.', 159.99, 115, 'Suplementos', 'Growth Supplements', 'Unissex', 'Academia', 'Adulto', 0, NULL, FALSE, ARRAY[]::text[], ARRAY['Único']::text[]),
('Termogênico Black Skull Thermo Flame 60 caps', 'Termogênico Black Skull Thermo Flame 60 caps: suplemento de alta qualidade para potencializar seus resultados.', 69.99, 50, 'Suplementos', 'Black Skull', 'Unissex', 'Academia', 'Adulto', 0, NULL, FALSE, ARRAY[]::text[], ARRAY['Único']::text[]),
('Coqueteleira GRENÁ 600ml', 'Coqueteleira GRENÁ 600ml: suplemento de alta qualidade para potencializar seus resultados.', 39.99, 42, 'Suplementos', 'GRENÁ', 'Unissex', 'Academia', 'Adulto', 10, 44.43, TRUE, ARRAY[]::text[], ARRAY['Único']::text[]);

-- 3) Grava categorias e produtos nas tabelas da loja -----------------
--    O bloco descobre sozinho os nomes das tabelas/colunas do seu banco
--    (produto/produtos, categoria/categorias, colunas opcionais etc.).
DO $$
DECLARE
  t_prod text; t_cat text; cat_pk text; prod_fk text;
  cols text := ''; vals text := ''; tipo text; c text;
  antes int; depois int;
BEGIN
  SELECT table_name INTO t_prod FROM information_schema.tables
   WHERE table_schema = current_schema() AND table_name IN ('produto','produtos') ORDER BY table_name LIMIT 1;
  SELECT table_name INTO t_cat FROM information_schema.tables
   WHERE table_schema = current_schema() AND table_name IN ('categoria','categorias') ORDER BY table_name LIMIT 1;
  IF t_prod IS NULL OR t_cat IS NULL THEN
    RAISE EXCEPTION 'Não encontrei as tabelas de produto/categoria. Confira se o Query Tool está no banco da loja.';
  END IF;

  -- chave da categoria e coluna de categoria no produto
  SELECT column_name INTO cat_pk FROM information_schema.columns
   WHERE table_schema = current_schema() AND table_name = t_cat AND column_name IN ('id_categoria','idcategoria','id') ORDER BY column_name = 'id' LIMIT 1;
  SELECT column_name INTO prod_fk FROM information_schema.columns
   WHERE table_schema = current_schema() AND table_name = t_prod AND column_name IN ('id_categoria','idcategoria','categoria_id') LIMIT 1;

  -- 3a) categorias que faltam
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = t_cat AND column_name = 'cod_categoria' AND column_default IS NULL) THEN
    EXECUTE format('INSERT INTO %I (nome, cod_categoria) SELECT DISTINCT ON (lower(c.categoria)) c.categoria, ''CAT'' || upper(substr(md5(random()::text || c.categoria), 1, 6)) FROM tmp_catalogo_grena c WHERE NOT EXISTS (SELECT 1 FROM %I x WHERE lower(x.nome) = lower(c.categoria))', t_cat, t_cat);
  ELSE
    EXECUTE format('INSERT INTO %I (nome) SELECT DISTINCT c.categoria FROM tmp_catalogo_grena c WHERE NOT EXISTS (SELECT 1 FROM %I x WHERE lower(x.nome) = lower(c.categoria))', t_cat, t_cat);
  END IF;

  -- 3b) garante a coluna marca (texto) e o vínculo id_marca no produto
  EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS marca VARCHAR(80)', t_prod);
  EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS id_marca INTEGER REFERENCES marca(id_marca)', t_prod);

  -- 3c) monta o INSERT só com as colunas que existem no seu banco
  cols := 'nome, preco, estoque, ' || quote_ident(prod_fk) || ', marca, id_marca';
  vals := 'c.nome, c.preco, c.estoque, (SELECT x.' || quote_ident(cat_pk) || ' FROM ' || quote_ident(t_cat) || ' x WHERE lower(x.nome) = lower(c.categoria) LIMIT 1), c.marca, (SELECT m.id_marca FROM marca m WHERE m.nome = c.marca)';

  FOR c, tipo IN SELECT column_name, data_type FROM information_schema.columns
                  WHERE table_schema = current_schema() AND table_name = t_prod LOOP
    IF c = 'descricao' THEN cols := cols || ', descricao'; vals := vals || ', c.descricao';
    ELSIF c IN ('genero','esporte') THEN cols := cols || ', ' || c; vals := vals || ', c.' || c;
    ELSIF c IN ('faixa_etaria','faixaetaria') THEN cols := cols || ', ' || c; vals := vals || ', c.faixa_etaria';
    ELSIF c = 'modalidade' THEN cols := cols || ', modalidade'; vals := vals || ', c.esporte';
    ELSIF c = 'desconto' THEN cols := cols || ', desconto'; vals := vals || ', c.desconto';
    ELSIF c IN ('preco_anterior','precoanterior') THEN cols := cols || ', ' || c; vals := vals || ', c.preco_anterior';
    ELSIF c = 'promocao' AND tipo = 'boolean' THEN cols := cols || ', promocao'; vals := vals || ', c.promocao';
    ELSIF c IN ('cores','tamanhos') THEN
      cols := cols || ', ' || c;
      vals := vals || CASE
        WHEN tipo = 'ARRAY' THEN ', c.' || c
        WHEN tipo IN ('json','jsonb') THEN ', to_jsonb(c.' || c || ')::' || tipo
        ELSE ', array_to_string(c.' || c || ', '','')' END;
    ELSIF c = 'cod_produto' THEN
      IF (SELECT column_default FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = t_prod AND column_name = 'cod_produto') IS NULL THEN
        cols := cols || ', cod_produto'; vals := vals || ', ''PRD'' || upper(substr(md5(random()::text || c.nome), 1, 7))';
      END IF;
    END IF;
  END LOOP;

  EXECUTE format('SELECT count(*) FROM %I', t_prod) INTO antes;
  EXECUTE format('INSERT INTO %I (%s) SELECT %s FROM tmp_catalogo_grena c WHERE NOT EXISTS (SELECT 1 FROM %I p WHERE lower(p.nome) = lower(c.nome))',
                 t_prod, cols, vals, t_prod);
  EXECUTE format('SELECT count(*) FROM %I', t_prod) INTO depois;

  -- 3d) liga produtos antigos que já tenham marca escrita à tabela marca
  EXECUTE format('UPDATE %I p SET id_marca = m.id_marca FROM marca m WHERE p.id_marca IS NULL AND lower(p.marca) = lower(m.nome)', t_prod);

  RAISE NOTICE 'Pronto! % produtos novos cadastrados na tabela "%".', depois - antes, t_prod;
END $$;

-- 4) Conferência -------------------------------------------------------
--   (veja a aba "Messages" do pgAdmin: lá aparece quantos produtos entraram)
SELECT id_marca, nome FROM marca ORDER BY nome;