# Design Patterns - Interview Quick Reference

## Behavioral Patterns (~50-55% of interviews)

### Strategy Pattern
**Use when:** You're replacing if/else logic with interchangeable behaviors.
- **Example:** Payment methods (Credit Card, PayPal, UPI)
- **Example:** Sorting algorithms (QuickSort, MergeSort, BubbleSort)

### Observer Pattern
**Use when:** Multiple components need to react to a single event.
- **Example:** Event listeners, notification systems
- **Example:** Stock price updates to multiple subscribers

### State Pattern
**Use when:** An object's behavior depends on its current state and transitions get messy.
- **Example:** Vending machine (Idle → Selecting → Dispensing → OutOfStock)
- **Example:** Order status (Pending → Processing → Shipped → Delivered)

---

## Creational Patterns (~30-35% of interviews)

### Factory Pattern
**Use when:** Callers shouldn't care which concrete class gets created.
- **Example:** Vehicle factory (Car, Bike, Truck)
- **Example:** Notification factory (Email, SMS, Push)

### Builder Pattern
**Use when:** An object has lots of optional fields or messy construction details.
- **Example:** Building a Computer (CPU, RAM, Storage, GPU - all optional)
- **Example:** HttpRequest with optional headers, params, body

### Singleton Pattern
**Use when:** You truly need one global instance (rare in interviews).
- **Example:** Database connection pool
- **Example:** Logger, Configuration manager

---

## Structural Patterns (~15-20% of interviews)

### Adapter Pattern
**Use when:** Allowing incompatible interfaces to work together.
- **Example:** Payment gateway adapter (integrating Stripe, Razorpay)
- **Example:** Legacy system integration

### Decorator Pattern
**Use when:** Adding new functionality to objects dynamically.
- **Example:** Adding toppings to pizza
- **Example:** Adding features to a text editor (bold, italic, underline)

### Facade Pattern
**Use when:** Providing simplified interface to complex subsystems.
- **Example:** Home theater system (one button to control multiple devices)
- **Example:** Booking system facade (handles flights, hotels, cars)

---