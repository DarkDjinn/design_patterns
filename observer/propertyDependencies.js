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

  // 1) who fired the event
  // 2) additional data (event args)
  fire(sender, args) {
    this.handlers.forEach((v, k) => v(sender, args))
  }
}

class PropertyChangedArgs {
  constructor(name, newValue) {
    this.name = name;
    this.newValue = newValue;
  }
}

class Person {
  constructor(age) {
    this._age = age;
    this.propertyChanged = new Event();
  }

  get age() { return this._age; }
  set age(value) {
    if (!value || this._age === value) return;

    let oldCanVote = this.canVote;

    this._age = value;
    this.propertyChanged.fire(this, new PropertyChangedArgs('age', value));

    if (oldCanVote !== this.canVote) {
      this.propertyChanged.fire(this, new PropertyChangedArgs('canVote', this.canVote));
    }
  }

  get canVote() {
    return this._age >= 16;
  }
}

class VotingChecker {
  constructor(person) {
    this.person = person;
    this.person.propertyChanged.subscribe(this.voting_changed.bind(this))
  }

  voting_changed(sender, args) {
    if (sender === this.person && args.name === 'canVote') {
      console.log(`Voting status changed to ${args.newValue}`)
    }
  }
}

let person = new Person('John');
let checker = new VotingChecker(person);
for (let i = 10; i < 20; i++) {
  console.log(`Changing age to ${i}`);
  person.age = i;
}