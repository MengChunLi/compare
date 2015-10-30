var React =  require('react');
var shortId = require('shortid');
var actions = require('../actions/CompareAction');
var comp = React.createClass({
    render: function() {
    console.log(this.props.truth.selectedItem);
    var miniImg = this.props.truth.selectedItem
        .map(function(item) {
            var _key = shortId.generate();
            return  <div className="mini-img-box" key={_key}>
                        <button className="delete-btn" type="button" pfProdNo={item.pfProdNo} onClick={this.handleRemove}>x</button>
                        <a className="mini-img" href={item.prodUrl} target="_blank">
                            <img src={item.vImgUrl} />
                        </a>
                    </div>
        }, this)
        return (
            <div className="compare-temp-box">
                <div className="title">
                    商品比較現有 (<span className="compare-prod-count">{this.props.truth.selectedItem.length}</span>) 筆
                    <button type="button" className="close closeCompareBox" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                </div>
                <div className="mini-images">{miniImg}</div>
                <a href="#" className="btn-green btn-compare compareLink" target="_blank" onClick={this.handleSubmit}>立即比較</a>
                <button type="button" className="close clean-all clear-compare-box" onClick={this.handleClear}><span>清除所有項目</span></button>
            </div>
        );
    },

    getQStr: function(arr) {
        var result = "";
        for (var i = 0; i < arr.length; i++) {
            result += arr[i];
            if(i !== (arr.length - 1)){
                result += '&';
            }
        };
        return result;
    },

    handleSubmit: function(event) {
        event.preventDefault();
        var selectedItem = this.props.truth.selectedItem;
        //console.log(selectedItem);
        var prodNoArr = selectedItem.map(function(item) {
            var q = 'prod=' + item.pfProdNo;
            return q;
        });
        var qString = this.getQStr(prodNoArr);
        var BASEURL = '/results?';
        var openUrl = BASEURL + qString;
        console.log(openUrl);

        window.open(openUrl, "_blank");

    },

    handleRemove: function(event) {
console.log('12');
      console.log(this.props.pfProdNo);

    },

    handleClear: function(event) {

      actions.removeAll();

    },

    noop: function(){}
});

module.exports = comp;
