import './Tienda.css'
import PageHeader from "../components/PageHeader"
import { useEffect } from "react"
import { useState } from "react"
import Productos from "../components/Productos"
import { API_URL } from '../utils'

function Tienda() {

    const [listaCategorias, setListaCategorias] = useState([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([])

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const rutaServicio = API_URL + "categorias.php"
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaCategorias(data)
                setCategoriaSeleccionada(data[0])
            })
    }

    const drawList = () => {
        return (
            <ul className="list-group" id="lista-categorias">
                {listaCategorias.map(item =>
                    <li key={item.idcategoria} 
                        className={"list-group-item" + 
                            (item.idcategoria === categoriaSeleccionada.idcategoria
                            ? " active"
                            : "")} title={item.descripcion}
                        onClick={() => selectCategory(item)}>
                        {item.nombre}

                        <span className="position-absolute translate-middle badge rounded-pill bg-danger">
                            {item.total}
                        </span>    
                    </li>
                )}
            </ul>
        )
    }

    const selectCategory = (item) => {
        console.log(item)
        setCategoriaSeleccionada(item)
    }

    return (
        <>
            <PageHeader titulo="Tienda" />
            <section className="padded">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-2 col-lg-3 col-md-4">
                            <h3>Categorías</h3>
                            {drawList()}
                        </div>
                        <div className="col-xxl-10 col-lg-9 col-md-8">
                            <h3>{categoriaSeleccionada.nombre}</h3>
                            <Productos codigoCategoria={categoriaSeleccionada.idcategoria}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Tienda