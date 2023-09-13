import { POST_DRIVER, GET_TEAMS,GET_DRIVER_ID,GET_DRIVERS,GET_DRIVERS_NAME,ORDER,FILTER} from './actionTypes';
import axios from "axios";

const initialState = {
  teams: []
};


const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_TEAMS: 
            return { 
            ...state, 
            teams: action.payload 
            };
      

      default: return {...state};
    }
  };


  export { reducer as rootReducer, initialState };