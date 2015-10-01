/**
 *
 */
var AddCompare = React.createFactory(require('./AddCompare.jsx'));

var comp = React.createClass({
    render: function() {
      return (
        <div className="right-side">
            <div className="right-side-padding">
                <div className="travel-days"><span>{this.props.prod.travelDays}</span>天</div>
                <div className="price-box clr-both">
                    <span className="text-price text-orange">{this.props.prod.price}</span>
                    <span className="text-mini">元起</span>
                </div>
                <div>
                    <span className="text-price-o">{this.props.prod.priceO}</span>
                    <span className="text-mini">元起</span>
                </div>
                <div className="list-arrow-box">
                    <span className="list-arrow"></span>
                </div>
            </div>
            <AddCompare />
        </div>
      );
    }
});

module.exports = comp;
