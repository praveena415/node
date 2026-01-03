class RedState {
  constructor(trafficLight) {
    this.trafficLight = trafficLight;
  }

  show() {
    console.log("RED Light → Vehicles must STOP");
  }

  next() {
    this.trafficLight.setState(this.trafficLight.greenState);
  }
}

class GreenState {
  constructor(trafficLight) {
    this.trafficLight = trafficLight;
  }

  show() {
    console.log("GREEN Light → Vehicles can MOVE");
  }

  next() {
    this.trafficLight.setState(this.trafficLight.yellowState);
  }
}

class YellowState {
  constructor(trafficLight) {
    this.trafficLight = trafficLight;
  }

  show() {
    console.log("YELLOW Light → Vehicles should SLOW DOWN");
  }

  next() {
    this.trafficLight.setState(this.trafficLight.redState);
  }
}

class TrafficLight {
  constructor() {
    this.redState = new RedState(this);
    this.greenState = new GreenState(this);
    this.yellowState = new YellowState(this);
    this.currentState = this.redState;
  }

  setState(state) {
    this.currentState = state;
  }

  show() {
    this.currentState.show();
  }

  next() {
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
