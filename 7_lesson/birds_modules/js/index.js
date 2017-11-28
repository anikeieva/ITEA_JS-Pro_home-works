
  import Fly from './modules/fly.js';
  import Run from './modules/run.js';
  import Swim from './modules/swim.js';
  import Eat from './modules/eat.js';
  import Post from './modules/post.js';
  import BearEggs from './modules/bearEggs.js';

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
  console.log(chicken.name);
  chicken.run();
  chicken.bearEggs();
  chicken.eat();
  console.log("*************************************************************************");
  console.log(dove.name);
  dove.post();
  dove.fly();
  dove.eat();

// Виклик вебпак в консолі
  // ./node_modules/.bin/webpack
