(function ($) {

	$(document).ready(function () {
		var router = new Routely(),
			traffic = new TrafficTracker(),
			tmpl = null,
			$header = $('#header');

		router.route('/', function () {
			tmpl = '<a href="#/mopac"> check mopac</a>'
				+'<h1 class="center">IH-35 Traffic</h1>';

			$header.html(tmpl);

			traffic.clearResults();
			traffic.NBIH35();
			traffic.SBIH35();
		});

		router.route('/mopac', function () {
			tmpl = '<a href="#/"> check IH-35</a>'
				+'<h1 class="center">Mopac Traffic</h1>';

			$header.html(tmpl);

			traffic.clearResults();
			traffic.NBMopac();
			traffic.SBMopac();
		});
	});

	function TrafficTracker () {}

	TrafficTracker.prototype = {
		nbEl: $('#nb-circle'),
		sbEl: $('#sb-circle'),
		colors: {
			"red": "#EF4836",
			"green": "#68C3A3",
			"orange": "#FDE3A7"
		},
		phrases: {
			positive: ["Willie Nelson", "smooth sailing", "In the clear"],
			negative: ["Not cool", "Not worth it", "It's crazy out there"],
			neutral: ["meh", "mediocre", "meh"]
		},
		phrasesCount: 3,
		start: function () {
			//if IH-35
			//this.NBIH35();
			//this.SBIH35();
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
		displayTravelResults: function (realTime, jqEl) {
			var rand = Math.floor(Math.random() * this.phrasesCount),
				textEl = $("<span class='circle-text'>");
				realtime = realTime;

			if (realtime < 720) 
			{
				textEl.text(this.phrases.positive[rand])
				jqEl.css('background-color', this.colors.green)
					.html(textEl);
			} 
			else if (realtime >= 720 && realtime <= 840) 
			{
				textEl.text(this.phrases.neutral[rand]);
				jqEl.css('background-color', this.colors.orange)
					.html(textEl);
			} 
			else if (realtime > 840) 
			{
				textEl.text(this.phrases.negative[rand]);
				jqEl.css('background-color', this.colors.red)
					.html(textEl);
			} 
			else 
			{
				textEl.text("No information at this time");
				jqEl.html(textEl);
			}

		},
		clearResults: function () {
			this.nbEl.css('background-color', '#eee').html('');
			this.sbEl.css('background-color', '#eee').html('');
		},
		NBIH35: function () {
			var self = this;
			this.getTravelData([30.2174376,-97.7498557], [30.3388355,-97.700168]).done(function (data) {
				console.log('nb 35 ', data.route.realTime);
				self.displayTravelResults(data.route.realTime, self.nbEl);
			});
		},
		SBIH35: function () {
			var self = this;
			this.getTravelData([30.338827,-97.700487],[30.217247,-97.751079]).done(function (data) {
				console.log('sb 35 ',data.route.realTime);
				self.displayTravelResults(data.route.realTime, self.sbEl);
			});
		},
		NBMopac: function () {
			var self = this;
			this.getTravelData([30.257323,-97.799138],[30.374919,-97.739824]).done(function (data) {
				console.log('nb mopac ',data.route.realTime);
				self.displayTravelResults(data.route.realTime, self.nbEl);
			});
		},
		SBMopac: function () {
			var self = this;
			this.getTravelData([30.374041,-97.740324],[30.242744,-97.811671]).done(function (data) {
				console.log('sb mopac ',data);
				self.displayTravelResults(data.route.realTime, self.sbEl);
			});
		}
	};

})(jQuery);
