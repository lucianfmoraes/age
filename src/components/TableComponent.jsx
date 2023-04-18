import ButtonRed from "@/components/ButtonRed";
import ButtonYellow from "@/components/ButtonYellow";
import EditProduct from "@/components/EditProduct"
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Modal, Button } from "react-bootstrap";

export const TableComponent = () => {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [isLoading, setLoading] = useState(true)
    const [editData, setEditData] = useState({});

    const router = useRouter();
    
    useEffect(() => {
        setLoading(true)
        fetch('/api/products')
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            setLoading(false)
          })
      }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data || data == [] || data.map == undefined) return <p>No profile data</p>
    
    return (
        <>
        <table className="table table-striped table-hover">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NOME</th>
                    <th scope="col">PREÇO</th>
                    <th scope="col">QUANTIDADE</th>
                    <th scope="col">AÇÃO</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((row, key) => (
                        <tr key={key} scope="row">
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.price}</td>
                            <td>{row.quantity}</td>
                            <td>
                                <ButtonYellow callback={() => handleEdit(setShow, row, setEditData)} />
                                <ButtonRed callback={() => handleDelete(row.id, router)} />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <CustomModal 
            show={show} 
            setShow={setShow} 
            title={"Editar produto"} 
            body={"Deseja realmente editar esse produto ?"} 
            editData={editData}
        />
        </>
    )
}

const handleEdit = (setShow, editData, setEditData) => {
    setShow(true);
    setEditData(editData);
    console.log(editData);
}

const handleDelete = async (id, router) => {
    let response = await fetch(`/api/products?id=${id}`, { method:'DELETE' })
    if (response.ok) {
        alert(`Produto id:${id} deletado com sucesso`)
        router.reload()
      } else {
        alert(`Erro ao tentar deletar produto id:${id} `)
        console.error(response)
      }
  
}

const CustomModal = ({ show, setShow, title, editData }) => {
    const handleClose = () => setShow(false);
    console.log(editData)
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{`${title} de id: ${editData.id}`} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditProduct 
                    productId={editData.id}
                    nomeInitial={editData.nome}
                    preçoInitial={editData.preçoInitial}
                    quantidadeInitial={editData.quantidadeInitial}
                    setShow={setShow}
                />
            </Modal.Body>
        </Modal>
    );
}

export default TableComponent;