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

//add event listeners
numberButtons.forEach(button => button.addEventListener("click", addToDisplay));



//this function takes a number button that has been pressed and adds it to the display
function addToDisplay(e){
    let currentText = display.textContent;
    if(currentText.length < 12){

        let number = e.target.textContent;
        display.textContent += number;
    }
}