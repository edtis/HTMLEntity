var Reflux = require("reflux");

module.exports = Reflux.createActions([
  'initialize',
  'save',
  'activateSaveInLocalStorage',
  'broadcastSaveState',
  'sendSaveState',
  'getSaveState',
  'clearSave'
]);
