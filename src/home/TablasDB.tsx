import { useEffect, useState } from 'react';
import { API_URL } from '../utils';
import './TablasDB.css';

interface Tproductos {
    id: number;
    nombre: string;
    precio: number;
    rating: number;
    imagen: string;
}
interface Tplanes {
    id: number;
    nombre: string;
    precio: number;
    descuento: string;
    imagen: string;
}

interface Tlocales {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
}

function TablasDB() {

    const [listaTablaPro, setTablaPro] = useState<Tproductos[]>([]);

    const [listaTablaPla, setTablaPla] = useState<Tplanes[]>([]);

    const [listaTablaLoc, setTablaLoc] = useState<Tlocales[]>([]);

    const [loadingProductos, setLoadingProductos] = useState(true);
    const [loadingPlanes, setLoadingPlanes] = useState(true);
    const [loadingLocales, setLoadingLocales] = useState(true);

    useEffect(() => {
        funcProductos();
    }, []);

    useEffect(() => {
        funcPlanes();
    }, []);

    useEffect(() => {
        funcLocales();
    }, []);

    const funcProductos = () => {
        fetch(API_URL + "productos.php")
            .then(response => response.json())
            .then((data: Tproductos[]) => {
                console.log(data);
                setTablaPro(data);
                setLoadingProductos(false);
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
    }

    const funcPlanes = () => {
        fetch(API_URL + "planes.php")
            .then(response => response.json())
            .then((data: Tplanes[]) => {
                console.log(data);
                setTablaPla(data);
                setLoadingPlanes(false);
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
    }

    const funcLocales = () => {
        fetch(API_URL + "locales.php")
            .then(response => response.json())
            .then((data: Tlocales[]) => {
                console.log(data);
                setTablaLoc(data);
                setLoadingLocales(false);
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
    }

    const dibujarPreCarga = () => {
        return (
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        )
    }

    const dibujarTablaProductos = () => {
        return (
            <div className="container">
                <h2 className='negro uppercase'>Tabla de Productos</h2>
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio S/</th>
                            <th>Rating <br /> (Estrellas)</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaTablaPro.map(item =>
                            <tr key={item.id}>
                                <td>{item.nombre}</td>
                                <td>{item.precio}</td>
                                <td>{item.rating}</td>
                                <td><img src={API_URL + item.imagen} className="img-tabla " alt="..." /></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    const dibujarTablaPlanes = () => {
        return (
            <div className="container">
                <h2 className='negro uppercase'>Tabla de Planes</h2>
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio S/</th>
                            <th>Descuento</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaTablaPla.map(item =>
                            <tr key={item.id}>
                                <td>{item.nombre}</td>
                                <td>{item.precio}</td>
                                <td>{item.descuento}</td>
                                <td><img src={API_URL + item.imagen} className="img-tabla " alt="..." /></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    const dibujarTablaLocales = () => {
        return (
            <div className="container">
                <h2 className='negro uppercase'>Tabla de Locales</h2>
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Direccion S/</th>
                            <th>Telefono</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaTablaLoc.map(item =>
                            <tr key={item.id}>
                                <td>{item.nombre}</td>
                                <td>{item.direccion}</td>
                                <td>{item.telefono}</td>
                                <td>{item.email}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }


    return (
        //Productos
        <section id="envios" className='padded'>
            {loadingProductos ? dibujarPreCarga() : dibujarTablaProductos()}

            {/* Planes */}
            {loadingPlanes ? dibujarPreCarga() : dibujarTablaPlanes()}

            {/* Locales */}
            {loadingLocales ? dibujarPreCarga() : dibujarTablaLocales()}

        </section>
    )
}

export default TablasDB