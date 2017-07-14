var React = require('react');
var Reflux = require('reflux');
var LeadText = require('./LeadText');
var SearchBar = require('../app/SearchBar');
var Hr = require('./Hr');
var MenuStore = require('../../stores/menu-store');


module.exports = React.createClass({
  mixins: [Reflux.listenTo(MenuStore, "handleMenuStore")],
  getInitialState:function(){
    return {
      leadTitle: "",
      clearSearchBar: false
    }
  },
  handleMenuStore:function(data){
    if(data.qualifier === "Lead"){
      switch (data.type){
          case "title":
            this.setState({leadTitle: data.data, clearSearchBar:true});

            break;
      }
  }
  },
  render: function(){
    return (
      <section id="lead" className="lead">
  		<div className="container">
  			<LeadText leadTitle={this.state.leadTitle} />
        <SearchBar clearSearchBar={this.state.clearSearchBar} />
        <Hr />
  		</div>
  	</section>
    );
  }

});
