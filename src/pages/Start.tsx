import TablasDB from "../home/TablasDB"
import MainBanner from "../home/MainBanner"
import Planes from "../home/Planes"
import Productos from "../home/Productos"

function Start() {
  return (
    <>
        <MainBanner />
        <Planes />
        <Productos />
        <TablasDB />
    </>
  )
}

export default Start