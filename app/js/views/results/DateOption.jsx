var React =  require('react');
var classNames = require('classnames');
var SingleOption = require('./SingleOption.jsx');
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
            <SingleOption date={obj.date} fullStatus={obj.fullStatus}/>
        </div>
    );

  },

  noop: function(){}

});

module.exports = comp;