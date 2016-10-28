//Remove login buttons if user is signed in
if (cookie.length > 0) {
	var login = document.getElementsByClassName('login');
	for (var li = 0; li <login.length; li++) {
		document.getElementsByClassName('login')[li].style.display = "none";
		document.getElementsByClassName('signed-in')[li].style.display = "block";
	}
}
var ref = firebase.database().ref("requests/"+cookie+"/");
ref.on("child_changed", function(data) {
	document.getElementById('note').style.display = "block";
	console.log(data.val());
}, function (error) {
   console.log("Error: " + error.code);
})