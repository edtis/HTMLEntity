var React = require('react');
var Reflux = require('reflux');
var AlertStore = require('../../stores/alert-store');
var Motion = require('react-motion').Motion;
var presets = require('react-motion').presets;
var spring = require('react-motion').spring;
var customOut = {stiffness: 200, damping:100};
var customIn = {stiffness: 100, damping:17, precision: .5};




module.exports = React.createClass({
  mixins: [Reflux.listenTo(AlertStore, "handleAlertStore")],
	getInitialState:function(){
		return {
			show: false
		}
	},
  handleAlertStore:function(obj){
		if(obj.qualifier === "RightAlert"){
			switch(obj.type){
				case "rightShow":
					this.setState({show: obj.data});
					break;
			}
		}
	},
	handleOnClick: function(){
		this.setState({clicked: !this.state.clicked});
	},
	handleFinish:function(){
    setTimeout(function(){
      this.setState({show:false});
    }.bind(this), 1500);
	},

	render: function() {
    return (
				<Motion defaultStyle={{x: 0, size: 0}}
                style={{x: this.state.show ? spring(1, customIn) : spring(0, customOut), size: this.state.show ? spring(14, presets.wobbly) : spring(0, customOut)}}
					      onRest={this.handleFinish}>
					{function(style){
						return (
							<div
                className="hidden-xs"
                 style={{
				          position: "absolute",
				          top: 0,
				          right: -110,
				          width: 100,
				          height: 40,
				          textAlign: "center",
				          color: "#ffffff",
				          fontWeight: 500,
				          lineHeight: "40px",
				          background: "rgba(193,216,122,1.00)",
				          zIndex: 100,
                  WebkitTransform: "scale(" + style.x + ")",
    							transform: "scale(" + style.x + ")",
                  fontSize: style.size + "px",
    							WebkitTransformOrigin: "top left",
    							transformOrigin: "top left",
				        }}>
				        Copied
				     	</div>
						);
					}}

				</Motion>
  )}
});
