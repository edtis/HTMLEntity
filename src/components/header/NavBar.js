var React = require('react');
var MenuActions = require('../../actions/menuActions');
var MenuStore = require('../../stores/menu-store');
var SaveActions = require('../../actions/saveActions');




module.exports = React.createClass({

	render: function() {
    return (
      <div>
      <div className="row mobile mobile-nav">
        <div>
          <div className="col-xs-12">
            <nav id="nav-links-mobile">
            <div className="collapse navbar-collapse">
                  <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">More <span className="caret"></span></a>
                <ul className="dropdown-menu">
									<li><a href="javascript:void(0)" onClick={this.handleOnClick.bind(this, 0)}>HTML entities</a></li>
                  <li><a href="javascript:void(0)" onClick={this.handleOnClick.bind(this, 1)}>UX Colors</a></li>
                  <li><a href="javascript:void(0)" onClick={this.handleOnClick.bind(this, 2)}>JS Character Codes</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="https://affiliates.a2hosting.com/idevaffiliate.php?id=8675&url=893&tid1=navMobile" target="new">Node Hosting</a></li>
                </ul>
              </li>
                  </ul>
                </div>
            </nav>
          </div>
      </div>
      </div>
      <div className="row desktop">
        <div className="container-fluid" id="nav-links" style={{background:"rgba(243,243,243,1.00)"}}>
          <div className="col-xs-10">
            <nav id="nav-links-desktop">
            <div className="collapse navbar-collapse">
                  <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">More <span className="caret"></span></a>
                <ul className="dropdown-menu">
									<li><a href="javascript:void(0)" onClick={this.handleOnClick.bind(this, 0)}>HTML entities</a></li>
                  <li><a href="javascript:void(0)" onClick={this.handleOnClick.bind(this, 1)}>UX Colors</a></li>
                  <li><a href="javascript:void(0)" onClick={this.handleOnClick.bind(this, 2)}>JS Character Codes</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="http://www.edtis.com" target="new">Get My Rebate</a></li>
                </ul>
              </li>
                  </ul>
                </div>
            </nav>
          </div>
        </div>
      </div>
      </div>
  )},
	handleOnClick: function(combinedDataIndex){
				MenuActions.clearList(combinedDataIndex);
				SaveActions.sendSaveState();
	}
});
