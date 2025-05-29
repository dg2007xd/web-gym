import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import ProductosItems from "../components/ProductosItems";
import { API_URL } from "../utils";
import { Categoria } from "../types/Categoria";

function Shop() {
    const [listaCategorias, setListaCategorias] = useState<Categoria[]>([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);
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
                setCategoriaSeleccionada(data[0]);
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
    }

    const dibujarLista = () => {
        return (
            <ul className="list-group">

                {listaCategorias.map(item => (
                    <li key={item.idcategoria}
                        className={"list-group-item" + (categoriaSeleccionada?.idcategoria === item.idcategoria ? " active" : "")}

                        onClick={() => seleccionarCategoria(item)}>
                        {item.nombrecategoria} ({item.total})
                    </li>
                ))}

            </ul>
        )
    }

    const seleccionarCategoria = (item: Categoria) => {
        console.log(item);
        setCategoriaSeleccionada(item);
    }

    return (
        <>
            <PageHeader pageTitle="Shop" />
            <section id="store" className='padded padded-inverso'>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <h3>Categorias</h3>
                            {dibujarLista()}
                        </div>
                        <div className="col-9">
                            <h3>
                                Mostrando 1–{categoriaSeleccionada?.total || 0} de {totalGeneral} resultados
                            </h3>

                            <ProductosItems codigoCategoria={categoriaSeleccionada?.idcategoria || 0} />
                        </div>
                    </div>

                </div>
            </section>

        </>
    )
}

export default Shop;