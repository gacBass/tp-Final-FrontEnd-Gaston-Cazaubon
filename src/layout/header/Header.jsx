import React from 'react'
import './header.css'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="mainHeader">
      <img className="header-logo" src="/assets/image.png" alt="Logo" />
      <nav className="navbar playfair-display-gaston">
        <h3><Link to="/landing">Inicio</Link></h3>
        <h3><Link to="/quienes-somos"> Quiénes somos </Link></h3>
        <h3><Link to="/galeria">Galería de Casos</Link></h3>
        <h3><Link to="/consultorios">Consultorios</Link></h3>
        <h3><Link to="/">Equipo Profesional</Link></h3>
        <h3><Link to="/">Contacto</Link></h3>
      </nav>
    </header>
  )
}

export default Header