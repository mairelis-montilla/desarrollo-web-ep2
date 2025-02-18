import './Directores.css'
import { useEffect } from "react"
import { useState } from "react"
import PageHeader from "../components/PageHeader"
import  {API_URL} from '../utils'

function Directores() {
    //Empleando algunos Hooks: usesState, useEffect

    const [listaDirectores, setListaDirectores] = useState([])

    useEffect(() => {
        leerServicio()
    }, [])

    /*
        function leerServicio(){
        }
    */
    const leerServicio = () => {
        const rutaServicio = API_URL + "directores.php"
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaDirectores(data)//Se actualiza el estado de la variable directores
            })
    }

    const drawTable = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Director</th>
                        <th>Peliculas</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaDirectores.map(item =>
                        <tr key={item.iddirector}>
                            <td>{item.iddirector}</td>
                            <td>{item.nombres}</td>
                            <td>{item.peliculas}</td>
                            <td><i className="bi bi-pencil" title="Editar"></i></td>
                            <td><i className="bi bi-x-lg" title="Eliminar"></i></td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    return (
        <>
            <PageHeader titulo="Directores"/>
            <section className="padded" id="directores">
                <div className="container">
                  <button className="btn btn-primary">Nuevo Director</button>
                    {drawTable()}
                </div>
            </section>
        </>
    )
}

export default Directores