# Top 4 Design Principles - Interview Preparation

---

## 1. DRY (Don't Repeat Yourself)

### Definition
DRY stands for Don't Repeat Yourself. It means that every piece of knowledge or logic should exist in exactly one place in your codebase. It's important because:
- When requirements change, you only update one location
- It reduces bugs since there's no chance of updating logic in one place but forgetting another

In simple terms: Don't write the same code twice. Extract common functionality into reusable components.

### Common Interview Questions

**Que: "When might you intentionally violate DRY?"**

**Good Answer:**
"I might violate DRY when:
- The code looks similar but represents different business concepts that might evolve separately
- Premature abstraction would make code harder to understand
- Performance-critical code where duplication gives significant speed gains
- The duplicate code is in completely different contexts (e.g., frontend and backend validation might be intentionally separate)"

### Key Takeaway
**DRY ≠ No Duplication at All Costs**

Good duplication: Two similar-looking functions that represent different business concepts
Bad duplication: Copy-pasting the same logic because you're too lazy to extract it

---

## 2. Composition Over Inheritance

### Definition
**Achieve code reuse through composition (has-a relationship) rather than inheritance (is-a relationship).**

### Why It Matters
- **More Flexible**: Behaviors can be mixed and matched
- **Avoids Fragile Base Class Problem**: Changes to parent don't break children
- **Runtime Flexibility**: Behaviors can be changed at runtime
- **Avoids Deep Hierarchies**: Simpler class structures

### The Problem with Inheritance

```typescript
// ❌ BAD - Inheritance creates rigid hierarchies
// Penguin is a Bird (IS-A relationship)
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

// Problem 1: Penguin breaks parent behaviour and violates LSP
// Problem 2: Hard to extend without bugs
// Problem 3: Behaviour forced even when it doesn't make sense
```

### The Solution: Composition

```typescript
// ✅ GOOD - Using Composition
// Penguin has a swin behaviour (HAS-A relationship)
class SwimBehavior {
  swim(): void {
    console.log("Swimming...");
  }
}

class Penguin {
  private swimBehavior = new SwimBehavior();

  swim(): void {
    this.swimBehavior.swim();
  }
}
```

### Real-World Example: Payment System

```typescript
// ❌ BAD - Using inheritance
class BasePayment {
  process(): void {
    console.log("Processing payment");
  }
}

class CreditCardPayment extends BasePayment {
  process(): void {
    console.log("Processing credit card payment");
  }
}

class PayPalPayment extends BasePayment {
  process(): void {
    console.log("Processing PayPal payment");
  }
}

// ✅ GOOD - Using composition
interface PaymentProcessor {
  process(amount: number): void;
}

interface PaymentValidator {
  validate(amount: number): boolean;
}

interface PaymentNotifier {
  notify(amount: number): void;
}

class CreditCardProcessor implements PaymentProcessor {
  process(amount: number): void {
    console.log(`Processing $${amount} via Credit Card`);
  }
}

class PayPalProcessor implements PaymentProcessor {
  process(amount: number): void {
    console.log(`Processing $${amount} via PayPal`);
  }
}

class FraudValidator implements PaymentValidator {
  validate(amount: number): boolean {
    console.log("Running fraud detection...");
    return amount <= 10000;
  }
}

class EmailNotifier implements PaymentNotifier {
  notify(amount: number): void {
    console.log(`Email sent: Payment of $${amount} processed`);
  }
}

class SMSNotifier implements PaymentNotifier {
  notify(amount: number): void {
    console.log(`SMS sent: Payment of $${amount} processed`);
  }
}

// Composition
class PaymentService {
  constructor(
    private processor: PaymentProcessor,
    private validator?: PaymentValidator,
    private notifiers: PaymentNotifier[] = []
  ) {}

  execute(amount: number): void {
    if (this.validator && !this.validator.validate(amount)) {
      console.log("Payment failed validation");
      return;
    }

    this.processor.process(amount);
    this.notifiers.forEach(n => n.notify(amount));
  }
}

// Usage
const securePayPal = new PaymentService(
  new PayPalProcessor(),
  new FraudValidator(),
  [new EmailNotifier()]
);

securePayPal.execute(5000);

```

### Common Interview Questions

**Que: "When would you still use inheritance?"**

**Good Answer:**
"I'd use inheritance when there's a clear 'is-a' relationship and:
- The hierarchy is shallow (1-2 levels max)
- Child classes truly are specialized versions of the parent
- You're extending a framework or library that expects inheritance
- The behavior is fundamental to the object's identity

For example, Dog IS-A Animal makes sense. But 'Vehicle with GPS' is better as composition - the vehicle HAS-A GPS, not IS-A GPS."

**Que: "Can you refactor this inheritance code to use composition?"**

**They might show you code like:**
```typescript
class Bird {
    fly(): void {}
}

class Penguin extends Bird {
    fly(): void {
        throw new Error("Can't fly");
    }
}
```

**Your Answer:**
"This violates LSP and shows poor use of inheritance. I'd refactor it using composition:

```typescript
interface Movement {
    move(): void;
}

class FlyMovement implements Movement {
    move(): void { console.log("Flying"); }
}

class SwimMovement implements Movement {
    move(): void { console.log("Swimming"); }
}

class Bird {
    constructor(private movement: Movement) {}
    move(): void { this.movement.move(); }
}

const eagle = new Bird(new FlyMovement());
const penguin = new Bird(new SwimMovement());
```
Now each bird has appropriate movement behavior without inheritance issues."

