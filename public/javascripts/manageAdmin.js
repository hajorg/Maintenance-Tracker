var config = {
  apiKey: "AIzaSyDuLky3FGPX784YfkxJe9CRm9Uvtl6Xjk0",
  authDomain: "maintenance-tracker-b8085.firebaseapp.com",
  databaseURL: "https://maintenance-tracker-b8085.firebaseio.com",
  storageBucket: "maintenance-tracker-b8085.appspot.com",
  messagingSenderId: "469397824210"
};
firebase.initializeApp(config);

var cookie = document.cookie.split("=")[1];

var ref = firebase.database().ref();
var checkAdmin = firebase.database().ref("users/"+cookie+"/");
//check if user is admin
checkAdmin.on("value", function(snapshot) {
	if(snapshot.val().role !== "admin") {
		window.location.href= "/dashboard";
	}
}, function (error) {
   console.log("Error: " + error.code);
})

//lists users that are normal users
ref.on("value", function(snapshot) {
   document.getElementById('lists').innerHTML = "";
   var count = 0;
	var contents = snapshot.val().users
	for (var i in contents) {
		var unique = Object.keys(contents);		
		if (contents[i].role === "user") {
			document.getElementById('lists').innerHTML += "<li class='list-group-item' id="+unique[count]+"><a href='admin/"+unique[count]+"'>"+contents[i].username+"</a></li>";
		}
		count++;
	}
}, function (error) {
   console.log("Error: " + error.code);
})

//notifications of pending requests
ref.on("value", function(snapshot) {
   document.getElementById('f-lists').innerHTML = "";
   var count = 0;
	var contents = snapshot.val().requests
	for (var i in contents) {
		var unique = Object.keys(contents);		
		if (contents[i].status === "pending") {
			document.getElementById('f-lists').innerHTML += "<tr class='ls'><td>"+contents[i].title+"</td><td> <a href='admin/reject/"+unique[count]+"'>Reject</a></td> <td><a href='admin/approve/"+unique[count]+"'>Approve</a></td></tr>";
		}
		count++;
	}	 
}, function (error) {
   console.log("Error: " + error.code);
})

//lists requests waiting to be resolved
ref.on("value", function(snapshot) {
   document.getElementById('s-lists').innerHTML = "";
   var count = 0;
	var contents = snapshot.val().requests;
	for (var i in contents) {
		var unique = Object.keys(contents);		
		if (contents[i].status === "processing") {
			document.getElementById('s-lists').innerHTML += "<tr><td>"+contents[i].title+" </td><td><a href='admin/resolved/"+unique[count]+"'>Resolved?</a></td><td><input type='checkbox' class='resolve checkbox' id='"+unique[count]+"'></td></tr>";
		}
		count++;
	}
	document.getElementsByClassName('resolve')[0].addEventListener('change', function(e) {
		var checked = e.target.id;
		window.location.href = "/admin/resolve/"+checked;
	});
}, function (error) {
   console.log("Error: " + error.code);
});
