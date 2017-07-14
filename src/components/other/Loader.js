var React = require('react');
var Reflux = require('reflux');
var MenuStore = require('../../stores/menu-store');
var Motion = require('react-motion').Motion;
var spring = require('react-motion').spring;

var customPreset = {stiffness:100, damping: 50};


module.exports = React.createClass({
  mixins: [Reflux.listenTo(MenuStore, "handleMenuStore")],
  getInitialState:function(){
    return {showGears:true}
  },
  handleMenuStore:function(data){
    if(data.qualifier === "Loader"){
      switch (data.type) {
        case "showGears":
          this.setState({showGears:data.data})
          break;
        }
    }
  },
  handleOnRest:function(){
    setTimeout(function(){
      this.setState({showGears:false})
    }.bind(this),5000);
  },
  render:function(){
    return (
      <div>
        <Motion
          defaultStyle={{opacity:0}}
          style={{opacity:this.state.showGears ? spring(1,customPreset) : spring(0)}}
          onRest={this.handleOnRest}
          >
            {function(styles){
              return (
                <img  src="imgs/gears.gif"
                      style={{
                        position:"absolute",
                        top: 0,
                        left: -59,
                        opacity: styles.opacity
                      }}
                />
              );
            }.bind(this)}

      </Motion>
      </div>
    );
  }
});
