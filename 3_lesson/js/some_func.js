// # TEMPLATE

(function objectFromServer() {
	var main_content = document.querySelector('.main-content');
	var error = document.querySelector('.hidden');
	var json_url = decodeURIComponent(location.search.slice(6));

	function json_validation(url) {
		var pattern = /(https?:\/\/)?w{3}.json-generator\.com\/api\/json\/get\/\w+\?indent=\d/g;
		if(pattern.test(url)) {
			MyApp(url);
		}
		else {
			error.classList.remove('hidden');
			error.classList.add('open');
		}
	};
	json_validation(json_url);

	function MyApp(val){
		// https://www.json-generator.com/#
		var fetchedData = fetch(val)
		.then(response => {
			return response.json();
		})
		.then(data => {
			renderInterface(data);
		});
	};

	function renderInterface( data ) {
		var array_1 = [],
			array_2 = [],
			array_3 = [],
			fruit,
			balances,
			eye_female_isActive,
			prop,
			copy_data;

		copy_data = data;

		for (var i = 0; i < copy_data.length; i++) {
			copy_data[i].balance = copy_data[i].balance.slice(1).replace(/\,/g, '');
		}

		fruit = copy_data.filter((item, i, arr) => {
			return arr[i].favoriteFruit === 'banana';
		});
		balances = copy_data.filter((item, i, arr) => {
			return arr[i].balance > 2000 && arr[i].age > 25;
		});
		eye_female_isActive = copy_data.filter((item, i, arr) => {
			return arr[i].eyeColor === 'blue' && arr[i].gender === 'female' && arr[i].isActive === false;
		});

		for_array(fruit, array_1);
		result(array_1, 'People, those like bananas', 'like_bananas');
		for_array(balances, array_2);
		result(array_2, 'People, those are more than 25 and have on balance more than $2000', 'more_than_2000');
		for_array(eye_female_isActive, array_3);
		result(array_3, 'Do not active people, those have blue eyes, female gender', 'blue_eyes');
	}

	function for_array (array, newArray) {
		for (var j = 0; j < array.length; j++) {
			newArray.push(array[j].name);
		}
	}

	var result = (arr, h2, id) => {
		main_content.insertAdjacentHTML('beforeEnd', '<div class="list_one_f_array"><h2>'+ h2 + 
			'</h2><ul id="'+ id +'"></ul></div>');
		var ul = document.querySelector('#' + id);

		if(arr.length > 0) {
			arr.forEach((item, i, array) => {
				ul.insertAdjacentHTML('beforeEnd', '<li>' + item + '</li>');
			});
		}
		else {
			ul.insertAdjacentHTML('beforeEnd', '<li class="none">none</li>');	
		}
	}

})();

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
