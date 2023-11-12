let firstNum
let secondNum
let operator
let screenValue = ''
let isFloat = false
let isNegative = false
const options = ['+', '-', '*', '/']
const screen = document.querySelector('.screen')
const operators = document.querySelectorAll('.operatorBtn')
const numbers = document.querySelectorAll('.number')
const clear = document.querySelector('#ac')
const equal = document.querySelector('#equal')
const percent = document.querySelector('#percent')
const plusMinus = document.querySelector('#plusMinus')
const dot = document.querySelector('#dot')

const add = function (a, b) {
    a = parseFloat(a)
    b = parseFloat(b)
    return a + b
};
const subtract = function (a, b) {
    return a - b
};
const multiply = function (a, b) {
    return a * b
};
const divide = function (a, b) {
    return a / b
};

function operate(firstNum, secondNum, operator) {
    if (operator == options[0]) {
        return add(firstNum, secondNum)
    }
    else if (operator == options[1]) {
        return subtract(firstNum, secondNum)
    }
    else if (operator == options[2]) {
        return multiply(firstNum, secondNum)
    }
    else if (operator == options[3]) {
        return divide(firstNum, secondNum)
    }
}

numbers.forEach(num => {
    if (num.id != 'dot') {
        num.addEventListener('click', () => {
            if (screenValue.toString().length <= 6) {
                screenValue += num.textContent
                screen.textContent = screenValue
            }
        }
        )
    }
});

operators.forEach(op => {
    if (op.id != 'equal') {
        op.addEventListener('click', () => {

            if (!firstNum) {
                firstNum = screenValue
                operator = op.textContent
                screen.textContent = operator
                screenValue = ''
            }
            else {
                if (screenValue) {
                    secondNum = screenValue
                    screenValue = operate(firstNum, secondNum, operator)
                    if(screenValue.toString().length <= 12){
                        screen.textContent = screenValue
                        firstNum = undefined
                        secondNum = undefined}
                    else{
                        screen.textContent = 'output is too big'
                        firstNum = undefined
                        secondNum = undefined
                        screenValue = ''
                    }
                }
            }
        }
        )
    }
})

percent.addEventListener('click', () => {

        screenValue = Math.round((screenValue / 100) * 1000) / 1000
        screen.textContent = screenValue
        
})

plusMinus.addEventListener('click', () => {
    screenValue = screenValue * -1
    screen.textContent = screenValue
})


equal.addEventListener('click', () => {
    if (firstNum != undefined & screenValue.length < 5 & screenValue != 0) {
        secondNum = screenValue
        screenValue = operate(firstNum, secondNum, operator)
        screen.textContent = screenValue
        firstNum = undefined
        secondNum = undefined
    }
})

clear.addEventListener('click', () => {
    firstNum = undefined
    secondNum = undefined
    operator = undefined
    screenValue = ''
    screen.textContent = screenValue
})

dot.addEventListener('click', () => {
    if(!screenValue.toString().includes('.')){
        screenValue += '.'
        screen.textContent = screenValue
    }
})