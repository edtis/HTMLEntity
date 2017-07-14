var React = require('react');
var Logo = require('./Logo');
var NavBar = require('./NavBar');
var TopBanner = require('./TopBanner');

module.exports = React.createClass({

	render: function() {
    return (
      <header>
					<TopBanner />
      		<Logo />
      		<NavBar />
      </header>
  )}
});
