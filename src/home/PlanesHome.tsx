import './Planes.css'
import { useEffect, useState } from 'react';
import { API_URL } from '../utils';
import { Planes } from '../types/Planes';

function PlanesHome() {

    const [listaPlanes, setListaPlanes] = useState<Planes[]>([]);

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = () => {
        fetch(API_URL + "planes.php")
            .then(response => response.json())
            .then((data: Planes[]) => {
                console.log(data);
                setListaPlanes(data);
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
    }

    const mostrarItem = () => {

        return (
            <div className='row '>
                {
                    listaPlanes.map(item =>
                        <div className='col-4' key={item.id}>

                            <img src={API_URL + item.imagen} className="img-fluid" alt="..." />
                            <h1 className='caption Oswald text-planes ms-5 me-5'>{item.nombre}</h1>
                            <p className='descuento-plan caption-desc'>{item.descuento}</p>

                        </div>
                    )
                }
            </div>
        );
    };

    return (
        <section id="planes">
            
                <div className="padded-inverso text-center mt-5">
                    
                    {mostrarItem()}

                </div>
            
        </section>
    );
}

export default PlanesHome