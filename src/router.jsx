import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Consultorios from './components/consultorios/Consultorios'
import LandingPage from './layout/LandingPage'
import Layout from './layout/Layout'
import Galeria from './components/galeria/Galeria'
import QuienesSomos from './components/quienesSomos/QuienesSomos'

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
                element: <Consultorios />
            },
            {
                path: '/galeria',
                element: <Galeria />
            },
            ,
            {
                path: '/quienes-somos',
                element: <QuienesSomos />
            }
        ]
    }
])

export default router