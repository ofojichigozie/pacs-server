const jwt = require('jsonwebtoken');
const https = require('https');
const path = require('path');
const multer  = require('multer')
const crypto  = require('crypto')

const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Function to verify authentication token
const verifyJwtToken = (req, res, next) => {
    let authorizationHeader = req.headers.authorization;

    if(typeof authorizationHeader !== 'undefined'){
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, jwtSecretKey, (error, data) => {
            if(error){
                let customError = new CustomError(403, 'Forbidden access');
                next(customError);
            }else{
                next();
            }
        });
    }else{
        let customError = new CustomError(403, 'Forbidden access');
        next(customError);
    }
    
}

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './file_store');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const fileStore = multer({
    storage: storage,
    limits: {
        fileSize: 10000000 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(DCM|dcm)$/)) {
            return cb(new Error('Please, upload an image'));
        }
        cb(undefined, true);
    }
});

const authenticate = (accessKey) => {
    if(accessKey === process.env.CLIENT_ACCESS_KEY){
        return true;
    }

    return false;
}

const generateCode = (len) => {
    return crypto
        .randomBytes(Math.ceil(len / 2))
        .toString('hex')
        .slice(0, len);
}

module.exports = {
    jwtSecretKey,
    verifyJwtToken,
    fileStore,
    authenticate,
    generateCode
}