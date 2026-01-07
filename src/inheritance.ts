class Vehicle{
    brand: string;
    model: string;

    constructor(brand:string, model:string){
        this.brand = brand;
        this.model = model;
    }

    start():void{
        console.log(`${this.brand} ${this.model} is starting....`);
    }

    stop():void{
        console.log(`${this.brand} ${this.model} has stopped.....`);
    }

}

//Inherit class vehicle using extend keyword
class Car extends Vehicle{
    doors: number;

    constructor(brand:string, model:string, doors:number){
        super(brand, model);
        this.doors = doors
    }

    //method overriding - child class redefine parent class method
    start(): void {
        console.log("Car class");
    }

    honk():void{
        console.log("Beep beep....");
    }
}

const myCar = new Car('Hyundai', 'creta',5);

myCar.start();