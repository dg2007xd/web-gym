import { useEffect, useRef, useState } from "react";
import PageHeader from "../components/PageHeader"
import { Session } from "../types/Session";
import { API_URL } from "../utils";
import "./Sessions.css";
import axios from "axios";

function Sessions() {
    const [listaSessions, setListaSessions] = useState<Session[]>([]);
    const [filasPagina] = useState(25);
    const [numero_pagina, setNumeroPagina] = useState(1);

    const bloquearRef = useRef(false);

    useEffect(() => {
        leerServicio(numero_pagina);
    }, [numero_pagina]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !bloquearRef.current) {
                bloquearRef.current = true;
                setNumeroPagina(prev => prev + 1);
            }
        }
        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    });

    const leerServicio = async (pagina: number) => {
        try {
            const response = await axios.get(`${API_URL}sesiones.php?filas_pagina=${filasPagina}&numero_pagina=${pagina}`)
            const data = response.data
            let nuevaLista = [...listaSessions, ...data.sesiones];
            setListaSessions(nuevaLista);
        }
        catch (error) {
            console.error("Error consultando datos:", error);
        }
        finally {
            bloquearRef.current = false;
        }
    }


    const dibujarTabla = () => {
        return (
            <>
                {/* Sesiones */}
                <div className="row fw-bold border-bottom p-2 mb-2">
                    <div className="col-1 text-center">No. Sesión</div>
                    <div className="col-2 text-start">Cliente</div>
                    <div className="col-1 text-start">Edad</div>
                    <div className="col-2 text-center">Fecha de sesión</div>
                    <div className="col-2">Entrenador</div>
                    <div className="col-2">Especialidad del entrenador</div>
                    <div className="col-2 text-center">Experiencia del entrenador</div>

                </div>

                {
                    listaSessions.map(item => {
                        let total = 0
                        return (<>
                            <div className="row border-bottom p-1" key={item.idsesion} data-bs-toggle="collapse" data-bs-target={"#collapseSession" + item.idsesion}>

                                <div className="col-1 text-center">{item.idsesion}</div>
                                <div className="col-2 text-start">{item.nombre_cliente}</div>
                                <div className="col-1 text-start">{item.edad_cliente}</div>
                                <div className="col-2 text-center">{new Date(item.fechasesion).toLocaleDateString("es-PE")}</div>
                                <div className="col-2">{item.nombre_entrenador}</div>
                                <div className="col-2">{item.especialidad_entrenador}</div>
                                <div className="col-2 text-center">{item.experiencia_entrenador} años</div>
                            </div>


                            {/* Detalles */}
                            <div className="collapse" id={"collapseSession" + item.idsesion}>
                                <div className="card card-body">
                                    <div className="row fw-bold">
                                        <div className="col-1 text-center">Cod</div>
                                        <div className="col-2">Nombre del servicio</div>
                                        <div className="col-3">Descripcion</div>
                                        <div className="col-1 text-end">Precio x hora</div>
                                        <div className="col-2 text-end">Duracion en horas</div>
                                        <div className="col-1 text-end">Subtotal</div>

                                    </div>
                                    {
                                        item.detalle.map(itemDetalle => {
                                            const subtotal = itemDetalle.precioxhora * itemDetalle.duracion_horas
                                            total += subtotal;
                                            return (
                                                <div className="row" key={itemDetalle.idservicio}>

                                                    <div className="col-1 text-center">{itemDetalle.idservicio}</div>
                                                    <div className="col-2">{itemDetalle.nombreservicio}</div>
                                                    <div className="col-3">{itemDetalle.descripcion}</div>
                                                    <div className="col-1 text-end">{Number(itemDetalle.precioxhora).toFixed(2)}</div>
                                                    <div className="col-2 text-end">{itemDetalle.duracion_horas}</div>
                                                    <div className="col-1 text-end">{subtotal.toFixed(2)}</div>
                                                </div>
                                            )
                                        }
                                        )
                                    }
                                    <div className="row fw-bold mt-3 text-color2">
                                        <div className="col-9 text-end">Total</div>
                                        <div className="col-1 text-end">{total.toFixed(2)}</div>

                                    </div>
                                </div>
                            </div>
                        </>)
                    }
                    )}
            </>
        )
    }

    return (
        <>
            <PageHeader pageTitle="Sessions" />
            <section id="sessions" className='padded'>
                <div className="container">
                    {dibujarTabla()}
                </div>
            </section>
        </>
    )
}

export default Sessions