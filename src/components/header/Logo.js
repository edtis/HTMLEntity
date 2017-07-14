var React = require('react');

module.exports = React.createClass({

	render: function() {
    return (
      <div className="row">
        <div className="col-xs-12 mobile-header">
          <nav className="navbar navbar-default" style={{height:"55px", width:"100%", backgroundColor:"transparent", border:"none"}}>
            <div className="container-fluid">
              <a className="navbar-brand text-center tablet-logo" href="#"><img src="imgs/logo.png" className="img-responsive text-center" width="90%" alt="logo" /></a>
              <div className="navbar-header">
               <div className="nav-bars-wrapper">
              <div className="nav-bars-inner" style={{padding: "20px 20px 0 0"}}>
                <div className="nav-bars" data-toggle="collapse" data-target=".navbar-collapse"><span></span></div>
              </div>
          </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
              <div className="col-xs-2 col-xs-offset-4" style={{paddingBottom:"30px", paddingLeft:"50px"}}>
                <a className="navbar-brand text-center desktop" href="#"><img src="imgs/logo.png" width="250" alt="logo" /></a>
              </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
  )}
});
