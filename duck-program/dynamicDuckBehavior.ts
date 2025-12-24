interface FlyStrategyy {
  fly(): void;
}

class FastFly implements FlyStrategyy {
  fly(): void {
    console.log("Flying fast like a rocket!");
  }
}

class NoFly implements FlyStrategyy {
  fly(): void {
    console.log("I cannot fly");
  }
}

class Duck {
  private flyStrategy: FlyStrategyy;

  constructor(flyStrategy: FlyStrategyy) {
    this.flyStrategy = flyStrategy;
  }

  performFly(): void {
    this.flyStrategy.fly();
  }

  setFlyStrategy(strategy: FlyStrategyy): void {
    this.flyStrategy = strategy;
  }
}

const duck = new Duck(new FastFly());
duck.performFly();

duck.setFlyStrategy(new NoFly());
duck.performFly();
