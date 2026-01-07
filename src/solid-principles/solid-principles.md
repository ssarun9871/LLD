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
```java
// BAD - Multiple responsibilities
class User {
    void saveToDatabase() { }
    void sendEmail() { }
    void generateReport() { }
}

// GOOD - Single responsibility
class User {
    // User data only
}

class UserRepository {
    void saveToDatabase(User user) { }
}

class EmailService {
    void sendEmail(User user) { }
}

class ReportGenerator {
    void generateReport(User user) { }
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
```java
// BAD - Must modify class to add new shapes
class AreaCalculator {
    double calculateArea(Object shape) {
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
    double calculateArea();
}

class Circle implements Shape {
    public double calculateArea() {
        // circle area logic
    }
}

class Rectangle implements Shape {
    public double calculateArea() {
        // rectangle area logic
    }
}

class AreaCalculator {
    double calculateArea(Shape shape) {
        return shape.calculateArea();
    }
}
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
```java
// BAD - Violates LSP
class Bird {
    void fly() { }
}

class Penguin extends Bird {
    void fly() {
        throw new UnsupportedOperationException("Penguins can't fly!");
    }
}

// GOOD - Respects LSP
class Bird {
    void eat() { }
}

class FlyingBird extends Bird {
    void fly() { }
}

class Penguin extends Bird {
    void swim() { }
}

class Sparrow extends FlyingBird {
    // Can fly
}
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
```java
// BAD - Fat interface
interface Worker {
    void work();
    void eat();
    void sleep();
}

class Robot implements Worker {
    public void work() { }
    public void eat() { } // Robots don't eat!
    public void sleep() { } // Robots don't sleep!
}

// GOOD - Segregated interfaces
interface Workable {
    void work();
}

interface Eatable {
    void eat();
}

interface Sleepable {
    void sleep();
}

class Human implements Workable, Eatable, Sleepable {
    public void work() { }
    public void eat() { }
    public void sleep() { }
}

class Robot implements Workable {
    public void work() { }
}
```

**Interview Tip:** ISP promotes flexibility and prevents classes from having dependencies on methods they don't use.

---

## 5. Dependency Inversion Principle (DIP)

**Definition:** High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.

**Key Points:**
- Depend on abstractions (interfaces/abstract classes), not concrete implementations
- Reduces tight coupling between classes
- Makes code more flexible and easier to test (enables dependency injection)

**Example:**
```java
// BAD - High-level class depends on low-level class
class MySQLDatabase {
    void save(String data) { }
}

class UserService {
    private MySQLDatabase database = new MySQLDatabase();
    
    void saveUser(String userData) {
        database.save(userData);
    }
}

// GOOD - Both depend on abstraction
interface Database {
    void save(String data);
}

class MySQLDatabase implements Database {
    public void save(String data) { }
}

class MongoDatabase implements Database {
    public void save(String data) { }
}

class UserService {
    private Database database;
    
    // Dependency injection
    UserService(Database database) {
        this.database = database;
    }
    
    void saveUser(String userData) {
        database.save(userData);
    }
}
```

**Interview Tip:** DIP is the foundation of dependency injection frameworks and makes testing much easier since you can inject mock dependencies.

---

## Quick Memory Tips

- **S**ingle responsibility - One class, one job
- **O**pen/Closed - Extend, don't modify
- **L**iskov - Subclasses should work anywhere the parent does
- **I**nterface Segregation - Many small interfaces > one large interface
- **D**ependency Inversion - Depend on abstractions, not concretions