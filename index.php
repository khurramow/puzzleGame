<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fifteen Puzzle Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <h1>Fifteen Puzzle Game</h1>
    <div class="controls">
        <button id="shuffle-button">Shuffle</button>
        <button id="reset-button">Reset</button>
        <button id="pause-button">Pause</button>
        <button id="start-button">Start</button>
    </div>
    <div class="info">
        <span id="moves">Moves: 0</span>
        <span id="time">Time: 0s</span>
    </div>
    <div class="puzzle-container">
    </div>
    <div id="message"></div>
</div>
<script src="game.js"></script>
</body>
</html>
