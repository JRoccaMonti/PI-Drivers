import axios from "axios";

export async function newDriver(formData) {
    try {
        const response = await axios.post('http://localhost:3001/driver', formData);
        return response.data;
    } catch (error) {
        console.error('Error apiServices:', error);
    }
}