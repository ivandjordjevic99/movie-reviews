const express = require('express');
const { sequelize, Comments } = require('../models');

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended: true}))

route.get('', (req, res) => {
    Comments.findAll()
        .then( rows => {
            res.json(rows)
        } )
        .catch( err => {
            res.status(500).json(err)
        } );
});

route.get('/:id', (req, res) => {
    Comments.findOne( {where: {id: req.params.id}})
        .then( row => {
            res.json(row)
        } )
        .catch( err => {
            res.status(500).json(err)
        } );
});

route.post('', (req, res) => {
    Comments.create({
        content: req.body.content,
        stars: req.body.stars,
        user_id: req.body.user_id,
        movie_id: req.body.movie_id
    } )
        .then( row => {
            res.json(row)
        } )
        .catch( err => {
            res.status(500).json(err)
        } );
});

route.put('/:id', (req, res) => {
    Comments.findOne({where: {id: req.params.id}})
        .then( comment => {
            comment.content = req.body.content
            comment.stars = req.body.stars
            comment.save()
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
    Comments.findOne({where: {id: req.params.id}})
        .then( comment => {
            comment.destroy()
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