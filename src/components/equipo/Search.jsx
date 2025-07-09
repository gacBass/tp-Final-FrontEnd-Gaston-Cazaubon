import React, { useState } from 'react'
import useEquipoFilter from '../../hooks/useEquipoFilter';
import '../../styles/equipo.css';
import { Link } from 'react-router-dom';

const Search = () => {


    const [searchInput, setSearchInput] = useState('');
    const [filterby, setFilterBy] = useState('ciudad')
    const { doctors, loading, error, fetchDoctorsData } = useEquipoFilter();

    const handleInputChange = (event) => {

        setSearchInput(event.target.value);

    }

    const handleFilterBy = (event) => {

        setFilterBy(event.target.value);

    }
    const handleSearchClick = (event) => {

        fetchDoctorsData(filterby, searchInput);

    }

    const handleResetClick = () => {
        location.reload();

    }


    return (
        <>

            <div className='search'><h2>Realizar Busqueda: </h2>
                <select name="" id="" onChange={handleFilterBy}>
                    <option value="ciudad">Ciudad</option>
                    <option value="pais">Pais</option>
                    <option value="name" enabled>Nombre</option>
                </select>
                <input type="text" placeholder='Ingrese texto total o una parte de el ' value={searchInput} onChange={handleInputChange} />
                <button className='search-button' onClick={handleSearchClick}>Buscar</button>
                <button className='search-button-reset' onClick={handleResetClick}>Reset</button>
                <button className='search-button'><Link to="/equipo-profesional">Volver</Link></button>



            </div>


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

            {loading && (
                <div className='loading-container'>
                    <img src="/assets/loader.gif" alt="Loading..." />

                </div>
            )}


            {error && (
                <div className='search-error'> <h2>{error}</h2></div>
            )}

        </>


    )
}

export default Search