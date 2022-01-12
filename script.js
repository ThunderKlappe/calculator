//set constants
const MAX_DISPLAY_LENGTH = 12;
const MAX_EXPONENTIAL_LENGTH = 6;

//Get buttons and display area
const display = document.querySelector("#calc-display");
const numberButtons = document.querySelectorAll(".number-button");
const clearButton = document.querySelector("#clear");
const backButton = document.querySelector("#back");
const equalsButton = document.querySelector('#equals');
const negativeButton = document.querySelector("#negative");
const operatorButtons = document.querySelectorAll('.operator-button')

//global variables
let operand1;
let operand2;
let operator;
let newOp = true;

//add event listeners
numberButtons.forEach(button => button.addEventListener("click", addToDisplay));
backButton.addEventListener("click", backspace);
clearButton.addEventListener('click', clearAll);
operatorButtons.forEach(button => button.addEventListener("click", processOperator));
equalsButton.addEventListener("click", equals);
negativeButton.addEventListener("click", negative);


//*****FUNCTIONS*****

//this function takes a number button that has been pressed and adds it to the display
function addToDisplay(e){
    if(operator == "equals"){
        display.textContent = "";
        operator = "";
    }
    //clears the display if it's a new operator
    if(newOp == true){
        display.textContent = '';
        newOp = false;
        //reactivates the decimal event listener
        numberButtons[10].addEventListener("click", addToDisplay);
    }if(display.textContent.length <= 12){
        display.innerHTML += e.currentTarget.textContent;
        //if the decimal point was pressed remove the event listener
        if(e.currentTarget.textContent == "."){
            numberButtons[10].removeEventListener("click", addToDisplay);
        }
    }
}

//this function removes the last entered number
function backspace(){
    let currentText = display.textContent;
    if(currentText.length > 0){
        //reactivates the decimal event listener if the removed character was .
        if(currentText.slice(currentText.length-1, currentText.length)== "."){
        numberButtons[10].addEventListener("click", addToDisplay);
        }
        currentText = currentText.slice(0, currentText.length-1)
        display.textContent = currentText;
    }
}

//this functions removes all numbers from the register
function clearAll(){
    display.textContent = "";
    operand1 = null;
    operand2 = null;
    operator = null;
    //reactivates the decimal event listener
    numberButtons[10].addEventListener("click", addToDisplay);
}

//this function gets the current display value, saves it, checks if there was an operator 
//requested, and if so, calculates the operation. 
function processOperator(e){
    
    //if this is the first time something has been inputted, make operator1 that number
    if(!operand1){
        operand1 = Number(display.textContent);
        //get what operator was requested
        operator = e.currentTarget.id;
        e.currentTarget.classList.add("active");
        //mark that the calculator is ready for a new operator
        newOp = true;
    }else{
        //solve the operation
        equals(e);
        //get the new operator that was just selected.
        operator = e.currentTarget.id;
        e.currentTarget.classList.add("active");
        
    }
    //reactivates the decimal event listener
    numberButtons[10].addEventListener("click", addToDisplay);
    
}

//this function takes in 2 operands and an operator and returns the solution to the 
//requested operation
function operate(op1, op2, oper){
    if(oper == "add"){
        return op1 + op2
    }else if(oper == "subtract"){
        return op1 - op2
    }else if(oper == "multiply"){
        return op1 * op2
    }else if(oper == "divide"){
        return op1 / op2
    }else if(oper == "power"){
        return op1 ** op2
    }else{
        //if it wasn't an operator, just put back the original number
        return op2;
    }
}

function equals(e){
    if(operator !== null){
        //if there's already one operator, get operand2: the current value in the display
        operand2 = Number(display.textContent);
        //perform the operation with the first and second operand, and the LAST operator  
        //that was selected
        //save the result in operand1
        operand1 = operate(operand1, operand2, operator);
        //put the result into the display

        //if it's in exponential notation, only fill the display
        if( ("" + operand1).length > MAX_DISPLAY_LENGTH && ("" + operand1).includes("e")){
            display.textContent = operand1.toPrecision(MAX_EXPONENTIAL_LENGTH);
        }
        //if it's a long deciaml, only fill the display
        else if(("" + operand1).length > MAX_DISPLAY_LENGTH){
            display.textContent = (""+(Math.round(operand1*1000000000000)/1000000000000));
        }//if it's dividing by 0, give error
        else if(operand2 == 0 && operator == "divide"){
            display.textContent = "Can't do that!"   
        }
        //if it's an overflow, give error
        else if((""+operand1).includes("Infinity")){
            display.textContent = "Out of Bounds"
        }
        //if it's ok, give number.
        else{
            display.textContent = operand1;
        }
        //reset operand2
        operand2 = null;
        //reset operator
        operator = "equals";
    }
    //mark that the calculator is ready for a new operator
    newOp = true;
    operatorButtons.forEach(button => button.classList.remove("active"));
    
}

//this function switches if the number in the display is positive or negative
function negative(){
    if(display.textContent.slice(0,1) == '-'){
        display.textContent = display.textContent.slice(1, display.textContent.length);
    }else{
        display.textContent = `-${display.textContent}`;
    }
    newOp = false;
}