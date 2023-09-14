import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { services } from '../../apiHelpers/index';
import { Link } from 'react-router-dom';

function DriverRegistration() {
    const teamOptions = useSelector(state => state.teams);
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        description: '',
        nationality: '',
        image: '',
        birthdate: '',
        teamId: []
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleTeamChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map((option) => parseInt(option.value, 10));
        setFormData({ ...formData, teamId: selectedOptions });
    };
    
    

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {
            console.log('Datos a enviar:', formData);

            const response = await services.newDriver(formData);

            console.log('Registro exitoso:', response);

        } catch (error) {

            console.error('Error al registrar el conductor:', error);
            
        }
    };

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
                </label>
                <br/>
                <label>
                    Apellido: <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
                </label>
                
                <br/>

                <label>
                    Descripción: <input type="text" name="description" value={formData.description} onChange={handleChange} />
                </label>
                
                <br/>

                <label>
                    Nacionalidad: <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
                </label>
                
                <br/>

                <label>
                    Imagen: <input type="text" name="image" value={formData.image} onChange={handleChange} />
                </label>
                
                <br/>

                <label>
                    Fecha de Nacimiento: <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
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
                </label>
                
                <br/>

                <button type="submit">Registrar Conductor</button>
            </form>
        </div>
        </>
    );
}

export default DriverRegistration;