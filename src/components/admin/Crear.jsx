import '../../styles/equipo.css'
import { Link , useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import useAdminApi from '../../hooks/useAdminApi'
import useDepartmentApi from '../../hooks/useDepartmentApi';

const Crear = () => {

    const { 
        department: departments, 
        loading: departmentsLoading, 
        error: departmentsError 
    } = useDepartmentApi();

    const [department, setDepartment] = useState('');
    const [name, setName] = useState('');
    const [lastName, setlastName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const navigate = useNavigate();

    const { createDoctor, loading: createLoading, error: createError } = useAdminApi();

    const handleCreateDoctor = async () => {

        const newDoctorData = {
            department, 
            name,
            lastName,
            city,
            country,
            avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=oliviayoung&size=300&radius=10"
        };

        try {
            const result = await createDoctor(newDoctorData);
            console.log("Doctor created successfully:", result);
            alert("Doctor creado con éxito!");
            navigate('/adminPage');
        } catch (e) {
            console.error("Creation failed.", e);
        }
    };
    
    const isLoading = createLoading || departmentsLoading;
    const currentError = createError || departmentsError;

    if (departmentsLoading) {
        return <div className='loading-container'><p>Cargando departamentos...</p></div>;
    }

    if (departmentsError) {
        return <div className='error-container'>Error al cargar departamentos: {departmentsError}</div>;
    }

    return (
        <>
            <h1>Agregue los valores para crear el nuevo usuario</h1>

            {isLoading && <p>Creando Doctor...</p>}

            {currentError && <p style={{ color: 'red' }}>Error: {currentError}</p>}

            <h3>
                <button className='search-button'>
                    <Link to="/adminPage">BACK</Link>
                </button>
            </h3>

            <div className='equipo-profesional-container'>
                <h3>
                    <label htmlFor="department-select">Departamento:</label>
                    <select
                        id="department-select"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    >
                        <option value="" disabled>-- Elija un departamento --</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                </h3>

                <h3>
                    Nombre:
                    <input
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </h3>

                <h3>
                    Apellido:
                    <input
                        type="text"
                        placeholder="Apellido"
                        value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                    />
                </h3>
                <h3>
                    Ciudad:
                    <input
                        type="text"
                        placeholder="ciudad"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </h3>

                <h3>
                    Pais:
                    <input
                        type="text"
                        placeholder="pais"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </h3>

                <button onClick={handleCreateDoctor} disabled={isLoading || departments.length === 0}>
                    DONE
                </button>
            </div>
        </>
    )
}

export default Crear