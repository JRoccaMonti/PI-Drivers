import React, { useState, useEffect } from 'react';
import style from "./Card.module.css";
import { NavLink } from 'react-router-dom';

function Card({driver}) { 

    return (
        <div className={style.container}>
            <div>
                <img className={style.ima} src={typeof driver.image === 'object' ? driver.image.url : driver.image}/>

                <NavLink to={`/detail/${driver.id}`} >
                    <p>{typeof driver.name === 'object' ? driver.name.forename : driver.name || 'N/A'} {driver.lastname || (driver.name && driver.name.surname) || "No contenido en data.js"}</p>
                </NavLink>
                <p>teams: {driver.teams || "No contenido en data.js"}</p>

            </div>
        </div>
    );
}
export default Card;