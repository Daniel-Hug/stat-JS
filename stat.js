var stat = (function() {
	var stat = {
		max: max,
		min: min,
		range: range,
		midrange: midrange,
		sum: sum,
		product: product,
		countEach: countEach,
		mean: mean,
		geometricMean: geometricMean,
		harmonicMean: harmonicMean,
		median: median,
		modes: modes,
		variance: variance,
		standardDeviation: standardDeviation,
		meanAbsoluteDeviation: meanAbsoluteDeviation,
		zScores: zScores
	};
	var has = {}.hasOwnProperty;

	function max(array) {
		return Math.max.apply(null, array);
	}

	function min(array) {
		return Math.min.apply(null, array);
	}

	function range(array) {
		return max(array) - min(array);
	}

	function midrange(array) {
		return range(array) / 2;
	}

	function sum(array) {
		var s = 0, l = array.length;
		while (l--) s += array[l];
		return s;
	}

	function product(array) {
		var p = 1, l = array.length;
		while (l--) p *= array[l];
		return p;
	}

	function countEach(array) {
		var obj = {};
		array.forEach(function(val) {
			if (has.call(obj, val)) obj[val]++;
			else obj[val] = 1;
		});
		return obj;
	}

	function mean(array) {
		return sum(array) / array.length;
	}

	function geometricMean(array) {
		return Math.pow(product(array), 1 / array.length);
	}

	function harmonicMean(array) {
		return array.length / sum(array.map(function(num) {
			return 1 / num;
		}));
	}

	function median(array) {
		array.sort(function(a, b) {
			return a - b;
		});
		var mid = array.length / 2;
		return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2;
	}

	function modes(array) {
		var modeMap = {},
			maxCount = 0,
			m = [];

		array.forEach(function(val) {
			if (has.call(modeMap, val)) modeMap[val]++;
			else modeMap[val] = 1;

			if (modeMap[val] > maxCount) {
				m = [val];
				maxCount++;
			}
			else if (modeMap[val] === maxCount) {
				m.push(val);
			}
		});
		return m;
	}

	function variance(array) {
		var mean = mean(array);
		return mean(array.map(function(num) {
			return Math.pow(num - mean, 2);
		}));
	}

	function standardDeviation(array) {
		return Math.sqrt(variance(array));
	}

	function meanAbsoluteDeviation(array) {
		var avg = mean(array);
		return mean(array.map(function(num) {
			return Math.abs(num - avg);
		}));
	}

	function medianAbsoluteDeviation(array) {
		var median = median(array);
		return median(array.map(function(num) {
			return Math.abs(num - mean);
		}));
	}

	function zScores(array) {
		var avg = mean(array);
		var standardDeviation = standardDeviation(array);
		return array.map(function(num) {
			return (num - avg) / standardDeviation;
		});
	}

	return stat;
})();