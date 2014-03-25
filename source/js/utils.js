define(['lib/news_special/bootstrap'], function (news) {

	var exitLoadingMode = function () {
		news.$('.spinner').removeClass('spinner');
	};

	var numberWithCommas = function (x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	var sanitize = function (str) {
		return str.toLowerCase().replace(/ /g, '-');
	};

	var addNumberSuffix = function (num) {
		num += '';

		var ending = num.slice(-2),
			last = ending.slice(-1),
			suffix = 'th';

		if (last === '1' && ending !== '11') {
			suffix = 'st';
		} else if (last === '2' && ending !== '12') {
			suffix = 'nd';
		} else if (last === '3' && ending !== '13') {
			suffix = 'rd';
		}

		return num + suffix;
	};

    return {
        exitLoadingMode: exitLoadingMode,
        numberWithCommas: numberWithCommas,
        sanitize: sanitize,
        addNumberSuffix: addNumberSuffix
    };

});