var React =  require('react');
var classNames = require('classnames');
var SingleOption = require('./SingleOption.jsx');
/**
 *
 */
var propTypes = {
    placeholder: React.PropTypes.string,
    value: React.PropTypes.object
  };
var comp = React.createClass({
  render: function() {
    var obj = this.props.value;
    //console.log(this.props);
    return (
        
        <div className="Select-placeholder">
                {obj ? (
                    <SingleOption date={obj.date} fullStatus={obj.fullStatus}/>
                ) : (
                    this.props.placeholder
                )
                }
        </div>
    );

  },

  noop: function(){}

});

module.exports = comp;