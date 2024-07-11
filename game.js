document.addEventListener("DOMContentLoaded", function() {
    const puzzleContainer = document.querySelector(".puzzle-container");
    const shuffleButton = document.getElementById("shuffle-button");
    const resetButton = document.getElementById("reset-button");
    const pauseButton = document.getElementById("pause-button");
    const startButton = document.getElementById("start-button"); // Yangi start button
    const message = document.getElementById("message");
    const movesDisplay = document.getElementById("moves");
    const timeDisplay = document.getElementById("time");
    const controls = document.querySelector(".controls");

    let pieces = [];
    let moves = 0;
    let timer;
    let time = 0;
    let isPaused = false;
    let gameStarted = false;

    function startGame() {
        if (!gameStarted) {
            pieces = [];
            for (let i = 1; i <= 15; i++) {
                pieces.push(i);
            }
            pieces.push(null);

            moves = 0;
            time = 0;
            isPaused = false;

            stopTimer();
            timeDisplay.textContent = `Time: ${time}s`;
            movesDisplay.textContent = `Moves: ${moves}`;
            message.textContent = "";

            shuffle(pieces);
            createPuzzle();
            startTimer();

            gameStarted = true;
            startButton.style.display = "none";
            controls.style.justifyContent = "space-between";
        }
    }

    function startTimer() {
        timer = setInterval(() => {
            if (gameStarted && !isPaused) {
                time++;
                timeDisplay.textContent = `Time: ${time}s`;
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function resetGame() {
        startButton.style.display = "inline-block";
        controls.style.justifyContent = "center";
        gameStarted = false;
        startGame();
    }

    function createPuzzle() {
        puzzleContainer.innerHTML = '';
        pieces.forEach((piece, index) => {
            const div = document.createElement("div");
            div.className = "puzzle-piece";
            if (piece !== null) {
                div.textContent = piece;
            } else {
                div.classList.add("empty");
            }
            div.style.top = `${Math.floor(index / 4) * 100}px`;
            div.style.left = `${(index % 4) * 100}px`;
            div.dataset.index = index;
            puzzleContainer.appendChild(div);
        });
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function movePiece(index) {
        if (gameStarted && !isPaused) {
            const emptyIndex = pieces.indexOf(null);
            const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 4, emptyIndex + 4];
            if (validMoves.includes(index) && isValidMove(index, emptyIndex)) {
                [pieces[emptyIndex], pieces[index]] = [pieces[index], pieces[emptyIndex]];
                createPuzzle();
                moves++;
                movesDisplay.textContent = `Moves: ${moves}`;
                if (isSolved()) {
                    message.textContent = "Congratulations! You solved the puzzle!";
                    stopTimer();
                }
            }
        }
    }

    function isValidMove(index, emptyIndex) {
        const row = Math.floor(index / 4);
        const emptyRow = Math.floor(emptyIndex / 4);
        const col = index % 4;
        const emptyCol = emptyIndex % 4;
        return (row === emptyRow && Math.abs(col - emptyCol) === 1) || (col === emptyCol && Math.abs(row - emptyRow) === 1);
    }

    function isSolved() {
        for (let i = 0; i < pieces.length - 1; i++) {
            if (pieces[i] !== i + 1) {
                return false;
            }
        }
        return pieces[pieces.length - 1] === null;
    }

    puzzleContainer.addEventListener("click", function(e) {
        if (gameStarted && !isPaused) {
            if (e.target.classList.contains("puzzle-piece") && !e.target.classList.contains("empty")) {
                const index = Array.from(puzzleContainer.children).indexOf(e.target);
                movePiece(index);
            }
        }
    });

    shuffleButton.addEventListener("click", resetGame);
    resetButton.addEventListener("click", resetGame);
    pauseButton.addEventListener("click", function() {
        isPaused = !isPaused;
        pauseButton.textContent = isPaused ? "Resume" : "Pause";
    });
    startButton.addEventListener("click", startGame);

    startButton.style.display = "inline-block";
    controls.style.justifyContent = "center";
});
