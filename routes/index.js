var express = require('express');
var router = express.Router();
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Maintenance Tracker' });
});
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Maintenance Tracker' });
});

module.exports = router;


