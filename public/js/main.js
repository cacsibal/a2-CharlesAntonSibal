// FRONT-END (CLIENT) JAVASCRIPT HERE

/* documentation generated with ai */

let i = 0;
let hidden = true;

/**
 * Handles the form submission, sends a POST request to the "/guess" endpoint with the user's input value,
 * and processes the server's response to determine the next steps in the game.
 *
 * @async
 * @function
 * @param {Event} event - The event object associated with the form submission.
 * @throws Will throw an error if the fetch request fails.
 */
const submit = async function () {
    event.preventDefault()

    const input = document.querySelector("#yourname"),
        json = {
            gameId: i,
            guess: parseInt(input.value)
        },
        body = JSON.stringify(json)

    const response = await fetch("/guess", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body
    });

    const output = await response.text();

    if(output === "correct") {
        i++;
        initialize();
    }
}

/**
 * Initializes a new game session by creating a game object with random parameters and sending it to the server.
 *
 * This function generates a random number as the answer, prepares a JSON payload with the game's state,
 * and makes an asynchronous POST request to the server to start a new game session.
 *
 * @async
 * @function initGame
 *
 * @returns {Promise<void>} A promise that resolves once the game initialization request is completed.
 */
const initGame = async function () {
    const json =
        {
            gameId: i,
            answer: Math.floor(Math.random() * 10) + 1,
            guesses: [],
            won: false
        },
        body = JSON.stringify(json);

    const response = await fetch("/game", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body
    });
}

/**
 * Initializes the game by calling the `initGame` function.
 * Executes logic to handle the successful initialization or
 * errors encountered during the initialization process.
 *
 * The function performs the following:
 * - Invokes the asynchronous `initGame` function.
 * - Logs "game started" to the console upon successful completion.
 * - Logs any encountered errors to the console if `initGame` fails.
 */
const initialize = function () {
    initGame()
        .then(() => {
            console.log("game started");
        })
        .catch(err => {
            console.log(err);
        });

}

const displayGames = async function () {
    let statElements = document.querySelectorAll(".stat");
    statElements.forEach(stat => stat.remove())

    console.log(document.getElementsByClassName("stat").length)

    const response = await fetch("/stats", {
        method: "GET"
    })

    let stats = await response.text();
    const statsList = JSON.parse(stats);
    statsList.map(stat => {
        let container = document.createElement("div");
        container.classList.add("stat");
        container.classList.add(hidden ? "hidden" : "visible");
        container.innerHTML = JSON.stringify(stat);

        document.body.appendChild(container);
    })
}

window.onload = function () {
    initialize();

    const submitButton = document.getElementById("submit");
    submitButton.onclick = () => {
        event.preventDefault()

        submit()
            .then(() => {
                displayGames()
            })
            .catch(err => {
                console.log(err);
            })
    };

    const newGameButton = document.getElementById("new-game");
    newGameButton.onclick = () => {
        event.preventDefault()
        i++;
        initialize()
    }

    const showButton = document.getElementById("view-statistics")
    showButton.onclick = () => {
        event.preventDefault();

        document.querySelectorAll(".hidden, .visible").forEach(stat => {
            stat.classList.toggle("hidden");
            stat.classList.toggle("visible");
        });

        hidden = !hidden;
    }
}