const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const { sequelize, Users } = require('./models');
require('dotenv').config();

const authentication_service = express()


authentication_service.use(express.json())
authentication_service.use(express.urlencoded({extended: true}))

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:8082',
    optionsSuccessStatus: 200,
    credentials: true
};
authentication_service.use(cors(corsOptions))



authentication_service.post('/register', (req, res) => {

    const data = {
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        email: req.body.email,
        role: "USER",
        password: bcrypt.hashSync(req.body.password, 10)
    };

    Users.create(
        data
    ).then( row => {
        const usr = {
            userId: row.id,
            user: row.username,
            role: usr.role
        };
        console.log(usr)
        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

        console.log(token);

        res.json({ token: token });

    }).catch( err => res.status(500).json(err) );
});

authentication_service.post('/login', (req, res) => {
    Users.findOne({ where: { username: req.body.username } })
        .then( usr => {
            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    username: usr.username,
                    role: usr.role
                };

                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                console.log(token)
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});
authentication_service.use(express.static(path.join(__dirname, 'static')));

authentication_service.listen({ port: 8081 }, async () => {
    await sequelize.authenticate();
});