/*
Data abstraction is an important feature of OOP that allows displaying only
essential information while hiding implementation details.

----------------------------
How to Achieve Abstraction
----------------------------
In Java, TypeScript, and OOP in general, abstraction is achieved using:
1. Abstract classes
2. Interfaces

Abstract Class:
- Cannot be instantiated directly
- Is meant to be extended by non-abstract (concrete) classes
- Can contain both abstract and concrete methods

Abstract Methods:
- Are declared but not defined (no method body)
- Can be declared only inside an abstract class
*/

//Abstraction using class
abstract class Vehicle {
    abstract start(): void; // no implementation
}

class Car extends Vehicle {
    start(): void {
        console.log("Car starts with key");
    }
}

const obj = new Car();

obj.start();


//Abstraction using interface
interface Payment {
    pay(amount: number): void;
}

class CreditCardPayment implements Payment {
    pay(amount: number): void {
        console.log(`Paid Rs${amount} using credit card!`);
    }
}

const processPayment = new CreditCardPayment();
processPayment.pay(1000);

/*
Note - Use an abstract class when you want to share common behavior and state among related classes.
Use an interface when you want to define a contract that multiple unrelated classes can implement. 
*/