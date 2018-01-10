let display = document.querySelector('input');
let numOne = '';
let numTwo = '';
let num = '';
let answer = '';
let decKey = false;
let operandButton = '';

const digits = document.getElementsByClassName('num');
for (let j = 0; j < digits.length; j++) {
  const digit = digits[j];
  digit.addEventListener('click', displayMouse);
}
const operations = document.getElementsByClassName('operator');
for (let k = 0; k < operations.length; k++) {
  let opButton = operations[k];
  opButton.addEventListener('click', operateNum);
}
const decimal = document.querySelector('#dec');
decimal.addEventListener('click', displayMouse);
const calculate = document.querySelector('#calc');
calculate.addEventListener('click', equalNum);
const clear = document.querySelector('#clear');
clear.addEventListener('click', clearNum);
disableButtons();
calculate.disabled = true;
document.addEventListener('keydown', useKey);


function useKey(e) {
  if (!isNaN(e.key)) displayKey(e.key)
  else if (e.key == '+') operateNumKey(add);
  else if (e.key == '-') operateNumKey(sub);
  else if (e.key == '*') operateNumKey(mult);
  else if (e.key == '/') operateNumKey(divi);
  else if (e.key == '.') {
    if (!decKey) {
      displayKey(e.key);
      decKey = true;
    }
  }
  else if (e.key == 'Backspace') clearNum();
  else if (e.key == 'Enter') equalNum();
  else if (e.key == '=') equalNum();
}

function displayMouse() {
  displayKey(this.textContent);
}

function displayKey(e) {
  if (numTwo) {
    if (equalNum.called) {
      softClear();
    }
  }
  num += e;
  display.value = num;
  if (e == '.') decimal.disabled = true;
  enableButtons();
  calculate.disabled = false;
  let button = document.querySelector('#' + 'b' + e);
  button.classList.add('button-transition');
}

function removeTransition(e) {
  this.classList.remove('button-transition');
}

const numButtons = document.querySelectorAll('.num, .use, .dot, .equals');
numButtons.forEach(numButton => numButton.addEventListener('transitionend', removeTransition));

function clearNum() {
  while (display.value) {
    display.value = '';
    num = '';
    numOne = '';
    numTwo = '';
    answer = '';
  }
  disableButtons();
  calculate.disabled = true;
  decimal.disabled = false;
  equalNum.called = false;
  decKey = false;
  let button = document.querySelector('#clear');
  button.classList.add('button-transition');
  operandButton.classList.remove('button-selected');
}

function softClear() {
  while (display.value) {
    display.value = '';
    num = '';
    numOne = '';
    numTwo = '';
    answer = '';
  }
  disableButtons();
  calculate.disabled = true;
  decimal.disabled = false;
  equalNum.called = false;
  decKey = false;
}

function operateNumKey(e) {
  if (numOne) {
    if (equalNum.called) {
      numTwo = '';
      num = '';
      operator = eval(e);
    } else {
      softEqual();
      num = '';
      numTwo = '';
      operator = eval(e);
    }
    if (operandButton) {
      operandButton.classList.remove('button-selected');
      operandButton = document.querySelector('#' + e.name);
      operandButton.classList.add('button-selected');
    }
  } else {
    numOne = parseFloat(num);
    operator = eval(e);
    num = '';
    operandButton = document.querySelector('#' + e.name);
    operandButton.classList.add('button-selected');
  }
  disableButtons();
  decimal.disabled = false;
  decKey = false;
}

function operateNum() {
  if (numOne) {
    if (equalNum.called) {
      numTwo = '';
      num = '';
      operator = eval(this.id);
    } else {
      softEqual();
      num = '';
      numTwo = '';
      operator = eval(this.id);
    }
    if (operandButton) {
      operandButton.classList.remove('button-selected');
      operandButton = document.querySelector('#' + this.id);
      operandButton.classList.add('button-selected');
    }
  } else {
    numOne = parseFloat(num);
    operator = eval(this.id);
    num = '';
    operandButton = document.querySelector('#' + this.id);
    operandButton.classList.add('button-selected');
  }
  disableButtons();
  decimal.disabled = false;
  decKey = false;}

function equalNum() {
  numTwo = parseFloat(num);
  answer = operate(numOne, numTwo, operator);
  if (numTwo == 0 && operator == divi) {
    display.value = "TO INFINITY AND BEYOND!";
  } else {
    display.value = +answer.toFixed(10);
    numOne = answer;
    num = numTwo;
  }
  enableButtons();
  equalNum.called = true;
  decimal.disabled = false;
  decKey = false;
  let button = document.querySelector('#calc');
  button.classList.add('button-transition');
  operandButton.classList.remove('button-selected');
}

function softEqual() {
  numTwo = parseFloat(num);
  answer = operate(numOne, numTwo, operator);
  if (numTwo == 0 && operator == divi) {
    display.value = "TO INFINITY AND BEYOND!";
  } else {
    display.value = +answer.toFixed(10);
    numOne = answer;
    num = numTwo;
  }
  enableButtons();
  decimal.disabled = false;
  decKey = false;
}

function disableButtons() {
  for (let i = 0; i < operations.length; i++) {
    const operButton = operations[i];
    operButton.disabled = true;
  }
}

function enableButtons() {
  for (let i = 0; i < operations.length; i++) {
    const operButton = operations[i];
    operButton.disabled = false;
  }
}

function add(numOne, numTwo) {
  return numOne + numTwo;
}

function sub(numOne, numTwo) {
  return numOne - numTwo;
}

function mult(numOne, numTwo) {
  return numOne * numTwo;
}

function divi(numOne, numTwo) {
  return numOne / numTwo;
}

function operate(numOne, numTwo, operator) {
  return operator(numOne, numTwo);
}
