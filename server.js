const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const CustomError = require('./utils/CustomError');
require('dotenv').config();

const routes = require("./routes/routes");

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//API routes
app.use("/api/v1", routes);
app.use('/images', express.static('file_store'));

// Catch 404 request
app.use((req, res, next) => {
    let error = new CustomError(404, 'Not found!');
    next(error);
});

// Error handler middleware
app.use((error, req, res, next) => {
    if(error instanceof CustomError){
        res.status(error.getStatusCode()).json({message: error.getMessage()});
    }else{
        res.status(500).json(error);
    }
});

// Mongodb connection options
const dbConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
};

// Connect to mongodb
mongoose.connect(process.env.DB_CONNECTION_STRING, dbConnectionOptions, error => {
    if(error){
        console.log(error);
    }else{
        console.log('Connected to PACS database');
    }
    
});

//Start the server application
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`PACS server started on port ${PORT}`);
});
