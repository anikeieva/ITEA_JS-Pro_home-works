
  /*
    Задание:
      1. Создать конструктор бургеров на прототипах, которая добавляет наш бургер в массив меню
      Дожно выглядеть так:
      new burger('Hamburger',[ ...Массив с ингредиентами ] , 20);
      Прототип для бургера:
      {
        cookingTime: 0,     // Время на готовку
        showComposition: function(){
          let {composition, name} = this;
          let compositionLength = composition.length;
          console.log(compositionLength);
          if( compositionLength !== 0){
            composition.map( function( item ){
                console.log( 'Состав бургера', name, item );
            })
          }
        }
      }
      Результатом конструктора нужно вывести массив меню c добавленными элементами.
      // menu: [ {name: "", composition: [], cookingTime:""},  {name: "", composition: [], cookingTime:""}]
        2. Создать конструктор заказов
        Прототип:
        {
          id: "",
          orderNumber: "",
          orderBurder: "",
          orderException: "",
          orderAvailability: ""
        }
          Заказ может быть 3х типов:
            1. В котором указано название бургера
              new Order('Hamburger'); -> Order 1. Бургер Hamburger, будет готов через 10 минут.
            2. В котором указано что должно быть в бургере, ищете в массиве Menu подходящий вариант
              new Order('', 'has', 'Название ингредиента') -> Order 2. Бургер Чизбургер, с сыром, будет готов через 5 минут.
            3. В котором указано чего не должно быть
              new Order('', 'except', 'Название ингредиента') ->
            Каждый их которых должен вернуть статус:
            "Заказ 1: Бургер ${Название}, будет готов через ${Время}
            Если бургера по условиям заказа не найдено предлагать случайный бургер из меню:
              new Order('', 'except', 'Булка') -> К сожалению, такого бургера у нас нет, можете попробовать "Чизбургер"
              Можно например спрашивать через Confirm подходит ли такой вариант, если да - оформлять заказ
              Если нет, предложить еще вариант из меню.
        3. Протестировать программу.
          1. Вначале добавляем наши бургеры в меню (3-4 шт);
          2. Проверяем работу прототипного наследования вызывая метод showComposition на обьект бургера с меню
          3. Формируем 3 заказа
        Бонусные задания:
        4. Добавлять в исключения\пожелания можно несколько ингредиентов
        5. MEGABONUS
          Сделать графическую оболочку для программы.
  */


// код незавершений!!! ще графіка і оптимізація
const Ingredients = [
  'bun',
  'cucumber',
  'beef cutlet',
  'bacon',
  'fish cutlet',
  'sauce curry',
  'sweet and sour sauce',
  'tomatos',
  'olives',
  'hot pepper',
  'lemon',
  'bolete',
  'onion',
  'leaf lettuce',
  'cabbage',
  'sesame',
  'Cheddar cheeseр',
  'Viola cheese',
  'Gouda cheese',
  'Gruyere cheese',
  'mayonnaise',
  'ketchup'
];

const cheesburgerIngredients = [
  'bun',
  'cucumber',
  'beef cutlet',
  'sweet and sour sauce',
  'tomatos',
  'leaf lettuce',
  'onion',
  'sesame',
  'Cheddar cheese',
  'mayonnaise',
  'ketchup'
];

const monteCristoBurgerIngredients = [
  'bun',
  'beef cutlet',
  'bacon',
  'Яицо',
  'sauce curry',
  'hot pepper',
  'cabbage',
  'onion',
  'Gruyere cheese',
  'mayonnaise',
  'bolete'
];

const shakeShackBurgerIngredients = [
  'bun',
  'cucumber',
  'beef cutlet',
  'bolete',
  'sweet and sour sauce',
  'tomatos',
  'olives',
  'cabbage',
  'sesame',
  'Viola cheese',
  'mayonnaise'
];

const fishBurgerIngredients = [
  'bun',
  'fish cutle',
  'sauce curry',
  'cucumber',
  'tomatos',
  'olives',
  'lemon',
  'leaf lettuceа',
  'Gouda cheese',
  'mayonnaise',
  'ketchup'
];

