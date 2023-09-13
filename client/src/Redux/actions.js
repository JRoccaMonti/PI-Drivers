import { POST_DRIVER, GET_TEAMS,GET_DRIVER_ID,GET_DRIVERS,GET_DRIVERS_NAME,ORDER,FILTER} from './actionTypes';
import axios from "axios";

export const getTeams = () => {
    const endpoint = 'http://localhost:3001/teams';
    return (dispatch) => {
       axios.get(endpoint).then(({ data }) => {
          return (          
            dispatch({
              type: GET_TEAMS,
              payload: data.teamsList,           
            })
          );
       });
    };
};


