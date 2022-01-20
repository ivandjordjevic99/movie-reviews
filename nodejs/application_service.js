const express = require('express');
const path = require('path');
const movies = require('./gui_routes/gui_movies');
const users = require('./gui_routes/gui_users');
const comments = require('./gui_routes/gui_comments');
const directors = require('./gui_routes/gui_directors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
    if (token == null) return res.redirect(301, '/login');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        if (err) return res.redirect(301, '/login');
        req.user = user;

        next();
    });
}


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

application_service.get('/admin', authToken, (req, res) => {
    res.sendFile('firstpage.html', { root: './static' });
});

application_service.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

application_service.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static' });
});


application_service.use(express.static(path.join(__dirname, 'static')));
application_service.listen(8082);