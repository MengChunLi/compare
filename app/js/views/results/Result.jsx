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
var init = true;

var comp = React.createClass({

    getInitialState: function() {console.log('getInitialState');
      var o = this.getTruth();
      //console.log(o);
      return o;
    },

    componentWillMount: function() {
      if(init){
        this._init();
        init = false;
      }
      
      //console.log('componentWillMount');
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
      //console.log('this.state', this.state);
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
      var selectedProd = {'index': index, 'prodNo': val, 'url': otherDateApi};
      //var newState = $.extend( {}, this.state, {'selectedProd': selectedProd} );
      // this.setState(newState);
      actions.updateResult( selectedProd );
      //this.setState({prod : newProd, prods: []});
      //console.log('newState', newState);
      //console.log("Parent Selected: " , this.state);
    },

    _init: function(){
      //console.log('_init');
      this.state.prod.forEach(function(entry, i) {
        this.getProdsData(entry, i);
      }, this);
    },

    _onChange: function(){
      var truth = this.getTruth();
      // 重要：從 root view 觸發所有 sub-view 重繪
      this.setState( this.getTruth() );
      //console.log('_onChange', truth);
      this.getProdsData(truth.selectedProd.url, truth.selectedProd.index);
    },

    getProdsData: function(entry, index) {
      if(entry.url){
        var url = entry.url;
      }else{
        var url = entry;
      }
      $.ajax({
          type: 'GET',
          url: url,
          dataType: 'json',
          success: function(data) {
            data.isSuccess = true;
            _prods[index] = data;
            //console.log('success', data);
          }.bind(this),
          error: function(e) {
            _prods[index] = {isSuccess: false};
            console.log('error', e);
          }.bind(this),
          complete: function(e) {
            
            var newState = $.extend( {}, this.state, {'prods': _prods} );
            //console.log('complete', newState);
            this.setState(newState);
          }.bind(this)
        });
    },

    getTruth: function(){
      return ResultsStore.getAll();
    },

    noop: function(){}
});

module.exports = comp;
