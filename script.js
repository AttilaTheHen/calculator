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

function displayNum() {
  num += this.textContent;
  display.value = num;
  calculate.disabled = false;
  if (this.textContent == '.') this.disabled = true;
}
function clearNum() {
  while (display.value) {
    display.value = '';
    num = '';
    numOne = '';
    numTwo = '';
    calculate.disabled = true;
    decimal.disabled = false;
  }
}
function operateNum() {
  if (numOne) {
    equalNum();
    num = '';
    numOne = answer;
    operator = eval(this.id);
  } else {
    numOne = parseFloat(num);
    operator = eval(this.id);
    num = '';
  }
  decimal.disabled = false;
}
function equalNum() {
  numTwo = parseFloat(num);
  answer = operate(numOne, numTwo, operator);
  if (numTwo == 0 && operator == divi) {
    display.value = "TO INFINITY AND BEYOND!";
  } else {
    display.value = answer;
    numOne = answer;
    numTwo = num;
  }
  decimal.disabled = true;
}

let display = document.querySelector('input');
let numOne = '';
let numTwo = '';
let num = '';
let answer = '';

const digits = document.getElementsByClassName('num');
for (let i = 0; i < digits.length; i++) {
  const digit = digits[i];
  digit.addEventListener('click', displayNum);
}
const operations = document.getElementsByClassName('operator');
for (let j = 0; j < operations.length; j++) {
  const opButton = operations[j];
  opButton.addEventListener('click', operateNum);
}
const decimal = document.querySelector('#dec');
decimal.addEventListener('click', displayNum);
const calculate = document.querySelector('#calc');
calculate.addEventListener('click', equalNum);
calculate.disabled = true;
const clear = document.querySelector('#clear');
clear.addEventListener('click', clearNum);
