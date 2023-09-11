/*
GET | /drivers
Obtiene un arreglo de objetos, donde cada objeto es un driver con su información.
IMPORTANTE: Si un driver no tiene imagen, deberás colocarle una por defecto 🖼️
*/
const axios = require('axios');

const allDrivers = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/drivers'); // peticion get al api
        const list = response.data; // guarda los datos 
    if (list.error) { // si es error da 404
        return res.status(404).json({message: "Not found"});
    }
    res.json(list); // envia la lista de corredores
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports={allDrivers};