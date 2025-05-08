import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainFooter from './common/MainFooter'
import MainHeader from './common/MainHeader'
import MainNav from './common/MainNav'
import Start from './pages/Start'
import Investments from './pages/Investments'
import Suppliers from './pages/Suppliers'
import Clientes from './pages/Clientes'
import Shop from './pages/Shop'

function App() {
  return (
    <>
      <BrowserRouter>
        <MainHeader />
        <MainNav />

        <main id="main-content">
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/tienda" element={<Shop />} />
            <Route path="/inversiones" element={<Investments />} />
            <Route path="/proveedores" element={<Suppliers />} />
            <Route path="/clientes" element={<Clientes />} />
            
          </Routes>     
        </main>
        
        <MainFooter />
      </BrowserRouter>
    </>
  )
}

export default App