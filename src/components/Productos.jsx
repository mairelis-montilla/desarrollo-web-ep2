/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Productos.css";
import { agregarCarrito } from "../utils";
import { API_URL } from "../utils";
import { Link } from "react-router-dom";
function Productos(props) {
  console.log(props);
  const [listaProductos, setListaProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState([]);

  useEffect(() => {
    leerServicio(props.codigoCategoria);
  }, [props.codigoCategoria]);

  const leerServicio = (idcategoria) => {
    const rutaServicio = API_URL + "productos.php?idcategoria=" + idcategoria;
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListaProductos(data);
      });
  };

  const dibujarVistaRapidaModal = () => {
    return (
      <div
        className="modal fade"
        id="vistaRapidaModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title fs-5" id="exampleModalLabel">
                {productoSeleccionado.nombre}
              </h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={
                      productoSeleccionado.imagengrande === null
                        ? API_URL + "imagenes/nofoto.jpg"
                        : API_URL + productoSeleccionado.imagengrande
                    }
                    className="card-img-top"
                    alt="..."
                  />
                </div>
                <div className="col-md-6">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Stock</th>
                        <td>{productoSeleccionado.unidadesenexistencia}</td>
                      </tr>
                      <tr>
                        <th>Detalle</th>
                        <td>{productoSeleccionado.detalle}</td>
                      </tr>
                      <tr>
                        <th>Categoría</th>
                        <td>{productoSeleccionado.categoria}</td>
                      </tr>
                      <tr>
                        <th>Precio</th>
                        <td>
                          S/{" "}
                          {productoSeleccionado.preciorebajado === "0"
                            ? Number(productoSeleccionado.precio).toFixed(2)
                            : Number(
                                productoSeleccionado.preciorebajado
                              ).toFixed(2)}
                          <span className="precio-anterior">
                            {productoSeleccionado.preciorebajado === "0"
                              ? ""
                              : "S/ " +
                                Number(productoSeleccionado.precio).toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const drawGrid = () => {
    return (
      <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-4">
        {listaProductos.map((item) => (
          <div className="col" key={item.idproducto}>
            <div className="card h-100">
              <Link to={"/productodetalle/" + item.idproducto}>
                <img
                  src={
                    item.imagenchica === null
                      ? API_URL + "imagenes/nofoto.jpg"
                      : API_URL + item.imagenchica
                  }
                  className="card-img-top"
                  alt="..."
                />
              </Link>

              {item.preciorebajado === "0" ? (
                ""
              ) : (
                <span className="porcentaje-descuento">
                  -{((1 - item.preciorebajado / item.precio) * 100).toFixed(0)}%
                </span>
              )}

              <i
                className="bi bi-eye icono-vista-rapida"
                title="Vista rápida"
                data-bs-toggle="modal"
                data-bs-target="#vistaRapidaModal"
                onClick={() => leerProductoVistaRapida(item.idproducto)}
              ></i>
              <div className="card-body">
                <h6 className="card-title">{item.nombre}</h6>
                <p className="card-text">
                  S/{" "}
                  {item.preciorebajado === "0"
                    ? Number(item.precio).toFixed(2)
                    : Number(item.preciorebajado).toFixed(2)}
                  <span className="precio-anterior">
                    {item.preciorebajado === "0"
                      ? ""
                      : "S/ " + Number(item.precio).toFixed(2)}
                  </span>
                  <i
                    className="bi bi-basket icono-carrito"
                    title="Añadir al carrito"
                    onClick={() => agregarCarrito(item, 1)}
                  ></i>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const leerProductoVistaRapida = (idproducto) => {
    console.log(idproducto);
    const rutaServicio = API_URL + "productos.php?idproducto=" + idproducto;
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProductoSeleccionado(data[0]);
      });
  };

  return (
    <>
      {drawGrid()}
      {dibujarVistaRapidaModal()}
    </>
  );
}

export default Productos;
