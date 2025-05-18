import { API_URL } from "../utils";
import { useEffect, useState } from "react";
import { Articulo } from "../types/Articulo";
import { Link } from "react-router-dom";

interface ProductosProps {
    codigoCategoria: number;
}

function ProductosItems({ codigoCategoria }: ProductosProps) {
    const [listaArticulos, setListaArticulos] = useState<Articulo[]>([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState<Articulo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                setLoading(true);
                // Cambié el parámetro a idcategoria para consistencia
                const response = await fetch(`${API_URL}productos.php?idcategoria=${codigoCategoria}`);
                
                if (!response.ok) {
                    throw new Error('Error al cargar productos');
                }
                
                const data: Articulo[] = await response.json();
                setListaArticulos(data);
            } catch (error) {
                console.error("Error consultando datos:", error);
            } finally {
                setLoading(false);
            }
        };

        // Solo hacer fetch si codigoCategoria es válido
        if (codigoCategoria > 0) {
            fetchProductos();
        } else {
            setListaArticulos([]);
        }
    }, [codigoCategoria]);

    const seleccionarProducto = async (id: number) => {
        try {
            const response = await fetch(`${API_URL}productos.php?id=${id}`);
            if (!response.ok) {
                throw new Error('Error al cargar detalles del producto');
            }
            const data: Articulo[] = await response.json();
            setProductoSeleccionado(data[0]);
        } catch (error) {
            console.error("Error consultando datos:", error);
        }
    };

    const renderStars = (rating: number) => {
        return (
            <div className="center">
                {[...Array(5)].map((_, i) => (
                    <span 
                        key={i} 
                        className={`fa fa-star ${i < rating ? 'checked' : ''}`}
                    ></span>
                ))}
            </div>
        );
    };

    if (loading) {
        return <div className="text-center py-5">Cargando productos...</div>;
    }

    if (listaArticulos.length === 0) {
        return <div className="text-center py-5">No se encontraron productos en esta categoría</div>;
    }

    return (
        <div>
            <div id="cards-productos">
                <div className='row center'>
                    {listaArticulos.map(item => (
                        <div className='col-4 p-3' key={item.id}>
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
                                    <i 
                                        className="bi bi-eye icon-quick-view" 
                                        title="Vista rápida"
                                        data-bs-toggle="modal" 
                                        data-bs-target="#quickViewModal"
                                        onClick={() => seleccionarProducto(item.id)}
                                    ></i>
                                </div>

                                <p className='text-center fs-6'>{item.nombre || "Nombre no disponible"}</p>
                                {renderStars(item.rating)}
                                <p className='precio-produc center'>S/ {Number(item.precio).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal de vista rápida */}
            {productoSeleccionado && (
                <div className="modal fade" id="quickViewModal" tabIndex={-1} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title fs-5">{productoSeleccionado.nombre}</h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md">
                                        <img 
                                            src={productoSeleccionado.imagen
                                                ? `${API_URL}${productoSeleccionado.imagen}`
                                                : `${API_URL}imagenes/nofoto.jpg`} 
                                            className="img-fluid" 
                                            alt={productoSeleccionado.nombre} 
                                        />
                                    </div>
                                    <div className="col-md">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <th>Categoría</th>
                                                    <td>{productoSeleccionado.nombrecategoria || "No especificada"}</td>
                                                </tr>
                                                <tr>
                                                    <th>Precio</th>
                                                    <td>S/ {Number(productoSeleccionado.precio).toFixed(2)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary">Añadir al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductosItems;