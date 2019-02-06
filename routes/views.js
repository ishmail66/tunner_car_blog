var express = require('express');
var router = express.Router();
var Pokemon = require('../db.json');
var request = require("request");

router.get('create', function(req, res, next) {
    //make a post request to our database
    request({
    url: "http://localhost:8000/pokemon/" + req.params.pokeId,
    method: "GET",
    }, function(error, response, body) {
        console.log(JSON.parse(body));
        //send a response message
        res.render('view', {Poke: JSON.parse(body)});
    });
})

module.exports = router;