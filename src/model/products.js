import conn from "@/config/db";

export const findAllProducts = async () => {
    const result = await conn.query("SELECT * FROM products;");
    return result.rows
}

export const findOneProduct = async (id) => {
    const result = await conn.query("SELECT * FROM products WHERE id = $1 ;", [id]);
    return result.rows
}

export const deleteProductById = async (id) => {
    const result = await conn.query("DELETE FROM products WHERE id = $1 ;", [id]);
    return result.rows
}