import React from 'react';
import '../../styles/header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // 💡 Import the global auth hook

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // 💡 Get the global, reliable authentication state from context
    const { isAuthenticated } = useAuth();
    
    // Check for styling/pointer events: True if the current path is /adminPage or /login
    const isLoginOrAdminActive = location.pathname.includes('/adminPage') || location.pathname.includes('/login'); 

    const adminButtonClassName = `admin-link-button ${isLoginOrAdminActive ? 'admin-active' : ''}`;

    // 💡 The click handler uses the reliable isAuthenticated state
    const handleAdminClick = () => {
        if (isAuthenticated) {
            // User IS logged in (verified by API check in context), go to admin page
            navigate('/adminPage');
        } else {
            // User is NOT logged in, go to login page
            navigate('/login');
        }
    };

    return (
        <header className="mainHeader">
            <img className="header-logo" src="/assets/image.png" alt="Logo" />
            
            <nav className="navbar playfair-display-gaston">
                <h3><Link to="/landing">Inicio</Link></h3>
                <h3><Link to="/quienes-somos"> Quiénes somos </Link></h3>
                <h3><Link to="/galeria">Galería de Casos</Link></h3>
                <h3><Link to="/consultorios">Consultorios</Link></h3>
                <h3><Link to="/equipo-profesional">Equipo Profesional</Link></h3>
                <h3><Link to="/contacto">Contacto</Link></h3>
                
                <h3 
                    className={adminButtonClassName}
                    onClick={handleAdminClick} 
                    style={{ 
                        cursor: 'pointer',
                        // Prevents double-clicking/re-navigation when already on the admin/login page
                        pointerEvents: isLoginOrAdminActive ? 'none' : 'auto' 
                    }}
                >
                    ADMIN
                </h3>
            </nav>
        </header>
    );
}

export default Header;