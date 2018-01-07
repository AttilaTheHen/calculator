let display = document.querySelector('input');
let numOne = '';
let numTwo = '';
let num = '';
let answer = '';
let counter = 0;
let fired = false;

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

// NEED TO FIX FUNCTIONALITY - when calling equalNum and finishing calculation, the program currently properly takes it from there if you call another operation on it. For instance, 3 + 5 = 8. + 2 = 10. This all works properly. Need to make it so that this happens AND if you instead just start inputting a number instead of an operation with clearing, then it automatically clears. For instance, currently if you do 3 + 5 = 8. 2 + ... it'll just add 2 to 5 and make it 52. Trying to fiddle with the displayKey function and with the first 'if' statement right now. I've commented it out for now. -1/6

function displayKey(e) {
  // if (display.value && equalNum.called) {
  //   num = '';
  //   numOne = '';
  //   numTwo = '';
  // }
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
