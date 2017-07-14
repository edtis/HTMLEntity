var Reflux = require('reflux'),
    DataActions = require('../actions/dataActions'),
    CombinedData = require("../API/utilities/combined");



  module.exports = Reflux.createStore({
    listenables: [DataActions],
    menu: [],
    combinedDataIndex: 0,
    initialize: function(i){
      this.combinedDataIndex = i;
      this.trigger({qualifier: "ListContainer", type: "items", data: CombinedData[i]});
      this.trigger({qualifier: "save-store && menu-store", type: "index", data: i});

    },
    getNewData: function(i){
      this.combinedDataIndex = i;
      this.trigger({qualifier: "ListContainer", type: "items", data: CombinedData[i]});
      this.trigger({qualifier: "save-store", type: "newIndex", data: i});
    },
    search:function(letters){
      if(letters.length){
        this.searchItem(letters); //search the arrays
        this.deactivateEllipsis();// remove ellipsis loader
        this.trigger({qualifier: "ListContainer", type: "visibility", data: true});
        this.trigger({qualifier: "ListContainer", type: "activateEllipsis", data: true});

      }else{
        this.trigger({qualifier: "ListContainer", type: "visibility", data: false});
        this.trigger({qualifier: "ListContainer", type: "activateEllipsis", data: false});
        this.trigger({qualifier: "ListContainer", type: "items", data: CombinedData[this.combinedDataIndex]});
        }//end if
    },
    searchItem: function(letters){

      var libraryIndexes = [];
      var itemIndexes = [];
      var combinedDataIndexes = [];
      var final = [];

      CombinedData[this.combinedDataIndex].map(function(libraryArr, a){
            libraryArr.map(function(itemObj, b){
              var n = itemObj.keyword ? itemObj.keyword.substr(0, letters.length).indexOf(letters) : -1;

              if(n > -1){
                          combinedDataIndexes.push(this.combinedDataIndex);
                          libraryIndexes.push(a);
                          itemIndexes.push(b);
                          final.push(itemObj); //if item is found in this array save to searchArray
                        }
            }.bind(this));
        }.bind(this));
    this.getFinalResult(final, combinedDataIndexes, libraryIndexes, itemIndexes);

    },
    getFinalResult:function(searchArray, combinedDataIndexes, searchLibraryIndexes, searchItemIndexes){
      this.trigger({
        qualifier: "ListContainer",
        type: "SearchResults",
        data: {
          searchResults: searchArray,
          combinedDataIndexes: combinedDataIndexes,
          libraryIndexes: searchLibraryIndexes,
          itemIndexes: searchItemIndexes
        }
      });
    },
    deactivateEllipsis:function(){
      var rand = this.getRandomArbitrary(0,1000);
      setTimeout(function(){
        this.trigger({qualifier: "ListContainer", type: "activateEllipsis", data: false});
      }.bind(this), rand)

    },
    getRandomArbitrary: function (min, max) {
      return Math.random() * (max - min) + min;
    }

  });
