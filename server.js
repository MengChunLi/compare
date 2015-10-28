var express = require('express');
var path = require('path');
var app = express();
// 建立 Router 物件
var router = express.Router();
var routes = require('./routes/core-routes');

// 首頁路由 (http://localhost:3000)
router.get('/', routes.index);
// 結果頁
router.get('/results?', routes.results);
router.get('/api/:prodno', routes.api);
// 取得靜態檔案
app.use(  express.static( path.join( __dirname, 'public' )));
// 將路由套用至應用程式
app.use('/', router);

app.listen(3000, function(){
    console.log('Listening on port 3000');
});

