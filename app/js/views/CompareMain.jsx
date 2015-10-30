/**
 * 這是 root view，也稱為 controller-view
 */


//========================================================================
//
// import
var React =  require('react');
var ProdList = require('./ProdList.jsx');
var CompareBox = require('./CompareBox.jsx');
var CompareStore = require('../stores/CompareStore');
var AppConstants = require('../constants/AppConstants');
var actions = require('../actions/CompareAction');

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
            //透過actions更新Store資料
            actions.updateStorage( JSON.parse(event.newValue) );
            //CompareStore.updateStorage(JSON.parse(event.newValue));
            //this._onChange();
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
                  <ProdList truth={this.state} />
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
      //CompareStore.getProds();
        // 是從 TodoStore 取資料(as the single source of truth)
        return CompareStore.getAll();
    },

    noop: function(){}
});

module.exports = comp;
