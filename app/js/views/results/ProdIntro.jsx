/**
 *
 */
var classNames = require('classnames');

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
      console.log(item);
      // react class add-on classSet has been deprecated
      // 這裡改為使用classnames
      var compareList = classNames({
          'compare-list': true,
          'notFound': !item.isSuccess,
          'loading': !this.state.isDone
      });

      // 按鈕狀態： 訂購
      var btnNONE = classNames({
          'btn-order': true,
          'btn-orange': true,
          'preventLink': true,
          'active': item.fullStatus === "NONE"
      });

      // 按鈕狀態： 暫滿
      var btnEND = classNames({
          'btn-order': true,
          'btn-disabled': true,
          'preventLink': true,
          'active': item.fullStatus === "END"
      });

      // 按鈕狀態： 結團
      var btnTEMPFULL = classNames({
          'btn-order': true,
          'btn-disabled': true,
          'preventLink': true,
          'active': item.fullStatus === "TEMPFULL"
      });

      return <div key={item.pfProdNo} className={compareList}>
                <div className="not-found">
                    <i className="icon-sad"></i>
                    <span>商品不存在或已下架</span>
                </div>
                <div className="list-block">
                    <div className="day-img css-table">
                        <div className="travel-day css-td">{item.travelDay}天</div>
                        <div className="prod-img-box css-td">
                            <div className="prod-img focuspoint">
                              <img src={item.vImgUrl} />
                            </div>
                        </div>
                    </div> 
                    <div className="pfprod-no">{item.vendNo},{item.pfProdNo}</div>
                    <h1 className="prod-nm">{item.prodNm}</h1>
                    <div className="qty">可報{item.allotQty}人/共{item.totQty}個團位</div>
                    <div className="price-order-box">
                        <div className="price-order">
                            <div className="vend-nm">{item.vendName}</div>
                            <div className="prod-price"><span className="text-price" id="prodPrice">{item.ezPrice1}</span>元</div>
                        </div>
                        <div className="price-order">
                            <a href="#" target="_blank" className={btnNONE}>訂購</a>
                            <a href="javascript: void(0)" className={btnEND}>結團</a>
                            <a href="javascript: void(0)" className={btnTEMPFULL}>暫滿</a>
                        </div>
                    </div>
                </div>
            </div>
    }, this);
    
    return (
      
      <div className="list-block-box compare-top">
        <div className="compare-item-title">
          <div className="title-circle title-circle-orange">
            <h3>商品<br />介紹</h3>
          </div>
        </div>
        <div className="compare-list-box">
          {arr}
        </div>
      </div>
    );

  },

  // /**
  //  * 在 listItem 上雙響時要切換為編輯模式
  //  * 手法是加上 contenteditable 屬性
  //  * 這也代表只支援 modern browsers
  //  */
  // handleDblClick: function(){

  //     var val = null;

  //     // 加上這屬性就可編輯元件
  //     this.$input.attr('contenteditable', true);

  //     // 將 I-beam 放到文字最後方
  //     this.setCaret();

  //     // 編輯結束後的處理流程
  //     this.$input.on('keydown focusout', function(evt){

  //         // enter key 或 文字框喪失focus 事件發生，即認定為退出編輯狀態
  //         if( evt.keyCode == 13 || evt.type == 'focusout' ){

  //             evt.preventDefault();

  //             // 取得編輯後的新值
  //             val = this.$input.text();

  //             // 移除 <span> 的編輯能力
  //             this.$input.removeAttr('contenteditable');
  //             // 也解掉掛的偵聽
  //             this.$input.off('keydown focusout');

  //             // 準備將新值存入 store，方法一樣是操作 actionCreator
  //             // this.props.todoItem.name = val;
  //             actions.updateTodo( this.props.todoItem, val );

  //         }
  //     }.bind(this))
  // },

  // /**
  //  * util: 設定 I-beam 位置
  //  */
  // setCaret: function() {
  //     var el = this.$input[0];
  //     var range = document.createRange();
  //     var sel = window.getSelection();
  //     range.setStart(el.childNodes[0], el.innerText.length);
  //     range.collapse(true);
  //     sel.removeAllRanges();
  //     sel.addRange(range);
  //     el.focus();
  // },


  // /**
  //  * ListItem 內部預先處理過刪除事件
  //  */
  // handleRemove: function(evt){

  //   // 停止此事件繼續向上廣播，不然會連帶觸發另個 onClick 事件
  //   evt.stopPropagation();

  //   // 如果外界有傳入 onRemove handler，就觸發它，並且將自已身份也傳出去，方便外界識別與處理
  //   if( this.props.onRemove ){
  //       this.props.onRemove(this.props.todoItem);
  //   }

  // },

  // /**
  //  * 滑鼠移到一個 item 時要顯示 ✖ 鈕供刪除
  //  * 並且滑鼠移開時要隱藏
  //  */
  // handleMouseMovement: function(evt){
  //     if( evt.type == 'mouseover'){
  //         this.$remove.removeClass('hide')
  //     }else{
  //         this.$remove.addClass('hide')
  //     }
  // },

  noop: function(){}

});

module.exports = comp;
