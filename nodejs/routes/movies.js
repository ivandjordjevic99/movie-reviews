const express = require('express');
const { sequelize, Movies } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Joi = require('joi')

const sema = Joi.object().keys({
    name: Joi.string().alphanum().required(),
    year: Joi.number().required(),
    synopsis: Joi.string().alphanum().required(),
    director_id: Joi.number().required()
})

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
    Movies.findAll()
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
    Movies.findOne( {where: {id: req.params.id}})
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
    Joi.validate(req.body, sema, (err, result) => {
        if(err){
            res.status(400).send(err.details)
        }else{
            Movies.create({
                name: req.body.name,
                year: req.body.year,
                synopsis: req.body.synopsis,
                director_id: req.body.director_id
            } )
                .then( row => {
                    res.json(row)
                } )
                .catch( err => {
                    res.status(500).json(err)
                } );
        }
    })
});

route.put('/:id', (req, res) => {
    if(!['ADMIN', 'MODERATOR'].includes(req.user.role))
        return res.status(403).json({ msg: "User with provided role is not authorized for this route" });
    Joi.validate(req.body, sema, (err, result) => {
        if(err){
            res.status(400).send(err.details)
        }else{
            Movies.findOne({where: {id: req.params.id}})
                .then( movie => {
                    movie.name = req.body.name
                    movie.year = req.body.year
                    movie.synopsis = req.body.synopsis
                    movie.save()
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
        }
    })

});

route.delete('/:id', (req, res) => {
    if(!['ADMIN', 'MODERATOR'].includes(req.user.role))
        return res.status(403).json({ msg: "User with provided role is not authorized for this route" });
    Movies.findOne({where: {id: req.params.id}})
        .then( movie => {
            movie.destroy()
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