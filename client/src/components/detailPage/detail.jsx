import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { services } from '../../apiHelpers/index';
import { Link, useParams } from 'react-router-dom';

function DetailPage() {
    const { id } = useParams();
    const [driver, setDriver] = useState({});

    useEffect(() => {
        services.getDetails(id)
        .then((data) => {
          console.log(data);
          if (data.name) {
  
            setDriver(data);

          } else {
            window.alert('No hay personajes con ese ID');
          }
        })
        .catch((error) => {
          console.error('Error fetching driver data:', error);
        });
  
      // Limpieza del estado al desmontar el componente
      return () => {
        setDriver({});
      };
    }, [id]);

    const regex = /https:\/\/commons\.wikimedia\.org\/w\/index\.php\?curid=\d+/;
    return (
      <div>
        <Link to="/home">
            <button>Ir a Inicio</button>
        </Link>
        {(
          <div >
            <div >
{/*
              <h2 >{driver.name || driver.name.forename}</h2>    */}      
            
              
              <div >
                <ul >
                  
                  <li>Nombre: {typeof driver.name === 'object' ? driver.name.forename : driver.name || 'N/A'}</li>
                  
                  <li>Apellido: {driver.lastname || (driver.name && driver.name.surname) || "No contenido en data.js"}</li>

                  <li >nationality: {driver.nationality || "No contenido en data.js"}</li>

                  <li >description: {driver.description || "No contenido en data.js"}</li>

                  <li >birthdate: {driver.birthdate|| driver.dob|| "No contenido en data.js"}</li>

                  <li >teams: {driver.teams || "No contenido en data.js"}</li>

                  <img src={typeof driver.image === 'object' ? driver.image.url : driver.image}/>

                </ul>
              </div>
              
            </div>  
          </div>    
        )}
      </div>
    );
  }
  
  export default DetailPage;