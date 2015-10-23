var shortId = require('shortid');
var actions = require('../actions/CompareAction');
var comp = React.createClass({
    render: function() {
      var miniImg = this.props.truth.selectedItem
        .map(function(item) {
            var _key = shortId.generate();
            return <div className="mini-img-box" key={_key}>
                <button className="delete-btn" type="button">x</button>
                <a className="mini-img" href={item.prodUrl} target="_blank">
                    <img src={item.vImgUrl} />
                </a>
                </div>
        })
        return (
            <div className="compare-temp-box">
                <div className="title">
                    商品比較現有 (<span className="compare-prod-count">{this.props.truth.selectedItem.length}</span>) 筆
                    <button type="button" className="close closeCompareBox" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                </div>
                <div className="mini-images">{miniImg}</div>
                <a href="#" className="btn-green btn-compare compareLink" target="_blank">立即比較</a>
                <button type="button" className="close clean-all clear-compare-box" onClick={this.handleClick}><span>清除所有項目</span></button>
            </div>
        );
    },

    handleClick: function(event) {

      actions.removeAll();

    },

    noop: function(){}
});

module.exports = comp;
