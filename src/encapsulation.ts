/*
1. Encapsulation is the process of binding data members and methods together
   and restricting direct access to the data.
2. It is achieved using access modifiers like private, protected, and public
   to control access to class members(variables, method, constructor...).
*/

class Employee {
    private name: string;
    private age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    //getter and setter for name and age
    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getAge(): number {
        return this.age;
    }

    public setAge(age: number): void {
        this.age = age;
    }
}

const emp1 = new Employee('John', 35);
console.log(emp1.getName());

//console.log(emp1.name) //Not allowed because 'name' is a PRIVATE class member