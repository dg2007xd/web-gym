import { agregarCarrito, API_URL } from "../utils";
import { useEffect, useState } from "react";
import { Articulo } from "../types/Articulo";
import { Link } from "react-router-dom";
import './ProductosItems.css'

interface ProductosProps {
    codigoCategoria: number;
}

function ProductosItems({ codigoCategoria }: ProductosProps) {
    console.log(codigoCategoria);
    const [listaArticulos, setListaArticulos] = useState<Articulo[]>([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState<Articulo | null>(null);


    useEffect(() => {
        leerServicio(codigoCategoria);
    }, [codigoCategoria]);

    const leerServicio = async (idcategoria: number) => {

        try {
            const response = await fetch(API_URL + "productos.php?idcategoria=" + idcategoria)
            const data: Articulo[] = await response.json();
            console.log(data);
            setListaArticulos(data);
        } catch (error) {
            console.log("Error consultando datos:", error);
        }
    }


    const dibujarLista = () => {
        return (
            <div id="cards-productos">
                <div className='row center'>
                    {listaArticulos.map(item => (
                        <div className='cont-artic p-3' key={item.id}>
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
                                    <p className='precio-produc center'>S/ {Number(item.precio).toFixed(2)}

                                    </p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
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
        <>
            {dibujarLista()}
            {showQuickView()}
        </>
    );
}

export default ProductosItems;