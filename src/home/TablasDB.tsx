import { useEffect, useState } from 'react';


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
    direccion: number;
    telefono: string;
    email: string;
}

function TablasDB() {

    const [listaTablaPro, setTablaPro] = useState<Tproductos[]>([]);

    const [listaTablaPla, setTablaPla] = useState<Tplanes[]>([]);

    const [listaTablaLoc, setTablaLoc] = useState<Tlocales[]>([]);

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
        fetch("http://localhost/PHPgym/productos.php")
            .then(response => response.json())
            .then((data: Tproductos[]) => {
                console.log(data);
                setTablaPro(data);
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
    }

    const funcPlanes = () => {
        fetch("http://localhost/PHPgym/planes.php")
            .then(response => response.json())
            .then((data: Tplanes[]) => {
                console.log(data);
                setTablaPla(data);
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
    }

    const funcLocales = () => {
        fetch("http://localhost/PHPgym/locales.php")
            .then(response => response.json())
            .then((data: Tlocales[]) => {
                console.log(data);
                setTablaLoc(data);
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
    }



    return (
        //Productos
        <section id="envios" className='padded'>
            <div className="container">
                <h2>Tabla de Productos</h2>
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio S/</th>
                            <th>Rating(Estrellas)</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaTablaPro.map(item =>
                            <tr key={item.id}>
                                <td>{item.nombre}</td>
                                <td>{item.precio}</td>
                                <td>{item.rating}</td>
                                <td><img src={"http://localhost/PHPgym/" + item.imagen} className="img-tabla " alt="..." /></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            
            {/* Planes */}
            <div className="container">
                <h2>Tabla de Planes</h2>
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
                                <td><img src={"http://localhost/PHPgym/" + item.imagen} className="img-tabla " alt="..." /></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Locales */}
            <div className="container">
                <h2>Tabla de Locales</h2>
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

        </section>
    )
}

export default TablasDB