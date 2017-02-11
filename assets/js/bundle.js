/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const parserExpression = __webpack_require__(1);

	window.onload = function () {
	  const $input = document.getElementById('input');
	  const $output = document.getElementById('output');
	  const $btns = document.querySelectorAll('.col');
	  const history = [];

	  function resetOutput () {
	    $output.textContent = '0.';
	  }

	  resetOutput();

	  for (let i = 0; i < $btns.length; i++) {
	    $btns[i].addEventListener('click', function () {
	      const cmd = this.textContent;

	      switch (cmd) {
	        case '=': {
	          let result = parserExpression($input.textContent);
	          history.push(result);
	          result = new Intl.NumberFormat('en-US', {
	            maximumSignificantDigits: 20
	          }).format(result);
	          $output.textContent = result + '.';
	        }
	          break;
	        case 'AC': {
	          $input.textContent = '';
	          resetOutput();
	        }
	          break;
	        case 'DEL': {
	          let content = $input.textContent;
	          $input.textContent = content.slice(0, content.length - 1);
	        }
	          break;
	        case 'Ans': {
	          $input.textContent += history[history.length - 1];
	        }
	          break;
	        case 'EXP': {
	          $input.textContent += 'e';
	        }
	          break;
	        case 'e': {
	          $input.textContent += 'E';
	        }
	          break;
	        case 'x!': {
	          $input.textContent += '!';
	        }
	          break;
	        case 'x2': {
	          $input.textContent += '^2';
	        }
	          break;
	        case 'x3': {
	          $input.textContent += '^3';
	        }
	          break;
	        case 'xn': {
	          $input.textContent += '^';
	        }
	          break;
	        default: {
	          $input.textContent += cmd;
	        }
	      }
	    });
	  }
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const _ = __webpack_require__(2);

	const operators = ['*', '/', '-', '+'];
	const group = ['(', ')'];
	const fact = '!';
	const power = '^';
	const root = '√';
	const percent = '%';

	const reFunctions = /(cos|sin|tan|ln|log)\W/g;

	module.exports = parserExpression;

	function factorial (x) {
	  if (x === 0) {
	    return 1;
	  }

	  return x * factorial(x - 1);
	}

	function isSpecial (char) {
	  return fact === char ||
	  power === char ||
	  root === char ||
	  percent === char ||
	  group.indexOf(char) !== -1 ||
	  operators.indexOf(char) !== -1;
	}

	function parserExpression (expression) {
	  expression = expression
	    .replace(/x/g, '*')
	    .replace(/÷/g, '/')
	    .replace(/E/g, Math.E)
	    .replace(/π/g, Math.PI);

	  if (expression.includes(fact)) {
	    const countChar = _.count(expression, fact);

	    for (let i = 0; i < countChar; i++) {
	      let index = expression.indexOf(fact);
	      let temp = '';

	      for (let j = index - 1; j >= 0; j--) {
	        if (!isSpecial(expression[j])) {
	          temp += expression[j];
	        } else {
	          break;
	        }
	      }

	      temp = _.reverse(temp);
	      temp = Number(temp);
	      expression = expression.replace(temp + fact, factorial(temp));
	    }
	  }

	  if (expression.includes(power)) {
	    const countChar = _.count(expression, power);

	    for (let i = 0; i < countChar; i++) {
	      let index = expression.indexOf(power);
	      let indexPowerNumber = index + 1;
	      let powerNumber = Number(expression[indexPowerNumber]);
	      let temp = '';

	      for (let j = index - 1; j >= 0; j--) {
	        if (!isSpecial(expression[j])) {
	          temp += expression[j];
	        } else {
	          break;
	        }
	      }

	      temp = _.reverse(temp);
	      let _temp = temp + power + powerNumber;
	      temp = Number(temp);
	      let replace = eval(`Math.pow(${temp}, ${powerNumber})`);
	      expression = expression.replace(_temp, replace);
	    }
	  }

	  if (expression.includes(root)) {
	    const countChar = _.count(expression, root);

	    for (let i = 0; i < countChar; i++) {
	      let index = expression.indexOf(root);
	      let indexExp = index - 1;
	      let expNumber = Number(expression[indexExp]) || 2;
	      let temp = '';

	      for (let j = index + 1; j < expression.length; j++) {
	        if (!isSpecial(expression[j])) {
	          temp += expression[j];
	        } else {
	          break;
	        }
	      }

	      let _temp;

	      if (expNumber === 2) {
	        _temp = root + temp;
	      } else {
	        _temp = expNumber + root + temp;
	      }

	      temp = Number(temp);
	      let replace = eval(`Math.pow(${temp}, 1/${expNumber})`);
	      expression = expression.replace(_temp, replace);
	    }
	  }

	  if (expression.includes(percent)) {
	    const countChar = _.count(expression, percent);

	    for (let i = 0; i < countChar; i++) {
	      let index = expression.indexOf(percent);
	      let temp = '';

	      for (let j = index - 1; j >= 0; j--) {
	        if (!isSpecial(expression[j])) {
	          temp += expression[j];
	        } else {
	          break;
	        }
	      }

	      temp = _.reverse(temp);
	      let _temp = temp + percent;
	      temp = Number(temp);
	      let replace = temp / 100;
	      expression = expression.replace(_temp, replace);
	    }
	  }

	  if (reFunctions.test(expression)) {
	    const match = expression.match(reFunctions);

	    for (let i = 0; i < match.length; i++) {
	      let index = expression.indexOf(match[i]);
	      let length = match[i].length;
	      let temp = '';

	      for (let j = index + length; j < expression.length; j++) {
	        if (!isSpecial(expression[j])) {
	          temp += expression[j];
	        } else {
	          break;
	        }
	      }

	      let _temp = match[i] + temp;
	      temp = Number(temp);
	      let fn = match[i].replace(/\W/, '');

	      if (fn === 'ln') {
	        fn = 'log';
	      } else if (fn === 'log') {
	        fn = 'log10';
	      }

	      let replace = eval(`Math.${fn}(${temp})`);
	      expression = expression.replace(_temp, replace);
	    }
	  }

	  return eval(expression);
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  count: function (string, char) {
	    let count = 0;

	    for (let i of string) {
	      if (char === i) {
	        count++;
	      }
	    }

	    return count;
	  },
	  reverse: function (string) {
	    let last = string.length - 1;
	    let temp = '';

	    for (let i = last; i >= 0; i--) {
	      temp += string[i];
	    }

	    return temp;
	  }
	};


/***/ }
/******/ ]);