let OurMenu = [];
let OurOrders = [];
let menu = document.querySelector('#menu');
let ul = document.querySelector('#list');
let selectBurger = document.querySelector('#selectBurger');
let buttonOrderOK = document.querySelector('.orderButton');
let selectExcept = document.querySelector('#selectExcept');
let selectAdd = document.querySelector('#selectAdd');
let bubble = document.querySelector('.bubble');
let speechBubblee = document.querySelector('.speech-bubble');
let exceptDiv = document.querySelector('.exceptDiv');
let addDiv = document.querySelector('.addDiv');
let globalId = 1001;
let globalOrder;
let defaultBurgerIndex = 0;
let defaultBurgerName = 'Cheesburger';

class Burger {
    constructor(name, ingredients, cookingTime) {
        this.name = name;
        this.htmlName = '<span class="burgerName">' + this.name + '</span>' + ' <br>';
        this.ingredients = ingredients;
        this.cookingTime = cookingTime;
    }
    showComposition() {
        let {ingredients, name} = this;
        let compositionLength = ingredients.length;
        console.log(compositionLength);
        if( compositionLength !== 0){
          ingredients.map( function( item ){
              console.log( 'Состав бургера', name, item );
          });
        }
    }
}

class Order {
    constructor(name, condition, value) {
      this.name = name;
      this.condition = condition;
      this.value = value;
      this.returnOrderMessage();
    }
    returnOrderMessage() {
        this.id = globalId++;
        this.orderNumber = this.id;
        this.orderBurger = this.name;
        let orderMessage;
        let orderMessageErrror;

        for (let i = 0; i < OurMenu.length; i++) {
          if(OurMenu[i].name === this.name) {
            this.cookingTime = OurMenu[i].cookingTime;
            break;
          }
        }

        switch (this.condition) {
          case 'except':
          {
            this.orderException = this.value.join(', ');
            orderMessage = `Order ${this.orderNumber}: Buger ${this.orderBurger}, except ${this.orderException}, will be ready in ${this.cookingTime} minutes.`;
            break;
          }
          case 'has':
          {
            this.orderAvailability = this.value.join(', ');
            if(this.name === 'My Burger') {
                if(this.value.length >= 0 && this.value.length <= 2) {
                    orderMessageErrror = `Burger must has more than 2 ingridients`;
                } else {
                    orderMessage = `Order ${this.orderNumber}: Burger ${this.orderBurger}, what has ${this.orderAvailability}, will be ready in 20 minutes.`;
                }
            } else {
              orderMessage = `Order ${this.orderNumber}: Burger ${this.orderBurger}, what has ${this.orderAvailability}, will be ready in ${this.cookingTime} minutes.`;
            }
            break;
          }
          case 'both':
          {
            this.orderException = this.value[0].join(', ');
            this.orderAvailability = this.value[1].join(', ');
            orderMessage = `Order ${this.orderNumber}: Burger ${this.orderBurger}, whithout ${this.orderException}, what has ${this.orderAvailability}, will be ready in ${this.cookingTime} minutes.`;
            break;
          }
          default:
          {
            if(this.name === 'My Burger') {
                orderMessageErrror = `Burger must has more than 2 ingridients`;
            }
            else {
                //standart Burger from menu
                orderMessage = `Order ${this.orderNumber}: Burger ${this.orderBurger}, will be ready in ${this.cookingTime} minutes.`;
            }
          }
        }

        OurOrders.push(orderMessage);
        bubble.classList.toggle('bubble_block', true);

        if(orderMessageErrror) {
            speechBubblee.innerText = orderMessageErrror;
        }
        else {
            speechBubblee.innerText = orderMessage;
        }
        // console.log(orderMessage);
    }
}

