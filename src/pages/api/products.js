// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteProductById, findAllProducts, findOneProduct, createProduct, updateProduct } from "@/model/products"

export default async function handler(req, res) {
    const { id } = req.query;
    const body  = req.body;
    if (req.method === 'GET'){
        if (id){
            try{
                const result = await findOneProduct(id);
                res.status(200).json(result)
            } catch (error) {
                res.status(500).json({error: error.toString(), message: 'Internal Server Error'})
            }
        } else {
            try{
                const result = await findAllProducts();
                res.status(200).json(result)
            } catch (error) {
                res.status(500).json({error: error.toString(), message: 'Internal Server Error'})
            }
        }
    }else if (req.method === 'DELETE') {
        try{
            const result = await deleteProductById(id);
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({error: error.toString(), message: 'Internal Server Error'})
        }
    } else if (req.method === 'POST'){
        try{
            const result = await createProduct(body);
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({error: error.toString(), message: 'Internal Server Error'})
        }
    } else if (req.method === 'PATCH'){
        try{
            body.id = id;
            console.log("BODY UPDATE "+ body)
            const result = updateProduct(body)
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({error: error.toString(), message: 'Internal Server Error'}) 
        }
    }
  }
  