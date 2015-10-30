var React =  require('react');
var classNames = require('classnames');
/**
 *
 */
var comp = React.createClass({

  render: function() {
    //<span class=\'text-dark-gray\'>11/03(二)&amp;nbsp;出發</span>&amp;emsp;<span class=\'text-green\'></span>
    var obj = this.props.options;
    return (
        
        <div className={this.props.className}
            onMouseEnter={this.props.mouseEnter}
            onMouseLeave={this.props.mouseLeave}
            onMouseDown={this.props.mouseDown}
            onClick={this.props.mouseDown}>
            <span className='text-dark-gray'>{obj.label}&amp;nbsp;出發</span>&amp;emsp;<span className='text-green'>{obj.fullStatus}</span>            
        </div>
    );

  },

  noop: function(){}

});

module.exports = comp;