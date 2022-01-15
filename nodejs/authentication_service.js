const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { sequelize, Users } = require('./models');
require('dotenv').config();

const authentication_service = express()

const corsOptions = {
    origin: 'http://127.0.0.1:8080',
    optionsSuccessStatus: 200
};

authentication_service.use(express.json())
authentication_service.use(express.urlencoded({extended: true}))
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
            user: row.username
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
                    user: usr.name
                };

                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);

                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

authentication_service.listen(8081);