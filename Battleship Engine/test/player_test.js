var expect = require('chai').expect;

describe('PLAYER METHODS', function () {
    describe('validateLocation', function () {
        var validateLocation = require('../game_logic/player_methods').validateLocation;
        var player;

        beforeEach(function () {
            player = {
                ships: [
                    {
                        location: [[9, 9]]
                    }
                ]
            }
        });
    
    
        it('should confirm valid for occupied locations in range', function () {
            var location = [0, 0];
            var actual = validateLocation(player, location);

            expect(actual).to.be.ok;
        });

        it('should confirm invalid for unoccupied locations in range', function () {
            var location = [9, 9];
            var actual = validateLocation(player, location);

            expect(actual).to.be.false;
        });

        it('should confirm invalid for unoccupied locations out of range', function () {
            var locationHigh = [10, 10];
            var locationLow = [-1, -1];

            expect(validateLocation(player, locationHigh)).to.be.false;
            expect(validateLocation(player, locationLow)).to.be.false;

        });

    });

    describe('validateLocations', function () {
        var validateLocations = require('../game_logic/player_methods').validateLocations;
        var player;

        beforeEach(function () {
            player = {
                ships:[
                    {
                        location: [[9, 9]]
                    }
                ]
            }
        });

        it(' should correctly report a list of unoccupied locations is valid', function () {
            var location = [[1, 1], [1, 2], [1, 3], [1, 4]];
            expect(validateLocations(player, location)).to.be.ok;
        });

        it(' should correctly report a problem if any location in the list is invalid', function () {
            var location = [[1, 1], [1, 2], [1, 3], [10, 10]];
            expect(validateLocations(player, location)).to.be.false;

            location = [[1, 1], [1, 2], [1, 3], [0, 0]];
            expect(validateLocations(player, location)).to.be.true;
        });
    });

    describe('placeShip', function () {
        var placeShip = require('../game_logic/player_methods').placeShip;
        var player;

        beforeEach(function () {
            player = {
                ships: [
                    {
                        size:1,
                        location:[]
                    },
                    {
                        size: 2,
                        location: [[1, 0], [1, 1]]
                    }
                ]
            }
        });

        it('should update a ship with a valid staring location', function () {
            var ship = player.ships[0];
            var coordinates = [0, 1];
            
            placeShip(player, ship, coordinates, 'horizontal');
            var actual = ship.location;

            expect(actual).to.be.ok;
            expect(actual).to.be.length(1);
            expect(actual[0]).to.deep.equal([0, 1]);
        });

        it('should throw an error if no direction is specified', function () {
            var ship = player.ships[0];
            var coordinates = [0, 1];
            var handler = function () { placeShip(); };

            var handler =function () {
                placeShip(player, ship, coordinates);
            };
            expect(handler).to.throw(Error);
            expect(handler).to.throw('You left out the direction! I need that for math!')
        })
    });
});

// describe('COMPUTER PLAYER', function () {
//     describe('computerFire', function () {
//         var computerFire = require('../game_logic/player_methods').computerFire;
//         var player;
//         beforeEach(function () {
//             player = {
//                 ships: [
//                     {
//                         location: [[9, 9]]
//                     }
//                 ]
//             }
//         });

//         it('should aim at a random location', function () {
//             var ship = player.ships[0];

//             computerFire();
//             expect(ship)
//         });
//     });
// });

