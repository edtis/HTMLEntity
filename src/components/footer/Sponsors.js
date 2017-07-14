var React = require('react');

module.exports = React.createClass({

	render: function() {
    return (

    			<div className="col-sm-3 hidden-xs" data-toggle="tooltip" data-placement="top" title="Tooltip on top" style={{position:"fixed", bottom:0, left: 0}}>
    				<a role="button" data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
    					      <h4 className="panel-title">Sponsors</h4>
    				</a>
    				    <div id="collapseOne" className="panel-collapse collapse out" role="tabpanel" aria-labelledby="headingOne">
    				      <div className="panel-body">
										<a href="http://www.edtis.com" target="new">
											<img
												src="imgs/Edtis_banner1.png"
												className="img-responsive"
												width="400"
												style={{marginBottom:"20px", display: "inline", textAlign:"center", marginLeft:"20px"}} />
										</a>

              		</div>
    				    </div>
    			</div>

  )}
});
