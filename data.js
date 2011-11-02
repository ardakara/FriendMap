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

// display markerclusterer markers -> look at any options available
// add tooltips (link, photo, name)
// one more thing (pick networks?)

//Notes:
// might have to copy friends (uncomment)

var friends = [];
var locations = new Array();
var seenLocations = {};
var markers = [];
var callbackCounter = -1;
function populateArray() 
{
	FB.api('/me/friends?fields=id,name,location,link,picture', function(response) {
		for (var i=0, l=response.data.length; i<l; i++) {
			//var friend = jQuery.extend(true, {}, response.data[i]);
			var friend = response.data[i];
			
			if (!friend.location || !friend.location.id) {
				continue;
			}
			
			if (seenLocations[friend.location.id]) {
				//location is known
			} else {
				seenLocations[friend.location.id] = true;
				if (callbackCounter == -1) {
					callbackCounter = 0;
				}
				callbackCounter++;
				FB.api('/' + friend.location.id, function(locationResponse) {
					if (locationResponse.location) {
						locations[locationResponse.id] = locationResponse.location;
					}
					callbackCounter--;
				});
			}
			friends.push(friend);
		}
	});
}

function putMarkers()
{
	while (callbackCounter != 0) {
		setTimeout("putMarkers()", 1000);
		return;
	}
	for (i in friends) {
		var friend = friends[i];
		if (locations[friend.location.id]) {
			var lat_lng = new google.maps.LatLng(locations[friend.location.id].latitude, locations[friend.location.id].longitude);
			var marker = new google.maps.Marker({
				//map:map,
				position: lat_lng,
			});
			markers.push(marker);
			// add like the botton one again
		}
	}
	//var mcOptions = {gridSize: 50, maxZoom: 15};
	var mc = new MarkerClusterer(map, markers);
}

function mapFriends()
{
	populateArray();
	putMarkers();
}