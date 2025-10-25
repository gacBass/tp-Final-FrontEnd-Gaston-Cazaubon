
import useEquipoApi from '../../hooks/useEquipoApi'
import React, { useState } from 'react'
import '../../styles/equipo.css'
import { Link } from 'react-router-dom';


const EquipoProfesional = () => {


    const { doctors, loading, error } = useEquipoApi();



    if (loading) {
        return <div className='loading-container'>
            <img src="/assets/loader.gif" alt="Loading..." />

        </div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }



    return (
        <div className="public-doctor-list">
            
            <header className="public-header">
                <h1>Esta es la lista de nuestros profesionales</h1>
                <div className="action-toolbar">
                    <Link to="/search" className='search-button'>
                        🔎 Buscar
                    </Link>
                </div>
            </header>

            <div className="doctors-grid">
                
                {(doctors && doctors.length === 0) && !loading && <p>No se encontraron profesionales.</p>}

                {(doctors || []).map((doctor) => (
                    <div key={doctor._id || doctor.id} className='doctor-card-wrapper'>
                        
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
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default EquipoProfesional