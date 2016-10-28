// var express = require("express");
// var router = express.Router();
// var firebase = require("firebase");

// router.get('/role/:role', function(req, res, next) {
// 	var id = req.params.role;
// 	firebase.database().ref('users/'+id).update({
// 		role: "staff"
// 	});
// 	res.redirect('/admin');
// });