const display = document.getElementById('display');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear');
const squareBtn = document.getElementById('square');

let firstValue = 0;
let operatorValue = '';
let nextValue = false;

function sendNumber(number) {
    if (nextValue) {
        display.textContent = number;
        nextValue = false
    } else {
        const displayValue = display.textContent
        display.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function square() {
    firstValue *= firstValue;
}

function reset() {
    display.textContent = '0';
    firstValue = 0;
    operatorValue;
    nextValue = false;
}

function addDecimal() {
    if (nextValue) return;

    if (!display.textContent.includes('.')) {
        display.textContent = `${display.textContent}.`
    }
}

const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,

}

function useOperator(operator) {
    const currentValue = Number(display.textContent);
    
    if(operatorValue && nextValue){
        operatorValue = operator;
        return
    }

    if (!firstValue) {
        firstValue = currentValue;
    } else{
        const calculation = calculate[operatorValue](firstValue, currentValue);
        display.textContent = calculation;
        firstValue = calculation;
    }
    nextValue = true;
    operatorValue = operator;

}

inputBtns.forEach(button => {

    if (button.classList.length === 0) {
        button.addEventListener('click', () => sendNumber(button.value));
    } else if (button.classList.contains('operator')) {
        button.addEventListener('click', () => useOperator(button.value));
    } else if (button.classList.contains('decimal')) {
        button.addEventListener('click', () =>  addDecimal());
    }
});

clearBtn.addEventListener('click', reset);