let num1 = 0
let num2 = 0
let operator = ""

let display = document.getElementById("display")

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    // Case to handle dividing by zero
    if(a / b == 0) {
        return "Error"
    }

    return a / b
}

function operate(operator, a, b) {
    switch(operator) {
        case "+":
            return add(a, b)
        case "-":
            return subtract(a, b)
        case "*":
            return multiply(a, b)
        case "/":
            return divide(a, b)
        default:
            return null
    }
}