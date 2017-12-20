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
  }
}

let display = document.querySelector('input');
let numOne = '';
let numTwo = '';
let num = '';

const buttons = document.getElementsByClassName('num');
for (let i = 0; i < buttons.length; i++) {
  const test = buttons[i];
  test.addEventListener('click', displayNum);
} // This block of code attaches a click event to each number button on the calculator.

const clear = document.querySelector('#clear');
clear.addEventListener('click', clearNum);
