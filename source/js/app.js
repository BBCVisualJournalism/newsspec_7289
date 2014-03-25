define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller'], function (news, shareTools) {

    return {
        init: function (storyPageUrl) {

            require(['map'], function (map) {
				map.init();
            });

        }
    };

});