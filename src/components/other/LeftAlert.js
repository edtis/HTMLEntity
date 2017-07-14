var React = require('react');
var Reflux = require('reflux');
var AlertStore = require('../../stores/alert-store');


var Motion = require('react-motion').Motion;
var spring = require('react-motion').spring;


module.exports = React.createClass({
	mixins: [Reflux.listenTo(AlertStore, "handleAlertStore")],
	getInitialState:function(){
		return {
			show: false
		}
	},
	handleAlertStore:function(obj){
		if(obj.qualifier === "LeftAlert"){
			switch(obj.type){
				case "leftShow":
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
				<Motion defaultStyle={{y: 50}} style={{y: this.state.show ? spring(0) : spring(50)}}
					onRest={this.handleFinish}>
					{function(style){
						return (
							<div
							className="left-alert"
							style={{
				          position: "absolute",
				          top: style.y,
				          left: -225,
				          width: 160,
				          height: 40,
				          textAlign: "center",
				          color: "#ffffff",
				          fontWeight: 500,
				          lineHeight: "40px",
				          background: "rgba(231, 130, 166, 0.7)",
				          zIndex: "100"
				        }}>
				        Click to Copy
				     	</div>
						);
					}.bind(this)}
				</Motion>
  )}
});
