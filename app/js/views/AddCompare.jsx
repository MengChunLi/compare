var comp = React.createClass({
    render: function() {
      return (
        <div className="add-compare-btn">
          <input type="checkbox" className="css-checkbox addCompareBtn" name="addCompareBtn" id='addCompareBtnList'
          data-pfprodno="" data-saledt="" />
          <label htmlFor="addCompareBtnList" className="css-label">商品比較</label>
          <div className="compareData" data-prod=""></div>
      </div>
    );
  }
});

module.exports = comp;
