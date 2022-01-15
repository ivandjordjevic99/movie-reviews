const express = require('express');
const { sequelize, Users } = require('../models');

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended: true}))

route.get('', (req, res) => {
    Users.findAll()
        .then( rows => {
            res.json(rows)
        } )
        .catch( err => {
            res.status(500).json(err)
        } );
});

route.get('/:id', (req, res) => {
    Users.findOne( {where: {id: req.params.id}})
        .then( row => {
            res.json(row)
        } )
        .catch( err => {
            res.status(500).json(err)
        } );
});

route.post('', (req, res) => {
    Users.create({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
    } )
        .then( row => {
            res.json(row)
        } )
        .catch( err => {
            res.status(500).json(err)
        } );
});

route.put('/:id', (req, res) => {
    Users.findOne({where: {id: req.params.id}})
        .then( user => {
            user.name = req.body.name
            user.surname = req.body.surname
            user.username = req.body.username
            user.password = req.body.password
            user.email = req.body.email
            user.role = req.body.role
            user.save()
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
    Users.findOne({where: {id: req.params.id}})
        .then( user => {
            user.destroy()
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