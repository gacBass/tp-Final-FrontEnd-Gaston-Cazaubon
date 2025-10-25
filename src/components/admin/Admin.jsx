import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useEquipoApi from '../../hooks/useEquipoApi';
import useAdminApi from '../../hooks/useAdminApi';
import useLogin from '../../hooks/useLoginApi.js'; 
import { useAuth } from '../../context/AuthContext'; // 💡 FIX 1: Import the useAuth hook
import '../../styles/equipo.css';

const Admin = () => {
    // --- Hook Initializations ---
    const { doctors, loading: loadingDoctors, error: errorDoctors, fetchDoctorsData } = useEquipoApi();
    const { deleteDoctor } = useAdminApi();
    
    const { logout, loading: loadingAuth } = useLogin(); 
    const { setAuthStatus } = useAuth(); // 💡 FIX 2: Get the setter function from context
    const navigate = useNavigate();
    
    const loading = loadingDoctors || loadingAuth;
    const error = errorDoctors; 

    // --- Initial Data Fetch ---
    useEffect(() => {
        fetchDoctorsData();
    }, [fetchDoctorsData]);

    // --- The Logout Handler ---
    const handleLogout = async () => {
        try {
            await logout(); // 1. Call API to clear HttpOnly cookie
            
            // 2. 💡 FIX 3: Reset the global front-end authentication status immediately
            setAuthStatus(false);
            
            // 3. Navigate the user to the login page
            navigate('/login'); 
            
        } catch (err) {
            console.error("Fallo al cerrar sesión:", err);
            // Even if the API call fails, we assume the user is logging out
            setAuthStatus(false); 
            navigate('/login'); 
        }
    };

    // --- Conditional Renders (Unchanged) ---
    if (loading) {
        return (
            <div className='loading-container'>
                <img src="/assets/loader.gif" alt="Loading..." />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // --- Delete Handler (Unchanged) ---
    const handleDelete = async (doctorId) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este doctor?")) {
            try {
                await deleteDoctor(doctorId);
                await fetchDoctorsData();
                console.log(`Doctor ${doctorId} eliminado.`);
            } catch (err) {
                console.error("Error al eliminar el doctor:", err);
                alert("Fallo al eliminar el doctor. Revisa la consola.");
            }
        }
    };

    // --- Main Render (Unchanged except for the button click) ---
    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>Desde aquí puede crear, editar o remover profesionales</h1>
                <div className="action-toolbar">
                    <Link to="/crear" className='search-button'>
                        ➕ CREAR PROFESIONAL
                    </Link>

                    {/* Logout Button */}
                    <button 
                        onClick={handleLogout} 
                        disabled={loadingAuth} 
                        className='search-button-reset'
                    >
                        {loadingAuth ? 'CERRANDO...' : 'LOG OUT'}
                    </button>
                </div>
            </header>
            {/* ... rest of the component (doctors grid) ... */}
            <div className="doctors-grid">
                {doctors.length === 0 && <p>No se encontraron profesionales.</p>}
                {doctors.map((doctor) => (
                    <div key={doctor._id} className='doctor-card-wrapper'>
                        <div className='equipo-profesional-container'>
                            <img
                                src={doctor.avatar}
                                alt={`Avatar de ${doctor.name}`}
                            />
                            <h2>{doctor.name} {doctor.lastName}</h2>

                            <p>
                                <strong>Departamento:</strong> <span>{doctor.department}</span>
                            </p>
                            <p>
                                <strong>Lugar:</strong> <span>{doctor.city}, {doctor.country}</span>
                            </p>

                            <div className="card-actions">
                                <Link to={`/edit/${doctor._id}`} className='edit outline'>
                                    EDITAR
                                </Link>

                                <button
                                    className='remove outline'
                                    onClick={() => handleDelete(doctor._id)}
                                >
                                    REMOVER
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Admin;