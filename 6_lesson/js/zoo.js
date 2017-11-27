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
    this.herbivoreArray = [];
    this.carnivoreArray = [];
    this.types = [];
    this.names = [];
    this.typesLowerCase = [];
    this.namesLowerCase = [];
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

    if (!type && value.toLowerCase().indexOf('herbivore') >= 0) {
      this.herbivoreArray.forEach(item => {
        textArray.push(messageInfo(item, this));
      });
    }
    else if (!type && value.toLowerCase().indexOf('carnivore') >= 0) {
      this.carnivoreArray.forEach(item => {
        textArray.push(messageInfo(item, this));
      });
    }
    else if(type) {
      for(let prop in this.zones) {
        this.zones[prop].forEach((animalObj, indexAnimalObj, arrayOfAnimalObj) => {
          if(type === 'name' && value.toLowerCase().indexOf(animalObj.name.toLowerCase()) >= 0 ||
          type === 'type' && value.toLowerCase().indexOf(animalObj.type.toLowerCase()) >= 0) {
              textArray.push(messageInfo(animalObj, this));
          }
        });
      }
    } else {
      text = `Error. This type, food type or name of animal is not correct! Enter again only name OR type!`;
    }

    searchResultOnPage(textArray, text, value, this);

  }
  countAnimals() {
    this.animalCount = 0;
    for(let prop in this.zones) {
      this.animalCount += this.zones[prop].length;
    }
    console.log(this.animalCount);
  }
  getTypesAndNames() {
    for(let prop in this.zones) {
      this.zones[prop].forEach(animalObj => {
          this.types.push(animalObj.type);
          this.names.push(animalObj.name);
          this.typesLowerCase.push(animalObj.type.toLowerCase());
          this.namesLowerCase.push(animalObj.name.toLowerCase());
      });
    }
  }
  rangingHerbivoreCarnivore() {
    for(let prop in this.zones) {
      this.zones[prop].forEach((animalObj, indexAnimalObj, arrayOfAnimalObj) => {
          if(animalObj.foodType === 'herbivore') {
            this.herbivoreArray.push(animalObj);
          }
          else if(animalObj.foodType === 'carnivore') {
            this.carnivoreArray.push(animalObj);
          }
      });
    }
  }
}

function messageInfo(obj, zoo) {
  let text = `<ul class="messageInfo"><h3>${obj.type} ${obj.name}:</h3>`;
  for(let prop in obj) {
    if(prop === 'speed') {
      text += `<li><span>${prop}</span>: ${obj[prop]} km/h;</li>`;
    }
    else if(prop === 'foodType') {
      text += `<li><span>food type</span>: ${obj[prop]}</li>`;
    } else {
      text += `<li><span>${prop}</span>: ${obj[prop]};</li>`;
    }
  }
  text += `</ul>`;
  return text;
}

function searchResultOnPage(textArray, textMessage, value, zoo) {
  var text;
  if(textArray.length >= 1) {
    text = textArray.join('');

    if(text) {
        message.classList.add('messageBlock');
        message.innerHTML = '';
        message.insertAdjacentHTML('beforeEnd', `<h2>Info about animal(s) (Zoo "${zoo.name}") you ask</h2> ${text}`);
    }
    else {
      message.classList.remove('messageBlock');
    }
  }
  else {
    if(value) {
      message.classList.add('messageBlock');
      message.innerHTML = '';
      message.insertAdjacentHTML('beforeEnd', textMessage);
    }
    else {
      message.innerHTML = '';
      message.classList.remove('messageBlock');
    }
  }
}

function searchInfo() {
  let inputSearch = document.querySelector('.inputSearch');
  inputSearch.addEventListener('change', returnInfo);
}

function returnInfo(e) {
  let target = this.value;

  zoo.getAnimal(getType(target), target);
}

function getType(target) {
  let typeArg = target.toLowerCase();
  let type;

  zoo.typesLowerCase.forEach(item => {
    if (typeArg.indexOf(item) >= 0) {
      type = 'type';
    }
  });

  zoo.namesLowerCase.forEach(item => {
    if (typeArg.indexOf(item) >= 0) {
      type = 'name';
    }
  });

  if(!type) {
    type = false;
  }

  return type;

}

searchInfo();

let zoo = new Zoo("Animal\'s land");
zoo.addAnimal([rex, owee, bubbles, greeny, shally, cody]);
console.log(zoo);
zoo.removeAnimal(['Shally']);
console.log(zoo);
// zoo.getAnimal('name', 'Greeny');
zoo.countAnimals();
zoo.rangingHerbivoreCarnivore();
console.log(zoo.herbivoreArray);
console.log(zoo.carnivoreArray);
zoo.getTypesAndNames();
console.log(zoo.types);
// console.log(zoo.namesLowercase);
