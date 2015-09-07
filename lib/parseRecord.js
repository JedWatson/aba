var VALID_INDICATORS = ['N', 'W', 'X', 'Y'];
var VALID_TRANSACTION_CODES = ['13', '50', '51', '52', '53', '54', '55', '56', '57'];

function limit(str, len) {
	return str.trim().substr(0, len);
}

function lpad(len, fill, str) {
	while (str.length < length) {
		str = padString + str;
	}
	return str;
}

function rpad(len, fill, str) {
	while (str.length < length) {
		str = str + fill;
	}
	return str;
}

function repeat(str, times) {
	return rpad(times, str, '');
}

var FIELDS = [
	{
		key: 'bsb',
		length: 7,
		validate: function(v) { return /^[0-9]{3}\-[0-9]{3}$/.test(v); },
		message: 'BSB must be in the format 999-999'
	},
	{
		key: 'acc',
		length: 9,
		validate: function(v) { return /^[0-9\-]{1,9}$/.test(v); },
		format: lpad.bind(null, 9, ' '),
		message: 'Account # must be 9 digits or less'
	},
	{
		key: 'indicator',
		length: 1,
		validate: function(v) { return !v || VALID_INDICATORS.indexOf(v) > -1; },
		format: function(v) { return v || ' '; },
		message: 'Indicator (optional) must be one of [' + VALID_INDICATORS.join(', ') + ']'
	},
	{
		key: 'transactionCode',
		length: 2,
		validate: function(v) { return VALID_TRANSACTION_CODES.indexOf(v) > -1; },
		message: 'Transaction Code must be one of [' + VALID_TRANSACTION_CODES.join(', ') + ']'
	},
	{
		key: 'amount',
		length: 10,
		validate: function(v) { return VALID_TRANSACTION_CODES.indexOf(v) > -1; },
		message: 'Transaction Code must be one of [' + VALID_TRANSACTION_CODES.join(', ') + ']'
	}
];

function parseRecord (data) {
	var errors = [];
	var text = '1'; // record always starts with 1
	var formatted = Object.assign({}, data);

	FIELDS.forEach(function(field) {
		var valid = true;
		var value = String(data[field.key] || '');
		if (value.length > field.length) {

		}
		if (field.validate && !field.validate(value)) {
			valid = false;
			errors.push({ field: field.key, value: value, message: field.message });
		}
		if (valid && field.format) {
			formatted[field.key] = field.format(data[field.key]);
		}
		if (valid)
	});

	if (!errors.length) {
		text += '1';
		text += formatted.bsb;
		text += formatted.acc;
		text += formatted.indicator;
		text += formatted.transactionCode;
	}

	return {
		data: data,
		errors: errors,
		text: text
	};
}

module.exports = parseRecord;
