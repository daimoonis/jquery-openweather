(function ($) {
// local globals go here - referenced via closure

	$.fn.openweather = function (options) {
		options = $.extend({}, $.fn.openweather.config, options);
		return this.each(function () {

			var sParametry = '';
			var el = $(this);
			if (options.elementDataAttributes !== null) {
				$.each(options.elementDataAttributes, function (parameter, value) {
					sParametry += (sParametry ? '&' : '') + parameter + '=' + el.attr(value);
				});
			}

			$.each(options.paramO, function (parameter, value) {
				sParametry += (sParametry ? '&' : '') + parameter + '=' + (typeof value === "function" ? value() : value);
			});


			if (options.temperatureValue === 'celsius') {
				sParametry += (sParametry ? '&' : '') + 'units=metric';
			}
			else if (options.temperatureValue === 'fahrenheit') {
				sParametry += (sParametry ? '&' : '') + 'units=imperial';
			}
			//default is Kelvin
			//
			// initialize the elements in the collection
			var $ajax = $.ajax({
				type: options.method,
				url: options.url,
				data: sParametry,
				async: options.async,
				dataType: options.dataType,
				beforeSend: function (XMLHttpRequest) {

				},
				success: function (sV, sT) {
					//sV - returned data
					if (typeof options.returnDataHandler === "function") {
						options.returnDataHandler(sV, el);
					}
					else {
						console.log('Openweather: returnDataHandler is not a function');
					}
				},
				error: function (oR, sT, oE) {
					if (oR.status)
						console.log(oR.status + ': ' + oR.statusText);
					if (typeof options.returnDataHandler === "function") {
						options.returnDataHandler(null, el);
					}
					else {
						console.log('Openweather: returnDataHandler is not a function');
					}
				},
				complete: function () {

				},
				cache: false,
				global: false
			});
		});
	};

	$.fn.openweather.config = {
		// set values and custom functions
		url: 'http://api.openweathermap.org/data/2.5/weather',
		paramO: {},
		method: 'get', //	get / post
		async: true,
		dataType: 'json', //	html / json
		elementDataAttributes: {lat: 'data-latitude', lon: 'data-longitude'}, // null or object
		temperatureValue: 'celsius', // celsius / fahrenheit / kelvin
		returnDataHandler: function (returnedData, $element) {
//			console.log(returnedData);
			console.log('Openweather: create your own function as returnDataHandler');
		}
	};
}(jQuery));
