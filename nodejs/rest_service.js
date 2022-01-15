const express = require('express');
const { sequelize } = require('./models');
const movies = require('./routes/movies');
const users = require('./routes/users');
const comments = require('./routes/comments');
const directors = require('./routes/directors');

const rest_service = express();

rest_service.use('/api/movies', movies);
rest_service.use('/api/users', users);
rest_service.use('/api/comments', comments);
rest_service.use('/api/directors', directors);


rest_service.listen({ port: 8080 }, async () => {
    await sequelize.authenticate();
});