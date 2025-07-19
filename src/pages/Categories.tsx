import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader"
import { Ejercicio } from "../types/Ejercicio";
import { API_URL } from "../utils";
import './Categories.css';


function Categories() {
    const [listaEjercicios, setListaEjercicios] = useState<Ejercicio[]>([]);
    const [idejercicio, setIdejercicio] = useState(0)
    const [nombre, setNombre] = useState("")
    const [categoria_beneficio, setCategoria_Beneficio] = useState("")
    const [tipo_ejercicio, setTipo_Ejercicio] = useState("")
    const [equipo_necesario, setEquipo_Necesario] = useState("")

    const [loading, setLoading] = useState(true);

    const [filasPagina, setFilasPagina] = useState(10)
    const [numeroPagina, setNumeroPagina] = useState(1)
    const [totalFilas, setTotalFilas] = useState(0)
    const [totalPaginas, setTotalPaginas] = useState(0)


    useEffect(() => {
        leerServicio();
    }, [numeroPagina, filasPagina]);

    const leerServicio = async () => {
        try {
            const response = await fetch(`${API_URL}ejerciciospaginacion.php?pagina=${numeroPagina}&filasPagina=${filasPagina}`);
            const data: { total_rows: number, data: Ejercicio[] } = await response.json();
            setTotalFilas(data.total_rows);
            setListaEjercicios(data.data);
            const tPaginas = Math.ceil(data.total_rows / filasPagina);
            setTotalPaginas(tPaginas);
            setLoading(false)
        } catch (error) {
            console.error("Error consultando datos:", error);
        }
    }


    const retroceder = () => {
        if (numeroPagina > 1) {
            setNumeroPagina(numeroPagina - 1)
        }
    }

    const avanzar = () => {
        if (numeroPagina < totalPaginas) {
            setNumeroPagina(numeroPagina + 1)
        }
    }

    const dibujarNumerosPagina = () => {
        return (
            <>
                {Array.from({ length: totalPaginas }, (_, index) => {
                    return (
                        <li key={index} className={`page-item ${index + 1 === numeroPagina ? "active" : ""}`}>
                            <a className="page-link" href="#" onClick={() => {
                                setNumeroPagina(index + 1)
                            }}>
                                {index + 1}
                            </a>
                        </li>
                    )
                })

                }
            </>
        )
    }

    const dibujarPaginacion = () => {
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={`page-item ${numeroPagina === 1 ? "disabled" : ""}`}>
                        <a className="page-link" href="#" onClick={() => retroceder()}>
                            Anterior
                        </a>
                    </li>

                    {dibujarNumerosPagina()}

                    <li className={`page-item ${numeroPagina === totalPaginas ? "disabled" : ""}`}>
                        <a className="page-link" href="#" onClick={() => avanzar()}>
                            Siguiente
                        </a>
                    </li>
                </ul>
            </nav>

        )
    }


    const dibujarTabla = () => {
        return (
            <table className="table font-Open">
                <thead>
                    <tr>
                        <th className="Toptable">Código</th>
                        <th className="Toptable">Nombre</th>
                        <th className="Toptable">Beneficio</th>
                        <th className="Toptable">Tipo de Ejercicio</th>
                        <th className="Toptable">Equipo Necesario</th>
                        <th className="Toptable"></th>
                        <th className="Toptable"></th>
                    </tr>
                </thead>
                <tbody>
                    {

                        listaEjercicios.map(item =>
                            <tr key={item.idejercicio}>

                                <td>{item.idejercicio}</td>
                                <td>{item.nombre}</td>
                                <td>{item.categoria_beneficio}</td>
                                <td>{item.tipo_ejercicio}</td>
                                <td>{item.equipo_necesario}</td>

                                <td><i className="bi bi-pencil" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasUpdate" style={{ cursor: "pointer" }}
                                    onClick={() => seleccionarEjercicio(item)}></i></td>
                                <td><i className="bi bi-trash3" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasDelete" style={{ cursor: "pointer" }}
                                    onClick={() => seleccionarEjercicio(item)}></i></td>
                            </tr>
                        )

                    }
                </tbody>
            </table>
        )
    }

    const asignarFilasPaginar = () => {
        return (
            <select className="form-select w-auto d-inline ms-2"
                value={filasPagina} onChange={(cambio) => {
                    setFilasPagina(Number(cambio.target.value))
                    setNumeroPagina(1)
                }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>
        )
    }

    const seleccionarEjercicio = (director: Ejercicio) => {
        setIdejercicio(director.idejercicio)
        setNombre(director.nombre)
        setCategoria_Beneficio(director.categoria_beneficio)
        setTipo_Ejercicio(director.tipo_ejercicio)
        setEquipo_Necesario(director.equipo_necesario)
    }


    {/*INSERT*/ }
    const insertEjercicio = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        console.log(nombre, categoria_beneficio, tipo_ejercicio, equipo_necesario)

        const formData = new FormData()
        formData.append("nombre", nombre)
        formData.append("categoria_beneficio", categoria_beneficio)
        formData.append("tipo_ejercicio", tipo_ejercicio)
        formData.append("equipo_necesario", equipo_necesario)

        try {
            const response = await fetch(API_URL + "ejerciciosinsert.php", {
                method: "POST",
                body: formData
            })
            const data: string = await response.text()
            console.log(data)

            leerServicio();
            const botonCerrar = document.querySelector("#offcanvasInsert .btn-close") as HTMLElement
            botonCerrar.click()

            setNombre("")
            setCategoria_Beneficio("")
            setTipo_Ejercicio("")
            setEquipo_Necesario("")
        }
        catch (error) {
            console.error("Error al registrar un nuevo director ", error)
        }

    }

    const dibujarInsertModal = () => {
        return (
            <div
                className="offcanvas offcanvas-end"
                tabIndex={-1}
                id="offcanvasInsert"
                aria-labelledby="offcanvasRightLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">
                        Nuevo Ejercicio
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    />
                </div>
                <div className="offcanvas-bodyCategories">
                    <form onSubmit={(event) => insertEjercicio(event)}>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Nombre del Ejercicio"
                                value={nombre} onChange={event => setNombre(event.target.value)} required minLength={4} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Beneficio"
                                value={categoria_beneficio} onChange={event => setCategoria_Beneficio(event.target.value)} required minLength={2} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Tipo de Ejercicio"
                                value={tipo_ejercicio} onChange={event => setTipo_Ejercicio(event.target.value)} required minLength={2} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Equipo Necesario"
                                value={equipo_necesario} onChange={event => setEquipo_Necesario(event.target.value)} required minLength={2} />
                        </div>
                        <div className="mb-3">
                            <button className="btn boton-color2" type="submit">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }


    {/*UPDATE*/ }
    const updateEjecicio = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        console.log(nombre, categoria_beneficio, tipo_ejercicio, equipo_necesario)

        const formData = new FormData()
        formData.append("idejercicio", idejercicio.toString())
        formData.append("nombre", nombre)
        formData.append("categoria_beneficio", categoria_beneficio)
        formData.append("tipo_ejercicio", tipo_ejercicio)
        formData.append("equipo_necesario", equipo_necesario)

        try {
            const response = await fetch(API_URL + "ejerciciosupdate.php", {
                method: "POST",
                body: formData
            })
            const data: string = await response.text()
            console.log(data)

            leerServicio();
            const botonCerrar = document.querySelector("#offcavasUpdate .btn-close") as HTMLElement
            botonCerrar.click()

            setIdejercicio(0)
            setNombre("")
            setCategoria_Beneficio("")
            setTipo_Ejercicio("")
            setEquipo_Necesario("")
        }
        catch (error) {
            console.error("Error al actualizar los datos del director ", error)
        }

    }

    const dibujarUpdateModal = () => {
        return (
            <div
                className="offcanvas offcanvas-end"
                tabIndex={-1}
                id="offcanvasUpdate"
                aria-labelledby="offcanvasRightLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">
                        Actualizar Ejercicio
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    />
                </div>
                <div className="offcanvas-bodyCategories">
                    <form onSubmit={(event) => updateEjecicio(event)}>
                        <div className="mb-3">
                            <input type="text" className="form-control" readOnly value={idejercicio} />
                        </div>

                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Nombre del Director"
                                value={nombre} onChange={event => setNombre(event.target.value)} required minLength={4} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Beneficio"
                                value={categoria_beneficio} onChange={event => setCategoria_Beneficio(event.target.value)} required minLength={2} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Tipo de Ejercicio"
                                value={tipo_ejercicio} onChange={event => setTipo_Ejercicio(event.target.value)} required minLength={2} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Equipo Necesario"
                                value={equipo_necesario} onChange={event => setEquipo_Necesario(event.target.value)} required minLength={2} />
                        </div>
                        <div className="mb-3">
                            <button className="btn boton-color2" type="submit">Actualizar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }


    {/*DELETE*/ }
    const deleteEjercicio = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("idejercicio", idejercicio.toString());
        formData.append("categoria_beneficio", categoria_beneficio.toString());
        formData.append("tipo_ejercicio", tipo_ejercicio.toString());
        formData.append("equipo_necesario", equipo_necesario.toString());


        try {
            const response = await fetch(API_URL + "ejerciciosdelete.php", {
                method: "POST",
                body: formData
            });
            const data = await response.text();
            console.log(data);

            leerServicio();
            const botonCerrar = document.querySelector("#offcanvasDelete .btn-close") as HTMLElement;
            if (botonCerrar) botonCerrar.click();

            setIdejercicio(0);
            setNombre("");
            setCategoria_Beneficio("");
            setTipo_Ejercicio("");
            setEquipo_Necesario("");
        } catch (error) {
            console.error("Error al eliminar el director", error);
        }
    }

    const dibujarDeleteModal = () => (
        <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasDelete"
            aria-labelledby="offcanvasDeleteLabel"
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasDeleteLabel">
                    Eliminar Director
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                />
            </div>
            <div className="offcanvas-bodyCategories">
                <form onSubmit={(event) => deleteEjercicio(event)}>
                    <h6 className="mb-3 negro">¿Está seguro de eliminar el director?</h6>
                    <div className="mb-3">
                        <input type="text" className="form-control mb-2" readOnly value={idejercicio} />
                        <input type="text" className="form-control mb-2" readOnly value={nombre} />
                        <input type="text" className="form-control mb-2" readOnly value={categoria_beneficio} />
                        <input type="text" className="form-control mb-2" readOnly value={tipo_ejercicio} />
                        <input type="text" className="form-control mb-2" readOnly value={equipo_necesario} />
                    </div>
                    <div className="mb-3">
                        <button className="btn boton-color-danger" type="submit">Eliminar</button>
                    </div>
                </form>
            </div>
        </div>
    );

    const dibujarPreCarga = () => {
        return (
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        )
    }

    return (
        <>
            <PageHeader pageTitle="Categories" />
            <section id="categories" className='padded padded-inverso'>
                <div className="container">
                    <div className="mb-3">
                        <button className="btn boton-color2" type="button"
                            //Esto es para llamar la funcion de bootstrap
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasInsert"
                        >Agregar Ejercicio</button>
                    </div>

                    <div className="d-flex justify-content-between">
                        {dibujarPaginacion()}
                        <div className="negro">Número de Filas
                            {asignarFilasPaginar()}
                        </div>
                    </div>
                    {loading ? dibujarPreCarga() : dibujarTabla()}
                    <div className="negro">
                        {"Total de filas: " + totalFilas}
                    </div>

                    {dibujarInsertModal()}
                    {dibujarUpdateModal()}
                    {dibujarDeleteModal()}

                </div>
            </section>
        </>
    )
}

export default Categories