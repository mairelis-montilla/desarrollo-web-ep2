import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";

function Futbol() {
  const [listaLigasFutbol, setListaLigasFutbol] = useState([]);

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    var myHeaders = new Headers();
    myHeaders.append('x-rapidapi-key', 'd6ad2acbd3674cece55848643cfd4d79');
    myHeaders.append('x-rapidapi-host', 'v3.football.api-sports.io');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    fetch('https://v3.football.api-sports.io/leagues', requestOptions)
      .then(response => response.json())
      .then(data => {
        setListaLigasFutbol(data.response);
        console.log(data);
      })
      .catch((error => console.log('error', error)))
  };

  const drawTable = () => {
    return (
      <div className="table-responsive">
        <table className="table table-striped ">
          <thead>
            <tr>
              <th>id</th>
              <th>Cod Pais</th>
              <th>Pais</th>
              <th>Bandera</th>
              <th>Liga</th>
              <th>Tipo</th>
              <th>icono</th>
              <th>Temporadas</th>
            </tr>
          </thead>
          <tbody>
            {listaLigasFutbol.map((item, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.country.code}</td>
                <td>{item.country.name}</td>
                <td><img src={item.country.flag} alt="" className="image-futbol" /></td>
                <td>{item.league.name}</td>
                <td>{item.league.type}</td>
                <td><img src={item.league.logo} alt="" className="image-futbol" /></td>
                <td>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Año</th>
                      <th>Inicio</th>
                      <th>Fin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.seasons.map((temporada, index)=>
                    <tr key={index}>
                      <td>{temporada.year}</td>
                      <td>{temporada.start}</td>
                      <td>{temporada.end}</td>
                    </tr>)}
                  </tbody>
                </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <PageHeader titulo="Ligas de Fútbol" />
      <section className="padded">
        <div className="container">{drawTable()}</div>
      </section>
    </>
  );
}

export default Futbol;
