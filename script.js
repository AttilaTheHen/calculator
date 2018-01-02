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
  if (this.textContent == '.') decimal.disabled = true;
  enableButtons();
  calculate.disabled = false;
}

function clearNum() {
  while (display.value) {
    display.value = '';
    num = '';
    numOne = '';
    numTwo = '';
  }
  disableButtons();
  calculate.disabled = true;
  decimal.disabled = false;
}

function operateNum() {
  if (numOne) {
    if (equalNum.called) {
      numTwo = '';
      num = '';
      operator = eval(this.id);
    } else {
      equalNum();
      num = '';
      numOne = answer;
      operator = eval(this.id);
    }
  } else {
    numOne = parseFloat(num);
    operator = eval(this.id);
    num = '';
  }
  disableButtons();
  decimal.disabled = false;
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

let display = document.querySelector('input');
let numOne = '';
let numTwo = '';
let num = '';
let answer = '';
let counter = 0;

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
const clear = document.querySelector('#clear');
clear.addEventListener('click', clearNum);
disableButtons();
calculate.disabled = true;
// window.addEventListener('keydown', useKey);
//
// function useKey(event) {
//   var key = event.key;
//   displayNum2(key);
// }
// Still need to add: keyboard support. Also keep tweaking styling. -12/27
