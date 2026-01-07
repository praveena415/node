class Pizza {
  size: "small" | "medium" | "large";
  cheese: boolean;
  pepperoni: boolean;
  mushrooms: boolean;

  constructor(
    size: "small" | "medium" | "large",
    cheese: boolean,
    pepperoni: boolean,
    mushrooms: boolean
  ) {
    this.size = size;
    this.cheese = cheese;
    this.pepperoni = pepperoni;
    this.mushrooms = mushrooms;
  }

  getDetails(): string {
    return `
Pizza Size: ${this.size}
Cheese: ${this.cheese}
Pepperoni: ${this.pepperoni}
Mushrooms: ${this.mushrooms}
`;
  }
}

class PizzaBuilder {
  private size: "small" | "medium" | "large" = "medium";
  private cheese = false;
  private pepperoni = false;
  private mushrooms = false;

  setSize(size: "small" | "medium" | "large"): PizzaBuilder {
    this.size = size;
    return this;
  }

  addCheese(): PizzaBuilder {
    this.cheese = true;
    return this;
  }

  addPepperoni(): PizzaBuilder {
    this.pepperoni = true;
    return this;
  }

  addMushrooms(): PizzaBuilder {
    this.mushrooms = true;
    return this;
  }

  build(): Pizza {
    return new Pizza(
      this.size,
      this.cheese,
      this.pepperoni,
      this.mushrooms
    );
  }
}

function main() {
  const pizza = new PizzaBuilder()
    .setSize("large")
    .addCheese()
    .addMushrooms()
    .build();

  console.log(pizza.getDetails());
}

main();
