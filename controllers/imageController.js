const fs = require('fs');
const CustomError = require('../utils/CustomError');
const Patient = require('../models/patient');
const Image = require('../models/image');

const savePatientImage = (req, res, next) => {
    const file = req.file;
    const { patientId } = req.body;

    Patient.findOne({_id: patientId}, (error, patient) => {
        if(error){
            let customError = new CustomError(500, 'Internal server error');
            next(customError);
        }

        const serverUrl = req.protocol + '://' + req.get('host');
        const filename = file.filename;
        const url = serverUrl + '/images/' + filename;

        const image = new Image({
            patientId,
            filename,
            url
        });

        image.save((error, data) => {
            if(error){
                let customError = new CustomError(500, 'Internal server error');
                next(customError);
            }
    
            return res.status(200).json({
                data
            });
        })
    });
};

const retrievePatientImages = (req, res) => {
    const { patientId } = req.params;

    Image.find({patientId: patientId}, (error, data) => {
        if(error){
            let customError = new CustomError(500, 'Internal server error');
            next(customError);
        }

        return res.status(200).json({
            data
        });
    });
};

const deletePatientImage = (req, res) => {
    const { imageId } = req.params;

    Image.findOne({_id: imageId}, (error, data) => {
        if(error){
            let customError = new CustomError(500, 'Internal server error');
            next(customError);
        }

        if(data.constructor === Object && Object.entries(data).length !== 0){
            const filePath = data.url;

            try{
                fs.unlinkSync(filePath);

                Image.remove({_id: imageId}, error => {
                    if(error){
                        let customError = new CustomError(500, 'Internal server error');
                        next(customError);
                    }
            
                    return res.status(200).json({
                        message: 'Deleted'
                    });
                });
            }catch(error){
                let customError = new CustomError(500, 'Internal server error');
                next(customError);
            }
        }
    });

};

module.exports = {
    savePatientImage,
    retrievePatientImages,
    deletePatientImage
};