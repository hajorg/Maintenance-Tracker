var express = require("express");
var router = express.Router();
var firebase = require("firebase");
var path = require("path");

router.get('/', function (req, res, next) {
	res.render("admin", {title:"admin"});
});
// router.post('/add', function (req, res, next) {

// });
router.get('/:role', function(req, res, next) {
	var id = req.params.role;
	firebase.database().ref('users/'+id).update({
		role: "staff",
		status: "free"
	});
	res.redirect('/admin');
});
router.get("/reject/:id", function(req, res, next) {
 // 	var id = req.params.id;
	// firebase.database().ref("requests/"+id+"/").update({
	// 	status: "declined"
	// });
	// res.redirect('/admin');
	var id = req.params.id;

	res.render('rejectRequest',{title: "Reject"});
})
// router.post("/rejected", function (req, res, next) {
// 	var message = req.body.message;
// 	var title = req.body.unique_title;
// 	var id = req.body.unique_id;
// 	firebase.database().ref("requests/"+id).update({
// 		status: "declined"
// 	});
// 	firebase.database().ref("message").push({
// 		message: message,
// 		user_id: id,
// 		title: title
// 	});
// 	res.redirect("/admin");
// });
router.get("/approve/:id", function(req, res, next) {
	var id = req.params.id;
// 	firebase.database().ref("requests/"+id+"/").update({
// 		status: "processing"
// 	});
// 	res.redirect('/admin');
// });
// router.get("/resolve/:id", function(req, res, next) {
// 	var id = req.params.id;
// 	firebase.database().ref("requests/"+id+"/").update({
// 		status: "resolved"
// 	});
// 	res.redirect('/admin');
	res.render('acceptRequest', {title:'Accept'});
});
module.exports = router;