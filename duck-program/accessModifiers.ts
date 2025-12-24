class User {
  public name: string;
  private orgCode: string = "DuckCorp";
  protected role: string;

  constructor(name: string, role: string) {
    this.name = name;
    this.role = role;
  }

  introduce(): void {
    console.log(`I am ${this.name} from ${this.orgCode}`);
  }
}

class Manager extends User {
  constructor(name: string) {
    super(name, "Manager");
  }

  getRole(): void {
    console.log(this.role);
  }
}

const user = new User("Daffy", "Employee");
user.introduce();

const manager = new Manager("Donald");
manager.getRole();

// ❌ Compile Error (as expected)
// console.log(user.orgCode);
