//Get buttons and display area
const display = document.querySelector("#calc-display");
const numberButtons = document.querySelectorAll(".number-button");
const clearButton = document.querySelector("#clear");
const backButton = document.querySelector("#back");
const powerButton = document.querySelector("#power");
const addButton = document.querySelector("#add");
const subtractButton = document.querySelector('#subtract');
const multiplyButton = document.querySelector('#multiply');
const divideButton = document.querySelector('#divide');
const equalsButton = document.querySelector('#equals');

const maxDisplayLength = 12;

//add event listeners
numberButtons.forEach(button => button.addEventListener("click", addToDisplay));
backButton.addEventListener("click", backspace);



//this function takes a number button that has been pressed and adds it to the display
function addToDisplay(e){
    if(display.textContent.length < maxDisplayLength){

        let number = e.target.textContent;
        display.textContent += number;
    }
}

//this function removes the last entered number
function backspace(){
    let currentText = display.textContent;
    if(currentText.length > 0){
        currentText = currentText.slice(0, currentText.length-1)
        display.textContent = currentText;
    }
}
