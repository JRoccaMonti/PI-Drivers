import axios from "axios";

const localEndpoint = 'http://localhost:3001/driver';
const ipEndpoint = 'http://192.168.1.83:3001/driver';

export async function newDriver(formData) {
    try {
        const response = await axios.post(localEndpoint, formData);
        return response.data;
    } catch (localError) {
        console.error('Error en solicitud local:', localError);

        // Si falla la solicitud local, intenta la solicitud a la dirección IP
        try {
            const ipResponse = await axios.post(ipEndpoint, formData);
            return ipResponse.data;
        } catch (ipError) {
            console.error('Error en solicitud por IP:', ipError);
            // Puedes manejar el error de la manera que desees aquí.
        }
    }
}
