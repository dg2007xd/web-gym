import { Articulo } from "../types/Articulo"
import { ItemCarrito } from "../types/ItemCarrito"

export const API_URL = "http://localhost/PHPgym/"

export const agregarCarrito = (producto: Articulo, cantidadProducto: number) => {

    const ItemCarrito: ItemCarrito = {
        idcarrito: producto.id,
        nombre: producto.nombre,
        cantidad: cantidadProducto,
        precio: producto.precio,
        imagen: producto.imagen
    }
    let carrito: ItemCarrito[] = sessionStorage.getItem("carritocompras") == null
        ? []
        : JSON.parse(sessionStorage.getItem("carritocompras") || '[]')

    const index = carrito.findIndex(p => p.idcarrito === ItemCarrito.idcarrito)
    if (index != -1) {
        carrito[index].cantidad += cantidadProducto
    }
    else {
        carrito.push(ItemCarrito)
    }

    sessionStorage.setItem("carritocompras", JSON.stringify(carrito));
  window.dispatchEvent(new Event("carritoActualizado")); // <-- agrega esto
}