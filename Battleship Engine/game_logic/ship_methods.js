function checkforShip (player, coordinates) {
    var shipPresent, ship;
    
    for (var i = 0; i < player.ships.length; i++) {
        ship = player.ships[i];

        shipPresent = ship.location.filter(function (actualCoordinate) {
            return (actualCoordinate[0] === coordinates[0]) && (actualCoordinate[1] === coordinates[1])
        })[0];

        if (shipPresent) {
            return ship;
        }
    }
    return false;
}

function damageShip (ship, coordinates) {
    ship.damage.push(coordinates);
}

function fire (player, coordinates) {
    var ship = checkforShip(player, coordinates);

    if(ship) {
        damageShip(ship,coordinates);
    }

}

module.exports.checkforShip = checkforShip;
module.exports.damageShip = damageShip;
module.exports.fire = fire;