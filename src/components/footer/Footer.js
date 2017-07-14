var React = require('react');
var MoreInfo = require('./MoreInfo');
var Saved = require('./Saved');

module.exports = React.createClass({

	render: function() {
    return (
      <footer>
    		<div className="row">
    				<MoreInfo />
						<Saved />

    		</div>
	</footer>
  )}
});
