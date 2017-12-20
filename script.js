function add(numOne, numTwo) {
  return numOne + numTwo;
}
function subtract(numOne, numTwo) {
  return numOne - numTwo;
}
function multiply(numOne, numTwo) {
  return numOne * numTwo;
}
function divide(numOne, numTwo) {
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

function addNum() {
  numOne = parseInt(num);
  operator = add;
  num = '';
}
function subNum() {
  numOne = parseInt(num);
  operator = subtract;
  num = '';
}
function multNum() {
  numOne = parseInt(num);
  operator = multiply;
  num = '';
}
function divNum() {
  numOne = parseInt(num);
  operator = divide;
  num = '';
}

function equalNum() {
  numTwo = parseInt(num);
  let answer = operate(numOne, numTwo, operator);
  display.value = answer;
  num = '';
  numOne = '';
  numTwo = '';
}

let display = document.querySelector('input');
let numOne = '';
let numTwo = '';
let num = '';
let operator = '';

const digits = document.getElementsByClassName('num');
for (let i = 0; i < digits.length; i++) {
  const test = digits[i];
  test.addEventListener('click', displayNum);
} // This block of code (starting at 'const digits') attaches a click event to each number button on the calculator.
// Basic order of figuring this out: attach click events to buttons so that a certain function runs when the right button is clicked, write functions that dictate what happens when the function runs

const addition = document.querySelector('#add');
addition.addEventListener('click', addNum);
const subtraction = document.querySelector('#sub');
subtraction.addEventListener('click', subNum);
const multiple = document.querySelector('#mult');
multiple.addEventListener('click', multNum);
const division = document.querySelector('#divi');
division.addEventListener('click', divNum);

const calculate = document.querySelector('#calc');
calculate.addEventListener('click', equalNum);

const clear = document.querySelector('#clear');
clear.addEventListener('click', clearNum);
