import TablasDB from "../home/TablasDB";
import MainBanner from "../home/MainBanner";
import ProductosHome from "../home/ProductosHome";
import PlanesHome from "../home/PlanesHome";

function Start() {
  // Podrías hacer más dinámica la selección de categoría
  const categoriaDestacada = 1; // O podrías obtenerla de un estado o contexto

  return (
    <main>
      <MainBanner />
      <PlanesHome />
      <ProductosHome codigoCategoria={categoriaDestacada} />
      <TablasDB />
    </main>
  );
}

export default Start;