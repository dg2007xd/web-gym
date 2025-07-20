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

  const [loading, setLoading] = useState(true);

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
        setLoading(false);
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
        <div className={'row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 justify-content-center ' + (loading ? "d-none" : "")}>
          {productosRandom.map(item => {
            const nombre = String(item.nombre);
            const precio = Number(item.precio);
            return (
              <div className='col-6 col-md-3 p-3' key={item.id}>
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


  const dibujarPrecarga = () => {
    const placeholders = Array.from({ length: 8 })
    return (
        <div id="cards-productos">
        <div className={'row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 justify-content-center '
            + (loading ? "" : "d-none")}>

            {placeholders.map((_, index) =>
                <div className="col-6 col-md-3 p-3" key={index}>
                    <div className="card">
                        <div className="skeleton-img"></div>
                        <div className="card-body">
                            <div className="skeleton-line skeleton-title"> </div>
                            <div className="skeleton-stars"> </div>
                            <div className="skeleton-line skeleton-subtitle"> </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </div>
    )
}


  const showQuickView = () => {
        const precio = Number(productoSeleccionado?.precio);
        return (
            <div className="modal fade" id="quickViewModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-body p-0">
                            <div className="quickview-all">
                                {/* Imagen izquierda */}
                                <div className="quickview-left d-flex align-items-center justify-content-center">
                                    <img
                                        src={productoSeleccionado?.imagen
                                            ? API_URL + productoSeleccionado.imagen
                                            : API_URL + "imagenes/nofoto.jpg"}
                                        className="img-fluid img-quickview"
                                        alt={productoSeleccionado?.nombre}
                                        
                                    />
                                </div>
                                {/* Info derecha */}
                                <div className="quickview-right p-4">
                                    <h4 className="fw-bold mb-2">{productoSeleccionado?.nombre}</h4>
                                    <div className="d-flex align-items-center mb-2">
                                        <div>{renderStars(productoSeleccionado?.rating ?? 0)}</div>
                                        <a
                                            href="#"
                                            className="ms-2 producto-review"
                                        >
                                            ({productoSeleccionado?.review ?? 0} review{(productoSeleccionado?.review ?? 0) !== 1 ? "s" : ""})
                                        </a>
                                    </div>
                                    <div className="mb-3 precio-design">
                                        S/ {precio.toFixed(2)}
                                    </div>
                                    <div className="mb-3 desc-text">
                                        {productoSeleccionado?.descripcion}
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button
                                            type="button"
                                            className="btn mb-2 uppercase boton-quickview"
                                            onClick={() => productoSeleccionado && agregarCarrito(productoSeleccionado, 1)}
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                    <div className="gris capitalize">
                                        Categoria: {productoSeleccionado?.nombrecategoria}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


  return (
    <section id="productos" className='padded-inverso mt-5'>
      <div className="container">
        <h2 id='titulo' className='center mb-2'>Latest Products</h2>
        <div className="col center mb-3">
          <article className="col-3 col-md-2">
            <Link className={`derecha ${categoriaSeleccionada === "primero" ? "active" : ""}`} to="#" onClick={() => setCategoriaSeleccionada("primero")}>New Arrival</Link>
          </article>
          <article className="col-3 col-md-1 ms-4 me-4">
            <Link className={`center ${categoriaSeleccionada === "segundo" ? "active" : ""}`} to="#" onClick={() => setCategoriaSeleccionada("segundo")}>Featured</Link>
          </article>
          <article className="col-3 col-md-2">
            <Link className={`izquierda ${categoriaSeleccionada === "tercero" ? "active" : ""}`} to="#" onClick={() => setCategoriaSeleccionada("tercero")}>Best Selling</Link>
          </article>
        </div>
        <div>
          {dibujarPrecarga()}
          {dibujarItems()}
          {showQuickView()}
        </div>
      </div>
    </section>
  )
}


export default Productos