interface LightState {
  turnOn(): void;
  turnOff(): void;
  motionDetected(): void;
  adjustBrightness(isDaytime: boolean): void;
}

class OffState implements LightState {
  constructor(private light: SmartLight) {}

  turnOn(): void {
    console.log("Light turned ON manually.");
    this.light.setState(this.light.onState);
  }

  turnOff(): void {
    console.log("Light is already OFF.");
  }

  motionDetected(): void {
    console.log("Motion detected! Turning light ON.");
    this.light.setState(this.light.motionDetectionState);
  }

  adjustBrightness(isDaytime: boolean): void {
    console.log("Light is OFF. Cannot adjust brightness.");
  }
}

class OnState implements LightState {
  constructor(private light: SmartLight) {}

  turnOn(): void {
    console.log("Light is already ON.");
  }

  turnOff(): void {
    console.log("Turning light OFF.");
    this.light.setState(this.light.offState);
  }

  motionDetected(): void {
    console.log("Motion detected, but light is already ON.");
  }

  adjustBrightness(isDaytime: boolean): void {
    console.log(
      `Adjusting brightness manually. ${isDaytime ? "Dimmer for daytime" : "Brighter for night"}`
    );
    this.light.setState(this.light.brightnessAdjustmentState);
  }
}

class MotionDetectionState implements LightState {
  constructor(private light: SmartLight) {}

  turnOn(): void {
    console.log("Light is already ON due to motion.");
  }

  turnOff(): void {
    console.log("Turning light OFF.");
    this.light.setState(this.light.offState);
  }

  motionDetected(): void {
    console.log("Motion detected again. Light stays ON.");
  }

  adjustBrightness(isDaytime: boolean): void {
    console.log(
      `Adjusting brightness based on motion. ${isDaytime ? "Dimmer for daytime" : "Brighter for night"}`
    );
    this.light.setState(this.light.brightnessAdjustmentState);
  }
}

class BrightnessAdjustmentState implements LightState {
  constructor(private light: SmartLight) {}

  turnOn(): void {
    console.log("Light is already ON with brightness adjusted.");
  }

  turnOff(): void {
    console.log("Turning light OFF from brightness adjustment state.");
    this.light.setState(this.light.offState);
  }

  motionDetected(): void {
    console.log("Motion detected, light already ON with brightness adjusted.");
  }

  adjustBrightness(isDaytime: boolean): void {
    console.log(
      `Adjusting brightness. ${isDaytime ? "Dimmer for daytime" : "Brighter for night"}`
    );
  }
}

class SmartLight {
  offState: LightState;
  onState: LightState;
  motionDetectionState: LightState;
  brightnessAdjustmentState: LightState;

  currentState: LightState;

  constructor() {
    this.offState = new OffState(this);
    this.onState = new OnState(this);
    this.motionDetectionState = new MotionDetectionState(this);
    this.brightnessAdjustmentState = new BrightnessAdjustmentState(this);

    this.currentState = this.offState;
  }

  setState(state: LightState) {
    this.currentState = state;
  }

  turnOn() {
    this.currentState.turnOn();
  }

  turnOff() {
    this.currentState.turnOff();
  }

  motionDetected() {
    this.currentState.motionDetected();
  }

  adjustBrightness(isDaytime: boolean) {
    this.currentState.adjustBrightness(isDaytime);
  }
}

const smartLight = new SmartLight();

smartLight.turnOn();                
smartLight.adjustBrightness(true);  
smartLight.turnOff();               
smartLight.motionDetected();         
smartLight.adjustBrightness(false);
smartLight.turnOff();                
