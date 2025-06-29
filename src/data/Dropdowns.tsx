import Shop from '../assets/images/shop-image.jpg';
import '../data/Dropdowns.css'
import nofoto from '../assets/images/nofoto.jpg';

import { useEffect, useState } from 'react';
import { Articulo } from '../types/Articulo';
import { API_URL } from '../utils';
import { Link } from 'react-router-dom';
import { Categoria } from '../types/Categoria';


//SHOP
export const dropdownTienda = () => {
  return (
    <div className="dropdown-menu mega-menuS p-4">
      <div className="row">

        <div className="col-md-3">
          <h6 className="dropdown-header">Product Types</h6>
          <a className="dropdown-item" href="#">Simple Products</a>
          <a className="dropdown-item" href="#">Grouped Products</a>
          <a className="dropdown-item" href="#">
            Variable Product <span id="boton-new">NEW</span>
          </a>
          <a className="dropdown-item" href="#">External/Affiliate Product</a>
          <a className="dropdown-item" href="#">
            Sale Products <span id="boton-rosa">SALE</span>
          </a>
          <a className="dropdown-item" href="#">Upsell Products</a>
          <a className="dropdown-item" href="#">Cross-Sell Product</a>
        </div>

        <div className="col-md-3">
          <h6 className="dropdown-header">WooCommerce Pages</h6>
          <a className="dropdown-item" href="#">Shop Page</a>
          <a className="dropdown-item" href="#">Checkout Page</a>
          <a className="dropdown-item" href="#">Shopping Cart</a>
          <a className="dropdown-item" href="#">My Account</a>
          <a className="dropdown-item" href="#">
            Shop Ajax Filter <span id="boton-naranja">HOT</span>
          </a>
          <a className="dropdown-item" href="#">Product Category</a>
          <a className="dropdown-item" href="#">Privacy Policy</a>
        </div>

        <div className="col-md-3">
          <h6 className="dropdown-header">Product Features</h6>
          <a className="dropdown-item" href="#">Stock Progress Bar</a>
          <a className="dropdown-item" href="#">Color/Image Swatches</a>
          <a className="dropdown-item" href="#">
            Size Guide Table <span id="boton-naranja">POPULAR</span>
          </a>
          <a className="dropdown-item" href="#">Custom Tab</a>
          <a className="dropdown-item" href="#">Countdown Timer</a>
          <a className="dropdown-item" href="#">
            Product Video <span id="boton-rosa">FEATURED</span>
          </a>
          <a className="dropdown-item" href="#">Product Brand</a>
        </div>

        <div className="col-md-3 promo-img-container">
          <img src={Shop} width={388} height={242} alt="" className="promo-img" />
          <div className="promo-overlay">
            <div className="promo-label">SPECIAL SALE!</div>
            <div className="promo-discount">UP TO 30%<br />OFF</div>
            <a href="#" className="promo-link">SHOP NOW</a>
          </div>
        </div>
      </div>
    </div>
  );
};

