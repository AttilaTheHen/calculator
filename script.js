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

function displayNum(e) {
  num += e.target.textContent;
  display.value = num;
}
function clearNum() {
  while (display.value) {
    display.value = '';
    num = '';
  }
}
function operateNum(e) {
  if (numOne) {
    numTwo = parseInt(num);
    answer = operate(numOne, numTwo, operator);
    display.value = answer;
    num = '';
    numOne = answer;
    operator = eval(this.id);
  } else {
    numOne = parseInt(num);
    operator = eval(this.id);
    num = '';
  }
}
function equalNum() {
  numTwo = parseInt(num);
  answer = operate(numOne, numTwo, operator);
  display.value = answer;
  num = '';
  numOne = '';
  numTwo = '';
}

let display = document.querySelector('input');
let numOne = '';
let numTwo = '';
let num = '';
let answer = '';

const digits = document.getElementsByClassName('num');
for (let i = 0; i < digits.length; i++) {
  const test = digits[i];
  test.addEventListener('click', displayNum);
}
const operations = document.getElementsByClassName('operator');
for (let j = 0; j < operations.length; j++) {
  const opButton = operations[j];
  opButton.addEventListener('click', operateNum)
}
const calculate = document.querySelector('#calc');
calculate.addEventListener('click', equalNum);
const clear = document.querySelector('#clear');
clear.addEventListener('click', clearNum);
