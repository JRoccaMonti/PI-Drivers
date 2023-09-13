const { Router } = require("express");
const allDrivers = require("../contolers/allDrivers");
const getDetailById = require("../contolers/detailById");
const firstFifteen = require("../contolers/firstFifteen");
const registerDriver = require("../contolers/registerDriver");
const storageTeams = require("../contolers/storageTeams");

const router = Router();

router.get('/drivers', allDrivers.allDrivers);
router.get('/drivers/name', firstFifteen.firstFifteen);
router.get('/drivers/:idDriver', getDetailById.detailById);
router.post('/driver', registerDriver.registerDriver);
router.get('/teams', storageTeams.storageTeams);


module.exports = router;
