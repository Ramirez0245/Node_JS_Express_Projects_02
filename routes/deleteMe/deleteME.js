const express = require('express');
const uuid = require('uuid');
const router = express.Router();

router.get('/', (req, res) => // A route
{
    console.log('Hello? from route.get of DeleteME');
    res.json( {msg: 'Im coming from router.get / '})
});

module.exports = router;