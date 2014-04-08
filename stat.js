var stat = {
	max: function(array) {
		return Math.max.apply(null, array);
	},

	min: function(array) {
		return Math.min.apply(null, array);
	},

	range: function(array) {
		return stat.max(array) - stat.min(array);
	},

	midrange: function(array) {
		return stat.range(array) / 2;
	},

	sum: function(array) {
		var sum = 0, l = array.length;
		while (l--) sum += array[l];
		return sum;
	},

	product: function(array) {
		var product = 1, l = array.length;
		while (l--) product *= array[l];
		return product;
	},

	mean: function(array) {
		return stat.sum(array) / array.length;
	},

	geometricMean: function(array) {
		return Math.pow(stat.product(array), 1 / array.length);
	},

	harmonicMean: function(array) {
		return array.length / stat.sum([].map.call(array, function(num) {
			return 1 / num;
		}));
	},

	median: function(array) {
		[].sort.call(array, function(a, b) {
			return a - b;
		});
		var mid = array.length / 2;
		return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2;
	},

	modes: function(array) {
		if (array.length === 0) return null;
		var modeMap = {},
			maxCount = 1,
			modes = [array[0]];

		[].forEach.call(array, function(val) {
			if (modeMap[val] === undefined) modeMap[val] = 1;
			else modeMap[val]++;
			
			if (modeMap[val] > maxCount) {
				modes = [val];
				maxCount = modeMap[val];
			}
			else if (modeMap[val] == maxCount) {
				modes.push(val);
				maxCount = modeMap[val];
			}
		});
		return modes;
	},

	variance: function(array) {
		var mean = stat.mean(array);
		return stat.mean([].map.call(array, function(num) {
			return Math.pow(num - mean, 2);
		}));
	},

	standardDeviation: function(array) {
		return Math.sqrt(stat.variance(array));
	},

	meanAbsoluteDeviation: function(array) {
		var mean = stat.mean(array);
		return stat.mean([].map.call(array, function(num) {
			return Math.abs(num - mean);
		}));
	},

	medianAbsoluteDeviation: function(array) {
		var median = stat.median(array);
		return stat.median([].map.call(array, function(num) {
			return Math.abs(num - mean);
		}));
	},

	zScores: function(array) {
		var mean = stat.mean(array);
		var standardDeviation = stat.standardDeviation(array);
		return [].map.call(array, function(num) {
			return (num - mean) / standardDeviation;
		});
	}
};

// Function aliases:
stat.average = stat.arithmeticMean = stat.mean;