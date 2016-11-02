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
// check if user is admin
if (cookie) {
	checkAdmin.on("value", function(snapshot) {
		if(snapshot.val().role !== "admin") {
			window.location.href= "/dashboard";
		}
	}, function (error) {
	   console.log("Error: " + error.code);
	});
} else {
	window.location.href = "/signin";
}

//lists users that are normal users
ref.on("value", function(snapshot) {
   document.getElementById('lists').innerHTML = "";
   var count = 0;
	var contents = snapshot.val().users
	for (var i in contents) {
		var unique = Object.keys(contents);		
		if (contents[i].role === "user") {
			document.getElementById('lists').innerHTML += "<li class='collection-item' id="+unique[count]+"><div>"+contents[i].username+"<a href='admin/"+unique[count]+"' class='secondary-content'><i class='material-icons'>send</i></a></div></li>";
		}
		count++;
	}
}, function (error) {
   console.log("Error: " + error.code);
})
var storage = firebase.storage();
var fireImage = document.createElement("img");

//notifications of pending requests
ref.on("value", function(snapshot) {
   document.getElementById('f-lists').innerHTML = "<thead><th>Title</th><th>Reject</th><th>Accept</th></thead>";
   var count = 0;
	var contents = snapshot.val().requests;
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
   document.getElementById('s-lists').innerHTML = "<thead><th>Title</th><th>Resolved?</th></thead>";
   var count = 0;
	var contents = snapshot.val().requests;
	for (var i in contents) {
		var unique = Object.keys(contents);		
		if (contents[i].status === "processing") {
			document.getElementById('s-lists').innerHTML += "<tr><td>"+contents[i].title+" </td><td><a href='admin/resolved/"+unique[count]+"'><input type='checkbox' class='resolve filled-in' id='"+unique[count]+"'><label for='"+unique[count]+"'></label></a></td></tr>";
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

var checkTime = firebase.database().ref("requests");
checkTime.on('value', function(snapshot) {
	document.getElementById('escalated-lists').innerHTML = "<thead><th>Title</th><th>Expected Resolved date</th></thead>";
	var timer = snapshot.val();
	for (var i in timer) {
		if ((timer[i].date_create+259200000) < Date.now()) {
			// alert(new Date((timer[i].date_create))+":"+new Date())
			document.getElementById('escalated-lists').innerHTML += "<tr><td>"+timer[i].title+"</td><td>"+new Date((timer[i].date_create))+"</td></tr>";
		}
	}
	// alert(timer)

});

//display available staffs for request
ref.on("value", function(snapshot) {
   document.getElementById('catch').innerHTML = "<option value='' disabled selected>Choose your option</option>";
   var count = 0;
	var contents = snapshot.val().users;
	for (var i in contents) {
		var unique = Object.keys(contents);		
		if (contents[i].role === "staff") {
			document.getElementById('catch').innerHTML += "<option value='"+i+"'>"+contents[i].username+"</option>";
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

var data = window.location.pathname.split("/")[3];
var getDataBase = firebase.database().ref("requests/"+data);
getDataBase.on('value', function(snapshot) {
	// console.log(snapshot.val());
	document.getElementById('title').innerHTML = "Title: "+snapshot.val().title;
	document.getElementById('description').innerHTML = "Description: "+snapshot.val().description;
	document.getElementById('status').innerHTML = "Status: "+snapshot.val().status;
	document.getElementById('date').innerHTML = "Date Submitted: "+ new Date(snapshot.val().date_create).toDateString();
	document.getElementById('unique_title').value = snapshot.val().title;
	document.getElementById('image_title').value = "";
	if (snapshot.val().image_name) {
		var store = firebase.storage().ref();
		store.child("images/"+data+"/"+snapshot.val().image_name).getDownloadURL().then(function(url){
			document.getElementById('image_title').innerHTML = "<img width='200' height='200' src='"+url+"' alt='"+snapshot.val().title+"'>";
		}).catch(function(error) {
			console.log(error.code);
		})
	}

});
document.getElementById('unique_id').value = data;




