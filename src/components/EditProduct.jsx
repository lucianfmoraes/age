import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const EditProduct = ({productId, name, price, quantity, setShow}) => {
    const [nameF, setName] = useState('');
    const [priceF, setPrice] = useState('');
    const [quantityF, setQuantity] = useState('');
    
    return(
        <>
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e)=>{setName(e.target.value)}} />
            <br></br>
            <label for="price">Preço:</label>
            <input type="text" id="price" name="price" value={price} onChange={(e)=>{setPrice(e.target.value)}} />
            <br></br> 
            <label for="quantity">Quantidade:</label>
            <input type="text" id="quantity" name="quantity" value={quantity} onChange={(e)=>{setQuantity(e.target.value)}} />
            <br></br>
            <Button type="button" onClick={() => handleClick(productId, nameF, quantityF, priceF, setShow)}>Editar</Button>
        </>
    )

}

const handleClick = async (productId, nameF, priceF, quantityF, setShow) => {
    const formData = {name: nameF, price: priceF, quantity: quantityF }
    console.log("PATCH BODY: + id req :" + formData +" "+ productId)
    const response = await fetch(`/api/products?id=${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      setShow(false)
}

export default EditProduct;