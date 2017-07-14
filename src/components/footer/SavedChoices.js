var React = require('react');
var AlertActions = require('../../actions/alertActions');
var CopyToClipboard = require('react-copy-to-clipboard');
var TransitionMotion = require('react-motion').TransitionMotion;
var spring = require('react-motion').spring;
var customPreset = {stiffness: 160, damping: 14, precision: 1};

module.exports = React.createClass({

	handleOnCopy: function(){
		AlertActions.rightAlert();
	},
	componentWillMount: function(){
		var defaultStyles = this.getDefaultStyles(this.props.savedData);
		var sty = this.getStyles(this.props.savedData);
		this.setState({
			defaultStyles:defaultStyles,
			getStyles: sty,
		});
	},
	getDefaultStyles: function(searchData){
		return searchData.map(function(results){
			return {
				key: results.number,
	 		style: {scale: 0}
			}
		 });
	},
	componentWillReceiveProps: function(){
		var sty = this.getStyles(this.props.savedData);
		this.setState({getStyles: sty});

	},
	getStyles:function(createStyleNumbersObj){
			return createStyleNumbersObj.map(function(_,i){
									return {
										key: this.props.savedData[i].number,
										style: {scale:spring(1, customPreset)},
										data: {data: this.props.savedData[i],  combinedDataIndex:this.props.combinedDataIndexes[i]}
									}
							}.bind(this))

	},
	willLeave:function(){
		return{scale: spring(0)}
	},
	willEnter:function() {
		return {scale: 0};
	},
	render: function() {
    return (
			<TransitionMotion
					willEnter={this.willEnter}
					defaultStyles={this.state.defaultStyles}
					styles={this.state.getStyles}
					>
					{function(numbersForStyles){

						return (
							<div className="row">
						{numbersForStyles.map(function(numbers, i){
								return (
									<CopyToClipboard  key={numbers.key} text={numbers.data.data.number} onCopy={this.handleOnCopy}>
										<div className="col-xs-3 col-xs-offset-1 text-center"
													title="Click to copy"
													style={{cursor:"pointer",
																	fontSize:"4rem",
																	fontWeight:"bold",
																	borderTopRightRadius:"3px",
																	borderTopLeftRadius:"3px",
																	transition: "all .5s",
																	WebkitTransform: "scale(" + numbers.style.scale + ")",
			                            transform: "scale(" + numbers.style.scale + ")",
			                            WebkitTransformOrigin: "bottom left",
			                            transformOrigin: "bottom left",
																	background: numbers.data.combinedDataIndex == 1 ? numbers.data.data.number : "#CBC1C1",
																	color: numbers.data.combinedDataIndex == 1 ? "#ffffff" : ""
																}}
													>
													<span	dangerouslySetInnerHTML={{__html: numbers.data.combinedDataIndex == 1 ? "C" : numbers.data.data.number}}></span>

										</div>
									</CopyToClipboard>
								);

						}.bind(this))}
					</div>
				);
					}.bind(this)}
			</TransitionMotion>

  			);
			}
});