### Key Takeaway
**"Prefer composition over inheritance, but don't avoid inheritance entirely. Use the right tool for the job."**

---

## 3. Separation of Concerns (SoC)

### Definition
**Different parts of a program should handle different responsibilities. Each module should address a separate concern.**

Think of it like organizing a company:
- Sales team handles sales
- Engineering team handles development
- HR team handles hiring
- Finance team handles money

Each team (module) has its own clear responsibility.

### Real-World Example: E-Commerce Order

```typescript
// ❌ BAD - All concerns mixed together
class OrderService {
  placeOrder(order: any): void {
    // Validation logic
    if (!order.email.includes("@")) {
      throw new Error("Invalid email");
    }

    // Business logic
    const total = order.price * order.quantity;

    // Database logic
    console.log("Saving order to database");

    // Logging logic
    console.log("Order placed");
  }
}
```

**Problems:**
1. **Hard to Test**: Can't test business logic without database/email
2. **Hard to Maintain**: Changing email format requires editing this giant method
3. **Tight Coupling**: Everything depends on everything
4. **Can't Reuse**: Can't use validation logic elsewhere
5. **Hard to Debug**: Which concern caused the bug?

```typescript
// ✅ GOOD - Separated Concerns
// VALIDATION LOGIC
class OrderValidator {
  validate(order: any): void {
    if (!order.email.includes("@")) {
      throw new Error("Invalid email");
    }
  }
}

// BUSINESS LOGIC 
class PriceCalculator {
  calculate(price: number, quantity: number): number {
    return price * quantity;
  }
}

// DATABASE LOGIC
class OrderRepository {
  save(order: any, total: number): void {
    console.log("Saving order with total:", total);
  }
}


// LOGGING LOGIC
class Logger {
    logOrderProcessed(orderId: string): void {
        console.log(`[${new Date().toISOString()}] Order ${orderId} processed`);
    }
}

// ORCHESTRATION - Brings it all together
class OrderService {
  constructor(
    private validator: OrderValidator,
    private calculator: PriceCalculator,
    private repository: OrderRepository
  ) {}

  placeOrder(order: any): void {
    this.validator.validate(order);
    const total = this.calculator.calculate(order.price, order.quantity);
    this.repository.save(order, total);
    console.log("Order placed successfully");
  }
}

```

### Common Interview Questions

**Que: "What is Separation of Concerns?"**

**Answer:**
"Separation of Concerns means organizing code so that different parts handle different responsibilities. Each module or class should focus on one specific concern - like data access, business logic, or presentation. This makes code easier to maintain, test, and understand because changes to one concern don't affect others."

**Que: "How does SoC relate to Single Responsibility Principle?"**

**Answer:**
"They're closely related but at different levels:
- SRP is at the class level - each class should have one reason to change
- SoC is at the architecture level - separate concerns across modules/layers

For example, in MVC:
- SoC separates Model, View, Controller (architecture level)
- SRP ensures each Model class handles only one entity (class level)

SRP is essentially SoC applied to individual classes."

### Key Takeaway
**Think of SoC as organizing a messy room - put clothes in the closet, books on the shelf, and toys in the toy box. Don't mix everything together.**

---

## 4. KISS (Keep It Simple, Stupid)

### Definition
**Systems work best when they are kept simple. Avoid unnecessary complexity.**

The best code is code that's easy to understand, not code that's clever.

### Real-World Examples

#### Example : Checking if a number is even

```typescript
// ❌ BAD - Unnecessarily complex
class NumberChecker {
    isEven(num: number): boolean {
        // Why use ternary operators in a nested way?
        return num % 2 === 0 ? true : num % 2 !== 0 ? false : true;
    }
    
    // Overly engineered
    isEvenComplex(num: number): boolean {
        const binaryString = num.toString(2);
        const lastDigit = binaryString.charAt(binaryString.length - 1);
        return lastDigit === '0';
    }
}

// ✅ GOOD - Simple and clear
class NumberChecker {
    isEven(num: number): boolean {
        return num % 2 === 0;
    }
}
```

### Common Interview Questions

**Que: "How do you balance KISS with extensibility?"**

**Good Answer:**
"I follow the principle 'Make it work, make it right, make it fast - in that order.' I start with the simplest solution that works. Then, when actual requirements for extensibility emerge, I refactor to add flexibility. This is related to YAGNI - You Aren't Gonna Need It. 

For example, instead of creating an abstract factory pattern for user authentication when I only have password auth, I'd implement a simple AuthService. When we add OAuth later, THEN I'd refactor to support multiple auth methods."

**Que: "Look at this code. How would you simplify it?"**

They might show code like:
```typescript
function getUserStatus(user: User): string {
    if (user.isActive === true) {
        if (user.isPremium === true) {
            return 'active-premium';
        } else {
            return 'active-free';
        }
    } else {
        if (user.isPremium === true) {
            return 'inactive-premium';
        } else {
            return 'inactive-free';
        }
    }
}
```

**Your Answer:**
```typescript
function getUserStatus(user: User): string {
    const status = user.isActive ? 'active' : 'inactive';
    const tier = user.isPremium ? 