interface TrafficLightState {
  show(): void;
  next(): void;
}

class RedState implements TrafficLightState {
  constructor(private trafficLight: TrafficLight) {}

  show(): void {
    console.log("RED Light → Vehicles must STOP");
  }

  next(): void {
    this.trafficLight.setState(this.trafficLight.greenState);
  }
}

class GreenState implements TrafficLightState {
  constructor(private trafficLight: TrafficLight) {}

  show(): void {
    console.log("GREEN Light → Vehicles can MOVE");
  }

  next(): void {
    this.trafficLight.setState(this.trafficLight.yellowState);
  }
}

class YellowState implements TrafficLightState {
  constructor(private trafficLight: TrafficLight) {}

  show(): void {
    console.log("YELLOW Light → Vehicles should SLOW DOWN");
  }

  next(): void {
    this.trafficLight.setState(this.trafficLight.redState);
  }
}

class TrafficLight {
  redState: TrafficLightState;
  greenState: TrafficLightState;
  yellowState: TrafficLightState;
  currentState: TrafficLightState;

  constructor() {
    this.redState = new RedState(this);
    this.greenState = new GreenState(this);
    this.yellowState = new YellowState(this);
    this.currentState = this.redState;
  }

  setState(state: TrafficLightState): void {
    this.currentState = state;
  }

  show(): void {
    this.currentState.show();
  }

  next(): void {
    this.currentState.next();
  }
}

const trafficLight = new TrafficLight();

trafficLight.show();
trafficLight.next();

trafficLight.show();
trafficLight.next();

trafficLight.show();
trafficLight.next();

trafficLight.show();
