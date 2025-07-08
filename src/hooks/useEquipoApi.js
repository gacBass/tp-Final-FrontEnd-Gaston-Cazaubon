import { useState, useEffect } from 'react';

const useEquipoApi = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const equipoMedicoApiUrl = import.meta.env.VITE_EQUIPO_MEDICO_API_URL;

    
    useEffect(() => {
        const fetchDoctorsData = async () => {
            setLoading(true);
            setError(null);
            setDoctors([]);

            const url = equipoMedicoApiUrl;

            if (!url) {
                setLoading(false);
                setError("La URL de la API no está configurada.");
                console.error("VITE_EQUIPO_MEDICO_API_URL no está definida.");
                return;
            }

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    const errorDetails = await response.text();
                    const errorMessage = `Error HTTP ${response.status}: ${errorDetails || 'Error desconocido del servidor.'}`;
                    console.error('API Response NOT OK:', errorMessage);
                    throw new Error(errorMessage);
                }

                const data = await response.json();
                console.log('API Response Data:', data);

                if (Array.isArray(data)) {
                    setDoctors(data);
                } else {
                    console.warn("La API no devolvió un array como se esperaba. Estableciendo una lista vacía.");
                    setDoctors([]);
                }

            } catch (err) {
                console.error("Error al obtener datos de los doctores:", err);
                setError(err.message || "Ocurrió un error inesperado.");
            } finally {
                setLoading(false);
                console.log('fetchDoctorsData finished. Loading set to false.');
            }
        };

        fetchDoctorsData();

            

    }, [equipoMedicoApiUrl]);

    return { doctors, loading, error };
}
 
export default useEquipoApi;