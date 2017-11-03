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
var ul = document.querySelector('ul');
var num;

ITEA_COURSES.sort();

for(var i = 0; i < ITEA_COURSES.length; i++) {
    num = i + 1; 
    ul.insertAdjacentHTML('beforeEnd', '<li>' + num + '. ' + ITEA_COURSES[i] + ';' + '</li>');
}

// Реализация функции поиска по массиву ITEA_COURSES
var input = document.querySelector('input');
var button = document.querySelector('.button');
var tips = document.querySelector('#tips');
var text_tips_p = document.getElementsByClassName('text_tips');
var target, tips_text = '';
var any_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." +
"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." +
"Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." +
"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." +
"Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." +
"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
var target_arr;
var regexp = '';
var result_regexp;
var ITEA_COURSES_copy = ITEA_COURSES.concat();


function searching(argument) {
    target = location.search.slice(8);
    target = decodeURIComponent(target);

    if(target.length > 0)
    {
        to_add_tips();
    }    
}
 
function to_add_tips()
{
    tips.classList.toggle('open');

    if(target.indexOf('+') >= 0)
    {
        target = target.replace(/\+/g, " ");
    }
    if(target.indexOf('.') >= 0)
    {
        target = target.replace(/\./g, " ");
    }
    if(target.indexOf('(') >= 0 && target.indexOf(')') >= 0)
    {
        target = target.replace(/\(/g, "");
        target = target.replace(/\)/g, "");
    }

    search_different_words();
    
    for (var i = 0; i < ITEA_COURSES_copy.length; i++) {
        if(ITEA_COURSES_copy[i].toLowerCase().indexOf('(') >= 0 &&
         ITEA_COURSES_copy[i].toLowerCase().indexOf(')') >= 0) {
            ITEA_COURSES_copy[i] = ITEA_COURSES_copy[i].replace(/\(/g, "");
            ITEA_COURSES_copy[i] = ITEA_COURSES_copy[i].replace(/\)/g, "");
        }
        if(ITEA_COURSES_copy[i].toLowerCase().indexOf('.') >= 0) {
            ITEA_COURSES_copy[i] = ITEA_COURSES_copy[i].replace(/\./g, " ");
        }

        if(ITEA_COURSES_copy[i].toLowerCase().indexOf(target.toLowerCase()) !== -1 || 
            ITEA_COURSES_copy[i].search(result_regexp) >= 0) {
            tips.insertAdjacentHTML('beforeEnd', '<p class="text_tips">' + 
            '<a href="#">' + ITEA_COURSES[i] + '</a> <span>' + any_text + '</span>' + '</p>');
        }
    }
}

function search_different_words() {
    for (var i = 0; i < ITEA_COURSES.length; i++) {

        target_arr = target.split(" ");
    }

    for (var i = 0; i < target_arr.length; i++) {

        if(target_arr[i].indexOf('.') >= 0)
        {
            regexp += "(" + target_arr[i] + ")" + '*';
        }
        else {
            regexp += "(" + target_arr[i] + ")" + '+';
        }
    }

    if(regexp.indexOf('.') >= 0)
    {
        regexp = regexp.replace(/\./g, '\\.');
    }
    regexp += '.*';
    result_regexp = new RegExp(regexp, 'g');
}

searching();




