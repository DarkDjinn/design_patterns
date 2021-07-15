const fs = require('fs');

class Journal {
	constructor(props) {
		this.entries = {};
		this.count = 0;
	}

	addEntry(text) {
		let c = ++this.count;
		let entry = `${c}: ${text}`;
		this.entries[c] = entry;
		return c;
	}

	removeEntry(index) {
		delete this.entries[index];
	}

	toString() {
		return Object.values(this.entries).join('\n');
	}

	// Best if all save/load operations are managed from a single source - PersistenceManager
	// save(filename) {
	// 	fs.writeFileSync(filename, this.toString());
	// }

	// load(filename) {
	// 	//
	// }

	// loadFromUrl(url) {
	// 	//
	// }
}

class PersistenceManager {
	preprocess(j) {
		//
	}

	saveToFile(journal, filename) {
		fs.writeFileSync(filename, journal.toString());
	}
}

let j = new Journal();
j.addEntry('Hello');
j.addEntry('Bye');

let p = new PersistenceManager();
let filename = '/Users/victor/design_patterns/test.txt';
p.saveToFile(j, filename);
