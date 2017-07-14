var functionKeys = require('./codes/functionKeys'),
    letters = require('./codes/letters'),
    mostPopular = require('./codes/mostPopular'),
    navigationKeys = require('./codes/navigationKeys'),
    numberpad = require('./codes/numberpad'),
    numbers = require('./codes/numbers');

var characterCodes = [
      mostPopular,
      letters,
      numbers,
      navigationKeys,
      functionKeys,
      numberpad
];

module.exports = characterCodes;
