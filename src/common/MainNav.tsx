import { Link, useLocation } from "react-router-dom"
import './MainNav.css'
import { useEffect, useState } from "react"
import logo from '../assets/images/gym-logo.png'
import { navItems, navItemsRight } from "../data/MainNavData"
import { dropdownTienda, DropdownCategorias, dropdownProductos, dropdownElements, DropdownTopDeals } from "../data/Dropdowns"
import Cart from "../pages/Cart"


function MainNav() {

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Función para contar productos en el carrito
    const updateCartCount = () => {
      const carrito = JSON.parse(sessionStorage.getItem("carritocompras") || "[]");
      // Suma la cantidad de cada producto
      const total = carrito.reduce((acc: number, item: any) => acc + (item.cantidad || 1), 0);
      setCartCount(total);
    };

    updateCartCount();
    window.addEventListener("carritoActualizado", updateCartCount);
    return () => window.removeEventListener("carritoActualizado", updateCartCount);
  }, []);

  const location = useLocation()
  console.log(location)

  const cerrarOffcanvas = () => {
    const botonCerrar = document.querySelector("#offcanvasRight .btn-close") as HTMLElement;
    if (botonCerrar) botonCerrar.click();
  };

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
    <>
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

                        to={itemMenu.url}> {itemMenu.label}
                        {index === 2 && (
                          <button className="btn btn-success ms-1">SALE</button>
                        )}
                        {index === 3 && (
                          <button className="btn btn-danger ms-1">HOT</button>
                        )}</Link>

                      {index === 1 && dropdownTienda()}
                      {index === 2 && <DropdownCategorias codigoCategoria={1} />}
                      {index === 3 && dropdownProductos()}
                      {index === 4 && DropdownTopDeals()}
                      {index === 5 && dropdownElements()}




                    </li>
                  )
                }

              </ul>
            </div>
          </div>

          {/* Nav-centro(logo del gym) */}
          <div className="col centro">
            <img id="logo" className="img-fluid" src={logo} alt="" />
          </div>


          {/* Nav-derecha */}
          <div className="col">
            <ul className="header-nav">
              {navItemsRight.map((itemMenu, index) =>
                <li className="icono" key={index}>
                  {index === 3 ? (
                    <span className="cart-icon-wrapper position-relative">
                      <i
                        className={"nav-link bi " + itemMenu.icon}
                        role="button"
                        tabIndex={0}
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                        style={{ cursor: "pointer" }}
                      ></i>
                      <span className="cart-badge">
                        {cartCount}
                      </span>
                    </span>
                  ) : (
                    <Link
                      className={"nav-link" + (location.pathname === itemMenu.url ? " active" : "")}
                      to={itemMenu.url}
                    >
                      <i className={"bi " + itemMenu.icon}></i>{itemMenu.label}
                    </Link>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Offcanvas fuera del container/nav */}

      <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header titulo-ofcanvas">
          <h5 className="offcanvas-title text-canvas" id="offcanvasRightLabel">Shopping Cart</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        {Cart()}

      </div>

    </>
  )
}

export default MainNav