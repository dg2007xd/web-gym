import './Productos.css'
import { Articulo } from '../types/Articulo'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Noticias() {

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("primero");

    const [listaArticulos, setListaArticulos] = useState<Articulo[]>([]);

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = () => {
        fetch("http://localhost/PHPgym/productos.php")
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


    const dibujarItems = () => {
        return (
            <div className='row center'>
                {
                    listaArticulos.map(item =>
                        <div className='col-3' key={item.id}>
                            <div className='sec-pro'>   
                                <div id='back-img' className='center container-fluid'>
                                    <img src={"http://localhost/PHPgym/" + item.imagen} className="img-fluid ps-3 pe-3 pt-3 pb-3" alt="..." />
                                </div>

                                <p className='center ms-4 me-4 fs-6 fsnombre'>{item.nombre}</p>
                                <div className="center">
                                    {renderStars(item.rating)}
                                </div>
                                <p className='precio-produc center'>{item.precio}</p>
                            </div>
                        </div>
                    )
                }
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