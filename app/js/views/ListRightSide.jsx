var React =  require('react');
var AddCompare = require('./AddCompare.jsx');

var comp = React.createClass({
    render: function() {
      return (
        <div className="right-side">
            <div className="right-side-padding">
                <div className="travel-days"><span>{this.props.prod.travelDay}</span>天</div>
                <div className="price-box clr-both">
                    <span className="text-price text-orange">{this.props.prod.ezPrice1}</span>
                    <span className="text-mini">元起</span>
                </div>
                <div>
                    <span className="text-price-o">{this.props.prod.minPrice1}</span>
                    <span className="text-mini">元起</span>
                </div>
                <div className="list-arrow-box">
                    <span className="list-arrow"></span>
                </div>
            </div>
            <AddCompare prod={this.props.prod} selected = {this.props.selected} selectedItem ={this.props.selectedItem}/>
        </div>
      );
    }
});

module.exports = comp;
