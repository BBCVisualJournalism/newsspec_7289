define(['lib/news_special/bootstrap', 'istats', 'utils', 'lib/vendors/d3-3.4.3', 'lib/vendors/topojson-1.6.0', 'maps/european', 'data/wdwtwa_module'], function (news, istats, utils, d3, topojson, map, data) {

	var svg,
		g;

	var init = function () {
		d3.select('.map-container')
			.append('svg')
			.attr({
				'id' : 'map',
				'width' : 230,
				'height' : 900
			});

		svg = d3.select('svg#map');

		drawMap('european');
	};

	var getMapPath = function (xTranslation) {
		return d3.geo.path().projection(d3.geo.mercator().scale(1000).translate([xTranslation, 1350]));
	};

	var getTopoFeatures = function () {
		return topojson.feature(map, map.objects.boundaries);
	};

	var appendG = function(xTranslation) {
		var topo = getTopoFeatures();

		svg.append('g').attr('id', xTranslation)
			.selectAll('path')
			.data(topo.features)
			.enter().append('path')
			.attr({
				'd' : getMapPath(xTranslation),
				'class' : function (e) {
					var graph = news.$('.main').attr('data-node'),
						nm = data[e.properties.ID][graph],
						d = 'area ' + e.properties.ID + ' ' + applyScaleClass(nm);

					return d;
				}
			})
			.on({
				'click' : function (e) {

				},
				'mouseover' : function (e) {
					svg.selectAll('.' + e.properties.ID).classed({
						'highlighted' : true
					});
					d3.select(this).classed({
						'highlighted' : true
					});
				},
				'mouseout' : function (e) {
					svg.selectAll('.' + e.properties.ID).classed({
						'highlighted' : false
					});
					d3.select(this).classed({
						'highlighted' : false
					});
				}
			});
	};

	var drawMap = function () {
		appendG(170);
		//appendG(400);
		//appendG(600);

		utils.exitLoadingMode();
	};

	var applyScaleClass = function (percentage) {
		var a;

		if (percentage > 15) {
		a = 'c0';
		} else if (percentage > 11 && percentage <= 15) {
		a = 'c1';
		} else if (percentage > 6 && percentage <= 11) {
		a = 'c2';
		} else if (percentage > 0 && percentage <= 6) {
		a = 'c3';
		} else if (percentage < 0 && percentage >= -6) {
		a = 'c4';
		} else if (percentage < -6 && percentage >= -11) {
		a = 'c5';
		} else if (percentage < -11 && percentage >= -15) {
		a = 'c6';
		} else if (percentage < -15) {
		a = 'c7';
		}

		return a;
	};

    return {
        init: init
    };

});