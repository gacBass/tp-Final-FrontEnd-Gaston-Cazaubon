import { useState, useCallback } from 'react';

const useAdminApi = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const equipoMedicoApiUrl = import.meta.env.VITE_EQUIPO_MEDICO_API_URL;

    const baseUrl = equipoMedicoApiUrl;

    const createDoctor = useCallback(async (newDoctorData) => {
        setLoading(true);
        setError(null);

        const createUrl = equipoMedicoApiUrl + '/doctor/createDoctor';

        try {
            const response = await fetch(createUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDoctorData),

            });

            if (!response.ok) {
                const errorDetails = await response.text();
                const errorMessage = `Error HTTP ${response.status}: ${errorDetails || 'Failed to create doctor.'}`;
                throw new Error(errorMessage);
            }

            const createdDoctor = await response.json();
            return createdDoctor;

        } catch (err) {
            console.error("Error during doctor creation: ", err);
            setError(err.message || "Ocurrió un error inesperado al eliminar.");
            throw err; 
        } finally {
            setLoading(false);
        }
    }, [baseUrl]);


    const deleteDoctor = useCallback(async (deleteID) => {
        setLoading(true);
        setError(null);

        const deleteUrl = equipoMedicoApiUrl + '/doctor/deleteDoctor' + '/' + deleteID;

        try {
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                const errorMessage = `Error HTTP ${response.status}: ${errorDetails || 'Failed to delete doctor.'}`;
                throw new Error(errorMessage);
            }


            setDoctors(prevDoctors => {
                const doctorList = Array.isArray(prevDoctors) ? prevDoctors : Object.values(prevDoctors);

                return doctorList.filter(doctor => doctor._id !== deleteID);
            });

            console.log(`Doctor with ID ${deleteID} successfully deleted.`);

        } catch (err) {
            console.error("Error during doctor deletion: ", err);
            setError(err.message || "Ocurrió un error inesperado al eliminar.");
        } finally {
            setLoading(false);
        }
    }, [baseUrl]);

    return { doctors, loading, error, deleteDoctor, createDoctor };
};

export default useAdminApi;