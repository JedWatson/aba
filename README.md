# Deprecation Notice

This repository contains work that was unfinished, and this code is not the same as the published `aba` package on npm.

I recommend using [aba-generator](https://www.npmjs.com/package/aba-generator) by @koresar, the source for which is at [koresar/aba-generator](https://github.com/koresar/aba-generator).

---

# ABA Generator

Creates Australian Bank Payment Files (ABA / Cemtex / Australian Bankers Association format).

ABA files are used by Australian banks to facilitate batch transactions.

For more information on the format, see [cemtexaba.com](https://www.cemtexaba.com/aba-format)

## Usage

Install the package:

```
npm install aba --save
```

Create a new ABA file:

```
var ABA = require('aba');
var fs = require('fs');

var file = new ABA(descriptor, [...records]);
file.add(record, ...record);

if (file.isValid()) {
	var contents = file.generate(); // will throw an error if the file is not valid
	var filename = 'file.aba';
	var totals = file.getTotals();
	fs.writeFile(filename, contents, function (err) {
		if (err) throw err;
		console.log('ABA file saved to ' + filename);
	});
} else {
	console.log('File has validation errors:', file.getValidationErrors());
}
```
