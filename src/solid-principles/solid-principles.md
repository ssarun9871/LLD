# SOLID Principles - Interview Preparation Notes

## Overview
SOLID is an acronym for five design principles in object-oriented programming that make software designs more maintainable, flexible, and scalable.

---

## 1. Single Responsibility Principle (SRP)

**Definition:** A class should have only one reason to change, meaning it should have only one job or responsibility.

**Key Points:**
- Each class should focus on doing one thing well
- Reduces coupling between different parts of the system
- Makes code easier to test and maintain

**Example:**
```typescript
// BAD - Multiple responsibilities
class User {
    saveToDatabase(): void { }
    sendEmail(): void { }
    generateReport(): void { }
}

// GOOD - Single responsibility
class User {
    constructor(
        public name: string,
        public email: string
    ) {}
}

class UserRepository {
    saveToDatabase(user: User): void { }
}

class EmailService {
    sendEmail(user: User): void { }
}

class ReportGenerator {
    generateReport(user: User): void { }
}
```

**Interview Tip:** Mention that SRP improves code organization and makes debugging easier since each class has a clear purpose.

---

## 2. Open/Closed Principle (OCP)

**Definition:** Software entities should be open for extension but closed for modification.

**Key Points:**
- You should be able to add new functionality without changing existing code
- Use abstraction (interfaces, abstract classes) to achieve this
- Reduces risk of breaking existing functionality

**Example:**
```typescript
// BAD - Must modify class to add new shapes
class AreaCalculator {
    calculateArea(shape: any): number {
        if (shape instanceof Circle) {
            // calculate circle area
        } else if (shape instanceof Rectangle) {
            // calculate rectangle area
        }
        // Need to modify this method for each new shape
    }
}

// GOOD - Open for extension, closed for modification
interface Shape {
    calculateArea(): number;
}

class Circle implements Shape {
    constructor(public radius: number) {}//shorthand constructor
    
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

console.log(area.calculateArea(obj1));
```

**Interview Tip:** Explain how polymorphism and interfaces enable OCP.

---

## 3. Liskov Substitution Principle (LSP)

**Definition:** Objects of a superclass should be replaceable with objects of its subclasses without breaking the application.

**Key Points:**
- Subclasses must be substitutable for their base classes
- Derived classes should extend, not replace, the behavior of base classes
- Violating LSP often indicates poor inheritance design

**Example:**
```typescript
// BAD - Violates LSP
class Bird {
    fly(): void {
        console.log("Flying...");
    }
}

class Penguin extends Bird {
    fly(): void {
        throw new Error("Penguins can't fly!");
    }
}

// This function expects all birds to fly
function makeBirdFly(bird: Bird): void {
    bird.fly();  // Crashes if it's a Penguin!
}

const bird = new Bird();
const penguin = new Penguin();
makeBirdFly(bird);// Flying...
makeBirdFly(penguin);// throw error

// GOOD Approach (Interface Segregation + LSP)
interface Bird {
  eat(): void;
}
interface Flyable {
  fly(): void;
}

class Sparrow implements Bird, Flyable {
  eat(): void { console.log("Eating..."); }
  fly(): void { console.log("Sparrow flying!"); }
}

class Penguin implements Bird {
  eat(): void { console.log("Eating..."); }
  swim(): void { console.log("Swimming..."); }
}

function makeBirdFly(bird: Flyable): void {
  bird.fly(); // ✅ Type-safe, only accepts flyable birds
}

const sparrow = new Sparrow();
const penguin= new Penguin();

// Usage
makeBirdFly(sparrow); // ✅ Works
makeBirdFly(penguin); // ❌ Compile error - Good! Caught at compile time
```

**Interview Tip:** This principle ensures that inheritance hierarchies are logical and don't break client expectations.

---

## 4. Interface Segregation Principle (ISP)

**Definition:** Clients should not be forced to depend on interfaces they don't use.

**Key Points:**
- Create specific, focused interfaces rather than one large general-purpose interface
- Classes should only implement methods they actually need
- Prevents "fat" interfaces with unnecessary methods

**Example:**
```typescript
// BAD - Fat interface
interface Worker {
    work(): void;
    eat(): void;
    sleep(): void;
}

class Robot implements Worker {
    work(): void {
        console.log("Working...");
    }
    
    eat(): void {
        // Robots don't eat!
        throw new Error("Robots don't eat");
    }
    
    sleep(): void {
        // Robots don't sleep!
        throw new Error("Robots don't sleep");
    }
}

// GOOD - Segregated interfaces
interface Workable {
    work(): void;
}

interface Eatable {
    eat(): void;
}

interface Sleepable {
    sleep(): void;
}

class Human implements Workable, Eatable, Sleepable {
    work(): void {
        console.log("Working...");
    }
    
    eat(): void {
        console.log("Eating...");
    }
    
    sleep(): void {
        console.log("Sleeping...");
    }
}

class Robot implements Workable {
    work(): void {
        console.log("Working 24/7...");
    }
}
```

**Interview Tip:** ISP promotes flexibility and prevents classes from having dependencies on methods they don't use.

---

## 5. Dependency Inversion Principle (DIP)

**Definition:** High-level modules should not depend on low-level modules. Both should depend on abstractions. 
Abstractions should not depend on details. 
Details should depend on abstractions.

**Key Points:**
- Depend on abstractions (interfaces/abstract classes), not concrete implementations
- Reduces tight coupling between classes
- Makes code more flexible and easier to test (enables dependency injection)

**Example:**
```typescript
// BAD - High-level class depends on low-level class
class MySQLDatabase {
    save(data: string): void {
        console.log("Saving to MySQL:", data);
    }
}

class UserService {
    private database = new MySQLDatabase();
    
    saveUser(userData: string): void {
        this.database.save(userData);
    }
}

// GOOD - Both depend on abstraction
interface Database {
    save(data: string): void;
}

class MySQLDatabase implements Database {
    save(data: string): void {
        console.log("Saving to MySQL:", data);
    }
}

class MongoDatabase implements Database {
    save(data: string): void {
        console.log("Saving to MongoDB:", data);
    }
}

class UserService {
    // Dependency injection
    constructor(private database: Database) {}
    
    saveUser(userData: string): void {
        this.database.save(userData);
    }
}

// Usage
const mysqlDb = new MySQLDatabase();
const userService1 = new UserService(mysqlDb);

const mongoDb = new MongoDatabase();
const userService2 = new UserService(mongoDb);
```

**Interview Tip:** DIP is the foundation of dependency injection frameworks and makes testing much easier since you can inject mock dependencies.

---

## Quick Memory Tips

- **S**ingle responsibility - One class, one job
- **O**pen/Closed - Extend, don't modify
- **L**iskov - Subclasses should work anywhere the parent does
- **I**nterface Segregation - Many small interfaces > one large interface
- **D**ependency Inversion - Depend on abstractions, not concretions