'use strict';

const _ = require('./tools');

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
