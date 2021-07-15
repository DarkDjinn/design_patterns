class Event {
  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler) {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubscribe(idx) {
    this.handlers.delete(idx);
  }

  fire(sender, args) {
    this.handlers.forEach((v, k) => {
      v(sender, args);
    })
  }
}

let WhatToQuery = Object.freeze({
  attack: 1,
  defence: 2
})

class Query {
  constructor(creatureName, whatToQuery, value) {
    this.creatureName = creatureName;
    this.whatToQuery = whatToQuery;
    this.value = value;
  }
}

class Game {
  constructor() {
    this.queries = new Event();
  }

  performQuery(sender, query) {
    this.queries.fire(sender, query);
  }
}

class Creature {
  constructor(game, name, attack, defence) {
    this.game = game;
    this.name = name;
    this.initial_attack = attack;
    this.initial_defence = defence;
  }

  get attack() {
    let q = new Query(this.name, WhatToQuery.attack, this.initial_attack);
    this.game.performQuery(this, q);
    return q.value;
  }

  get defence() {
    let q = new Query(this.name, WhatToQuery.defence, this.initial_defence);
    this.game.performQuery(this, q);
    return q.value;
  }

  toString() {
    return `${this.name} (${this.attack}/${this.defence})`
  }
}

class CreatureModifier {
  constructor(game, creature) {
    this.game = game;
    this.creature = creature;
    this.token = game.queries.subscribe(
      this.handle.bind(this)
    )
  }

  handle(sender, query) {
    // in inheritors
  }

  dispose() {
    this.game.queries.unsubscribe(this.token);
  }
}

class DoubleAttackModifier extends CreatureModifier {
  constructor(game, creature) {
    super(game, creature)
  }

  handle(sender, query) {
    if (query.creatureName === this.creature.name && query.whatToQuery === WhatToQuery.attack) {
      query.value *= 2;
    }
  }
}

class IncreaseDefenceModifier extends CreatureModifier {
  constructor(game, creature) {
    super(game, creature)
  }

  handle(sender, query) {
    if (query.creatureName === this.creature.name && query.whatToQuery === WhatToQuery.defence) {
      query.value++;
    }
  }
}

let game = new Game();
let goblin = new Creature(game, 'Strong Goblin', 2, 2)
console.log(goblin.toString())

let dam = new DoubleAttackModifier(game, goblin);
console.log(goblin.toString())

let idm = new IncreaseDefenceModifier(game, goblin);
console.log(goblin.toString())
idm.dispose();
dam.dispose()
console.log(goblin.toString())