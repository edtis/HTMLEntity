var React = require('react');


module.exports = React.createClass({

  render: function(){
    return (
        <div className="row">
          <div className="col-xxs-12 col-xs-8 col-xs-offset-1 col-sm-offset-2 col-md-offset-3 col-lg-offset-4 lead-div">
            <p className="lead-text"><em>Go ahead</em> and search for <a href="" style={{textDecoration:"none"}}>{this.props.leadTitle}</a> below.</p>
          </div>
        </div>
    );
  }

});
