let num1 = 0
let num2 = 0
let finalValue = 0
let operator = ""
let displayValue = ""
let firstOperation = false /* a flag for if the calculator has not pressed a single operation button in its runtime yet, turn this flag on.
when this flag is on, any other button pressed to operate on will compute num1 and num2. */

let operatorOn = false // flag boolean value if the last button pressed was an operator.

let display = document.getElementById("display")
let buttons = document.querySelectorAll("button")

// Adds an event listener to ALL buttons on the calculator
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        updateDisplay(button)
    })
})

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

/* A function to highlight the operator button when pressed
function highlightOperator() {

}
*/

function resetCalculatorMemory() {
    num1 = 0
    num2 = 0
    finalValue = 0
    operator = ""
    displayValue = ""
    display.textContent = displayValue
    firstOperation = false
    operatorOn = false
}

function updateDisplay(button) {

    // Walk through two scenarios:
    // 1) If the display is empty, we can only add numbers
    // 2) If the display is not empty, we can add numbers or operators
    if(displayValue == "") {
        // if the button is a number... go ahead and add it
        if(!isNaN(button.textContent)) {
            console.log("Adding a digit to the display.")
            displayValue += button.textContent
            display.textContent = displayValue
            return
        }

        if(button.id === "clear") {
            console.log("Clearing an empty display (still valid, for purity purposes)")
            resetCalculatorMemory()
            return
        }

        if(button.id === "equals") {
            console.log("Computation with absolutely nothing in the display!")
            alert("What are you trying to compute? There's nothing in the display!")
            return
        }
        else {
            console.log("hello world\n")
            alert("There are no numbers yet in the display!")
            return
        }
    }


    // The case where the display is NOT empty
    else {
        if(button.id === "clear") {
            console.log("Clearing a display with content!")
            resetCalculatorMemory()
            return
        }

        // Case 1: a digit button
        if(!isNaN(button.textContent)) {
            // in the case where the last button was pressed was an operator.
            if(operatorOn === true) {
                console.log("Switching from operator to digit boolean.")
                operatorOn = false
                displayValue = ""
            }
            
            console.log("Adding a digit to the display.")
            displayValue += button.textContent
            display.textContent = displayValue
            return
        }

        // Case 2: an operator button
        if(button.classList.contains("operator")) {
            if(firstOperation === false) {
                console.log("First operation has been performed.")
                console.log("The display value is: " + displayValue)

                firstOperation = true
                operatorOn = true    

                num1 = displayValue
                operator = button.textContent
                console.log("Storing " + operator + " in the operator variable!")
                return
            }

            // this goes for anything after the first operation. 
            if(operatorOn === false) {
                operatorOn = true
                operator = button.textContent
                console.log("Storing " + operator + " in the operator variable!")
            }
            else {
                alert("You cannot stack one operator on top of another!")
                return
            }
        }

        if(button.id === "equals") {
            num2 = displayValue

            // edge cases
            if(operator === "/" && Number(num2) === 0) {
                alert("Error! You cannot divide by zero! Resetting calculator memory...")
                resetCalculatorMemory()
                display.textContent = "ERROR: DIVIDE BY 0"
                return
            }

            finalValue = operate(operator, Number(num1), Number(num2))
            console.log(finalValue)

            displayValue = finalValue
            display.textContent = displayValue
        }
    }
}