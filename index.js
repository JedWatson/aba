var parseRecord = require('./lib/parseRecord');

function ABA () {

	var descriptor = { text: '', data: null };
	var records = [];
	var totals = {
		net: 0.0,
		credit: 0,
		debit: 0,
		count: 0
	};
	var _dirty = true;

	this.describe = function (data) {
		this.descriptor.data = data;
		this.descriptor.text = '';
	};

	function addRecord (data) {
		records.push(parseRecord(data));
		_dirty = true;
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
