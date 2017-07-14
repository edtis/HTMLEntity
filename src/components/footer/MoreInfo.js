var React = require('react');

module.exports = React.createClass({

	render: function() {
    return (

    			<div className="col-sm-3 hidden-xs" style={{position:"fixed", bottom:0, left: 0}}>
    				<a role="button" data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
    					      <h4 className="panel-title">More Info</h4>
    				</a>
    				    <div id="collapseOne" className="panel-collapse collapse out" role="tabpanel" aria-labelledby="headingOne">
    				      <div className="panel-body">
									<a href="https://m.do.co/c/64da4898f8c2" target="_blank"><img style={{border:"0px", marginLeft: 20, marginBottom: 40}} src="imgs/digitaloceantoplogo.png" width="80%"  alt="fast hosting" /></a>
              		</div>
    				    </div>
    			</div>

  )}
});
