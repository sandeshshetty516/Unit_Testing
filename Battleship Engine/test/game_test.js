var expect = require('chai').expect;

describe('GAME INSTANCE FUNTIONS', function () {
    describe('checkGamesStatus', function () {
        var checkGamesStatus = require('../game_logic/game_instance').checkGamesStatus;
        it('should tell me when the game is over', function () {
            var players = [
                {
                    ships: [
                        {
                            locations: [[0, 0]],
                            damage: [[0, 0]]
                        }
                    ]
                }
            ];
            var actual = checkGamesStatus(players);
            expect(actual).to.be.false;
        });
    });

    describe('takeTurn', function () {
        var takeTurn = require('../game_logic/game_instance').takeTurn;
        var guess, player;

        beforeEach(function () {
            guess = function () {
                return [0, 0];
            }
            player = {
                ships: [
                    {
                        location: [[0, 0]],
                        damage: []
                    }
                ]
            }
        });

        it('should return false if the game ends', function () {
            var actual = takeTurn(player, guess);
            expect(actual).to.be.false;
        });

    });

    function saveGame (callback) {
        setTimeout(function () {
            callback();
        }, 1000);
    }

    describe('saveGame', function () {
        it('should update save status', function (done) {
            var status = 'game not saved ...';

            saveGame(function () {
                status = 'game saved';
                expect(status).to.equal('game saved');
                done();
            });
        })
    })
});