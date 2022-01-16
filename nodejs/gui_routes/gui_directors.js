const express = require('express');

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended: true}))

route.get('', (req, res) => {
    res.sendFile('directors.html', { root: './static' });
});

module.exports = route