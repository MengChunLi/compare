var comp = React.createClass({
    render: function() {
      return (
        <div className="compare-alert-msg"></div>
          <div className="compare-temp-box">
              <div className="title">
                  商品比較現有 (<span className="compare-prod-count">0</span>) 筆
                  <button type="button" className="close closeCompareBox" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div className="mini-images"></div>
              <a href="#" className="btn-green btn-compare compareLink" target="_blank">立即比較</a>
              <button type="button" className="close clean-all clear-compare-box"><span>清除所有項目</span></button>
          </div>
      );
    }
});

module.exports = comp;
