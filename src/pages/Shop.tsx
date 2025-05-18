import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import ProductosItems from "../components/ProductosItems";
import { API_URL } from "../utils";
import { Categoria } from "../types/Categoria";

function Shop() {
    const [listaCategorias, setListaCategorias] = useState<Categoria[]>([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);
    

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = () => {
        fetch(API_URL + "categoria.php")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then((data: Categoria[]) => {
                console.log("Datos recibidos:", data);
                setListaCategorias(data);
                // No establecer categoría por defecto al inicio
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
    }

    const dibujarLista = () => {
        if (listaCategorias.length === 0) {
            return <div className="text-muted">Cargando categorías...</div>;
        }

        return (
            <ul className="list-group">
                {listaCategorias
                    .filter(item => item.total > 0)
                    .map(item => (
                        <li 
                            key={item.idcategoria}
                            className={`list-group-item ${categoriaSeleccionada?.idcategoria === item.idcategoria ? "active" : ""}`}
                            onClick={() => seleccionarCategoria(item)}
                            style={{ cursor: 'pointer' }}
                        >
                            {item.nombrecategoria} ({item.total})
                        </li>
                    ))}
            </ul>
        );
    }

    const seleccionarCategoria = (item: Categoria) => {
        console.log("Categoría seleccionada:", item);
        setCategoriaSeleccionada(item);
         // Activamos el filtrado
    }

    return (
        <>
            <PageHeader pageTitle="Tienda" />
            <section id="store" className='padded padded-inverso'>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <h3>Categorías</h3>
                            {dibujarLista()}
                        </div>
                        <div className="col-9">
                            <h3>
                                {categoriaSeleccionada ? 
                                    `Mostrando productos de ${categoriaSeleccionada.nombrecategoria}` : 
                                    "Seleccione una categoría"}
                            </h3>
                            {categoriaSeleccionada && (
                                <ProductosItems 
                                    codigoCategoria={categoriaSeleccionada.idcategoria} 
                                    key={categoriaSeleccionada.idcategoria} // Forzar re-render al cambiar categoría
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Shop;