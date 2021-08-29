const express = require('express');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
const taskController = require('./controllers/taskController');
const cors = require('cors');
const middleware = require('./authMiddleware');
require('dotenv').config();
const server =  (config) => { 
    let app;
    const init = () => {
        app = express(); 
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors());
    } 

    const start = () => {
        init();
        app.listen(config.SERVER_PORT, function () {
            console.log(' Server listening on - '+config.SERVER_PORT);
        });
    }
    const setUpDB = (cb) =>{
        let connectionString = config.MONGO.CONNECT_STRING || `mongodb://${config.MONGO.HOST}:${config.MONGO.PORT}/${config.MONGO.DB}`;
        mongoose.connect(connectionString, { useNewUrlParser: true , 
            useUnifiedTopology: true, 
            useCreateIndex: true, 
            useFindAndModify: false });

        mongoose.connection.on('connected', () => {
            cb();
        });
    }

    const setUpRoutes = () => {
         app.post('/v1/addUser', userController.addUser);
         app.get('/v1/getUsers', middleware.auth , userController.getUsers);
         app.get('/v1/getTasks', middleware.auth, taskController.getTasks);
         app.post('/v1/addTask', middleware.auth, taskController.addTask);
         app.post('/v1/deleteTask', middleware.auth, taskController.deleteTask);
         app.post('/v1/updateTask', middleware.auth, taskController.updateTask);
    }
    return {
        start,
        setUpDB,
        setUpRoutes
    };
};

module.exports = server;