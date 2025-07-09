
import useEquipoApi from '../../hooks/useEquipoApi'
import React, { useState } from 'react'
import './equipo.css'
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
        <>
            <h1>Esta la lista de nuestros profesionales</h1>
            <h3><button className='search-button'><Link to="/search">Buscar</Link></button></h3>

            {doctors.map((doctor) => (
                <div key={doctor.id}>
                    <div className='equipo-profesional-container'>
                        <img src={doctor.avatar} alt={`Avatar de ${doctor.name}`} className='img-fluid rounded-start' style={{ width: '200px', height: '200px' }} />
                        <h3> Departamento: <span> {doctor.department}</span> </h3>
                        <h3> Nombre:<span> {doctor.name} </span></h3>
                        <h3> Ciudad:<span> {doctor.ciudad}</span> </h3>
                        <h3> Pais:<span> {doctor.pais}</span> </h3>

                    </div>
                </div>
            ))}

        </>


    )
}
export default EquipoProfesional