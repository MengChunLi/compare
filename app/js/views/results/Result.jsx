var React =  require('react');

var ProdIntro = require('./ProdIntro.jsx');
var DetailPrice = require('./DetailPrice.jsx');
var Promo = require('./Promo.jsx');
var AirInfo = require('./AirInfo.jsx');
var AppConstants = require('../../constants/AppConstants');
var ResultsStore = require('../../stores/ResultsStore');
var actions = require('../../actions/ResultsAction');

var _prods = [];
var _isSuccess = [];
var comp = React.createClass({

    getInitialState: function() {console.log('getInitialState');
      var o = this.getTruth();
      //console.log(o);
      return o;
    },

    componentWillMount: function() {
      this._onChange();
      console.log('componentWillMount');
      ResultsStore.addListener( AppConstants.CHANGE_EVENT, this._onChange );
    },
    //
    // unmount

    /**
     * 元件將從畫面上移除時，要做善後工作
     */
    componentWillUnmount: function() {
        ResultsStore.removeChangeListener( this._onChange );
    },

    render: function() {
      console.log('this.state.prods', this.state.prods);
      var props = {
        prods: this.state.prods,
        onChange: this.handleFieldChange
      }
      return (
        <div className="container">
          <h1 className="text-main-title text-logo-green">國外旅遊商品比較</h1>
          <ProdIntro prods={this.state.prods}/>
          <DetailPrice prods={this.state.prods}/>
          <Promo prods={this.state.prods}/>
          <AirInfo {...props}/>
        </div>
      );
    },

    handleFieldChange: function(val, index){
      var otherDateApi = '/api/' + val;
      var newVal = {'prodNo': val, 'url': otherDateApi}
      actions.updateResult( newVal, index );
      //this.setState({prod : newProd, prods: []});
      //console.log("Parent Selected: " , newVal, index);
    },

    _onChange: function(){
      console.log('_onChange');
      _prods = [];
      this.state.prod.forEach(function(entry) {
        //console.log('entry: ',entry);
        this.getProdsData(entry);
      }, this);
    },

    getProdsData: function(entry) {
      $.ajax({
          type: 'GET',
          url: entry.url,
          dataType: 'json',
          success: function(data) {
            data.isSuccess = true;
            _prods.push(data);
          }.bind(this),
          error: function(e) {
            _prods.push({isSuccess: false});
            console.log('error', e);
          }.bind(this),
          complete: function(e) {
            //console.log(_prods);
            this.setState({
              prods: _prods
            });
          }.bind(this)
        });
    },

    getTruth: function(){
      return ResultsStore.getAll();
    },

    noop: function(){}
});

module.exports = comp;
