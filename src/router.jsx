import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import QuienesSomosPage from './pages/QuienesSomosPage';
import EquipoProfesionalPage from './pages/EquipoProfesionalPage';
import LandingPage from './pages/LandingPage';
import Layout from './layout/Layout';
import GaleriaPage from './pages/GaleriaPage';
import ConsultoriosPage from './pages/ConsultoriosPage';
import ContactoPage from './pages/ContactoPage';
import SearchPage from './pages/SearchPage';
import AdminPage from './pages/AdminPage';
import Edit from './components/admin/Edit';
import LoginPage from './components/admin/LoginPage';
import Crear from './components/admin/Crear';
import ProtectedRoute from './components/protectedRoute'; // Import the guard component

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            // ----------------------------------------------------------------
            // PUBLIC ROUTES (No Auth Required)
            { path: '/', element: <App /> },
            { path: '/landing', element: <LandingPage /> },
            { path: '/consultorios', element: <ConsultoriosPage /> },
            { path: '/galeria', element: <GaleriaPage /> },
            { path: '/quienes-somos', element: <QuienesSomosPage /> },
            { path: '/equipo-profesional', element: <EquipoProfesionalPage /> },
            { path: '/contacto', element: <ContactoPage /> },
            { path: '/search', element: <SearchPage /> },
            { path: '/login', element: <LoginPage /> },
            // ----------------------------------------------------------------

            // ----------------------------------------------------------------
            // 🔒 PROTECTED ROUTE GROUP
            {
                // This parent route uses ProtectedRoute as its layout/guard.
                // It checks the authToken cookie. If missing, it redirects to /login.
                element: <ProtectedRoute />, 
                children: [
                    { path: '/adminPage', element: <AdminPage /> },
                    { path: '/edit/:id', element: <Edit /> },
                    { path: '/crear', element: <Crear /> },
                    // Assuming /logout is a route that handles session cleanup
                    { path: '/logout', element: <AdminPage /> } 
                ]
            }
            // ----------------------------------------------------------------
        ]
    }
]);

export default router;