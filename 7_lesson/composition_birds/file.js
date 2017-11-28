// const Drive = ( state ) => ({
//   drive: () => console.log('Wroooom!, It\'s a car ' + state.name )
// });
//
// const Refill = ( state ) => ({
//   refill: () => console.log( state.name + ' was refiled')
// });
//
// const Move = ( state ) => ({
//   move: () => console.log( state.name + ' is moving. Speed ->' + state.speed )
// });
//
// const Fly = ( state ) => ({
//   fly: () => console.log( state.name + ' flying into sky! Weather is ' + state.weather )
// });
//
// // Проверим ф-ю
// Refill({name: "Volkswagen"}).refill(); // Volkswagen was refiled
//
// // Наш конструктор.
// const EcoRefillDrone = (name) => {
//   let state = {
//     name,
//     speed: 100,
//     weather: 'rainy'
//   };
//
//   return Object.assign(
//     {},
//     Drive(state),
//     Refill(state),
//     Fly(state)
//   );
// };
//
//   const myDrone = EcoRefillDrone('JS-Magic');
//   console.log( myDrone );
//         myDrone.drive();
//         myDrone.refill();
//         myDrone.fly();


  /*

    Задание:
      Написать класс на композиции.
      Тематика - птицы.

      Птицы могут:
        - Нестись
        - Летать
        - Плавать
        - Кушать
        - Охотиться
        - Петь
        - Переносить почту
        - Бегать

    Составить птиц (пару на выбор, не обязательно всех):
      Страус
      Голубь
      Курица
      Пингвин
      Чайка
      Ястреб
      Сова

   */

   // const Drive = ( state ) => ({
   //   drive: () => console.log('Wroooom!, It\'s a car ' + state.name )
   // });

   const Fly = (bird) => ({
     fly: () => {
       console.log(`${bird.name} can fly with speed ${bird.speed} km/h`);
     }
   });

   const Run = (bird) => ({
     run: () => {
       console.log(`${bird.name} can run with speed ${bird.speed} km/h`);
     }
   });

   const Swim = (bird) => ({
     swim: () => console.log(`${bird.name} can swim with speed ${bird.speed} km/h`)
   });

   const Eat = (bird) => ({
     eat: () => console.log(`${bird.name} can eat`)
   });

   const Post = (bird) => ({
     post: () => console.log(`${bird.name} can post ${bird.whatPost}`)
   });

  const BearEggs = (bird) => ({
    bearEggs: () => console.log(`${bird.name} can bear ${bird.bear}`)
  });

  const Chicken = (name, speed, bear) => {
    let bird = {
      name,
      speed,
      bear
    };

    return Object.assign(
      {},
      bird,
      Run(bird),
      BearEggs(bird),
      Eat(bird)
    );
  };

  const Dove = (name, speed, whatPost) => {
    let bird = {
      name,
      speed,
      whatPost
    };

    return Object.assign(
      {},
      bird,
      Post(bird),
      Fly(bird),
      Eat(bird)
    );
  };

  const chicken = Chicken('chicken', 10, 'eggs');
  const dove = Dove('dove', 30, 'letters');
  // console.log(dove);
  chicken.run();
  chicken.bearEggs();
  chicken.eat();

  dove.post();
  dove.fly();
  dove.eat();
