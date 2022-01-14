const express = require('express');
const { sequelize } = require('./models');
const movies = require('./routes/movies');
const users = require('./routes/users');
const comments = require('./routes/comments');
const directors = require('./routes/directors');

const app = express();

app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api/comments', comments);
app.use('/api/directors', directors);


app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});