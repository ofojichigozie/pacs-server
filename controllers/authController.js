const jwt = require('jsonwebtoken');
const util = require('../utils/util');
const CustomError = require('../utils/CustomError');

const login = (req, res) => {
    // Static authentication details
    let { accessKey } = req.body;

    if(util.authenticate(accessKey)){
        // Generate authentication token and send response
        jwt.sign({accessKey}, util.jwtSecretKey, (error, token) => {
            res.json({
                token
            });
        });
    }else{
        let customError = new CustomError(403, 'Forbidden access');
        next(customError);
    }
};

module.exports = {
    login
};