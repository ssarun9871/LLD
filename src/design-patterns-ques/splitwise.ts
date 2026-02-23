class BalanceSheet {
    private owner: User;

    // Key: userId, Value: amount
    private balancesheet: Map<string, number> = new Map();

    constructor(owner: User) {
        this.owner = owner;
    }

    public adjustBalance(otherUserId: string, amount: number) {
        const currentBalance = this.balancesheet.get(otherUserId) || 0;
        this.balancesheet.set(otherUserId, currentBalance + amount);
    }

    public getBalances(): Map<string, number> {
        return this.balancesheet;
    }
}

class User {
    private userId: string;
    private username: string;
    private balanceSheet: BalanceSheet;

    constructor(username: string) {
        this.userId = crypto.randomUUID();
        this.username = username;
        this.balanceSheet = new BalanceSheet(this);
    }

    getUserId(): string {
        return this.userId;
    }

    getUsername(): string {
        return this.username;
    }

    getBalanceSheet(): BalanceSheet {
        return this.balanceSheet;
    }
}

class Group {
    private groupName: string;
    private users: User[] = [];

    constructor(groupName: string, users: User[]) {
        this.groupName = groupName;
        this.users = users;
    }

    getGroupName(): string {
        return this.groupName;
    }

    getGroupParticipants(): User[] {
        return this.users;
    }
}

enum splitType {
    EQUAL = 'EQUAL',
    PERCENTAGE = 'PERCENTAGE'
}

class Expense {
    private description: string;
    private payer: User;
    private amount: number;
    private splitType: splitType;
    private participants: User[] = [];

    constructor(description: string, payer: User, amount: number, splitType: splitType, participants: User[]) {
        this.description = description;
        this.payer = payer;
        this.amount = amount;
        this.splitType = splitType;
        this.participants = participants;
    }

    getPayer(): User { return this.payer; }
    getAmount(): number { return this.amount; }
    getParticipants(): User[] { return this.participants; }
}

interface SplitStrategy {
    calculateSplit(amount: number, participantCount: number): number;
}

class EqualSplit implements SplitStrategy {
    calculateSplit(amount: number, participantCount: number): number {
        if (participantCount === 0) return 0;
        return amount / participantCount;
    }
}

class Splitwise {
    public Users: User[] = [];
    public Groups: Group[] = [];
    private equalSplitStrategy = new EqualSplit();

    findByUserId(userId: string): User | undefined {
        return this.Users.find(user => user.getUserId() === userId);
    }

    findByUsername(username: string): User | undefined {
        if (!username || username.trim() == "") {
            throw new Error("please provide the username!");
        }
        return this.Users.find(user => user.getUsername() === username);
    }

    createUser(username: string): User {
        const user = new User(username);
        this.Users.push(user);
        return user;
    }

    createGroup(groupName: string, participants: User[]) {
        const group = new Group(groupName, participants);
        this.Groups.push(group);
    }

    addExpense(description: string, payerId: string, amount: number, participantsIds: string[]): void {
        const payer = this.findByUserId(payerId);
        if (!payer) throw new Error("Payer not found");

        const participants: User[] = [];
        for (const id of participantsIds) {
            const user = this.findByUserId(id);
            if (user) participants.push(user);
        }

        const splitAmount = this.equalSplitStrategy.calculateSplit(amount, participants.length);

        for (const participant of participants) {
            if (participant.getUserId() !== payer.getUserId()) {
                // Payer is owed money by this participant
                payer.getBalanceSheet().adjustBalance(participant.getUserId(), splitAmount);
                // Participant owes money to the payer
                participant.getBalanceSheet().adjustBalance(payer.getUserId(), -splitAmount);
            }
        }
    }

    showBalance(userId: string): void {
        const user = this.findByUserId(userId);
        if (!user) throw new Error("User not found");

        const balances = user.getBalanceSheet().getBalances();
        console.log(`\nBalance Sheet for ${user.getUsername()} (ID: ${userId}):`);
        
        if (balances.size === 0) {
            console.log("No balances found.");
            return;
        }

        balances.forEach((amount, otherUserId) => {
            const otherUser = this.findByUserId(otherUserId);
            const otherUsername = otherUser ? otherUser.getUsername() : "Unknown";

            if (amount > 0) {
                console.log(`- ${otherUsername} owes you ${amount.toFixed(2)}`);
            } else if (amount < 0) {
                console.log(`- You owe ${otherUsername} ${Math.abs(amount).toFixed(2)}`);
            } else {
                console.log(`- Settled up with ${otherUsername}`);
            }
        });
    }
}

// --- Test Implementation ---
const app = new Splitwise();

const user1 = app.createUser("Arun");
const user2 = app.createUser("Bob");
const user3 = app.createUser("Charlie");

// Arun pays 300 for dinner with Bob and Charlie (100 each)
app.addExpense("Dinner", user1.getUserId(), 300, [user1.getUserId(), user2.getUserId(), user3.getUserId()]);

app.showBalance(user1.getUserId());
app.showBalance(user2.getUserId());
app.showBalance(user3.getUserId());
