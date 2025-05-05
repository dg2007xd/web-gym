import { Link } from "react-router-dom"
import './MainNav.css'
import { useState } from "react"
import logo from '../assets/images/gym-logo.png'
function MainNav() {

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");


  return (
    <nav className="navbar navbar-expand-lg sticky-top" >
      <div className="container">
        <div className="row center">




          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="col collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link className={`nav-link nav-home ${categoriaSeleccionada === "home" ? "active" : ""}`} to="/" onClick={() => setCategoriaSeleccionada("home")}>HOME</Link>
              </li>


              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle nav-padded ${categoriaSeleccionada === "shop" ? "active" : ""}`} to="/shop" onClick={() => setCategoriaSeleccionada("shop")}>SHOP</Link>

                <ul className="dropdown-content nav-item dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>

              </li>
              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle nav-padded ${categoriaSeleccionada === "categories" ? "active" : ""}`} to="/categories" onClick={() => setCategoriaSeleccionada("categories")}>CATEGORIES</Link>

                <ul className="dropdown-content nav-item dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>

              </li>
              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle nav-padded ${categoriaSeleccionada === "products" ? "active" : ""}`} to="/products" onClick={() => setCategoriaSeleccionada("products")}>PRODUCTS</Link>

                <ul className="dropdown-content nav-item dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>

              </li>
              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle nav-padded ${categoriaSeleccionada === "top-deals" ? "active" : ""}`} to="/top-deals" onClick={() => setCategoriaSeleccionada("top-deals")}>TOP DEALS</Link>

                <ul className="dropdown-content nav-item dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>

              </li>
              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle nav-padded ${categoriaSeleccionada === "elements" ? "active" : ""}`} to="/elements" onClick={() => setCategoriaSeleccionada("elements")}>ELEMENTS</Link>

                <ul className="dropdown-content nav-item dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>

              </li>
            </ul>
          </div>
        </div>

        <div className="col centro">
          <img id="logo" className="img-fluid" src={logo} alt="" />
        </div>


        <div className="col">
          <ul className="header-nav">
            <li className="icono"><i className="bi bi-search"></i></li>
            <li className="icono"><i className="bi bi-person"></i></li>
            <li className="icono"><i className="bi bi-heart"></i></li>
            <li className="icono"><i className="bi bi-bag-dash"></i></li>
          </ul>
        </div>

      </div>
    </nav>
  )
}

export default MainNav