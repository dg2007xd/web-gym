import { agregarCarrito, API_URL } from "../utils";
import { useEffect, useState } from "react";
import { Articulo } from "../types/Articulo";
import { Link } from "react-router-dom";
import './ProductosItems.css'


function ProductosItems({
    codigosCategoria,
    mostrarPorDefecto = false,
    setTotalFiltrado,
    mostrarTodos,
    setMostrarTodos
}: {
    codigosCategoria: number[],
    mostrarPorDefecto?: boolean,
    setTotalFiltrado: (n: number) => void,
    mostrarTodos: boolean,
    setMostrarTodos: (v: boolean) => void
}) {

    const [listaArticulos, setListaArticulos] = useState<Articulo[]>([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState<Articulo | null>(null);


    useEffect(() => {
        // Solo resetea cuando cambian las categorías seleccionadas o el modo por defecto

        if (codigosCategoria.length === 0 && mostrarPorDefecto) {
            leerServicioPorDefecto();
            return;
        }
        if (codigosCategoria.length === 0) {
            setListaArticulos([]);
            setTotalFiltrado(0);
            return;
        }
        leerServicio(codigosCategoria);
        // eslint-disable-next-line
    }, [codigosCategoria, mostrarPorDefecto]);

    const leerServicio = async (idsCategoria: number[]) => {
        try {
            const response = await fetch(API_URL + "productos.php?idcategoria=" + idsCategoria.join(","));
            const data: Articulo[] = await response.json();
            setListaArticulos(data);
            setTotalFiltrado(data.length);
        } catch (error) {
            setTotalFiltrado(0);
        }
    };

    const leerServicioPorDefecto = async () => {
        try {
            const response = await fetch(API_URL + "productos.php");
            const data: Articulo[] = await response.json();
            setListaArticulos(data);
            setTotalFiltrado(data.length);
        } catch (error) {
            setTotalFiltrado(0);
        }
    };

    const articulosMostrados = mostrarTodos ? listaArticulos : listaArticulos.slice(0, 12);

    const dibujarLista = () => {
        return (
            <div id="cards-productos">
                <div className='row center'>
                    {articulosMostrados.map(item => (
                        <div className='cont-artic p-3' key={item.id}>
                            <div className='sec-pro card h-100'>
                                {/* ...resto del render de producto igual... */}
                                <div id='back-img-shop' className='center container-fluid'>
                                    <Link to={`/productodetalle/${item.id}`}>
                                        <img
                                            src={item.imagen
                                                ? `${API_URL}${item.imagen}`
                                                : `${API_URL}img/nofoto.jpg`}
                                            className="img-fluid p-3"
                                            width={250}
                                            height={250}
                                            alt={item.nombre}
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
                                    <button className="boton-agregar-shop boton-add" title="Añadir al carrito"
                                        onClick={() => agregarCarrito(item, 1)}>ADD TO CART
                                    </button>
                                </div>
                                <div className=" card-body">
                                    <p className='text-center fs-6 mt-0 mb-0'>{item.nombre || "Nombre no disponible"}</p>
                                    <div className="center">{renderStars(item.rating)}</div>
                                    <p className='precio-produc center'>S/ {Number(item.precio).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Botón Ver más */}
                {listaArticulos.length > 12 && !mostrarTodos && (
                    <div className="text-center mt-3">
                        <button className="btn btn-primary ver-boton" onClick={() => setMostrarTodos(true)}>
                            Ver más
                        </button>
                    </div>
                )}
            </div>
        )
    }

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

    const renderStars = (rating: number) => {
        return (
            <div>
                {[...Array(5)].map((_, i) => (
                    <span
                        key={i}
                        className={`fa fa-star ${i < rating ? 'checked' : ''}`}
                    ></span>
                ))}
            </div>
        );
    };


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
        <>
            {dibujarLista()}
            {showQuickView()}
        </>
    );
}

export default ProductosItems;