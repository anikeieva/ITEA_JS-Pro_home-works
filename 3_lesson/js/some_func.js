// # TEMPLATE

var main_content = document.querySelector('.main-content');
var json_url = decodeURIComponent(location.search.slice(6));

var json_validation = (url) => {
	var pattern = /https?:\/\/w{3}.json-generator\.com\/api\/json\/get\/\w+\?indent=\d/g;
	if(pattern.test(url)) return url;
	// console.log(url);
};

( function MyApp(){
  // console.log('init function');
  // https://www.json-generator.com/#
  var fetchedData = fetch(json_validation(json_url)).then(function(response) {
    return response.json();
  }).then(data => {
    renderInterface(data);
  });
}());

function renderInterface( data ) {
	var array_1 = [],
		array_2 = [],
		array_3 = [],
		prop,
		copy_data;

	copy_data = data;
	// console.log(copy_data);

	for (var i = 0; i < copy_data.length; i++) {
		copy_data[i].balance = copy_data[i].balance.slice(1).replace(/\,/g, '');
	}

	var fruit = copy_data.filter((item, i, arr) => {
		return arr[i].favoriteFruit === 'banana';
	});
	for (var j = 0; j < fruit.length; j++) {
		array_1.push(fruit[j].name);
	}
	console.log(array_1);
	result(array_1, 'Peoples, those like bananas', 'like_bananas');

	var balances = copy_data.filter((item, i, arr) => {
		return arr[i].balance > 2000 && arr[i].age > 25;
	});
	for (var j = 0; j < balances.length; j++) {
		array_2.push(balances[j].name);
	}
	console.log(array_2);
	result(array_2, 'Peoples, those are more than 25 and have on balance more than $2000', 'more_than_2000');

	var eye_female_isActive = copy_data.filter((item, i, arr) => {
		return arr[i].eyeColor === 'blue' && arr[i].gender === 'female' && arr[i].isActive === false;
	});
	for (var j = 0; j < eye_female_isActive.length; j++) {
		array_3.push(eye_female_isActive[j].name);
	}
	console.log(array_3);
	result(array_3, 'Do not active Peoples, those have blue eyes, female gender', 
		'blue_eyes');
}

function result(arr, h2, id) {
	main_content.insertAdjacentHTML('beforeEnd', '<div class="list_one_f_array"><h2>'+ h2 + 
		'</h2><ul id="'+ id +'"></ul></div>');
	var ul = document.querySelector('#' + id);
	// console.log(ul);
	arr.forEach((item, i, array) => {
		ul.insertAdjacentHTML('beforeEnd', '<li>' + item + '</li>');
	});
} 

// Задача:
// Написать ф-ю которая принимает на вход обьект с сервера и
// разбить его на 3 массива по параметрам описаным ниже.
// + бонус вывести каждый список на экран
// + бонус 2 сделать поле инпута куда вставить ссылку с json-generator
// для перерендера списка по клику на кнопку
// + бонус 3 если вставить не валидную ссылку выводить ошибку

// # = условие -> вывод
// array 1 = fruit == banana -> name,
// array 2 = balance > 2000, age > 25
// array 3 = eyeColor === blue, gender === female, isActive === false
