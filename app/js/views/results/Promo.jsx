var React =  require('react');
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
      return <div key={item.pfProdNo} className={compareList}>
                <div className="list-block">
                  <div className="promoContent">
                    <p className="text-orange">{item.prodPromotion}</p>
                  </div>
                </div>
            </div>
    }, this);
    
    return (
      
      <div className="list-block-box compare-promo">
        <div className="compare-item-title">
          <div className="title-circle title-circle-orange">
            <h3>優惠<br />內容</h3>
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
