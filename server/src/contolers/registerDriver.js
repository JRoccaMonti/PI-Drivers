/*
POST | /drivers
Esta ruta recibirá todos los datos necesarios para crear un driver y relacionarlo con sus teams solicitados.
Toda la información debe ser recibida por body.
Debe crear un driver en la base de datos, y este debe estar relacionado con sus teams indicados (al menos uno).
*/
const axios = require('axios');
const { Driver, Teams } = require('../db');
const configureDatabaseIdStartValue = require('../Helpers/stratIdDiriver').configureDatabaseIdStartValue;

const textRegex = /^[A-Za-z\s]+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const registerDriver = async (req, res) => {
    try {

        if (await Driver.count() === 0) {
            await configureDatabaseIdStartValue();
        }     

        const {
            name,
            lastname,
            description,
            nationality,
            image,
            birthdate,
            teamId
        } = req.body;

        const errors = [];

        if (!textRegex.test(name)) {
            errors.push('Invalid Name format');
        }
        if (!textRegex.test(lastname)) {
            errors.push('Invalid Lastname format');
        }
        if (nationality === '' || nationality === 'Not select' ||!textRegex.test(nationality)) {
            errors.push('Invalid Nationality');
        }
        if (!dateRegex.test(birthdate)) {
            errors.push('Invalid Date format');
        }            
        const birthdatevalid = new Date(birthdate);
        const currentDate = new Date();
        const ageDifferenceInMilliseconds = currentDate - birthdatevalid;
        const ageInYears = Math.floor(ageDifferenceInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));

        if (ageInYears < 18) {
            errors.push('Underage drivers are not accepted' );
        }
        if (description.length === 0 || description.length > 255) {
            errors.push('Invalid description' );
        };
        
        
        const teams = Array.isArray(teamId) ? teamId : [teamId]; // Convierte a un array si no lo es
        
        const teamPromises = teams.map(async (teamId) => {
            const team = await Teams.findByPk(teamId);
            if (team) { 
                return team;
            } else {
                return null;
            }
        });

        const resolvedTeams = await Promise.all(teamPromises);
        
        const validTeams = resolvedTeams.filter((team) => team !== null);
        
        console.log(req.body);
        
        if (teamId.length === 0) {
            errors.push('Not teams register');
        };
        
        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }
        
        if (validTeams.length === teams.length) {

            const newDriver = await Driver.create({ 
            name: name ,
            lastname: lastname,
            image: image,
            description: description,
            nationality: nationality,
            birthdate: birthdate
            });

            await newDriver.setTeams(validTeams);

            res.status(200).json({ message: 'Driver successfully registered' });
        } else {
            res.status(404).json({ message: 'At least one of the teams was not found' });
        }

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};

module.exports={registerDriver};