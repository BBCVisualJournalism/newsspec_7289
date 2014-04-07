define(['lib/news_special/bootstrap', 'istats', 'utils', 'lib/vendors/d3-3.4.3', 'lib/vendors/topojson-1.6.0', 'maps/european', 'data/wdwtwa_module'], function (news, istats, utils, d3, topojson, map, data) {

	var svg,
		g;

	var init = function () {
		d3.select('.map-container')
			.append('svg')
			.attr({
				'id' : 'map',
				'width' : 230,
				'height' : 360
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

	var appendG = function (xTranslation) {
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
					showTooltip(data[e.properties.ID]);
				},
				'mouseout' : function (e) {
					svg.selectAll('.' + e.properties.ID).classed({
						'highlighted' : false
					});
					d3.select(this).classed({
						'highlighted' : false
					});
					d3.select('#tooltip').style({'display' : 'none'});
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
		var scaleClass;

		if (percentage > 15) {
			scaleClass = 'c0';
		} else if (percentage > 11 && percentage <= 15) {
			scaleClass = 'c1';
		} else if (percentage > 6 && percentage <= 11) {
			scaleClass = 'c2';
		} else if (percentage > 0 && percentage <= 6) {
			scaleClass = 'c3';
		} else if (percentage < 0 && percentage >= -6) {
			scaleClass = 'c4';
		} else if (percentage < -6 && percentage >= -11) {
			scaleClass = 'c5';
		} else if (percentage < -11 && percentage >= -15) {
			scaleClass = 'c6';
		} else if (percentage < -15) {
			scaleClass = 'c7';
		}

		return scaleClass;
	};

	var showTooltip = function (d) {
		var graph = news.$('.main').attr('data-node'),
			name = d['name'],
			percentage = d[graph],
			tipText = '<strong>' + name + '</strong><span>' + percentage + ' %</span>',
			tooltipWidthOffset,
			tooltipTopOffset = 40,
			left,
			top,
			mapContainer = document.getElementById('map');

		d3.select('#tooltip').html(tipText);
		tooltipWidthOffset = parseInt(news.$('#tooltip').outerWidth(), 10) / 2;
		left = d3.event.pageX - news.$('#map').offset().left - tooltipWidthOffset;
		if (left < 0) {left = 0; }
		top = d3.event.pageY - news.$('#map').offset().top + tooltipTopOffset;
		d3.select('#tooltip').style({'left' : left + 'px', 'top' : top + 'px', 'display' : 'block'});
	};

    return {
        init: init
    };

});