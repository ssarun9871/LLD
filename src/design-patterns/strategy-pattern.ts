/*
Strategy Pattern is a behavioral design pattern that lets you define a family of algorithms, encapsulate each one in a separate class, 
and make them interchangeable at runtime.

Core Concept
Instead of using if/else or switch statements to choose behavior, you:

1. Define each behavior as a separate class
2. Allow switching between these behaviors dynamically
3. Keep the client code independent of specific implementations

The three components
1. Strategy Interface - defines the contract that all strategies must follow.
2. Concete Strategies - different implementations of the same behaviour.
3. Context Class - use a strategy and allows switching between them.

When and Where to use strategy pattern
1. When You Have Multiple If/Else or Switch Statements Based on Types
   Ex - You're checking payment type, shipping method, user role, etc.

2. When You Need to Switch Algorithms at Runtime
   Ex - User changes their mind (switches from credit card to PayPal)

3. When Different Classes Only Differ in Their Behavior
   Ex - Like different sorting algorithms (QuickSort, MergeSort, BubbleSort)

4. When You Want to Hide Complex Implementation from Clients
   Internal details should be encapsulated.

5. When You Need to Follow Open/Closed Principle
   Sign - Every time we add something new, we break existing code

Examples
Payemnt processing - Credit card, Paypal, UPI, Crypto
Navigation - Car, Bike, Walk
E-commerce - Standard, Express, Overnight, International
File comperession - ZIP, RAR, GZIP, TAR
Authentication - OAuth, JWT, Two-factor
Sorting - Quick, Merge, Bubble

 */
// STEP 1: Strategy Interface
interface RouteStrategy {
  calculateRoute(start: string, end: string): void;
  getEstimatedTime(distance: number): number;
}

// STEP 2: Concrete Strategies
class CarRouteStrategy implements RouteStrategy {
  calculateRoute(start: string, end: string): void {
    console.log(`Car Route: ${start} → ${end}`);
  }
  
  getEstimatedTime(distance: number): number {
    const avgSpeed = 60; // km/h
    return distance / avgSpeed;
  }
}

class BikeRouteStrategy implements RouteStrategy {
  calculateRoute(start: string, end: string): void {
    console.log(`Bike Route: ${start} → ${end}`);
  }
  
  getEstimatedTime(distance: number): number {
    const avgSpeed = 15; // km/h
    return distance / avgSpeed;
  }
}

class WalkingRouteStrategy implements RouteStrategy {
  calculateRoute(start: string, end: string): void {
    console.log(`Walking Route: ${start} → ${end}`);
  }
  
  getEstimatedTime(distance: number): number {
    const avgSpeed = 5; // km/h
    return distance / avgSpeed;
  }
}


// STEP 3: Context Class
class Navigator {
  private routeStrategy: RouteStrategy;
  
  constructor(strategy: RouteStrategy) {
    this.routeStrategy = strategy;
  }
  
  // Allow changing strategy at runtime
  setRouteStrategy(strategy: RouteStrategy): void {
    this.routeStrategy = strategy;
    console.log("\n✅ Route strategy changed!\n");
  }
  
  buildRoute(start: string, end: string, distance: number): void {
    this.routeStrategy.calculateRoute(start, end);
    const time = this.routeStrategy.getEstimatedTime(distance);
    console.log(`Distance: ${distance} km`);
    console.log(`Estimated time: ${time.toFixed(1)} hours`);
  }
}

// STEP 4: Client Code
console.log("Navigation System Demo\n");

// User starts with car
const navigator = new Navigator(new CarRouteStrategy());
navigator.buildRoute("Home", "Office", 30);

// User switches to bike
navigator.setRouteStrategy(new BikeRouteStrategy());
navigator.buildRoute("Home", "Office", 30);

// User switches to walking
navigator.setRouteStrategy(new WalkingRouteStrategy());
navigator.buildRoute("Home", "Gym", 5);


/*
class Navigator {
  buildRoute(start: string, end: string, transportMode: string) {
    if (transportMode === "CAR") {
      // Car logic
    } else if (transportMode === "BIKE") {
      // Bike logic
    } else if (transportMode === "WALK") {
      // Walk logic
    } else if (transportMode === "PUBLIC") {
      // Public transport logic
    }
    // Messy if/else nightmare!
  }
}
*/