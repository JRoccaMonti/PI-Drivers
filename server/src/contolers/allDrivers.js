/*
GET | /drivers
Obtiene un arreglo de objetos, donde cada objeto es un driver con su información.
IMPORTANTE: Si un driver no tiene imagen, deberás colocarle una por defecto 🖼️
*/
const axios = require('axios');
const { Driver, Teams , DriverTeam } = require('../db');

const allDrivers = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/drivers'); // peticion get al api
        
        const drivers = await Driver.findAll({ attributes: ['id', 'name', 'lastname', 'description', 'image', 'nationality', 'birthdate'],});
        
        const teams = await Teams.findAll({ attributes: ['id', 'name'],});
        
        const driverTeams = await DriverTeam.findAll({ attributes: ['DriverId', 'TeamId'],});
        
        // Crear un mapa para relacionar las asociaciones entre conductores y equipos
        const driverTeamMap = new Map();
        
        driverTeams.forEach((driverTeam) => {
            const driverId = driverTeam.DriverId;
            const teamId = driverTeam.TeamId;
        
            if (!driverTeamMap.has(driverId)) {
                driverTeamMap.set(driverId, []);
            }
        
            driverTeamMap.get(driverId).push(teamId);
        });
        
        // Asignar los equipos correspondientes a cada conductor
        const driversWithTeams = drivers.map((driver) => {

            const driverId = driver.id;

            const associatedTeamIds = driverTeamMap.get(driverId) || [];
        
            // Buscar los equipos asociados usando los IDs

            const associatedTeams = teams
                .filter((team) => associatedTeamIds.includes(team.id))
                .map((team) => team.name);
        
            // Agregar los equipos al objeto del conductor
            return {
                ...driver.toJSON(),
                teams: associatedTeams.join(', '),
            };
        });

        const list = response.data ; // guarda los datos

        list.forEach((driver) => {
            if (!driver.teams) {
                driver.teams = '';
            }
        });

        const combinedArray = list.concat(driversWithTeams);

        if (list.error) { // si es error da 404
            return res.status(404).json({message: "Not found"});
        }
    
        res.status(200).json({combinedArray}); // envia la lista de corredores
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports={allDrivers};