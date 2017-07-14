var React = require('react');
var ListData = require('./ListData');
var AsideMenu = require('./AsideMenu');
var DataActions = require('../../actions/dataActions');
var MenuActions = require('../../actions/menuActions');
var Reflux = require('reflux');
var DataStore = require('../../stores/data-store');
var MenuStore = require('../../stores/menu-store');
var AlertSystem = require('../other/AlertSystem');
var Motion = require('react-motion').Motion;
var spring = require('react-motion').spring;
var Display = require('../other/Display');


var customPreset = {stiffness: 210, damping: 50};


module.exports = React.createClass({
	mixins: [Reflux.listenTo(DataStore, "handleDataStore"), Reflux.listenTo(MenuStore, "handleMenuStore")],
	getInitialState:function(){
		return {
			data : null,
			menuData : null,
			combinedDataIndex: 0,
			showEllipsis: false,
			showSearch: false,
			searchData: {},
			openListContainer: true,
			showComponent:false,
			showScriptLoader:false
		}
	},
	componentWillMount: function(){
		MenuActions.initialize(this.state.combinedDataIndex);
		DataActions.initialize(this.state.combinedDataIndex);
	},

	handleOnRest:function(){
		setTimeout(function(){
			this.setState({showComponent: true})
		}.bind(this),700);

	},
	render: function() {
    return (
      <section id="app" className="app">
		      <div className="container">
							<AlertSystem />

			         <div className="row">
								 	<Motion
											defaultStyle={{scale:0}}
											style={{scale:this.state.openListContainer ? spring(1) : spring(0)}}
											onRest={this.handleOnRest}
											>
											{function(styles){
												return(
													<main
														className="col-xxs-12 col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4"
														style={{
															WebkitTransform: "scaleY(" + styles.scale + ")",
						    							transform: "scaleY(" + styles.scale + ")",
						    							WebkitTransformOrigin: "top center",
						    							transformOrigin: "top center"
														}}>
														<Display if={this.state.showComponent}>
															<ListData
																listData={this.state.data}
																menuData={this.state.menuData}
																showSearch={this.state.showSearch}
																showEllipsis={this.state.showEllipsis}
																searchData={this.state.searchData}
																combinedDataIndex={this.state.combinedDataIndex}
																/>

														</Display>

		                      </main>
												);
											}.bind(this)}
				            </Motion>
										 <AsideMenu menuData={this.state.menuData} hideMenu={this.state.showSearch} showScriptLoader={this.state.showScriptLoader} />
                </div>
          </div>
      </section>
  )},
	handleDataStore:function(data){
		switch (data.type) {
		    case "items" :
						this.setState({data: data.data});
		        break;
				case "visibility":
						this.setState({showSearch: data.data});
						break;
				case "activateEllipsis":
						this.setState({showEllipsis: data.data});
						break;
				case "SearchResults":
						this.setState({searchData: data.data})
						break;
		}
	},
	componentWillUpdate:function(){
		if(!this.state.openListContainer){
			setTimeout(function(){
				this.setState({openListContainer: true});
			}.bind(this),650);
			DataActions.getNewData(this.state.combinedDataIndex);

		 }

	},
	handleMenuStore:function(data){
		switch (data.type) {
				case "menu":
					this.setState({menuData: data.data});
					setTimeout(function(){
						this.setState({showScriptLoader: true});
					}.bind(this), 1000)
					break;
				case "items":
					this.setState({
						data:data.data[0],
						openListContainer: data.data[0],
						showComponent: data.data[0],
						combinedDataIndex: data.data[1]
					});
					MenuActions.initialize(data.data[1]);
				break;
		}
	}
});
