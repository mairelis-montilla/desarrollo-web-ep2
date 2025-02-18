import "./Carrito.css";
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";

function Carrito() {
  const [listaItems, setListaItems] = useState([]);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    leerDatosCarrito();
  }, []);

  const leerDatosCarrito = () => {
    const datosCarrito = JSON.parse(sessionStorage.getItem("carritocompras"));
    //JSON.parse convierte un string en un objeto o arreglo
    setListaItems(datosCarrito);

  };

  const drawTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th className="text-end">Precio</th>
            <th className="text-end">Cantidad</th>
            <th className="text-end">Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listaItems !== null && listaItems.length > 0 ? (
            listaItems.map((item) => (
              <tr key={item.idproducto}>
                <td>{item.idproducto}</td>
                <td>{item.nombre}</td>
                <td className="text-end">{Number(item.precio).toFixed(2)}</td>
                <td className="text-end">
                    <input type="number" min={1} className="form-control text-end caja-cantidad" onChange={(event)=> actualizarCantidad(item.idproducto, Number(event.target.value))}  value={item.cantidad}/>
                </td>
                <td className="text-end">
                  {Number(item.precio * item.cantidad).toFixed(2)}
                </td>
                <td>
                  <i
                    className="bi bi-x-lg icono-eliminar"
                    onClick={() => eliminarItem(item)}
                    title="Eliminar"
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay productos en el carrito</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  const eliminarItem = (item) => {
    const listaActualizada = listaItems.filter(
      (i) => i.idproducto !== item.idproducto
    );
    setListaItems(listaActualizada);
    sessionStorage.setItem("carritocompras", JSON.stringify(listaActualizada));
  };

  const actualizarCantidad = (id, cantidad) => {
    const listaActualizada = listaItems.map(item=>{
        if(item.idproducto === id){
            item.cantidad = cantidad
        }
        return item;
    })
    setListaItems(listaActualizada)
    sessionStorage.setItem("carritocompras", JSON.stringify(listaActualizada))
  }

  const vaciarCarrito = () => {
    sessionStorage.removeItem("carritocompras");
    setListaItems([]);
    setTotal(0);
  };

  const calcularTotal = () => {
    let sumaTotal = listaItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
    setTotal(sumaTotal);
  }

  useEffect( ()=>{
    if(listaItems!== null && listaItems.length > 0)
    calcularTotal()
  },[listaItems])

  return (
    <>
      <PageHeader titulo="Carrito" />
      <section className="padded">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              {drawTable()}
              <button
                className="btn btn-danger"
                onClick={() => vaciarCarrito()}
              >
                Vaciar carrito
              </button>
            </div>
            <div className="col-lg-2">
                <div className="card border-dark mb-3">
                    <div className="card-header">Total del carrito</div>
                    <div className="card-body">
                        <table className="tbody">
                            <tbody>
                                <tr>
                                    <th>Total</th>
                                    <td className="text-end">S/ {total.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Carrito;
