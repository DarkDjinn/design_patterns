class Rectangle {
	constructor(width, height) {
		this._width = width;
		this._height = height;
	}

	get width() {
		return this._width;
	}

	get heigth() {
		return this._heigth;
	}

	set width(value) {
		this._width = value;
	}

	set height(value) {
		this._height = value;
	}

	get area() {
		return this._width * this._height;
	}

	get isSquare() {
		return this._width === this._height;
	}

	toString() {
		return `${this._width} x ${this._height}`;
	}
}

class Square extends Rectangle {
	constructor(size) {
		super(size, size);
	}

	set width(value) {
		this._width = this._height = value;
	}

	set height(value) {
		this._width = this._height = value;
	}
}

let useIt = rc => {
	let width = rc._width;
	rc.height = 10;
	console.log(`Expcted: ${10 * width}`, `Got: ${rc.area}`);
};

let rc = new Rectangle(2, 3);
useIt(rc);

let sq = new Square(5);
useIt(sq);
