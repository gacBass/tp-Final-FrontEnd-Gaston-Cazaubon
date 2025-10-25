import React, { useState } from 'react';
import useEquipoFilter from '../../hooks/useEquipoFilter';
import useDepartmentApi from '../../hooks/useDepartmentApi';
import '../../styles/equipo.css';
import { Link } from 'react-router-dom';

const Search = () => {

    const [searchInput, setSearchInput] = useState('');
    const [filterby, setFilterBy] = useState('');
    
    const { 
        doctors: filteredDoctors,
        loading: filterLoading,
        error: filterError,
        fetchDoctorsData, 
        fetchDoctorByDepartment 
    } = useEquipoFilter();

    const { 
        department: departments, 
        loading: departmentsLoading, 
        error: departmentsError 
    } = useDepartmentApi();

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    }

    const handleFilterBy = (event) => {
        setFilterBy(event.target.value);
    }

    const handleSearchClick = () => {
        if (filterby) {
            fetchDoctorByDepartment(filterby);
        } else if (searchInput) {
            fetchDoctorsData(filterby, searchInput);
        }
    }

    const handleResetClick = () => {
        location.reload();
    }

    const currentLoading = filterLoading || departmentsLoading;
    const currentError = filterError || departmentsError;

    const doctorsToDisplay = filteredDoctors;
    const isSingleDoctor = doctorsToDisplay && !Array.isArray(doctorsToDisplay);
    const doctorList = isSingleDoctor ? [doctorsToDisplay] : doctorsToDisplay;


    return (
        <>
            <div className='search'><h2>Filtro por especialidad: </h2>
                <select value={filterby} onChange={handleFilterBy} disabled={departmentsLoading || departmentsError}>
                    <option value="">-- Filtrar por Departamento --</option>
                    {departments.map((dept) => (
                        <option key={dept._id} value={dept.name}>
                            {dept.name} 
                        </option>
                    ))}
                </select>
                <button className='search-button' onClick={handleSearchClick} disabled={currentLoading}>Buscar</button>
                <button className='search-button'><Link to="/equipo-profesional">Volver</Link></button>
            </div>

            {currentLoading && (
                <div className='loading-container'>
                    <img src="/assets/loader.gif" alt="Loading..." />
                </div>
            )}

            {currentError && (
                <div className='search-error'> <h2>{currentError}</h2></div>
            )}

            {doctorList && Array.isArray(doctorList) && doctorList.length > 0 ? (
                doctorList.map((doctor) => (
                    <div key={doctor._id} className='equipo-profesional-container-wrapper'>
                        <div className='equipo-profesional-container'>
                            <img src={doctor.avatar} alt={`Avatar de ${doctor.name}`} className='img-fluid rounded-start' style={{ width: '200px', height: '200px' }} />
                            <h3> Departamento: <span> {doctor.department}</span> </h3>
                            <h3> Nombre:<span> {doctor.name} </span></h3>
                            <h3> Ciudad:<span> {doctor.city}</span> </h3>
                            <h3> Pais:<span> {doctor.country}</span> </h3>
                        </div>
                    </div>
                ))
            ) : (
                !currentLoading && !currentError && <p>No se encontró información del doctor.</p>
            )}
        </>
    )
}

export default Search;