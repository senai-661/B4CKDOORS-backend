-- ============================================================
--  GRENA-API  |  init.sql  (CORRIGIDO)
-- ============================================================

DROP TABLE IF EXISTS carrinho      CASCADE;
DROP TABLE IF EXISTS favoritos     CASCADE;
DROP TABLE IF EXISTS itens_pedido  CASCADE;
DROP TABLE IF EXISTS pedidos       CASCADE;
DROP TABLE IF EXISTS cupons        CASCADE;
DROP TABLE IF EXISTS produtos      CASCADE;
DROP TABLE IF EXISTS categorias    CASCADE;
DROP TABLE IF EXISTS usuarios      CASCADE;

DROP SEQUENCE IF EXISTS seq_cod_produto;
DROP SEQUENCE IF EXISTS seq_cod_pedido;
DROP FUNCTION IF EXISTS gerar_cod_produto() CASCADE;
DROP FUNCTION IF EXISTS gerar_cod_pedido()  CASCADE;

CREATE SEQUENCE seq_cod_produto START 1;
CREATE SEQUENCE seq_cod_pedido  START 1;

CREATE TABLE usuarios (
    id_usuario  SERIAL          PRIMARY KEY,
    nome        VARCHAR(100)    NOT NULL,
    email       VARCHAR(150)    UNIQUE NOT NULL,
    cpf         VARCHAR(14)     UNIQUE NOT NULL,
    senha       VARCHAR(255)    NOT NULL,
    role        VARCHAR(20)     NOT NULL DEFAULT 'cliente' CHECK (role IN ('cliente', 'admin')),
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
    id_pedido       INTEGER       REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
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

-- TRIGGERS
CREATE OR REPLACE FUNCTION gerar_cod_produto()
RETURNS TRIGGER AS $$
BEGIN
    NEW.cod_produto := 'PRD' || LPAD(nextval('seq_cod_produto')::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_cod_produto
    BEFORE INSERT ON produtos
    FOR EACH ROW EXECUTE FUNCTION gerar_cod_produto();

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
    FOR EACH ROW EXECUTE FUNCTION gerar_cod_pedido();

-- USUARIOS (admin123 / cliente123)
INSERT INTO usuarios (nome, email, cpf, senha, role) VALUES
('Administrador GRENÁ', 'admin@grena.com',            '000.111.222-33', '$2b$10$FVpQhhrzJQ3DT2rWB2yQ2O6E1H3Gd3PWO/RvOfzJw7YOTIxnIM4nq', 'admin'),
('João Silva',          'joao.silva@email.com',        '111.111.111-11', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente'),
('Maria Oliveira',      'maria.oliveira@email.com',    '222.222.222-22', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente'),
('Pedro Santos',        'pedro.santos@email.com',      '333.333.333-33', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente'),
('Lucas Almeida',       'lucas.almeida@email.com',     '444.444.444-44', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente'),
('Ana Costa',           'ana.costa@email.com',          '555.555.555-55', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente'),
('Fernanda Lima',       'fernanda.lima@email.com',     '666.666.666-66', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente'),
('Rafael Souza',        'rafael.souza@email.com',      '777.777.777-77', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente'),
('Camila Rocha',        'camila.rocha@email.com',      '888.888.888-88', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente'),
('Bruno Martins',       'bruno.martins@email.com',     '999.999.999-99', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente'),
('Juliana Ferreira',    'juliana.ferreira@email.com',  '000.000.000-00', '$2b$10$LKUQmgXOMH0fv.gBAUe4BOGSon9XfcEa6Ay9HEgmN8xlIPrSVZyKm', 'cliente');

-- CATEGORIAS (9 categorias — CORRIGIDO: adicionada Acessórios para suportar id_categoria=9)
INSERT INTO categorias (nome) VALUES
('Futebol'),
('Basquete'),
('Masculino'),
('Mulheres'),
('Crianças'),
('Calçados'),
('Suplementos'),
('Promoções'),
('Acessórios');

-- PRODUTOS (id_categoria=9 agora existe)
INSERT INTO produtos (nome, descricao, preco, estoque, id_categoria) VALUES
('Camisa São Paulo 24/25',   'Camisa oficial temporada 24/25',        199.90,  50, 1),
('Camisa Palmeiras 96/97',   'Modelo retrô temporada 96/97',          219.90,  30, 1),
('Camisa Corinthians 19/20', 'Camisa oficial 19/20',                  189.90,  40, 1),
('Regata Lakers 23/24',      'Regata oficial NBA',                    499.90,  20, 2),
('Regata Boston Celtics',    'Modelo clássico Celtics',               479.90,  25, 2),
('Tênis Nike Air Run',       'Tênis ideal para corrida longa',        399.90,  35, 7),
('Tênis Puma Carina',        'Modelo feminino casual',                349.90,  45, 7),
('Blusão Puma Squad',        'Moletom feminino com capuz',            279.90,  15, 5),
('Conjunto Infantil Inter',  'Conjunto infantil completo do Inter',   149.90,  60, 6),
('Kit Meias Puma x3',        'Kit com 3 pares de meias esportivas',    79.90, 100, 8),
('Shorts Adidas Run',        'Short masculino para corrida',          129.90,  55, 3),
('Coqueteleira 700ml',       'Coqueteleira com misturador interno',    59.90,  80, 9);

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
