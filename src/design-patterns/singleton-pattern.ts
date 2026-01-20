/* 
Singleton Pattern is a creational design pattern that ensures a class has only one instance and 
provides a global point of access to it.

Core Concept: Restricting instantiation of a class to a single "shared" instance. 
This is achieved by making the constructor private and providing a static method.

The Three Components:
1. Private Constructor - Prevents creating new instances via 'new' from outside.
2. Private Static Instance - A static property that holds the single instance.
3. Public Static Method - The "Gatekeeper" that creates or returns the instance.

When and Where to Use Singleton Pattern:
1. Managing Shared Resources Ex - Database connection pools or File System access.
2. Global State Management Ex - User authentication state or a central configuration object.
3. Logging Ex - A centralized logger that collects logs from all modules.
4. Performance (Expensive Objects) Ex - Objects that take a lot of memory or time to initialize.
*/

// STEP 1: The Singleton Class
class DatabaseConnection {
    private static instance: DatabaseConnection | null = null;
    private connectionId: number;

    private constructor() {
        this.connectionId = Math.floor(Math.random() * 1000);
        console.log(`Database Instance Created. ID: ${this.connectionId}`);
    }

    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    // Business Logic Methods
    public runQuery(sql: string): void {
        console.log(`[ID: ${this.connectionId}] Executing: ${sql}`);
    }
}

// STEP 2: Client Code
console.log("\n--- Scenario 1: First call to Database ---");
const db1 = DatabaseConnection.getInstance();
db1.runQuery("SELECT * FROM users");