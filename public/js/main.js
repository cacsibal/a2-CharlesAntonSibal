// FRONT-END (CLIENT) JAVASCRIPT HERE

const gameStorage = []
let id = 0

const submit = async function (event) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()

    const input = document.querySelector("#guess"),
        guessValue = parseInt(input.value),
        json = {guess: parseInt(input.value)},
        body = JSON.stringify(json)

    const response = await fetch("/submit", {
        method: "POST",
        body
    })

    const text = await response.text()

    // Also update the gameStorage array
    const currentIndex = gameStorage.findIndex(game => game.id === window.currentGame.id);
    if (currentIndex !== -1) {
        gameStorage[currentIndex].guesses.push(guessValue);
    }

    console.log(gameStorage)
}

const initGame = function () {
    const gameData = {
        id: id++,
        answer: Math.floor(Math.random() * 10) + 1,
        guesses: [],
        wonGame: false
    };

  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameData)
  })
      .then(response => response.text())
      .then(data => {
        console.log('Game initialized:', data);
        gameStorage.push(gameData);
        window.currentGame = gameData;
      })
      .catch(error => {
        console.error('Error initializing game:', error);
      });
}

const view = function (event) {

}

window.onload = function () {
    initGame();

    const guessButton = document.querySelector("#guess-button");
    guessButton.onclick = submit;

    const viewButton = document.querySelector("#view-button");
    const resetButton = document.querySelector("#reset-button");
}