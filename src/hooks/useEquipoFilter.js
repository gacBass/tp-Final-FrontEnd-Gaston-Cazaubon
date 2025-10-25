import React, { useState, useEffect, useCallback } from 'react';

const useEquipoFilter = () => {

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [singleDoctor, setSingleDoctor] = useState(null);

    const equipoMedicoApiUrl = import.meta.env.VITE_EQUIPO_MEDICO_API_URL;

    const fetchDoctorsData = useCallback(async (filterby, filterValue) => {
        setLoading(true);
        setError(null);
        setDoctors([]);

        const url = equipoMedicoApiUrl + '/doctor/getDoctors/' + filterValue;

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
            
            if (Array.isArray(data.doctors) || Array.isArray(data)) {
                setDoctors(data.doctors || data);
            } else if (typeof data === 'object' && data !== null && (data.message || data.error)) {
                 // Handle structured non-array response (e.g., from service layer)
                setDoctors([]);
                setError(data.message || data.error);
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

    }, [equipoMedicoApiUrl, setLoading, setError, setDoctors]);


    const fetchDoctorById = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        setSingleDoctor(null);

        const url = equipoMedicoApiUrl + '/doctor/getDoctors/' + id;

        if (!url) {
            setLoading(false);
            setError("La URL de la API no está configurada.");
            console.error("VITE_EQUIPO_MEDICO_API_URL no está definida.");
            return null;
        }

        try {
            const response = await fetch(url);

            if (!response.ok) {
                const errorDetails = await response.text();
                const errorMessage = `Error HTTP ${response.status}: ${errorDetails || 'Error desconocido del servidor.'}`;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('API Response Data:', data);

            setSingleDoctor(data);
            return data;

        } catch (err) {
            console.error("Error al obtener datos: ", err);
            setError(err.message || "Ocurrió un error inesperado.");
            throw err;
        } finally {
            setLoading(false);
        }
    }, [equipoMedicoApiUrl, setLoading, setError, setSingleDoctor]);


    const fetchDoctorByDepartment = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        setDoctors([]);

        const url = equipoMedicoApiUrl + '/doctor/getDoctorByDepartment/' + id;

        if (!url) {
            setLoading(false);
            setError("La URL de la API no está configurada.");
            console.error("VITE_EQUIPO_MEDICO_API_URL no está definida.");
            return null;
        }

        try {
            const response = await fetch(url);

            if (!response.ok) {
                const errorDetails = await response.text();
                const errorMessage = `Error HTTP ${response.status}: ${errorDetails || 'Error desconocido del servidor.'}`;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('API Response Data:', data);
            
            // Set the state based on the expected service response structure { doctors: [...] }
            if (data && Array.isArray(data.doctors)) {
                setDoctors(data.doctors);
            } else {
                setDoctors([]);
            }
            
            // Return data structure for immediate consumption
            return data;

        } catch (err) {
            console.error("Error al obtener datos: ", err);
            setError(err.message || "Ocurrió un error inesperado.");
            throw err;
        } finally {
            setLoading(false);
        }
    }, [equipoMedicoApiUrl, setLoading, setError, setDoctors]);

    return { doctors, singleDoctor, loading, error, fetchDoctorsData, fetchDoctorById, fetchDoctorByDepartment };
}

export default useEquipoFilter;