var express = require("express");
var router = express.Router();
var firebase = require("firebase");

router.get('/', function (req, res, next) {
	res.render("requests", {title:"Requests"});
});
router.post('/add', function(req, res, next) {
	var subject = req.body.subject;
	var message = req.body.message;
	if (subject === "" || message === "") {
		res.redirect('/requests');
		// return;
	}
	firebase.database().ref("requests/"+req.cookies.session+"/").set({
		title: subject,
		description: message,
		date_create: Date.now(),
		status: "pending"
	});
	res.redirect('/dashboard');
})

module.exports = router;