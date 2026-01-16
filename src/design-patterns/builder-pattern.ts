/*
Builder Pattern is a creational design pattern that lets you construct complex 
objects step by step.

Core Concept:
Instead of constructor with many parameters, use builder that sets properties
step by step with method chaining.

The Components:
1. Product - Complex object being built
2. Builder - Builds the product step by step
3. Director (optional) - Orchestrates building process

When and Where to Use Builder Pattern:
1. Object Has Many Parameters (5+)
   Ex - Computer with CPU, RAM, storage, GPU, WiFi, etc.

2. Creating Immutable Objects
   Ex - Configuration objects that shouldn't change

3. Step-by-Step Construction Makes Sense
   Ex - Building HTTP request, SQL query

4. Telescoping Constructor Problem
   Ex - Too many constructor overloads

5. Readable, Self-Documenting Code Needed
   Ex - Code should be clear about what's being built

Examples:
HTTP Request - URL, method, headers, body, timeout
Database Query - SELECT, WHERE, JOIN, ORDER BY
Email Builder - Subject, body, recipients, attachments
Computer - CPU, RAM, storage, GPU, peripherals
Pizza Order - Size, crust, toppings, extras
API Client - Base URL, auth, timeout, retries
*/

class User {
    name: string;
    age: number | undefined;
    phone: string | undefined;
    address: string | undefined;
    constructor(builder: UserBuilder) {
        // Required
        this.name = builder.name;

        // Optional
        this.age = builder.age;
        this.phone = builder.phone;
        this.address = builder.address;
    }
}

class UserBuilder {
    name: string;
    age?: number;
    phone?: string;
    address?: string;
    constructor(name: string) {
        this.name = name;
    }

    setAge(age: number): UserBuilder {
        this.age = age;
        return this; // Returning 'this' enables method chaining
    }

    setPhone(phone: string): UserBuilder {
        this.phone = phone;
        return this;
    }

    setAddress(address: string): UserBuilder {
        this.address = address;
        return this;
    }

    build(): User {
        if (!this.name || this.name.trim() === '') {
            throw new Error("Name is required!");
        }
        return new User(this);
    }
}

// --- Usage ---
const user = new UserBuilder('Alice')
    .setAge(28)
    .setAddress('123 Main St')
    .build();

console.log(user);