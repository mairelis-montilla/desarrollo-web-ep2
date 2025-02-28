import { useEffect } from "react"
import { useState } from "react"
import PageHeader from "../components/PageHeader"
import  {API_URL, agregarProvedor} from '../utils'

function Proveedores() {
    //Empleando algunos Hooks: usesState, useEffect

    const [listaProveedores, setListaProveedores] = useState([])
    const [listaProveedoresFiltrados, setListaProveedoresFiltrados] = useState([]);
    const [proveedor, setProveedor] = useState();
    const [filtro, setFiltro] = useState('');
    const [filasPaginas, setFilasPaginas] = useState(10);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [paginaActual, setPaginaActual] = useState(0);

    useEffect(() => {
        leerServicio()
    }, [])

    const buscarTexto = (text)=>{
        setFiltro(text)
        const listaFiltrada = listaProveedores.filter(e => 
            e.nombreempresa.toLowerCase().includes(text.toLowerCase()) 
            || e.nombrecontacto.toLowerCase().includes(text.toLowerCase()) 
            || e.cargocontacto.toLowerCase().includes(text.toLowerCase()) 
            || e.pais.toLowerCase().includes(text.toLowerCase())
            ||  e.ciudad.toLowerCase().includes(text.toLowerCase()));
        setListaProveedoresFiltrados(listaFiltrada)
       setTotalPaginas(Math.ceil(listaFiltrada.length / filasPaginas))
    }

    const leerServicio = async() => {
        try{
            const rutaServicio = API_URL + "proveedores.php"

           const response = await fetch(rutaServicio);

           const data = await response.json()

           setListaProveedores(data)
           setListaProveedoresFiltrados(data)
           setTotalPaginas(Math.ceil(data.length / filasPaginas))
        }
        catch{
            console.error('ups something went wrong')
        }
    }

    const retroceder = ()=>{
        if(paginaActual > 0)
        setPaginaActual(paginaActual-1)
    };

    const avanzar = ()=>{
        if(paginaActual < totalPaginas - 1)
            setPaginaActual(paginaActual+1)
    }

    const dibujarVistaRapidaModal = () => {
        return (
          <div
            className="modal fade"
            id="detalleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title fs-5" id="exampleModalLabel">Detalles Proveedor</h3>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md">
                      <table className="table">
                        <tbody>
                            <tr>
                                <th>Codigo</th>
                                <td>{proveedor?.idproveedor}</td>
                            </tr>
                          
                          <tr>
                            <th>Empresa</th>
                            <td>{proveedor?.nombreempresa}</td>
                          </tr>
                          <tr>
                            <th>Contacto</th>
                            <td>{proveedor?.nombrecontacto}</td>
                          </tr>
                          <tr>
                            <th>Cargo</th>
                            <td>{proveedor?.cargocontacto}</td>
                          </tr>
                          <tr>
                            <th>Ciudad</th>
                            <td>
                            <td>{proveedor?.ciudad}</td>
                            </td>
                          </tr>
                          <tr>
                            <th>Pais</th>
                            <td>
                            <td>{proveedor?.pais}</td>
                            </td>
                          </tr>
                          <tr>
                            <th>
                                Direccion
                            </th>
                            <td>
                            <td>{proveedor?.direccion}</td>
                            </td>
                          </tr>
                          <tr>
                            <th>
                                Region
                            </th>
                            <td>
                            <td>{proveedor?.region}</td>
                            </td>
                          </tr>
                          <tr>
                            <th>
                                Codigo Postal
                            </th>
                            <td>
                            <td>{proveedor?.codigopostal}</td>
                            </td>
                          </tr>
                          <tr>
                            <th>Telefono</th>
                            <td>
                            <td>{proveedor?.telefono}</td>
                            </td>
                          </tr>
                          <tr>
                            <th>
                                Fax
                            </th>
                            <td>{proveedor?.fax}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                 
              </div>
            </div>
          </div>
        );
      };

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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaProveedoresFiltrados.slice(paginaActual*filasPaginas, (paginaActual+1)*filasPaginas).map(item =>
                        <tr key={item.idproveedor}>
                            <td>{item.idproveedor}</td>
                            <td>{item.nombreempresa}</td>
                            <td>{item.nombrecontacto}</td>
                            <td>{item.cargocontacto}</td>
                            <td>{item.ciudad}</td>
                            <td>{item.pais}</td>
                            <td><button onClick={() => agregarProvedor(item)} className="btn btn-primary">Seleccionar</button></td>
                            <td> 
                            <i
                                    className="bi bi-eye icono-ojo"
                                    title="Ver Detalle"
                                    data-bs-toggle="modal"
                                    data-bs-target="#detalleModal"
                                    onClick={() => setProveedor(item)}
                                ></i>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    const dibujarNumeroPaginas = () => {
        return ( <>
        {[...Array(totalPaginas)].map((_,index) =>
        
           ( <li key={index} className={`page-item ${paginaActual === index && 'active'}`}>
                <a className="page-link" onClick={() => setPaginaActual(index)}>{index+1}</a>
            </li>)
    )}
        </>)
    }

    const dibujarPaginacion = ()=>{
        return listaProveedoresFiltrados.length > 0 && (<nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item"><a className="page-link" onClick={() => retroceder()} >Retroceder</a></li>
                {dibujarNumeroPaginas()}
                <li className="page-item"><a className="page-link" onClick={()=> avanzar()}>Avanzar</a></li>
            </ul>
        </nav>)
    }


    return (
        <>
            <PageHeader titulo="Proveedores"/>
            <section className="padded">
                <div className="container">
                    <div className="mt-3">
                        <input type="text" placeholder="Ingrese expresion a buscar" className="form-control mb-3" value={filtro} onChange={(event)=> buscarTexto(event.target.value)}></input>
                    </div>
                        
                    {dibujarPaginacion()}
                    {drawTable()}
                    {listaProveedoresFiltrados.length === 0 ?
                     <div className="alert alert-warning">No se encontraron registros</div>: 
                     listaProveedoresFiltrados.length + ' Registros encontrados'}
                </div>
            </section>
            {dibujarVistaRapidaModal()}
        </>
    )
}

export default Proveedores