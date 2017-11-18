

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

  var OurMenu = [];
  var OurOrders = [];
  var menu = document.querySelector('#menu');
  var ul = document.querySelector('#list');

function BurgerToMenu(name, ingredients, cookingTime) {
    var text;
    function Burger(){
        this.name = name;
        this.composition = this.showComposition();
        this.ingredients;
        this.cookingTime = cookingTime;
    }


    Burger.prototype.showComposition = function(){
        let {composition} = this;
        composition = ingredients;
        let compositionLength = composition.length;
        text = '<span class="burgerName">' + name + '</span>' + ' <br> состав: ';
      
        if( compositionLength !== 0) {
            composition.map( function( item, index, arr ) {

                if(index !== (compositionLength - 1) ) {
                  text += item + ', ';
                }
                else {
                  text += item + ';';
                }

            });
        }
        return text;
  };

  OurMenu.push(new Burger());
  function addMenuToPage() {
      list.insertAdjacentHTML('beforeEnd', '<li class="li">'+ text + '</li>');
  }
  addMenuToPage();
  // console.log(OurMenu);
}
var cheesburger = new BurgerToMenu('Cheesburger', cheesburgerIngredients, 20);
var monteCristoBurger = new BurgerToMenu('Monte Cristo', monteCristoBurgerIngredients, 15);
var shakeShackBurger = new BurgerToMenu('Shake Shack', shakeShackBurgerIngredients, 10);
var fishBurger = new BurgerToMenu('Fish Burger', fishBurgerIngredients, 25);

var counter = 1;

function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function returnRandomBurger(arr) {
    var randomIndex = getRandomInt(0, (arr.length - 1));
    var randomBurger = arr[randomIndex];
    return randomBurger;
}
function returnBurgersNameArray(arr) {
    var burgerArray = arr.map(item => {
        return item.name;
    });
    return burgerArray;
}
// function returnBurgersIngridientsArray(arr) {
//     var burgerIngrArray;// код незавершений!!!
// }
var burgersArray = returnBurgersNameArray(OurMenu);

(function toAddOrderToPage() {
    var selectBurger = document.querySelector('#selectBurger');
    for (var i = 0; i < burgersArray.length; i++) {
        selectBurger.insertAdjacentHTML('beforeEnd', '<option>' + burgersArray[i] + '</option>');
    }
    var selectExcept = document.querySelector('#selectExcept');
})();

function Order(name, condition, value){
  this.name = name;
  this.condition = condition;
  this.value = value;

  return this.returnOrderMessage();
}
Order.prototype.returnOrderMessage = function() {
  var id = parseInt(1e10*Math.random());
  var orderNumber = counter++;
  var orderBurger,
      cookingTime, 
      orderException,
      orderAvailability,
      orderMessage,
      valueText = '',
      thisValue = this.value;

  function makeTextValue() {
      if(typeof thisValue === 'string') {
           valueText = thisValue;
      }
      else if(Array.isArray(thisValue)) {
           valueText = thisValue.join(', ');
      }
      else {
        console.log('error');
      }
      return valueText;
      console.log(valueText);
  }

  for(var i = 0; i < OurMenu.length; i++) {
      if(OurMenu[i].name === this.name) {
          orderBurger = OurMenu[i];
          cookingTime = orderBurger.cookingTime;
      }
  }

  if(orderBurger && this.name && !this.condition && !thisValue) {
      orderMessage = `Заказ ${orderNumber}: Бургер ${this.name}, будет готов через ${cookingTime} минут.`;
  } 
  else if(orderBurger && this.name && this.condition === 'except' && thisValue) {
      orderException = thisValue;
      makeTextValue();
      orderMessage = `Заказ ${orderNumber}: Бургер ${this.name}, except ${valueText}, будет готов через ${cookingTime} минут.`;
  }
  else if(orderBurger && this.name && this.condition === 'has' && thisValue) {
      orderAvailability = thisValue;
      makeTextValue();
      console.log(valueText);
      orderMessage = `Заказ ${orderNumber}: Бургер ${this.name}, what has ${orderAvailability}, будет готов через ${cookingTime} минут.`;
  }
  else if (!orderBurger) {
      var randomBurgerArr = returnRandomBurger(OurMenu);
      var randomBurger = randomBurgerArr.name;
      var randomBurgerTime = randomBurgerArr.cookingTime;
      var nonFoundMessage = `Burger with name "${this.name}" is absent. Maybe you want ${randomBurger}?`;
      var maybeAnotherMessage;
      var confirmOrder = confirm(nonFoundMessage);
      if(confirmOrder) {
          orderMessage = `Заказ ${orderNumber}: Бургер ${randomBurger}, будет готов через ${randomBurgerTime} минут.`;
      }
      else {
          (function maybeAnotherMessageFunction() {
              randomBurgerArr = returnRandomBurger(OurMenu);
              randomBurger = randomBurgerArr.name;
              randomBurgerTime = randomBurgerArr.cookingTime;
              maybeAnotherMessage = confirm(`Maybe you want ${randomBurger}?`);
              if(maybeAnotherMessage) {
                  orderMessage = `Заказ ${orderNumber}: Бургер ${randomBurger}, будет готов через ${randomBurgerTime} минут.`;
              }
              else {
                maybeAnotherMessageFunction();
              }
          })();
      }
  }        
  console.log(orderMessage); 
} 

var order1 = new Order('Cheesburger');
var order2 = new Order('Monte Cristo', 'except', 'onion');
var order3 = new Order('Cheesburger', 'has', 'olives'); 
var order4 = new Order('Cheesburger', 'except', ['onion', 'olives']); 
var order5 = new Order('Cheesburger', 'has', ['fish', 'olives']); 
var order6 = new Order('Burger', 'has', ['fish', 'olives']); 


