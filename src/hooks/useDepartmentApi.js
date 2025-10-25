import { useState, useEffect, useCallback } from 'react';

const useDepartmentApi = () => {
    const [department, setDepartment] = useState([]);
    const [departmentById, setDepartmentById] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Assuming this constant is available from a build tool (like Vite)
    const equipoMedicoApiUrl = import.meta.env.VITE_EQUIPO_MEDICO_API_URL;

    const fetchDepartments = useCallback(async () => {
        setLoading(true);
        setError(null);
        setDepartment([]);

        // ... (Your existing logic for constructing the URL and checking the environment variable)
        const url = equipoMedicoApiUrl + '/department/getDepartments';

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
                setDepartment(data);
            } else if (typeof data === 'object' && data !== null) {
                // If it's an object, converts values to an array (as you had)
                setDepartment(Object.values(data)); 
            } else {
                console.warn("La API no devolvió un formato esperado.");
                setDepartment([]);
            }

        } catch (err) {
            console.error("Error al obtener datos de los departamentos:", err); // changed "doctores" to "departamentos"
            setError(err.message || "Ocurrió un error inesperado.");
            setDepartment([]);
        } finally {
            setLoading(false);
        }
    }, [equipoMedicoApiUrl]); // Dependencies for useCallback

    // --- NEW: Add useEffect to run the fetch on component mount ---
    useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments]); // Run only when fetchDepartments changes (which it won't, due to useCallback)

    const fetchDepartmentsById = useCallback(async (departmentID) => {
        setLoading(true);
        setError(null);
        setDepartmentById([]);

        // ... (Your existing logic for constructing the URL and checking the environment variable)
        const url = equipoMedicoApiUrl + '/department/getDepartments/' + departmentID;

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
                setDepartmentById(data);
            } else if (typeof data === 'object' && data !== null) {
                // If it's an object, converts values to an array (as you had)
                setDepartmentById(Object.values(data)); 
            } else {
                console.warn("La API no devolvió un formato esperado.");
                setDepartmentById([]);
            }

        } catch (err) {
            console.error("Error al obtener datos de los departamentos:", err); // changed "doctores" to "departamentos"
            setError(err.message || "Ocurrió un error inesperado.");
            setDepartmentById([]);
        } finally {
            setLoading(false);
        }
    }, [equipoMedicoApiUrl, setLoading, setError, setDepartmentById]);

    return {
        department,
        departmentById,
        loading,
        error,
        fetchDepartmentsById,
        refetch: fetchDepartments, // Optional: return the function to manually trigger a re-fetch
    };
};
export default useDepartmentApi;