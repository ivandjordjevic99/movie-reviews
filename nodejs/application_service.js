const express = require('express');
const path = require('path');
const movies = require('./gui_routes/gui_movies');
const users = require('./gui_routes/gui_users');
const comments = require('./gui_routes/gui_comments');
const directors = require('./gui_routes/gui_directors');

const application_service = express();

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
};
application_service.use(cors(corsOptions))

application_service.use(express.json());
application_service.use(express.urlencoded({extended: true}));

application_service.use('/admin/movies', movies);
application_service.use('/admin/users', users);
application_service.use('/admin/comments', comments);
application_service.use('/admin/directors', directors);

application_service.get('/admin', (req, res) => {
    res.sendFile('firstpage.html', { root: './static' });
});

application_service.use(express.static(path.join(__dirname, 'static')));
application_service.listen(8082);