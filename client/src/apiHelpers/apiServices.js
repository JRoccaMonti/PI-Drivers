import axios from "axios";

const localEndpoint = 'http://localhost:3001/';
const ipEndpoint = 'http://192.168.1.83:3001/';

export async function newDriver(formData) {
    try {
        console.log(formData);
        const response = await axios.post(`${localEndpoint}driver`, formData);
        return response.data;

    } catch (localError) {
        //console.error('Error en solicitud local:', localError);

        // Si falla la solicitud local, intenta la solicitud a la dirección IP
        try {
            const ipResponse = await axios.post(`${localEndpoint}driver`, formData);
            return ipResponse.data;
        } catch (ipError) {
            console.error('Error en solicitud por IP:', ipError);
            // Puedes manejar el error de la manera que desees aquí.
        }
    }
}

export const getDetails = async (id) => {
    try {

      const response = await axios.get(`${ipEndpoint}drivers/${id}`);
      //console.log(response.data);
      return response.data;

    } catch (localError) {
        // Si falla la solicitud local, intenta la solicitud a la dirección IP

        try {
            const ipResponse = await axios.post(`${ipEndpoint}drivers/${id}`);
            return ipResponse.data;

        } catch (ipError) {
            console.error('Error en solicitud por IP:', ipError);
            // Puedes manejar el error de la manera que desees aquí.
        }
    }
  };
