/*
Factory Pattern is a creational design pattern that provides an interface for 
creating objects without specifying their exact classes.

Core Concept:
Instead of using 'new' directly, use a factory method that decides which class 
to instantiate based on input.

The Three Components:
1. Product Interface - Common interface for all products
2. Concrete Products - Different implementations of the product
3. Factory - Creates and returns appropriate product

When and Where to Use Factory Pattern:
1. You Don't Know Exact Types at Compile Time
   Ex - User selects notification type at runtime

2. Object Creation Logic is Complex
   Ex - Multiple steps, dependencies, validation

3. You Want to Hide Implementation Details
   Ex - Client only knows interface, not concrete classes

4. You're Creating Objects from Same Family
   Ex - Different notifications (Email, SMS, Push)

5. Adding New Types is Frequent
   Ex - Keep adding new notification channels

Examples:
Notification System - Email, SMS, Push, WhatsApp
Payment Processing - CreditCard, PayPal, UPI, Crypto
Document Generation - PDF, Word, Excel, CSV
Vehicle Rental - Car, Bike, Truck, Scooter
Database Connection - MySQL, PostgreSQL, MongoDB
Logger System - Console, File, Database, Cloud
Shape Drawing - Circle, Rectangle, Triangle
*/

// STEP 1: Product Interface
interface Notification {
  send(message: string): void;
  getType(): string;
}

// STEP 2: Concrete Products
class EmailNotification implements Notification {
  send(message: string): void {
    console.log(`Sending EMAIL: "${message}"`);
    console.log("Email sent successfully!");
  }

  getType(): string {
    return "Email";
  }
}

class SMSNotification implements Notification {
  send(message: string): void {
    console.log(`Sending SMS: "${message}"`);
    console.log("SMS sent successfully!");
  }

  getType(): string {
    return "SMS";
  }
}

class PushNotification implements Notification {
  send(message: string): void {
    console.log(`Sending PUSH notification: "${message}"`);
    console.log("Push notification sent successfully!");
  }

  getType(): string {
    return "Push";
  }
}

class WhatsAppNotification implements Notification {
  send(message: string): void {
    console.log(`Sending WhatsApp: "${message}"`);
    console.log("WhatsApp message sent successfully!");
  }

  getType(): string {
    return "WhatsApp";
  }
}

// STEP 3: Factory
class NotificationFactory {
  // Factory Method
  static createNotification(type: string): Notification {
    switch (type.toUpperCase()) {
      case "EMAIL":
        return new EmailNotification();
      
      case "SMS":
        return new SMSNotification();
      
      case "PUSH":
        return new PushNotification();
      
      case "WHATSAPP":
        return new WhatsAppNotification();
      
      default:
        throw new Error(`Unknown notification type: ${type}`);
    }
  }
}

// STEP 4: Client Code
console.log("\n--- Scenario 1: Send Email ---");
const emailNotif = NotificationFactory.createNotification("EMAIL");
emailNotif.send("Your order has been confirmed!");

console.log("\n--- Scenario 2: Send SMS ---");
const smsNotif = NotificationFactory.createNotification("SMS");
smsNotif.send("Your OTP is 123456");

console.log("\n--- Scenario 3: Send Push Notification ---");
const pushNotif = NotificationFactory.createNotification("PUSH");
pushNotif.send("New message from John");

console.log("\n--- Scenario 4: Send WhatsApp ---");
const whatsappNotif = NotificationFactory.createNotification("WHATSAPP");
whatsappNotif.send("Meeting starts in 10 minutes");

/*
WITHOUT FACTORY PATTERN (Bad):

function sendNotification(type: string, message: string) {
  if (type === "EMAIL") {
    const notif = new EmailNotification();  // ❌ Client knows EmailNotification
    notif.send(message);
  } else if (type === "SMS") {
    const notif = new SMSNotification();    // ❌ Client knows SMSNotification
    notif.send(message);
  } else if (type === "PUSH") {
    const notif = new PushNotification();   // ❌ Client knows PushNotification
  }
  // ❌ Adding WhatsApp requires modifying this function
  // ❌ Creation logic scattered across codebase
  // ❌ Violates Open/Closed Principle
}
*/