import { useEffect, useState } from "react"
import { API_URL } from "../utils"
import { useParams } from "react-router-dom"
import { Articulo } from "../types/Articulo"
import '../pages/ProductDetails.css'
import { ItemCarrito } from "../types/ItemCarrito"


function ProductDetails() {
  const params = useParams()
  console.log(params)

  const [productoSeleccionado, setProductoSeleccionado] = useState<Articulo>();
  const [listaItems, setListaItems] = useState<ItemCarrito[]>([])

  // Busca si el producto ya está en el carrito
  const itemEnCarrito = listaItems.find(item => item.idcarrito === productoSeleccionado?.id);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    leerServicio()

    // Escuchar el evento personalizado
    const handleCarritoActualizado = () => leerServicio();
    window.addEventListener("carritoActualizado", handleCarritoActualizado);

    // Limpieza al desmontar
    return () => {
      window.removeEventListener("carritoActualizado", handleCarritoActualizado);
    };

  }, [])

  useEffect(() => {
    if (itemEnCarrito) {
      setCantidad(itemEnCarrito.cantidad)
    } else {
      setCantidad(1)
    }
  }, [itemEnCarrito])

  useEffect(() => {
    // Si el producto ya está en el carrito, actualiza la cantidad automáticamente
    if (itemEnCarrito) {
      const actualizarCarro = listaItems.map(item => {
        if (item.idcarrito === itemEnCarrito.idcarrito) {
          item.cantidad = cantidad;
        }
        return item;
      });
      setListaItems(actualizarCarro);
      sessionStorage.setItem("carritocompras", JSON.stringify(actualizarCarro));
      window.dispatchEvent(new Event("carritoActualizado"));
    }
    // eslint-disable-next-line
  }, [cantidad]);

  

  const agregarAlCarrito = () => {
    if (!productoSeleccionado) return;
    let carrito = JSON.parse(sessionStorage.getItem("carritocompras") || "[]");
    // Verifica si ya existe el producto en el carrito
    const idx = carrito.findIndex((item: ItemCarrito) => item.idcarrito === productoSeleccionado.id);
    if (idx !== -1) {
      carrito[idx].cantidad = cantidad;
    } else {
      carrito.push({
        idcarrito: Date.now(), // identificador único
        id: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        precio: Number(productoSeleccionado.precio),
        cantidad: cantidad,
        imagen: productoSeleccionado.imagen
      });
    }
    sessionStorage.setItem("carritocompras", JSON.stringify(carrito));
    window.dispatchEvent(new Event("carritoActualizado"));
    setListaItems(carrito);
  };


  const leerServicio = async () => {
    try {
      const response = await fetch(API_URL + "productos.php?id=" + params.id)
      const data: Articulo[] = await response.json();
      console.log(data);
      setProductoSeleccionado(data[0]) //data[0] hace referencia al primer y unico elemento del arreglo
    } catch (error) {
      console.log("Error consultando datos:", error);
    }

    const datosCarrito = JSON.parse(sessionStorage.getItem("carritocompras") || '[]')
    setListaItems(datosCarrito)
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

  const decrement = (event: any) => {
    const inputCantidad = event.currentTarget.parentElement.querySelector("input")
    if (inputCantidad) {
      inputCantidad.stepDown()
      inputCantidad.dispatchEvent(new Event("change", { bubbles: true }))
    }
  }

  const increment = (event: any) => {
    const inputCantidad = event.currentTarget.parentElement.querySelector("input")
    if (inputCantidad) {
      inputCantidad.stepUp()
      inputCantidad.dispatchEvent(new Event("change", { bubbles: true }))
    }
  }

  const actualizarCantidad = (cantidad: number, idcarrito: number) => {
    const carritoActualizado = listaItems.map(item => {
      if (item.idcarrito === idcarrito) {
        item.cantidad = cantidad
      }
      return item
    })
    setListaItems(carritoActualizado)
    sessionStorage.setItem("carritocompras", JSON.stringify(carritoActualizado))
    window.dispatchEvent(new Event("carritoActualizado"))
    setCantidad(cantidad)
  }


  return (
    <section className="padded">
      <div className="container">
        <div className="row">
          <div className="col d-flex align-items-center justify-content-center">
            <img src={productoSeleccionado?.imagen
              ? API_URL + productoSeleccionado.imagen
              : API_URL + "imagenes/nofoto.jpg"} className="img-fluid" width={512} height={512} alt="..." />
          </div>
          <div className="col">
            <h2 className="capitalize nombre-detalle">{productoSeleccionado?.nombre}</h2>
            <table className="table">
              {productoSeleccionado && (<tbody>
                <tr>
                  <th>Categoría</th>
                  <td className="capitalize">{productoSeleccionado?.nombrecategoria}</td>
                </tr>
                <tr>
                  <th>Precio</th>
                  <td className="fw-bold text-color2">S/
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
                  <th>Valoración</th>
                  <td>
                    {renderStars(productoSeleccionado?.rating)}
                    <span className="ms-2 text-color2">({productoSeleccionado?.rating} review)</span>
                  </td>
                </tr>
                <tr>
                  <th>Descripcion</th>
                  <td>{productoSeleccionado?.descripcion}</td>
                </tr>
                <tr>
                  <th>Cantidad</th>
                  <td>
                    <div className="input-group" style={{ maxWidth: 200 }}>
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={decrement}
                      >-</button>
                      <input
                        type="number"
                        className="form-control text-center quantity"
                        min="1"
                        value={cantidad}
                        onChange={e => {
                          setCantidad(Math.max(1, Number(e.target.value)))
                          if (itemEnCarrito) {
                            actualizarCantidad(Number(e.target.value), itemEnCarrito.idcarrito)
                          }
                        }}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={increment}
                      >+</button>
                    </div>
                  </td>
                </tr>
              </tbody>)}
            </table>
            {!itemEnCarrito && (
              <button className="btn boton-details uppercase" onClick={agregarAlCarrito}>
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails