import { useEffect, useState } from "react"
import { ItemCarrito } from "../types/ItemCarrito"
import './Cart.css'
import { API_URL } from "../utils"

export const Cart = () => {

  const [listaItems, setListaItems] = useState<ItemCarrito[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    leerServicio();

    // Escuchar el evento personalizado
    const handleCarritoActualizado = () => leerServicio();
    window.addEventListener("carritoActualizado", handleCarritoActualizado);

    // Limpieza al desmontar
    return () => {
      window.removeEventListener("carritoActualizado", handleCarritoActualizado);
    };
  }, []);

  const leerServicio = () => {
    const datosCarrito = JSON.parse(sessionStorage.getItem("carritocompras") || '[]')
    setListaItems(datosCarrito)
    calcularTotal(datosCarrito)
  }

  const dibujarPrecios = () => {
    return (
      <table className="table align-middle">
        <tbody>
          {listaItems.length > 0 && listaItems !== null ? (
            <>
              {listaItems.map(item => {

                return (
                  <tr key={item.idcarrito}>
                    <td>
                      <img id="back-img-shop"
                        src={item.imagen
                          ? `${API_URL}${item.imagen}`
                          : `${API_URL}img/nofoto.jpg`}
                        className="img-fluid p-3"
                        width={150}
                        height={150}
                        alt={item.nombre}
                      />
                    </td>
                    <td>
                      <div className="texto-cont-off">{item.nombre}</div>
                      <div>
                        {item.cantidad} × <span className="text-primary fw-bold">S/ {Number(item.precio).toFixed(2)}</span>
                      </div>

                    </td>
                    <td className="text-end align-top">
                      <i
                        className="bi bi-x-lg text-danger icon-delete"
                        title="Eliminar item"
                        style={{ cursor: "pointer" }}
                        onClick={() => eliminarItem(item)}
                      ></i>
                    </td>
                  </tr>
                );
              })}


            </>
          ) : (
            <tr>
              <td colSpan={3}>
                <div className="alert alert-warning" role="alert">
                  No hay productos en el carrito
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>


    )

  }





  const eliminarItem = (item: ItemCarrito) => {
    const carritoMenos = listaItems.filter(i => i.idcarrito != item.idcarrito)
    setListaItems(carritoMenos)
    sessionStorage.setItem("carritocompras", JSON.stringify(carritoMenos))
    calcularTotal(carritoMenos)
  }



  const calcularTotal = (datosCarrito: ItemCarrito[]) => {
    const sumTotal = datosCarrito.reduce(
      (acumulador: number, item: ItemCarrito) => acumulador + (item.precio * item.cantidad), 0)
    setTotal(sumTotal)
  }

  const FREE_DELIVERY_AMOUNT = 100; // S/ 100 para delivery gratis
  const progress = Math.min((total / FREE_DELIVERY_AMOUNT) * 100, 100);

  return (
    <>
      <div className="offcanvas-body">
        {listaItems.length === 0 ? (
          <div
            className="d-flex flex-column align-items-center justify-content-center h-73"

          >
            <i className="bi bi-cart-x fs-1 text-secondary mb-3"></i>
            <h5 className="text-center fw-bold mb-2">¡Tu carrito está vacío!</h5>
            <p className="text-center text-muted">Agrega productos para verlos aquí.</p>
            <a href="/tienda"><button className="boton-check boton-buy-now uppercase">Empieza a comprar ahora</button></a>
          </div>
        ) : (
          <>
            {/* ...barra de progreso y mensaje de delivery... */}
            <div className="cont-padd">
              <div
                className="progress position-relative"
                style={{ height: "10px", overflow: "visible" }}
              >
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={{
                    width: `${progress}%`,
                    transition: "width 0.5s"
                  }}
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
                {/* Icono encima y fuera de la barra */}
                <span
                  style={{
                    position: "absolute",
                    left: `calc(${progress}% - 18px)`,
                    top: "-11px",
                    transition: "left 0.5s",
                    zIndex: 10,
                    background: "white",
                    borderRadius: "50%",
                    border: "2px solid #ffc107",
                    padding: "2px 7px"
                  }}
                >
                  <i className="bi bi-truck fs-6 text-warning"></i>
                </span>
              </div>

              <div className="text-center mt-2">
                {total >= FREE_DELIVERY_AMOUNT ? (
                  <span className="texto-canvaoff">
                    ¡Enhorabuena! Tus pedidos es elegible a envío GRATUITO.
                  </span>
                ) : (
                  <>
                    Agrega productos por{" "}
                    <span className="fw-bold text-primary">
                      S/ {(FREE_DELIVERY_AMOUNT - total).toFixed(2)}
                    </span>{" "}
                    para{" "}
                    <span className="fw-bold text-warning">
                      ¡Delivery GRATIS!
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="container h-73">
              <div className="col">
                <div className="col-md-12">{dibujarPrecios()}</div>
              </div>
            </div>


          </>
        )}
      </div>
      {/* Subtotal y botones fuera del offcanvas-body */}
      {listaItems.length > 0 && (
        <div className="col-md-12 cont-padd2">
          
            <div className="row">
              <hr />
              <h5 className="col subtotal">Subtotal:</h5>
              <p className="col text-end">S/ {total.toFixed(2)}</p>
            </div>
            <div className="row">
              <button className="col boton-view-offcan me-1">View Cart</button>
              <button className="col boton-check-offcan ms-1">Checkout</button>
            </div>
          
        </div>
      )}
    </>
  )
}

export default Cart