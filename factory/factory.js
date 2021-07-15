CoordinateSystem = {
	cartesian: 0,
	polar: 1,
};

class Point {
	// constructor(a, b, cs = CoordinateSystem.cartesian) {
	// 	switch (cs) {
	// 		case CoordinateSystem.cartesian:
	// 			this.x = a;
	// 			this.y = b;
	// 			break;
	// 		case CoordinateSystem.polar:
	// 			this.x = a * Math.cos(b);
	// 			this.y = a * Math.sin(b);
	//       break;
	// 	}
	// }

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	// constructor(rho, theta) {
	//   this.x = rho * Math.cos(theta)
	//   this.y = rho * Math.sin(theta)
	// }

	static get factory() {
		return new PointFactory();
	}
}

class PointFactory {
	static newCartesianPoint(x, y) {
		return new Point(x, y);
	}

	static newPolarPoint(rho, theta) {
		return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
	}
}

let p = PointFactory.newCartesianPoint(4, 5);
console.log(p);

let p2 = Point.factory.newPolarPoint(5, Math.PI / 2);
console.log(p2);
