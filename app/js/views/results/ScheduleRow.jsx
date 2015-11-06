var React =  require('react');
var classNames = require('classnames');
var shortId = require('shortid');
/**
 *
 */
var comp = React.createClass({
  getInitialState: function() {
    return {
      isDone: false
    };
  },
  /**
   * didMount 代表 react 元件已出現在 DOM 上，
   * ajax loading done and did mount
   */
  componentDidMount: function(){
      this.setState({isDone: true});
  },

  /**
   *
   */
  render: function() {
    //console.log(this.props.schedule);

      var arr = this.props.prods.map(function(item) {
        //console.log(item);
        var compareList = classNames({
          'compare-list': true,
          'compareListSchedule0': true,
          'visible':  true
        });
        var keyID = shortId.generate();
        return  <div key={keyID} className={compareList}>
                  <div className="list-block">
                    <div className="iti-info">
                      <div className="proc-brief">{item.pfProDScheduleds[this.props.index].procBrief}</div>
                      <div className="iti-block">
                        <i className="icon-eat"></i>
                        <div>早餐: {item.pfProDScheduleds[this.props.index].breakfast}</div>
                        <div>午餐: {item.pfProDScheduleds[this.props.index].lunch}</div>
                        <div>晚餐: {item.pfProDScheduleds[this.props.index].dinner}</div>
                      </div>
                      <div className="iti-block">
                        <i className="icon-house"></i>
                        <div>住宿: {item.pfProDScheduleds[this.props.index].htlDesc}</div>
                      </div>
                    </div>
                  </div>
                </div>
      }, this);
    
    return (
      
      <div className="list-block-box scheduleRow">
        <div className="compare-item-title">
          <div className="title-circle title-circle-green nth-day">
            <span>第</span>
            <span className="text-lg">{this.props.schedule.days}</span>
            <span>天</span>
          </div>
        </div>
        <div className="compare-list-box">
          {arr}
        </div>
      </div>
    );

  },


  noop: function(){}

});

module.exports = comp;
