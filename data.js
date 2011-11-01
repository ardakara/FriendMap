function login()
{
	FB.login(function(response) {
		if (response.authResponse) {
			alert('Welcome!  Fetching your information.... ');
     	FB.api('/me', function(response) {
      	alert('Good to see you, ' + response.name + '.');
      	FB.logout(function(response) {
      		alert('Logged out.');
      	});
    	});
		}
 	}, {scope: 'email'});
	
	FB.api('/me', function(response) {
		$("#content").append(response.name);
	});
}

function getFriends()
{
	// FB.api('/me/friends', { limit: 3 }, function(response) {
	// 	// var i = 0;
	// 	// for (var i=0, l=response[0].length; i<l; i++) {
	// 	// 	var friend = response[0][i];
	// 	// 	if (friend.name) {
	// 	// 		$("#content").append(response[0][i].name);
	// 	// 	}
	// 	// }
	// 	alert(response.length);
	// });
	
	FB.api('/me/friends?fields=id,name,location', function(response) {
	 	for (var i=0, l=response.data.length; i<l; i++) {
			var friend = response.data[i];
	 		$("#content").append(friend.name);
	 	}
	})
}