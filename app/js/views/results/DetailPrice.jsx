/**
 *
 */
var classNames = require('classnames');
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
      
      var room = item.pfProPrice4Introductions.map(function(cond) {
        var roomKey = shortId.generate();
        return <div className="room-type" key={roomKey}>
                  <span className="cond-type">{cond.cond2TypeName}{cond.cond3TypeName}</span>
                  <span className="text-price">{cond.mobileEzPrice1}</span> 元
                </div>
      });

      return <div key={item.pfProdNo} className={compareList}>
                <div className="list-block detail-price">
                  {room}
                </div>
            </div>
    }, this);
    
    return (
      
      <div className="list-block-box compare-price">
        <div className="compare-item-title">
          <div className="title-circle title-circle-orange">
            <h3>售價<br />說明</h3>
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
