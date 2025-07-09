
import React, { useState, useEffect, useCallback } from 'react';


const useEquipoFilter = () => {

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const equipoMedicoApiUrl = import.meta.env.VITE_EQUIPO_MEDICO_API_URL ;
    let url = ''


        const fetchDoctorsData = useCallback(async (filterby, filterValue) => {
            setLoading(true);
            setError(null);
            setDoctors([]);

            
            const url = equipoMedicoApiUrl + '?' + filterby + '=' + filterValue;

               

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
                console.log(response)

                if (Array.isArray(data)) {
                    setDoctors(data);
                } else {
                    console.warn("La API no devolvió un array como se esperaba. Estableciendo una lista vacía.");
                    setDoctors([]);
                }
                

            } catch (err) {
                console.error("Error al obtener datos: ", err);
                setError(err.message || "Ocurrió un error inesperado.");
            } finally {
                setLoading(false);
                console.log('fetchDoctorsData finished. Loading set to false.');
            }

    }, [url]);

    return { doctors, loading, error, fetchDoctorsData };
}

export default useEquipoFilter