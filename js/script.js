const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const request = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const wordList = await request.text();
    const wordArray = wordList.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    wordDots(word);
    console.log(word);
}

getWord();

const wordDots = function (word) {
    const dots = [];
    for (const letter of word) {
        //console.log(letter);
        dots.push("●");
    }
    wordInProgress.innerText = dots.join("");
};

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
        updateRemainingGuesses(guess);
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

const updateRemainingGuesses = function (guess) {
    const wordUpper = word.toUpperCase();
    if (!wordUpper.includes(guess)) {
        message.innerText = `That's not right, the word has no ${guess}!`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good job! The word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerText = `Game over! The word was ${word}`;
        //remainingSpan.innerText = "0 guesses";
        startOver();
    } else if (remainingGuesses === 1) {
        remainingSpan.innerText = "1 guess"
    } else {
        remainingSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const winCheck = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remaining.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function(e) {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";

    guessButton.classList.remove("hide");
    remaining.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgain.classList.add("hide");

    getWord();
});