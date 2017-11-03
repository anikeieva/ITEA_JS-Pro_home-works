 /*
    Задание:
    1. При помощи методов изложеных ниже, переформатировать ITEA_COURSES в массив который содержит длину строк каждого из элементов.
    2. Самостоятельно изучить метод Array.sort. Отфильтровать массив ITEA_COURSES по алфавиту.
        + Бонусный бал. Вывести на страничку списком
    3. Реализация функции поиска по массиву ITEA_COURSES.
        + Бонусный бал. Вывести на страничку инпут и кнопку по которой будет срабатывать поиск.
  */

const ITEA_COURSES = ["Курс HTML & CSS", "JavaScript базовый курс", 
					"JavaScript продвинутый курс", "JavaScript Professional", 
					"Angular 2.4 (базовый)", "Angular 2.4 (продвинутый)", 
					"React.js", "React Native", "Node.js", "Vue.js"];

var return_lengths = item => item.length;
var ITEA_COURSES_length = ITEA_COURSES.map(return_lengths);
console.log(ITEA_COURSES_length);

// length torether with value
var return_lengths_with_value = item => item + ".length = " + item.length;
var ITEA_COURSES_length_with_value = ITEA_COURSES.map(return_lengths_with_value);
console.log(ITEA_COURSES_length_with_value);

