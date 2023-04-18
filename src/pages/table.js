import ButtonRed from "@/components/ButtonRed";
import ButtonYellow from "@/components/ButtonYellow";
import AddProductModal from "@/components/AddProductModal";
import AddProduct from '@/components/AddProduct';
import { useEffect, useState } from "react";
import TableComponent from "@/components/TableComponent";
import { Button,Modal } from "react-bootstrap";

export const Table = () => {
    const [show, setShow] = useState(false);
    const handleShow = () =>  {
        setShow(true);
    }
    return (
        <>
            <TableComponent></TableComponent>
            <Button onClick={handleShow}>New</Button>
            <CustomModal 
                show={show}
                setShow={setShow}
                title={"Criar Produto"}
            />
        </>
    )
}

const CustomModal = ({ show, setShow, title, editData }) => {
    const handleClose = () => setShow(false);
    console.log(editData)
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddProduct />
            </Modal.Body>
        </Modal>
    );
}
export default Table;