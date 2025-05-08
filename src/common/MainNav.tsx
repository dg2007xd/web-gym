import { Link } from "react-router-dom"
import './MainNav.css'
import { useEffect, useState } from "react"
import logo from '../assets/images/gym-logo.png'
function MainNav() {

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.sticky-top') as HTMLElement | null;
      if (header) {
        if (window.scrollY > 0) {
          header.classList.add('sticky-shadow');
        } else {
          header.classList.remove('sticky-shadow');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("home");


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
                <Link className={`nav-link nav-home negro ${categoriaSeleccionada === "home" ? "active" : ""}`} to="/" onClick={() => setCategoriaSeleccionada("home")}>HOME</Link>
              </li>


              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle nav-padded ${categoriaSeleccionada === "tienda" ? "active" : ""}`} to="/tienda" onClick={() => setCategoriaSeleccionada("tienda")}>SHOP</Link>

                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>

              </li>

              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle nav-padded ${categoriaSeleccionada === "categories" ? "active" : ""}`} to="/categories" onClick={() => setCategoriaSeleccionada("categories")}>CATEGORIES
                <button type="button" className="btn btn-success ms-1">SALE</button></Link>

                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>

              </li>

              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle nav-padded ${categoriaSeleccionada === "products" ? "active" : ""}`} to="/products" onClick={() => setCategoriaSeleccionada("products")}>PRODUCTS
                  <button type="button" className="btn btn-danger ms-1">HOT</button>
                </Link>

                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>

              </li>
              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle nav-padded ${categoriaSeleccionada === "top-deals" ? "active" : ""}`} to="/top-deals" onClick={() => setCategoriaSeleccionada("top-deals")}>TOP DEALS</Link>

                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>

              </li>
              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle nav-padded ${categoriaSeleccionada === "elements" ? "active" : ""}`} to="/elements" onClick={() => setCategoriaSeleccionada("elements")}>ELEMENTS</Link>

                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>

              </li>

              <li className="dropdown">
                <Link className={`nav-link nav-padded ${categoriaSeleccionada === "clientes" ? "active" : ""}`} to="/clientes" onClick={() => setCategoriaSeleccionada("clientes")}>CLIENTES</Link>

                <ul className="dropdown-menu">
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
          <div className="header-nav">
            <li className="icono"><i className="bi bi-search"></i></li>
            <li className="icono"><i className="bi bi-person"></i></li>
            <li className="icono"><i className="bi bi-heart"></i></li>
            <li className="icono"><i className="bi bi-bag-dash"></i></li>
          </div>
        </div>

      </div>
    </nav>
  )
}

export default MainNav