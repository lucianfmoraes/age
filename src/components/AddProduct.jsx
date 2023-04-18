import { useState } from "react";
import { Button } from "react-bootstrap";

const AddProduct = () => {
    const [nameF, setName] = useState('');
    const [priceF, setPrice] = useState('');
    const [quantityF, setQuantity] = useState('');
    
    return(
        <>
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" onChange={(e)=>{setName(e.target.value)}} />
            <br></br>
            <label for="price">Preço:</label>
            <input type="text" id="price" name="price" onChange={(e)=>{setPrice(e.target.value)}} />
            <br></br> 
            <label for="quantity">Quantidade:</label>
            <input type="text" id="quantity" name="quantity" onChange={(e)=>{setQuantity(e.target.value)}} />

            <Button type="button" onClick={() => handleClick(nameF, quantityF, priceF)}>Enviar</Button>
        </>
    )

}

const handleClick = async (nameF, priceF, quantityF) => {
    const formData = {name: nameF, price: priceF, quantity: quantityF }
    console.log(formData)
    const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

}

export default AddProduct;