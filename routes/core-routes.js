'use strict';

var BASEURL = "http://localhost:3000/api/";

/*
 * GET home page.
 */
exports.index = function(req, res) {

  res.render('index.ejs');

};

/*
 * GET prods api.
 */
exports.api = function(req, res) {
  var prodno = req.params.prodno;
  var model = require('../app/js/model/' + prodno + '.json');
  res.json(model);   

};

/*
 * GET otherDate api.
 */
exports.apiOtherDate = function(req, res) {
  var pfGProdNo = req.params.pfGProdNo;
  var model = require('../app/js/model/otherDate/' + pfGProdNo + '.json');
  res.json(model);   

};

/*
 * GET results page.
 */
exports.results = function (req, res, next) {
    var prodObj = req.query.prod.map(function(item, index) {
        //var _item = [];
        //console.log(item);
         //_item = item.split('_');
        return { 
                "index": index,
                "prodNo" : item,
                "url" : BASEURL + item
               };
    });

    console.log('query: ' , req.query.prod);
    console.log(prodObj);
    res.render('results.ejs', { title: '國外旅遊商品比較', prodObj: JSON.stringify(prodObj)});
    //res.status('prodno: ').send(prodObj);
};