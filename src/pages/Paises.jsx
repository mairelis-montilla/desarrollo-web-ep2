import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { API_URL } from "../utils";

function Paises() {
  const [paises, setPaises] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [nuevoPais, setNuevoPais] = useState({ codpais: "", pais: "", capital: "", area: "", poblacion: "", continente: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = async () => {
    try {
      const rutaServicio = API_URL + "paises.php";
      const response = await fetch(rutaServicio);
      const data = await response.json();
      setPaises(data);
    } catch {
      console.error("Ups, something went wrong");
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleInputChange = (e) => {
    setNuevoPais({ ...nuevoPais, [e.target.name]: e.target.value });
  };

  const handleAgregarPais = (event) => {
    event.preventDefault();
    if (!nuevoPais.codpais || !nuevoPais.pais || !nuevoPais.capital || !nuevoPais.area || !nuevoPais.poblacion || !nuevoPais.continente) {
      alert("Todos los campos son obligatorios");
      return;
    }
    if (Number(nuevoPais.area) <= 0 || Number(nuevoPais.poblacion) <= 0) {
      alert("Área y Población deben ser mayores a 0");
      return;
    }
    const rutaServicio = API_URL + "paisesinsert.php";
    const formData = new FormData();
    formData.append("codpais", nuevoPais.codpais);
    formData.append("pais", nuevoPais.pais);
    formData.append("capital", nuevoPais.capital);
    formData.append("area", nuevoPais.area);
    formData.append("poblacion", nuevoPais.poblacion);
    formData.append("continente", nuevoPais.continente);
    
    fetch(rutaServicio, { method: "POST", body: formData })
      .then((response) => response.text())
      .then(() => {
        leerServicio();
        setNuevoPais({ codpais: "", pais: "", capital: "", area: "", poblacion: "", continente: "" });
        handleCloseModal();
      });
  };

  const filteredPaises = paises.filter((item) =>
    item.pais.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPaises.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPaises.length / itemsPerPage);

  return (
    <>
      <PageHeader titulo="Paises" />
      <section className="padded">
        <div className="container">
          <div className="mb-3 d-flex justify-content-between">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Buscar país..."
              value={search}
              onChange={handleSearch}
            />
            <button className="btn btn-primary" onClick={handleShowModal}>
              Agregar País
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Cod Pais</th>
                  <th>Pais</th>
                  <th>Capital</th>
                  <th>Area</th>
                  <th>Población</th>
                  <th>Continente</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.idpais}>
                    <td>{item.codpais}</td>
                    <td>{item.pais}</td>
                    <td>{item.capital}</td>
                    <td>{item.area}</td>
                    <td>{item.poblacion}</td>
                    <td>{item.continente}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Anterior</button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Siguiente</button>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}

export default Paises;
