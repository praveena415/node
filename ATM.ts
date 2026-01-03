interface ATMState {
  insertCard(): void;
  enterPin(pin: string): void;
  withdraw(amount: number): void;
  ejectCard(): void;
}

class IdleState implements ATMState {
  constructor(private atm: ATM) {}

  insertCard(): void {
    console.log("Card inserted. Please enter your PIN.");
    this.atm.setState(this.atm.cardInsertedState);
  }

  enterPin(pin: string): void {
    console.log("No card inserted.");
  }

  withdraw(amount: number): void {
    console.log("No card inserted.");
  }

  ejectCard(): void {
    console.log("No card to eject.");
  }
}

class CardInsertedState implements ATMState {
  constructor(private atm: ATM) {}

  insertCard(): void {
    console.log("Card already inserted.");
  }

  enterPin(pin: string): void {
    if (this.atm.verifyPin(pin)) {
      console.log("PIN correct. You are authenticated.");
      this.atm.setState(this.atm.authenticatedState);
    } else {
      console.log("Incorrect PIN. Try again.");
    }
  }

  withdraw(amount: number): void {
    console.log("Enter PIN first.");
  }

  ejectCard(): void {
    console.log("Card ejected. Returning to Idle state.");
    this.atm.setState(this.atm.idleState);
  }
}

class AuthenticatedState implements ATMState {
  constructor(private atm: ATM) {}

  insertCard(): void {
    console.log("Card already inserted.");
  }

  enterPin(pin: string): void {
    console.log("Already authenticated.");
  }

  withdraw(amount: number): void {
    if (this.atm.hasSufficientBalance(amount)) {
      console.log(`Dispensing $${amount}...`);
      this.atm.setState(this.atm.dispensingState);
      this.atm.dispenseCash(amount);
    } else {
      console.log("Insufficient balance.");
    }
  }

  ejectCard(): void {
    console.log("Card ejected. Returning to Idle state.");
    this.atm.setState(this.atm.idleState);
  }
}

class DispensingState implements ATMState {
  constructor(private atm: ATM) {}

  insertCard(): void {
    console.log("Please wait, dispensing cash.");
  }

  enterPin(pin: string): void {
    console.log("Please wait, dispensing cash.");
  }

  withdraw(amount: number): void {
    console.log("Already dispensing cash.");
  }

  ejectCard(): void {
    console.log("Cannot eject card while dispensing.");
  }
}

class ATM {
  idleState: ATMState;
  cardInsertedState: ATMState;
  authenticatedState: ATMState;
  dispensingState: ATMState;

  currentState: ATMState;
  private balance: number = 1000;
  private correctPin: string = "1234";

  constructor() {
    this.idleState = new IdleState(this);
    this.cardInsertedState = new CardInsertedState(this);
    this.authenticatedState = new AuthenticatedState(this);
    this.dispensingState = new DispensingState(this);

    this.currentState = this.idleState;
  }

  setState(state: ATMState) {
    this.currentState = state;
  }

  insertCard() {
    this.currentState.insertCard();
  }

  enterPin(pin: string) {
    this.currentState.enterPin(pin);
  }

  withdraw(amount: number) {
    this.currentState.withdraw(amount);
  }

  ejectCard() {
    this.currentState.ejectCard();
  }

  verifyPin(pin: string): boolean {
    return pin === this.correctPin;
  }

  hasSufficientBalance(amount: number): boolean {
    return this.balance >= amount;
  }

  dispenseCash(amount: number) {
    this.balance -= amount;
    console.log(`$${amount} dispensed. Remaining balance: $${this.balance}`);
    console.log("Transaction complete. Returning to Idle state.");
    this.setState(this.idleState);
  }
}

const atm = new ATM();

atm.insertCard();         
atm.enterPin("1234");      
atm.withdraw(200);         
atm.insertCard();          
atm.enterPin("0000");     
atm.enterPin("1234");
atm.withdraw(900);         
atm.ejectCard();           
