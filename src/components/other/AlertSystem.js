var React = require('react');
var LeftAlert = require('./LeftAlert');
var AlertMask = require('./AlertMask');
var RightAlert = require('./RightAlert');
var TopAlert = require('../other/TopAlert');
var Loader = require('./Loader');

module.exports = React.createClass({
	render: function() {
    return (
      <div className="row">
            <div className="col-xxs-12 col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4"
                  style={{position: "relative"}}>
                  <LeftAlert />
                  <AlertMask />
                  <RightAlert />
									<Loader />
            </div>
						<TopAlert topAlertColor="success" topAlertText="Storage has been cleared." />

       </div>
  )}
});
