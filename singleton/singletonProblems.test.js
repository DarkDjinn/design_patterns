const { it, expect } = require('@jest/globals');
const fs = require('fs');
const path = require('path');

// Low-level module
class MyDatabase {
	constructor() {
		const instance = this.constructor.instance;
		if (instance) return instance;
		this.constructor.instance = this;

		console.log('Initializing Database');
		this.capitals = {};

		let lines = fs.readFileSync(path.join(__dirname, 'capitals.txt')).toString().split('\n');

		for (let i = 0; i < lines.length / 2; i++) {
			this.capitals[lines[2 * i]] = parseInt(lines[2 * i + 1]);
		}
	}

	getPopulation(city) {
		return this.capitals[city];
	}
}

// High-level module
class SingletonRecordFinder {
	totalPopulation(cities) {
		return cities.map(city => new MyDatabase().getPopulation(city)).reduce((x, y) => x + y);
	}
}

class ConfigurableRecordFinder {
	constructor(database = new MyDatabase()) {
		this.database = database;
	}

	totalPopulation(cities) {
		return cities.map(city => this.database.getPopulation(city)).reduce((x, y) => x + y);
	}
}

class DummyDatabase {
	constructor() {
		this.capitals = {
			Jerusalem: 12,
			beta: 24,
			PI: 36,
		};
	}

	getPopulation(city) {
		return this.capitals[city];
	}
}

describe('signleton database', function () {
	it('is a singleton', function () {
		const db1 = new MyDatabase();
		const db2 = new MyDatabase();
		expect(db1).toBe(db2);
	});

	it('calculates total population', function () {
		let rf = new SingletonRecordFinder();
		let cities = ['Helsinki', 'Gibraltar'];
		let tp = rf.totalPopulation(cities);
		expect(tp).toEqual(99999 + 101010);
	});

	it('calculates total population better', function () {
		let db = new DummyDatabase();
		let rf = new ConfigurableRecordFinder(db);
		expect(rf.totalPopulation(['Jerusalem', 'PI'])).toEqual(48);
	});
});
