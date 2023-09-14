import { GET_TEAMS,GET_DRIVERS,GET_DRIVERS_NAME,ORDER,FILTER} from './actionTypes';
import axios from "axios";

const initialState = {
  teams: [],
  nationalitys: [],
  drivers: [],
  filteredDrivers: []
};


const reducer = (state = initialState, action) => {
    switch (action.type) {

      case GET_DRIVERS:
        return {
          ...state,
          drivers: action.payload,
          filteredDrivers: action.payload
        };

      case GET_DRIVERS_NAME:
        return {
          ...state,
          drivers: action.payload
        };

      case GET_TEAMS: 
          return { 
          ...state, 
          teams: action.payload.teamsList,
          nationalitys: action.payload.nationalitysList       
        };

      case FILTER:
        const teamsFilter = action.payload.teams; // Valor ingresado por el usuario para teams
        const nationalityFilter = action.payload.nationality; // Valor ingresado por el usuario para nationality
            
        const filtered = state.drivers.filter(driver => {
          // Dividir la cadena driver.teams en un array de equipos
          const driverTeams = driver.teams.split(',').map(team => team.trim());
      
          // Verificar si al menos uno de los equipos seleccionados por el usuario está presente en driver.teams
          return (
            (!teamsFilter || teamsFilter === 'All' || driverTeams.includes(teamsFilter)) && // Filtrar driver.teams
            (!nationalityFilter || nationalityFilter === 'All' || driver.nationality === nationalityFilter) // Filtrar driver.nationality
          );

        });
          
        return {
          ...state,
          filteredDrivers: filtered // La estructura de filtered coincide con la estructura original de state.drivers
        };
          
      

      default: return {...state};
    }
  };


  export { reducer as rootReducer, initialState };