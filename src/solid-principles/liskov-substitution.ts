// class Bird {
//     fly(): void {
//         console.log("Flying...");
//     }
// }

// class Penguin extends Bird {
//     fly(): void {
//         throw new Error("Penguins can't fly!");
//     }
// }

// // This function expects all birds to fly
// function makeBirdFly(bird: Bird): void {
//     bird.fly();  // Crashes if it's a Penguin!
// }

// const bird = new Bird();
// const penguin = new Penguin();
// makeBirdFly(bird);// Flying...
// makeBirdFly(penguin);// throw error

// GOOD - Respects LSP
class Bird {
    eat(): void {
        console.log("Eating...");
    }
}

class FlyingBird extends Bird {
    fly(): void {
        console.log("Flying...");
    }
}

class Penguin extends Bird {
    swim(): void {
        console.log("Swimming...");
    }
}

class Sparrow extends FlyingBird {
    fly(): void {
        console.log("Sparrow flying high!");
    }
}

// Now this function only accepts birds that can actually fly
function makeBirdFly(bird: FlyingBird): void {
    bird.fly();  // Safe! Only flying birds accepted
}

const penguin = new Penguin();
const sparrow = new Sparrow();

makeBirdFly(penguin)// Error because Penguin is NOT a FlyingBird and also it doesn't have 'fly' property
makeBirdFly(sparrow);