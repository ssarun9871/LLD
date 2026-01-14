/*
State Pattern is a behavioral design pattern that allows an object to change 
its behavior when its internal state changes. The object appears to change its class.

Core Concept:
Instead of if/else checking state, delegate behavior to state objects. Each state 
knows how to handle actions and transitions.

The Three Components:
1. State Interface - Defines methods all states must implement
2. Concrete States - Implement specific behavior for each state
3. Context - Maintains current state and delegates to it

When and Where to Use State Pattern:
1. Object Behavior Changes Based on Internal State
   Ex - Music player behaves differently if it's already playing or stopped.

2. Large If/Else or Switch Based on State
   Ex - Checking 'if (isPlaying)' in every button click method.

3. State Transitions Are Complex
   Ex - You shouldn't be able to 'Pause' if the player is 'Stopped'.

4. Adding New States Breaks Existing Code
   Ex - Adding a 'Buffering' state would require changing every if/else block.

5. Clear, Distinct States with Different Behaviors
   Ex - Playing (streaming data), Paused (holding buffer), Stopped (clearing memory).

Examples:
Vending Machine - NoCoin, HasCoin, Dispensing, SoldOut
Order - Pending, Processing, Shipped, Delivered
Document - Draft, UnderReview, Approved, Published
Media Player - Playing, Paused, Stopped
Traffic Light - Red, Yellow, Green
ATM - Idle, CardInserted, PinEntered
Game Character - Idle, Walking, Running, Jumping
*/

// STEP 1: State Interface
interface PlayerState {
    pressPlay(player: MusicPlayer): void;
    pressPause(player: MusicPlayer): void;
    pressStop(player: MusicPlayer): void;
}

// STEP 2: Concrete States
class StoppedState implements PlayerState {
    pressPlay(player: MusicPlayer): void {
        console.log("Starting music from the beginning...");
        player.setState(player.getPlayingState());
    }

    pressPause(player: MusicPlayer): void {
        console.log("Cannot pause. The player is currently stopped.");
    }

    pressStop(player: MusicPlayer): void {
        console.log("Already stopped.");
    }
}

class PlayingState implements PlayerState {
    pressPlay(player: MusicPlayer): void {
        console.log("Already playing music.");
    }

    pressPause(player: MusicPlayer): void {
        console.log("Music paused.");
        player.setState(player.getPausedState());
    }

    pressStop(player: MusicPlayer): void {
        console.log("Stopping music and resetting track.");
        player.setState(player.getStoppedState());
    }
}

class PausedState implements PlayerState {
    pressPlay(player: MusicPlayer): void {
        console.log("Resuming music...");
        player.setState(player.getPlayingState());
    }

    pressPause(player: MusicPlayer): void {
        console.log("Already paused.");
    }

    pressStop(player: MusicPlayer): void {
        console.log("Stopping music and resetting track.");
        player.setState(player.getStoppedState());
    }
}

// STEP 3: Context
class MusicPlayer {
    private stoppedState: PlayerState;
    private playingState: PlayerState;
    private pausedState: PlayerState;

    private currentState: PlayerState;

    constructor() {
        this.stoppedState = new StoppedState();
        this.playingState = new PlayingState();
        this.pausedState = new PausedState();

        // Initial state
        this.currentState = this.stoppedState;
    }

    // Delegate to current state
    pressPlay(): void {
        this.currentState.pressPlay(this);
    }

    pressPause(): void {
        this.currentState.pressPause(this);
    }

    pressStop(): void {
        this.currentState.pressStop(this);
    }

    setState(state: PlayerState): void {
        this.currentState = state;
    }

    // Getters for states
    getStoppedState(): PlayerState { return this.stoppedState; }
    getPlayingState(): PlayerState { return this.playingState; }
    getPausedState(): PlayerState { return this.pausedState; }
}

// STEP 4: Client Code
const myPlayer = new MusicPlayer();

console.log("\n--- Scenario 1: Start Playing ---");
myPlayer.pressPlay();  // Starts

console.log("\n--- Scenario 2: Pause and Resume ---");
myPlayer.pressPause(); // Pauses
myPlayer.pressPlay();  // Resumes

console.log("\n--- Scenario 3: Stop and Try to Pause ---");
myPlayer.pressStop();  // Stops
myPlayer.pressPause(); // Fails: Cannot pause while stopped