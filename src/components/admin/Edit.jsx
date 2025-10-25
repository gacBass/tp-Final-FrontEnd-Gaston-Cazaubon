import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../../styles/equipo.css';
import useEquipoApi from '../../hooks/useEquipoApi';
import useEquipoFilter from '../../hooks/useEquipoFilter';
import useDepartmentApi from '../../hooks/useDepartmentApi';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        department: departments,
        loading: departmentsLoading,
        error: departmentsError
    } = useDepartmentApi();

    const {
        updateDoctor,
        error: updateError,
        loading: isSubmittingApi
    } = useEquipoApi();

    const {
        fetchDoctorById,
        loading: isFetching,
        error: fetchError
    } = useEquipoFilter();

    const [formData, setFormData] = useState({
        department: '', name: '', lastName: '', city: '', country: '',
    });

    const isLoading = isFetching || departmentsLoading;
    const isSubmitting = isSubmittingApi;

    const [formError, setFormError] = useState(null);

    useEffect(() => {
        const fetchCurrentDoctor = async () => {
            setFormError(null);

            try {
                const data = await fetchDoctorById(id);

                if (!data || !data.name) {
                    throw new Error("Received empty data from the server.");
                }

                setFormData({
                    department: data.department || '',
                    name: data.name || '',
                    lastName: data.lastName || '',
                    city: data.city || '',
                    country: data.country || '',
                });
            } catch (err) {
                setFormError(err.message || "Error al cargar los datos del profesional.");
            }
        };

        if (id) {
            fetchCurrentDoctor();
        }
    }, [id, fetchDoctorById]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);

        try {
            await updateDoctor(id, formData);
            alert(`¡Profesional ${formData.name} actualizado con éxito!`);
            navigate('/adminPage');
        } catch (e) {
            setFormError(e.message || "Fallo la actualización del profesional.");
        }
    };

    const currentError = formError || fetchError || updateError || departmentsError;

    if (isLoading) {
        return <div className='loading-container'><p>Cargando datos del profesional...</p></div>;
    }

    if (currentError) {
        return <div className='error-container'>Error: {currentError}</div>;
    }

    if (!formData || !formData.name) {
        return <div className='error-container'>No se pudieron cargar los datos del profesional.</div>;
    }

    return (
        <div className="create-page-container">
            <h1>Edite a {formData.name} {formData.lastName}</h1>

            <div className="back-button-bar">
                <Link to="/adminPage" className='search-button'>← VOLVER</Link>
            </div>

            {currentError && <p style={{ color: 'red' }}>Error: {currentError}</p>}

            <form className='creation-form' onSubmit={handleSubmit}>
                <div className='equipo-profesional-container'>

                    <div className="form-group">
                        <label htmlFor="department-select">Seleccionar Departamento:</label>
                        <select
                            id="department-select"
                            name="department"
                            onChange={handleChange}
                            value={formData.department}
                        >
                            <option value="" disabled>-- Elija un departamento --</option>

                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group"><label htmlFor="name">Nombre:</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} /></div>
                    <div className="form-group"><label htmlFor="lastName">Apellido:</label><input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} /></div>
                    <div className="form-group"><label htmlFor="city">Ciudad:</label><input type="text" id="city" name="city" value={formData.city} onChange={handleChange} /></div>
                    <div className="form-group"><label htmlFor="country">País:</label><input type="text" id="country" name="country" value={formData.country} onChange={handleChange} /></div>

                    <button type="submit" className="search-button" disabled={isSubmitting || isLoading}>
                        {isSubmitting ? 'ACTUALIZANDO...' : 'DONE (ACTUALIZAR)'}
                    </button>

                </div>
            </form>
        </div>
    );
};

export default Edit;