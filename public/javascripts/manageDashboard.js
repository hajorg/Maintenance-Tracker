var cookie = document.cookie.split("=")[1];
if (cookie) {
	var processing = firebase.database().ref("processing/");
	processing.on('value', function (snapshot) {
		document.getElementById('todo').innerHTML = "";
		var processes = snapshot.val();
		for (var i in processes) {
			if (processes[i].staff_id === cookie) {
				var processRequest = firebase.database().ref("requests/"+processes[i].staff_id);
				processRequest.on('value', function(data) {
					console.log(data.val());
					// document.getElementById('todo').innerHTML += "<div class='row'><div class='col s12 m7'><div class='card'><div class='card-image'><img src='images/sample-1.jpg'><span class='card-title'>"+data.val().title+"</span></div><div class='card-content'><p>"+data.val().description+"</p></div><div class='card-action'><a href='#'>This is a link</a></div></div></div></div>";
					document.getElementById('todo').innerHTML = "<li><p>Title: "+data.val().title+"</p><p>Description: "+data.val().description+"</p><p>Date: "+new Date(data.val().date_create)+"</p></li>";
					if (data.val().image_name) {
						var store = firebase.storage().ref();
						store.child("images/"+processes[i].user_id+"/"+data.val().image_name).getDownloadURL().then(function(url){
							document.getElementById('todo').innerHTML += "<img width='200' height='200' src='"+url+"' alt='"+snapshot.val().title+"'>";
						}).catch(function(error) {
							console.log(error.code);
						});
					}
				});
			}
		}
	});
}