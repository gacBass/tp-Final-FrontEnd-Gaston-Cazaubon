import React from 'react'
import './header.css'

const Header = () => {
  return (
    <header className="mainHeader">
      <img className="header-logo" src="/assets/image.png" alt="Logo" />
      <nav className="navbar playfair-display-gaston">
        <h3><a className="activo" href="#">Inicio</a></h3>
        <h3><a href="#">Quiénes somos</a></h3>
        <h3><a href="#">Galería de Casos</a></h3>
        <h3><a href="#">Consultorios</a></h3>
        <h3><a href="#">Equipo Profesional</a></h3>
        <h3><a href="#">Contacto</a></h3>
      </nav>
    </header>
  )
}

export default Header