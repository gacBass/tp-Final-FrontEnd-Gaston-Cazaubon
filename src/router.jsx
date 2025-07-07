import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import QuienesSomosPage from './pages/QuienesSomosPage'
import EquipoProfesionalPage from './pages/EquipoProfesionalPage'
import LandingPage from './pages/LandingPage'
import Layout from './layout/Layout'
import GaleriaPage from './pages/GaleriaPage'
import ConsultoriosPage from './pages/ConsultoriosPage'
import ContactoPage from './pages/ContactoPage'

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <App />
            },
            {
                path: '/landing',
                element: <LandingPage />
            },
            {
                path: '/consultorios',
                element: <ConsultoriosPage />
            },
            {
                path: '/galeria',
                element: <GaleriaPage />
            },
            {
                path: '/quienes-somos',
                element: <QuienesSomosPage />
            },
            {
                path: '/equipo-profesional',
                element: <EquipoProfesionalPage />
            },
            {
                path: '/contacto',
                element: <ContactoPage />
            }
        ]
    }
])

export default router