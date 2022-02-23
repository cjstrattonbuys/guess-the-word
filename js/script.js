const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";
let guessedLetters = [];

const updateWord = function (word) {
    const dots = [];
    for (const letter of word) {
        console.log(letter);
        dots.push("●");
    }
    wordInProgress.innerText = dots.join("");
};
updateWord(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letter.value;
    const goodGuess = validateInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    }
    letter.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "You didn't enter a letter, silly!";
    } else if (input.length > 1) {
        message.innerText = "Only one letter, please!";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "That's not a letter!";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that one, try again!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};