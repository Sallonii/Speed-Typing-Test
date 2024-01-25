let quoteDisplayEl = document.getElementById("quoteDisplay");
let quoteInputeEl = document.getElementById("quoteInput");
let resultEl = document.getElementById("result");
let timerEl = document.getElementById("timer");
let bgContainerEl = document.getElementById("bgContainer")
let resultContainerEl = document.getElementById("resultContainer")

let spinnerEl = document.getElementById("spinner");
spinnerEl.classList.remove("d-none");

let options = {
    method: "GET"
}
let url = "https://apis.ccbp.in/random-quote";

function generateText() {
    bgContainerEl.appendChild(resultContainerEl);
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            quoteDisplayEl.textContent = jsonData.content;
            spinnerEl.classList.add("d-none");
        });
}
generateText();

function checkResult(timer, intervalId) {
    if (quoteInputeEl.value === quoteDisplayEl.textContent) {
        resultEl.textContent = "You typed in " + timer + " seconds";
        clearInterval(intervalId);
    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }
}

function startTimer() {
    let countdown = 0;
    let intervalId = setInterval(function() {
        countdown = countdown + 1;
        timerEl.textContent = countdown;
    }, 1000);
    return intervalId;
}
let id = startTimer();
console.log(id);
let submitBtnEl = document.getElementById("submitBtn");
submitBtnEl.addEventListener("click", function(event) {
    event.preventDefault();
    checkResult(timerEl.textContent, id);
});

let resetBtnEl = document.getElementById("resetBtn");
resetBtnEl.onclick = function() {
    quoteInputeEl.value = '';
    resultEl.textContent = '';
    event.preventDefault();
    clearInterval(id);
    startTimer();
    generateText();
}
