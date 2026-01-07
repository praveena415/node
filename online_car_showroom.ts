class Car {
  brand: string;
  engine: string;
  color: string;
  sunroof: boolean;
  automaticTransmission: boolean;

  constructor(
    brand: string,
    engine: string,
    color: string,
    sunroof: boolean,
    automaticTransmission: boolean
  ) {
    this.brand = brand;
    this.engine = engine;
    this.color = color;
    this.sunroof = sunroof;
    this.automaticTransmission = automaticTransmission;
  }

  getDetails(): string {
    return `
Brand: ${this.brand}
Engine: ${this.engine}
Color: ${this.color}
Sunroof: ${this.sunroof}
Automatic Transmission: ${this.automaticTransmission}
`;
  }
}

class CarBuilder {
  private brand = "";
  private engine = "";
  private color = "";
  private sunroof = false;
  private automaticTransmission = false;

  setBrand(brand: string): CarBuilder {
    this.brand = brand;
    return this;
  }

  setEngine(engine: string): CarBuilder {
    this.engine = engine;
    return this;
  }

  setColor(color: string): CarBuilder {
    this.color = color;
    return this;
  }

  addSunroof(): CarBuilder {
    this.sunroof = true;
    return this;
  }

  addAutomaticTransmission(): CarBuilder {
    this.automaticTransmission = true;
    return this;
  }

  build(): Car {
    return new Car(
      this.brand,
      this.engine,
      this.color,
      this.sunroof,
      this.automaticTransmission
    );
  }
}

function main() {
  const car = new CarBuilder()
    .setBrand("Tesla Model S")
    .setEngine("Electric")
    .setColor("Black")
    .addSunroof()
    .addAutomaticTransmission()
    .build();

  console.log(car.getDetails());
}

main();
