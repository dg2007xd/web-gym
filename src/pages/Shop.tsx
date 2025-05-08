import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader"
import Productos from "../components/Productos";

interface Categoria2 {
    idcategoria: number;
    nombre: string;
    descripcion: string;
    foto: string;
    total: number;
}

function Store() {

    const [listaCategorias, setListaCategorias] = useState<Categoria2[]>([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria2 | null>(null);

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = () => {
        fetch("https://servicios.campus.pe/categorias.php")
            .then(response => response.json())
            .then((data: Categoria2[]) => {
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


                {listaCategorias.map(item => (
                    <li key={item.idcategoria} 
                        className={"list-group-item" + (categoriaSeleccionada?.idcategoria === item.idcategoria ? " active" : "")}
                        title={item.descripcion}
                        onClick={() => seleccionarCategoria(item)}>
                        {item.nombre} ({item.total})
                    </li>
                ))}

            </ul>
        )
    }

    const seleccionarCategoria = (item: Categoria2) => {
        console.log(item);
        setCategoriaSeleccionada(item);
    }




    return (
        <>
            <PageHeader pageTitle="Tienda" />
            <section id="store" className='padded'>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <h3>Categorias</h3>
                            {dibujarLista()}
                        </div>
                        <div className="col-9">
                            <h3>{categoriaSeleccionada?.nombre}</h3>
                            <p>{categoriaSeleccionada?.descripcion}</p>
                            <Productos codigoCategoria={categoriaSeleccionada?.idcategoria || 0}/>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Store