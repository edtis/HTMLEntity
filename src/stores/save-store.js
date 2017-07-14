var Reflux = require('reflux'),
    SaveActions = require('../actions/saveActions'),
    CombinedData = require("../API/utilities/combined"),
    DataStore = require('./data-store');

  module.exports = Reflux.createStore({
    listenables: [SaveActions],
    saved: [],
    CombinedData: CombinedData,
    currentCombinedDataIndex: 0,
    locations: [],
    saveState: null,

    init: function() {
       this.listenTo(DataStore, this.handleDataStore);
   },
    initialize:function(){
      var save = localStorage.save; //check local storage
      if(save === "on"){
          this.checkLocalStorage();
          this.saveState = true;
          this.trigger({qualifier:"Saved", type: "save", data: true});
      }else if(save === "off"){
          this.checkLocalStorage();
          this.saveState = false;
          this.trigger({qualifier:"Saved", type: "save", data: false});
      }else{
        this.saveState = true;
        this.checkLocalStorage();
        this.trigger({qualifier:"Saved", type: "save", data: true});
        this.activateSaveInLocalStorage("on");
      }
    },
    checkLocalStorage:function(){
      if(localStorage.count){
            var combinedDataIndexes = localStorage.cdi.split(",");
            for(var i = 0; i < localStorage.count; i++){
              var savedItem = localStorage["saved" + i];
              savedItem = JSON.parse(savedItem);
              this.saved.push(savedItem);
              this.locations.push(combinedDataIndexes[i]);
            }
            this.trigger({qualifier:"Saved", type: "savedData", data: this.saved});
            this.trigger({qualifier:"Saved", type: "combinedDataIndexes", data: this.locations});
        }
    },

    handleDataStore:function(obj){
      switch(obj.type){
        case "index":
          this.currentCombinedDataIndex = obj.data;
          this.trigger({qualifier:"Saved", type: "newIndex", data: obj.data});
          this.initialize();
          break;
        case "newIndex":
          this.currentCombinedDataIndex = obj.data;
          this.trigger({qualifier:"Saved", type: "newIndex", data: obj.data});
          break;
      }
    },
    save: function(itemIndex, libraryIndex, combinedDataIndex){
      var itemLocation = {
              combinedDataIndex: combinedDataIndex ? combinedDataIndex : this.currentCombinedDataIndex,
              libraryIndex:libraryIndex,
              itemIndex: itemIndex
                };

      this.storeSaved(itemLocation);
    },
    storeSaved: function(location){
      if(this.saved.length === 3) this.saved.pop();
      if(this.locations.length === 3) this.locations.pop();
      if(this.saved.length < 3){
        this.saved.unshift(this.CombinedData[location.combinedDataIndex][location.libraryIndex][location.itemIndex]); //add new save data
        this.locations.unshift(location.combinedDataIndex); //add new save data
        this.trigger({qualifier:"Saved", type: "savedData", data: this.saved}); //data to be displayed
        this.trigger({qualifier:"Saved", type: "combinedDataIndexes", data: this.locations});
        this.storeInLocalStorage(this.saved, this.locations);
      }
    },
    storeInLocalStorage: function(saved, combinedDataLocationIndexes){
      var len = saved.length;
      localStorage.count = len;
      localStorage["cdi"] = combinedDataLocationIndexes.toString();
      for(var i = 0; i < len; i++){
        var savedString = JSON.stringify(saved[i]);
        localStorage["saved" + i] = savedString;
      }
    },
    activateSaveInLocalStorage:function(Switch){
      localStorage.save = Switch;
    },
    broadcastSaveState: function(bool){
      this.saveState = bool;
      this.trigger({qualifier:"Saved", type: "save", data: bool});
    },
    sendSaveState:function(){
      this.trigger({qualifier:"Saved", type: "save", data: this.saveState});
    },
    getSaveState:function(){
      this.trigger({qualifier:"Saved", type: "save", data: this.saveState});
    },
    clearSave:function(){
      localStorage.clear();
      this.saved = [];
      this.location = [];
      this.trigger({qualifier:"Saved", type: "clear", data: true});
    }
  });
