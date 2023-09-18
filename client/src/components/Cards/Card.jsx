import React, { useState, useEffect } from 'react';

function Card({driver}) { 

    return (
        <div>
            <div>
                <img src={typeof driver.image === 'object' ? driver.image.url : driver.image}/>
            </div>
            <ul>
                <li>Apellido: {driver.lastname || (driver.name && driver.name.surname) || "No contenido en data.js"}</li>
                  
                <li>Nombre: {typeof driver.name === 'object' ? driver.name.forename : driver.name || 'N/A'}</li>

                <li >teams: {driver.teams || "No contenido en data.js"}</li>
            </ul>
        </div>
    );
}
export default Card;