const express = require('express');
const { sequelize, Movies } = require('../models');

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended: true}))

route.get('', (req, res) => {
    Movies.findAll()
        .then( rows => {
            res.json(rows)
        } )
        .catch( err => {
            res.status(500).json(err)
        } );
});

route.get('/:id', (req, res) => {
    Movies.findOne( {where: {id: req.params.id}})
        .then( row => {
            res.json(row)
        } )
        .catch( err => {
            res.status(500).json(err)
        } );
});

route.post('', (req, res) => {
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
});

route.put('/:id', (req, res) => {
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
});

route.delete('/:id', (req, res) => {
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