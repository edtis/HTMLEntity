var React = require('react');
var Reflux = require('reflux');
var SavedChoices = require('./SavedChoices');
var SaveActions = require('../../actions/saveActions');
var SaveStore = require('../../stores/save-store');
var AlertActions = require('../../actions/alertActions');



module.exports = React.createClass({
  mixins: [Reflux.listenTo(SaveStore, "handleSaveStore")],
  getInitialState: function(){
    return {
      savedButton : true,
      saved: false,
      combinedDataIndexes: false,
    }
  },
  handleSaveStore:function(obj){
    if(obj.qualifier === "Saved"){
				switch(obj.type){
				case "save":
						this.setState({savedButton: obj.data});
						break;
          case "savedData":
          this.setState({saved: obj.data});
          break;
          case "combinedDataIndexes":
          this.setState({combinedDataIndexes: obj.data});
          break;
          case "clear":
           obj.data ? AlertActions.topAlert() : null;
          break;
				}
		}
  },

  handleRadioButton: function(){
    SaveActions.activateSaveInLocalStorage(!this.state.savedButton ? "on" : "off");
    SaveActions.broadcastSaveState(!this.state.savedButton);
  },
  handleClearButtonOnClick:function(){
    this.setState({saved:false, combinedDataIndexes: false});
    SaveActions.clearSave();
  },

	render: function() {
    return (
      <div className="col-sm-3  col-sm-offset-6 hidden-xs" data-toggle="tooltip" data-placement="top" title="Your most recent choices" style={{position:"fixed", bottom:0, right: "50px"}}>
            <div className="panel-heading" role="tab" id="headingTwo">
              <a role="button" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo" aria-expanded="true" aria-controls="collapseOne">
                  <h4 className="panel-title">
                    Saved
                    {this.state.savedButton
                      ? <span className="pull-right yellow" style={{paddingRight:"10px", color:"rgba(231,130,165,1.00)"}}>ON</span>
                      : <span className="pull-right yellow" style={{paddingRight:"10px", color:"rgba(78,129,160,1.00)"}}>OFF</span>}
                  </h4>
                </a>
            </div>
            <div id="collapseTwo" className="panel-collapse collapse out" role="tabpanel" aria-labelledby="headingOne">
              <div className="panel-body">
                <div>{this.state.saved ? "Most recent choices" : "None saved."}</div>
                {this.state.saved && this.state.combinedDataIndexes
                  ? <SavedChoices savedData={this.state.saved} combinedDataIndexes={this.state.combinedDataIndexes} />
                  : null}


                <label htmlFor="savedButton-on">ON
                    <input
                            id="savedButton-on"
                            type="radio"
                            className="radio-set"
                            checked={this.state.savedButton ? true : false}
                            name="radio-set"
                            onChange={this.handleRadioButton}/>
                  </label>
               	 <label htmlFor="savedButton-off">OFF
                    <input
                            id="savedButton-off"
                            type="radio"
                            className="radio-set"
                            checked={this.state.savedButton ? false : true}
                            name="radio-set"
                            onChange={this.handleRadioButton}/>
                  </label>
  							 <span className="label label-default pull-right" style={{cursor: "pointer"}} onClick={this.handleClearButtonOnClick}>Clear</span>
              </div>
            </div>
      </div>
  )}
});
