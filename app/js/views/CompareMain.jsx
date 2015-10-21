/**
 * 這是 root view，也稱為 controller-view
 */


//========================================================================
//
// import

// var React = require('react');
var ProdList = React.createFactory( require('./ProdList.jsx') );
var CompareBox = React.createFactory( require('./CompareBox.jsx') );
var CompareStore = require('../stores/CompareStore');
var AppConstants = require('../constants/AppConstants');

var prods = [
  {
    uid: 0,
    prodNo: "VDR00001",
    prodNm: "【五星保證‧第2人减2千】楓迷北海道‧黑岳雪山紅葉浪漫‧星野渡假村", 
    price: "35,999",
    priceO: "39,000",
    travelDays: 6,
    imgUrl: "http://www.eztravel.com.tw/img/FRN/FRN0000009392.gif",
    prodUrl: "http://vacation.eztravel.com.tw/pkgfrn/introduction/VDR0000001838/NNA030905CI6E"
  },
  {
    uid: 1,
    prodNo: "VDR00002",
    prodNm: "《楓情北陸昇龍道》黑部立山楓情`．惠那峽遊船．白川鄕合掌村．牧歌之里．郡上八幡散策．名古屋城", 
    price: "35,600",
    priceO: "43,000",
    travelDays: 7,
    imgUrl: "http://vacation.eztravel.com.tw/assets/pkgfrn/images/spot/1X_/01/Hokuriku-02.jpg",
    prodUrl: "http://vacation.eztravel.com.tw/pkgfrn/introduction/VDR0000001888/OSA05160302A"
  },
  {
    uid: 2,
    prodNo: "VDR00003",
    prodNm: "超值．九州豪斯登堡、柳川小扁舟、九重夢吊橋、阿蘇火之國", 
    price: "24,900",
    priceO: "33,000",
    travelDays: 5,
    imgUrl: "http://www.eztravel.com.tw/img/FRN/FRN0000010336.gif",
    prodUrl: "http://vacation.eztravel.com.tw/pkgfrn/introduction/VDR0000001943/NRT05TZ6417A"
  },
  {
    uid: 3,
    prodNo: "VDR00004",
    prodNm: "【升等五星希爾頓】浪漫秋舞北海道、單車楓情、熊牧場、支芴湖、溫泉螃蟹美饌5日", 
    price: "38,999",
    priceO: "43,000",
    travelDays: 7,
    imgUrl: "http://www.eztravel.com.tw/img/VDR/maple-02.jpg",
    prodUrl: "http://vacation.eztravel.com.tw/pkgfrn/introduction/VDR0000001838/NTN030905CI6"
  },
  {
    uid: 4,
    prodNo: "VDR00005",
    prodNm: "【升等五星希爾頓】浪漫秋舞北海道、單車楓情、熊牧場、支芴湖、溫泉螃蟹美饌", 
    price: "45,900",
    priceO: "50,900",
    travelDays: 8,
    imgUrl: "http://www.eztravel.com.tw/img/FRN/FRN0000009346.gif",
    prodUrl: "http://vacation.eztravel.com.tw/pkgfrn/introduction/VDR0000001888/SPK05160314A"
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
    getInitialState: function() {
        var o = this.getTruth();
        //console.log(o);
        //o.screenSize = 'tablet';
        return o;
    },

    /**
     * 主程式進入點
     */
    componentWillMount: function() {
        CompareStore.addListener( AppConstants.CHANGE_EVENT, this._onChange );
        
        // 要用 interval 擋一下
        //window.addEventListener('resize', this.handleResize );

        //this.handleResize();
    },

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

    /**
     * 重要：root view 建立後第一件事，就是偵聽 store 的 change 事件
     */
    componentDidMount: function() {
        window.addEventListener("storage", this.handleStorage );
    },

    /**
     * 同步瀏覽器中每個分頁的商品比較狀態
     */
    handleStorage: function(event){
        if (event.key === 'compareDB') {
            //console.log('handleStorage', JSON.parse(event.newValue));
            //更新Store資料
            CompareStore.updateStorage(JSON.parse(event.newValue));
            this._onChange();
            //this.setState(JSON.parse(event.newValue));
        }
    },

    //========================================================================
    //
    // unmount

    /**
     * 元件將從畫面上移除時，要做善後工作
     */
    componentWillUnmount: function() {
        CompareStore.removeChangeListener( this._onChange );
        window.removeEventListener('storage', this.handleStorage );
    },

    /**
     *
     */
    componentDidUnmount: function() {
        //
    },

    //========================================================================
    //
    // update

    /**
     * 在 render() 前執行，有機會可先處理 props 後用 setState() 存起來
     */
    componentWillReceiveProps: function(nextProps) {
        //
    },

    /**
     *
     */
    shouldComponentUpdate: function(nextProps, nextState) {
        return true;
    },

    // 這時已不可用 setState()
    componentWillUpdate: function(nextProps, nextState) {
    },

    /**
     *
     */
    componentDidUpdate: function(prevProps, prevState) {
    },

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
                  <ProdList prods={prods} truth={this.state} />
                   <div className="compare-alert-msg"></div>
                  <CompareBox truth={this.state}/>
                </div>
              </div>
            )
    },

    //========================================================================
    //
    // private methods - 處理元件內部的事件

    /**
     * controller-view 偵聽到 model change 後
     * 執行這支，它操作另一支 private method 去跟 model 取最新值
     * 然後操作 component life cycle 的 setState() 將新值灌入元件體系
     * 就會觸發一連串 child components 跟著重繪
     */
    _onChange: function(){
        //console.log(this.state);
        // 重要：從 root view 觸發所有 sub-view 重繪
        this.setState( this.getTruth() );
        
    },

    getTruth: function() {

        // 是從 TodoStore 取資料(as the single source of truth)
        return CompareStore.getAll();
    },

    noop: function(){}
});

module.exports = comp;
