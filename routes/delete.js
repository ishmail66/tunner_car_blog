var express = require('express');
var router = express.Router();
var Pokemon = require('../db.json');
var request = require("request");
/* GET create page. */
router.get('/:pokeId', function(req, res, next) {
    
    console.log(req.params.pokeId)
  //make a post request to our database
  request({
    url: "http://localhost:8000/pokemon/"  + req.params.pokeId,
    method: "DELETE",
    }, function(error, response, body) {
        console.log(body);
        //send a response message

        let data = {
            title: 'All Pokemon',
            pokemon: Pokemon, 
            message: 'Successfully Removed.',
        }

        res.redirect('/', data);
    });
});

module.exports = router;