import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { services } from '../../apiHelpers/index';
import { Link } from 'react-router-dom';
import validateField from "./Validations";

function DriverRegistration() {
    const teamOptions = useSelector(state => state.teams);
    const nationalityOptions = useSelector(state => state.nationalitys);  
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        description: '',
        nationality: '',
        image: '',
        birthdate: '',
        teamId: []
    });
    const [formErrors, setFormErrors] = useState({
        name: '', 
        lastname: '',
        description: '',
        nationality: '',
        image: '',
        birthdate: '',
        teamId: '',
    });

    const validateForm = () => {
        const errors = {};
        // Validar cada campo utilizando la función de validación genérica
        for (const fieldName in formData) {
        if (Object.hasOwnProperty.call(formData, fieldName)) {
            const value = formData[fieldName];
            const errorMessage = validateField(fieldName, value);
            errors[fieldName] = errorMessage;
        }
        }
        return errors;
    };
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        const errors = validateForm();
        setFormErrors(errors);
        setFormData({ ...formData, [name]: value });
    };    
    
    const handleTeamChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map((option) => parseInt(option.value, 10));
        setFormData({ ...formData, teamId: selectedOptions });
    };  
    
    const handleSubmit = async (event) => {

        event.preventDefault();
        const hasErrors = Object.values(formErrors).some((error) => error !== '');
        if (hasErrors) {
            console.error('El formulario tiene errores. No se puede enviar.');
            return;
        }

        try {
            const response = await services.newDriver(formData);

            console.log('Registro exitoso:', response);

        } catch (error) {
            console.error('Error al registrar el conductor:', error);            
        }
    };

    useEffect(() => {
        const errors = validateForm();
        setFormErrors(errors);
    },[]);

    useEffect(() => {
        const errors = validateForm();
        setFormErrors(errors);
    },[formData]);

    return (
        <>
        <Link to="/home">
            <button>Ir a Inicio</button>
        </Link>
        <div>
            <h2>Registrar Nuevo Conductor</h2>
            <form onSubmit={handleSubmit}>
                
                <br/>

                <label>
                    Nombre:<input type="text" name="name" value={formData.name} onChange={handleChange} />
                    {formErrors.name && (<div>{formErrors.name}</div>)}
                </label>
                <br/>
                <label>
                    Apellido: <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
                    {formErrors.lastname && (<div>{formErrors.lastname}</div>)}
                </label>
                
                <br/>

                <label>
                    Descripción: <input type="text" name="description" value={formData.description} onChange={handleChange} />
                    {formErrors.description && (<div>{formErrors.description}</div>)}
                </label>
                
                <br/>

                <label>
                    Nacionalidad: 
                    <select name="nationality" value={formData.nationality} onChange={handleChange}>
                        <option value="Not select">Not select</option>
                    {nationalityOptions.map((option) => (
                        <option key={option.value} value={option.text}>
                            {option.text}
                        </option>
                        ))}
                    </select>
                    {formErrors.nationality && (<div>{formErrors.nationality}</div>)}
                </label>
                
                <br/>

                <label>
                    Imagen: <input type="text" name="image" value={formData.image} onChange={handleChange} />
                    {formErrors.image && (<div>{formErrors.image}</div>)}
                </label>
                
                <br/>

                <label>
                    Fecha de Nacimiento: <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
                    {formErrors.birthdate && (<div>{formErrors.birthdate}</div>)}
                </label>
                
                <br/>

                <label>
                    Equipo: 
                    <select name="teamId" multiple value={formData.teamId} onChange={handleTeamChange}>
                        {teamOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                        ))}
                    </select>
                    {formErrors.teamId && (<div>{formErrors.teamId}</div>)}
                </label>
                
                <br/>

                <button type="submit">Registrar Conductor</button>
            </form>
        </div>
        </>
    );
}

export default DriverRegistration;