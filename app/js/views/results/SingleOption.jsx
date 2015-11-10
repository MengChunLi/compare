var React =  require('react');
var classNames = require('classnames');
/**
 *
 */
var comp = React.createClass({
  render: function() {
    var textClass = classNames({
      'text-dark-gray' : !this.props.fullStatus
    });
    return (
        <div>
            <span className={textClass}>{this.props.date} 出發 {this.props.fullStatus}</span>
        </div>
    );

  },

  noop: function(){}

});

module.exports = comp;