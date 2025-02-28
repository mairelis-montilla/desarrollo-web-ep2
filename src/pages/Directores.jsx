import './Directores.css'
import { useEffect } from "react"
import { useState } from "react"
import PageHeader from "../components/PageHeader"
import  {API_URL} from '../utils'

function Directores() {
    //Empleando algunos Hooks: usesState, useEffect

    const [listaDirectores, setListaDirectores] = useState([]);
    const [directorSeleccionado, setDirectorSeleccionado] = useState();
    const  [nombres, setNombres] = useState('');
    const [peliculas, setPeliculas] = useState('');
    

    useEffect(() => {
        leerServicio()
    }, [])

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
                            <td>
                                <i className="bi bi-pencil" title="Editar" 
                                    data-bs-toggle="offcanvas" 
                                    data-bs-target="#offcanvasUpdate" onClick={()=>{setDirectorSeleccionado(item)}}>
                                </i>
                            </td>
                            <td>
                                <i className="bi bi-x-lg" title="Eliminar"  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{setDirectorSeleccionado(item)}}></i>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
    const onSubmit= (event)=>{
        event.preventDefault();
        const rutaServicio = API_URL+"directoresinsert.php"

        const formData = new FormData();
        formData.append('nombres', nombres);
        formData.append('peliculas', peliculas)
        fetch(rutaServicio, {method: 'POST', body: formData})
            .then(response => response.text())
            .then(() =>{
                leerServicio();
                setNombres('');
                setPeliculas('');
                document.querySelector("#offcanvasInsert .btn-close").click();
            })
    };
    
    const onUpdate= (event)=>{
            event.preventDefault();
            const rutaServicio = API_URL+"directoresupdate.php"

            const formData = new FormData();
            formData.append('nombres', directorSeleccionado.nombres);
            formData.append('peliculas', directorSeleccionado.peliculas)
            formData.append('iddirector', directorSeleccionado.iddirector)
            fetch(rutaServicio, {method: 'POST', body: formData})
                .then(response => response.text())
                .then(() =>{
                    leerServicio();
                    setDirectorSeleccionado(null);
                    document.querySelector("#offcanvasUpdate .btn-close").click();
                })
        };

    const eliminarDirector = ()=>{
        const rutaServicio = API_URL+"directoresdelete.php"

        const formData = new FormData();
        formData.append('iddirector', directorSeleccionado.iddirector);
        fetch(rutaServicio, {method: 'POST', body: formData})
            .then(response => response.text())
            .then(data=>{
                console.log(data)
                leerServicio();
                setDirectorSeleccionado(null);
                document.querySelector("#closeModal").click();
            })
    };

    const drawInsertOffCanvas = () => {
        return (<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasInsert" aria-labelledby="offcanvasRigthLabel">
            <div className="offcanvas-header">
                <h5 id="offcanvasRigthLabel">Nuevo Director</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <form onSubmit={(event)=> onSubmit(event)}>
                    <div className='mb-3'>
                        <input type="text" className='form-control' value={nombres} onChange={(event)=> setNombres(event.target.value)} placeholder='Nombres' required minLength={2} />
                    </div>
                    <div className='mb-3'>
                        <input type="text" className='form-control' value={peliculas} onChange={(event)=> setPeliculas(event.target.value)} placeholder='Peliculas' required minLength={3} />
                    </div>
                    <div className='mb-3'>
                        <button type="submit" className='btn btn-primary'>Guardar</button>
                    </div>
                </form>
            </div>
        </div>)
    };
    const drawUpdateOffCanvas = () => {
        return (<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasUpdate" aria-labelledby="offcanvasRigthLabel">
            <div className="offcanvas-header">
                <h5 id="offcanvasRigthLabel">Actualizar Director</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <form onSubmit={(event)=> onUpdate(event)}>
                     <div className='mb-3'>
                        <input type="text" className='form-control' value={directorSeleccionado?.iddirector} readOnly />
                    </div>
                    <div className='mb-3'>
                        <input type="text" className='form-control' value={directorSeleccionado?.nombres} onChange={(event)=> setDirectorSeleccionado({...directorSeleccionado, nombres: event.target.value})} placeholder='Nombres' required minLength={2} />
                    </div>
                    <div className='mb-3'>
                        <input type="text" className='form-control' value={directorSeleccionado?.peliculas} onChange={(event)=> setDirectorSeleccionado({...directorSeleccionado, peliculas: event.target.value})} placeholder='Peliculas' required minLength={3} />
                    </div>
                    <div className='mb-3'>
                        <button type="submit" className='btn btn-primary'>Guardar</button>
                    </div>
                </form>
            </div>
        </div>)
    };


    return (
        <>
            <PageHeader titulo="Directores"/>
            <section className="padded" id="directores">
                <div className="container">
                  <button  class="btn btn-primary" 
                  data-bs-toggle="offcanvas" 
                  data-bs-target="#offcanvasInsert" 
                  >Nuevo Director</button>
                    {drawTable()}
                </div>
            </section>
            {drawInsertOffCanvas()}
            {drawUpdateOffCanvas()}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Eliminar Director</h5>
                    <button type="button" id="closeModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>¿Está seguro que desea eliminar al director <em>{directorSeleccionado?.nombres}</em> ?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setDirectorSeleccionado(null)}>Cancelar</button>
                    <button type="button" class="btn btn-primary" onClick={()=>eliminarDirector()}>Eliminar</button>
                </div>
                </div>
                </div>
            </div>

        </>
    )
}

export default Directores