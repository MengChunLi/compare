var React =  require('react');
var classNames = require('classnames');
/**
 *
 */
var propTypes = {
    addLabelText: React.PropTypes.string,
    className: React.PropTypes.string,
    mouseDown: React.PropTypes.func,
    mouseEnter: React.PropTypes.func,
    mouseLeave: React.PropTypes.func,
    option: React.PropTypes.object.isRequired,
    renderFunc: React.PropTypes.func
  };
var comp = React.createClass({
  render: function() {
    var obj = this.props.option;
    return (
        
        <div className={this.props.className}
            onMouseEnter={this.props.mouseEnter}
            onMouseLeave={this.props.mouseLeave}
            onMouseDown={this.props.mouseDown}
            onClick={this.props.mouseDown}>
            <span className='text-dark-gray'>{obj.date} 出發  </span><span className='text-green'>{obj.fullStatus}</span>            
        </div>
    );

  },

  noop: function(){}

});

module.exports = comp;