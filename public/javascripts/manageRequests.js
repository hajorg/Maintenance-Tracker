// var cookie = document.cookie.split("=")[1];
var ref = firebase.database().ref();
ref.on("value", function(snapshot) {
   document.getElementById('display-resolved').innerHTML = "";
   
   var count = 0;
	var contents = snapshot.val().requests;
	var unique = Object.keys(contents);	
	for (var i in contents) {
		if (contents[i].status === "resolved" && unique[count] === cookie) {
			document.getElementById('display-resolved').innerHTML += "<li class='collection-group-item' id="+unique[count]+">"+contents[i].title+"</li>";

		}
		count++;
	}
}, function (error) {
   console.log("Error: " + error.code);
})
var ref = firebase.database().ref();
ref.on("value", function(snapshot) {
   document.getElementById('display-processing').innerHTML = "";
   
   var count = 0;
    var contents = snapshot.val().requests;
    var unique = Object.keys(contents); 
    for (var i in contents) {
        if (contents[i].status === "processing" && unique[count] === cookie) {
            document.getElementById('display-processing').innerHTML += "<li class='collection-group-item' id="+unique[count]+">"+contents[i].title+"</li>";

        }
        count++;
    }
}, function (error) {
   console.log("Error: " + error.code);
})

var upload = function(e) {
	e.preventDefault();
    var photo = document.getElementById("image");
    var title = document.getElementById('subject').value;
    var description = document.getElementById('message').value;
    var phone = document.getElementById('phone').value;
    // the file is the first element in the files property
    var image = photo.files[0];
    var filename = "";
    if(image.name) {
        filename = image.name;
    }
    var storageRef = firebase.storage().ref('images/'+cookie+'/'+filename);
    var requests = firebase.database().ref("requests/"+cookie);
    requests.set({
    	title: title,
    	description: description,
    	phone: phone,
    	date_create: Date.now(),
    	status: "pending",
        image_name: filename
    });
    var upload = storageRef.put(image);
    upload.on('state_changed', function(snapshot){
        alert(snapshot.val());
    }, function (error){
        console.log(error);
    }, function () {
        window.location.href = "/dashboard";
    });
    
    console.log(filename);
};
document.getElementById("make_staff_request").addEventListener('click', upload);
