/*
  Задание:
  Написать фабрику, которая создает планеты.
    Есть публичные свойства и методы:
      name: "",
      population: randomPopulation(),
      timeCycle: 24,

      growPopulation: () => {
        функция которая берет приватное свойство populationMultiplyRate
        которое равняется случайному числу от 1 до 10 и умножает его на 1/1000 от популяции.
        Дальше, число которое вышло добавляет к популяции и выводит в консоль сообщение,
        что за один цикл прибавилось столько населения планеты.
      }
      rotatePlanet: () => {
        функция которая на основе зарандомленого (Math.round) числа делает действие.
        вначале рандомим случайное число. Если число делится на 2 без остачи - запускаем метод
        growPopulation. Если без остачи не делиться - то запускаем приватный метод Cataclysm
      }

    Приватные свойства и методы:
      randomPopulation: () => Возвращает случайное целое число от 1.000.000 до 100.000.000
      populationMultiplyRate - случайное число от 1 до 10
      Cataclysm: () => {
        Рандомим число от 1 до 10 и умножаем его на 10000;
        То число которое получили, отнимаем от популяции.
        В консоль выводим сообщение - от катаклизма погибло Х человек.
      }
*/
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let planets = (name) => {
  let randomPopulation = getRandomInt(1e6, 1e8);
  let populationMultiplyRate = getRandomInt(1, 10);

  let cataclysm = () => {
    let result = randomPopulation - populationMultiplyRate * 10000;
    console.log(`от катаклизма погибло ${result} человек ${name}`);
  };

  // щоб передати в метод поверненого об єкта функцію, ця функція має бути приватною (повертає помилку)
  let growPopulation = () => {
    let result = Math.round(randomPopulation + populationMultiplyRate * randomPopulation / 1000);
    console.log(`за один цикл прибавилось ${result} населения планеты ${name}`);
  };
  // варыант виконання умови задачі, коли growPopulation - публічний метод
  // let result = {
  //   name: name,
  //   population: randomPopulation,
  //   timeCycle: 24
  // };
  //
  // result.growPopulation = function() {
  //   let result = Math.round(this.population + populationMultiplyRate * this.population / 1000);
  //   console.log(`за один цикл прибавилось ${result} населения планеты ${this.name}`);
  // };
  //
  // result.rotatePlanet = function() {
  //   let randomNumber = Math.round(Math.random()*10);
  //   // let randomNumber = 4;
  //   console.log(randomNumber);
  //   if(randomNumber % 2 === 0) {
  //     this.growPopulation();
  //   }
  //   else {
  //     cataclysm();
  //   }
  // };
  // return result;
  return {
    name: name,
    population: randomPopulation,
    timeCycle: 24,
    // growPopulation: function() {
    //   console.log('growPopulation');
    // },
    rotatePlanet: function() {
      let randomNumber = Math.round(Math.random()*10);
      if(randomNumber % 2 === 0) {
        growPopulation();
      }
      else {
        cataclysm();
      }
    }
  }
};

let saturn = planets('Saturn');
saturn.rotatePlanet();
