interface ShippingStrategy {
  calculate(): number;
}

class StandardShipping implements ShippingStrategy {
  calculate(): number {
    return 50;
  }
}

class ExpressShipping implements ShippingStrategy {
  calculate(): number {
    return 100;
  }
}

class Shipping {
  private strategy: ShippingStrategy;

  constructor(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }

  calculate(): number {
    return this.strategy.calculate();
  }
}

const standard = new Shipping(new StandardShipping());
console.log(standard.calculate());

const express = new Shipping(new ExpressShipping());
console.log(express.calculate());
