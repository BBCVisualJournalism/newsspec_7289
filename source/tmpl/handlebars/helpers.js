module.exports.createBar = function (num) {  return Math.abs(num) * 5; };
module.exports.createMargin = function (num) { if (num < 0) return - (Math.abs(num) * 5); };
module.exports.createNumberMargin = function (num) {
	if (num < 0) {
		var digits = num.toString().length,
			space;

		if (digits === 2) {
			space = 20;
		} else if (digits === 3) {
			space = 28;
		}
		return - space - (Math.abs(num) * 5);
	}
};
module.exports.applyScaleClass = function (num) {
	if (num > 15) {
		a = 'c0';
	} else if (num > 11 && num <= 15) {
		a = 'c1';
	} else if (num > 6 && num <= 11) {
		a = 'c2';
	} else if (num > 0 && num <= 6) {
		a = 'c3';
	} else if (num < 0 && num >= -6) {
		a = 'c4';
	} else if (num < -6 && num >= -11) {
		a = 'c5';
	} else if (num < -11 && num >= -15) {
		a = 'c6';
	} else if (num < -15) {
		a = 'c7';
	}

	return a;
};
module.exports.isNegative = function (num) { var s = (num < 0) ? 'negative' : ''; return s; };
module.exports.getBarWidth = function (str) {
	// 44 is the max bar width
	return (100 * parseInt(str)) / 45;
}