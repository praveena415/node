interface FlyableBird {
  fly(): void;
}

class Sparrow implements FlyableBird {
  fly(): void {
    console.log("Flying...");
  }
}

class Ostrich {
  walk(): void {
    console.log("Running on the ground...");
  }
}

const sparrow = new Sparrow();
sparrow.fly(); 

const ostrich = new Ostrich();
ostrich.walk(); 
