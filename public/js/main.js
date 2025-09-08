// FRONT-END (CLIENT) JAVASCRIPT HERE

let i = 0;
let visible = false;

const submit = async function (event) {
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
        initGame();
    }
}

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

const initialize = function () {
    initGame()
        .then(() => {
            console.log("game started");
        })
            .catch(err => {
            console.log(err);
        });
}

const show = async function () {
    event.preventDefault();
    visible = !visible;

    if(visible) {
        const response = await fetch("/stats", {
            method: "GET"
        });

        let stats = await response.text();
        console.log(stats);

        const statsList = JSON.parse(stats);
        statsList.map(stat => {
            let container = document.createElement("div");
            container.innerHTML = JSON.stringify(stat);

            document.body.appendChild(container);
        })
    }
}

window.onload = function () {
    initialize();

    const submitButton = document.getElementById("submit");
    submitButton.onclick = submit;

    const newGameButton = document.getElementById("new-game");
    newGameButton.onclick = () => {
        event.preventDefault()
        i++;
        initialize()
    }

    const showButton = document.getElementById("view-statistics")
    showButton.onclick = show;
}