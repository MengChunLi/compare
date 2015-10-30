var React =  require('react');
var comp = React.createClass({
    render: function() {
      return (
        <div className="left-side">
            <div className="prod-left-box">
                <div className="grid-index">{this.props.index + 1}</div>
                <div className="prod-img focuspoint" data-focus-x="0.0" data-focus-y="-0.0">
                    <div className="prod-img-mask"><span>訂購</span><i className="icon-cricle-arrow"></i></div>
                    <img src={this.props.prod.vImgUrl} width="300" height="210"/>
                </div>
            </div>
            <div className="prod-right-box">
                <a href="" className=""><h1 className="prod-title">{this.props.prod.prodNm}</h1></a>
            </div>
        </div>
      );
    }
});

module.exports = comp;
