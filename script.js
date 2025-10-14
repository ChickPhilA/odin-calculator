let num1 = undefined
let num2 = undefined
let lastOperand = 0
let finalValue = 0
let operator = ""
let displayValue = ""


// Flags below
let firstOperation = false /* a flag for if the calculator has not pressed a single operation button in its runtime yet, turn this flag on.
when this flag is on, any other button pressed to operate on will compute num1 and num2. */

let operatorOn = false // flag boolean value if the last button pressed was an operator.
let equalsLastPressed = false // flag for if the equals sign button has been previously been pressed, making a computation.

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
    return a / b
}

function operate(operator, a, b) {
    let numA = parseFloat(a)
    let numB = parseFloat(b)

    switch(operator) {
        case "+":
            return add(numA, numB)
        case "-":
            return subtract(numA, numB)
        case "*":
            return multiply(numA, numB)
        case "/":
            return divide(numA, numB)
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
    equalsLastPressed = false
}

function updateDisplay(button) {

    // Walk through two scenarios:
    // 1) If the display is empty, we can only add numbers
    // 2) If the display is not empty, we can add numbers or operators


     /////////////// CASE WHERE DISPLAY IS EMPTY ///////////////
    if(displayValue == "") {

        // if the button is a number... go ahead and add it
        if(!isNaN(button.textContent)) {
            console.log("[CASE 1] Adding the digit " + button.textContent + " to the display.")
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
            alert("There are no numbers yet in the display!")
            return
        }
    }



    /////////////// CASE WHERE DISPLAY IS NOT EMPTY ///////////////
    else {
        if(button.id === "clear") {
            console.log("[CASE 2.1]: Clearing a display with content!")
            resetCalculatorMemory()
            return
        }


        // a NUMBER/DIGIT
        if(!isNaN(button.textContent)) {
            
            // in the case where the last button was pressed was an operator.
            if(operatorOn === true) {
                console.log("[CASE 2.21: Switching from operator to digit boolean.")
                operatorOn = false
                displayValue = ""
            }

            // if the finalResult variable currently has a value. (?)
            if(equalsLastPressed === true) {
                display.textContent = ""
                console.log("[CASE 2.22: Entering a digit again after completing a computation.")

                num1 = finalValue // storing the previous final answer in num1 if stacking computations
                displayValue = button.textContent
                display.textContent += displayValue

                equalsLastPressed = false
                return
            }
            
            console.log("[CASE 2.23] Adding the digit " + button.textContent + " to the display.")
            displayValue += button.textContent
            display.textContent = displayValue
            return
        }


        // an operator button (+ - x /) has been pressed. (case 2.3)
        if(button.classList.contains("operator")) {

            // BOOLEAN FLAG PERFORMING VERIFYING THE VERY FIRST OPERATION.
            if(firstOperation === false && equalsLastPressed === false) {
                console.log("[CASE 2.31]: First operation has been performed.")
                console.log("The display value is: " + displayValue)

                firstOperation = true
                operatorOn = true    

                num1 = parseFloat(displayValue)

                operator = button.textContent
                console.log("Storing " + operator + " in the operator variable!")
                return
            }

            if(operatorOn === true) {
                alert("An operator " + operator + "has currently been pressed!")
                return
            }

            console.log("[CASE 2.32]: Stacking operators on top of each other")            
            num2 = displayValue

            finalValue = operate(operator, num1, num2)
            num1 = finalValue // stores the finalValue in num1 for the next operation
            displayValue = finalValue
            display.textContent = displayValue
            
            operator = button.textContent
            operatorOn = true
        }



        // when the equals button is pressed
        if(button.id === "equals") {
            console.log("--- [CASE 2.5]: STARTING EQUALS ---");
            console.log("num1 BEFORE calculation: " + num1); // Check this value
            console.log("displayValue (for num2) BEFORE calculation: " + displayValue); // Check this value

            if(operator === "" || num2 === undefined) {
                alert("[ERROR] Operation build not complete! Resetting memory...")
                resetCalculatorMemory()
                return
            }

            // edge cases (e.g. dividing by 0)
            if(operator === "/" && num2 === 0) {
                alert("[ERROR] You cannot divide by zero! Resetting calculator memory...")
                resetCalculatorMemory()
                display.textContent = "ERROR: DIVIDE BY 0"
                return
            }

            // lastOperand = num2
            console.log("We are about to do our equals calculation. Num1 is " + num1 + " and num2 is " + num2)
    
            if(equalsLastPressed === false) {
                num2 = parseFloat(displayValue) // finally stores the second number being computed
                lastOperand = num2
                equalsLastPressed = true
            }
            else { // repeatedly pressing equals
                num2 = lastOperand
                equalsLastPressed = false 
            }

            finalValue = operate(operator, num1, num2)
            console.log("The FINAL VALUE after the operation is " + finalValue)

            displayValue = finalValue
            display.textContent = displayValue
            
            num1 = finalValue
            equalsLastPressed = true
        }

    }
}