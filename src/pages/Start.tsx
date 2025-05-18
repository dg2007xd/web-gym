import TablasDB from "../home/TablasDB";
import MainBanner from "../home/MainBanner";
import Planes from "../home/Planes";
import Productos from "../home/Productos";

function Start() {
  // Podrías hacer más dinámica la selección de categoría
  const categoriaDestacada = 1; // O podrías obtenerla de un estado o contexto

  return (
    <main>
      <MainBanner />
      <Planes />
      <Productos codigoCategoria={categoriaDestacada} />
      <TablasDB />
    </main>
  );
}

export default Start;