import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import ProductosItems from "../components/ProductosItems";
import { API_URL } from "../utils";
import { Categoria } from "../types/Categoria";

function Shop() {
    const [listaCategorias, setListaCategorias] = useState<Categoria[]>([]);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<Categoria[]>([]);
    const [totalGeneral, setTotalGeneral] = useState(0);

    useEffect(() => {
        leerServicio();
        // Obtener el total general de productos
        fetch(API_URL + "productos.php?total=1")
            .then(res => res.json())
            .then(data => setTotalGeneral(data.total));
    }, []);

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = () => {
        fetch(API_URL + "categoria.php")
            .then(response => response.json())
            .then((data: Categoria[]) => {
                console.log(data);
                setListaCategorias(data);
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
    }

    const dibujarLista = () => {
        return (
            <ul className="list-group">
                {listaCategorias.map(item => {
                    const seleccionada = categoriasSeleccionadas.some(cat => cat.idcategoria === item.idcategoria);
                    return (
                        <li
                            key={item.idcategoria}
                            className={"list-group-item" + (seleccionada ? " active" : "")}
                            onClick={() => toggleCategoria(item)}
                            style={{ cursor: "pointer" }}
                        >
                            {item.nombrecategoria} ({item.total})
                        </li>
                    );
                })}
            </ul>
        );
    }

    const toggleCategoria = (item: Categoria) => {
        setCategoriasSeleccionadas(prev => {
            if (prev.some(cat => cat.idcategoria === item.idcategoria)) {
                // Quitar si ya está seleccionada
                return prev.filter(cat => cat.idcategoria !== item.idcategoria);
            } else {
                // Agregar si no está seleccionada
                return [...prev, item];
            }
        });
    };

    return (
        <>
            <PageHeader pageTitle="Shop" />
            <section id="store" className='padded padded-inverso-shop'>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <h3>Categorias</h3>
                            {dibujarLista()}
                        </div>
                        <div className="col-9">
                            <h3>
                                Mostrando productos de {categoriasSeleccionadas.length} categoría(s)
                                {totalGeneral > 0 && (
                                    <span className="ms-2 text-muted">
                                        (Total productos: {totalGeneral})
                                    </span>
                                )}
                            </h3>
                            {categoriasSeleccionadas.length > 0 && (
                                <ProductosItems codigosCategoria={categoriasSeleccionadas.map(cat => cat.idcategoria)} />
                            )}
                        </div>
                    </div>

                </div>
            </section>

        </>
    )
}

export default Shop;