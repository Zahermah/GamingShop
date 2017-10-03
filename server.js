 var express = require('express');
 var app = express();
 var routes = require('./model/routes');

app.use('/',routes);

 app.listen(3000,function(){
    console.log("GamingShop is on port 3000 go check it out");
 });