//CATEGORIES
interface ProductosProps {
  codigoCategoria: number;
}
export const DropdownCategorias = ({ codigoCategoria }: ProductosProps) => {
  const [listaProductos, setListaProductos] = useState<Articulo[]>([]);

  useEffect(() => {
    leerServicio(codigoCategoria);
  }, [codigoCategoria]);

  const leerServicio = async (idcategoria: number) => {

    try {
      const response = await fetch(API_URL + "productos.php?idcategoria=" + idcategoria)
      const data: Articulo[] = await response.json();
      console.log(data);
      setListaProductos(data);
    } catch (error) {
      console.log("Error consultando datos:", error);
    }
  }
  // Solo agrega estas líneas antes de tu map:
  const hasData = listaProductos && listaProductos.length > 0;
  return (
    <div className="dropdown-menu mega-menuC">
      <div className="row">
        <div className="col-md-6 p-4 grupo1">

          <div className="row justify-content-evenly">
            <div className="col-md-3 mb-4">
              <h6 className="dropdown-header">Pipes And Fittings</h6>
              <a className="dropdown-item" href="#">Compression Fittings</a>
              <a className="dropdown-item" href="#">Copper Pipes</a>
              <a className="dropdown-item" href="#">PVC Pipes</a>
              <a className="dropdown-item" href="#">Threaded Fittings</a>

            </div>

            <div className="col-md-3 mb-4 ">
              <h6 className="dropdown-header">Plumbing Accessories</h6>
              <a className="dropdown-item" href="#">Escutcheons</a>
              <a className="dropdown-item" href="#">Shower Curtains</a>
              <a className="dropdown-item" href="#">Shower Heads</a>
              <a className="dropdown-item" href="#">Soap Dispensers</a>

            </div>

            <div className="col-md-3 mb-4">
              <h6 className="dropdown-header">Plumbing Fixtures</h6>
              <a className="dropdown-item" href="#">Bathtubs</a>
              <a className="dropdown-item" href="#">Faucets</a>
              <a className="dropdown-item" href="#">Showers</a>
              <a className="dropdown-item" href="#">Wash Basins</a>

            </div>
          </div>


          <div className="row justify-content-evenly">

            <div className="col-md-3 mb-4">
              <h6 className="dropdown-header">Plumbing Hardware</h6>
              <a className="dropdown-item" href="#">Anchors</a>
              <a className="dropdown-item" href="#">Gaskets</a>
              <a className="dropdown-item" href="#">Seals</a>
              <a className="dropdown-item" href="#">Washers</a>

            </div>

            <div className="col-md-3 mb-4 ">
              <h6 className="dropdown-header">Plumbing Tools</h6>
              <a className="dropdown-item" href="#">Drain Snakes</a>
              <a className="dropdown-item" href="#">Pipe Clamps</a>
              <a className="dropdown-item" href="#">Pipe Cutters</a>
              <a className="dropdown-item" href="#">Soldering Tools</a>

            </div>

            <div className="col-md-3 mb-4">
              <h6 className="dropdown-header">Pumps And Tanks</h6>
              <a className="dropdown-item" href="#">Pressure Tanks</a>
              <a className="dropdown-item" href="#">Pump Accessories</a>
              <a className="dropdown-item" href="#">Water Pumps </a>
              <a className="dropdown-item" href="#">Well Pumps</a>

            </div>

          </div>

        </div>

        <div className='col-md-4 bg-categories-img grupo2'>
          <h3 className='center mt-4 mb-4 categ-titul'>Best Selling</h3>
          <div className="row">

            {hasData ? (
              // Tu código original
              listaProductos.slice(0,4).map(item => {
                return (
                  <div className="col-md-6 mb-3 negro" key={item.id}>
                    <div className="row align-items-center produc-categoria ms-2">
                      <div className="col-md-4">
                        <img id='back-img-categ'
                          src={item.imagen === null
                            ? API_URL + "img/nofoto.jpg"
                            : API_URL + item.imagen}
                          className="img-fluid imgcategorias p-2"
                          alt={item.nombre}
                        />
                      </div>
                      <div className="col-md-8">
                        <p className="mb-1 nombre-productos">{item.nombre === null ? "Cargando nombre" : item.nombre}</p>
                        <p className="fw-bold precio-produc">S/ {item.precio === null ? "Cargando precio" : item.precio}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              // Mensaje cuando no hay datos/conexión - 4 elementos (2x2)
              <>
                <div className="col-md-6 mb-3">
                  <div className="row align-items-center produc-categoria ms-2">
                    <div className="col-md-4">
                      <img id='back-img-categ'
                        src={nofoto} // o usa otra imagen: imagenSinConexion
                        className="img-fluid imgcategorias p-2"
                        alt="Sin conexión"
                      />
                    </div>
                    <div className="col-md-8">
                      <p className="mb-1 nombre-productos">Sin conexión al servidor</p>
                      <p className="fw-bold precio-produc">Verifique la conexión</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="row align-items-center produc-categoria ms-2">
                    <div className="col-md-4">
                      <img id='back-img-categ'
                        src={nofoto}
                        className="img-fluid imgcategorias p-2"
                        alt="Sin conexión"
                      />
                    </div>
                    <div className="col-md-8">
                      <p className="mb-1 nombre-productos">Sin conexión al servidor</p>
                      <p className="fw-bold precio-produc">Verifique la conexión</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="row align-items-center produc-categoria ms-2">
                    <div className="col-md-4">
                      <img id='back-img-categ'
                        src={nofoto}
                        className="img-fluid imgcategorias p-2"
                        alt="Sin conexión"
                      />
                    </div>
                    <div className="col-md-8">
                      <p className="mb-1 nombre-productos">Sin conexión al servidor</p>
                      <p className="fw-bold precio-produc">Verifique la conexión</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="row align-items-center produc-categoria ms-2">
                    <div className="col-md-4">
                      <img id='back-img-categ'
                        src={nofoto}
                        className="img-fluid imgcategorias p-2"
                        alt="Sin conexión"
                      />
                    </div>
                    <div className="col-md-8">
                      <p className="mb-1 nombre-productos">Sin conexión al servidor</p>
                      <p className="fw-bold precio-produc">Verifique la conexión</p>
                    </div>
                  </div>
                </div>

              </>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};


//PRODUCTS

export const dropdownProductos = () => {
  const [listaArticulos, setListaArticulos] = useState<Articulo[]>([]);
  const [seleccionado, setSeleccionado] = useState('hardware');
  const [conexion, setConexion] = useState(true);

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    fetch(API_URL + "productos.php")
      .then(response => response.json())
      .then((data: Articulo[]) => {
        setListaArticulos(data);
        setConexion(true);
      })

  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`fa fa-star ${i <= rating ? 'checked' : ''}`}></span>
      );
    }
    return stars;
  };

  const hasData = listaArticulos && listaArticulos.length > 0;

  return (
    <div className="dropdown-menu mega-menuP p-4">
      <div className="d-flex justify-content-center align-items-center">
        <p
          className={`center title-product ${seleccionado === 'hardware' ? 'active' : ''}`}
          onClick={() => setSeleccionado('hardware')}
          style={{ cursor: 'pointer' }}
        >
          Hardware
        </p>
        <p className='center title-product ms-2 me-2'>&#124;</p>
        <p
          className={`center title-product ${seleccionado === 'tools' ? 'active' : ''}`}
          onClick={() => setSeleccionado('tools')}
          style={{ cursor: 'pointer' }}
        >
          Tools
        </p>
      </div>
      <div id="cards-productos">
        <div className='row center'>
          {conexion && hasData ? (
            [...listaArticulos]
              .sort(() => Math.random() - 0.5)
              .slice(0, 5).map(item => {
                const nombre = String(item.nombre);
                const precio = Number(item.precio);
                return (
                  <div className='col-2 p-3' key={item.id}>
                    <div className='sec-pro h-100'>
                      <div id='back-img' className='center container-fluid'>
                        <Link to={"/productodetalle/" + item.id}>
                          <img
                            src={item.imagen === null
                              ? API_URL + "img/nofoto.jpg"
                              : API_URL + item.imagen}
                            className="img-fluid p-4"
                            alt={nombre}
                          />
                        </Link>
                      </div>
                      <p className='text-center nombre-productos fs-6 fsnombre mt-3'>
                        {nombre || "Nombre no disponible"}
                      </p>
                      <div className="center">
                        {renderStars(item.rating)}
                      </div>
                      <p className='precio-produc center'>S/ {precio}</p>
                    </div>
                  </div>
                );
              })
          ) : (
            // Fallback: sin conexión o sin datos
            <>
              {[...Array(5)].map((_, idx) => (
                <div className='col-2 p-3' key={idx}>
                  <div className='sec-pro h-100'>
                    <div id='back-img' className='center container-fluid'>
                      <img
                        src={nofoto}
                        className="img-fluid p-4"
                        alt="Sin conexión"
                      />
                    </div>
                    <p className='text-center nombre-productos fs-6 fsnombre mt-3'>
                      {conexion ? "No hay productos" : "Sin conexión al servidor"}
                    </p>
                    <div className="center">
                      {renderStars(0)}
                    </div>
                    <p className='precio-produc center'>
                      {conexion ? "" : "Verifique la conexión"}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

//Top Deals
interface ProductosProps {
  codigoCategoria: number;
}

export const DropdownTopDeals = () => {

  const [listaArticulos, setListaArticulos] = useState<Articulo[]>([])
  const [listaTablaCat, setTablaCat] = useState<Categoria[]>([]);



  useEffect(() => {
    funcCategorias();
  }, []);

  const funcCategorias = () => {
    fetch(API_URL + "categoria.php")
      .then(response => response.json())
      .then((data: Categoria[]) => {
        console.log(data);
        setTablaCat(data);
      })
      .catch((error) => {
        console.error("Error consultando datos:", error);
      });
  }

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {

    fetch(API_URL + "productos.php")
      .then(response => response.json())
      .then((data: Articulo[]) => {
        console.log(data);
        setListaArticulos(data);
      })
      .catch((error) => {
        console.error("Error consultando datos:", error);
      });

  }

  // Verificar si hay datos
  const hasPlanes = listaTablaCat && listaTablaCat.length > 0;
  const hasArticulos = listaArticulos && listaArticulos.length > 0;

  return (
    <div className="dropdown-menu mega-menuT">
      <div className="row">
        <div className="cont-shop-deals p-4 justify-content-center">
          <h3 className='categ-titul center mb-4'>Shop By</h3>

          <div className="row">
            {hasPlanes ? (
              // Planes originales
              listaTablaCat.map(item =>
                <div className="col-md-3 mb-4" key={item.idcategoria}>
                  <div className="h-100 text-center">
                    <div className="card-img-top d-flex justify-content-center align-items-center p-3 img-deals-back">
                      <img
                        src={item.imagencategoria
                          ? API_URL + item.imagencategoria
                          : API_URL + "img/nofoto.jpg"}
                        className="img-fluid img-deals"
                        alt={"Plan " + item.nombrecategoria}
                      />
                    </div>
                    <div className="card-body">
                      <h6 className="card-title list-group-item negro mt-3">{item.nombrecategoria}</h6>
                    </div>
                  </div>
                </div>
              )
            ) : (
              // Fallback para planes - 8 elementos (4 por fila, 2 filas)
              <>
                {[...Array(8)].map((_, idx) => (
                  <div className="col-md-3 mb-4" key={idx}>
                    <div className="h-100 text-center">
                      <div className="card-img-top d-flex justify-content-center align-items-center p-3 img-deals-back">
                        <img
                          src={nofoto}
                          className="img-fluid img-deal-off"
                          alt="Sin conexión"
                        />
                      </div>
                      <div className="card-body">
                        <h6 className="card-title list-group-item mt-3">Sin conexión</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <div className='col-md-4 bg-categories-img-deals'>
          <h3 className='center mt-4 mb-4 categ-titul'>Top Rated</h3>
          <div className="row">
            {hasArticulos ? (
              // Productos originales - solo 6 aleatorios
              [...listaArticulos]
                .sort(() => Math.random() - 0.5)
                .slice(0, 6)
                .map(item => {
                  return (
                    <div className="col-md-6 mb-3" key={item.id}>
                      <div className="row align-items-center produc-categoria ms-2">
                        <div className="col-md-4">
                          <img id='back-img-categ'
                            src={item.imagen === null
                              ? API_URL + "img/nofoto.jpg"
                              : API_URL + item.imagen}
                            className="img-fluid imgcategorias p-2"
                            alt={item.nombre}
                          />
                        </div>
                        <div className="col-md-8">
                          <p className="mb-1 nombre-productos">{item.nombre}</p>
                          <p className="fw-bold precio-produc">S/ {item.precio}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
            ) : (
              // Fallback para productos - 6 elementos (2 filas de 2, 1 fila de 2)
              <>
                {/* Primera fila - 2 elementos */}
                <div className="col-md-6 mb-3">
                  <div className="row align-items-center produc-categoria ms-2">
                    <div className="col-md-4">
                      <img id='back-img-categ'
                        src={nofoto}
                        className="img-fluid imgcategorias p-2"
                        alt="Sin conexión"
                      />
                    </div>
                    <div className="col-md-8">
                      <p className="mb-1 nombre-productos">Sin conexión al servidor</p>
                      <p className="fw-bold precio-produc">Verifique la conexión</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="row align-items-center produc-categoria ms-2">
                    <div className="col-md-4">
                      <img id='back-img-categ'
                        src={nofoto}
                        className="img-fluid imgcategorias p-2"
                        alt="Sin conexión"
                      />
                    </div>
                    <div className="col-md-8">
                      <p className="mb-1 nombre-productos">Sin conexión al servidor</p>
                      <p className="fw-bold precio-produc">Verifique la conexión</p>
                    </div>
                  </div>
                </div>
                {/* Segunda fila - 2 elementos */}
                <div className="col-md-6 mb-3">
                  <div className="row align-items-center produc-categoria ms-2">
                    <div className="col-md-4">
                      <img id='back-img-categ'
                        src={nofoto}
                        className="img-fluid imgcategorias p-2"
                        alt="Sin conexión"
                      />
                    </div>
                    <div className="col-md-8">
                      <p className="mb-1 nombre-productos">Sin conexión al servidor</p>
                      <p className="fw-bold precio-produc">Verifique la conexión</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="row align-items-center produc-categoria ms-2">
                    <div className="col-md-4">
                      <img id='back-img-categ'
                        src={nofoto}
                        className="img-fluid imgcategorias p-2"
                        alt="Sin conexión"
                      />
                    </div>
                    <div className="col-md-8">
                      <p className="mb-1 nombre-productos">Sin conexión al servidor</p>
                      <p className="fw-bold precio-produc">Verifique la conexión</p>
                    </div>
                  </div>
                </div>
                {/* Tercera fila - 2 elementos */}
                <div className="col-md-6 mb-3">
                  <div className="row align-items-center produc-categoria ms-2">
                    <div className="col-md-4">
                      <img id='back-img-categ'
                        src={nofoto}
                        className="img-fluid imgcategorias p-2"
                        alt="Sin conexión"
                      />
                    </div>
                    <div className="col-md-8">
                      <p className="mb-1 nombre-productos">Sin conexión al servidor</p>
                      <p className="fw-bold precio-produc">Verifique la conexión</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="row align-items-center produc-categoria ms-2">
                    <div className="col-md-4">
                      <img id='back-img-categ'
                        src={nofoto}
                        className="img-fluid imgcategorias p-2"
                        alt="Sin conexión"
                      />
                    </div>
                    <div className="col-md-8">
                      <p className="mb-1 nombre-productos">Sin conexión al servidor</p>
                      <p className="fw-bold precio-produc">Verifique la conexión</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


//ELEMENTS
export const dropdownElements = () => {
  return (
    <div className="dropdown-menu mega-menuE text-start ">
      <ul className='caja-element'>
        <li><p className='text-element'>Accordion</p></li>
        <li><p className='text-element'>Icon box</p></li>
        <li><p className='text-element'>Portfolio</p></li>
        <li><p className='text-element'>FAQS</p></li>
        <li><p className='text-element'>Gallery</p></li>
        <li><p className='text-element'><i className="bi bi-toggles"></i>Tabs</p></li>
        <li><p className='text-element'>Blog</p></li>
        <li><p className='text-element'>About Us</p></li>
        <li><p className='text-element'>Contact Us</p></li>
      </ul>
    </div>
  );
};