// function Order(name, condition, value) {
//   this.name = name;
//   this.condition = condition;
//   this.value = value;
//
//   this.returnOrderMessage();
// }
// Order.prototype.returnOrderMessage = function() {
//   this.id = globalId++;
//   this.orderNumber = this.id;
//   this.orderBurger = this.name;
//   let orderMessage;
//   let orderMessageErrror;
//
//   for (let i = 0; i < OurMenu.length; i++) {
//     if(OurMenu[i].name === this.name) {
//       this.cookingTime = OurMenu[i].cookingTime;
//       break;
//     }
//   }
//
//   switch (this.condition) {
//     case 'except':
//     {
//       this.orderException = this.value.join(', ');
//       orderMessage = `Order ${this.orderNumber}: Buger ${this.orderBurger}, except ${this.orderException}, will be ready in ${this.cookingTime} minutes.`;
//       break;
//     }
//     case 'has':
//     {
//       this.orderAvailability = this.value.join(', ');
//       if(this.name === 'My Burger') {
//         if(this.value.length > 2) {
//             orderMessage = `Order ${this.orderNumber}: Burger ${this.orderBurger}, what has ${this.orderAvailability}, will be ready in 20 minutes.`;
//         }
//         else {
//             orderMessageErrror = `Burger must has more than 2 ingridients`;
//         }
//       } else {
//         orderMessage = `Order ${this.orderNumber}: Burger ${this.orderBurger}, what has ${this.orderAvailability}, will be ready in ${this.cookingTime} minutes.`;
//       }
//       break;
//     }this.id = globalId++;
//   this.orderNumber = this.id;
//   this.orderBurger = this.name;
//   let orderMessage;
//   let orderMessageErrror;
//
//   for (let i = 0; i < OurMenu.length; i++) {
//     if(OurMenu[i].name === this.name) {
//       this.cookingTime = OurMenu[i].cookingTime;
//       break;
//     }
//   }
//
//   switch (this.condition) {
//     case 'except':
//     {
//       this.orderException = this.value.join(', ');
//       orderMessage = `Order ${this.orderNumber}: Buger ${this.orderBurger}, except ${this.orderException}, will be ready in ${this.cookingTime} minutes.`;
//       break;
//     }
//     case 'has':
//     {
//       this.orderAvailability = this.value.join(', ');
//       if(this.name === 'My Burger') {
//         if(this.value.length > 2) {
//             orderMessage = `Order ${this.orderNumber}: Burger ${this.orderBurger}, what has ${this.orderAvailability}, will be ready in 20 minutes.`;
//         }
//         else {
//             orderMessageErrror = `Burger must has more than 2 ingridients`;
//         }
//       } else {
//         orderMessage = `Order ${this.orderNumber}: Burger ${this.orderBurger}, what has ${this.orderAvailability}, will be ready in ${this.cookingTime} minutes.`;
//       }
//       break;
//     }
//     case 'both':
//     {
//       this.orderException = this.value[0].join(', ');
//       this.orderAvailability = this.value[1].join(', ');
//       orderMessage = `Order ${this.orderNumber}: Burger ${this.orderBurger}, whithout ${this.orderException}, what has ${this.orderAvailability}, will be ready in ${this.cookingTime} minutes.`;
//       break;
//     }
//     default:
//     {
//       //standart Burger from menu
//       orderMessage = `Order ${this.orderNumber}: Burger ${this.orderBurger}, will be ready in ${this.cookingTime} minutes.`;
//     }
//   }
//
//   OurOrders.push(orderMessage);
//   bubble.classList.toggle('bubble_block', true);
//
//   if(orderMessageErrror) {
//       speechBubblee.innerText = orderMessageErrror;
//   }
//   else {
//       speechBubblee.innerText = orderMessage;
//   }
//   // console.log(orderMessage);
//     case 'both':
//     {
//       this.orderException = this.value[0].join(', ');
//       this.orderAvailability = this.value[1].join(', ');
//       orderMessage = `Order ${this.orderNumber}: Burger ${this.orderBurger}, whithout ${this.orderException}, what has ${this.orderAvailability}, will be ready in ${this.cookingTime} minutes.`;
//       break;
//     }
//     default:
//     {
//       //standart Burger from menu
//       orderMessage = `Order ${this.orderNumber}: Burger ${this.orderBurger}, will be ready in ${this.cookingTime} minutes.`;
//     }
//   }
//
//   OurOrders.push(orderMessage);
//   bubble.classList.toggle('bubble_block', true);
//
//   if(orderMessageErrror) {
//       speechBubblee.innerText = orderMessageErrror;
//   }
//   else {
//       speechBubblee.innerText = orderMessage;
//   }
//   // console.log(orderMessage);
// }

function initBugerMenu() {
  OurMenu.forEach((item, index) => {
    let text = item.htmlName;
    if (item.ingredients.length > 0) {
      item.ingredients.forEach((element, i, arr) => {
        if (i === arr.length - 1) {
          text += element + ';';
        } else {
          text += element + ',';
        }
      });
    }
    ul.insertAdjacentHTML('beforeEnd', '<li class="li">'+ text + '</li>');
    if(index === defaultBurgerIndex) {
        selectBurger.insertAdjacentHTML('beforeEnd', '<option selected>' + item.name + '</option>');
    }
    else {
        selectBurger.insertAdjacentHTML('beforeEnd', '<option>' + item.name + '</option>');
    }
  });
}

