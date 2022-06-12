var express = require('express');
var app = express();

var server = app.listen(8080,function(){
    console.log("the server port 8080 is open");
});
app.get('/th',function(req, res){
    var temp = req.query.t;
    var humid = req.query.h;
    var time = hrminsec();
    if(temp != undefined && humid != undefined){
        console.log("Temperature: " + temp + ", Humidity: ", + humid, "Time:", time);
    }else{
        console.log("No data received...");
    }
})

app.get("*", function(req,res){
    res.status(404).send("page not found...");
});

function hrminsec(){
    var d= new Date();
    var hr = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();
    var yr = d.getFullYear() - 1911;
    var mth = d.getMonth()+1;
    var dth = d.getDate();
    var cTime1 = "民國:" + yr + "年:" + mth + "月:" + dth + "日:";
    var cTime2 = hr + ":" + min + ":" + sec;
    var cTime = cTime1+cTime2;
    return cTime;
}
