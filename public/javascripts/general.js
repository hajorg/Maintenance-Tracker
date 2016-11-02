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
	// if (data) {
	// 	document.getElementById('note').style.display = "block";
	// 	// alert("new data");
	// } else {
	// 	document.getElementById('note').style.display = "none";
	// }
	if (data.val() === "processing") {
		// alert("Your request is accepted");
		document.getElementById('note').style.display = "block";
		alert("Your request is accepted");
	} else if (data.val() === "declined"){
		alert("Your request is rejected");
	}
	console.log(data.val());
}, function (error) {
   console.log("Error: " + error.code);
})
// $(function(){$(".button-collapse").sideNav()})