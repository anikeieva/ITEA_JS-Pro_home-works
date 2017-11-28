/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_fly_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_run_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_swim_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_eat_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_post_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_bearEggs_js__ = __webpack_require__(6);

  
  
  
  
  
  

  const Chicken = (name, speed, bear) => {
    let bird = {
      name,
      speed,
      bear
    };
    return Object.assign(
      {},
      bird,
      Object(__WEBPACK_IMPORTED_MODULE_1__modules_run_js__["a" /* default */])(bird),
      Object(__WEBPACK_IMPORTED_MODULE_5__modules_bearEggs_js__["a" /* default */])(bird),
      Object(__WEBPACK_IMPORTED_MODULE_3__modules_eat_js__["a" /* default */])(bird)
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
      Object(__WEBPACK_IMPORTED_MODULE_4__modules_post_js__["a" /* default */])(bird),
      Object(__WEBPACK_IMPORTED_MODULE_0__modules_fly_js__["a" /* default */])(bird),
      Object(__WEBPACK_IMPORTED_MODULE_3__modules_eat_js__["a" /* default */])(bird)
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Fly = (bird) => ({
  fly: () => {
    console.log(`${bird.name} can fly with speed ${bird.speed} km/h`);
  }
});

/* harmony default export */ __webpack_exports__["a"] = (Fly);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Run = (bird) => ({
  run: () => {
    console.log(`${bird.name} can run with speed ${bird.speed} km/h`);
  }
});

/* harmony default export */ __webpack_exports__["a"] = (Run);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Swim = (bird) => ({
  swim: () => console.log(`${bird.name} can swim with speed ${bird.speed} km/h`)
});

/* unused harmony default export */ var _unused_webpack_default_export = (Swim);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Eat = (bird) => ({
  eat: () => console.log(`${bird.name} can eat`)
});

/* harmony default export */ __webpack_exports__["a"] = (Eat);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Post = (bird) => ({
  post: () => console.log(`${bird.name} can post ${bird.whatPost}`)
});

/* harmony default export */ __webpack_exports__["a"] = (Post);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const bearEggs = (bird) => ({
  bearEggs: () => console.log(`${bird.name} can bear ${bird.bear}`)
});

/* harmony default export */ __webpack_exports__["a"] = (bearEggs);


/***/ })
/******/ ]);