const getRandomPJ = function (source) {
  const randomNum = Math.floor(Math.random() * source.length);
  return { pj: source[randomNum], position: randomNum };
};

class Jedi {
  constructor(health, strength) {
    this.health = health;
    this.strength = strength;
  }
  attack() {
    return this.strength;
  }
  receiveDamage(theDamage) {
    this.health -= theDamage;
  }
}

class Sith extends Jedi {
  constructor(name, health, strength) {
    super(health, strength);
    this.name = name;
  }

  static receiveDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      return `${this.name} has died in combat`;
    }
    return `${this.name} has received ${damage} damage points`;
  }

  battleCry() {
    return `El lado oscuro manda`;
  }
}

class Imperial extends Jedi {
  receiveDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      return `An imperial has died in combat`;
    }
    return `An imperial has received ${damage} damage points`;
  }
}

class War {
  constructor() {
    this.sithArmy = [];
    this.imperialArmy = [];
  }

  addSith(sith) {
    this.sithArmy.push(sith);
  }

  addImperial(imperial) {
    this.imperialArmy.push(imperial);
  }

  sithAttack() {
    const imperial = getRandomPJ(this.imperialArmy);
    const sith = getRandomPJ(this.sithArmy);

    console.log({ imperial, sith });
    const log = imperial.pj.receiveDamage(sith.pj.attack());

    if (imperial.pj.health <= 0) {
      this.imperialArmy.splice(imperial.position, 1);
    }

    return log;
  }

  imperialAttack() {
    const imperial = getRandomPJ(this.imperialArmy);
    const sith = getRandomPJ(this.sithArmy);

    const log = sith.pj.receiveDamage(imperial.pj.attack());

    if (sith.pj.health <= 0) {
      this.sithArmy.splice(sith.position, 1);
    }

    return log;
  }

  showStatus() {
    if (this.sithArmy.length === 0) {
      return "Imperials have fought for their lives and survived another day...";
    } else if (this.imperialArmy.length === 0) {
      return "Siths have won the war of the century!";
    }
    return "Siths and Imperials are still in the thick of battle.";
  }
}

const war = new War();
war.addImperial(new Imperial(100, 10));
war.addImperial(new Imperial(100, 5));
war.addSith(new Sith("Sithcito", 100, 10));
war.addSith(new Sith("Sithcite", 100, 5));
