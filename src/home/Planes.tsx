import './Planes.css'
import { Categoria } from '../types/Categoria';
import { useEffect, useState } from 'react';

function Nosotros() {

    const [listaCategorias, setListaCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = () => {
        fetch("http://localhost/PHPgym/planes.php")
            .then(response => response.json())
            .then((data: Categoria[]) => {
                console.log(data);
                setListaCategorias(data);
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
    }

    const mostrarItem = () => {

        return (
            <div className='row '>
                {
                    listaCategorias.map(item =>
                        <div className='col-4' key={item.id}>

                            <img src={"http://localhost/PHPgym/" + item.imagen} className="img-fluid" alt="..." />
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

export default Nosotros