/* GET | /drivers/:idDriver
Esta ruta obtiene el detalle de un driver específico. Es decir que devuelve un objeto con la información pedida en el detalle de un driver.
El driver es recibido por parámetro (ID).
Tiene que incluir los datos del/los team/s del driver al que está asociado.
Debe funcionar tanto para los drivers de la API como para los de la base de datos.
*/

const axios = require('axios');
const { Driver, Teams, DriverTeam } = require('../db');

const detailById = async (req, res) => {
  try {
    const idSearch = req.params.idDriver; // Obtiene el ID del conductor a buscar desde los parámetros de la solicitud.

    try {
      // Intenta realizar una solicitud a una URL externa (un servicio externo de conductores).
      const response = await axios.get(`http://localhost:5000/drivers/${idSearch}`);

      if (response.status === 200) {
        // Si la solicitud externa tiene éxito (estado 200), devuelve la respuesta como JSON.
        return res.status(200).json(response.data);
      }
    } catch (error) {
      // Si la solicitud externa falla, continúa con la obtención de datos locales.
    }

    // Obtiene datos del conductor de la base de datos local.
    const drivers = await Driver.findByPk(idSearch, {
      attributes: ['id', 'name', 'lastname', 'description', 'image', 'nationality', 'birthdate'],
    });

    // Obtiene datos de todos los equipos desde la base de datos local.
    const teams = await Teams.findAll({ attributes: ['id', 'name'],});
    
    // Obtiene datos de todas las relaciones entre conductores y equipos desde la base de datos local.
    const driverTeams = await DriverTeam.findAll({ attributes: ['DriverId', 'TeamId'],});
    
    // Crea un mapa para relacionar las asociaciones entre conductores y equipos.
    const driverTeamMap = new Map();        
    
    // Llena el mapa con las asociaciones entre conductores y equipos.
    driverTeams.forEach((driverTeam) => {           
      const driverId = driverTeam.DriverId;
      const teamId = driverTeam.TeamId;

      if (!driverTeamMap.has(driverId)) {
        driverTeamMap.set(driverId, []);
      }        

      driverTeamMap.get(driverId).push(teamId);
    });
    
    // Define una función llamada driversWithTeams para agregar equipos a un conductor.
    const driversWithTeams = (driver) => {
      const driverId = driver.id;
      const associatedTeamIds = driverTeamMap.get(driverId) || [];
        
      // Busca los equipos asociados usando los IDs.
      const associatedTeams = teams.filter((team) => associatedTeamIds.includes(team.id)).map((team) => team.name);
        
      // Agrega los equipos al objeto del conductor.
      return {
          ...driver.toJSON(),
          teams: associatedTeams.join(', '),
      };
    };

    const resul = driversWithTeams(drivers);
    
    if (drivers) {
      // Si se encontró un conductor localmente, aplica la función driversWithTeams y devuelve el resultado como JSON.
      return res.status(200).json({resul});
    } else {
      // Si no se encontró el conductor, devuelve un mensaje de error.
      return res.status(404).json({ message: 'Driver not found' });
    }
  } catch (error) {
    // Manejo de errores en caso de problemas con la solicitud o la base de datos.
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { detailById };


