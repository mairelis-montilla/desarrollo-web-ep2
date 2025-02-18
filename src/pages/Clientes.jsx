import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { API_URL } from '../utils'
function Clientes() {

  const [listaClientes, setListaClientes] = useState([]);
      
  const leerServicio = () => {
      const rutaServicio = API_URL+"servicioclientes.php";
      fetch(rutaServicio)
      .then(response => response.json())
      .then(data => {
              console.log(data);
              setListaClientes(data);
      })
      .catch(error => console.error("Error al obtener clientes:", error));
  }
  
  const drawTable = () => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Nombres</th>
                    <th>Usuario</th>
                    <th>Empresa</th>
                    <th>Telefono</th>
                    <th>Cargo</th>
                    <th>Ciudad</th>
                    <th>País</th>
                </tr>
            </thead>
            <tbody>
                {listaClientes.length > 0 && (
                listaClientes.map((item)=>(
                    <tr key={item?.idcliente}>
                    <td>{item.idcliente}</td>
                    <td>{item.nombres}</td>
                    <td>{item.usuario}</td>
                    <td>{item.empresa}</td>
                    <td>{item.telefono}</td>
                    <td>{item.cargo}</td>
                    <td>{item.ciudad}</td>
                    <td>{item.pais}</td>
                </tr>
                ))
                
                )}
            </tbody>
        </table>
    )
}

  useEffect(() => {
      leerServicio();
  }, [])

  return (
    <>
    <PageHeader title="Clientes" />
    <section className="padded">
        <div className="container">
        {drawTable()}
        </div>
    </section>

    </>
  )
}

export default Clientes