import React from 'react'
import Header from './header/Header' 
import Footer from './footer/Footer' 
import '../index.css'
import { Outlet } from 'react-router-dom'

function Layout({ }) {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <div className="whatsapp-button-container"> 
          <a href="https://wa.me/5491163538689" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp"> 
            <img src="/assets/whatsapp_contacto.svg" alt="Contactar por WhatsApp" className="whatsapp-icon" /> 
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Layout