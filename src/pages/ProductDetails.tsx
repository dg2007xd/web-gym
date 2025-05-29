import { useEffect, useState } from "react"
import { API_URL } from "../utils"
import { useParams } from "react-router-dom"
import { Articulo } from "../types/Articulo"
import '../pages/ProductDetails.css'


function ProductDetails() {
  const params = useParams()
  console.log(params)
  const [productoSeleccionado, setProductoSeleccionado] = useState<Articulo>();
  useEffect(() => {
    leerServicio()
  }, [])

  const leerServicio = async () => {
    try {
      const response = await fetch(API_URL + "productos.php?id=" + params.id)
      const data: Articulo[] = await response.json();
      console.log(data);
      setProductoSeleccionado(data[0]) //data[0] hace referencia al primer y unico elemento del arreglo
    } catch (error) {
      console.log("Error consultando datos:", error);
    }
  }
  const renderStars = (rating: number = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`fa fa-star ${i <= rating ? 'checked' : ''}`}></span>
      );
    }
    return stars;
  };

  const precio = Number(productoSeleccionado?.precio)

  return (
    <section className="padded">
      <div className="container">
        <div className="row">
          <div className="col">
            <img src={productoSeleccionado?.imagen
              ? API_URL + productoSeleccionado.imagen
              : API_URL + "imagenes/nofoto.jpg"} className="img-fluid" width={512} height={512} alt="..." />
          </div>
          <div className="col">
            <h2 className="capitalize">{productoSeleccionado?.nombre}</h2>
            <table className="table">
              {productoSeleccionado && (<tbody>

                
                <tr>
                  <th>Categoría</th>
                  <td className="capitalize">{productoSeleccionado?.nombrecategoria}</td>
                </tr>
                <tr>
                  <th>Precio</th>
                  <td>S/
                    {precio === 0
                      ? "Verifica la conexion"
                      : precio.toFixed(2)
                    }
                  </td>
                </tr>

                <tr>
                  <th>Stock</th>
                  <td>{productoSeleccionado?.stock}</td>
                </tr>

                <tr>
                  <th>Valoracion</th>
                  
                  <td>
                    {renderStars(productoSeleccionado?.rating)}
                    <span className="ms-2">({productoSeleccionado?.rating}) Calificaciones</span>
                  </td>
                </tr>

              </tbody>)}
            </table>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails