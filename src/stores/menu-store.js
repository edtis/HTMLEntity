var Reflux = require('reflux'),
    MenuActions = require('../actions/menuActions'),
    CombinedData = require("../API/utilities/combined"),
    ListTitles = require("../API/utilities/ls"),
    DataStore = require('./data-store');


  module.exports = Reflux.createStore({
    listenables: [MenuActions],
    menu: [],
    dataArray: CombinedData,
    init: function() {
       this.listenTo(DataStore, this.handleDataStore);
   },
    initialize: function(index){
      this.createMenu(this.dataArray[index]);
    },
    createMenu: function(data){
      this.menu = [];
      for (var i = 0; i < data.length; i++) {
         var menuObj = {
              title: this.isUpperCase(data[i][0].type),
              id: "#" + data[i][0].type,
              active: i === 0 ? true : false,
            }
            this.menu.push(menuObj);
          }
          this.trigger({qualifier: "ListContainer", type: "menu", data: this.menu});

    },
    isUpperCase: function (str) {
      for (var i = 0; i < str.length; i++) {//go thru each letter of the string
          if(str[i] === str[i].toUpperCase()){
             return this.seperateString(str, i); //if theres an uppercase send it to seperateString()
          }
      }
      return this.firstLetterUpperCase(str); //if theres no uppercase in the string return it as is
    },
    seperateString: function(str, i){
      var newString = "";
      for(var a = 0; a < str.length; a++){
            if(a === i){// i is the index of where the captial was found
              newString += ' '; //add a space to the string
              newString += str[a];
            }else{
              if(a === 0){
                  newString += str[a].toUpperCase();
              }else{
                  newString += str[a];
              }
            }
          }
       return newString;
    },
    firstLetterUpperCase: function(str){
      var newString = "";
      for (var i = 0; i < str.length; i++) {//go thru each letter of the string
          i === 0 ? newString += str[i].toUpperCase() : newString += str[i];
      }
      return newString;
    },
    makeNavButtonActive: function(index){
      for(var i = 0; i < this.menu.length; i++){
        i == index ? this.menu[i].active = true : this.menu[i].active = false
      }
      this.trigger({qualifier: "ListContainer", type: "menu", data: this.menu});
      this.trigger({qualifier: "ListData", type: "hover", data: this.menu[index].title});

    },
    clearList:function(combinedDataIndex){
      this.trigger({qualifier: "ListContainer", type: "items", data: [false,combinedDataIndex]});
      this.changeLeadText(combinedDataIndex);
      this.displayGears();
    },
    changeLeadText:function(combinedDataIndex){
      this.trigger({qualifier: "Lead", type: "title", data: ListTitles[combinedDataIndex]});
    },
    handleDataStore:function(obj){
      switch(obj.type){
        case "index":
          this.changeLeadText(obj.data);
          break;
      }
    },
    displayGears: function(bool){
      this.trigger({qualifier: "Loader", type: "showGears", data: true});
    }

  });
