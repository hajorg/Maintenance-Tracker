var express = require("express");
var router = express.Router();
var firebase = require("firebase");

router.get('/', function (req, res, next) {
	res.render("staff", {title: "Staff"});
});
router.post('/add', function (req, res, next) {
	
    var filename = req.body.image;
    // var storageRef = firebase.storage().ref();
    var cookie = req.cookies.session;
    var requests = firebase.database().ref("requests/"+cookie);
    requests.set({
    	title: req.body.subject,
    	description: req.body.message,
    	phone: req.body.phone,
    	date: Date.now(),
    	status: "pending"
    });
    var storageRef = firebase.storage().ref("images/"+filename);
    storageRef.put(filename);
    res.redirect("/dashboard")
})

module.exports = router;