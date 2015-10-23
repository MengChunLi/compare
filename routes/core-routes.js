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
  var vendno = req.params.vendno;
  var prodno = req.params.prodno;
  var model = require('../app/js/model/' + vendno + '/' + prodno + '.json');
  res.json(model);   

};

/*
 * GET results page.
 */
exports.results = function (req, res, next) {
    var prodObj = req.query.prod.map(function(item) {
        var _item = [];
        //console.log(item);
         _item = item.split('_');
        return { 
                "vendno" : _item[0],
                "prodno" : _item[1],
                "url" : BASEURL + _item[0] + "/" + _item[1]
            };
    });

    console.log('query: ' , req.query.prod);
    console.log(prodObj);
    res.render('results.ejs', { title: 'Hey', prodObj: JSON.stringify(prodObj)});
    //res.status('prodno: ').send(prodObj);
};