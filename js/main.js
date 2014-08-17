var colors = {
	"red": "#EF4836",
	"green": "#68C3A3",
	"orange": "#FDE3A7"
}
var service = new google.maps.DistanceMatrixService();
google.maps.event.addDomListener(window, 'load', function () {
	NBIH35();
	SBIH35();
});


function NBIH35 () {

    var origin1 = new google.maps.LatLng(30.2174376,-97.7498557);
	var origin2 = "Austin, Texas";

	var destinationA = "Austin, Texas";
	var destinationB = new google.maps.LatLng(30.3388355,-97.700168);

	service.getDistanceMatrix(
	  {
	    origins: [origin1, origin2],
	    destinations: [destinationA, destinationB],
	    travelMode: google.maps.TravelMode.DRIVING,
	    unitSystem: google.maps.UnitSystem.IMPERIAL,
	    durationInTraffic: true
	  }, function (response, status) {
	  	console.log(response.rows[0].elements[1]);
	  	//good 11 mins
	  	// value 637 seconds
	  	var duration = response.rows[0].elements[1].duration.value;
	  	console.log(duration);
	  });
}


function SBIH35 () {

    var origin1 = new google.maps.LatLng(30.338827, -97.700487);
	var origin2 = "Austin, Texas";

	var destinationA = "Austin, Texas";
	var destinationB = new google.maps.LatLng(30.217247, -97.751079);

	service.getDistanceMatrix(
	  {
	    origins: [origin1, origin2],
	    destinations: [destinationA, destinationB],
	    travelMode: google.maps.TravelMode.DRIVING,
	    unitSystem: google.maps.UnitSystem.IMPERIAL,
	    durationInTraffic: true
	  }, function (response, status) {
	  	console.log(response.rows[0].elements[1]);
	  	//good 11 mins
	  });
}