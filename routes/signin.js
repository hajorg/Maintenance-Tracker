var express = require("express");
var router = express.Router();
var firebase = require("firebase");
router.get("/", function (req, res, next) {
	res.render("signin", {title:"Sign in"});
});
router.post('/process', function(req,res,next) {
	var email = req.body.email;
	var password = req.body.password;
	firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				var uid = user.uid;
				res.cookie('session', uid);
				res.redirect('/dashboard');

		  	} else {
		  		console.log('Not signed in');
		    	res.redirect("/signin");
		  	}
		});
	}).catch(function(error) {
		console.log(error.message);
	});
});

module.exports = router;