const fire = require("./ship_methods").fire;

function checkGamesStatus (players) {
    return false;
}

function takeTurn (opposingPlayer, guessFunction) {
    var coordinates = guessFunction();
    fire(opposingPlayer, coordinates);
    var gameOver = checkGamesStatus();

    return gameOver;
}

module.exports.checkGamesStatus = checkGamesStatus;
module.exports.takeTurn = takeTurn;