var expect = require('chai').expect;

describe('checkforShip', function () {
    var checkforShip = require('../game_logic/ship_methods').checkforShip;
    var player;
    before(function () {
        player = {
            ships: [
                {
                    location: [[0, 0], [0, 1]]
                },
                {
                    location: [[1, 0], [1, 1]]
                },
                {
                    location: [[2, 0], [2, 1], [2, 2], [2, 3]]
                }
            ]
        }
    });

    it('should correctly report no ship at given players coordinates', function () {
        expect(checkforShip(player, [9, 9])).to.be.false;
    });

    it('should correctly report a ship located at the given coordinates', function () {
        expect(checkforShip(player, [0, 0])).to.deep.equal(player.ships[0]);
    });

    it('should handle ships located at more than one coordinates', function () {
        expect(checkforShip(player, [0, 1])).to.deep.equal(player.ships[0]);
        expect(checkforShip(player, [0, 0])).to.deep.equal(player.ships[0]);
        expect(checkforShip(player, [9, 9])).to.be.false;
    });

    it('should handle checking multiple ships', function () {
        expect(checkforShip(player, [0, 1])).to.deep.equal(player.ships[0]);
        expect(checkforShip(player, [0, 0])).to.deep.equal(player.ships[0]);
        expect(checkforShip(player, [1, 0])).to.deep.equal(player.ships[1]);
        expect(checkforShip(player, [1, 1])).to.deep.equal(player.ships[1]);
        expect(checkforShip(player, [2, 3])).to.deep.equal(player.ships[2]);
        expect(checkforShip(player, [9, 9])).to.be.false;
    });
});

describe('damageShip', function () {
    var damageShip = require('../game_logic/ship_methods').damageShip;

    it('should register damamge on a given ship at the given location', function () {
        var ship = {
            location: [[0, 0]],
            damage: []
        };

        damageShip(ship, [0, 0]);

        expect(ship.damage).to.not.be.empty;
        expect(ship.damage[0]).to.deep.equal([0, 0]);
    });
});

describe('fire', function () {
    var fire = require('../game_logic/ship_methods').fire;
    var player;

    beforeEach(function () {
        player = {
            ships: [
                {
                    location: [[0, 0]],
                    damage: []
                }
            ]
        }
    });

    after(function () {
        console.log('entire test suite is completed')
    });

    afterEach(function () {
        console.log('one unit test is completed')
    });

    it('should record damage on given player ship at given coordinate', function () {
        fire(player, [0, 0]);
        expect(player.ships[0].damage[0]).to.deep.equal([0, 0]);
    });

    it('should not record damage if there is no ship at given coordinates', function () {
        fire(player, [9, 9]);
        expect(player.ships[0].damage).to.be.empty;
    });
});