import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader"
import { ItemCarrito } from "../types/ItemCarrito"
import { Link } from "react-router-dom"
import './ViewCart.css'
import { API_URL } from "../utils"
import payment from '../assets/images/metodos-pago.png'

function ViewCart() {
  const [listaItems, setListaItems] = useState<ItemCarrito[]>([])
  const [total, setTotal] = useState(0)
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const [shipping, setShipping] = useState<"pickup" | "flat" | "free">("pickup");

  const FREE_DELIVERY_AMOUNT = 200
  const progress = Math.min((total / FREE_DELIVERY_AMOUNT) * 100, 100)

  useEffect(() => {
    // Si el total baja y shipping está en "free", vuelve a "pickup"
    if (total < FREE_DELIVERY_AMOUNT && shipping === "free") {
      setShipping("pickup");
    }
  }, [total, shipping]);

  useEffect(() => {
    leerServicio()
    const handleCarritoActualizado = () => leerServicio()
    window.addEventListener("carritoActualizado", handleCarritoActualizado)
    return () => window.removeEventListener("carritoActualizado", handleCarritoActualizado)
  }, [])

  useEffect(() => {
    setAnimatedProgress(0)
    const timeout = setTimeout(() => {
      setAnimatedProgress(progress)
    }, 700)
    return () => clearTimeout(timeout)
  }, [total])

  const leerServicio = () => {
    const datosCarrito = JSON.parse(sessionStorage.getItem("carritocompras") || '[]')
    setListaItems(datosCarrito)
    calcularTotal(datosCarrito)
  }

  const calcularTotal = (datosCarrito: ItemCarrito[]) => {
    const sumTotal = datosCarrito.reduce(
      (acumulador: number, item: ItemCarrito) => acumulador + (item.precio * item.cantidad), 0)
    setTotal(sumTotal)
  }

  const eliminarItem = (item: ItemCarrito) => {
    const carritoMenos = listaItems.filter(i => i.idcarrito !== item.idcarrito)
    setListaItems(carritoMenos)
    sessionStorage.setItem("carritocompras", JSON.stringify(carritoMenos))
    calcularTotal(carritoMenos)
    window.dispatchEvent(new Event("carritoActualizado"))
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
    calcularTotal(carritoActualizado)
    window.dispatchEvent(new Event("carritoActualizado"))
  }

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



  // Calcular el total a mostrar según el método de envío
  let shippingCost = 0;
  if (shipping === "pickup") shippingCost = 5;
  if (shipping === "flat") shippingCost = 10;
  if (shipping === "free") shippingCost = 0;

  return (
    <>
      <PageHeader pageTitle="Cart" />
      <section className="padded padded-inverso-viewcart">
        <div className="container">
          <div className="row">
            {/* Tabla de productos */}
            <div className="col-lg-8 mb-4">
              <h2 id="cart-summary" className="mb-4 uppercase">Cart Summary</h2>
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th></th>
                    <th>Product</th>
                    <th></th>
                    <th className="text-end">Price</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-end">Subtotal</th>

                  </tr>
                </thead>
                <tbody>
                  {listaItems.length > 0 ? (
                    listaItems.map(item => (
                      <tr key={item.idcarrito}>
                        <td className="delete-icon-cont">
                          <i
                            className="bi bi-x-lg icon-delete"
                            title="Eliminar item"
                            onClick={() => eliminarItem(item)}
                          ></i>
                        </td>
                        <td>
                          <img
                            src={item.imagen
                              ? `${API_URL}${item.imagen}`
                              : `${API_URL}img/nofoto.jpg`}
                            className="img-fluid"
                            width={60}
                            height={60}
                            alt={item.nombre}
                            style={{ borderRadius: "6px" }}
                          />
                        </td>
                        <td className="product-name-cell">
                          <div>{item.nombre}</div>
                        </td>
                        <td className="text-end text-color2 precio-design">
                          S/ {Number(item.precio)}
                        </td>
                        <td className="text-center">
                          <div className="input-group input-group-sm justify-content-center" style={{ maxWidth: "110px" }}>
                            <button className="btn btn-outline-secondary" type="button" onClick={decrement}>-</button>
                            <input
                              type="number"
                              className="form-control text-center"
                              min="1"
                              value={item.cantidad}
                              onChange={e => actualizarCantidad(Number(e.target.value), item.idcarrito)}
                              style={{ width: "40px" }}
                            />
                            <button className="btn btn-outline-secondary" type="button" onClick={increment}>+</button>
                          </div>
                        </td>
                        <td className="text-end text-color2 precio-design">
                          S/ {(item.precio * item.cantidad)}
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6}>
                        <div className="alert alert-warning text-center" role="alert">
                          No hay productos en el carrito
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Beneficios */}
              <div className="row mt-4 benefit-row">
                <div className="col-md-4 p-0">
                  <div className="benefit-box h-100">
                    <i className="bi bi-heart fs-2 mb-2"></i>
                    <div className="benefit-title">LOVED BY THOUSANDS</div>
                    <div className="benefit-desc">
                      Join Thousands of Happy<br />and Satisfied Customers!
                    </div>
                  </div>
                </div>
                <div className="col-md-4 p-0">
                  <div className="benefit-box h-100">
                    <i className="bi bi-arrow-left-right fs-2 mb-2"></i>
                    <div className="benefit-title">EASY RETURNS</div>
                    <div className="benefit-desc">
                      Enjoy Hassle-Free Returns<br />and Exchanges – Shop Now!
                    </div>
                  </div>
                </div>
                <div className="col-md-4 p-0">
                  <div className="benefit-box h-100">
                    <i className="bi bi-gift fs-2 mb-2"></i>
                    <div className="benefit-title">ORDER NOW &amp; GET GIFT!</div>
                    <div className="benefit-desc">
                      Order &amp; Receive a Special<br />Gift. Limited Time Only!
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            {/* Totales y barra de progreso */}
            <div className="col-lg-4">
              {/* Barra de progreso de envío gratis */}
              <div className={`mb-3 bg-progreso ${animatedProgress === 100 ? 'bg-progreso-success' : 'bg-progreso-warning'}`}>
                <div
                  className="progress position-relative"
                  style={{ height: "10px", overflow: "visible" }}
                >
                  <div
                    className={`progress-bar ${animatedProgress === 100 ? 'bg-success' : 'bg-warning'}`}
                    role="progressbar"
                    style={{
                      width: `${animatedProgress}%`,
                      transition: "width 0.5s"
                    }}
                    aria-valuenow={animatedProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                  <span
                    style={{
                      position: "absolute",
                      left: `calc(${animatedProgress}% - 18px)`,
                      top: "-11px",
                      transition: "left 0.5s",
                      zIndex: 10,
                      background: "white",
                      borderRadius: "50%",
                      border: animatedProgress === 100 ? "2px solid #198754" : "2px solid #ffc107",
                      padding: "2px 7px"
                    }}
                  >
                    <i className={`bi bi-truck fs-6 ${animatedProgress === 100 ? "text-success" : "text-warning"}`}></i>
                  </span>
                </div>
                <div className="text-center mt-3">
                  {total >= FREE_DELIVERY_AMOUNT ? (
                    <span>
                      Congratulations! Your order is eligible for FREE Delivery.
                    </span>
                  ) : (
                    <>
                      Add items worth{" "}
                      <span className="fw-bold text-color2">
                        S/ {(FREE_DELIVERY_AMOUNT - total)}
                      </span>{" "}
                      for <span>FREE Delivery!</span>
                    </>
                  )}
                </div>
              </div>
              {/* CART TOTALS */}
              <div className="card card-color mb-3 p-3">
                <div id="cart-totals" className="card-header fw-bold fs-5 mb-2">CART TOTALS</div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span id="subtotal">Subtotal</span>
                    <span className="text-color2 precio-design">S/ {total}</span>
                  </div>
                  <hr />
                  <div className="mb-2">
                    <div className="fw-bold mb-3">Shipping</div>
                    <div>
                      {total >= FREE_DELIVERY_AMOUNT && (
                        <div className="form-check mb-1">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="shipping"
                            id="free"
                            checked={shipping === "free"}
                            onChange={() => setShipping("free")}
                          />
                          <label className="form-check-label" htmlFor="free">
                            Free shipping
                          </label>
                        </div>
                      )}
                      <div className="form-check mb-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="shipping"
                          id="pickup"
                          checked={shipping === "pickup"}
                          disabled={total >= FREE_DELIVERY_AMOUNT && shipping === "free"}
                          onChange={() => setShipping("pickup")}
                        />
                        <label className="form-check-label" htmlFor="pickup">
                          Local pickup: <span className="text-color2 precio-design">S/ 5</span>
                        </label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="shipping"
                          id="flat"
                          checked={shipping === "flat"}
                          disabled={total >= FREE_DELIVERY_AMOUNT && shipping === "free"}
                          onChange={() => setShipping("flat")}
                        />
                        <label className="form-check-label" htmlFor="flat">
                          Flat rate: <span className="text-color2 precio-design">S/ 10</span>
                        </label>
                      </div>
                      <div className="small mt-1">
                        Shipping to Lima.
                        <br />
                        <Link to="#" className="change-address derecha mt-2">Change address</Link>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3">
                    <span className="fw-bold fs-5">Total</span>
                    <span className="fw-bold fs-5 text-color2">S/ {total + shippingCost}</span>
                  </div>
                  <button className="btn w-100 mt-4 mb-2 fw-bold boton-color2">
                    PROCEED TO CHECKOUT
                  </button>
                  <div className="text-center mt-2">
                    <p className="text-sec">Guaranteed Safe And Secure Checkout</p>
                    <img src={payment} alt="Payment Methods" style={{ maxWidth: "270px" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ViewCart