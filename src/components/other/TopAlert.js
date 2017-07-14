var React = require('react');
var Reflux = require('reflux');
var AlertStore = require('../../stores/alert-store');
var Motion = require('react-motion').Motion;
var spring = require('react-motion').spring;
var customPreset = {stiffness: 180, damping: 12};

module.exports = React.createClass({
  mixins: [Reflux.listenTo(AlertStore, "handleAlertStore")],
	getInitialState:function(){
		return {
			show: false
		}
	},
  handleAlertStore:function(obj){
		if(obj.qualifier === "TopAlert"){
			switch(obj.type){
				case "topShow":
					this.setState({show: obj.data});
					break;
			}
		}
	},
	handleFinish:function(){
    setTimeout(function(){
      this.setState({show:false});
    }.bind(this), 2000);
	},

	render: function() {
    return (
				<Motion defaultStyle={{x: -60}}
                style={{x: this.state.show ? spring(0, customPreset) : spring(-60, customPreset)}}
					      onRest={this.handleFinish}>
					{function(style){
						return (
							<div
                className={"alert alert-"+ this.props.topAlertColor +" text-center"}
                style={{
                  position:"fixed",
                  top: style.x,
                  left: 0,
                  width: "100%",
                  fontWeight: "500",
                  background: "rgba(193,216,122,.50)",
                  border: "none"
                }}>{this.props.topAlertText}</div>
						);
					}.bind(this)}

				</Motion>
  )}
});
