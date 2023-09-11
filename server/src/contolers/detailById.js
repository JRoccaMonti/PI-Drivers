/* GET | /drivers/:idDriver
Esta ruta obtiene el detalle de un driver específico. Es decir que devuelve un objeto con la información pedida en el detalle de un driver.
El driver es recibido por parámetro (ID).
Tiene que incluir los datos del/los team/s del driver al que está asociado.
Debe funcionar tanto para los drivers de la API como para los de la base de datos.
*/

const axios = require('axios');
const detailById = async (req, res) => {
  try {
    const idSearch = req.params.idDriver;// .id es el parametro interno cuidado 
    const response = await axios.get(`http://localhost:5000/drivers/${idSearch}`);
    if (response.status === 200) {
      const target = response.data;
      if (target) {
        return res.status(200).json(target);
      } else {
        // Si la respuesta es exitosa pero no se encuentra el conductor, devolver un error 404
        return res.status(404).json({ message: 'Driver not found' });
      }
    } else {
      // Si la solicitud a la API no tiene éxito, devolver un error 500
      return res.status(500).json({ message: 'API request failed' });
    }
  } catch (error) {
    // Manejo de errores en caso de problemas con la solicitud
    return res.status(500).json({ message: 'Server error'});
  }
};

module.exports = { detailById };
