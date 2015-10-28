/**
 *
 */
var actions = require('../actions/CompareAction');
var ProdListItem = React.createFactory(require('./prodListItem.jsx'));
var _prods = [];
/**
 *
 */
var comp = React.createClass({
  getInitialState: function() {
    return {prods : []};
  },
  getProdsData: function(element) {
    $.ajax({
        type: 'GET',
        url: element,
        dataType: 'json',
        success: function(data) {
          //console.log(data);
          _prods.push(data);
          this.setState({prods : _prods});
        }.bind(this),
        error: function(e) {
           console.log('error', e);
        }
      });
  },
  componentWillMount: function() {
    var prodsApi = this.props.truth.prodsApi;
    prodsApi.forEach(function(element, index){
      this.getProdsData(element);
    }, this);
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    //console.log(nextState.prods.length, this.props.truth.prodsApi.length);
    // 當prods抓完所有資料再一次render
    return nextState.prods.length === this.props.truth.prodsApi.length;
  },
  render: function() {
    var selectedItem = this.props.truth.selectedItem;
    //console.log('selectedItem: ',selectedItem);
    // 輸出已選擇的項目pfProdNo array
    var prodNoSelected = [];
    for (var i = 0; i < selectedItem.length; i++) {
        prodNoSelected[i] = selectedItem[i].pfProdNo;
    };
    //console.log(this.state.prods);
    var arr = this.state.prods
    
    // 將項目轉成 <ListItem> 元件供顯示
    .map(function(item, index){
  
        //console.log('index: ',index);
        // 確認是否包否為Selected
        var isSelected = prodNoSelected.indexOf(item.pfProdNo) > -1 ? true : false;

        //console.log('isSelected2: ',isSelected);
        return <ProdListItem

                index={index}
                prod={item}
                selected = {isSelected}
                key={item.pfProdNo} />

    }, this)

    // 當上面這段跑完時，arr[] 的內容會就是一包 <ListItem> 元件
    // 下面就可直接使用

    return (

      <div className="col-sm-12">
        	<div className="row">
            {arr}
          </div>
      </div>
    );

  },

  /**
   * 大部份 ui 操作最終都是直接轉手給 actions 去處理
   */
  // handleClick: function( item ){
  //     // console.log( '\n\nitem click: ', item.name );
  //     actions.selectTodo(item);
  // },

  // /**
  //  *
  //  */
  // handleRemove: function( item ){
  //     actions.removeTodo(item);
  // },

  //
  noop: function(){}

});

module.exports = comp;
