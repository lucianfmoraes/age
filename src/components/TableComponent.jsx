import ButtonRed from "@/components/ButtonRed";
import ButtonYellow from "@/components/ButtonYellow";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export const TableComponent = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true)
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
    if (!data) return <p>No profile data</p>
    
    return (
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
                                <ButtonYellow callback={handleEdit} />
                                <ButtonRed callback={() => handleDelete(row.id, router)} />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

    )
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

const handleEdit = e => {
    return alert(e)
}

export default TableComponent;