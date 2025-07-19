import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { useState } from "react";
import ScrollTop from "./components/ScrollTop";
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
import Categories from './pages/Categories';
import Sessions from './pages/Sessions';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  React.useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-page-header",
      darkMode ? "#0F0F0F" : "#EEEEEE" //color negro y gris de header
    );
    document.documentElement.style.setProperty(
      "--color-header-ofcanvas",
      darkMode ? "#181818" : "#EEEEEE" //color negro tecnicamente y gris de header
    );
    document.documentElement.style.setProperty(
      "--color-body-ofcanvas",
      darkMode ? "#0F0F0F" : "#FFFEFF" //color negro y blanco de body
    );
    document.documentElement.style.setProperty(
      "--color2",
      darkMode ? "#FFD21D" : "#1328E0" //amarillo y azul 
    );
    document.documentElement.style.setProperty(
      "--color4",
      darkMode ? "#1328E0" : "#FFD21D" //azul y amarillo 
    );
    document.documentElement.style.setProperty(
      "--color1",
      darkMode ? "#181818" : "#FFFEFF" //color negro tecnicamente y blanco
    );
    document.documentElement.style.setProperty(
      "--color-negro",
      darkMode ? "#FFFFFF" : "#000000" //color blanco y negro
    );
    document.documentElement.style.setProperty(
      "--color-blanco",
      darkMode ? "#000000" : "#FFFFFF" //color negro y blanco
    );
    document.documentElement.style.setProperty(
      "--color-boton-home-dark",
      darkMode ? "#495057" : "#1328E0" //color grisaseo y azul
    );
    document.documentElement.style.setProperty(
      "--color-boton-home-dark-hover",
      darkMode ? "#FFD21D" : "#000000" //color amarillo y negro 
    );
    document.documentElement.style.setProperty(
      "--color-boton-view",
      darkMode ? "#FFD21D" : "#000000" //color amarillo y negro 
    );
    document.documentElement.style.setProperty(
      "--color-boton-view-hover",
      darkMode ? "#495057" : "#1328E0" //color grisaseo y azul
    );
    document.documentElement.style.setProperty(
      "--color-boton-check",
      darkMode ? "#495057" : "#1328E0" //color grisaseo y azul
    );
    document.documentElement.style.setProperty(
      "--color-boton-check-hover",
      darkMode ? "#FFD21D" : "#000000" //color amarillo y negro 
    );
    document.documentElement.style.setProperty(
      "--blanco-a-casinegro",
      darkMode ? "#181818" : "#FFFEFF" //color negro casi y blanco casi 
    );
    document.documentElement.style.setProperty(
      "--hr",
      darkMode ? "#2F3236" : "#e5e5e5" //color negro casi ni c ve y gris casi despareciente 
    );
    document.documentElement.style.setProperty(
      "--table-border-color",
      darkMode ? "#2F3236" : "#e5e5e5" //color negro casi ni c ve y gris casi despareciente 
    );
    document.documentElement.style.setProperty(
      "--bg-dropdown",
      darkMode ? "#212121" : "#ffffff" //color negro y blanco 
    );
    document.documentElement.style.setProperty(
      "--bg-dropdown2",
      darkMode ? "#0F0F0F" : "#F5F4F4" //color negro y blanco 
    );
    document.documentElement.style.setProperty(
      "--bg-box-shadow",
      darkMode ? "#121212" : "#E0E0E0" //color negro y blanco 
    );
    document.documentElement.style.setProperty(
      "--dropdown-item",
      darkMode ? "#D2D9D9" : "#676767" //color blanco de dark mode y gris por defecto 
    );
    document.documentElement.style.setProperty(
      "--color-gris-claro",
      darkMode ? "#000000" : "#F4F5F4" //color negro de dark mode y gris 
    );
    document.documentElement.style.setProperty(
      "--color-gris-acercade",
      darkMode ? "#212121" : "#F1F0F0" //color oscuro de dark mode y gris normal
    );
    document.documentElement.style.setProperty(
      "--color-gris-debarraDelivery",
      darkMode ? "#0F0F0F" : "#FDFAFA" //color oscuro de dark mode y gris normal
    );
    document.body.style.background = darkMode ? "#181818" : "#fff";
  }, [darkMode]);

  return (
    <>
      <BrowserRouter>
        <MainHeader />
        <MainNav />

        <main id="main-content">
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/tienda" element={<Shop />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="" element={<Cart />} />
            <Route path="/productodetalle/:id" element={<ProductDetails />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/viewcart" element={<ViewCart />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/acercadenosotros" element={<AboutUs />} />
            <Route path="/faqs" element={<FAQS />} />
            <Route path="/sessions" element={<Sessions />} />

          </Routes>
        </main>
        <button
          className={`darkmode-switch${darkMode ? " dark" : ""}`}
          onClick={() => setDarkMode((v) => !v)}
          aria-label="Cambiar modo color"
        >
          <span className="switch-track">
            <span className="switch-icon">
              {darkMode ? (
                <i className="bi bi-brightness-high"></i>
              ) : (
                <i className="bi bi-moon "></i>
              )}
            </span>
            <span className="switch-knob"></span>
          </span>
        </button>
        <ScrollTop />

        <MainFooter />
      </BrowserRouter>
    </>
  )
}

export default App