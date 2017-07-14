var React = require('react');
var Reflux = require('reflux');
var MenuActions = require('../../actions/menuActions');
var AlertActions = require('../../actions/alertActions');
var SaveActions = require('../../actions/saveActions');
var MenuStore = require('../../stores/menu-store');
var SaveStore = require('../../stores/save-store');
var StaggerItems = require('./StaggerItems');
var NoStaggerItems = require('./NoStaggerItems');




module.exports = React.createClass({
	mixins: [Reflux.listenTo(MenuStore, "handleMenuStore"),Reflux.listenTo(SaveStore, "handleSaveStore")],
	getInitialState: function(){
		return {
			hover: false,
			hoverSection: "",
			save: true,
			libraryIndex: null,
			defaultStyles: []
		}
	},
	componentWillMount: function(){
		SaveActions.getSaveState();
	},
	handleMenuStore:function(obj){
		if(obj.qualifier === "ListData"){
				switch(obj.type){
					case "hover":
						if(this.state.hoverSection !== obj.data){
								this.setState({hover: false, hoverSection:obj.data});
								this.showAlert();
						}
						break;
				}
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

	handleOnMouseEnter:function(index,event){
		event.stopPropagation();
		MenuActions.makeNavButtonActive(index);
		this.setState({libraryIndex : index});
	},

	render: function() {
							return (
								<ul>
									{this.props.menuData.map(function(menuObj,i){
												var len =menuObj.id.length;
												var id = menuObj.id.slice(1,len); //remove the pound sign
												return (
													<span
														key={i}
														id={id}
														onMouseEnter={this.handleOnMouseEnter.bind(this, i)}
														className={this.props.showSearch ? "hidden" : "visible" }
														>
															<li className="text-center"><strong>{menuObj.title}</strong></li>
															<hr />
																{i === 0
																	? <StaggerItems saveState={this.state.save} listData={this.props.listData} combinedDataIndex={this.props.combinedDataIndex} libraryIndex={i} />
																	:	<NoStaggerItems saveState={this.state.save} listData={this.props.listData} combinedDataIndex={this.props.combinedDataIndex} libraryIndex={i} />
																}

													</span>
												);

									}.bind(this))}

								</ul>
							);

  }
});
