// src/model/Categoria.ts
import { DatabaseModel } from "./DatabaseModel.js";
import type { CategoriaDTO } from "../interface/CategoriaDTO.js";

const database = new DatabaseModel().pool;

const paraDTO = (row: { id_categoria: number; nome: string }): CategoriaDTO => ({
    idCategoria: row.id_categoria,
    nome: row.nome,
});

export class Categoria {
    static async listarCategorias(): Promise<CategoriaDTO[]> {
        const r = await database.query(`SELECT id_categoria, nome FROM categorias ORDER BY nome ASC`);
        return r.rows.map(paraDTO);
    }

    static async buscarCategoria(id: number): Promise<CategoriaDTO | null> {
        const r = await database.query(`SELECT id_categoria, nome FROM categorias WHERE id_categoria = $1`, [id]);
        return r.rows[0] ? paraDTO(r.rows[0]) : null;
    }

    static async cadastrarCategoria(nome: string): Promise<CategoriaDTO> {
        const r = await database.query(`INSERT INTO categorias (nome) VALUES ($1) RETURNING id_categoria, nome`, [nome]);
        return paraDTO(r.rows[0]);
    }

    static async atualizarCategoria(id: number, nome: string): Promise<CategoriaDTO | null> {
        const r = await database.query(
            `UPDATE categorias SET nome = $1 WHERE id_categoria = $2 RETURNING id_categoria, nome`,
            [nome, id]
        );
        return r.rows[0] ? paraDTO(r.rows[0]) : null;
    }

    static async removerCategoria(id: number): Promise<boolean> {
        const r = await database.query(`DELETE FROM categorias WHERE id_categoria = $1 RETURNING id_categoria`, [id]);
        return r.rows.length > 0;
    }
}

export default Categoria;
