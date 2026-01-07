/*
Polymorphism is an OOP concept where the same method behaves differently
based on the object that invokes it.

Polymorphism can be achieved using method overriding and function overloading.

Note: TypeScript does not support traditional method overloading like Java.
It supports function overloading using multiple method signatures.
*/

//method overriding
class Animal {
    makeSound(): void {
        console.log("Animal makes a sound");
    }
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Dog barks");
    }
}

const animal = new Animal();
const dog = new Dog();

const pet: Animal = new Dog();
pet.makeSound(); // Dog barks


/* method overloading Same method name but different parameter list (number, type, order) */

//functional overloading
class Calculator {
    add(a: number, b: number): number;
    add(a: string, b: string): string;

    add(a: any, b: any): any {
        return a + b;
    }
}

const calc = new Calculator();

console.log(calc.add(2, 3));       // 5
console.log(calc.add("Hi ", "JS")); // Hi JS

