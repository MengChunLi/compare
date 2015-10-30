var React =  require('react');
var classNames = require('classnames');
var Select = require('react-select');

var DateOption = React.createFactory(require('./DateOption.jsx'));
/**
 *
 */

var options = [
      { value: '0', label: '20151012' },
      { value: '1', label: '20151015' }
  ];
var comp = React.createClass({

  render: function() {
   
    

    return (
      
      <Select placeholder="請選擇出發日期"
              value="0"
              optionComponent={DateOption}
              options={options}
              searchable={false}
              onChange={this.handleChange} />
    );

  },

  handleChange: function(val){
    console.log("Selected: " + val);
  },

  noop: function(){}

});

module.exports = comp;
