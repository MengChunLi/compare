/**
 *
 */
var actions = require('../actions/CompareAction');
var ProdListItem = React.createFactory(require('./prodListItem.jsx'));

/**
 *
 */
var comp = React.createClass({

   // componentWillMount: function() {
   //  var compareData = this.props.truth.prods;
   // console.log(compareData);
   // },
  render: function() {
    var selectedItem = this.props.truth.selectedItem;
    //console.log('selectedItem: ',selectedItem);
    // 輸出已選擇的項目uid array
    var uidSelected = [];
    for (var i = 0; i < selectedItem.length; i++) {
        uidSelected[i] = selectedItem[i].uid;
    };
    var arr = this.props.prods
    
    // 將項目轉成 <ListItem> 元件供顯示
    .map(function(item){
  
        console.log('truth: ',this.props.truth.selectedItem);
        // 確認是否包否為Selected
        var isSelected = uidSelected.indexOf(item.uid) > -1 ? true : false;

        console.log('isSelected2: ',isSelected);
        return <ProdListItem

                prod={item}
                selected = {isSelected}
                key={item.uid} />

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
