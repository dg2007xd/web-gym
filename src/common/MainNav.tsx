import { Link, useLocation } from "react-router-dom"
import './MainNav.css'
import { useEffect } from "react"
import logo from '../assets/images/gym-logo.png'
import { navItems } from "../data/MainNavData"
import { dropdownTienda, dropdownCategorias, dropdownProductos, dropdownTopDeals } from "../data/Dropdowns"
function MainNav() {

  const location = useLocation()
  console.log(location)

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




  return (
    <nav className="navbar navbar-expand-lg sticky-top" >
      <div className="container">
        <div className="row center">


          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="col collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              {
                navItems.map((itemMenu, index) =>
                  <li className="nav-item dropdown" key={index}>
                    <Link className={
                      "nav-link" +
                      (index === 0 ? " nav-home negro" : " nav-padded dropdown-toggle") +
                      (location.pathname === itemMenu.url ? " active" : "")}
                      to={itemMenu.url}> {itemMenu.label}{index === 2 && (
                        <button className="btn btn-success ms-1">SALE</button>
                      )}
                      {index === 3 && (
                        <button className="btn btn-danger ms-1">HOT</button>
                      )}</Link>

                    {index === 1 && dropdownTienda()}
                    {index === 2 && dropdownCategorias()}
                    {index === 3 && dropdownProductos()}
                    {index === 4 && dropdownTopDeals()}

                  </li>
                )
              }

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