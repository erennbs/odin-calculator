const numberButtons = document.querySelectorAll('button.number');
const operatorButtons = document.querySelectorAll('button.operator');
const otherButoons = document.querySelectorAll('button.other');
const calculationScreen = document.querySelector('.calculation');
const answerScreen = document.querySelector('.answer');

numberButtons.forEach((btn) => btn.addEventListener('click', onNumberClick));
operatorButtons.forEach((btn) => btn.addEventListener('click', onOperatorClick));
otherButoons.forEach((btn) => btn.addEventListener('click', onOthersClick));

let num1 = '';
let num2 = '';
let operator = null;

function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return +a - +b;
}

function multiply(a, b) {
    return +a * +b;
}

function divide(a, b) {
    if (+b === 0) return NaN;

    result = (+a / +b);

    if(result.toString().includes('.')) {
        return +result.toFixed(5);
    }

    return result;
}

function operate(num1, num2, operator) {
    if (operator === '+') return add(num1, num2);
    if (operator === '-') return subtract(num1, num2);
    if (operator === '*') return multiply(num1, num2);
    if (operator === '/') return divide(num1, num2);
}

function onNumberClick(e) {
    if (!operator) {
        // We are entering the first number
        num1 += e.target.value;
        updateAnswerDiv(num1);
    } else {
        // We are entering the second number
        num2 += e.target.value;
        updateAnswerDiv(num2);
    }
}

function onOperatorClick(e) {
    if (!operator) {
        operator = e.target.value;
    } else {
        if (num2) {
            result = operate(num1, num2, operator);
            num1 = result.toString();
            num2 = '';
            operator = e.target.value;
            updateAnswerDiv(result);
        } else {
            // Second number not entered
            operator = e.target.value;
        }
    }
    updateCalculationDiv(`${num1} ${operator} `);
}

function onOthersClick(e) {
    switch (e.target.value) {
        case 'ac':
            resetCalculator();
            break;
        case 'c':
            removeLastDigit();
            break;
        case '=':
            calculate();
            break;    
        default:
            break;
    }
}

function resetCalculator() {
    num1 = '';
    num2 = '';
    operator = null;
    updateCalculationDiv('');
    updateAnswerDiv('');
}

function removeLastDigit() {
    if (!operator) {
        num1 = num1.slice(0, -1);
        updateAnswerDiv(num1);
    } else {
        num2 = num2.slice(0, -1);
        updateAnswerDiv(num2);
    }
}

function calculate() {
    if (!operator || !num1 || !num2) return;

    result = operate(num1, num2, operator);
    updateCalculationDiv(`${num1} ${operator} ${num2} =`);
    updateAnswerDiv(result);
    num1 = result.toString();
    num2 = '';
    operator = null;
}

function updateCalculationDiv(text) {
    calculationScreen.textContent = text;
}

function updateAnswerDiv(text) {
    answerScreen.textContent = text;
}