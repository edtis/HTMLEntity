var React = require('react');
var DataActions = require('../../actions/dataActions');
var DataStore = require('../../stores/data-store');

module.exports = React.createClass({
	getInitialState: function(){
          return {
            searchBarValue : ""
          }
  },
	componentWillReceiveProps(nextProps){
		this.props.clearSearchBar ? this.clearSearchBar() : null;
	},
	render: function() {
    return (
      <div className="row">
      				<div className="col-xs-10 col-sm-9 col-sm-offset-1 col-md-7 col-md-offset-2 col-lg-6 col-lg-offset-3 search-bar text-center">
      					<input 	type="text"
												id="search-bar"
												placeholder="Name or Description"
												value={this.state.searchBarValue}
												onChange={this.handleSearchBarOnChange}
												/>
      				</div>
      				<div className="col-xs-2 search-button-div">
      					<button className="btn btn-square pull-left">Search</button>
      				</div>
      </div>


  )},
	handleSearchBarOnChange:function(event){
		var value = event.target.value;
		var valueLowerCased = value.toLowerCase();
		this.setState({searchBarValue: value});
		DataActions.search(valueLowerCased);
	},
	clearSearchBar:function(){
		this.setState({searchBarValue:""});
		DataActions.search("");
	}
});
