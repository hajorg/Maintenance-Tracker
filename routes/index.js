var express = require('express');
var router = express.Router();
var app = express();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Maintenance Tracker' });
// });
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Maintenance Tracker' });
});
// router.get('/signin', function(req, res, next) {
//   res.render('signin', { title: 'Signin' });
// });
// router.get("/signout", function (req, res, next) {
// 	res.clearCookie("session");
// 	res.redirect("/signin")
// });
module.exports = router;


