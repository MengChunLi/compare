/**
 *
 */
var classNames = require('classnames');
var utils = require('../../utils/utils.js');
var shortId = require('shortid');
/**
 *
 */
var comp = React.createClass({
  getInitialState: function() {
    return {
      isDone: false,
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

    var arr = this.props.prods.map(function(item) {
      var compareList = classNames({
        'compare-list': true,
        'notFound': !item.isSuccess,
        'loading': !this.state.isDone
      });

      var airInfo = item.pfProAirinfos.map(function(air) {
        var airKey = shortId.generate();
        // 後端資料格式需要處理
        var depDate = utils.formatDateSlashShort(air.departDate);
        var depTime = utils.formatTime(air.departTime);
        var arrTime = utils.formatTime(air.arriveTime);
        return <div className="airinfo-box" key={airKey}>
                  <div className="depart-date">{depDate}</div>
                  <div className="air-info">
                    <div className="dep-arr">
                      <span>{air.departAirportNm}</span>
                      <i className="icon-to"></i>
                      <span>{air.arriveAirportNm}</span>
                    </div>
                    <div className="dep-arr">
                      <span>{air.aircompany} {air.aircompanyCode}{air.scheduleNo}</span>
                    </div>
                    <div className="air-time">{depTime} - {arrTime}</div>
                  </div>
                </div>
      });
      return  <div key={item.pfProdNo} className={compareList}>
                <div className="list-block">
                  <select className="select-depDate" data-width="100%">
                    <option value="0" data-content="<span class='text-dark-gray'>11/03(二)&amp;nbsp;出發</span>&amp;emsp;<span class='text-green'></span>" selected="true"></option>
                  </select>
                  <div className="airInfo">
                    <div className="green-border-top">

                      {airInfo}

                    </div>
                  </div>
                </div>
              </div>
    }, this);
    
    return (
      
      <div className="list-block-box compare-airinfo">
        <div className="compare-item-title">
          <div className="title-circle title-circle-orange">
            <h3>航班<br />資訊</h3>
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
