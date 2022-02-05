const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
    accessCode: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    modalities: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        default: Date.now()
    }
});

module.exports = mongoose.model('Patient', PatientSchema);