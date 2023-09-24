import React, { useEffect, useState } from 'react';
import { services } from '../../apiHelpers/index';
import { useParams } from 'react-router-dom';
import style from "./Detail.module.css";
import {getTeams ,getDrivers} from "../../Redux/actions";
import {useDispatch } from 'react-redux';

function DetailPage() {
    const { id } = useParams();
    const [driver, setDriver] = useState({});

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTeams());
        dispatch(getDrivers());
      }, [ ]);

    useEffect(() => {
        services.getDetails(id)
        .then((data) => {
          setDriver(data);
        })
        .catch((error) => {
          console.error('Error fetching driver data:', error);
        });
  
      // Limpieza del estado al desmontar el componente
      return () => {
        setDriver({});
      };
    }, [id]);
    return (
      <div className={style.containerBox}> 
        <div className={style.titleBox}>
          <h3>{typeof driver.name === 'object' ? driver.name.forename : driver.name || 'N/A'} {driver.lastname || (driver.name && driver.name.surname) || "No contenido en data.js"} "{driver.code || ""}"</h3>
        </div>
        <div className={style.dataBox}>
            <p className={style.nationBox}>Nationality: {driver.nationality}</p>
            <p className={style.birthdateBox}>Birthdate: {driver.birthdate|| driver.dob}</p>
            <p className={style.teamBox}>Teams: {driver.teams}</p>
            <p className={style.descriptionBox}>{driver.description || "Description not available"}</p>
        </div>
        <div className={style.imgBox}>
          <img className={style.imgRender} src={typeof driver.image === 'object' ? driver.image.url : driver.image}/>
        </div>
        <div className={style.footerBox} >
          <div className={style.wikiBox}>
           <a  href={driver.url || ""}>Wiki</a> 
          </div>
          <div className={style.idBox}>
            <p>Id: {driver.id}</p>
          </div>       
        </div>
      </div>
    );
  }
  
  export default DetailPage;