
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
  'Булка',
  'Огурчик',
  'Котлетка',
  'Бекон',
  'Рыбная котлета',
  'Соус карри',
  'Кисло-сладкий соус',
  'Помидорка',
  'Маслины',
  'Острый перец',
  'Капуста',
  'Кунжут',
  'Сыр Чеддер',
  'Сыр Виолла',
  'Сыр Гауда',
  'Майонез'
];

const cheesburgerIngredients = [
  'Булка',
  'Огурчик',
  'Котлетка',
  'Кисло-сладкий соус',
  'Помидорка',
  'Салат',
  'Кунжут',
  'Сыр Чеддер',
  'Майонез'
];

const monteCristoBurgerIngredients = [
  'Булка',
  'Котлетка',
  'Бекон',
  'Яицо',
  'Кисло-сладкий соус',
  'Острый перец',
  'Капуста',
  'Лук',
  'Сыр Грюйер',
  'Майонез',
  'Грибы'
];

const shakeShackBurgerIngredients = [
  'Булка',
  'Огурчик',
  'Котлетка',
  'Соус карри',
  'Помидорка',
  'Острый перец',
  'Капуста',
  'Кунжут',
  'Сыр Виолла',
  'Майонез'
];

const fishBurgerIngredients = [
  'Булка',
  'Рыбная котлета',
  'Соус карри',
  'Помидорка',
  'Лимон',
  'Капуста',
  'Сыр Гауда',
  'Майонез',
  'Кетчуп'
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
let globalId = 1001;
let globalOrder;

function Burger(name, ingredients, cookingTime) {
  this.name = name;
  this.htmlName = '<span class="burgerName">' + this.name + '</span>' + ' <br> состав: ';
  this.ingredients = ingredients;
  this.cookingTime = cookingTime;

  console.log(OurMenu);
}
Burger.prototype.showComposition = function(){
    let {ingredients, name} = this;
    let compositionLength = ingredients.length;
    console.log(compositionLength);
    if( compositionLength !== 0){
      ingredients.map( function( item ){
          console.log( 'Состав бургера', name, item );
      });
    }
}

function Order(name, condition, value) {
  this.name = name;
  this.condition = condition;
  this.value = value;

  this.returnOrderMessage();
}
Order.prototype.returnOrderMessage = function() {
  this.id = globalId++;
  this.orderNumber = this.id;
  this.orderBurger = this.name;
  let orderMessage;

  for (let i = 0; i < OurMenu.length; i++) {
    if(OurMenu[i].name === this.name) {
      this.cookingTime = OurMenu[i].cookingTime;
      break;
    }
  }

  switch (this.condition) {
    case 'except':
    {
      this.orderException = this.value.join(',');
      orderMessage = `Заказ ${this.orderNumber}: Бургер ${this.orderBurger}, except ${this.orderException}, будет готов через ${this.cookingTime} минут.`;
      break;
    }
    case 'has':
    {
      this.orderAvailability = this.value.join(',');
      if(this.name === 'My Burger') {
        orderMessage = `Заказ ${this.orderNumber}: Бургер ${this.orderBurger}, what has ${this.orderAvailability}, будет готов через 20 минут.`;
      } else {
        orderMessage = `Заказ ${this.orderNumber}: Бургер ${this.orderBurger}, what has ${this.orderAvailability}, будет готов через ${this.cookingTime} минут.`;
      }
      break;
    }
    case 'both':
    {
      this.orderException = this.value[0].join(',');
      this.orderAvailability = this.value[1].join(',');
      orderMessage = `Заказ ${this.orderNumber}: Бургер ${this.orderBurger} whithout ${this.orderException}, what has ${this.orderAvailability}, будет готов через ${this.cookingTime} минут.`;
      break;
    }
    default:
    {
      //standart Burger from menu
      orderMessage = `Заказ ${this.orderNumber}: Бургер ${this.orderBurger}, будет готов через ${this.cookingTime} минут.`;
    }
  }

  bubble.classList.toggle('bubble_block', true);
  speechBubblee.innerText = orderMessage;
  console.log(orderMessage);
}

function initBugerMenu() {
  OurMenu.forEach((item) => {
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
    selectBurger.insertAdjacentHTML('beforeEnd', '<option>' + item.name + '</option>');
  });
}

function initOrderMenu() {
  selectBurger.onchange = onSelectBurger;
  buttonOrderOK.addEventListener('click', onOkClick);
}

function onSelectBurger(e) {
  let ingredientsInChosenBurger = [];
  let name = selectBurger.value;

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

function setDefaultState() {
  //todo

  // selectBurger.value = OurMenu[1].name;
  // selectBurger.dispatchEvent(new Event('change'));
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

  // let MuBurgerIngridients =

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
setDefaultState();
