function ABA () {

	var descriptor = { text: '', data: null };
	var records = [];
	var totals = {};
	var _needsRecalc = true;

	this.describe = function (data) {
		this.descriptor.data = data;
		this.descriptor.text = '';
	};

	function addRecord (data) {
		records.push({
			text: '',
			data: data
		});
		_needsRecalc = true;
	}

	this.add = function () {
		for (var i = 0; i < arguments.length; i++) {
			addRecord(arguments[i]);
		}
		return this;
	};

	this.getTotals = function () {
		return Object.assign({}, totals);
	};

	this.isValid = function () {
		return true;
	};

	this.getValidationErrors = function () {
		return [];
	};

	this.generate = function () {
		return '';
	};

	this.describe(arguments[0]);

	for (var i = 1; i < arguments.length; i++) {
		addRecord(arguments[i]);
	}

}

module.exports = ABA;
