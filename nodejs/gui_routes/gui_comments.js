const express = require('express');
const route = express.Router();
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
    if (token == null) {
        console.log("TOKEN JE NULL")
        return res.redirect(301, '/admin/login');
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        if (err){
            console.log(err)
            return res.redirect(301, '/admin/login');
        }
        req.user = user;

        if(!['ADMIN', 'MODERATOR'].includes(user.role))
            return res.redirect(301, '/admin/login');

        next();
    });
}

route.use(express.json());
route.use(express.urlencoded({extended: true}))

route.get('', authToken, (req, res) => {
    res.sendFile('comments.html', { root: './static' });
});

module.exports = route