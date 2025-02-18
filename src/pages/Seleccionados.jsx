import { useState, useEffect } from "react";

const Seleccionados = () => {
    const [provedores, setProvedores] = useState([]);

    useEffect(() => {
        const storedProveedores = JSON.parse(sessionStorage.getItem("provedores")) || [];
        setProvedores(storedProveedores);
    }, []);

    const eliminarItem = (item) => {
      const listaActualizada = provedores.filter(
        (i) => i.idproveedor !== item.idproveedor
      );
      setProvedores(listaActualizada);
      sessionStorage.setItem("provedores", JSON.stringify(listaActualizada));
    };
    const vaciarListado = () => {
      sessionStorage.removeItem("provedores");
      setProvedores([]);
    };
    return (
        <div className="container mt-4 seleccionados">
            <h2>Lista de Proveedores Seleccionados</h2>
            <table className="table ">
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
                    {provedores.length > 0 ? (
                        provedores.map(item => (
                            <tr key={item.idproveedor}>
                                <td>{item.idproveedor}</td>
                                <td>{item.nombreempresa}</td>
                                <td>{item.nombrecontacto}</td>
                                <td>{item.cargocontacto}</td>
                                <td>{item.ciudad}</td>
                                <td>{item.pais}</td>
                                <td><button className="btn btn-primary" onClick={()=> eliminarItem(item)}>eliminar</button></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No hay proveedores guardados</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className="btn btn-primary my-4" onClick={()=> vaciarListado()}>Vaciar listado</button>
        </div>
    );
};

export default Seleccionados;