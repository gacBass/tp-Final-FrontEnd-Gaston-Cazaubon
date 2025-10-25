import { useState, useEffect, useCallback } from 'react';

const useEquipoApi = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    const equipoMedicoApiUrl = import.meta.env.VITE_EQUIPO_MEDICO_API_URL;

   
    const fetchDoctorsData = useCallback(async () => {
        setLoading(true);
        setError(null);
        setDoctors([]); 

        const url = equipoMedicoApiUrl + '/doctor/getDoctors';

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
                throw new Error(errorMessage);
            }

            const data = await response.json();
            
            if (Array.isArray(data)) {
                setDoctors(data);
            } else if (typeof data === 'object' && data !== null) {
                setDoctors(Object.values(data));
            } else {
                 console.warn("La API no devolvió un formato esperado.");
                 setDoctors([]);
            }

        } catch (err) {
            console.error("Error al obtener datos de los doctores:", err);
            setError(err.message || "Ocurrió un error inesperado.");
            setDoctors([]);
        } finally {
            setLoading(false);
        }
    }, [equipoMedicoApiUrl, setDoctors, setError, setLoading]); 


    useEffect(() => {
        fetchDoctorsData();
        
    }, [fetchDoctorsData]); 

       const updateDoctor = useCallback(async (doctorId, updateData) => {
        setLoading(true);
        setError(null);

        const url = `${equipoMedicoApiUrl}/doctor/updateDoctor/${doctorId}`; 

        try {
            const response = await fetch(url, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Server error' }));
                
                if (response.status === 404) {
                    throw new Error(errorData.message || `El profesional con ID ${doctorId} no fue encontrado.`);
                }
                
                throw new Error(errorData.message || 'Fallo al actualizar el profesional.');
            }

            const updatedDoctor = await response.json();
            return updatedDoctor;

        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    

    return { doctors, loading, error, fetchDoctorsData, updateDoctor };
};

export default useEquipoApi;