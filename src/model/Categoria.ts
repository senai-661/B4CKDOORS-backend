// src/model/Categoria.ts
import { DatabaseModel } from "./DatabaseModel.js";
import type { CategoriaDTO } from "../interface/CategoriaDTO.js";

const database = new DatabaseModel().pool;

export class Categoria {

    static async listarCategorias(): Promise<CategoriaDTO[] | null> {
        try {
            const resposta = await database.query(
                `SELECT id_categoria, nome FROM categorias ORDER BY nome ASC`
            );
            return resposta.rows.map((row) => ({ idCategoria: row.id_categoria, nome: row.nome }));
        } catch (error) {
            console.error("[Categoria] Erro ao listar:", error);
            return null;
        }
    }

    static async buscarCategoria(id: number): Promise<CategoriaDTO | null> {
        try {
            const resposta = await database.query(
                `SELECT id_categoria, nome FROM categorias WHERE id_categoria = $1`, [id]
            );
            if (resposta.rows.length === 0) return null;
            return { idCategoria: resposta.rows[0].id_categoria, nome: resposta.rows[0].nome };
        } catch (error) {
            console.error("[Categoria] Erro ao buscar:", error);
            return null;
        }
    }

    static async cadastrarCategoria(categoria: CategoriaDTO): Promise<boolean> {
        try {
            const resposta = await database.query(
                `INSERT INTO categorias (nome) VALUES ($1) RETURNING id_categoria`, [categoria.nome]
            );
            return resposta.rows.length > 0;
        } catch (error) {
            console.error("[Categoria] Erro ao cadastrar:", error);
            return false;
        }
    }

    static async atualizarCategoria(id: number, categoria: CategoriaDTO): Promise<boolean> {
        try {
            const resposta = await database.query(
                `UPDATE categorias SET nome = $1 WHERE id_categoria = $2 RETURNING id_categoria`,
                [categoria.nome, id]
            );
            return resposta.rows.length > 0;
        } catch (error) {
            console.error("[Categoria] Erro ao atualizar:", error);
            return false;
        }
    }

    static async removerCategoria(id: number): Promise<boolean> {
        try {
            const resposta = await database.query(
                `DELETE FROM categorias WHERE id_categoria = $1 RETURNING id_categoria`, [id]
            );
            return resposta.rows.length > 0;
        } catch (error) {
            console.error("[Categoria] Erro ao remover:", error);
            return false;
        }
    }
}

export default Categoria;