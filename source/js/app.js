define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller'], function (news, shareTools) {

	var init = function (storyPageUrl) {

		if (viewportIsWideEnough() && svgIsSupported()) {
            require(['map'], function (map) {
				map.init();
            });
		}
	};

	var svgIsSupported = function () {
		return svgSupport = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
	};

	var viewportIsWideEnough = function () {
		return window.innerWidth > 320;
	};

    return {
        init: init
    };

});