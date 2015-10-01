/**
 *
 */
var actions = require('../actions/AppActionCreator');
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

   //console.log(this.props.prods);
    var arr = this.props.prods

    // 再將合格的項目轉成 <ListItem> 元件供顯示
    .map(function(item){

        //
        return <ProdListItem

                prod={item}
                price={item.price}
                prodNm = {item.prodNm} />

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
