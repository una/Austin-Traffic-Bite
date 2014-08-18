(function ($) {

	$(document).ready(function () {
		var tt = new TrafficTracker();
		tt.start();
	});

	function TrafficTracker () {}

	TrafficTracker.prototype = {
		nbEl: $('#nb-circle'),
		sbEl: $('#nb-circle'),
		colors: {
			"red": "#EF4836",
			"green": "#68C3A3",
			"orange": "#FDE3A7"
		},
		start: function () {
			//if IH-35
			this.NBIH35();
			this.SBIH35();
		},
		getTravelData: function (startSet, endSet) {
			var s = startSet.join(","),
				e = endSet.join(",");
			return $.ajax({
				type: 'GET',
				dataType: 'JSON',
				url: 'http://www.mapquestapi.com/directions/v2/route?key=Fmjtd%7Cluur25utnq%2Cb0%3Do5-9w70lf&from='+s+'&to='+e+'&callback=&timeType=1&useTraffic=true'
			});
		},
		NBIH35: function () {
			this.getTravelData([30.2174376,-97.7498557], [30.3388355,-97.700168]).done(function(data) {
				console.log('nb ', data);
				//realtime: no traffic 570
			});
		},
		SBIH35: function () {
			this.getTravelData([30.338827,-97.700487],[30.217247,-97.751079]).done(function (data) {
				console.log('sb ',data);
				//realtime: no traffic 530
			});
		}

	};

})(jQuery);
