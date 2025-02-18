import { useEffect } from "react"
import { useState } from "react"
import PageHeader from "../components/PageHeader"
import  {API_URL, agregarProvedor} from '../utils'

function Proveedores() {
    //Empleando algunos Hooks: usesState, useEffect

    const [listaProveedores, setListaProveedores] = useState([])

    useEffect(() => {
        leerServicio()
    }, [])

    /*
        function leerServicio(){
        }
    */
    const leerServicio = () => {
        const rutaServicio = API_URL + "proveedores.php"
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaProveedores(data)//Se actualiza el estado de la variable proveedores
            })
    }

    const drawTable = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Empresa</th>
                        <th>Contacto</th>
                        <th>Cargo</th>
                        <th>Ciudad</th>
                        <th>País</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaProveedores.map(item =>
                        <tr key={item.idproveedor}>
                            <td>{item.idproveedor}</td>
                            <td>{item.nombreempresa}</td>
                            <td>{item.nombrecontacto}</td>
                            <td>{item.cargocontacto}</td>
                            <td>{item.ciudad}</td>
                            <td>{item.pais}</td>
                            <td><button onClick={() => agregarProvedor(item)} className="btn btn-primary">Seleccionar</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    return (
        <>
            <PageHeader titulo="Proveedores"/>
            <section className="padded">
                <div className="container">
                    {drawTable()}
                </div>
            </section>
        </>
    )
}

export default Proveedores