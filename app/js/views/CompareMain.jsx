/**
 * 這是 root view，也稱為 controller-view
 */


//========================================================================
//
// import

// var React = require('react');
var ProdList = React.createFactory( require('./ProdList.jsx') );

var CompareStore = require('../stores/CompareStore');
var AppConstants = require('../constants/AppConstants');

var prods = [
  {
    prodNm: "【五星保證‧第2人减2千】楓迷北海道‧黑岳雪山紅葉浪漫‧星野渡假村", 
    price: 35999,
    priceO: 39000,
    travelDays: 6,
    imgUrl: "http://www.eztravel.com.tw/img/FRN/FRN0000009392.gif"
  },
  {
    prodNm: "《楓情北陸昇龍道》黑部立山楓情．惠那峽遊船．白川鄕合掌村．牧歌之里．郡上八幡散策．名古屋城", 
    price: 35600,
    priceO: 43000,
    travelDays: 7,
    imgUrl: "http://vacation.eztravel.com.tw/assets/pkgfrn/images/spot/1X_/01/Hokuriku-02.jpg"
  },
  {
    prodNm: "超值．九州豪斯登堡、柳川小扁舟、九重夢吊橋、阿蘇火之國", 
    price: 24900,
    priceO: 33000,
    travelDays: 5,
    imgUrl: "http://www.eztravel.com.tw/img/FRN/FRN0000010336.gif"
  },
  {
    prodNm: "【升等五星希爾頓】浪漫秋舞北海道、單車楓情、熊牧場、支芴湖、溫泉螃蟹美饌5日", 
    price: 38999,
    priceO: 43000,
    travelDays: 7,
    imgUrl: "http://www.eztravel.com.tw/img/VDR/maple-02.jpg"
  },
  {
    prodNm: "【升等五星希爾頓】浪漫秋舞北海道、單車楓情、熊牧場、支芴湖、溫泉螃蟹美饌", 
    price: 45900,
    priceO: 50900,
    travelDays: 8,
    imgUrl: "http://www.eztravel.com.tw/img/FRN/FRN0000009346.gif"
  } 
];


/**
 *
 */
var comp = React.createClass({

    // //========================================================================
    // //
    // // mount

    // /**
    //  * 這是 component API, 在 mount 前會跑一次，取值做為 this.state 的預設值
    //  */
    // getInitialState: function() {
    //     var o = this.getTruth();
    //     console.log(CompareStore.getAll());
    //     //o.screenSize = 'tablet';
    //     return o;
    // },

    // /**
    //  * 主程式進入點
    //  */
    // componentWillMount: function() {
    //     CompareStore.addListener( AppConstants.CHANGE_EVENT, this._onChange );

    //     // 要用 interval 擋一下
    //     window.addEventListener('resize', this.handleResize );

    //     this.handleResize();
    // },

    // handleResize: function(evt){

    //     clearTimeout( idResize );

    //     idResize = setTimeout(function(){

    //         var body = document.body;
    //         var size;

    //         // @todo: 改回 1024
    //         if(body.scrollWidth > 720){
    //             size = 'desktop';
    //         }else if(body.scrollWidth > 480){
    //             size = 'tablet';
    //         }else{
    //             size = 'phone';
    //         }

    //         // console.log( 'resize: ', body.scrollWidth, body.scrollHeight, ' >size: ', size );

    //         this.setState({screenSize: size});

    //     }.bind(this), 0);

    // },

    // /**
    //  * 重要：root view 建立後第一件事，就是偵聽 store 的 change 事件
    //  */
    // componentDidMount: function() {
    //     //
    // },

    // //========================================================================
    // //
    // // unmount

    // /**
    //  * 元件將從畫面上移除時，要做善後工作
    //  */
    // componentWillUnmount: function() {
    //     CompareStore.removeChangeListener( this._onChange );
    // },

    // /**
    //  *
    //  */
    // componentDidUnmount: function() {
    //     //
    // },

    // //========================================================================
    // //
    // // update

    // /**
    //  * 在 render() 前執行，有機會可先處理 props 後用 setState() 存起來
    //  */
    // componentWillReceiveProps: function(nextProps) {
    //     //
    // },

    // /**
    //  *
    //  */
    // shouldComponentUpdate: function(nextProps, nextState) {
    //     return true;
    // },

    // // 這時已不可用 setState()
    // componentWillUpdate: function(nextProps, nextState) {
    // },

    // /**
    //  *
    //  */
    // componentDidUpdate: function(prevProps, prevState) {
    // },

    //========================================================================
    //
    // render

    /**
     *
     */
    render: function() {

            return (
              <div className="wrap">
                <div className="container">
                  <ProdList prods={prods} />
                </div>
              </div>
            )
    }



    //========================================================================
    //
    // private methods - 處理元件內部的事件

    /**
     * controller-view 偵聽到 model change 後
     * 執行這支，它操作另一支 private method 去跟 model 取最新值
     * 然後操作 component life cycle 的 setState() 將新值灌入元件體系
     * 就會觸發一連串 child components 跟著重繪
     */
    // _onChange: function(){
    //     // 重要：從 root view 觸發所有 sub-view 重繪
    //     this.setState( this.getTruth() );
    // },

    // getTruth: function() {

    //     // 是從 TodoStore 取資料(as the single source of truth)
    //     return CompareStore.getAll();
    // }


});

module.exports = comp;
