var React = require('react');
var MenuActions =require('../../actions/menuActions');
var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;

module.exports = React.createClass({
	mixins: [ReactScriptLoaderMixin],
	getInitialState:function(){
		return {visible: false}
	},
	getScriptURL: function() {
        return 'js/scrollbar.js';
  },
	onScriptLoaded: function() {
		// console.log('loaded');
    },
		onScriptError: function() {
			console.log('Script was not loaded');

	 },

	componentWillMount:function(){
		setTimeout(function(){
			this.setState({visible: true})
		}.bind(this), 7000);
	},

	makeActive:function(index){
		MenuActions.makeNavButtonActive(index);
	},
	handleOnMouseEnter:function(event){
		event.stopPropagation();
		event.preventDefault();
	},
	createMenu: function(menuData){
		return menuData.map(function(menuObj, i){
			return(
				<li key={i}>
					<a href="javascript:void(0)" className="navigation" id={menuObj.id}>
						<div
								onMouseEnter={this.handleOnMouseEnter}
								onMouseOver={this.handleOnMouseEnter}
								className={menuObj.active ? "hidden-xs purple tooltips" : "hidden-xs tooltips"}
								data-toggle="tooltip"
								data-placement="right"
								title={menuObj.title}
								data-original-title={menuObj.title}
								onClick={this.makeActive.bind(this,i)}
								/>
					</a>
				</li>
			);
		}.bind(this));
		this.getScriptURL();
	},

	render: function() {
    return (
      <aside className="hidden-xs col-sm-2 col-md-2 col-lg-2">
					<nav className={this.props.hideMenu ? "hidden" : "visible"}>
						<ul className={this.state.visible ? "visible" : "hidden"}>
							{this.props.menuData ? this.createMenu(this.props.menuData) : null}
						</ul>
					</nav>
				</aside>
  )}
});
