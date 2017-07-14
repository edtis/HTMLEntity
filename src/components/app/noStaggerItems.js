var React = require('react');
var CopyToClipboard = require('react-copy-to-clipboard');
var SaveActions = require('../../actions/saveActions');
var AlertActions = require('../../actions/alertActions');





module.exports = React.createClass({

	handleOnCopy: function(itemIndex){
		AlertActions.rightAlert();
		if(this.props.saveState){ SaveActions.save(itemIndex, this.props.libraryIndex, false) };
	},

	render: function() {
							return (
								<ul>
									{this.props.listData[this.props.libraryIndex].map(function(itemObj,i){
												return (
                          <li key={i} className="entity-holder-li">
                							<CopyToClipboard text={itemObj.number} onCopy={this.handleOnCopy.bind(this, i)}>
																<div className="row entity-row" title="Click to copy" style={{
																		background: this.props.combinedDataIndex === 1 ? this.props.listData[this.props.libraryIndex][i].number : ""																		
																	}}>
                											<a href="javascript:void(0)">
                												<div className="col-xs-12 entity-symbol"
																					style={{
																						fontSize: this.props.combinedDataIndex === 1 ? ".7em" : "",
																						color: this.props.combinedDataIndex === 1 ? "#ffffff" : ""
																					}}
																				dangerouslySetInnerHTML={{__html: this.props.combinedDataIndex > 0 ? itemObj.name  : itemObj.number }} />
                											</a>
                											<a href="javascript:void(0)">
                												<div className="col-xs-12 col-sm-12">
                													<div className="row">
                														<div className="col-xs-6 text-left visible-sm visible-xs entity-details"><span>{itemObj.name}</span></div>
                														<div className="col-xs-6 text-right visible-sm visible-xs entity-details"><span>{itemObj.number}</span></div>
                														<div className="col-xs-6 text-left hidden-sm hidden-xs entity-details"><span>{itemObj.name}</span></div>
                														<div className="col-xs-6 text-right hidden-sm hidden-xs entity-details"><span>{itemObj.number}</span></div>
                													</div>
                												</div>
                											</a>
                										</div>
                								</CopyToClipboard>
                						</li>
												);
									}.bind(this))}
								</ul>
							);
          }
});
