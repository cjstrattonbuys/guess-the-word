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

const wordDots = function (word) {
    const dots = [];
    for (const letter of word) {
        console.log(letter);
        dots.push("●");
    }
    wordInProgress.innerText = dots.join("");
};
wordDots(word);

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
        updateLetters();
        updateWord(guessedLetters);
    }
};

const updateLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    //console.log (revealWord);
    winCheck();
};

const winCheck = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
    }
};