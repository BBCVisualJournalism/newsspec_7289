define(['lib/vendors/d3-3.4.3', 'maps/european'], function (d3, map) {
	var maps = {
			european : map
		},
		width = {
			main : 624
		},
		height = {
			main : 900
		},
		offsets = {
			tooltipTop : 150
		};

	return {
		maps : maps,
		width : width,
		height : height,
		offsets : offsets
	};
});