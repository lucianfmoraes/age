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

export const createProduct = async (product) => {
    console.log("MODEL product: " + Object.keys(product) )
    product.price = parseFloat(product.price);
    product.quantity = parseInt(product.quantity)
    const result = await conn.query("INSERT INTO products ( name, price, quantity ) VALUES ( $1, $2, $3)",
        [product.name, product.price, product.quantity]
    )
}

export const updateProduct = async (product) => {
    console.log("MODEL product: " + Object.keys(product) )
    
    if(!product.id) {throw "Faltando dados ou dados inválidos"}
    product.price = parseFloat(product.price);
    product.quantity = parseInt(product.quantity)
    
    const result = await conn.query("UPDATE products SET name=$1, price=$2, quantity=$3 WHERE id=$4",
        [product.name, product.price, product.quantity, product.id]
    )
}