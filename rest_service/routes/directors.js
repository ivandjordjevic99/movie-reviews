const express = require('express');
const { sequelize, Directors } = require('../models');

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended: true}))

route.get('', (req, res) => {
    Directors.findAll()
        .then( rows => {
            res.json(rows)
        } )
        .catch( err => {
            res.status(500).json(err)
        } );
});

route.get('/:id', (req, res) => {
    Directors.findOne( {where: {id: req.params.id}})
        .then( row => {
            res.json(row)
        } )
        .catch( err => {
            res.status(500).json(err)
        } );
});

route.post('', (req, res) => {
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