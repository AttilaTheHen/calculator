let display = document.querySelector('input');
let numOne = '';
let numTwo = '';
let num = '';
let answer = '';
let decKeyDisabled = false;
let opKeyDisabled = true;
let calcKeyDisabled = true;
let operandButton = '';
let numberButton = '';
let dotButton = '';

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
const clear = document.querySelector('#clear');
clear.addEventListener('click', clearNum);
const decimal = document.querySelector('#dec');
decimal.addEventListener('click', displayMouse);
const calculate = document.querySelector('#calc');
calculate.addEventListener('click', equalNum);
disableButtons();
calculate.disabled = true;
const numButtons = document.querySelectorAll('.num, .use, .dot, .equals');
numButtons.forEach(numButton => numButton.addEventListener('transitionend', removeTransition));
document.addEventListener('keydown', useKey);

function useKey(e) {
  document.activeElement.blur();
  if (!isNaN(e.key)) displayKey(e.key)
  else if (e.key == '+') {
    if (!opKeyDisabled) {
      operateNumKey(add);
      opKeyDisabled = true;
    }
  } else if (e.key == '-') {
    if (!opKeyDisabled) {
      operateNumKey(sub);
      opKeyDisabled = true;
    }
  } else if (e.key == '*') {
    if (!opKeyDisabled) {
      operateNumKey(mult);
      opKeyDisabled = true;
    }
  } else if (e.key == '/') {
    if (!opKeyDisabled) {
      operateNumKey(divi);
      opKeyDisabled = true;
    }
  } else if (e.key == '.') {
    if (!decKeyDisabled) {
      displayKey(e.key);
      decKeyDisabled = true;
    }
  } else if (e.key == 'Backspace') {
    clearNum();
  } else if (e.key == 'Enter') {
    if (!calcKeyDisabled) {
      equalNum();
    }
  } else if (e.key == '=') {
    if (!calcKeyDisabled) {
      equalNum();
    }
  }
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
  if (numOne) {
    calcKeyDisabled = false;
  }
  num += e;
  display.value = num;
  if (e == '.') {
    decimal.disabled = true;
    decKeyDisabled = true;
    dotButton = document.querySelector('#dec');
    dotButton.classList.add('button-transition');
  } else {
    numberButton = document.querySelector('#' + 'b' + e);
    numberButton.classList.add('button-transition');
  }
  enableButtons();
  opKeyDisabled = false;
  calculate.disabled = false;
}

function removeTransition() {
  this.classList.remove('button-transition');
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
  opKeyDisabled = true;
  calculate.disabled = true;
  decimal.disabled = false;
  equalNum.called = false;
  decKeyDisabled = false;
  let button = document.querySelector('#clear');
  button.classList.add('button-transition');
  if (operandButton) {
    operandButton.classList.remove('button-selected');
  }
  calcKeyDisabled = true;
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
  decKeyDisabled = false;
  opKeyDisabled = true;
  calcKeyDisabled = true;
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
  calculate.disabled = true;
  decKeyDisabled = false;
  opKeyDisabled = true;
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
  calculate.disabled = true;
  decKeyDisabled = false;
  opKeyDisabled = true;
  calcKeyDisabled = true;
}

function equalNum() {
  numTwo = parseFloat(num);
  answer = operate(numOne, numTwo, operator);
  if (numTwo == 0 && operator == divi) {
    display.value = "INFINITY!";
    num = '';
    numOne = '';
    numTwo = '';
    answer = '';
    disableButtons();
    calculate.disabled = true;
    equalNum.called = false;
    opKeyDisabled = true;
    calcKeyDisabled = true;
  } else {
    display.value = +answer.toFixed(10);
    numOne = answer;
    num = numTwo;
    opKeyDisabled = false;
    enableButtons();
    equalNum.called = true;
  }
  // enableButtons();
  // opKeyDisabled = false;
  // equalNum.called = true;
  decimal.disabled = false;
  decKeyDisabled = false;
  let button = document.querySelector('#calc');
  button.classList.add('button-transition');
  operandButton.classList.remove('button-selected');
}

function softEqual() {
  numTwo = parseFloat(num);
  answer = operate(numOne, numTwo, operator);
  if (numTwo == 0 && operator == divi) {
    display.value = "INFINITY!";
    num = '';
    numOne = '';
    numTwo = '';
    answer = '';
    disableButtons();
    calculate.disabled = true;
    equalNum.called = false;
    opKeyDisabled = true;
    calcKeyDisabled = true;
  } else {
    display.value = +answer.toFixed(10);
    numOne = answer;
    num = numTwo;
    opKeyDisabled = false;
    enableButtons();
    equalNum.called = true;
  }
  // enableButtons();
  // opKeyDisabled = false;
  decimal.disabled = false;
  decKeyDisabled = false;
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
