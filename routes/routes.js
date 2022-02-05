const express = require('express');
const authController = require('../controllers/authController');
const patientController = require('../controllers/patientController');
const imageController = require('../controllers/imageController');
const util = require('../utils/util');

const router = express.Router();

// Auth route
router.post('/login', authController.login);

// Patient routes
router.post('/patient', util.verifyJwtToken, patientController.addPatient);
router.get('/patient/:accessCode', util.verifyJwtToken, patientController.getPatient);
router.put('/patient/:accessCode', util.verifyJwtToken, patientController.updatePatient);
router.delete('/patient/:accessCode', util.verifyJwtToken, patientController.deletePatient);

// Image routes
router.post('/patient/image', [util.verifyJwtToken, util.fileStore.single('image')], imageController.savePatientImage);
router.get('/patient/images/:patientId', util.verifyJwtToken, imageController.retrievePatientImages);
router.delete('/patient/image/:imageId', util.verifyJwtToken, imageController.deletePatientImage);

module.exports = router;