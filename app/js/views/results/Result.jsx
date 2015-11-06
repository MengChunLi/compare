var React =  require('react');
var shortId = require('shortid');
var ProdIntro = require('./ProdIntro.jsx');
var DetailPrice = require('./DetailPrice.jsx');
var Promo = require('./Promo.jsx');
var AirInfo = require('./AirInfo.jsx');
var ScheduleRow = require('./ScheduleRow.jsx');
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

      //console.log('componentWillMount');
      ResultsStore.addListener( AppConstants.CHANGE_EVENT, this._onChange );

    },

    componentDidMount: function() {
      console.log('componentDidMount');
      this._init();
    },
    //
    // unmount

    /**
     * 元件將從畫面上移除時，要做善後工作
     */
    componentWillUnmount: function() {
        ResultsStore.removeChangeListener( this._onChange );
    },

    shouldComponentUpdate: function(nextProps, nextState) {
      //console.log(nextState.prods.length, this.state.prod.length);
      // 當prods抓完所有資料再一次render
      return nextState.prods.length === this.state.prod.length;
    },

    render: function() {
      //console.log('this.state', this.state);
      var props = {
        prods: this.state.prods,
        onChange: this.handleFieldChange
      };
      // 避免 this.state.prods undefined
      if(this.state.prods.length > 0){
       //console.log(this.state.prods[0]);
        var travelDays = this.state.prods.map(function(element, index){
          return element.travelDay;
        });

        var row = this.state.prods[this.getMaxTravelDayIndex(travelDays)].pfProDScheduleds.map(function(item, index) {
          var keyID = shortId.generate();
          return <ScheduleRow key={keyID} prods={this.state.prods} index={index} schedule={item} />

        }, this);
      }
      return (
        <div className="wrap">
        <div className="container">
          <h1 className="text-main-title text-logo-green">國外旅遊商品比較</h1>
          <ProdIntro prods={this.state.prods}/>
          <DetailPrice prods={this.state.prods}/>
          <Promo prods={this.state.prods}/>
          <AirInfo {...props}/>
          {row}
        </div>
        </div>
      );
    },

    getMaxTravelDayIndex: function(travelDays){
      var maxTravelDayIndex = 0;
      var maxTravelDay = 0;
      for (var i = 0; i < travelDays.length; i++) {
        if(travelDays[i] > maxTravelDay){
          maxTravelDay = travelDays[i];
          maxTravelDayIndex = i;
        }
      };
      return maxTravelDayIndex;
    },

    handleChange: function(e){
      actions.updateTEST();
      console.log(e);
    },

    handleFieldChange: function(val, index){
      var otherDateApi = '/api/' + val;
      var selectedProd = {'index': index, 'prodNo': val, 'url': otherDateApi};
      actions.updateResult( selectedProd );
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
      console.log('_onChange', truth);

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
            if (this.isMounted()) {
              this.setState(newState);
            }
          }.bind(this)
        });
    },

    getTruth: function(){
      return ResultsStore.getAll();
    },

    noop: function(){}
});

module.exports = comp;
