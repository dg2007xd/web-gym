import TablasDB from "../home/TablasDB";
import MainBanner from "../home/MainBanner";
import Planes from "../home/Planes";
import ProductosHome from "../home/ProductosHome";

function Start() {
  // Podrías hacer más dinámica la selección de categoría
  const categoriaDestacada = 1; // O podrías obtenerla de un estado o contexto

  return (
    <main>
      <MainBanner />
      <Planes />
      <ProductosHome codigoCategoria={categoriaDestacada} />
      <TablasDB />
    </main>
  );
}

export default Start;