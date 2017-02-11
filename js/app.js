'use strict';

const parserExpression = require('./parser');

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
