var React = require('react');
var Header = require('./header/Header');
var Lead = require('./other/Lead');
var ListContainer = require('./app/ListContainer');
var Footer = require('./footer/Footer');

var Main = React.createClass({

	render: function() {
    return (
    	<div>
				<Header />
				<Lead />
				<ListContainer />
				<Footer />
    	</div>


  )}
});

module.exports = Main;
