import { agregarCarrito, API_URL } from "../utils";
import { useEffect, useState } from "react";
import { Articulo } from "../types/Articulo";
import { Link } from "react-router-dom";
import './ProductosItems.css'


function ProductosItems({
    codigosCategoria,
    mostrarPorDefecto = false,
    setTotalFiltrado,
}: {
    codigosCategoria: number[],
    mostrarPorDefecto?: boolean,
    setTotalFiltrado: (n: number) => void,
}) {

    const [listaArticulos, setListaArticulos] = useState<Articulo[]>([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState<Articulo | null>(null);

    const [opcionSeleccionada, setOpcionSeleccionada] = useState(0)

    const [loading, setLoading] = useState(true);
    const [imagenesCargadas, setImagenesCargadas] = useState(0);


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

    }, [codigosCategoria, mostrarPorDefecto]);

    useEffect(() => {
        ordenarListaProductos(opcionSeleccionada)
    }, [opcionSeleccionada])

    useEffect(() => {
        if(listaArticulos.length > 0 && imagenesCargadas === listaArticulos.length) {
            setLoading(false);
        }
    })


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
    

    const dibujarLista = () => {
        return (
            <div id="cards-productos">
                <div className={'row justify-content-center row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 ' + (loading ? "d-none" : "")}>

                    {listaArticulos.map(item => (
                        <div className='col p-3' key={item.id}>
                            <div className='sec-pro card h-100'>

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
                                            onLoad={() => setImagenesCargadas(contar => contar + 1)}
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
                
                    <div className="text-center mt-3">
                        <button className="btn btn-primary ver-boton" >
                            Ver más
                        </button>
                    </div>
                
            </div>
        )
    }

    const dibujarPrecarga = () => {
        const placeholders = Array.from({ length: 12 })
        return (
            <div className={'row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 '
                + (loading ? "" : "d-none")}>

                {placeholders.map((_, index) =>
                    <div className="col p-3" key={index}>
                        <div className="card">
                            <div className="skeleton-img"></div>
                            <div className="card-body">
                                <div className="skeleton-line skeleton-title"> </div>
                                <div className="skeleton-line skeleton-subtitle"> </div>
                            </div>
                        </div>
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

    const ordenarListaProductos = (criterio: Number) => {
        const productosOrdenados = Array.from(listaArticulos)

        switch (criterio) {
            case 0:
                productosOrdenados.sort((a, b) => Number(a.id) - Number(b.id))
                break
            case 1:
                productosOrdenados.sort((a, b) => Number(b.id) - Number(a.id))
                break
            case 2:
                productosOrdenados.sort((a, b) => Number(a.precio) - Number(b.precio))
                break
            case 3:
                productosOrdenados.sort((a, b) => Number(b.precio) - Number(a.precio))
                break
        }
        setListaArticulos(productosOrdenados)
    }

    const dibujarOrdenarPor = () => {
        return (
            <select className="form-select mb-3 w-auto"
                value={opcionSeleccionada} onChange={(event) => setOpcionSeleccionada(Number(event.target.value))}>
                <option value={0}>Mas antiguo</option>
                <option value={1}>Reciente</option>
                <option value={2}>Precio mas bajo</option>
                <option value={3}>Precio mas alto</option>
            </select>
        )
    }

    return (
        <>
            {dibujarOrdenarPor()}
            {dibujarPrecarga()}
            {dibujarLista()}
            {showQuickView()}
        </>
    );
}

export default ProductosItems;