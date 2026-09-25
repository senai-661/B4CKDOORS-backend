-- src/config/schema.sql

CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    cod_produto VARCHAR(20) UNIQUE,
    nome VARCHAR(150) NOT NULL,
    preco NUMERIC(10,2) NOT NULL CHECK (preco > 0),
    estoque INTEGER NOT NULL DEFAULT 0 CHECK (estoque >= 0),
    criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vendas (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL REFERENCES clientes(id),
    produto_id INTEGER NOT NULL REFERENCES produtos(id),
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    subtotal NUMERIC(10,2) NOT NULL,
    desconto NUMERIC(10,2) NOT NULL DEFAULT 0,
    total NUMERIC(10,2) NOT NULL,
    data_venda TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE SEQUENCE IF NOT EXISTS produtos_cod_seq START 1;

CREATE OR REPLACE FUNCTION fn_gerar_cod_produto()
RETURNS TRIGGER AS $$
BEGIN
    NEW.cod_produto := 'PRD-' || EXTRACT(YEAR FROM NOW())::TEXT || '-' ||
                        LPAD(NEXTVAL('produtos_cod_seq')::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_gerar_cod_produto ON produtos;
CREATE TRIGGER trg_gerar_cod_produto
    BEFORE INSERT ON produtos
    FOR EACH ROW
    EXECUTE FUNCTION fn_gerar_cod_produto();

CREATE OR REPLACE VIEW vw_vendas_detalhadas AS
SELECT
    v.id,
    c.id AS cliente_id,
    c.nome AS cliente_nome,
    p.id AS produto_id,
    p.nome AS produto_nome,
    p.cod_produto,
    v.quantidade,
    v.subtotal,
    v.desconto,
    v.total,
    v.data_venda
FROM vendas v
JOIN clientes c ON c.id = v.cliente_id
JOIN produtos p ON p.id = v.produto_id
ORDER BY v.data_venda DESC;

CREATE OR REPLACE PROCEDURE sp_registrar_venda(
    p_cliente_id INTEGER,
    p_produto_id INTEGER,
    p_quantidade INTEGER
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_preco NUMERIC(10,2);
    v_estoque INTEGER;
    v_subtotal NUMERIC(10,2);
    v_desconto NUMERIC(10,2);
    v_total NUMERIC(10,2);
BEGIN
    SELECT preco, estoque INTO v_preco, v_estoque
    FROM produtos
    WHERE id = p_produto_id
    FOR UPDATE;

    IF v_preco IS NULL THEN
        RAISE EXCEPTION 'PRODUTO_NAO_ENCONTRADO';
    END IF;

    IF v_estoque < p_quantidade THEN
        RAISE EXCEPTION 'ESTOQUE_INSUFICIENTE';
    END IF;

    v_subtotal := v_preco * p_quantidade;

    IF v_subtotal >= 200.00 THEN
        v_desconto := v_subtotal * 0.10;
    ELSE
        v_desconto := 0;
    END IF;

    v_total := v_subtotal - v_desconto;

    INSERT INTO vendas (cliente_id, produto_id, quantidade, subtotal, desconto, total)
    VALUES (p_cliente_id, p_produto_id, p_quantidade, v_subtotal, v_desconto, v_total);

    UPDATE produtos
    SET estoque = estoque - p_quantidade
    WHERE id = p_produto_id;
END;
$$;
