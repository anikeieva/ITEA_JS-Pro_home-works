/*

  Задание - используя классы и (или) прототипы создать программу, которая будет
  распределять животных по зоопарку.

  Zoo ={
    name: '',
    AnimalCount: 152,
    zones: {
      mammals: [],
      birds: [],
      fishes: [],
      reptile: [],
      others: []
    },
    addAnimal: function(animalObj){
      // Добавляет животное в зоопарк в нужную зону.
      // зона берется из класса который наследует Animal
      // если у животного нету свойства zone - то добавлять в others
    },
    removeAnimal: function('animalName'){
      // удаляет животное из зоопарка
      // поиск по имени
    },
    getAnimal: function(type, value){
      // выводит информацию о животном
      // поиск по имени или типу где type = name/type
      // а value значение выбраного типа поиска
    },
    countAnimals: function(){
      // функция считает кол-во всех животных во всех зонах
      // и выводит в консоль результат
    }
  }

  Есть родительский класс Animal у которого есть методы и свойства:
  Animal {
    name: 'Rex', // имя животного для поиска
    phrase: 'woof!',
    foodType: 'herbivore' | 'carnivore', // Травоядное или Плотоядное животное
    eatSomething: function(){ ... }
  }

  Дальше будут классы, которые расширяют класс Animal - это классы:
  - mammals
  - birds
  - fishes
  - pertile

  каждый из них имеет свои свойства и методы:
  в данном примере уникальными будут run/speed. У птиц будут методы fly & speed и т.д
  Mammals = {
    zone: mamal, // дублирует название зоны, ставиться по умолчанию
    type: 'wolf', // что за животное
    run: function(){
      console.log( wolf Rex run with speed 15 km/h );
    },
    speed: 15
  }

  Тестирование:
    new Zoo('name');
    var Rex = new Mammal('Rex', 'woof', 'herbivore', 15 );
    your_zooName.addAnimal(Rex);
      // Добавит в your_zooName.zones.mamals новое животное.
    var Dex = new Mammal('Dex', 'woof', 'herbivore', 11 );
    your_zooName.addAnimal(Dex);
      // Добавит в your_zooName.zones.mamals еще одно новое животное.

    your_zooName.get('name', 'Rex'); -> {name:"Rex", type: 'wolf' ...}
    your_zooName.get('type', 'wolf'); -> [{RexObj},{DexObj}];

    Программу можно расширить и сделать в виде мини игры с интерфейсом и сдать
    как курсовую работу!
    Идеи:
    - Добавить ранжирование на травоядных и хищников
    - добавив какую-то функцию которая иммитирует жизнь в зоопарке. Питание, движение, сон животных и т.д
    - Условия: Если хищник и травоядный попадает в одну зону, то хищник сьедает травоядное и оно удаляется из зоопарка.
    - Графическая оболочка под программу.
*/

let content = document.querySelector('#content');
let message = document.querySelector('.message');

class Animal {
  constructor(name, phrase, foodType, type, speed) {
    this.name = name;
    this.phrase = phrase;
    this.foodType = foodType;
    // 'herbivore' | 'carnivore' Травоядное или Плотоядное животное
    this.type = type;
    this.speed = speed;
  }
  eatSomething() {
    this.foodType === 'carnivore'? console.log(`${this.name} eats other animal`) :
    console.log(`${this.name} eats grass`);
  }
}

class Mammals extends Animal {
  constructor(name, phrase, foodType, type, speed) {
    super(name, phrase, foodType, type, speed);
    this.zone = 'mammals';
  }
  run() {
    console.log(`${this.type} ${this.name} run with speed ${this.speed} km/h`);
  }
}

class Birds extends Animal {
  constructor(name, phrase, foodType, type, speed) {
    super(name, phrase, foodType, type, speed);
    this.zone = 'birds';
  }
  fly() {
    console.log(`${this.type} ${this.name} fly with speed ${this.speed} km/h`);
  }
}

class Fishes extends Animal {
  constructor(name, phrase, foodType, type, speed) {
    super(name, phrase, foodType, type, speed);
    this.zone = 'fishes';
  }
  swim() {
    console.log(`${this.type} ${this.name} swim with speed ${this.speed} km/h`);
  }
}

class Reptiles extends Animal {
  constructor(name, phrase, foodType, type, speed) {
    super(name, phrase, foodType, type, speed);
    this.zone = 'reptiles';
  }
  crawl() {
    console.log(`${this.type} ${this.name} crawl with speed ${this.speed} km/h`);
  }
}

let rex = new Mammals('Rex', 'woof', 'carnivore', 'wolf', 15 );
rex.eatSomething();
rex.run();

let owee = new Birds('Owee', 'wow', 'carnivore', 'owl', 25 );
owee.eatSomething();
owee.fly();

let bubbles = new Fishes('Bubbles', '---', 'carnivore', 'cherry barbs', 30 );
bubbles.eatSomething();
bubbles.swim();

let greeny = new Reptiles('Greeny', '---', 'herbivore', 'iguana', 2 );
greeny.eatSomething();
greeny.crawl();

let shally = new Animal('Shally', 'woof', 'carnivore', 'dog', 30);
let cody = new Mammals('Coddy', 'woof', 'carnivore', 'wolf', 20 );


class Zoo {
  constructor(name) {
    this.name = name;
    this.animalCount;
    this.zones = {
      'mammals': [],
      'birds': [],
      'fishes': [],
      'reptiles': [],
      'others': []
    };
  }
  addAnimal(arrayOfAnimalObj) {
    arrayOfAnimalObj.forEach(item => {
      if(item.zone) {
        this.zones[item.zone].push(item);
      }
      else {
        this.zones['others'].push(item);
      }
    });
  }
  removeAnimal(arrayOfAnimalName) {
    for(let prop in this.zones) {
      this.zones[prop].forEach((animalObj, indexAnimalObj, arrayOfAnimalObj) => {
        arrayOfAnimalName.forEach(searchName => {
          if(animalObj.name === searchName) {
            arrayOfAnimalObj.splice(indexAnimalObj, 1);
          }
        });
      });
    }
  }
  getAnimal(type, value) {
    let textArray = [];
    let text;
    for(let prop in this.zones) {
      this.zones[prop].forEach((animalObj, indexAnimalObj, arrayOfAnimalObj) => {
          if(type === 'name' && animalObj.name === value || type === 'type' && animalObj.type === value) {
            textArray.push(messageInfo(animalObj, this));
          }
      });
    }
    text = textArray.join('');
    message.insertAdjacentHTML('beforeEnd', text);
  }
  countAnimals() {
    this.animalCount = 0;
    for(let prop in this.zones) {
      this.animalCount += this.zones[prop].length;
    }
    console.log(this.animalCount);
  }
}

function messageInfo(obj, zoo) {
  let text = `<ul class="messageInfo">${obj.type} ${obj.name} (Zoo "${zoo.name}"):`;
  for(let prop in obj) {
    if(prop === 'speed') {
      text += `<li>${prop}: ${obj[prop]} km/h;</li>`;
    }
    else {
      text += `<li>${prop}: ${obj[prop]};</li>`;
    }
  }
  text += `</ul>`;
  return text;
}

let zoo = new Zoo("Animal\'s land");
zoo.addAnimal([rex, owee, bubbles, greeny, shally, cody]);
console.log(zoo);
zoo.removeAnimal(['Owee', 'Shally']);
console.log(zoo);
// zoo.getAnimal('name', 'Greeny');
zoo.getAnimal('type', 'wolf');
zoo.countAnimals();
