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
// function addNum() {
//   numOne = parseInt(num);
//   operator = add;
//   num = '';
// }
// function subNum() {
//   numOne = parseInt(num);
//   operator = subtract;
//   num = '';
// }
// function multNum() {
//   numOne = parseInt(num);
//   operator = multiply;
//   num = '';
// }
// function divNum() {
//   numOne = parseInt(num);
//   operator = divide;
//   num = '';
// }
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
  // numOne = parseInt(num);
  // operator = eval(this.id);
  // num = '';
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
// let operator = '';
let answer = '';

const digits = document.getElementsByClassName('num');
for (let i = 0; i < digits.length; i++) {
  const test = digits[i];
  test.addEventListener('click', displayNum);
} // This block of code (starting at 'const digits') attaches a click event to each number button on the calculator.
// Basic order of figuring this out: attach click events to buttons so that a certain function runs when the right button is clicked, write functions that dictate what happens when the function runs

const operations = document.getElementsByClassName('operator');
for (let j = 0; j < operations.length; j++) {
  const opButton = operations[j];
  opButton.addEventListener('click', operateNum)
}

// const addition = document.querySelector('#add');
// addition.addEventListener('click', operateNum(add));
// const subtraction = document.querySelector('#sub');
// subtraction.addEventListener('click', operateNum(subtract));
// const multiple = document.querySelector('#mult');
// multiple.addEventListener('click', operateNum(multiply));
// const division = document.querySelector('#divi');
// division.addEventListener('click', operateNum(divide));

const calculate = document.querySelector('#calc');
calculate.addEventListener('click', equalNum);

const clear = document.querySelector('#clear');
clear.addEventListener('click', clearNum);
