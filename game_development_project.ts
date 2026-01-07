class GameCharacter {
  name: string;
  level: number;
  weapon: string;

  constructor(name: string, level: number, weapon: string) {
    this.name = name;
    this.level = level;
    this.weapon = weapon;
  }

  clone(): GameCharacter {
    return new GameCharacter(this.name, this.level, this.weapon);
  }
}

function main() {
  const originalCharacter = new GameCharacter("Warrior", 10, "Sword");

  const clonedCharacter = originalCharacter.clone();
  clonedCharacter.name = "Warrior Clone";

  console.log("Original Character:", originalCharacter);
  console.log("Cloned Character:", clonedCharacter);
}

main();
