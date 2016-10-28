var express = require("express");
var router = express.Router();
var firebase = require("firebase");

router.get('/', function(req, res, next) {
	res.render('signup', {title: "Sign Up"});
	console.log("yes")
});
router.post('/process', function(req, res, next) {
	var name = req.body.user;
	var email = req.body.email;
	var password = req.body.password;
	// var uid;
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    // [START_EXCLUDE]
	    if (errorCode == 'auth/weak-password') {
	        console.log('The password is too weak.');
	    } else {
	        console.log(errorMessage);
	        res.redirect('/signup');
	    }
	    console.log(error);
	    res.render('signup', {title: "Sign Up"});
	    // [END_EXCLUDE]
	 })
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			res.cookie('session', user.uid);
			firebase.database().ref("users/"+user.uid+"/").set({
				username: name,
				email: email,
				role: 'user'
			});
			res.redirect('/dashboard');
		}	
	})
	
});
module.exports = router;