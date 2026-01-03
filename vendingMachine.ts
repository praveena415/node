class IdleState {
  constructor(machine) {
    this.machine = machine;
  }

  insertCoin() {
    console.log("Coin inserted. Moving to Processing state.");
    this.machine.setState(this.machine.processingState);
  }

  selectItem() {
    console.log("Please insert a coin first.");
  }

  dispense() {
    console.log("Nothing to dispense.");
  }
}

class ProcessingState {
  constructor(machine) {
    this.machine = machine;
  }

  insertCoin() {
    console.log("Coin already inserted.");
  }

  selectItem() {
    console.log("Item selected. Moving to Dispensing state.");
    this.machine.setState(this.machine.dispensingState);
  }

  dispense() {
    console.log("Please select an item first.");
  }
}

class DispensingState {
  constructor(machine) {
    this.machine = machine;
  }

  insertCoin() {
    console.log("Dispensing in progress. Please wait.");
  }

  selectItem() {
    console.log("Already dispensing.");
  }

  dispense() {
    console.log("Item dispensed. Returning to Idle state.");
    this.machine.setState(this.machine.idleState);
  }
}

class VendingMachine {
  constructor() {
    this.idleState = new IdleState(this);
    this.processingState = new ProcessingState(this);
    this.dispensingState = new DispensingState(this);

    this.currentState = this.idleState;
  }

  setState(state) {
    this.currentState = state;
  }

  insertCoin() {
    this.currentState.insertCoin();
  }

  selectItem() {
    this.currentState.selectItem();
  }

  dispense() {
    this.currentState.dispense();
  }
}


const vendingMachine = new VendingMachine();

vendingMachine.insertCoin();   
vendingMachine.selectItem();  
vendingMachine.dispense();    
