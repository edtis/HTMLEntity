var React = require('react');
var Reflux = require('reflux');
var CopyToClipboard = require('react-copy-to-clipboard');
var AlertActions = require('../../actions/alertActions');
var SaveActions = require('../../actions/saveActions');
var SaveStore = require('../../stores/save-store');

module.exports = React.createClass({
	mixins: [Reflux.listenTo(SaveStore, "handleSaveStore")],
	getInitialState: function(){
		return {
			save: true,
		}
	},
	handleSaveStore: function(obj){
		if(obj.qualifier === "Saved"){
				switch(obj.type){
					case "save":
						this.setState({save: obj.data});
						break;
				}
		}
	},

	showAlert: function(){
		if(!this.state.hover){
			setTimeout(function(){
				AlertActions.leftAlert(true); this.setState({hover: true});
			}.bind(this),1000);
		}
	},

	listSections: function(searchData){
			return (
				<span className={this.props.showSearch ? "visible" : "hidden" }>
					<li className="text-center">
						<strong>Search </strong>
						<span className={this.props.showEllipsis ? "hidden" : "visible"}>results: </span>
						<img src="imgs/ellipsis.gif" className={this.props.showEllipsis ? "visible" : "hidden"} />
					</li>
						<hr />
          {this.insertListData(searchData)}
				</span>
			);
	},
	insertListData: function(searchData){
		return searchData.searchResults.map(function(results, i){

				var saveData = {
					combinedDataIndex: searchData.combinedDataIndexes[i],
					libraryIndex:  searchData.libraryIndexes[i],
					itemIndex: searchData.itemIndexes[i]
				}
			return (
				<li key={i} className="entity-holder-li search">
						<CopyToClipboard
							text={results.number}
							onCopy={this.handleOnCopy.bind(this, saveData)}>
							<div className="row entity-row" style={{
									background: this.props.combinedDataIndex === 1 ? results.number : "",
									color: this.props.combinedDataIndex === 1 ? "#ffffff" : ""
								}}>
                    <a href="javascript:void(0)">
                      <div
												className="col-xs-12 entity-symbol"
												style={{fontSize: this.props.combinedDataIndex === 1 ? ".9em" : ""}}
												dangerouslySetInnerHTML={{__html: this.props.combinedDataIndex > 0 ? results.name  : results.number }} />

                    </a>
                    <a href="javascript:void(0)">
                      <div className="col-xs-12 col-sm-12">
                        <div className="row">
                          <div className="col-xs-6 text-left visible-sm visible-xs entity-details"><span>{results.name}</span></div>
                          <div className="col-xs-6 text-right visible-sm visible-xs entity-details"><span>{results.number}</span></div>
                          <div className="col-xs-6 text-left hidden-sm hidden-xs entity-details"><span>{results.name}</span></div>
                          <div className="col-xs-6 text-right hidden-sm hidden-xs entity-details"><span>{results.number}</span></div>
                        </div>
                      </div>
                    </a>
                  </div>
							</CopyToClipboard>
          </li>
				);
			}.bind(this));
	},
	handleOnCopy: function(saveData){
		AlertActions.rightAlert();
		if(this.state.save) SaveActions.save(saveData.itemIndex, saveData.libraryIndex, saveData.combinedDataIndex);
	},
	makeList: function(data){
    return this.listSections(data);
	},

	render: function() {
    return (
						<ul>
						{this.props.showSearch  ? this.makeList(this.props.searchData) : null}
						</ul>
  )}
});
