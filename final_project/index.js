var express = require('express');
var app = express();
app.get('/',function(req,res){
    res.send("<h1>successful !</h1>");
});
app.listen(8080,function(){
    console.log("the server port 8080 is open");
});