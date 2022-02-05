const CustomError = require('../utils/CustomError');
const Patient = require('../models/patient');
const util = require('../utils/util');

const addPatient = (req, res, next) => {
    let { firstName, lastName, sex, dateOfBirth, modalities } = req.body;

    const accessCode = util.generateCode(10);

    const patient = new Patient({
        accessCode,
        firstName,
        lastName,
        sex,
        dateOfBirth,
        modalities
    });

    patient.save((error, data) => {
        if(error){
            let customError = new CustomError(500, 'Internal server error');
            next(customError);
        }

        return res.status(200).json({
            data
        });
    });
};

const getPatient = (req, res, next) => {
    const { accessCode } = req.params;

    Patient.findOne({accessCode}, (error, data) => {
        if(error){
            let customError = new CustomError(500, 'Internal server error');
            next(customError);
        }

        return res.status(200).json({
            data
        });
    });
};

const updatePatient = (req, res, next) => {
    let { accessCode, firstName, lastName, sex, dateOfBirth, modalities } = req.body;

    Patient.updateOne({accessCode}, {firstName, lastName, sex, dateOfBirth, modalities}, (error, raw) => {
        if(error){
            let customError = new CustomError(500, 'Internal server error');
            next(customError);
        }

        return res.status(200).json({
            raw
        });
    });
};

const deletePatient = (req, res, next) => {
    const { accessCode } = req.params;

    Patient.remove({accessCode: accessCode}, (error) => {
        if(error){
            let customError = new CustomError(500, 'Internal server error');
            next(customError);
        }

        return res.status(200).json({
            message: 'DELETED'
        });
    })
};

module.exports = {
    addPatient,
    getPatient,
    updatePatient,
    deletePatient
};