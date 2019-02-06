var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/create', function(req, res, next) {
  res.render('create', {page:'create', menuId:'create'});
});

router.get('/archive', function(req, res, next) {
  res.render('archive', {page:'archive', menuId:'archive'});
});


router.get('/', function (req, res, next) {

  let data = {
      title: 'All Pokemon',
      pokemon: Pokemon, 
      message: false,
  }

  res.render('index', data);

});
module.exports = router;
