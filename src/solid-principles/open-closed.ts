interface Shape {
    calculateArea(): number;
}

class Circle implements Shape {
    constructor(public radius: number) {}
    
    calculateArea(): number {
        return Math.PI * this.radius ** 2;
    }
}

class Rectangle implements Shape {
    constructor(
        public width: number,
        public height: number
    ) {}
    
    calculateArea(): number {
        return this.width * this.height;
    }
}

class AreaCalculator {
    calculateArea(shape: Shape): number {
        return shape.calculateArea();
    }
}

const circle = new Circle(2);
const area = new AreaCalculator();

console.log(area.calculateArea(circle));