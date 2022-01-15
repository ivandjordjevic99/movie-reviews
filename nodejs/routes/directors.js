const express = require('express');
const { sequelize, Directors } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended: true}))

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ msg: "Unauthorized" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        if (err) return res.status(403).json({ msg: "Unauthorized" });

        req.user = user;

        next();
    });
}

route.use(authToken);

route.get('', (req, res) => {
    if(!['ADMIN', 'MODERATOR'].includes(req.user.role))
        return res.status(403).json({ msg: "User with provided role is not authorized for this route" });
    Directors.findAll()
        .then( rows => {
            res.json(rows)
        } )
        .catch( err => {
            res.status(500).json(err)
        } );
});

route.get('/:id', (req, res) => {
    if(!['ADMIN', 'MODERATOR'].includes(req.user.role))
        return res.status(403).json({ msg: "User with provided role is not authorized for this route" });
    Directors.findOne( {where: {id: req.params.id}})
        .then( row => {
            res.json(row)
        } )
        .catch( err => {
            res.status(500).json(err)
        } );
});

route.post('', (req, res) => {
    if(!['ADMIN', 'MODERATOR'].includes(req.user.role))
        return res.status(403).json({ msg: "User with provided role is not authorized for this route" });
    Directors.create({
        name: req.body.name,
        country: req.body.country
    } )
        .then( row => {
            res.json(row)
        } )
        .catch( err => {
            res.status(500).json(err)
        } );
});

route.put('/:id', (req, res) => {
    if(!['ADMIN', 'MODERATOR'].includes(req.user.role))
        return res.status(403).json({ msg: "User with provided role is not authorized for this route" });
    Directors.findOne({where: {id: req.params.id}})
        .then( director => {
            director.name = req.body.name
            director.country = req.body.country
            director.save()
                .then(row => {
                    res.json(row)
                } )
                .catch( err => {
                    res.status(500).json(err)
                } );
        } )
        .catch( err => {
            res.status(500).json(err)
        } );
});

route.delete('/:id', (req, res) => {
    if(!['ADMIN', 'MODERATOR'].includes(req.user.role))
        return res.status(403).json({ msg: "User with provided role is not authorized for this route" });
    Directors.findOne({where: {id: req.params.id}})
        .then( director => {
            director.destroy()
                .then(row => {
                    res.json(row)
                } )
                .catch( err => {
                    res.status(500).json(err)
                } );
        } )
        .catch( err => {
            res.status(500).json(err)
        } );
});

module.exports = route