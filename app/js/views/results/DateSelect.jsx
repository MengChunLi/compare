var React =  require('react');
var classNames = require('classnames');
var Select = require('react-select');
var shortId = require('shortid');

var DATES = require('../../model/dates');

var DateOption = require('./DateOption.jsx');
var DateOptionSingle = require('./DateOptionSingle.jsx');
/**
 *
 */

var propTypes = {
    index: React.PropTypes.int,
    pfProdNo: React.PropTypes.string,
    pfGProdNo: React.PropTypes.string,
    saleDt: React.PropTypes.string,
    fullStatus: React.PropTypes.string
};

var comp = React.createClass({
  getInitialState: function() {
    return {
      pfProdNo: this.props.pfProdNo,
      options: [{'value': this.props.pfProdNo ,'date' : this.props.saleDt, 'fullStatus': this.props.fullStatus}]
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
              item.value = item.prodNo;
             return item;
           });
           //console.log(_data);
           var newState = $.extend( {}, this.state, {'options': _data} );
           this.setState(newState);
        }.bind(this),
        error: function(e) {
          console.log('error', e);
        }.bind(this),
        complete: function(e) {
          var newState = $.extend( {}, this.state, {'isComplete': true} );
          this.setState(newState);
        }.bind(this)
      });
  },

  render: function() {

    return (
      
      <Select onChange={this.handleChange}
              onOptionLabelClick={this.onLabelClick}
              optionComponent={DateOption}
              value={this.state.pfProdNo}
              placeholder="請選擇出發日期"
              singleValueComponent={DateOptionSingle}
              options={this.state.options}
              searchable={false} />
    );

  },

  handleChange: function(val){
    //console.log("child Selected: ", val);
    this.props.onChange(val, this.props.index);
  },

  noop: function(){}

});

module.exports = comp;
