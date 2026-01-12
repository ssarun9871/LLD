/*
Observer Pattern is a behavioral design pattern that defines a one-to-many dependency between objects.
When one object (Subject) changes state, all its dependents (Observers) are automatically notified and updated.

Core Concept:
Subject maintains a list of observers and notifies them automatically when state changes.

The Four Components:
1. Observer Interface - Defines the update method
2. Subject Interface - Defines attach/detach/notify methods
3. Concrete Subject - Stores state and notifies observers
4. Concrete Observers - React to notifications

When and Where to Use Observer Pattern:
1. One Object's Change Affects Multiple Other Objects
   Ex - Stock price changes → Multiple displays update

2. You Don't Know How Many Dependents Exist
   Ex - Newsletter system with variable subscribers

3. Objects Should Be Loosely Coupled
   Ex - Easy to add observers without modifying subject

4. Event-Driven Systems
   Ex - UI events, real-time updates

5. Broadcasting Changes
   Ex - News feeds, notifications

Examples:
Stock Market - Price display, charts, alerts
Weather - Mobile app, website, TV display
Social Media - Followers get notified
YouTube - Subscribers get notifications
Newsletter - Email subscribers
Chat - All users in chat room
*/

// STEP 1: Observer/Subscriber Interface
interface Observer {
  update(temperature: number, humidity: number): void;
  getName(): string;
}

// STEP 2: Subject/Publisher Interface
interface Subject {
  registerObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(): void;
}

// STEP 3: Concrete Subject
class WeatherStation implements Subject {
  private observers: Observer[] = [];
  private temperature: number = 0;
  private humidity: number = 0;

  registerObserver(observer: Observer): void {
    this.observers.push(observer);
    console.log(`${observer.getName()} subscribed`);
  }

  removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
      console.log(`${observer.getName()} unsubscribed`);
    }
  }

  notifyObservers(): void {
    console.log("\nNotifying all observers...\n");
    for (const observer of this.observers) {
      observer.update(this.temperature, this.humidity);
    }
  }

  setMeasurements(temperature: number, humidity: number): void {
    console.log(`\n  New weather data: ${temperature}°C, ${humidity}%`);
    this.temperature = temperature;
    this.humidity = humidity;
    this.notifyObservers();
  }
}

// STEP 4: Concrete Observers
class PhoneDisplay implements Observer {
  update(temperature: number, humidity: number): void {
    console.log(`📱 Phone: ${temperature}°C, ${humidity}% humidity`);
  }

  getName(): string {
    return "Phone Display";
  }
}

class WebDisplay implements Observer {
  update(temperature: number, humidity: number): void {
    console.log(`🌐 Website: Temperature ${temperature}°C, Humidity ${humidity}%`);
  }

  getName(): string {
    return "Web Display";
  }
}

class TVDisplay implements Observer {
  update(temperature: number, humidity: number): void {
    console.log(`📺 TV: NOW ${temperature}°C`);
  }

  getName(): string {
    return "TV Display";
  }
}

// STEP 5: Client Code
console.log("Weather Monitoring System\n");

const weatherStation = new WeatherStation();

const phoneDisplay = new PhoneDisplay();
const webDisplay = new WebDisplay();
const tvDisplay = new TVDisplay();

// Subscribe observers
weatherStation.registerObserver(phoneDisplay);
weatherStation.registerObserver(webDisplay);
weatherStation.registerObserver(tvDisplay);

// Weather changes - all observers notified automatically
weatherStation.setMeasurements(25, 65);
weatherStation.setMeasurements(30, 70);

// TV unsubscribes
console.log();
weatherStation.removeObserver(tvDisplay);

// Only phone and web get this update
weatherStation.setMeasurements(28, 68);

/*
Step-by-Step Process:
1. Subject's state changes internally
2. Subject calls notifyObservers()
3. notifyObservers() loops through all observers and call observer.update() for each observer
4. For each observer, call observer.update()
5. Each observer reacts to the update


Interview Question
Que - Does the subject update observers' state directly?
Ans - No, the subject doesn't update observers' state directly. The flow is:
1. Subject updates its own state first
2. Subject calls notifyObservers()
3. Subject calls update() on each observer with the new data
4. Each observer decides how to react and update its own state
*/
