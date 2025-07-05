import React from 'react'
import Header from './header/header' // <-- use lowercase 'header'
import Footer from './footer/footer' // <-- use lowercase 'footer'
import '../index.css'

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>
        {children}
        <div class="whatsappButton">
          <a href="https://wa.me/1163538689" target="_blank"><img src="assets/whatsapp_contacto.svg" alt="imagen de contacto" /></a>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Layout