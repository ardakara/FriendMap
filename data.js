function login()
{
	FB.login(function(response) {
		if (response.authResponse) {
			console.log('Welcome!  Fetching your information.... ');
     	FB.api('/me', function(response) {
      	console.log('Good to see you, ' + response.name + '.');
      	FB.logout(function(response) {
      		console.log('Logged out.');
      	});
    	});
		}
 	}, {scope: 'email, friends_location, user_location'});
	
	FB.api('/me', function(response) {
		$("#content").append(response.name);
	});
	
	FB.api('/me/friends?fields=id,name,location,link,picture', function(response) {
	 	facebookData = response;
		// put in global, get in maps, geocode, then overlay as markers, then collect markers together
	})
}

function getFriends()
{
	FB.api('/me/friends?fields=id,name,location,link,picture', function(response) {
		for (var i=0, l=response.data.length; i<l; i++) {
			var friend = response.data[i];
			if (friend.location && friend.location.name) {
				$("#content").append(friend.location.name);
			}
	 	}
	})
}