interface ProductosProps {
    codigoCategoria: number;
}

function Productos(props: ProductosProps) {
    console.log(props.codigoCategoria);
  return (
    <div>Productos</div>
  )
}

export default Productos