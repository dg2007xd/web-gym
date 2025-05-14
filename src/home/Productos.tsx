import './Productos.css'
import { Articulo } from '../types/Articulo'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils';

interface ProductosProps {
    codigoCategoria: number;
}

function Noticias({ codigoCategoria }: ProductosProps) {
    console.log(codigoCategoria);

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("primero");

    const [listaArticulos, setListaArticulos] = useState<Articulo[]>([]);

    useEffect(() => {
        leerServicio(codigoCategoria);
    }, [codigoCategoria]);

    const leerServicio = async (id: number) => {
        /*
        fetch(API_URL + "productos.php")
            .then(response => response.json())
            .then((data: Articulo[]) => {
                console.log(data);
                setListaArticulos(data);
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
            */
        try {
            const response = await fetch(API_URL + "productos.php?id=" + id);
            const data: Articulo[] = await response.json();
            console.log(data);
            setListaArticulos(data);
        } catch (error) {
            console.log("Error consultando datos:", error);
        }
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


    const dibujarItems = () => {
        return (
            <div className='row center'>
                {listaArticulos.map(item => {
                    const nombre = String(item.nombre)
                    const precio = Number(item.precio)
                    return (
                        <div className='col-3' key={item.id}>
                            <div className='sec-pro'>
                                <div id='back-img' className='center container-fluid'>
                                    <img src={item.imagen === null
                                        ? API_URL + "img/nofoto.jpg"
                                        : API_URL + item.imagen} className="img-fluid ps-3 pe-3 pt-3 pb-3" alt="..." />
                                </div>
                                
                                <p className='center ms-4 me-4 fs-6 fsnombre'>{nombre || "Nombre no disponible"}</p>
                                <div className="center">
                                    {renderStars(item.rating)}
                                </div>
                                <p className='precio-produc center'>S/ {precio}</p>
                            </div>
                        </div>
                    )}
                )}
            </div>
        );
    };

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
                </div>
            </div>
        </section>
    )
}

export default Noticias