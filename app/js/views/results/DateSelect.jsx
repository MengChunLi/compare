var React =  require('react');
var classNames = require('classnames');
var Select = require('react-select');
var shortId = require('shortid');

var DATES = require('../../model/dates');

var DateOption = require('./DateOption.jsx');
/**
 *
 */

var comp = React.createClass({
  getInitialState: function() {
    return {
      options: [{'value': 0 ,'date' : this.props.saleDt, 'fullStatus': this.props.fullStatus}]
    };
  },

  componentWillMount: function() {
    var pfGProdNo = this.props.pfGProdNo;
    var ajaxURL = "/api/otherDate/" + pfGProdNo;
    $.ajax({
        type: 'GET',
        url: ajaxURL,
        dataType: 'json', //specify jsonp
        success: function(data) {
           var keyID = shortId.generate();
           // 每個選項必須有個唯一的value
           var _data = data.map(function(item, index) {
              item.value = index;
             return item;
           });
           console.log(_data);
           this.setState({
            options: _data
          });
        }.bind(this),
        error: function(e) {
          console.log('error', e);
        }.bind(this)
      });
  },

  render: function() {
   
    

    return (
      
      <Select 
              onOptionLabelClick={this.onLabelClick}
              placeholder="請選擇出發日期"
              value="0"
              optionComponent={DateOption}
              options={this.state.options}
              searchable={false} />
    );

  },

  handleChange: function(val){
    console.log("Selected: " + val);
  },

  noop: function(){}

});

module.exports = comp;
