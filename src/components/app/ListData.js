var React = require('react');
var List = require('./List');
var SearchResults = require('./SearchResults');
var Display = require('../other/Display');



module.exports = React.createClass({

	render: function() {
    return (
      <div className="inner-container" style={{marginLeft:"35px"}}>
				<Display if={this.props.menuData}>
							<List
								showSearch={this.props.showSearch}
								listData={this.props.listData}
								menuData={this.props.menuData}
								combinedDataIndex={this.props.combinedDataIndex}
								/>
				</Display>
				<Display if={this.props.showSearch}>
								<SearchResults
									showSearch={this.props.showSearch}
									searchData={this.props.searchData}
									showEllipsis={this.props.showEllipsis}
									combinedDataIndex={this.props.combinedDataIndex}
									/>
				</Display>


		  </div>
  )}
});
