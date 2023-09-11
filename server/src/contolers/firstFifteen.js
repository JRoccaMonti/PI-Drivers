/*
GET | /drivers/name?="..."
Esta ruta debe obtener los primeros 15 drivers que se encuentren con la palabra recibida por query.
Debe poder buscarlo independientemente de mayúsculas o minúsculas.
Si no existe el driver, debe mostrar un mensaje adecuado.
Debe buscar tanto los de la API como los de la base de datos.
*/
const axios = require('axios');
const { Op } = require('sequelize');
const { Driver } = require('../db');

const firstFifteen = async (req, res) => {
    try {
        const { name } = req.query; // Obtén el parámetro de consulta 'name'
        console.log(name);
        // Consulta tanto en la API como en la base de datos
        const apiResponse = await axios.get('http://localhost:5000/drivers');
        const apiDrivers = apiResponse.data;

        const dbDrivers = await Driver.findAll({
            where: {
                [Op.or]: [
                    { 'name': { [Op.iLike]: `%${name}%` } },
                    { 'lastname': { [Op.iLike]: `%${name}%` } },
                ],
            },
        });

        //mover a un heper
        function filterDrivers(driver) {
            const fullName = `${driver.name.forename} ${driver.name.surname}`.toLowerCase();
            const searchTerm = name.toLowerCase();
            return fullName.includes(searchTerm) || driver.name.forename.toLowerCase().includes(searchTerm) || driver.name.surname.toLowerCase().includes(searchTerm);
        }
          
        const matchingDrivers = [...apiDrivers.filter(filterDrivers), ...dbDrivers].slice(0, 15);

        if (matchingDrivers.length === 0) {
            return res.status(404).json({ message: 'No se encontraron conductores.' });
        }

        res.status(200).json(matchingDrivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { firstFifteen };
