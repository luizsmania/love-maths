// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType)
            }
        })
    }

    document.getElementById("answer-box").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");

})

function runGame(gameType) {
    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;
    let num3 = Math.floor(Math.random() * 20) + 5;
    let num4 = Math.floor(Math.random() * 10) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2)
    } else if (gameType === "division") {
        displayDivisionQuestion(num3, num4)
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unkown game type: ${gameType} Aborting!`
    }
}


function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore()
    } else if (isNaN(userAnswer)) {
        alert("Did you forget to add your number?")
    } else {
        alert(`Awww... you answered ${userAnswer}. the correct answer was ${calculatedAnswer[0]}!`)
        incrementWrongAnswer()
    }

    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operand (the numbers and the operator (plus, minus etc))
 *Directyl from the dom, and returns the cosrect answer.
 */

function calculateCorrectAnswer() {

    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById("operator").innerText;
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    if (operator === "+") {
        if (isNaN(userAnswer)) {
            alert("Come on, at least try to answer it buddy")
        } else {
            return [operand1 + operand2, "addition"];
        }

    } else if (operator === "-") {
        if (isNaN(userAnswer)) {
            alert("Come on, at least try to answer it buddy")
        } else {
            return [operand1 - operand2, "subtract"];
        }
    } else if (operator === "X") {
        if (isNaN(userAnswer)) {
            alert("Come on, at least try to answer it buddy")
        } else {
            return [operand1 * operand2, "multiply"]
        }
    } else if (operator === "/") {
        if(isNaN(userAnswer)){alert("Come on, at least try to answer it buddy")} else {return [operand1 / operand2, "division"]}

        } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }

}

function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText)
    document.getElementById("score").innerText = ++oldScore;
}

function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText)
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';

}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = '-';
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = 'X';

}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '/';
}