var Reflux = require('reflux'),
    AlertActions = require('../actions/alertActions');


  module.exports = Reflux.createStore({
    listenables: [AlertActions],
    leftAlert: function(){
      this.trigger({qualifier: "LeftAlert", type: "leftShow", data: true});
    },
    rightAlert: function(){
      this.trigger({qualifier: "RightAlert", type: "rightShow", data: true});
    },
    topAlert: function(){
      this.trigger({qualifier: "TopAlert", type: "topShow", data: true});
    }
  });
