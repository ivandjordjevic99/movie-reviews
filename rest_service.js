const express = require('express');
const { sequelize } = require('./models');
const movies = require('./routes/movies');
const users = require('./routes/users');
const comments = require('./routes/comments');
const directors = require('./routes/directors');
const path = require('path');

const rest_service = express();

const cors = require('cors');


const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true
};
rest_service.use(cors(corsOptions))


rest_service.use('/api/movies', movies);
rest_service.use('/api/users', users);
rest_service.use('/api/comments', comments);
rest_service.use('/api/directors', directors);


rest_service.listen({ port: process.env.PORT || 8080 }, async () => {
    await sequelize.authenticate();
});