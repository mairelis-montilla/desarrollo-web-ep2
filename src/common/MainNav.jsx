import { Link, useLocation } from "react-router-dom";
import { navlist, navlistRight } from "../data/MainNavData";
import "./MainNav.css";

function MainNav() {
  const location = useLocation();
  console.log(location);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          ID+
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {navlist.map((item, index) => {
              return (
                <li key={index} className="nav-item">
                  <Link
                    className={
                      "nav-link" +
                      (location.pathname === item.url ? " active" : "")
                    }
                    title={item.title}
                    to={item.url}
                  >
                    {item.text}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="navbar-nav">
            {navlistRight.map((item, index) => {
              return (
                <li key={index} className="nav-item">
                  <Link
                    className={
                      "nav-link" +
                      (location.pathname === item.url ? " active" : "")
                    }
                    title={item.title}
                    to={item.url}
                  >
                    <i className={item.icon}></i> {item.text} 
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
