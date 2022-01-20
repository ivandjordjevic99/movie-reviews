const express = require('express');
const { sequelize, Comments } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Joi = require('joi')

const sema = Joi.object().keys({
    content: Joi.string().alphanum().required(),
    stars: Joi.number().required(),
    user_id: Joi.number().required(),
    movie_id: Joi.number().required()
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
    Comments.findAll()
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
    Comments.findOne( {where: {id: req.params.id}})
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
            Comments.findOne({where: {id: req.params.id}})
                .then( comment => {
                    comment.content = req.body.content
                    comment.stars = req.body.stars
                    comment.user_id = req.body.user_id
                    comment.movie_id = req.body.movie_id
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
        }
    })

});

route.delete('/:id', (req, res) => {
    if(!['ADMIN', 'MODERATOR'].includes(req.user.role))
        return res.status(403).json({ msg: "User with provided role is not authorized for this route" });
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