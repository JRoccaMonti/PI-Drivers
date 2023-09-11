/*
GET | /teams
Obtiene un arreglo con todos los teams existentes de la API.
En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los teams que encuentres en la API.
Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.
*/

const axios = require('axios');
const { Teams } = require('../db');

const storageTeams = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/drivers'); // peticion get al api
        const list = response.data; // guarda los datos
        if (list.error) { // si es error da 404
            return res.status(404).json({message: "Not found"});
        };
        
        const teamList =new Set();
        for (const driver of list) {
            if (driver.teams) { // Verifica si 'teams' existe en el objeto 'driver'
                const teams = driver.teams.split(/,\s*|\s*,/); // Divide la cadena por comas con o sin espacio
                teams.forEach(team => {
                    teamList.add(team.trim());
                });
            };
        };   

        for (const teamName of teamList) {
            const [team, created] = await Teams.findOrCreate({
                where: { name: teamName },
                defaults: { name: teamName },
            });
        }

        res.status(200).json(); // envia la lista de corredores

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports={storageTeams};