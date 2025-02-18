import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { API_URL } from "../utils";
function Empleados() {
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio = API_URL + "empleados.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListaEmpleados(data);
        setCargando(false)
      });
  };

  const drawGrid = () => {
    return (
      <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-4">
        {listaEmpleados.map((item) => (
          <div className="col" key={item.idempleado}>
            <div className="card">
              <img
                src={API_URL + "fotos/" + item.foto}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">
                  {item.nombres} {item.apellidos}
                </h5>
                <p className="card-text">{item.cargo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const dibujarPrecarga = () => {
    return (
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  };

  return (
    <>
      <PageHeader titulo="Empleados" />
      <section className="padded">
        <div className="container">
          {cargando === true ? dibujarPrecarga() : null}
          {drawGrid()}
        </div>
      </section>
    </>
  );
}

export default Empleados;
