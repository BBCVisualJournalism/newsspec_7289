define(['lib/news_special/bootstrap', 'istats', 'settings', 'utils', 'lib/vendors/d3-3.4.3', 'lib/vendors/topojson-1.5.2', 'maps/european'], function (news, istats, settings, utils, d3, topojson, data) {

	var svg,
		g;

	var init = function () {
		mapPath = d3.geo.path().projection(d3.geo.mercator()
					.scale(1700)
					.center([-1, 57])
					//.translate([0, 900])
					);

		d3.select('.map-container')
			.append('svg')
			.attr({
				'id' : 'map',
				'width' : settings.width['main'],
				'height' : settings.height['main']
			});

		svg = d3.select('svg#map');

		drawMap('european');
	};

	var getTopoFeatures = function (map) {
		var mapPointer = settings.maps[map];

		return topojson.feature(mapPointer, mapPointer.objects.boundaries);
	};

	var drawMap = function (map) {
		var topo = getTopoFeatures(map);

		svg.append('g').attr('id', map)
			.selectAll('path')
			.data(topo.features)
			.enter().append('path')
			.attr({
				'd' : mapPath,
				'data-id' : function (e) {
					return e.properties.PCON12CD;
				},
				'class' : function (e) {
					var d = 'normal';

					return d;
				},
				'fill' : function (e) {
					return "#44aaee"
				}
			})
			.on({
				'click' : function (e, map) {

				},
				'mousemove' : function (e) {
					d3.select(this).style("fill", "#5522aa")
				},
				'mouseout' : function (e) {
					d3.select(this).style("fill", "#44aaee")
				}
			});

		utils.exitLoadingMode();
	};

	var zoomCallback = function (state) {
		var g = d3.select('g');

		setTimeout(function () { g.classed({'open' : state}); }, 300);
	};

    return {
        init: init
    };

});