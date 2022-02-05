const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    patientId: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        default: Date.now()
    }
});

module.exports = mongoose.model('Image', ImageSchema);