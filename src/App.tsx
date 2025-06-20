import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainFooter from './common/MainFooter'
import MainHeader from './common/MainHeader'
import MainNav from './common/MainNav'
import Start from './pages/Start'
import Clientes from './pages/Clientes'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import ViewCart from './pages/ViewCart'
import Contact from './pages/Contact'
import AboutUs from './pages/AboutUs'
import FAQS from './pages/FAQS'

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
            <Route path="" element={<Cart />} />
            <Route path="/productodetalle/:id" element={<ProductDetails />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/viewcart" element={<ViewCart />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/acercadenosotros" element={<AboutUs />} />
            <Route path="/faqs" element={<FAQS />} />

          </Routes>
        </main>
        
        <MainFooter />
      </BrowserRouter>
    </>
  )
}

export default App