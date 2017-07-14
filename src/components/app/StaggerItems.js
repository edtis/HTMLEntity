var React = require('react');
var CopyToClipboard = require('react-copy-to-clipboard');
var StaggeredMotion = require('react-motion').StaggeredMotion;
var spring = require('react-motion').spring;
var SaveActions = require('../../actions/saveActions');
var AlertActions = require('../../actions/alertActions');
var presets = require('react-motion').presets;


var customPreset = {stiffness: 120, damping: 60};
var customPreset2 = {stiffness: 100, damping: 34};


module.exports = React.createClass({

	componentWillMount:function(){
		var dS = [];
				dS = this.props.listData[this.props.libraryIndex].map(function(arr){
							return {scale: 0, opacity: 0}
				}.bind(this));
				this.setState({defaultStyles: dS});
	},

	getStyles:function(interpolatingStyles){
			return interpolatingStyles.map(function(_,i){
								if(i===0){
									return {scale:spring(1, customPreset), opacity:spring(1, customPreset)};
								}else {
									return {scale: spring(interpolatingStyles[i-1].scale,customPreset2), opacity: spring(interpolatingStyles[i-1].opacity)}
								}
							}.bind(this))
	},

	handleOnCopy: function(itemIndex){
		AlertActions.rightAlert();
		if(this.props.saveState){ SaveActions.save(itemIndex, this.props.libraryIndex, false)};
	},

	render: function() {
    return (
			<StaggeredMotion
						defaultStyles={this.state.defaultStyles}
						styles={this.getStyles}>
						{function(styles){
							return (
								<ul>
									{styles.map(function(style,i){
										// console.log(this.props.combinedDataIndex);
												return (
                          <li key={i} className="entity-holder-li" style={{
                            WebkitTransform: "scaleX(" + style.scale + ")",
                            transform: "scaleX(" + style.scale + ")",
                            WebkitTransformOrigin: "center center",
                            transformOrigin: "center center",
														opacity: style.opacity
                          }}>
                							<CopyToClipboard text={this.props.listData[this.props.libraryIndex][i].number} onCopy={this.handleOnCopy.bind(this, i)}>
                										<div className="row entity-row" title="Click to copy" style={{
																				background: this.props.combinedDataIndex === 1 ? this.props.listData[this.props.libraryIndex][i].number : "",
																			}}>
                											<a href="javascript:void(0)">
                												<div
																					className="col-xs-12 entity-symbol"
																					style={{
																						fontSize: this.props.combinedDataIndex === 1 ? ".9em" : "",
																						color: this.props.combinedDataIndex === 1 ? "#ffffff" : ""
																					}}
																					dangerouslySetInnerHTML={{__html: this.props.combinedDataIndex > 0 ? this.props.listData[this.props.libraryIndex][i].name  : this.props.listData[this.props.libraryIndex][i].number }} />
                											</a>
                											<a href="javascript:void(0)">
                												<div className="col-xs-12 col-sm-12">
                													<div className="row">
                														<div className="col-xs-6 text-left visible-sm visible-xs entity-details"><span>{this.props.listData[this.props.libraryIndex][i].name}</span></div>
                														<div className="col-xs-6 text-right visible-sm visible-xs entity-details"><span>{this.props.listData[this.props.libraryIndex][i].number}</span></div>
                														<div className="col-xs-6 text-left hidden-sm hidden-xs entity-details"><span>{this.props.listData[this.props.libraryIndex][i].name}</span></div>
                														<div className="col-xs-6 text-right hidden-sm hidden-xs entity-details"><span>{this.props.listData[this.props.libraryIndex][i].number}</span></div>
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
						}.bind(this)}
			</StaggeredMotion>
  )}
});
