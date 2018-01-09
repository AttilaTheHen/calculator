let display = document.querySelector('input');
let numOne = '';
let numTwo = '';
let num = '';
let answer = '';

const digits = document.getElementsByClassName('num');
for (let i = 0; i < digits.length; i++) {
  const digit = digits[i];
  digit.addEventListener('click', displayMouse);
}
const operations = document.getElementsByClassName('operator');
for (let j = 0; j < operations.length; j++) {
  const opButton = operations[j];
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
  else if (e.key == '.') displayKey(e.key);
  else if (e.key == 'Backspace') clearNum();
  else if (e.key == 'Enter') equalNum();
}

function displayMouse() {
  displayKey(this.textContent);
}

function displayKey(e) {
  if (numTwo) {
    clearNum();
  }
  num += e;
  display.value = num;
  if (e == '.') decimal.disabled = true;
  enableButtons();
  calculate.disabled = false;
}

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
}

function operateNumKey(e) {
  if (numOne) {
    if (equalNum.called) {
      numTwo = '';
      num = '';
      operator = eval(e);
    } else {
      equalNum();
      num = '';
      numOne = answer;
      operator = eval(e);
    }
  } else {
    numOne = parseFloat(num);
    operator = eval(e);
    num = '';
  }
  disableButtons();
  decimal.disabled = false;
}

function operateNum() {
  operateNumKey(this.id);
}

function equalNum() {
  numTwo = parseFloat(num);
  answer = operate(numOne, numTwo, operator);
  if (numTwo == 0 && operator == divi) {
    display.value = "TO INFINITY AND BEYOND!";
  } else {
    display.value = +answer.toFixed(10);
    numOne = answer;
    numTwo = num;
  }
  enableButtons();
  equalNum.called = true;
  decimal.disabled = false;
}

function disableButtons() {
  for (let k = 0; k < operations.length; k++) {
    const operButton = operations[k];
    operButton.disabled = true;
  }
}

function enableButtons() {
  for (let k = 0; k < operations.length; k++) {
    const operButton = operations[k];
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