function initOrderMenu() {
  selectBurger.onclick = onSelectBurger;
  buttonOrderOK.addEventListener('click', onOkClick);
}

function onSelectBurger(e) {
  let ingredientsInChosenBurger = [];
  let name = selectBurger.value;

  if(name === 'My Burger') {
      exceptDiv.style.display = 'none';
      addDiv.classList.add('addDiv2Col');
  }
  else {
      addDiv.classList.remove('addDiv2Col');
      exceptDiv.style.display = 'block';
  }

  initExceptOptions(name);
  initAddOptions(name);
}

function initExceptOptions(burgerName) {
  cleanAllChildNodes(selectExcept);

  for(let i=0; i < OurMenu.length; i++) {
    if(OurMenu[i].name === burgerName) {
      ingredientsInChosenBurger = OurMenu[i].ingredients;
      ingredientsInChosenBurger.forEach((ingredient) => {
        let checkBoxDiv = `<div id="div_${ingredient}">
        <input type="checkbox" id="${ingredient}" value="${ingredient}">
        <label for="${ingredient}">${ingredient}</label>
        </div>`;
        selectExcept.insertAdjacentHTML('beforeEnd', checkBoxDiv);
      });
      break;
    }
  }
}

function initAddOptions(burgerName) {
  cleanAllChildNodes(selectAdd);

  let differentIngredients = [];


  for(let i=0; i < Ingredients.length; i++) {
    if(ingredientsInChosenBurger.indexOf(Ingredients[i]) < 0) {
      differentIngredients.push(Ingredients[i]);
    }
  }

  differentIngredients.forEach((ingredient) => {
    let checkBoxDiv = `<div id="div_${ingredient}">
    <input type="checkbox" id="${ingredient}" value="${ingredient}">
    <label for="${ingredient}">${ingredient}</label>
    </div>`;
    selectAdd.insertAdjacentHTML('beforeEnd', checkBoxDiv);
  });
}

function cleanAllChildNodes(select) {
  let nodes = select.childNodes;
  let nodesLength = nodes.length;
  while(nodes.length > 0) {
    nodes[nodesLength-1].remove();
    nodesLength--;
  }
}

function calculateCondition(exceptOptions, addOptions) {
  let except = exceptOptions.length > 0;
  let add = addOptions.length > 0;
  let both = except && add;

  if(both) {
    return 'both';
  } else if(except) {
    return 'except';
  } else if(add) {
    return 'has';
  }
}

function calculatOptions(exceptOptions, addOptions) {
    let except = exceptOptions.length > 0;
    let add = addOptions.length > 0;
    let both = except && add;

    if(both) {
      return [exceptOptions, addOptions];
    } else if(except) {
      return exceptOptions;
    } else if(add) {
      return addOptions;
    }
}

function setDefaultBurgerOptions() {
  let ingredientsInChosenBurger = [];
  let name = defaultBurgerName;

  initExceptOptions(name);
  initAddOptions(name);
}

function setDefaultState() {
    onSelectBurger();
}


function onOkClick(event) {
  let exceptOptions = [];
  selectExcept.childNodes.forEach((item) => {
    if(item.children[0].checked) {
      exceptOptions.push(item.children[0].value);
    }
  });

  let addOptions = [];
  selectAdd.childNodes.forEach((item) => {
    if(item.children[0].checked) {
      addOptions.push(item.children[0].value);
    }
  });

  let options;
  let condition = calculateCondition(exceptOptions, addOptions);
  let optionsIng = calculatOptions(exceptOptions, addOptions);
  globalOrder = new Order(selectBurger.value, condition, optionsIng);

  setDefaultState();
}



OurMenu.push(new Burger('Cheesburger', cheesburgerIngredients, 20));
OurMenu.push(new Burger('Monte Cristo', monteCristoBurgerIngredients, 15));
OurMenu.push(new Burger('Shake Shack', shakeShackBurgerIngredients, 10));
OurMenu.push(new Burger('Fish Burger', fishBurgerIngredients, 25));
OurMenu.push(new Burger('My Burger', ['Вы выбираете начинку сами'], 35));

initOrderMenu();
initBugerMenu();
setDefaultBurgerOptions();
