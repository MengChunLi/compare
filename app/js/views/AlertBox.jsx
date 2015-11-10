var React =  require('react');
var classNames = require('classnames');
var actions = require('../actions/CompareAction');

var comp = React.createClass({
  componentWillReceiveProps: function(nextProps){
    // reset the timer if nextProps.showAlert is true
    //console.log('componentWillReceiveProps', nextProps.showAlert, this.props.showAlert);
    if (nextProps.showAlert) {
      this.setTimer();
    }
  },
  componentDidMount: function(){
      //this.setTimer();
  },
  setTimer: function(){
    // clear any existing timer
    this._timer != null ? clearTimeout(this._timer) : null;
    this.refs.alertMsg.classList.add("active");
    // hide after `delay` milliseconds
    this._timer = setTimeout(function(){
      //console.log('hide');
      actions.hideAlert();
      this.refs.alertMsg.classList.remove("active");

      this._timer = null;
    }.bind(this), this.props.delay);
  },
  render: function(){
    //console.log(this.props.showAlert);
    return <div ref="alertMsg" className="compare-alert-msg">{this.props.children}</div>

  }
});

module.exports = comp;