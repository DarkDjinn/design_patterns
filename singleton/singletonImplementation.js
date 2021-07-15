class Singleton {
	constructor() {
		const instnce = this.constructor.instnce;
		if (instnce) return instnce;
		this.constructor.instnce = this;
	}

	foo() {
		console.log('Doing Something..');
	}
}

let s1 = new Singleton();
let s2 = new Singleton();

console.log('Are the identical? ' + (s1 === s2));
s1.foo();
