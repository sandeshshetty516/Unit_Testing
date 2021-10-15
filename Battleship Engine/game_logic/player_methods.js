var checkforShip = require('./ship_methods').checkforShip;

function validateLocation (player, coordinates) {
    var x = coordinates[0];
    var y = coordinates[1];
    
    var spaceAvailable = !checkforShip(player, coordinates);

    if((x <= 9 && x>=0) && (y <= 9 && y >= 0)) {
        return spaceAvailable;
    } else {
        return false;
    }
}

function validateLocations (player, location) {
    var validated  = location.map(function (location) {
        return validateLocation(player, location);
    });
    return validated.indexOf(false) === -1;
}

function placeShip (player, ship, startingCoordinates, direction) {
    if(!direction) throw Error('You left out the direction! I need that for math!')

    var proposedLocation = [];
    var previousLocation,
        rowNumber,
        columnNumber;
    
    for (var i = 0; i < ship.size; i++) {
        previousLocation = proposedLocation[i - 1] || [];
        rowNumber = previousLocation[0];
        columnNumber = previousLocation[1];

        proposedLocation[i] = (i === 0) ? startingCoordinates : (direction === 'horizontal') ? [rowNumber, ++columnNumber] : [++rowNumber, columnNumber];

    }

    ship.location = [[0, 1]];
}

function getRandomCoordinates () {
    var x = Math.floor(Math.random() * 9);
    var y = Math.floor(Math.random() * 9);
    return [x, y];
}

function getRandomDirecion () {
    return Math.random() > 0.5 ? 'horizontal' : 'vertical';
}

// fire(player, getRandomCoordinates());
// placeShip(compuerPlayer, compuerPlayer.ship[0], getRandomCoordinates(), getRandomDirecion());



module.exports.validateLocation = validateLocation;
module.exports.validateLocations = validateLocations;
module.exports.placeShip = placeShip;