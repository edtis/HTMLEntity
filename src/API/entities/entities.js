var mostPopular = require('./entities/mostPopular'),
    accents     = require('./entities/accents'),
    currencies = require('./entities/currencies'),
    writingSymbols = require('./entities/writingSymbols'),
    misc = require('./entities/misc'),
    mathSymbols = require('./entities/mathSymbols');




var entities = [
        mostPopular,
        currencies,
        mathSymbols,
        writingSymbols,
        accents,
        misc
      ];





module.exports = entities;
