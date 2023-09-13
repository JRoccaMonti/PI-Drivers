import { POST_DRIVER, GET_TEAMS,GET_DRIVER_ID,GET_DRIVERS,GET_DRIVERS_NAME,ORDER,FILTER} from './actionTypes';
import axios from "axios";

export const getTeams = () => {
  return (dispatch) => {
      const localEndpoint = 'http://localhost:3001/teams';
      const ipEndpoint = 'http://192.168.1.83:3001/teams'; // Tu dirección IP

      // Intenta primero la solicitud a la dirección local
      axios.get(localEndpoint)
          .then(({ data }) => {
              dispatch({
                  type: GET_TEAMS,
                  payload: data.teamsList,
              });
          })
          .catch((localError) => {
              console.error('Error en solicitud local:', localError);

              // Si falla la solicitud local, intenta la solicitud a la IP
              axios.get(ipEndpoint)
                  .then(({ data }) => {
                      dispatch({
                          type: GET_TEAMS,
                          payload: data.teamsList,
                      });
                  })
                  .catch((ipError) => {
                      console.error('Error en solicitud por IP:', ipError);
                      // Puedes manejar el error de la manera que desees aquí.
                  });
          });
  };
};




