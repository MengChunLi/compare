/**
 * TodoStore
 */

//========================================================================
//
// IMPORT

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var actions = require('../actions/CompareAction');

var EventEmitter = require('events').EventEmitter; // 取得一個 pub/sub 廣播器

//========================================================================
//
// Private vars

// 等同於 TodoStore extends EventEmitter 
// 從此取得廣播的能力
// 由於將來會返還 TodoStore 出去，因此下面寫的會全變為 public methods
var Store = new EventEmitter();
//{"todos":[{"name":"thth","uid":"41bd_041g","created":1443621200705}],"selectedItem":{"name":"thth","uid":"41bd_041g","created":1443621200705}}

var prodsID = [
  "FUK05151226A",
  "OSA05160129A",
  "OSA05BR151123",
  "SPKGE16010205A",
  "SPK05GEA2515AA",
  "TYO05TZ151028U"
];

var prodsApi = prodsID.map(function(item) {
    return '/api/' + item;
});

// // 目前選取的 todo 項目
var selectedItem = null;

// app 第一次啟動時，存入一包 mock data 到 localStorage 供測試
var db = window.localStorage;
if( db.hasOwnProperty('compareDB') == false ){
    // console.log( '\n無歷史資料，存入 mock data' );
    db.setItem('compareDB', JSON.stringify({selectedItem: []}) )
}
//[{"pfProdNo":"FRN0000013233","imgUrl":"http://www.eztravel.com.tw/img/FRN/FRN0000013233.gif","prodUrl":"http://www.eztravel.com.tw/ezec/pkgfrn/grp_begdate.jsp?prod_no=FRN0000013233","saleDt":"20151006"},{"pfProdNo":"SPK05GEA0815AA","vendNo":"VDR0000007986","imgUrl":"http://www.eztravel.com.tw/img/VDR/kyoto13.jpg","prodUrl":"/pkgfrn/introduction/VDR0000007986/SPK05GEA0815AA","saleDt":"20151008"}]
// 接著一律從 db 讀取歷史資料
var c = JSON.parse(db.getItem('compareDB'));
selectedItem = c.selectedItem ? c.selectedItem : [] ;
//selectedItem = c.selectedItem;

//========================================================================
//
// Public API

/**
 * 建立 Store class，並且繼承 EventEMitter 以擁有廣播功能
 */
$.extend( Store, {

    /**
     * Public API
     * 供外界取得 store 內部資料
     */
    getAll: function(){
       // selectedItem = window.addEventListener('storage', this.handleStorage );
        return {
            prodsApi: prodsApi,
            selectedItem: selectedItem
        }
    },

    getProds: function () {
        console.log(prodsApi);
       // console.log(prods);
    },

    //
    noop: function(){}
});

//========================================================================
//
// event handlers

/**
 * 向 Dispatcher 註冊自已，才能偵聽到系統發出的事件
 * 並且取回 dispatchToken 供日後 async 操作用
 */
Store.dispatchToken = AppDispatcher.register( function eventHandlers(evt){

    // evt .action 就是 view 當時廣播出來的整包物件
    // 它內含 actionType
    var action = evt.action;

    switch (action.actionType) {

        /**
         * 
         */
        case AppConstants.ITEM_CREATE:

            selectedItem = selectedItem.filter( function(item){
                return item != action.item;
            })
            
            selectedItem.push( action.item );

            console.log( 'Store 新增: ', selectedItem );

            // 將新增的項目設為 selected，將來在 ui 裏會高亮與自動捲動
            //selectedItem = action.item;

            Store.emit( AppConstants.CHANGE_EVENT );

            persist();
                
            break;

        /**
         * 
         */
        case AppConstants.ITEM_REMOVE:

            selectedItem = selectedItem.filter( function(item){
                //console.log('item: ',item,'action: ',action.item);
                //console.log('item:',item, 'action: ', action.item);
                return item.pfProdNo != action.item.pfProdNo;
            })

            // 如果當前選取的 item 被刪掉了，要記錄這個事實
            // if( selectedItem == action.item ){
            //     selectedItem = null;
            // }

            console.log( 'Store 刪完: ', selectedItem );

            Store.emit( AppConstants.CHANGE_EVENT );

            persist();
                
            break;

        /**
         * 
         */
        case AppConstants.ALL_REMOVE:

            selectedItem = [];

            console.log( 'Store 全刪: ', selectedItem );

            Store.emit( AppConstants.CHANGE_EVENT );

            persist();
                
            break;

        /**
         * 同步分頁storage更新selectedItem
         */    
        case AppConstants.ITEM_UPDATE:

            console.log( 'Store 更新: ', action.newVal );
            
            selectedItem = action.newVal.selectedItem;

            Store.emit( AppConstants.CHANGE_EVENT );

            persist();
                
            break;

        /**
         * 
         */    
        // case AppConstants.TODO_UPDATE:

        //     console.log( 'Store 更新: ', action.item );
            
        //     action.item.name = action.newVal;

        //     Store.emit( AppConstants.CHANGE_EVENT );

        //     persist();
                
        //     break;

        // /**
        //  * 
        //  */    
        // case AppConstants.TODO_SELECT:

        //     // console.log( 'Store 選取: ', action.item );

        //     // 選取同樣的 item 就不用處理下去了
        //     if( selectedItem != action.item ){
        //         selectedItem = action.item;
        //         Store.emit( AppConstants.CHANGE_EVENT );
        //         persist();
        //     }
                
        //     break;

        // /**
        //  * 
        //  */    
        // case AppConstants.TODO_FILTER:

        //     // console.log( 'Store 查詢: ', action.val );

        //     if( searchFilter != action.val ){
        //         searchFilter = action.val
        //         Store.emit( AppConstants.CHANGE_EVENT );
        //     }
                
        //     break;

        

        default:
            //
    }

})

//========================================================================
//
// private methods

/**
 * 將資料保存入 localStorage，下次開啟時取回
 */
function persist(){
    db.setItem('compareDB', JSON.stringify({selectedItem: selectedItem}) );
}

//
module.exports = Store;
