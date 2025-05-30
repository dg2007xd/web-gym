import './Productos.css'
import { Articulo } from '../types/Articulo'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { agregarCarrito, API_URL } from '../utils';

interface ProductosProps {
  codigoCategoria: number;
}

function Productos({ codigoCategoria }: ProductosProps) {
  console.log(codigoCategoria);

  const [listaArticulos, setListaArticulos] = useState<Articulo[]>([])

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("primero");

  const [productoSeleccionado, setProductoSeleccionado] = useState<Articulo | null>(null);

  const [productosRandom, setProductosRandom] = useState<Articulo[]>([]);

  useEffect(() => {
    leerServicio();
  }, []);

  useEffect(() => {
  if (listaArticulos.length > 0) {
    const aleatorios = [...listaArticulos]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
    setProductosRandom(aleatorios);
  }
}, [listaArticulos, categoriaSeleccionada]);

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

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`fa fa-star ${i <= rating ? 'checked' : ''}`}></span>
      );
    }
    return stars;
  };


  const seleccionarProducto = async (id: Number) => {
    console.log(id)
    try {
      const response = await fetch(API_URL + "productos.php?id=" + id)
      const data: Articulo[] = await response.json();
      console.log(data);
      setProductoSeleccionado(data[0]) //data[0] hace referencia al primer y unico elemento del arreglo
    } catch (error) {
      console.log("Error consultando datos:", error);
    }
  }


  const dibujarItems = () => {
    return (
      <div id="cards-productos">
        <div className='row center'>
          {productosRandom.map(item => {
              const nombre = String(item.nombre);
              const precio = Number(item.precio);
              return (
                <div className='col-3 p-3' key={item.id}>
                  <div className='sec-pro card h-100'>
                    <div id='back-img' className='center container-fluid'>
                      <Link to={`/productodetalle/${item.id}`}>
                        <img
                          src={item.imagen === null
                            ? API_URL + "img/nofoto.jpg"
                            : API_URL + item.imagen}
                          className="img-fluid p-3"
                          alt={nombre}
                        />
                      </Link>
                      <i className="fw-bold bi bi-heart icon-favourite"></i>

                      <i className="bi bi-bar-chart icon-bar"></i>

                      <i
                        className="bi bi-eye icon-quick-view"
                        title="Vista rápida"
                        data-bs-toggle="modal"
                        data-bs-target="#quickViewModal"
                        onClick={() => seleccionarProducto(item.id)}
                      ></i>

                      <button className="boton-agregar-home boton-add-home" title="Añadir al carrito"
                        onClick={() => agregarCarrito(item, 1)}>ADD TO CART
                      </button>

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
              )
            }
            )}
        </div>
      </div>
    );
  };



  const showQuickView = () => {
    const precio = Number(productoSeleccionado?.precio)
    return (
      <div className="modal fade" id="quickViewModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <div className="row">
                <h3 className="modal-title fs-5" id="exampleModalLabel">{productoSeleccionado?.nombre}</h3>
                <div className="row">
                  <div className="col-sm-3 justify-content-start">{renderStars(productoSeleccionado?.rating ?? 0)}</div>
                  <div className="col-sm-3 producto-review">({productoSeleccionado?.review} Reviews)</div>
                </div>
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

            </div>
            <div className="modal-body">

              <div className="row">
                <div className="col-md">
                  <img src={productoSeleccionado?.imagen
                    ? API_URL + productoSeleccionado.imagen
                    : API_URL + "imagenes/nofoto.jpg"} className="img-fluid" alt="..." />
                </div>
                <div className="col-md">
                  <table className="table">
                    <tbody>


                      <tr>
                        <th>Categoría</th>
                        <td className="capitalize">{productoSeleccionado?.nombrecategoria}</td>
                      </tr>
                      <tr>
                        <th>Precio</th>
                        <td>S/
                          {precio === 0
                            ? precio.toFixed(2)
                            : precio.toFixed(2)
                          }
                        </td>
                      </tr>
                      <tr>
                        <th>Stock</th>
                        <td>{productoSeleccionado?.stock}</td>
                      </tr>
                      <tr>
                        <th>Descripcion</th>
                        <td>{productoSeleccionado?.descripcion}</td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Añadir al carrito</button>
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
    <section id="productos" className='padded-inverso '>
      <div className="container">
        <h2 id='titulo' className='center mb-2'>Latest Products</h2>
        <div className="row center mb-3">
          <article className="col-2">
            <Link className={`derecha ${categoriaSeleccionada === "primero" ? "active" : ""}`} to="#" onClick={() => setCategoriaSeleccionada("primero")}>New Arrival</Link>
          </article>
          <article className="col-1 ms-2 me-2">
            <Link className={`center ${categoriaSeleccionada === "segundo" ? "active" : ""}`} to="#" onClick={() => setCategoriaSeleccionada("segundo")}>Featured</Link>
          </article>
          <article className="col-2">
            <Link className={`izquierda ${categoriaSeleccionada === "tercero" ? "active" : ""}`} to="#" onClick={() => setCategoriaSeleccionada("tercero")}>Best Selling</Link>
          </article>
        </div>
        <div>
          {dibujarItems()}
          {showQuickView()}
        </div>
      </div>
    </section>
  )
}

export default Productos