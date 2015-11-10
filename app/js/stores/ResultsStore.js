/**
 * TodoStore
 */

//========================================================================
//
// IMPORT

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var actions = require('../actions/ResultsAction');

var EventEmitter = require('events').EventEmitter; // 取得一個 pub/sub 廣播器

var Promise = require('es6-promise').Promise;

//========================================================================
//
// Private vars

// 等同於 TodoStore extends EventEmitter 
// 從此取得廣播的能力
// 由於將來會返還 TodoStore 出去，因此下面寫的會全變為 public methods
var Store = new EventEmitter();

var selectedProd = null;
/**
 * { 
    "index": index,
    "prodNo" : item,
    "url" : BASEURL + item
    };
 */
var prod = JSON.parse(document.getElementById('prodObj').getAttribute('data-prod'));
var prods = [];

var test = "TEST123";
var test2 = "TEST567";
// function imgLoad(entry) {
//   // Create new promise with the Promise() constructor;
//   // This has as its argument a function
//   // with two parameters, resolve and reject
//   return new Promise(function(resolve, reject) {
//     // Standard XHR to load an image
//     var request = new XMLHttpRequest();
//     request.open('GET', entry.url);
//     request.responseType = 'json';
//     // When the request loads, check whether it was successful
//     request.onload = function() {
//       if (request.status === 200) {
//       // If successful, resolve the promise by passing back the request response
//         resolve(request.response);
//       } else {
//       // If it fails, reject the promise with a error message
//         reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
//       }
//     };
//     request.onerror = function() {
//     // Also deal with the case when the entire request fails to begin with
//     // This is probably a network error, so reject the promise with an appropriate message
//         reject(Error('There was a network error.'));
//     };
//     // Send the request
//     request.send();
//   });
// }

//  prod.forEach(function(entry) {
//   //console.log('entry: ',entry);
//   getProdsData(entry);
// }); 
// var getProdsData = function(entry) {
//   $.ajax({
//       type: 'GET',
//       url: entry.url,
//       dataType: 'json',
//       success: function(data) {
//         data.isSuccess = true;
//         prods.push(data);
//       }.bind(this),
//       error: function(e) {
//         prods.push({isSuccess: false});
//         console.log('error', e);
//       }.bind(this)
//     });
// };

// function getProds () {
//   prod.forEach(function(entry) {
//     imgLoad(entry).then(function(response) {
//       // The first runs when the promise resolves, with the request.reponse
//       // specified within the resolve() method.
//       prods.push(response);
//       console.log('prods: ', prods);
//       return prods;
//       // var imageURL = window.URL.createObjectURL(response);
//       // myImage.src = imageURL;
//       // body.appendChild(myImage);

//       // The second runs when the promise
//       // is rejected, and logs the Error specified with the reject() method.
//     }, function(Error) {
//       console.log(Error);
//     });
//   }); 
// }
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
      return {
        // test: test,
        // test2: test2,
        selectedProd: selectedProd,
        prod: prod,
        prods: prods
      }
    },

    // getProdsData: function(entry) {
    //   $.ajax({
    //       type: 'GET',
    //       url: entry.url,
    //       dataType: 'json', //specify jsonp
    //       success: function(data) {
    //         data.isSuccess = true;
    //         prods.push(data);
    //       }.bind(this),
    //       error: function(e) {
    //         prods.push({isSuccess: false});
    //         console.log('error', e);
    //       }.bind(this),
    //       complete: function(e) {
    //         //console.log(_prods);
    //         // this.setState({
    //         //   prods: _prods
    //         // });
    //       }.bind(this)
    //     });
    // },

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
        // case AppConstants.ITEM_CREATE:

        //     selectedItem = selectedItem.filter( function(item){
        //         return item != action.item;
        //     })
            
        //     selectedItem.push( action.item );

        //     console.log( 'Store 新增: ', selectedItem );

        //     // 將新增的項目設為 selected，將來在 ui 裏會高亮與自動捲動
        //     //selectedItem = action.item;

        //     Store.emit( AppConstants.CHANGE_EVENT );

        //     persist();
                
        //     break;

        // /**
        //  * 
        //  */
        // case AppConstants.ITEM_REMOVE:

        //     selectedItem = selectedItem.filter( function(item){
        //         //console.log('item: ',item,'action: ',action.item);
        //         //console.log('item:',item, 'action: ', action.item);
        //         return item.pfProdNo != action.item.pfProdNo;
        //     })

        //     // 如果當前選取的 item 被刪掉了，要記錄這個事實
        //     // if( selectedItem == action.item ){
        //     //     selectedItem = null;
        //     // }

        //     console.log( 'Store 刪完: ', selectedItem );

        //     Store.emit( AppConstants.CHANGE_EVENT );

        //     persist();
                
        //     break;

        // /**
        //  * 
        //  */
        // case AppConstants.ALL_REMOVE:

        //     selectedItem = [];

        //     console.log( 'Store 全刪: ', selectedItem );

        //     Store.emit( AppConstants.CHANGE_EVENT );

        //     persist();
                
        //     break;

        /**
         * 同步分頁storage更新selectedItem
         */    
        case AppConstants.PROD_UPDATE:

            prod[action.selectedProd.index] = action.selectedProd;
            selectedProd = action.selectedProd;
            //test = "TEST456";
            //test2 = "TEST910";
            console.log( 'Store 更新: ', prod,  selectedProd);

            Store.emit( AppConstants.CHANGE_EVENT );

            //persist();
                
            break;

        case AppConstants.TEST_UPDATE:

            test = "TEST456";
            test2 = "TEST910";
            console.log( 'Store 更新: ');

            Store.emit( AppConstants.CHANGE_EVENT );

            //persist();
                
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


//
module.exports = Store;
