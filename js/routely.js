/*!
*	Routely - Hash router
*	https://github.com/paulserraino/routely
*	(c)Paul Serraino | Licence MIT
*/
(function (name, definition) {
	if (typeof module != 'undefined' && module.exports) module.exports = definition()
	else if (typeof define == 'function' && define.amd) define(definition)
	else this[name] = definition()
})('Routely', function () {

	var self;

	// routely constructor
	function routely () {
		self = this;

		this.routes = [];

		window.onload = RouteHandler;
		window.onhashchange = RouteHandler;
	}

	function RouteHandler(evt) {
		var _route = window.location.hash.slice(1) || '/';

		try {
			// check for route with no params
			if (self.routes[_route] !== undefined) {
				self.routes[_route].controller.call();
			} 
			// check for route with params
			else {
				for (var r in self.routes) {
					if(r !== '/' && self.routes[r].getRegExp().test(_route)) {
						var args = self._getRouteParams(self.routes[r].getRegExp(), _route);
						self.routes[r].controller.apply(self, args);
					}
				}
			}

		} catch (err) {
			console.error(err.message);
		}
	}

	routely.prototype = {
		route: function(route, controller) {
			var _rx = this._routeToRegex(route);

			this.routes[route] = { 
				controller: controller,
				getRegExp: function() { return _rx; }
			};

			return this;
		},
		_routeToRegex: function(route) {
			route = route.replace(/:\w+/g, '([^/?]+)');
			return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
		},
		_getRouteParams: function (regex, route) {
			var params = regex.exec(route).slice(1);
			return params;
		}
	};

	return routely;

});